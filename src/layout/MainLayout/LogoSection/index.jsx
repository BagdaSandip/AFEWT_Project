import { Link as RouterLink } from 'react-router-dom';

// material-ui
import Link from '@mui/material/Link';

// project imports
import Logo from 'ui-component/Logo';

// ==============================|| MAIN LOGO ||============================== //

export default function LogoSection() {
  return (
    // Hardcoded to always go to the main Dashboard
    <Link component={RouterLink} to="/dashboard/default" aria-label="theme-logo">
      <Logo />
    </Link>
  );
}