import type { UseTRPCQueryResult } from '@trpc/react-query/shared';
import { useAppContext, type AppContext } from './ctx';
import type React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getDoEverythingPageRoute } from './routes';
import { ErrorPageComponent } from '../components/ErrorPageComponent';

type Props = Record<string, any>;
type QueryResult = UseTRPCQueryResult<any, any>;
type QuerySuccessResult<TQueryResult extends QueryResult> = UseTRPCQueryResult<
  NonNullable<TQueryResult['data']>,
  null
>;
type HelperProps<TQueryResult extends QueryResult | undefined> = {
  ctx: AppContext;
  queryResult: TQueryResult extends QueryResult
    ? QuerySuccessResult<TQueryResult>
    : undefined;
};

type PageWrapperProps<
  TProps extends Props,
  TQueryResult extends QueryResult | undefined,
> = {
  redirectAuthorized?: boolean;

  authorizedOnly?: boolean;
  authorizedOnlyTitle?: string;
  authorizedOnlyMessage?: string;

  checkAccess?: (helperProps: HelperProps<TQueryResult>) => boolean;
  checkAccessTitle?: string;
  checkAccessMessage?: string;

  checkExists?: (helperProps: HelperProps<TQueryResult>) => boolean;
  checkExistsTitle?: string;
  checkExistsMessage?: string;

  useQuery?: () => TQueryResult;

  setProps?: (helperProps: HelperProps<TQueryResult>) => TProps;
  Page: React.FC<TProps>;
};

const PageWrapper = <
  TProps extends Props = {},
  TQueryResult extends QueryResult | undefined = undefined,
>({
  redirectAuthorized,
  authorizedOnly,
  authorizedOnlyTitle = 'Пожалуйста, авторизуйтесь',
  authorizedOnlyMessage = 'Эта страница доступна только для авторизованных пользователей',
  checkAccess,
  checkAccessTitle = 'Нет доступа',
  checkAccessMessage = 'У вас нет доступа к этой странице',
  checkExists,
  checkExistsTitle = 'Not found',
  checkExistsMessage = 'Страница не существует',
  useQuery,
  setProps,
  Page,
}: PageWrapperProps<TProps, TQueryResult>) => {
  const navigate = useNavigate();
  const ctx = useAppContext();
  const queryResult = useQuery?.();

  const redirectNeeded = redirectAuthorized && ctx.me;

  useEffect(() => {
    if (redirectNeeded) {
      navigate(getDoEverythingPageRoute(), { replace: true });
    }
  }, [redirectNeeded, navigate]);

  if (queryResult?.isLoading || queryResult?.isFetching || redirectNeeded) {
    return <p>Loading...</p>;
  }

  if (queryResult?.isError) {
    return <ErrorPageComponent message={queryResult.error.message} />;
  }

  if (authorizedOnly && !ctx.me) {
    return (
      <ErrorPageComponent
        title={authorizedOnlyTitle}
        message={authorizedOnlyMessage}
      />
    );
  }

  const helperProps = { ctx, queryResult: queryResult as never };

  if (checkAccess) {
    const accessDenied = !checkExists?.(helperProps);
    if (accessDenied) {
      return (
        <ErrorPageComponent
          message={checkAccessMessage}
          title={checkAccessTitle}
        />
      );
    }
  }

  if (checkExists) {
    const notExists = !checkExists(helperProps);
    if (notExists) {
      return (
        <ErrorPageComponent
          message={checkExistsMessage}
          title={checkExistsTitle}
        />
      );
    }
  }

  const props = setProps?.(helperProps) as TProps;
  return <Page {...props} />;
};

//
export const withPageWrapper = <
  TProps extends Props = {},
  TQueryResult extends QueryResult | undefined = undefined,
>(
  pageWrapperProps: Omit<PageWrapperProps<TProps, TQueryResult>, 'Page'>
) => {
  return (Page: PageWrapperProps<TProps, TQueryResult>['Page']) => {
    return () => <PageWrapper {...pageWrapperProps} Page={Page} />;
  };
};
