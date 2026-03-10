import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// material-ui
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress'; // Added CircularProgress

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import CustomFormControl from 'ui-component/extended/Form/CustomFormControl';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ===========================|| JWT - REGISTER ||=========================== //

export default function AuthRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
    setPassword(value);
  };

  const handleRegister = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          UserName: `${fname} ${lname}`.trim(),
          EmailAddress: email,
          PhoneNumber: phone,
          UserPassword: password,
          isAdmin: false
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Registration successful! You can now log in.');
        navigate('/');
      } else {
        const errorMsg = data.message || 'Registration failed';
        setError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    changePassword('');
  }, []);

  return (
    <>
      <Stack sx={{ mb: 2, alignItems: 'center' }}>
        <Typography variant="subtitle1">Sign up with Email address </Typography>
      </Stack>

      <Grid container spacing={{ xs: 0, sm: 2 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomFormControl fullWidth>
            <InputLabel htmlFor="outlined-adornment-first-register">First Name</InputLabel>
            <OutlinedInput
              id="outlined-adornment-first-register"
              type="text"
              name="firstName"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
          </CustomFormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomFormControl fullWidth>
            <InputLabel htmlFor="outlined-adornment-last-register">Last Name</InputLabel>
            <OutlinedInput
              id="outlined-adornment-last-register"
              type="text"
              name="lastName"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            />
          </CustomFormControl>
        </Grid>
      </Grid>
      <CustomFormControl fullWidth>
        <InputLabel htmlFor="outlined-adornment-email-register">Email Address</InputLabel>
        <OutlinedInput
          id="outlined-adornment-email-register"
          type="email"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </CustomFormControl>

      <CustomFormControl fullWidth>
        <InputLabel htmlFor="outlined-adornment-phone-register">Phone Number</InputLabel>
        <OutlinedInput
          id="outlined-adornment-phone-register"
          type="text"
          value={phone}
          name="phone"
          onChange={(e) => setPhone(e.target.value)}
        />
      </CustomFormControl>
      <CustomFormControl fullWidth>
        <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password-register"
          type={showPassword ? 'text' : 'password'}
          value={password}
          name="password"
          label="Password"
          onChange={(e) => changePassword(e.target.value)}
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
        />
      </CustomFormControl>

      {error && (
        <Box sx={{ mb: 2 }}>
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        </Box>
      )}

      {strength !== 0 && (
        <FormControl fullWidth>
          <Box sx={{ mb: 2 }}>
            <Stack direction="row" sx={{ gap: 2, alignItems: 'center' }}>
              <Box sx={{ width: 85, height: 8, borderRadius: '7px', bgcolor: level?.color }} />
              <Typography variant="subtitle1" sx={{ fontSize: '0.75rem' }}>
                {level?.label}
              </Typography>
            </Stack>
          </Box>
        </FormControl>
      )}

      <FormControlLabel
        control={<Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />}
        label={
          <Typography variant="subtitle1">
            Agree with &nbsp;
            <Typography variant="subtitle1" component={Link} to="#">
              Terms & Condition.
            </Typography>
          </Typography>
        }
      />

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
            onClick={handleRegister}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign up'}
          </Button>
        </AnimateButton>
      </Box>
    </>
  );
}
