import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useFirestore } from '../../hooks/useFirestore';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useDocument } from '../../hooks/useDocument'

import { addHashtagAndTho, addUnderscores, checkIfUserExcuse } from '../../utils/utils';

export default function ExcuseDetails({ uid }) {
  const [imageSource, setImageSource] = useState('')
  const [isDeleteDialogOpen, setisDeleteDialogOpen] = useState(false);
  const { id } = useParams()

  // look for the document in the preset_excuses collection
  const { isPending: isPresetPending, error: presetError, document: presetExcuse } = useDocument('preset_excuses', id)

  // look for the document in the user created excuses collection
  const { isPending: isUserPending, error: userError, document: userExcuse } = useDocument('excuses', id)

  let excuseToDisplay
  if (presetExcuse) {
    excuseToDisplay = presetExcuse
  } else if (userExcuse) {
    excuseToDisplay = userExcuse
  }

  const navigate = useNavigate()

  const { deleteDocument } = useFirestore('excuses')

  const handleClickOpen = () => {
    setisDeleteDialogOpen(true);
  };

  const handleClose = () => {
    setisDeleteDialogOpen(false);
  };

  // logic to format the excuse name so that:
  //    1) it matches its corresponding image file's name
  //    2) the title is displayed with a hashtag and a "tho"
  let nameWithUnderscores = ""
  let nameWithHashtagAndTho = ""
  if (excuseToDisplay) {
    nameWithUnderscores = addUnderscores(excuseToDisplay.name)
    nameWithHashtagAndTho = addHashtagAndTho(excuseToDisplay.name)
  }

  useEffect(() => {
    // the below try-catch block is to handle the case where the image file does not exist
    try {
      // Use the require function to import the image
      const image = require(`../../images/${nameWithUnderscores}.png`);
      setImageSource(image);
    } catch (error) {
      // If the image file does not exist, set the image source to a generic image
      setImageSource(require('../../images/generic.png'));
    }
  }, [nameWithUnderscores]);

  return (
    <>
      {(isPresetPending || isUserPending) && <p>Loading...</p>}
      {userError && <p>{userError}</p>}
      {presetError && <p>{presetError}</p>}
      {excuseToDisplay && (
        <>
          <img src={imageSource} alt={excuseToDisplay.name} />
          <h2>{nameWithHashtagAndTho}</h2>
          <p><strong>Description: </strong>{excuseToDisplay.description}</p>
          <p><strong>Response: </strong>{excuseToDisplay.response}</p>
          <p><strong>Socratic Response: </strong>{excuseToDisplay.socraticResponse}</p>
          {/* Only show the edit and delete buttons for the user-created excuses */}
          {checkIfUserExcuse(excuseToDisplay) && (
            <>
              <Button onClick={() => navigate(`/excuses/${id}/edit`)} startIcon={<EditIcon />}>Edit</Button>
              <Button 
                startIcon={<DeleteIcon />}
                onClick={() => handleClickOpen()}
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
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={() => { deleteDocument(id); navigate('/') }} variant="contained" autoFocus>
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          )}
        </>
      )}
    </>
  )
}
