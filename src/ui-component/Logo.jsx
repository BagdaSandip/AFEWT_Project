import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import { IconBrandAbstract } from '@tabler/icons-react';

const Logo = () => {
    const theme = useTheme();

    return (
        <Stack direction="row" alignItems="center" spacing={1}>
            <IconBrandAbstract size={32} color={theme.palette.secondary.main} stroke={1.5} />
            <Stack spacing={-0.5}>
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 700,
                        color: theme.palette.secondary.main,
                        letterSpacing: '1px',
                        textTransform: 'uppercase'
                    }}
                >
                    Frolic
                </Typography>
                <Typography
                    variant="caption"
                    sx={{
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                        letterSpacing: '2px',
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