// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons-react';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill
};

// ==============================|| MANAGEMENT MENU ITEMS ||============================== //

const utilities = {
  id: 'management', // Changed ID to be more relevant
  title: 'Management', // Changed Title from 'Utilities' to 'Management'
  type: 'group',
  children: [
    {
      id: 'institutes', // Changed ID
      title: 'Institutes', // Changed Title (Week 1 Task)
      type: 'item',
      url: '/typography', // Keeps pointing to the same file for now so it doesn't break
      icon: icons.IconTypography,
      breadcrumbs: false
    },
    {
      id: 'departments', // Changed ID
      title: 'Departments', // Changed Title (Week 1 Task)
      type: 'item',
      url: '/color', // Keeps pointing to the same file
      icon: icons.IconPalette,
      breadcrumbs: false
    },
    {
      id: 'events', // Changed ID
      title: 'Events', // Changed Title (Week 1 Task)
      type: 'item',
      url: '/shadow', // Keeps pointing to the same file
      icon: icons.IconShadow,
      breadcrumbs: false
    }
  ]
};

export default utilities;