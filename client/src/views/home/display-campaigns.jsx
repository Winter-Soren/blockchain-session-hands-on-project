import React from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { FundCard } from './';
import { loader } from '../assets';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  return (
    <Box>
      <Typography variant="h6" color="textPrimary">
        {title} ({campaigns.length})
      </Typography>

      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <CircularProgress />
          </Box>
        )}

        {!isLoading && campaigns.length === 0 && (
          <Typography variant="body1" color="textSecondary">
            You have not created any campaigns yet.
          </Typography>
        )}

        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign) => (
            <Grid item xs={12} sm={6} md={4} key={uuidv4()}>
              <FundCard {...campaign} handleClick={() => handleNavigate(campaign)} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

DisplayCampaigns.propTypes = {
  title: PropTypes.string,
  isLoading: PropTypes.bool,
  campaigns: PropTypes.array
};

export default DisplayCampaigns;
