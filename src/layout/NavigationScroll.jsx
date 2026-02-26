import PropTypes from 'prop-types';
import { useEffect } from 'react';

// ==============================|| NAVIGATION SCROLL TO TOP ||============================== //

export default function NavigationScroll({ children }) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

  return children || null;
}

NavigationScroll.propTypes = { children: PropTypes.oneOfType([PropTypes.node, PropTypes.any]) };
// ==============================|| NAVIGATION SCROLL TO TOP ||============================== //
// This component is used to scroll to the top of the page when the route changes. It uses the useEffect hook to scroll to the top of the page when the component is mounted. The children prop is used to render the child components of this component.