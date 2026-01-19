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

// ==============================|| DEPARTMENTS LIST PAGE ||============================== //

// Updated Dummy Data with MORE Departments
const dummyDepartments = [
    { id: 101, name: 'Computer Science', institute: 'Institute of Technology', head: 'Dr. A. Sharma', students: 120 },
    { id: 102, name: 'Mechanical Eng.', institute: 'Institute of Technology', head: 'Dr. B. Singh', students: 90 },
    { id: 103, name: 'Civil Engineering', institute: 'Institute of Technology', head: 'Dr. E. Khan', students: 85 },
    { id: 104, name: 'Electronics & Comm.', institute: 'Institute of Technology', head: 'Prof. M. Gupta', students: 110 },
    { id: 105, name: 'Information Tech', institute: 'Institute of Technology', head: 'Dr. R. Verma', students: 95 },
    
    { id: 106, name: 'Business Admin (MBA)', institute: 'School of Business', head: 'Prof. C. Das', students: 200 },
    { id: 107, name: 'Marketing', institute: 'School of Business', head: 'Prof. F. White', students: 150 },
    { id: 108, name: 'Finance', institute: 'School of Business', head: 'Dr. K. Patel', students: 130 },
    
    { id: 109, name: 'Fine Arts', institute: 'College of Arts', head: 'Ms. D. Kapoor', students: 60 },
    { id: 110, name: 'History', institute: 'College of Arts', head: 'Dr. J. Adams', students: 45 },
    { id: 111, name: 'English Literature', institute: 'College of Arts', head: 'Prof. L. Ray', students: 80 },
    
    { id: 112, name: 'Biotechnology', institute: 'Faculty of Science', head: 'Dr. G. Rao', students: 110 },
    { id: 113, name: 'Physics', institute: 'Faculty of Science', head: 'Dr. S. Hawking', students: 70 },
    { id: 114, name: 'Chemistry', institute: 'Faculty of Science', head: 'Dr. M. Curie', students: 75 },
    
    { id: 115, name: 'General Surgery', institute: 'Medical School', head: 'Dr. N. Strange', students: 50 }
];

const DepartmentsPage = () => {
  return (
    <MainCard title="Departments Management">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Below is the list of departments across all institutes.
              </Typography>
              
              {/* Table Component */}
              <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: 2 }}>
                <Table sx={{ minWidth: 650 }} aria-label="departments table">
                  <TableHead sx={{ bgcolor: '#e3f2fd' }}>
                    <TableRow>
                      <TableCell><strong>ID</strong></TableCell>
                      <TableCell><strong>Department Name</strong></TableCell>
                      <TableCell><strong>Institute</strong></TableCell>
                      <TableCell><strong>Head of Dept</strong></TableCell>
                      <TableCell align="center"><strong>Total Students</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dummyDepartments.map((row) => (
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
                        <TableCell>{row.institute}</TableCell>
                        <TableCell>{row.head}</TableCell>
                        <TableCell align="center">
                            <Chip label={row.students} color="primary" variant="outlined" size="small" />
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

export default DepartmentsPage;