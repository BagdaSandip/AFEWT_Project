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
import EmojiEventsTwoToneIcon from '@mui/icons-material/EmojiEventsTwoTone';
import StarsTwoToneIcon from '@mui/icons-material/StarsTwoTone';

export default function RecentWinnersCard({ isLoading }) {
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
                <Typography variant="h4">Recent Event Winners</Typography>
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
                <MenuItem onClick={handleClose}>This Week</MenuItem>
                <MenuItem onClick={handleClose}>This Month</MenuItem>
              </Menu>

              <Box sx={{ mt: 2 }}>
                <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                  <Stack direction="row" sx={{ alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: '#ffecb3', color: '#ffb300' }}>
                      <EmojiEventsTwoToneIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ color: 'inherit' }}>
                        Code Geeks (Group)
                      </Typography>
                      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                        Hackathon 2025
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" sx={{ alignItems: 'center' }}>
                     <Typography variant="caption" sx={{ color: 'warning.dark', mr: 1, fontWeight: 700 }}>
                        1st Place
                     </Typography>
                  </Stack>
                </Stack>
                <Divider sx={{ my: 1.5 }} />

                <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                  <Stack direction="row" sx={{ alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'grey.300', color: 'grey.700' }}>
                      <EmojiEventsTwoToneIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ color: 'inherit' }}>
                        Cyber Ninjas (Group)
                      </Typography>
                      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                        Capture The Flag
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" sx={{ alignItems: 'center' }}>
                     <Typography variant="caption" sx={{ color: 'text.secondary', mr: 1, fontWeight: 700 }}>
                        2nd Place
                     </Typography>
                  </Stack>
                </Stack>
                <Divider sx={{ my: 1.5 }} />

                <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                  <Stack direction="row" sx={{ alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: '#ffe0b2', color: '#f57c00' }}>
                      <EmojiEventsTwoToneIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ color: 'inherit' }}>
                        Robo Masters (Group)
                      </Typography>
                      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                        Robo Wars
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" sx={{ alignItems: 'center' }}>
                     <Typography variant="caption" sx={{ color: 'warning.main', mr: 1, fontWeight: 700 }}>
                        3rd Place
                     </Typography>
                  </Stack>
                </Stack>

              </Box>
            </Stack>
          </CardContent>
          <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
            <Button size="small" disableElevation>
              View All Winners
              <ChevronRightOutlinedIcon />
            </Button>
          </CardActions>
        </MainCard>
      )}
    </>
  );
}

RecentWinnersCard.propTypes = { isLoading: PropTypes.bool };
