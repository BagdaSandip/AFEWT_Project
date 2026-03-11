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

// ==============================|| ADD PARTICIPANT FORM ||============================== //

const AddParticipant = () => {
    // Dropdown options
    const [events, setEvents] = useState([]);
    const [groups, setGroups] = useState([]);

    // State to handle form inputs
    const [values, setValues] = useState({
        event: '',
        group: '',
        name: '',
        enrollment: '',
        institute: '',
        city: '',
        email: '',
        phone: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    // Fetch Events on load
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

    // Fetch Groups when Event changes
    useEffect(() => {
        const fetchGroups = async () => {
            if (!values.event) {
                setGroups([]);
                return;
            }
            try {
                const res = await fetch(`/api/events/${values.event}/groups`, { credentials: 'include' });
                const data = await res.json();
                if (res.ok && data && data.groups) {
                    setGroups(data.groups);
                } else {
                    setGroups([]);
                }
            } catch (err) {
                toast.error("Failed to load groups");
                setGroups([]);
            }
        };
        fetchGroups();
    }, [values.event]);

    // Handle input changes
    const handleChange = (prop) => (event) => {
        const newValue = event.target.value;
        setValues((prev) => {
            const updated = { ...prev, [prop]: newValue };
            if (prop === 'event') {
                updated.group = '';
            }
            return updated;
        });
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (!values.group || !values.name || !values.enrollment) {
            toast.error("Group, Name, and Enrollment Number are required");
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch(`/api/groups/${values.group}/participants`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify({
                    ParticipantName: values.name,
                    ParticipantEnrollmentNumber: values.enrollment,
                    ParticipantInstituteName: values.institute,
                    ParticipantCity: values.city,
                    ParticipantMobile: values.phone,
                    ParticipantEmail: values.email
                })
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Participant added successfully!");
                // Keep event and group selection, reset other fields
                setValues({ ...values, name: '', enrollment: '', institute: '', city: '', email: '', phone: '' });
            } else {
                toast.error(data.message || "Failed to add participant");
            }
        } catch (err) {
            toast.error("An error occurred. Please try again.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
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
                                {/* Event Select */}
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Select Event"
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

                                {/* Group Select */}
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Select Group"
                                        value={values.group}
                                        onChange={handleChange('group')}
                                        variant="outlined"
                                        required
                                        disabled={!values.event}
                                    >
                                        <MenuItem value="" disabled>
                                            <em>{values.event ? (groups.length > 0 ? "-- Select a Group --" : "No Groups Available") : "-- Select an Event first --"}</em>
                                        </MenuItem>
                                        {groups.map((option) => (
                                            <MenuItem key={option._id} value={option._id}>
                                                {option.GroupName}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                {/* Name Input */}
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Full Name"
                                        placeholder="e.g. John Doe"
                                        value={values.name}
                                        onChange={handleChange('name')}
                                        variant="outlined"
                                        required
                                    />
                                </Grid>

                                {/* Enrollment Input */}
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Enrollment Number"
                                        placeholder="e.g. 12345678"
                                        value={values.enrollment}
                                        onChange={handleChange('enrollment')}
                                        variant="outlined"
                                        required
                                    />
                                </Grid>

                                {/* Institute Input */}
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Institute Name"
                                        placeholder="e.g. ABC College"
                                        value={values.institute}
                                        onChange={handleChange('institute')}
                                        variant="outlined"
                                    />
                                </Grid>

                                {/* City Input */}
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="City"
                                        placeholder="e.g. New York"
                                        value={values.city}
                                        onChange={handleChange('city')}
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

                                {/* Submit Button */}
                                <Grid item xs={12}>
                                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                                        <Button variant="outlined" color="error" onClick={() => setValues({ event: '', group: '', name: '', enrollment: '', institute: '', city: '', email: '', phone: '' })} disabled={isLoading}>
                                            Clear
                                        </Button>
                                        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={isLoading}>
                                            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Add Participant'}
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
