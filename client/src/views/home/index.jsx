// material-ui
import { Typography, Grid, Box, CircularProgress } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// hooks
import useCrowdFundingContract from 'hooks/useCrowdFundingContract';
import { useEffect, useState } from 'react';

import parseCampaigns from 'utils/parse-campaigns';
import FundCard from './fund-card';
import { useNavigate } from 'react-router-dom';

// ==============================|| SAMPLE PAGE ||============================== //

const Home = () => {
  const { contract, isLoading, error } = useCrowdFundingContract();
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        if (contract) {
          const campaigns = await contract.call('getCampaigns');
          setCampaigns(parseCampaigns(campaigns));
          console.log('Campaigns:', parseCampaigns(campaigns));
        }
      } catch (err) {
        console.error('Error fetching campaigns:', err);
      }
    };

    fetchCampaigns();
  }, [contract]);

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  return (
    <MainCard title="Home">
      <Typography variant="h6" color="textPrimary">
        ({campaigns.length})
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
              <FundCard
                title={campaign.title}
                description={campaign.description}
                image={campaign.image}
                target={campaign.target}
                amountCollected={campaign.amountCollected}
                handleClick={() => handleNavigate(campaign)} // Define this function if needed
              />
            </Grid>
          ))}
      </Grid>
    </MainCard>
  );
};

export default Home;
