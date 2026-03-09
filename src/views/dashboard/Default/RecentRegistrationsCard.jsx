import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';

export default function RecentRegistrationsCard({ isLoading }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Stack sx={{ gap: gridSpacing }}>
              <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h4">Recent Registrations</Typography>
                <IconButton size="small" sx={{ mt: -0.625 }}>
                  <MoreHorizOutlinedIcon
                    fontSize="small"
                    sx={{ cursor: 'pointer' }}
                    aria-controls="menu-recent-card"
                    aria-haspopup="true"
                    onClick={handleClick}
                  />
                </IconButton>
              </Stack>
              <Menu
                id="menu-recent-card"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                variant="selectedMenu"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem onClick={handleClose}>Today</MenuItem>
                <MenuItem onClick={handleClose}>This Week</MenuItem>
              </Menu>

              <Box sx={{ mt: 2 }}>
                <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                  <Stack direction="row" sx={{ alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'secondary.light', color: 'secondary.dark' }}>
                      <PersonOutlineTwoToneIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ color: 'inherit' }}>
                        John Doe
                      </Typography>
                      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                        Tech Fest 2025
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" sx={{ alignItems: 'center' }}>
                     <Typography variant="caption" sx={{ color: 'success.main', mr: 1, fontWeight: 500 }}>
                        Confirmed
                     </Typography>
                     <CheckCircleTwoToneIcon fontSize="small" color="success" />
                  </Stack>
                </Stack>
                <Divider sx={{ my: 1.5 }} />

                <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                  <Stack direction="row" sx={{ alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.dark' }}>
                      <PersonOutlineTwoToneIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ color: 'inherit' }}>
                        Jane Smith
                      </Typography>
                      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                        Cultural Night
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" sx={{ alignItems: 'center' }}>
                     <Typography variant="caption" sx={{ color: 'success.main', mr: 1, fontWeight: 500 }}>
                        Confirmed
                     </Typography>
                     <CheckCircleTwoToneIcon fontSize="small" color="success" />
                  </Stack>
                </Stack>
                <Divider sx={{ my: 1.5 }} />

                <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                  <Stack direction="row" sx={{ alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'warning.light', color: 'warning.dark' }}>
                      <PersonOutlineTwoToneIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ color: 'inherit' }}>
                        Michael Brown
                      </Typography>
                      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                        Workshop on AI
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" sx={{ alignItems: 'center' }}>
                     <Typography variant="caption" sx={{ color: 'warning.main', mr: 1, fontWeight: 500 }}>
                        Pending
                     </Typography>
                  </Stack>
                </Stack>
                <Divider sx={{ my: 1.5 }} />

                <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                  <Stack direction="row" sx={{ alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'success.light', color: 'success.dark' }}>
                      <PersonOutlineTwoToneIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ color: 'inherit' }}>
                        Emily Davis
                      </Typography>
                      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                        Gully Cricket
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" sx={{ alignItems: 'center' }}>
                     <Typography variant="caption" sx={{ color: 'success.main', mr: 1, fontWeight: 500 }}>
                        Confirmed
                     </Typography>
                     <CheckCircleTwoToneIcon fontSize="small" color="success" />
                  </Stack>
                </Stack>

              </Box>
            </Stack>
          </CardContent>
          <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
            <Button size="small" disableElevation>
              View All Registrations
              <ChevronRightOutlinedIcon />
            </Button>
          </CardActions>
        </MainCard>
      )}
    </>
  );
}

RecentRegistrationsCard.propTypes = { isLoading: PropTypes.bool };
