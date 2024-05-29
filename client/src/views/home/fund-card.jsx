import React from 'react';
import { Box, Card, CardActionArea, CardContent, Typography, useTheme } from '@mui/material';
import { MediaRenderer } from '@thirdweb-dev/react';

const FundCard = ({ title, description, image, target, amountCollected, handleClick }) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        maxWidth: 345,
        bgcolor: theme.palette.grey[100],
        borderStyle: 'dashed',
        borderWidth: 1.6,
        borderColor: theme.palette.grey[500]
      }}
      onClick={handleClick}
    >
      <CardActionArea>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <MediaRenderer
            src={image}
            alt={title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </Box>
        <CardContent>
          <Typography variant="h5" component="div">
            Name: {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Desp: {description}
          </Typography>
          <Typography variant="body2" color="textPrimary">
            Target: {target} MATIC
          </Typography>
          <Typography variant="body2" color="textPrimary">
            Collected: {amountCollected} MATIC
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default FundCard;
