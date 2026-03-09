import { useEffect, useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';

// project imports
import TotalAttendeesCard from './TotalAttendeesCard';
import RecentRegistrationsCard from './RecentRegistrationsCard';
import TotalRevenueCard from './TotalRevenueCard';
import TotalIncomeLightCard from '../../../ui-component/cards/TotalIncomeLightCard';
import EventAttendanceChart from './EventAttendanceChart';

import { gridSpacing } from 'store/constant';

// assets
import EventAvailableTwoToneIcon from '@mui/icons-material/EventAvailableTwoTone';
import EventBusyTwoToneIcon from '@mui/icons-material/EventBusyTwoTone';

// ==============================|| DEFAULT DASHBOARD ||============================== //

export default function Dashboard() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid size={12}>
        <Grid container spacing={gridSpacing}>
          <Grid size={{ lg: 4, md: 6, sm: 6, xs: 12 }}>
            <TotalAttendeesCard isLoading={isLoading} />
          </Grid>
          <Grid size={{ lg: 4, md: 6, sm: 6, xs: 12 }}>
            <TotalRevenueCard isLoading={isLoading} />
          </Grid>
          <Grid size={{ lg: 4, md: 12, sm: 12, xs: 12 }}>
            <Grid container spacing={gridSpacing}>
              <Grid size={{ sm: 6, xs: 12, md: 6, lg: 12 }}>
                <TotalIncomeLightCard
                  isLoading={isLoading}
                  total={8}
                  label="Active Events"
                  icon={<EventAvailableTwoToneIcon fontSize="inherit" />}
                />
              </Grid>
              <Grid size={{ sm: 6, xs: 12, md: 6, lg: 12 }}>
                <TotalIncomeLightCard
                  isLoading={isLoading}
                  total={3}
                  label="Upcoming Events"
                  icon={<EventBusyTwoToneIcon fontSize="inherit" />}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid size={12}>
        <Grid container spacing={gridSpacing}>
          <Grid size={{ xs: 12, md: 8 }}>
            <EventAttendanceChart isLoading={isLoading} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <RecentRegistrationsCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
