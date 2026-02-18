import React, { useState } from 'react';

// material-ui components
import {
    Grid,
    TextField,
    Button,
    Card,
    CardContent,
    Typography,
    Stack,
    MenuItem
} from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// ==============================|| ADD PARTICIPANT FORM ||============================== //

const groups = [
    { value: 'g1', label: 'Binary Bandits (Tech Fest)' },
    { value: 'g2', label: 'Artistic Souls (Art Expo)' },
    { value: 'g3', label: 'Speed Demons (Sports Day)' }
];

const AddParticipant = () => {
    // State to handle form inputs
    const [values, setValues] = useState({
        name: '',
        email: '',
        phone: '',
        group: ''
    });

    // Handle input changes
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    // Handle dummy submission
    const handleSubmit = () => {
        console.log('Participant Form Submitted with Data:', values);
        alert('Participant Added! (Check Console for Data)');
        // Reset form
        setValues({ name: '', email: '', phone: '', group: '' });
    };

    return (
        <MainCard title="Add New Participant">
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="body2" sx={{ mb: 3 }}>
                                Fill in the details below to register a new participant.
                            </Typography>

                            <Grid container spacing={3}>
                                {/* Name Input */}
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Full Name"
                                        placeholder="e.g. John Doe"
                                        value={values.name}
                                        onChange={handleChange('name')}
                                        variant="outlined"
                                    />
                                </Grid>

                                {/* Email Input */}
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        type="email"
                                        label="Email Address"
                                        placeholder="e.g. john@example.com"
                                        value={values.email}
                                        onChange={handleChange('email')}
                                        variant="outlined"
                                    />
                                </Grid>

                                {/* Phone Input */}
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Phone Number"
                                        placeholder="e.g. +91 9876543210"
                                        value={values.phone}
                                        onChange={handleChange('phone')}
                                        variant="outlined"
                                    />
                                </Grid>

                                {/* Group Select */}
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Assign Group/Event"
                                        value={values.group}
                                        onChange={handleChange('group')}
                                        variant="outlined"
                                    >
                                        {groups.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                {/* Submit Button */}
                                <Grid item xs={12}>
                                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                                        <Button variant="outlined" color="error" onClick={() => setValues({ name: '', email: '', phone: '', group: '' })}>
                                            Clear
                                        </Button>
                                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                                            Add Participant
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

export default AddParticipant;
