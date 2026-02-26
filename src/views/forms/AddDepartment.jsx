import React, { useState } from 'react';

import {
    Grid,
    TextField,
    Button,
    Card,
    CardContent,
    Typography,
    Stack,
    MenuItem,
    CircularProgress
} from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

const institutes = [
    { value: 'IOT', label: 'Institute of Technology' },
    { value: 'SBM', label: 'School of Business Management' },
    { value: 'CAH', label: 'College of Arts & Humanities' },
    { value: 'FOS', label: 'Faculty of Science' }
];

const AddDepartment = () => {
    const [values, setValues] = useState({
        name: '',
        institute: '',
        head: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = () => {
        setIsLoading(true);
        setTimeout(() => {
            console.log('Department Form Submitted with Data:', values);
            alert('Department Added! (Check Console for Data)');
            setValues({ name: '', institute: '', head: '' });
            setIsLoading(false);
        }, 1500);
    };

    return (
        <MainCard title="Add New Department">
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="body2" sx={{ mb: 3 }}>
                                Fill in the details below to add a new department.
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Department Name"
                                        placeholder="e.g. Computer Science"
                                        value={values.name}
                                        onChange={handleChange('name')}
                                        variant="outlined"
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Institute"
                                        value={values.institute}
                                        onChange={handleChange('institute')}
                                        variant="outlined"
                                    >
                                        {institutes.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Head of Department"
                                        placeholder="e.g. Dr. A. Sharma"
                                        value={values.head}
                                        onChange={handleChange('head')}
                                        variant="outlined"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                                        <Button variant="outlined" color="error" onClick={() => setValues({ name: '', institute: '', head: '' })} disabled={isLoading}>
                                            Clear
                                        </Button>
                                        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={isLoading}>
                                            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Add Department'}
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

export default AddDepartment;
