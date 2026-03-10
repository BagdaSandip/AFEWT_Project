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

// ==============================|| DEPARTMENTS LIST PAGE ||============================== //

const Department = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [departments, setDepartments] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [users, setUsers] = useState([]);

  // Modal State
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDepartmentId, setCurrentDepartmentId] = useState(null);
  const [formData, setFormData] = useState({
    DepartmentName: '',
    DepartmentDescription: '',
    InstituteID: '',
    DepartmentCoOrdinatorID: ''
  });

  const fetchData = async () => {
    try {
      // Fetch Departments
      const depRes = await fetch("/api/departments", { credentials: 'include' });
      if (depRes.status === 401) {
        window.location.href = '/';
        throw new Error('Unauthorized');
      }
      const depData = await depRes.json();
      if (depData && depData.departments) setDepartments(depData.departments);

      // Fetch Institutes for Dropdown
      const instRes = await fetch("/api/institute", { credentials: 'include' });
      const instData = await instRes.json();
      if (instData && instData.institutes) setInstitutes(instData.institutes);

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

  const handleOpenDialog = (dept = null) => {
    if (dept) {
      setIsEditing(true);
      setCurrentDepartmentId(dept._id);
      setFormData({
        DepartmentName: dept.DepartmentName,
        DepartmentDescription: dept.DepartmentDescription,
        InstituteID: dept.InstituteID,
        DepartmentCoOrdinatorID: dept.DepartmentCoOrdinatorID
      });
    } else {
      setIsEditing(false);
      setCurrentDepartmentId(null);
      setFormData({
        DepartmentName: '',
        DepartmentDescription: '',
        InstituteID: '',
        DepartmentCoOrdinatorID: ''
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
      const url = isEditing ? `/api/departments/${currentDepartmentId}` : '/api/departments';
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
        alert(errorData.message || 'Error saving department');
      }
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        const response = await fetch(`/api/departments/${id}`, {
          method: 'DELETE',
          credentials: 'include'
        });
        if (response.ok) {
          fetchData(); // refresh list
        } else {
          const errorData = await response.json();
          alert(errorData.message || 'Error deleting department. Verify you are logged in as Admin.');
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
    <MainCard title="Departments Management">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                <Typography variant="body1">
                  Below is the list of departments across all institutes.
                </Typography>
                <Button variant="contained" color="secondary" startIcon={<IconPlus />} onClick={() => handleOpenDialog()}>
                  Add Department
                </Button>
              </Stack>

              {/* Table Component */}
              <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: 2 }}>
                <Table sx={{ minWidth: 650 }} aria-label="departments table">
                  <TableHead sx={{ bgcolor: '#e3f2fd' }}>
                    <TableRow>
                      <TableCell width="25%"><strong>Department Name</strong></TableCell>
                      <TableCell width="25%"><strong>Description</strong></TableCell>
                      <TableCell width="15%"><strong>Institute ID</strong></TableCell>
                      <TableCell width="15%"><strong>Co-ordinator ID</strong></TableCell>
                      <TableCell align="center" width="10%"><strong>Created At</strong></TableCell>
                      <TableCell align="center" width="10%"><strong>Actions</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {departments.length > 0 ? (
                      departments
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                          <TableRow
                            key={row._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#f5f5f5' } }}
                          >
                            <TableCell>
                              <Typography variant="subtitle1" fontWeight="bold">{row.DepartmentName}</Typography>
                            </TableCell>
                            <TableCell>{row.DepartmentDescription}</TableCell>
                            <TableCell>{row.InstituteID}</TableCell>
                            <TableCell>{row.DepartmentCoOrdinatorID}</TableCell>
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
                        <TableCell colSpan={5} align="center">
                          <Typography variant="body1" sx={{ py: 3 }}>
                            No departments found.
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
                count={departments.length}
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
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>{isEditing ? 'Edit Department' : 'Add New Department'}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Department Name"
                name="DepartmentName"
                value={formData.DepartmentName}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Institute"
                name="InstituteID"
                value={formData.InstituteID}
                onChange={handleFormChange}
                required
              >
                {institutes.map((inst) => (
                  <MenuItem key={inst._id} value={inst._id}>
                    {inst.InstituteName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Co-ordinator User"
                name="DepartmentCoOrdinatorID"
                value={formData.DepartmentCoOrdinatorID}
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
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="DepartmentDescription"
                value={formData.DepartmentDescription}
                onChange={handleFormChange}
                multiline
                rows={3}
              />
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

export default Department;
