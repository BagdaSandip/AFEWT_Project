import PropTypes from 'prop-types';
import React, { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third party
import Chart from 'react-apexcharts';

// project imports
import chartOptions from './chart-data/total-order-line-chart';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';

// assets
import LocalAtmTwoToneIcon from '@mui/icons-material/LocalAtmTwoTone';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

// data
const monthlyData = [{ name: 'Revenue', data: [1500, 2200, 1800, 3000, 2500, 2800, 2000, 3500] }];
const yearlyData = [{ name: 'Revenue', data: [12000, 14000, 16000, 18000, 20000, 22000, 23000, 24000] }];

export default function TotalRevenueCard({ isLoading }) {
  const theme = useTheme();

  const [timeValue, setTimeValue] = React.useState(false);
  const [series, setSeries] = useState(yearlyData);

  const handleChangeTime = (_event, newValue) => {
    setTimeValue(newValue);
    if (newValue) {
      setSeries(monthlyData);
    } else {
      setSeries(yearlyData);
    }
  };

  return (
    <>
      {isLoading ? (
        <SkeletonTotalOrderCard />
      ) : (
        <MainCard
          border={false}
          content={false}
          sx={{
            bgcolor: 'secondary.dark',
            color: '#fff',
            overflow: 'hidden',
            position: 'relative',
            '&>div': {
              position: 'relative',
              zIndex: 5
            },
            '&:after': {
              content: '""',
              position: 'absolute',
              width: 210,
              height: 210,
              background: theme.vars.palette.secondary[800],
              borderRadius: '50%',
              top: { xs: -85 },
              right: { xs: -95 }
            },
            '&:before': {
              content: '""',
              position: 'absolute',
              width: 210,
              height: 210,
              background: theme.vars.palette.secondary[800],
              borderRadius: '50%',
              top: { xs: -125 },
              right: { xs: -15 },
              opacity: 0.5
            }
          }}
        >
          <Box sx={{ p: 2.25 }}>
            <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
              <Avatar
                variant="rounded"
                sx={{
                  ...theme.typography.largeAvatar,
                  borderRadius: 2,
                  bgcolor: 'secondary.800',
                  color: 'common.white',
                  mt: 1
                }}
              >
                <LocalAtmTwoToneIcon fontSize="large" />
              </Avatar>
              <Box>
                <Button
                  disableElevation
                  variant={timeValue ? 'contained' : 'text'}
                  size="small"
                  sx={{ color: 'inherit' }}
                  onClick={(e) => handleChangeTime(e, true)}
                >
                  Month
                </Button>
                <Button
                  disableElevation
                  variant={!timeValue ? 'contained' : 'text'}
                  size="small"
                  sx={{ color: 'inherit' }}
                  onClick={(e) => handleChangeTime(e, false)}
                >
                  Year
                </Button>
              </Box>
            </Stack>

            <Grid sx={{ mb: 0.75 }}>
              <Grid container sx={{ alignItems: 'center' }}>
                <Grid size={6}>
                  <Box>
                    <Stack direction="row" sx={{ alignItems: 'center' }}>
                      <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                        ${timeValue ? '9,820' : '45,210'}
                      </Typography>
                      <Avatar sx={{ ...theme.typography.smallAvatar, bgcolor: 'secondary.200', color: 'secondary.dark' }}>
                        <ArrowUpwardIcon fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} />
                      </Avatar>
                    </Stack>
                    <Typography sx={{ fontSize: '1rem', fontWeight: 500, color: 'secondary.200' }}>
                      Total Revenue
                    </Typography>
                  </Box>
                </Grid>
                <Grid
                  size={6}
                  sx={{
                    '.apexcharts-tooltip.apexcharts-theme-light': {
                      color: theme.vars.palette.text.primary,
                      background: theme.vars.palette.background.default
                    }
                  }}
                >
                  <Chart options={chartOptions} series={series} type="line" height={90} />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </MainCard>
      )}
    </>
  );
}

TotalRevenueCard.propTypes = { isLoading: PropTypes.bool };
