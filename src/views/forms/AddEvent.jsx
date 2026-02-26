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

const AddEvent = () => {
    const [values, setValues] = useState({
        name: '',
        date: '',
        venue: '',
        description: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = () => {
        setIsLoading(true);
        setTimeout(() => {
            console.log('Event Form Submitted with Data:', values);
            alert('Event Added! (Check Console for Data)');
            setValues({ name: '', date: '', venue: '', description: '' });
            setIsLoading(false);
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
