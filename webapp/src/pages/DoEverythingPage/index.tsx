import { trpc } from '../../lib/trpc';

export const DoEverythingPage = () => {
  const { data, error, isLoading, isFetching, isError } = trpc.getPong.useQuery();
  if (isLoading || isFetching) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <div>
      <h1>DoEverythingPage!!!</h1>
      <span>{data?.pong}</span>
    </div>
  );
};
