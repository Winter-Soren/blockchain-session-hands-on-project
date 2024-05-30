import React, { useEffect, useState } from 'react';
import { Grid, Typography, Avatar, CircularProgress, Paper, Box, useTheme, TextField, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { MediaRenderer } from '@thirdweb-dev/react';
import { generateAvatarURL } from '@cfx-kit/wallet-avatar';
import MainCard from 'ui-component/cards/MainCard';
import useCrowdFundingContract from 'hooks/useCrowdFundingContract';
import moment from 'moment';
import parseDonations from 'utils/parse-donations';
import { ethers } from 'ethers';

// ==============================|| CAMPAIGN DETAILS ||============================== //

const CampaignDetails = () => {
  const { state } = useLocation();
  const theme = useTheme();
  const { contract, isLoading, error } = useCrowdFundingContract();
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);

  useEffect(() => {
    const fetchDonations = async (pId) => {
      try {
        if (contract) {
          const donations = await contract.call('getDonators', [pId]);
          setDonators(parseDonations(donations));
          console.log('Donations:', parseDonations(donations));
        }
      } catch (err) {
        console.error('Error fetching donations:', err);
      }
    };

    fetchDonations(state.pId);
  }, [contract, state.pId]);

  const handleDonate = async () => {
    try {
      console.log(contract, state.pId, amount);
      const data = await contract.call('donateToCampaign', [state.pId], {
        value: ethers.utils.parseEther(amount)
      });
      console.log('data: ', data);
      setAmount('');
    } catch (err) {
      console.error('Error donating:', err);
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <MainCard title="Campaign Details">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <MediaRenderer
            src={state.image}
            alt={state.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{ padding: '20px', borderRadius: '8px', borderStyle: 'dashed', borderWidth: 1.6, borderColor: theme.palette.grey[500] }}
          >
            <Typography variant="h5" gutterBottom>
              {state.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center' }}>
                Owner: <Avatar src={generateAvatarURL(state.owner)} sx={{ width: 24, height: 24, marginRight: '5px', ml: 1 }} />{' '}
                {state.owner}
              </Typography>
            </Box>
            <Typography variant="body1" gutterBottom>
              <strong>Description:</strong> {state.description}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Goal:</strong> {state.target} MATIC
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Deadline:</strong> {moment(state.deadline).format('MMMM Do YYYY, h:mm:ss a')}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Raised:</strong> {state.amountCollected} MATIC
            </Typography>
          </Paper>

          {/* donations */}

          <Paper
            elevation={3}
            sx={{
              padding: '20px',
              borderRadius: '8px',
              marginTop: '20px',
              borderStyle: 'dashed',
              borderWidth: 1.6,
              borderColor: theme.palette.grey[500]
            }}
          >
            <Typography variant="h5" gutterBottom>
              Donations
            </Typography>
            {
              // Donations
              donators.length > 0 ? (
                <Grid container spacing={2}>
                  {donators.map((donator) => (
                    <Grid item xs={12} key={donator.donator}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar src={generateAvatarURL(donator.donator)} sx={{ width: 24, height: 24, marginRight: '5px' }} />
                        <Typography variant="body1">
                          {donator.donator} donated {donator.donation} MATIC
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography>No donations yet</Typography>
              )
            }
          </Paper>
        </Grid>
      </Grid>

      <Paper>
        <Typography>Donate to this Campaign</Typography>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Donate to this campaign
          </Typography>
          <TextField
            label="Amount (ETH)"
            variant="outlined"
            fullWidth
            margin="normal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleDonate} disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : 'Donate'}
          </Button>
        </Box>
      </Paper>
    </MainCard>
  );
};

export default CampaignDetails;
