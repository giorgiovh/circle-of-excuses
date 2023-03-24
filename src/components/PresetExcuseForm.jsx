import { useState } from 'react'
import { useFirestore } from '../hooks/useFirestore'
import { useNavigate } from 'react-router-dom'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

export const PresetExcuseForm = ({ id, excuse = {} }) => {
  const [name, setName] = useState(excuse.name ?? '')
  const [description, setDescription] = useState(excuse.description ?? '')
  const [response, setResponse] = useState(excuse.response ?? '')
  const [socraticResponse, setSocraticResponse] = useState(excuse.socraticResponse ?? '')

  const { addDocument, updateDocument } = useFirestore('preset_excuses')

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const excuseToAddOrEdit = { name, description, response, socraticResponse }
    // if we don't receive an excuse as a prop (ie. the excuse object is empty), we're adding a new excuse. Else, we're updating an existing excuse
    if (Object.keys(excuse).length === 0) {   
      await addDocument(excuseToAddOrEdit)
    } else {
      await updateDocument(id, excuseToAddOrEdit)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField 
          id="outlined-basic" 
          label="Name" 
          variant="standard"
          type="text"
          onChange={(e) => {setName(e.target.value)}}
          value={name}
          required
          margin="normal"
          helperText="No need to add the hashtag, hyphens, or 'tho' to your excuse name. We'll add it for you (⌐■_■)"
        />

        <TextField 
          id="outlined-basic" 
          label="Description" 
          variant="standard"
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          required
          fullWidth
          multiline 
          maxRows={4}
          margin="normal"
        />

        <TextField 
          id="outlined-basic" 
          label="Response" 
          variant="standard"
          type="text"
          onChange={(e) => setResponse(e.target.value)}
          value={response}
          required
          fullWidth
          multiline
          maxRows={4}
          margin="normal"
        />

        <TextField 
          id="outlined-basic" 
          label="Socratic Response" 
          variant="standard"
          type="text"
          onChange={(e) => setSocraticResponse(e.target.value)}
          value={socraticResponse}
          required
          fullWidth
          multiline 
          maxRows={4}
          margin="normal"
        />

        <Button 
          onClick={() => navigate(-1)}
          sx={{ color: '#048c04' }}
        >
          Cancel
        </Button>
        <Button  
          type='submit'
          autoFocus
          variant="contained"
          sx={{ 
            backgroundColor: '#048c04',
            '&:hover': {
              backgroundColor: '#036b03'
            }
          }}
        >
          Submit
        </Button>
      </form>
    </div>
  )
}
