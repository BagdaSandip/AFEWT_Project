import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// forms routing
const AddDepartment = Loadable(lazy(() => import('views/forms/AddDepartment')));
const AddEvent = Loadable(lazy(() => import('views/forms/AddEvent')));
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
      path: 'typography',
      element: <UtilsTypography />
    },
    {
      path: 'color',
      element: <UtilsColor />
    },
    {
      path: 'shadow',
      element: <UtilsShadow />
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: '/forms/add-department',
      element: <AddDepartment />
    },
    {
      path: '/forms/add-event',
      element: <AddEvent />
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
