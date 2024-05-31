// assets
import { IconBrandChrome, IconHelp, IconPencil, IconUser } from '@tabler/icons-react';

// constant
const icons = { IconBrandChrome, IconHelp, IconPencil, IconUser };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'sample-docs-roadmap',
  type: 'group',
  children: [
    {
      id: 'home',
      title: 'Home',
      type: 'item',
      url: '/home',
      icon: icons.IconBrandChrome,
      breadcrumbs: false
    },
    {
      id: 'create-campaign',
      title: 'Create Campaign',
      type: 'item',
      url: '/create-campaign',
      icon: icons.IconPencil,
      breadcrumbs: false
    },
    {
      id: 'profile',
      title: 'Profile',
      type: 'item',
      url: '/profile',
      icon: icons.IconUser,
      breadcrumbs: false
    }
  ]
};

export default other;
