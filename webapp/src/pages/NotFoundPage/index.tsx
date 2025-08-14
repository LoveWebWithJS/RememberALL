import { ErrorPageComponent } from '../../components/ErrorPageComponent';

export const NotFoundPage = ({
  title = 'Не найдено',
  message = 'Такая страница не существует йоу',
}: {
  title?: string;
  message?: string;
}) => {
  return <ErrorPageComponent title={title} message={message} />;
};
