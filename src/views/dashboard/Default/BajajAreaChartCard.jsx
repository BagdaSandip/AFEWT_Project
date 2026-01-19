import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// third party
import Chart from 'react-apexcharts';

// project imports
import bajajChartOptions from './chart-data/bajaj-area-chart';
import useConfig from 'hooks/useConfig';

// ===========================|| DASHBOARD DEFAULT - BAJAJ AREA CHART CARD ||=========================== //

export default function BajajAreaChartCard() {
  const theme = useTheme();
  const {
    state: { fontFamily }
  } = useConfig();

  const secondary800 = theme.vars.palette.secondary[800];

  const [chartOptions, setChartOptions] = useState(bajajChartOptions);
  const [series] = useState([{ data: [20, 60, 120, 180, 260, 320, 420] }]);

  useEffect(() => {
    setChartOptions({
      ...bajajChartOptions,
      chart: { ...bajajChartOptions.chart, fontFamily: fontFamily },
      colors: [secondary800],
      fill: {
        gradient: {
          colorStops: [
            [
              { offset: 0, color: secondary800, opacity: 0.4 },
              { offset: 100, color: secondary800, opacity: 0.1 }
            ]
          ]
        }
      },
      theme: { mode: 'light' }
    });
  }, [fontFamily, secondary800]);

  return (
    <Card sx={{ bgcolor: 'secondary.light', mt: -1 }}>
      <Grid container sx={{ p: 2, pb: 0, color: '#fff' }}>
        <Grid size={12}>
          <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Grid>
              <Typography variant="subtitle1" sx={{ color: 'secondary.dark' }}>
                Tech Fest 2025
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="h4" sx={{ color: 'grey.800' }}>
                420 Participants
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={12}>
          <Typography variant="subtitle2" sx={{ color: 'grey.800' }}>
            Increasing Participation
          </Typography>
        </Grid>
      </Grid>
      <Chart options={chartOptions} series={series} type="area" height={95} />
    </Card>
  );
}
