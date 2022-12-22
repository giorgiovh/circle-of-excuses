import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { addHashtagAndTho, addUnderscores } from '../utils/utils';

export default function ImgMediaCard({ name, description, response, socraticResponse }) {
  const [imageSource, setImageSource] = useState('');

  const nameWithHashtagAndTho = addHashtagAndTho(name);
  const nameWithUnderscores = addUnderscores(name);

  useEffect(() => {
    // the below try-catch block is to handle the case where the image file does not exist
    try {
      // Use the require function to import the image
      const image = require(`./../images/${nameWithUnderscores}.png`);
      setImageSource(image);
    } catch (error) {
      // If the image file does not exist, set the image source to a generic image
      setImageSource(require('./../images/generic.png'));
    }
  }, [nameWithUnderscores]);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={imageSource}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {nameWithHashtagAndTho}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">See Response</Button>
      </CardActions>
    </Card>
  );
}