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
    CircularProgress
} from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// ==============================|| ADD EVENT FORM ||============================== //

const AddEvent = () => {
    // State to handle form inputs
    const [values, setValues] = useState({
        name: '',
        date: '',
        venue: '',
        description: ''
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
            console.log('Event Form Submitted with Data:', values);
            alert('Event Added! (Check Console for Data)');
            // Reset form
            setValues({ name: '', date: '', venue: '', description: '' });
            setIsLoading(false); // Stop loading
        }, 1500);
    };

    return (
        <MainCard title="Add New Event">
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="body2" sx={{ mb: 3 }}>
                                Fill in the details below to create a new event.
                            </Typography>

                            <Grid container spacing={3}>
                                {/* Event Name Input */}
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Event Name"
                                        placeholder="e.g. Tech Fest 2026"
                                        value={values.name}
                                        onChange={handleChange('name')}
                                        variant="outlined"
                                    />
                                </Grid>

                                {/* Date Input */}
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        type="date"
                                        label="Event Date"
                                        InputLabelProps={{ shrink: true }}
                                        value={values.date}
                                        onChange={handleChange('date')}
                                        variant="outlined"
                                    />
                                </Grid>

                                {/* Venue Input */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Venue"
                                        placeholder="e.g. Main Auditorium"
                                        value={values.venue}
                                        onChange={handleChange('venue')}
                                        variant="outlined"
                                    />
                                </Grid>

                                {/* Description Input */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={4}
                                        label="Description"
                                        placeholder="Enter event details..."
                                        value={values.description}
                                        onChange={handleChange('description')}
                                        variant="outlined"
                                    />
                                </Grid>

                                {/* Submit Button */}
                                <Grid item xs={12}>
                                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                                        <Button variant="outlined" color="error" onClick={() => setValues({ name: '', date: '', venue: '', description: '' })} disabled={isLoading}>
                                            Clear
                                        </Button>
                                        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={isLoading}>
                                            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Add Event'}
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

export default AddEvent;
