import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

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

const AddGroup = () => {
    // State to handle form inputs
    const [events, setEvents] = useState([]);
    const [values, setValues] = useState({
        name: '',
        event: '',
        members: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    // Fetch Events on Load
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch("/api/events", { credentials: 'include' });
                const data = await res.json();
                if (res.ok && data && data.events) {
                    setEvents(data.events);
                }
            } catch (err) {
                toast.error("Failed to load events");
            }
        };
        fetchEvents();
    }, []);

    // Handle input changes
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    // Handle API submission
    const handleSubmit = async () => {
        if (!values.name || !values.event) {
            toast.error("Group Name and Event are required!");
            return;
        }

        setIsLoading(true); // Start loading
        try {
            const res = await fetch(`/api/events/${values.event}/groups`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify({ GroupName: values.name })
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Group created successfully!");
                // Reset form
                setValues({ name: '', event: '', members: '' });
            } else {
                toast.error(data.message || "Failed to create group");
            }
        } catch (err) {
            toast.error("An error occurred. Please try again.");
            console.error(err);
        } finally {
            setIsLoading(false); // Stop loading
        }
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
                                        required
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
                                        required
                                    >
                                        <MenuItem value="" disabled><em>-- Select an Event --</em></MenuItem>
                                        {events.map((option) => (
                                            <MenuItem key={option._id} value={option._id}>
                                                {option.EventName}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                {/* Member Count Input (Optional/Informational for now) */}
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
