import { TrpcProvider } from './lib/trpc';
import { DoEverythingPage } from './pages/DoEverythingPage';

export const App = () => {
  return (
    <TrpcProvider>
      <DoEverythingPage />
    </TrpcProvider>
  );
};
