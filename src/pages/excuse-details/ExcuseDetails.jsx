// react
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

// mui
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// hooks
import { useFirestore } from '../../hooks/useFirestore';
import { useDocument } from '../../hooks/useDocument'
import { useAuthContext } from '../../hooks/useAuthContext';

// functions
import { addHashtagAndTho, checkIfUserExcuse, checkIfUserIsAdmin } from '../../utils/utils';

// styles
import './ExcuseDetails.css'

export default function ExcuseDetails({ uid }) {
  const [isDeleteDialogOpen, setisDeleteDialogOpen] = useState(false)

  const { id } = useParams()

  const { user } = useAuthContext()

  const { error, document: excuse } = useDocument('preset_excuses', 'excuses', id)

  const navigate = useNavigate()

  const { deleteDocument: deleteUserExcuse } = useFirestore('excuses')
  const { deleteDocument: deletePresetExcuse } = useFirestore('preset_excuses')

  const handleClickOpen = () => {
    setisDeleteDialogOpen(true);
  };

  const handleClose = () => {
    setisDeleteDialogOpen(false);
  };

  // logic to format the excuse name so that the title is displayed with a hashtag and a "tho"
  let nameWithHashtagAndTho = ""
  if (excuse) {
    nameWithHashtagAndTho = addHashtagAndTho(excuse.name)
  }
  
  const isUserExcuse = excuse && checkIfUserExcuse(excuse)
  const isUserAdmin = user && checkIfUserIsAdmin(user)

  const handleDelete = () => {
    if (isUserExcuse) {
      deleteUserExcuse(id)
    } else {
      deletePresetExcuse(id)
    }
    navigate('/')
  }

  return (
    <div className='page'>
      {error && <p>{error}</p>}
      {excuse && (
        <>
          <img src={excuse.imageUrl} alt={excuse.name} className="excuse-image" />
          <h2>{nameWithHashtagAndTho}</h2>
          <p><strong>Description: </strong>{excuse.description}</p>
          <p><strong>Response: </strong>{excuse.response}</p>
          <p><strong>Socratic Response: </strong>{excuse.socraticResponse}</p>
          {/* if the excuse is a user-created excuse or if the logged-in user is the admin, the Delete and Edit buttons should be rendered */}
          {(isUserExcuse || isUserAdmin) && (
            <>
              <Button 
                onClick={() => navigate(isUserExcuse ? `/excuses/${id}/edit` : `/preset-excuses/${id}/edit`)} 
                startIcon={<EditIcon />}
                sx={{ color: '#048c04' }}
              >
                Edit
              </Button>
              <Button 
                startIcon={<DeleteIcon />}
                onClick={() => handleClickOpen()}
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
                    sx={{ backgroundColor: '#048c04' }}
                  >
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          )}
        </>
      )}
    </div>
  )
}
