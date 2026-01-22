import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// authentication pages
const LoginPage = Loadable(lazy(() => import('views/pages/authentication/Login')));
const RegisterPage = Loadable(lazy(() => import('views/pages/authentication/Register')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      index: true,
      element: <LoginPage />
    },
    {
      path: 'pages/login',
      element: <LoginPage />
    },
    {
      path: 'pages/register',
      element: <RegisterPage />
    }
  ]
};

export default AuthenticationRoutes;
