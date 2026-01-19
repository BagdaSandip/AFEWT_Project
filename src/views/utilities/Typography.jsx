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
  Card,
  Stack,
  Box,
  Avatar,
  Chip
} from '@mui/material';

// icons
import { 
    IconBuildingSkyscraper, 
    IconUsers, 
    IconSchool, 
    IconCalendarEvent // Changed icon to Event
} from '@tabler/icons-react';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';

// ==============================|| INSTITUTES LIST PAGE ||============================== //

// Dummy Data (Added 'dean' field)
const dummyInstitutes = [
    { id: 1, name: 'Institute of Technology', code: 'IOT', location: 'Block A, North Campus', dean: 'Dr. R. Sharma' },
    { id: 2, name: 'School of Business Management', code: 'SBM', location: 'Block B, Main Building', dean: 'Dr. A. Mehta' },
    { id: 3, name: 'College of Arts & Humanities', code: 'CAH', location: 'Block C, Old Wing', dean: 'Prof. S. Das' },
    { id: 4, name: 'Faculty of Science', code: 'FOS', location: 'Lab Complex, 2nd Floor', dean: 'Dr. K. Patel' },
    { id: 5, name: 'Medical & Health Sciences', code: 'MHS', location: 'Hospital Wing', dean: 'Dr. V. Rao' },
    { id: 6, name: 'Law School', code: 'LAW', location: 'Block D, East Wing', dean: 'Justice M. Singh' },
    { id: 7, name: 'College of Engineering', code: 'COE', location: 'Tech Park, Building 1', dean: 'Dr. P. Kumar' },
    { id: 8, name: 'Department of Architecture', code: 'DOA', location: 'Design Studio', dean: 'Ar. L. Roy' },
    { id: 9, name: 'School of Psychology', code: 'PSY', location: 'Block E, West Campus', dean: 'Dr. N. Gupta' },
    { id: 10, name: 'Institute of Computer Applications', code: 'ICA', location: 'IT Center, 3rd Floor', dean: 'Dr. T. Verma' }
];

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

const InstitutesPage = () => {
  return (
    <MainCard title="Institutes Management">
      <Grid container spacing={gridSpacing}>
        
        {/* ROW 1: TOP STATS WIDGETS */}
        <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
                <Grid item lg={3} md={6} sm={6} xs={12}>
                    <StatCard title="Total Institutes" count="10" icon={IconBuildingSkyscraper} color="secondary" />
                </Grid>
                <Grid item lg={3} md={6} sm={6} xs={12}>
                    <StatCard title="Total Students" count="12,450" icon={IconUsers} color="primary" />
                </Grid>
                <Grid item lg={3} md={6} sm={6} xs={12}>
                    <StatCard title="Departments" count="45" icon={IconSchool} color="orange" />
                </Grid>
                <Grid item lg={3} md={6} sm={6} xs={12}>
                    {/* NEW WIDGET: Replaced Buttons with "Events Hosted" */}
                    <StatCard title="Events Hosted" count="156" icon={IconCalendarEvent} color="success" />
                </Grid>
            </Grid>
        </Grid>

        {/* ROW 2: THE MAIN TABLE */}
        <Grid item xs={12}>
          <SubCard title="Registered Institutes List">
             <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
                <Table sx={{ minWidth: 650 }} aria-label="institutes table">
                  <TableHead sx={{ bgcolor: '#e3f2fd' }}>
                    <TableRow>
                      <TableCell width="5%"><strong>ID</strong></TableCell>
                      <TableCell width="35%"><strong>Institute Name</strong></TableCell>
                      <TableCell width="10%"><strong>Code</strong></TableCell>
                      <TableCell width="25%"><strong>Dean / Head</strong></TableCell> {/* NEW COLUMN */}
                      <TableCell width="25%"><strong>Location</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dummyInstitutes.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{ 
                            '&:last-child td, &:last-child th': { border: 0 }, 
                            '&:hover': { bgcolor: '#f5f5f5', cursor:'pointer' } 
                        }}
                      >
                        <TableCell component="th" scope="row">{row.id}</TableCell>
                        <TableCell>
                            <Typography variant="subtitle1" fontWeight={500}>{row.name}</Typography>
                        </TableCell>
                        <TableCell>
                            <Chip label={row.code} size="small" variant="outlined" color="primary" />
                        </TableCell>
                        <TableCell>
                            <Typography variant="body2">{row.dean}</Typography> {/* NEW DATA */}
                        </TableCell>
                        <TableCell>{row.location}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
          </SubCard>
        </Grid>

      </Grid>
    </MainCard>
  );
};

export default InstitutesPage;