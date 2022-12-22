import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { addHashtagAndTho, addUnderscores } from '../utils/utils';

export default function ImgMediaCard({ name, description, response, socraticResponse }) {
  const nameWithHashtagAndTho = addHashtagAndTho(name);
  const nameWithUnderscores = addUnderscores(name);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={require(`./../images/${nameWithUnderscores}.png`)}
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