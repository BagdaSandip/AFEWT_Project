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
  Card
} from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// ==============================|| INSTITUTES LIST PAGE ||============================== //

// Updated Dummy Data with MORE Institutes
const dummyInstitutes = [
    { id: 1, name: 'Institute of Technology', code: 'IOT', location: 'Block A, North Campus' },
    { id: 2, name: 'School of Business Management', code: 'SBM', location: 'Block B, Main Building' },
    { id: 3, name: 'College of Arts & Humanities', code: 'CAH', location: 'Block C, Old Wing' },
    { id: 4, name: 'Faculty of Science', code: 'FOS', location: 'Lab Complex, 2nd Floor' },
    { id: 5, name: 'Medical & Health Sciences', code: 'MHS', location: 'Hospital Wing' },
    { id: 6, name: 'Law School', code: 'LAW', location: 'Block D, East Wing' },
    { id: 7, name: 'College of Engineering', code: 'COE', location: 'Tech Park, Building 1' },
    { id: 8, name: 'Department of Architecture', code: 'DOA', location: 'Design Studio' },
    { id: 9, name: 'School of Psychology', code: 'PSY', location: 'Block E, West Campus' },
    { id: 10, name: 'Institute of Computer Applications', code: 'ICA', location: 'IT Center, 3rd Floor' }
];

const InstitutesPage = () => {
  return (
    <MainCard title="Institutes Management">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Below is the list of all registered institutes and their locations.
              </Typography>
              
              {/* Table Component */}
              <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: 2 }}>
                <Table sx={{ minWidth: 650 }} aria-label="institutes table">
                  <TableHead sx={{ bgcolor: '#e3f2fd' }}>
                    <TableRow>
                      <TableCell><strong>ID</strong></TableCell>
                      <TableCell><strong>Institute Name</strong></TableCell>
                      <TableCell><strong>Code</strong></TableCell>
                      <TableCell><strong>Location</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dummyInstitutes.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#f5f5f5' } }}
                      >
                        <TableCell component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.code}</TableCell>
                        <TableCell>{row.location}</TableCell>
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

export default InstitutesPage;