import { Routes, BrowserRouter, Route } from 'react-router-dom';
import { TrpcProvider } from './lib/trpc';
import { DoEverythingPage } from './pages/DoEverythingPage';
import { SettingsPage } from './pages/SettingsPage';
import { getDoEverythingPageRoute, getSettingsPageRoute } from './lib/routes';
import { Layout } from './components/Layout';
import './styles/global.scss';

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={getDoEverythingPageRoute()} element={<DoEverythingPage />} />
            <Route path={getSettingsPageRoute()} element={<SettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  );
};
