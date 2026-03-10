import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsInstitute = Loadable(lazy(() => import('views/utilities/Institute')));
const UtilsDepartment = Loadable(lazy(() => import('views/utilities/Department')));
const UtilsEvent = Loadable(lazy(() => import('views/utilities/Event')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// forms routing
const AddGroup = Loadable(lazy(() => import('views/forms/AddGroup')));
const AddParticipant = Loadable(lazy(() => import('views/forms/AddParticipant')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      index: true,
      element: <DashboardDefault />
    },
    {
      path: '/dashboard/default',
      element: <DashboardDefault />
    },
    {
      path: 'institute',
      element: <UtilsInstitute />
    },
    {
      path: 'department',
      element: <UtilsDepartment />
    },
    {
      path: 'event',
      element: <UtilsEvent />
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: '/forms/add-group',
      element: <AddGroup />
    },
    {
      path: '/forms/add-participant',
      element: <AddParticipant />
    }
  ]
};

export default MainRoutes;
