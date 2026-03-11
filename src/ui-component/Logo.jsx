import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import frolicLogo from 'assets/images/frolic-logo.png';

const Logo = () => {
    const theme = useTheme();

    return (
        <Stack direction="row" alignItems="center" spacing={1.5}>
            <img src={frolicLogo} alt="Frolic Event Management System" width="40" height="40" style={{ borderRadius: '8px' }} />
            <Stack spacing={-0.5} sx={{ pt: 0.5 }}>
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 900,
                        background: 'linear-gradient(90deg, #0f766e 0%, #06b6d4 50%, #3b82f6 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        fontFamily: "'Inter', 'Roboto', sans-serif",
                    }}
                >
                    Frolic
                </Typography>
                <Typography
                    variant="caption"
                    sx={{
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                        letterSpacing: '4px',
                        textTransform: 'uppercase',
                        fontSize: '0.65rem'
                    }}
                >
                    EMS
                </Typography>
            </Stack>
        </Stack>
    );
};

export default Logo;