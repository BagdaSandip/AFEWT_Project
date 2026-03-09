import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third party
import Chart from 'react-apexcharts';

// project imports
import useConfig from 'hooks/useConfig';
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// chart data
import barChartOptions from './chart-data/total-growth-bar-chart';

const status = [
  { value: '2025', label: '2025' },
  { value: '2024', label: '2024' }
];

const seriesData2025 = [
  {
    name: 'Attendees',
    data: [120, 250, 150, 400, 300, 200, 500, 350, 250, 450, 320, 500]
  }
];

const seriesData2024 = [
  {
    name: 'Attendees',
    data: [100, 200, 120, 350, 280, 180, 450, 300, 200, 400, 280, 450]
  }
];


export default function EventAttendanceChart({ isLoading }) {
  const theme = useTheme();
  const {
    state: { fontFamily }
  } = useConfig();

  const [value, setValue] = useState('2025');
  const [chartOptions, setChartOptions] = useState(barChartOptions);
  const [series, setSeries] = useState(seriesData2025);

  const textPrimary = theme.vars.palette.text.primary;
  const divider = theme.vars.palette.divider;
  const grey500 = theme.vars.palette.grey[500];

  const primary200 = theme.vars.palette.primary[200];
  const primaryDark = theme.vars.palette.primary.dark;
  const secondaryMain = theme.vars.palette.secondary.main;
  const secondaryLight = theme.vars.palette.secondary.light;

  useEffect(() => {
    setChartOptions({
      ...barChartOptions,
      chart: { ...barChartOptions.chart, fontFamily: fontFamily },
      colors: [primaryDark, primary200, secondaryMain, secondaryLight],
      xaxis: { ...barChartOptions.xaxis, labels: { style: { colors: textPrimary } } },
      yaxis: { ...barChartOptions.yaxis, labels: { style: { colors: textPrimary } } },
      grid: { borderColor: divider },
      tooltip: { theme: 'light' },
      legend: { ...(barChartOptions.legend ?? {}), labels: { ...(barChartOptions.legend?.labels ?? {}), colors: grey500 } }
    });
  }, [fontFamily, primary200, primaryDark, secondaryMain, secondaryLight, textPrimary, grey500, divider]);

  const handleYearChange = (e) => {
    const year = e.target.value;
    setValue(year);
    if (year === '2025') setSeries(seriesData2025);
    else setSeries(seriesData2024);
  };

  return (
    <>
      {isLoading ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <MainCard>
          <Stack sx={{ gap: gridSpacing }}>
            <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Stack sx={{ gap: 1 }}>
                <Typography variant="subtitle2">Total Attendance</Typography>
                <Typography variant="h3">Event Attendance Overview</Typography>
              </Stack>
              <TextField id="standard-select-year" select value={value} onChange={handleYearChange}>
                {status.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <Box
              sx={{
                ...theme.applyStyles('light', {
                  '& .apexcharts-series:nth-of-type(4) path:hover': {
                    filter: `brightness(0.95)`,
                    transition: 'all 0.3s ease'
                  }
                })
              }}
            >
              <Chart options={chartOptions} series={series} type="bar" height={480} />
            </Box>
          </Stack>
        </MainCard>
      )}
    </>
  );
}

EventAttendanceChart.propTypes = { isLoading: PropTypes.bool };
