import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Logo() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box
        sx={{
          width: 32,
          height: 32,
          border: '2px solid #fff',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography sx={{ fontWeight: 800, fontSize: '1.2rem', color: '#fff' }}>
        F
        </Typography>
      </Box>
      <Typography
        sx={{
          fontSize: '1.4rem',
          fontWeight: 700,
          color: '#ffffff',
          letterSpacing: '0.5px'
        }}>Frolic-EMS
      </Typography>
    </Box>
  );
}

