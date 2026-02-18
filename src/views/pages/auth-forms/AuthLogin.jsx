import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress'; // Added CircularProgress

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import CustomFormControl from 'ui-component/extended/Form/CustomFormControl';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ===============================|| AUTH LOGIN ||=============================== //

export default function AuthLogin() {
  const [checked, setChecked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  const navigate = useNavigate(); // ✅ navigation hook

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // ✅ LOGIN HANDLER (THIS WAS MISSING)
  const handleLogin = () => {
    setIsLoading(true); // Start loading

    // Simulate API call
    setTimeout(() => {
      // temporary login success
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoading(false); // Stop loading (optional as we navigate away)
      // redirect to dashboard
      navigate('/dashboard/default');
    }, 1500);
  };

  return (
    <>
      <CustomFormControl fullWidth>
        <InputLabel htmlFor="outlined-adornment-email-login">
          Email Address / Username
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-email-login"
          type="email"
          value="info@codedthemes.com"
          name="email"
        />
      </CustomFormControl>

      <CustomFormControl fullWidth>
        <InputLabel htmlFor="outlined-adornment-password-login">
          Password
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password-login"
          type={showPassword ? 'text' : 'password'}
          value="123456"
          name="password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                size="large"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </CustomFormControl>

      <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Grid>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={(event) => setChecked(event.target.checked)}
                name="checked"
                color="primary"
              />
            }
            label="Keep me logged in"
          />
        </Grid>
        <Grid>
          <Typography
            variant="subtitle1"
            component={Link}
            to="#!"
            sx={{ textDecoration: 'none', color: 'secondary.main' }}
          >
            Forgot Password?
          </Typography>
        </Grid>
      </Grid>

      <Box sx={{ mt: 2 }}>
        <AnimateButton>
          <Button
            disableElevation
            disabled={isLoading} // Disable while loading
            fullWidth
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={handleLogin}   // ✅ CONNECTED HERE
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
          </Button>
        </AnimateButton>
      </Box>
    </>
  );
}
