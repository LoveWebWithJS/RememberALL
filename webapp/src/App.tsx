import { Routes, BrowserRouter, Route } from 'react-router-dom';
import { TrpcProvider } from './lib/trpc';
import { DoEverythingPage } from './pages/DoEverythingPage';
import { SettingsPage } from './pages/SettingsPage';
import {
  getDoEverythingPageRoute,
  getSettingsPageRoute,
  getAddNewTaskRoute,
  getSignUpRoute,
} from './lib/routes';
import { Layout } from './components/Layouts/Layout';
import './styles/global.scss';
import { AddNewTask } from './pages/AddNewTask';
import { SignUpPage } from './pages/SignUpPage';
import { SimpleLayout } from './components/Layouts/SimpleLayout';
// import { RememberEverythingPage } from './pages/RememberEverythingPage';

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path={getDoEverythingPageRoute()}
              element={<DoEverythingPage />}
            />
            {/* <Route path={getRememberEverythingPageRoute()} element={<RememberEverythingPage />} /> */}
            <Route path={getAddNewTaskRoute()} element={<AddNewTask />} />
          </Route>
          <Route element={<SimpleLayout />}>
            <Route path={getSettingsPageRoute()} element={<SettingsPage />} />
            <Route path={getSignUpRoute()} element={<SignUpPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  );
};
