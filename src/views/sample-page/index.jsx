import React, { useState } from 'react';

// material-ui components
import { 
  Grid, 
  TextField, 
  Button, 
  Card, 
  CardContent, 
  Typography,
  Stack 
} from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// ==============================|| ADD INSTITUTE FORM ||============================== //

const AddInstitutePage = () => {
  // State to handle form inputs
  const [values, setValues] = useState({
    name: '',
    code: '',
    location: ''
  });

  // Handle input changes
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // Handle dummy submission (Week 3 Requirement)
  const handleSubmit = () => {
    console.log('Form Submitted with Data:', values);
    alert('Institute Added! (Check Console for Data)');
    // Reset form
    setValues({ name: '', code: '', location: '' });
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
                {/* Institute Name Input */}
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

                {/* Institute Code Input */}
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

                {/* Location Input */}
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

                {/* Submit Button */}
                <Grid item xs={12}>
                  <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button variant="outlined" color="error" onClick={() => setValues({ name: '', code: '', location: '' })}>
                      Clear
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                      Add Institute
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