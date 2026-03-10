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
  Card,
  Stack,
  Box,
  Avatar,
  TablePagination,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton
} from '@mui/material';

// icons
import {
  IconBuildingSkyscraper,
  IconUsers,
  IconSchool,
  IconCalendarEvent,
  IconPlus,
  IconEdit,
  IconTrash
} from '@tabler/icons-react';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';

// ==============================|| INSTITUTES LIST PAGE ||============================== //

// Helper Component for Top Stats
const StatCard = ({ title, count, icon: Icon, color }) => (
  <Card sx={{ bgcolor: color + '.light', p: 2.25 }}>
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Box>
        <Typography variant="subtitle1" sx={{ color: color + '.dark' }}>{title}</Typography>
        <Typography variant="h3" sx={{ color: color + '.main' }}>{count}</Typography>
      </Box>
      <Avatar variant="rounded" sx={{ bgcolor: color + '.main', color: '#fff' }}>
        <Icon size={24} />
      </Avatar>
    </Stack>
  </Card>
);

const Institute = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [institutes, setInstitutes] = useState([]);
  const [users, setUsers] = useState([]);

  // Modal State
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentInstituteId, setCurrentInstituteId] = useState(null);
  const [formData, setFormData] = useState({
    InstituteName: '',
    InstituteDescription: '',
    InstituteCoOrdinatorID: ''
  });

  const fetchInstitutes = () => {
    fetch("/api/institute", { credentials: 'include' })
      .then(async (response) => {
        if (response.status === 401) {
          // Redirect to login if unauthorized
          window.location.href = '/';
          throw new Error('Unauthorized');
        }
        return response.json();
      })
      .then(data => {
        if (data && data.institutes) {
          setInstitutes(data.institutes);
        }
      })
      .catch(err => console.log('Error fetching institutes:', err));

    fetch("/api/users/list", { credentials: 'include' })
      .then(response => response.json())
      .then(data => {
        if (data && data.users) {
          setUsers(data.users);
        }
      })
      .catch(err => console.log('Error fetching users:', err));
  };

  useEffect(() => {
    fetchInstitutes();
  }, []);

  const handleOpenDialog = (institute = null) => {
    if (institute) {
      setIsEditing(true);
      setCurrentInstituteId(institute._id);
      setFormData({
        InstituteName: institute.InstituteName,
        InstituteDescription: institute.InstituteDescription,
        InstituteCoOrdinatorID: institute.InstituteCoOrdinatorID
      });
    } else {
      setIsEditing(false);
      setCurrentInstituteId(null);
      setFormData({
        InstituteName: '',
        InstituteDescription: '',
        InstituteCoOrdinatorID: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async () => {
    try {
      const url = isEditing ? `/api/institute/${currentInstituteId}` : '/api/institute';
      const method = isEditing ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        handleCloseDialog();
        fetchInstitutes(); // refresh list
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Error saving institute');
      }
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this institute?")) {
      try {
        const response = await fetch(`/api/institute/${id}`, {
          method: 'DELETE',
          credentials: 'include'
        });
        if (response.ok) {
          fetchInstitutes(); // refresh list
        } else {
          const errorData = await response.json();
          alert(errorData.message || 'Error deleting institute. Verify you are logged in as Admin.');
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
    <MainCard title="Institutes Management">
      <Grid container spacing={gridSpacing}>

        {/* ROW 1: TOP STATS WIDGETS */}
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item lg={3} md={6} sm={6} xs={12}>
              <StatCard title="Total Institutes" count={institutes.length.toString()} icon={IconBuildingSkyscraper} color="secondary" />
            </Grid>
            <Grid item lg={3} md={6} sm={6} xs={12}>
              <StatCard title="Total Students" count="12,450" icon={IconUsers} color="primary" />
            </Grid>
            <Grid item lg={3} md={6} sm={6} xs={12}>
              <StatCard title="Departments" count="45" icon={IconSchool} color="orange" />
            </Grid>
            <Grid item lg={3} md={6} sm={6} xs={12}>
              <StatCard title="Events Hosted" count="156" icon={IconCalendarEvent} color="success" />
            </Grid>
          </Grid>
        </Grid>

        {/* ROW 2: THE MAIN TABLE */}
        <Grid item xs={12}>
          <SubCard title={
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h4">Registered Institutes List</Typography>
              <Button variant="contained" color="secondary" startIcon={<IconPlus />} onClick={() => handleOpenDialog()}>
                Add Institute
              </Button>
            </Stack>
          }>
            <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
              <Table sx={{ minWidth: 650 }} aria-label="institutes table">
                <TableHead sx={{ bgcolor: '#e3f2fd' }}>
                  <TableRow>
                    <TableCell width="25%"><strong>Institute Name</strong></TableCell>
                    <TableCell width="25%"><strong>Description</strong></TableCell>
                    <TableCell width="20%"><strong>Co-ordinator ID</strong></TableCell>
                    <TableCell width="15%"><strong>Created At</strong></TableCell>
                    <TableCell align="center" width="15%"><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {institutes.length > 0 ? (
                    institutes
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                        <TableRow
                          key={row._id}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                            '&:hover': { bgcolor: '#f5f5f5', cursor: 'pointer' }
                          }}
                        >
                          <TableCell>
                            <Typography variant="subtitle1" fontWeight={500}>{row.InstituteName}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">{row.InstituteDescription}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">{row.InstituteCoOrdinatorID}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {new Date(row.createdAt).toLocaleDateString()}
                            </Typography>
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
                      <TableCell colSpan={4} align="center">
                        <Typography variant="body1" sx={{ py: 3 }}>
                          No institutes found.
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
              count={institutes.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </SubCard>
        </Grid>

      </Grid>

      {/* ADD / EDIT DIALOG */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>{isEditing ? 'Edit Institute' : 'Add New Institute'}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Institute Name"
                name="InstituteName"
                value={formData.InstituteName}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="InstituteDescription"
                value={formData.InstituteDescription}
                onChange={handleFormChange}
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Co-ordinator User"
                name="InstituteCoOrdinatorID"
                value={formData.InstituteCoOrdinatorID}
                onChange={handleFormChange}
                required
              >
                {users.map((user) => (
                  <MenuItem key={user._id} value={user._id}>
                    {user.UserName} ({user.EmailAddress})
                  </MenuItem>
                ))}
              </TextField>
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

export default Institute;
