import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import { useContractWrite, useStorageUpload, useContract, useAddress } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import MainCard from 'ui-component/cards/MainCard';
import useCrowdFundingContract from 'hooks/useCrowdFundingContract';
import moment from 'moment';
import { FileUploader } from 'react-drag-drop-files';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const { contract, error } = useCrowdFundingContract();
  const { mutateAsync: upload } = useStorageUpload();
  const address = useAddress();
  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: ''
  });
  const [imageFile, setImageFile] = useState(null);

  const fileTypes = ['JPG', 'PNG', 'GIF'];

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleImageChange = (file) => {
    setImageFile(file);
    console.log("file url: ",URL.createObjectURL(file))
  };

  const uploadImage = async () => {
    const dataToUpload = [imageFile];
    const uris = await upload({ data: dataToUpload });
    console.log('uris', uris);
    return uris[0]; // return the first uploaded image URI
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const imageUri = await uploadImage();
      const newCampaign = { ...form, image: imageUri };

      const targetInWei = ethers.utils.parseEther(form.target);

      // adding the form to contract
      const data = await createCampaign({
        args: [
          address, // owner
          form.title, // title
          form.description, // description
          targetInWei, // target in wei
          new Date(form.deadline).getTime(), // deadline
          imageUri.toString() // image
        ]
      });
      console.log('contract call success', data);

      console.log('New campaign created:', newCampaign);
      navigate('/home');
    } catch (error) {
      console.error('Error creating campaign:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTodayDate = () => {
    return moment().format('YYYY-MM-DD');
  };

  if (!address) {
    return (
      <MainCard title="Create Campaign">
        <Typography variant="h6" color="textPrimary">
          Please connect your wallet to create a campaign.
        </Typography>
      </MainCard>
    );
  }

  return (
    <MainCard title="Create Campaign">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item md={6} sm={12}>
            <Box sx={{ mt: 2, mb: 2 }}>
              <FileUploader handleChange={handleImageChange} name="image" types={fileTypes} multiple={false} />
            </Box>
            {imageFile && (
              <Box sx={{ mt: 2, mb: 2 }}>
                <Typography variant="body1">Image Preview:</Typography>
                <img src={URL.createObjectURL(imageFile)} alt="Preview" style={{ width: '100%', borderRadius: '8px' }} />
              </Box>
            )}
          </Grid>

          <Grid item md={6} sm={12}>
            <TextField
              fullWidth
              label="Name"
              value={form.name}
              onChange={(e) => handleFormFieldChange('name', e)}
            />
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              margin="normal"
              value={form.title}
              onChange={(e) => handleFormFieldChange('title', e)}
            />
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
              value={form.description}
              onChange={(e) => handleFormFieldChange('description', e)}
            />
            <TextField
              fullWidth
              label="Target Amount (ETH)"
              variant="outlined"
              margin="normal"
              value={form.target}
              onChange={(e) => handleFormFieldChange('target', e)}
            />
            <TextField
              fullWidth
              label="Deadline"
              variant="outlined"
              margin="normal"
              type="date"
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: getTodayDate() }}
              value={form.deadline}
              onChange={(e) => handleFormFieldChange('deadline', e)}
            />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button variant="contained" color="primary" type="submit" disabled={isLoading} sx={{ mr: 2 }}>
            {isLoading ? <CircularProgress size={24} /> : 'Create Campaign'}
          </Button>
          <Button variant="outlined" onClick={() => navigate('/')}>
            Cancel
          </Button>
        </Box>
      </form>
    </MainCard>
  );
};

export default CreateCampaign;
