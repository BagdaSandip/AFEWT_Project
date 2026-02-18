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
    MenuItem,
    CircularProgress
} from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// ==============================|| ADD GROUP FORM ||============================== //

const events = [
    { value: 'techfest', label: 'Tech Fest 2026' },
    { value: 'cultural', label: 'Art & Culture Expo' },
    { value: 'sports', label: 'Annual Sports Day' }
];

const AddGroup = () => {
    // State to handle form inputs
    const [values, setValues] = useState({
        name: '',
        event: '',
        members: ''
    });
    const [isLoading, setIsLoading] = useState(false); // Added loading state

    // Handle input changes
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    // Handle dummy submission
    const handleSubmit = () => {
        setIsLoading(true); // Start loading
        // Simulate API call
        setTimeout(() => {
            console.log('Group Form Submitted with Data:', values);
            alert('Group Added! (Check Console for Data)');
            // Reset form
            setValues({ name: '', event: '', members: '' });
            setIsLoading(false); // Stop loading
        }, 1500);
    };

    return (
        <MainCard title="Add New Group">
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="body2" sx={{ mb: 3 }}>
                                Fill in the details below to create a new group.
                            </Typography>

                            <Grid container spacing={3}>
                                {/* Group Name Input */}
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Group Name"
                                        placeholder="e.g. Binary Bandits"
                                        value={values.name}
                                        onChange={handleChange('name')}
                                        variant="outlined"
                                    />
                                </Grid>

                                {/* Event Select */}
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Event"
                                        value={values.event}
                                        onChange={handleChange('event')}
                                        variant="outlined"
                                    >
                                        {events.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                {/* Member Count Input */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        label="Number of Members"
                                        placeholder="e.g. 5"
                                        value={values.members}
                                        onChange={handleChange('members')}
                                        variant="outlined"
                                    />
                                </Grid>

                                {/* Submit Button */}
                                <Grid item xs={12}>
                                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                                        <Button variant="outlined" color="error" onClick={() => setValues({ name: '', event: '', members: '' })} disabled={isLoading}>
                                            Clear
                                        </Button>
                                        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={isLoading}>
                                            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Add Group'}
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

export default AddGroup;
