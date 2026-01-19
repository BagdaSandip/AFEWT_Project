// material-ui
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
    const theme = useTheme();

    return (
        <Stack direction="row" alignItems="center" spacing={1}>
            {/* Optional: You can keep an icon here if you want, or just text */}
            <Typography 
                variant="h3" 
                sx={{ 
                    fontWeight: 700, 
                    color: theme.palette.secondary.main, // Uses the theme's purple color
                    letterSpacing: '0.5px'
                }}
            >
                Frolic-EMS
            </Typography>
        </Stack>
    );
};

export default Logo;