// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill, IconSchool, IconHierarchy2, IconCalendarEvent } from '@tabler/icons-react';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconSchool,
  IconHierarchy2,
  IconCalendarEvent
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
      url: '/institute',
      icon: icons.IconSchool,
      breadcrumbs: false
    },
    {
      id: 'departments', // Changed ID
      title: 'Departments', // Changed Title (Week 1 Task)
      type: 'item',
      url: '/department',
      icon: icons.IconHierarchy2,
      breadcrumbs: false
    },
    {
      id: 'events', // Changed ID
      title: 'Events', // Changed Title (Week 1 Task)
      type: 'item',
      url: '/event',
      icon: icons.IconCalendarEvent,
      breadcrumbs: false
    }
  ]
};

export default utilities;