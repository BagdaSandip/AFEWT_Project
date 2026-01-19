import { Link as RouterLink } from 'react-router-dom';

// material-ui
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', pt: 3, mt: 'auto' }}>
      {/* Left Side: Project Name */}
      <Typography variant="caption">
        &copy; 2026{' '}
        <Typography component="span" sx={{ color: 'secondary.main', fontWeight: 'bold' }}>
          Frolic Event Management System
        </Typography>
      </Typography>

      {/* Right Side: Team Name or Credits */}
      <Stack direction="row" sx={{ gap: 1.5, alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="caption" color="text.primary">
          Team Frolic {/* <--- CHANGE THIS TEXT TO YOUR NAME IF YOU WANT */}
        </Typography>
        <Link
          component={RouterLink}
          to="#"
          underline="hover"
          variant="caption"
          color="text.primary"
        >
          Contact Admin
        </Link>
      </Stack>
    </Stack>
  );
}