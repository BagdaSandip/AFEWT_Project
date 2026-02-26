import React, { useState } from 'react';

import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Stack,
  CircularProgress
} from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

const AddInstitutePage = () => {
  const [values, setValues] = useState({
    name: '',
    code: '',
    location: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      console.log('Form Submitted with Data:', values);
      alert('Institute Added! (Check Console for Data)');
      setValues({ name: '', code: '', location: '' });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <MainCard title="Add New Institute">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="body2" sx={{ mb: 3 }}>
                Fill in the details below to register a new institute.
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Institute Name"
                    placeholder="e.g. School of Business"
                    value={values.name}
                    onChange={handleChange('name')}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Institute Code"
                    placeholder="e.g. SOB"
                    value={values.code}
                    onChange={handleChange('code')}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Location / Block"
                    placeholder="e.g. North Campus, Block B"
                    value={values.location}
                    onChange={handleChange('location')}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button variant="outlined" color="error" onClick={() => setValues({ name: '', code: '', location: '' })} disabled={isLoading}>
                      Clear
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleSubmit} disabled={isLoading}>
                      {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Add Institute'}
                    </Button>
                  </Stack>
                </Grid>
              </Grid>

            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default AddInstitutePage;