import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useFirestore } from '../hooks/useFirestore';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { addHashtagAndTho, addUnderscores, checkIfUserExcuse } from '../utils/utils';

export default function ImgMediaCard({ excuse }) {
  const [imageSource, setImageSource] = useState('')
  const [isDeleteDialogOpen, setisDeleteDialogOpen] = useState(false)
  
  const { deleteDocument } = useFirestore('excuses')
  
  const navigate = useNavigate()

  const handleClickOpen = () => {
    setisDeleteDialogOpen(true)
  };

  const handleClose = () => {
    setisDeleteDialogOpen(false)
  }

  const handleDelete = () => {
    deleteDocument(excuse.id)
    navigate('/')
  } 

  const nameWithHashtagAndTho = addHashtagAndTho(excuse.name);
  const nameWithUnderscores = addUnderscores(excuse.name);


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
    <Card sx={{ maxWidth: 345 }} style={{ position: 'relative' }}>
      <CardMedia
        component="img"
        alt={excuse.name}
        height="140"
        image={imageSource}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {nameWithHashtagAndTho}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {excuse.description.length > 100 ? excuse.description.substring(0, 100) + '...' : excuse.description}
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Button size="small">Share</Button> */}
        <Button size="small" onClick={() => navigate(`/excuses/${excuse.id}`)}>See Excuse</Button>
      </CardActions>
      {/* Only show the delete and edit buttons for the user-created excuses (ie. the excuses that have a "uid" property)*/}
      {checkIfUserExcuse(excuse) && (
        <>
          <Tooltip title="Delete Excuse">
            <IconButton
              onClick={() => handleClickOpen()}
              style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer', filter: 'invert(70%)' }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Dialog
            open={isDeleteDialogOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {`Delete the excuse ${nameWithHashtagAndTho}?`}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions> 
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleDelete} variant="contained" autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
          <Tooltip title="Edit Excuse">
            <IconButton
              onClick={() => navigate(`/excuses/${excuse.id}/edit`)}
              style={{ position: 'absolute', top: '10px', right: '45px', cursor: 'pointer', filter: 'invert(70%)' }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Card>
  );
}