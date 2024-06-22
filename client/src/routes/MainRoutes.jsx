import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

// campaign routing
const CampaignDetails = Loadable(lazy(() => import('views/Campaign-Details')));
const CreateCampaign = Loadable(lazy(() => import('views/create-campaign')));
const Profile = Loadable(lazy(() => import('views/profile')));
const Home = Loadable(lazy(() => import('views/home')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: '/home',
      element: <Home />
    },
    {
      path: '/campaign-details/:title',
      element: <CampaignDetails />
    },
    {
      path: '/create-campaign',
      element: <CreateCampaign />
    },
    {
      path: '/profile',
      element: <Profile />
    }
  ]
};

export default MainRoutes;
