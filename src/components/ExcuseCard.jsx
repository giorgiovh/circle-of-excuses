import { useState, useEffect } from 'react';

// hooks
import { useNavigate } from 'react-router-dom';
import { useFirestore } from '../hooks/useFirestore';
import { useAuthContext } from '../hooks/useAuthContext';

// mui components
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// functions
import { addHashtagAndTho, checkIfUserExcuse, checkIfUserIsAdmin } from '../utils/utils';

export default function ExcuseCard({ excuse }) {
  const [imageSource, setImageSource] = useState('')
  const [isDeleteDialogOpen, setisDeleteDialogOpen] = useState(false)

  const { user } = useAuthContext()

  const { deleteDocument: deleteUserExcuse } = useFirestore('excuses')
  const { deleteDocument: deletePresetExcuse } = useFirestore('preset_excuses')

  const navigate = useNavigate()

  const handleClickOpen = () => {
    setisDeleteDialogOpen(true)
  };

  const handleClose = () => {
    setisDeleteDialogOpen(false)
  }

  const handleDelete = () => {
    if (checkIfUserExcuse(excuse)) {
      deleteUserExcuse(excuse.id)
    } else {
      deletePresetExcuse(excuse.id)
    }
    navigate('/')
  }

  const nameWithHashtagAndTho = addHashtagAndTho(excuse.name);
  const isUserExcuse = excuse && checkIfUserExcuse(excuse)
  const isUserAdmin = user && checkIfUserIsAdmin(user)

  useEffect(() => {
    // the below try-catch block is to handle the case where the image file does not exist
    try {
      // Use the require function to import the image
      setImageSource(excuse.imageUrl);
    } catch (error) {
      // If the image file does not exist, set the image source to a generic image
      setImageSource(require('./../images/generic.png'));
    }
  }, [excuse.imageUrl]);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={() => navigate(isUserExcuse ? `/excuses/${excuse.id}` : `/preset-excuses/${excuse.id}`)}>
        <CardMedia
          component="img"
          image={imageSource}
          alt={excuse.name}
          style={{ objectFit: 'contain', height: '200px' }}
        />
        <CardContent style={{ height: '100px', overflow: 'hidden' }}>
          <Typography gutterBottom variant="h5" component="div">
            {nameWithHashtagAndTho}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {excuse.description.length > 100 ? excuse.description.substring(0, 100) + '...' : excuse.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* if the excuse is a user-created excuse or if the logged-in user is the admin, the Delete and Edit buttons should be rendered */}
        {(isUserExcuse || isUserAdmin) && (
          <>
            <Button
              onClick={() => handleClickOpen()}
              startIcon={<DeleteIcon />}
              size="small"
              sx={{ color: '#048c04' }}
            >
              Delete
            </Button>
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
                <Button
                  onClick={handleClose}
                  sx={{ color: '#048c04' }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDelete}
                  variant="contained"
                  autoFocus
                  sx={{
                    backgroundColor: '#048c04',
                    '&:hover': {
                      backgroundColor: '#036b03'
                    }
                  }}
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
            <Button
              onClick={() => navigate(isUserExcuse ? `/excuses/${excuse.id}/edit` : `/preset-excuses/${excuse.id}/edit`)}
              startIcon={<EditIcon />}
              size="small"
              sx={{ color: '#048c04' }}
            >
              Edit
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
}
