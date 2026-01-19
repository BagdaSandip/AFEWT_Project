import React from 'react';

// material-ui components
import { 
  Grid, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  CardContent,
  Card,
  Chip
} from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// ==============================|| EVENTS LIST PAGE ||============================== //

// Updated Dummy Data with 15 Events
const dummyEvents = [
    { id: 1, name: 'Tech Fest 2026', date: '2026-03-15', venue: 'Main Auditorium', status: 'Upcoming' },
    { id: 2, name: 'Art & Culture Expo', date: '2026-02-20', venue: 'Block C Gallery', status: 'Completed' },
    { id: 3, name: 'Annual Sports Day', date: '2026-04-10', venue: 'Sports Complex', status: 'Upcoming' },
    { id: 4, name: 'Hackathon v2.0', date: '2026-03-22', venue: 'IT Center Labs', status: 'Registration Open' },
    { id: 5, name: 'Guest Lecture: AI', date: '2026-02-05', venue: 'Seminar Hall B', status: 'Completed' },
    { id: 6, name: 'Music Concert', date: '2026-05-01', venue: 'Open Air Theatre', status: 'Planned' },
    { id: 7, name: 'Science Exhibition', date: '2026-04-15', venue: 'Science Block', status: 'Upcoming' },
    { id: 8, name: 'Startup Summit', date: '2026-06-10', venue: 'Auditorium', status: 'Draft' },
    { id: 9, name: 'Alumni Meet 2026', date: '2026-01-25', venue: 'Convention Center', status: 'Completed' },
    { id: 10, name: 'Blood Donation Camp', date: '2026-03-01', venue: 'Student Center', status: 'Upcoming' },
    { id: 11, name: 'Robotics Workshop', date: '2026-03-18', venue: 'Mech Eng. Lab', status: 'Registration Open' },
    { id: 12, name: 'Inter-College Debate', date: '2026-04-05', venue: 'Lecture Hall 1', status: 'Planned' },
    { id: 13, name: 'Photography Contest', date: '2026-02-28', venue: 'Campus Grounds', status: 'Ongoing' },
    { id: 14, name: 'Farewell Party', date: '2026-05-20', venue: 'Grand Hotel Hall', status: 'Draft' },
    { id: 15, name: 'Placement Drive', date: '2026-06-01', venue: 'Exam Hall', status: 'Planned' }
];

// Helper function to choose Chip color based on status
const getStatusColor = (status) => {
    switch (status) {
        case 'Upcoming': return 'primary';
        case 'Registration Open': return 'success';
        case 'Ongoing': return 'success';
        case 'Completed': return 'default';
        case 'Planned': return 'warning';
        case 'Draft': return 'secondary';
        default: return 'primary';
    }
};

const EventsPage = () => {
  return (
    <MainCard title="Events Management">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Below is the schedule of all university events.
              </Typography>
              
              {/* Table Component */}
              <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: 2 }}>
                <Table sx={{ minWidth: 650 }} aria-label="events table">
                  <TableHead sx={{ bgcolor: '#e3f2fd' }}>
                    <TableRow>
                      <TableCell><strong>ID</strong></TableCell>
                      <TableCell><strong>Event Name</strong></TableCell>
                      <TableCell><strong>Date</strong></TableCell>
                      <TableCell><strong>Venue</strong></TableCell>
                      <TableCell align="center"><strong>Status</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dummyEvents.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#f5f5f5' } }}
                      >
                        <TableCell component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle1" fontWeight="bold">{row.name}</Typography>
                        </TableCell>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>{row.venue}</TableCell>
                        <TableCell align="center">
                            <Chip 
                                label={row.status} 
                                color={getStatusColor(row.status)} 
                                variant="filled" 
                                size="small" 
                            />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* End Table */}
              
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default EventsPage;