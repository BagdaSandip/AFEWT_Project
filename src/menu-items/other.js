// assets
import { IconBuildingFactory2 } from '@tabler/icons-react'; // Changed icon

// constant
const icons = { IconBuildingFactory2 };

// ==============================|| OTHER MENU ITEMS ||============================== //

const other = {
  id: 'forms', // Changed ID to 'forms'
  title: 'Forms', // Changed Title to 'Forms'
  type: 'group',
  children: [
    {
      id: 'add-institute', // Changed ID
      title: 'Add Institute', // Changed Title (Week 3 Task)
      type: 'item',
      url: '/sample-page', // We keep the same file path to make it easy
      icon: icons.IconBuildingFactory2,
      breadcrumbs: false
    }
  ]
};

export default other;