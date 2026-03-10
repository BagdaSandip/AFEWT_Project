import React, { useEffect, useState } from 'react';

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
  TablePagination,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  MenuItem,
  Stack
} from '@mui/material';

import {
  IconPlus,
  IconEdit,
  IconTrash
} from '@tabler/icons-react';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// ==============================|| EVENTS LIST PAGE ||============================== //

const Event = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [events, setEvents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);

  // Modal State
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEventId, setCurrentEventId] = useState(null);
  const [formData, setFormData] = useState({
    EventName: '',
    EventTagline: '',
    EventImage: '',
    EventDescription: '',
    GroupMinParticipants: 1,
    GroupMaxParticipants: 1,
    EventFees: 0,
    EventFirstPrice: 0,
    EventSecondPrice: 0,
    EventThirdPrice: 0,
    DepartmentID: '',
    EventCoOrdinatorID: '',
    EventMainStudentCoOrdinatorName: '',
    EventMainStudentCoOrdinatorPhone: '',
    EventMainStudentCoOrdinatorEmail: '',
    EventLocation: '',
    MaxGroupsAllowed: 10
  });

  const fetchData = async () => {
    try {
      // Fetch Events
      const evRes = await fetch("/api/events", { credentials: 'include' });
      if (evRes.status === 401) {
        window.location.href = '/';
        throw new Error('Unauthorized');
      }
      const evData = await evRes.json();
      if (evData && evData.events) setEvents(evData.events);

      // Fetch Departments for Dropdown
      const depRes = await fetch("/api/departments", { credentials: 'include' });
      const depData = await depRes.json();
      if (depData && depData.departments) setDepartments(depData.departments);

      // Fetch Users for Dropdown
      const userRes = await fetch("/api/users/list", { credentials: 'include' });
      const userData = await userRes.json();
      if (userData && userData.users) setUsers(userData.users);

    } catch (err) {
      console.log('Error fetching data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenDialog = (eventObj = null) => {
    if (eventObj) {
      setIsEditing(true);
      setCurrentEventId(eventObj._id);
      setFormData({
        EventName: eventObj.EventName || '',
        EventTagline: eventObj.EventTagline || '',
        EventImage: eventObj.EventImage || '',
        EventDescription: eventObj.EventDescription || '',
        GroupMinParticipants: eventObj.GroupMinParticipants || 1,
        GroupMaxParticipants: eventObj.GroupMaxParticipants || 1,
        EventFees: eventObj.EventFees || 0,
        EventFirstPrice: eventObj.EventFirstPrice || 0,
        EventSecondPrice: eventObj.EventSecondPrice || 0,
        EventThirdPrice: eventObj.EventThirdPrice || 0,
        DepartmentID: eventObj.DepartmentID || '',
        EventCoOrdinatorID: eventObj.EventCoOrdinatorID || '',
        EventMainStudentCoOrdinatorName: eventObj.EventMainStudentCoOrdinatorName || '',
        EventMainStudentCoOrdinatorPhone: eventObj.EventMainStudentCoOrdinatorPhone || '',
        EventMainStudentCoOrdinatorEmail: eventObj.EventMainStudentCoOrdinatorEmail || '',
        EventLocation: eventObj.EventLocation || '',
        MaxGroupsAllowed: eventObj.MaxGroupsAllowed || 10
      });
    } else {
      setIsEditing(false);
      setCurrentEventId(null);
      setFormData({
        EventName: '',
        EventTagline: '',
        EventImage: '',
        EventDescription: '',
        GroupMinParticipants: 1,
        GroupMaxParticipants: 1,
        EventFees: 0,
        EventFirstPrice: 0,
        EventSecondPrice: 0,
        EventThirdPrice: 0,
        DepartmentID: '',
        EventCoOrdinatorID: '',
        EventMainStudentCoOrdinatorName: '',
        EventMainStudentCoOrdinatorPhone: '',
        EventMainStudentCoOrdinatorEmail: '',
        EventLocation: '',
        MaxGroupsAllowed: 10
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => setOpenDialog(false);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async () => {
    try {
      const url = isEditing ? `/api/events/${currentEventId}` : '/api/events';
      const method = isEditing ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        handleCloseDialog();
        fetchData(); // refresh list
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Error saving event');
      }
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        const response = await fetch(`/api/events/${id}`, {
          method: 'DELETE',
          credentials: 'include'
        });
        if (response.ok) {
          fetchData(); // refresh list
        } else {
          const errorData = await response.json();
          alert(errorData.message || 'Error deleting event. Verify you are logged in as Admin.');
        }
      } catch (err) {
        console.error('Delete error:', err);
      }
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <MainCard title="Events Management">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                <Typography variant="body1">
                  Below is the list of events.
                </Typography>
                <Button variant="contained" color="secondary" startIcon={<IconPlus />} onClick={() => handleOpenDialog()}>
                  Add Event
                </Button>
              </Stack>

              {/* Table Component */}
              <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: 2 }}>
                <Table sx={{ minWidth: 650 }} aria-label="events table">
                  <TableHead sx={{ bgcolor: '#e3f2fd' }}>
                    <TableRow>
                      <TableCell width="20%"><strong>Event Name</strong></TableCell>
                      <TableCell width="20%"><strong>Tagline</strong></TableCell>
                      <TableCell align="center" width="10%"><strong>Fees</strong></TableCell>
                      <TableCell width="15%"><strong>Department ID</strong></TableCell>
                      <TableCell width="15%"><strong>Co-ordinator</strong></TableCell>
                      <TableCell align="center" width="10%"><strong>Created At</strong></TableCell>
                      <TableCell align="center" width="10%"><strong>Actions</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {events.length > 0 ? (
                      events
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                          <TableRow
                            key={row._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#f5f5f5' } }}
                          >
                            <TableCell>
                              <Typography variant="subtitle1" fontWeight="bold">{row.EventName}</Typography>
                            </TableCell>
                            <TableCell>{row.EventTagline}</TableCell>
                            <TableCell align="center">₹{row.EventFees}</TableCell>
                            <TableCell>{row.DepartmentID}</TableCell>
                            <TableCell>{row.EventMainStudentCoOrdinatorName}</TableCell>
                            <TableCell align="center">
                              {new Date(row.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell align="center">
                              <Stack direction="row" spacing={1} justifyContent="center">
                                <IconButton color="primary" onClick={() => handleOpenDialog(row)} size="small">
                                  <IconEdit size={20} />
                                </IconButton>
                                <IconButton color="error" onClick={() => handleDelete(row._id)} size="small">
                                  <IconTrash size={20} />
                                </IconButton>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          <Typography variant="body1" sx={{ py: 3 }}>
                            No events found.
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={events.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
              {/* End Table */}

            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ADD / EDIT DIALOG */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle>{isEditing ? 'Edit Event' : 'Add New Event'}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            {/* Row 1 */}
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Event Name" name="EventName" value={formData.EventName} onChange={handleFormChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Tagline" name="EventTagline" value={formData.EventTagline} onChange={handleFormChange} />
            </Grid>
            {/* Row 2 */}
            <Grid item xs={12} sm={6}>
              <TextField fullWidth select label="Department" name="DepartmentID" value={formData.DepartmentID} onChange={handleFormChange} required>
                {departments.map((dept) => (
                  <MenuItem key={dept._id} value={dept._id}>{dept.DepartmentName}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth select label="Event Co-ordinator User" name="EventCoOrdinatorID" value={formData.EventCoOrdinatorID} onChange={handleFormChange} required>
                {users.map((user) => (
                  <MenuItem key={user._id} value={user._id}>
                    {user.UserName} ({user.EmailAddress})
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {/* Row 3 - Numbers */}
            <Grid item xs={6} sm={3}>
              <TextField fullWidth type="number" label="Min Participants" name="GroupMinParticipants" value={formData.GroupMinParticipants} onChange={handleFormChange} InputProps={{ inputProps: { min: 1 } }} />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField fullWidth type="number" label="Max Participants" name="GroupMaxParticipants" value={formData.GroupMaxParticipants} onChange={handleFormChange} InputProps={{ inputProps: { min: 1 } }} />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField fullWidth type="number" label="Max Groups Allowed" name="MaxGroupsAllowed" value={formData.MaxGroupsAllowed} onChange={handleFormChange} />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField fullWidth type="number" label="Event Fees (₹)" name="EventFees" value={formData.EventFees} onChange={handleFormChange} />
            </Grid>
            {/* Row 4 - Prizes */}
            <Grid item xs={12} sm={4}>
              <TextField fullWidth type="number" label="1st Prize (₹)" name="EventFirstPrice" value={formData.EventFirstPrice} onChange={handleFormChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth type="number" label="2nd Prize (₹)" name="EventSecondPrice" value={formData.EventSecondPrice} onChange={handleFormChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth type="number" label="3rd Prize (₹)" name="EventThirdPrice" value={formData.EventThirdPrice} onChange={handleFormChange} />
            </Grid>
            {/* Row 5 - Student Coordinators */}
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Student Co-ord Name" name="EventMainStudentCoOrdinatorName" value={formData.EventMainStudentCoOrdinatorName} onChange={handleFormChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Student Co-ord Phone" name="EventMainStudentCoOrdinatorPhone" value={formData.EventMainStudentCoOrdinatorPhone} onChange={handleFormChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Student Co-ord Email" name="EventMainStudentCoOrdinatorEmail" value={formData.EventMainStudentCoOrdinatorEmail} onChange={handleFormChange} />
            </Grid>
            {/* Row 6 - Description & Location */}
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Location" name="EventLocation" value={formData.EventLocation} onChange={handleFormChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Description" name="EventDescription" value={formData.EventDescription} onChange={handleFormChange} multiline rows={3} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleFormSubmit}>
            {isEditing ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  );
};

export default Event;
