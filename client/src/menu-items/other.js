// assets
import { IconBrandChrome, IconHelp, IconPencil } from '@tabler/icons-react';

// constant
const icons = { IconBrandChrome, IconHelp, IconPencil };

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
    }
  ]
};

export default other;
