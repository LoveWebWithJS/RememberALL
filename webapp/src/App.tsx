import { Routes, BrowserRouter, Route } from 'react-router-dom';
import { TrpcProvider } from './lib/trpc';
import { DoEverythingPage } from './pages/DoEverythingPage';
import { SettingsPage } from './pages/SettingsPage';
import {
  getDoEverythingPageRoute,
  getSettingsPageRoute,
  getAddNewTaskRoute,
  getSignUpRoute,
  getSignInRoute,
  getSignOutRoute,
  getEditTaskRoute,
  editTaskRouteParams,
} from './lib/routes';
import { Layout } from './components/Layouts/Layout';
import './styles/global.scss';
import { AddNewTask } from './pages/AddNewTask';
import { SignUpPage } from './pages/SignUpPage';
import { SimpleLayout } from './components/Layouts/SimpleLayout';
import { SignInPage } from './pages/SignInPage';
import { SignOutPage } from './pages/SignOutPage';
import { EditTaskPage } from './pages/EditTaskPage';
import { AppContextProvider } from './lib/ctx';
import { NotFoundPage } from './pages/NotFoundPage';

export const App = () => {
  return (
    <TrpcProvider>
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path={getSignOutRoute()} element={<SignOutPage />} />
            <Route element={<Layout />}>
              <Route
                path={getEditTaskRoute(editTaskRouteParams)}
                element={<EditTaskPage />}
              />
              <Route
                path={getDoEverythingPageRoute()}
                element={<DoEverythingPage />}
              />
              <Route path={getAddNewTaskRoute()} element={<AddNewTask />} />
            </Route>
            <Route element={<SimpleLayout />}>
              <Route path={getSettingsPageRoute()} element={<SettingsPage />} />
              <Route path={getSignUpRoute()} element={<SignUpPage />} />
              <Route path={getSignInRoute()} element={<SignInPage />} />
              <Route path='*' element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </TrpcProvider>
  );
};
