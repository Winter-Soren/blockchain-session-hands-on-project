// assets
import { IconBrandChrome, IconHelp, IconPencil, IconUser } from '@tabler/icons-react';

// ==============================|| MENU ITEMS ||============================== //

const other = {
  id: 'sample-docs-roadmap',
  type: 'group',
  children: [
    {
      id: 'home',
      title: 'Home',
      type: 'item',
      url: '/home',
      icon: IconBrandChrome,
      breadcrumbs: false
    },
    {
      id: 'create-campaign',
      title: 'Create Campaign',
      type: 'item',
      url: '/create-campaign',
      icon: IconPencil,
      breadcrumbs: false
    },
    {
      id: 'profile',
      title: 'Profile',
      type: 'item',
      url: '/profile',
      icon: IconUser,
      breadcrumbs: false
    }
  ]
};

export default other;
