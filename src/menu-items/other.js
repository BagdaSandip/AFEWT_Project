// assets
import { IconBuildingFactory2, IconHierarchy2, IconCalendarEvent, IconUsersGroup, IconUserPlus } from '@tabler/icons-react';

// constant
const icons = { IconBuildingFactory2, IconHierarchy2, IconCalendarEvent, IconUsersGroup, IconUserPlus };

// ==============================|| OTHER MENU ITEMS ||============================== //

const other = {
  id: 'forms', // Changed ID to 'forms'
  title: 'Forms', // Changed Title to 'Forms'
  type: 'group',
  children: [
    {
      id: 'add-institute',
      title: 'Add Institute',
      type: 'item',
      url: '/sample-page',
      icon: icons.IconBuildingFactory2,
      breadcrumbs: false
    },
    {
      id: 'add-department',
      title: 'Add Department',
      type: 'item',
      url: '/forms/add-department',
      icon: icons.IconHierarchy2,
      breadcrumbs: false
    },
    {
      id: 'add-event',
      title: 'Add Event',
      type: 'item',
      url: '/forms/add-event',
      icon: icons.IconCalendarEvent,
      breadcrumbs: false
    },
    {
      id: 'add-group',
      title: 'Add Group',
      type: 'item',
      url: '/forms/add-group',
      icon: icons.IconUsersGroup,
      breadcrumbs: false
    },
    {
      id: 'add-participant',
      title: 'Add Participant',
      type: 'item',
      url: '/forms/add-participant',
      icon: icons.IconUserPlus,
      breadcrumbs: false
    }
  ]
};

export default other;