import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config'

import { useNavigate } from 'react-router-dom';
import { useFirestore } from '../hooks/useFirestore';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

import { addHashtagAndTho, addUnderscores } from '../utils/utils';

export default function ImgMediaCard({ id, uid, name, description, response, socraticResponse }) {
  const [imageSource, setImageSource] = useState('')

  const { deleteDocument } = useFirestore('excuses')

  const nameWithHashtagAndTho = addHashtagAndTho(name);
  const nameWithUnderscores = addUnderscores(name);

  const navigate = useNavigate();

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
    <Card sx={{ maxWidth: 345 }} style={{ position: 'relative'}}>
      <CardMedia
        component="img"
        alt={`image for ${name}`}
        height="140"
        image={imageSource}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {nameWithHashtagAndTho}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description.length > 100 ? description.substring(0, 100) + '...' : description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small" onClick={() => navigate(`/excuses/${id}`)}>See Excuse</Button>
      </CardActions>
      {/* Don't show the delete button for the pre-set excuses*/}
      {uid !== '' && (
        <DeleteIcon 
        onClick={() => deleteDocument(id)}
        style={{ position: 'absolute',top: '10px', right: '10px',cursor: 'pointer', filter: 'invert(60%)' }}
      />
      )}
    </Card>
  );
}