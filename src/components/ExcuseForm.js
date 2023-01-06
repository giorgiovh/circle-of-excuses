import { useState } from 'react';
import { useFirestore } from '../hooks/useFirestore'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export const ExcuseForm = ({ uid, id, excuse = {} }) => {
  const [name, setName] = useState(excuse.name ?? '')
  const [description, setDescription] = useState(excuse.description ?? '')
  const [response, setResponse] = useState(excuse.response ?? '')
  const [socraticResponse, setSocraticResponse] = useState(excuse.socraticResponse ?? '')

  const { addDocument, updateDocument } = useFirestore('excuses')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const excuseToAddOrEdit = { uid, name, description, response, socraticResponse }
    // if we don't receive an excuse as a prop (ie. the excuse object is empty), we're adding a new excuse. Else, we're updating an existing excuse
    if (Object.keys(excuse).length === 0) {   
      addDocument(excuseToAddOrEdit)
    } else {
      updateDocument(id, excuseToAddOrEdit)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField 
          id="outlined-basic" 
          label="Excuse" 
          variant="outlined"
          type="text"
          onChange={(e) => {setName(e.target.value)}}
          value={name}
          required
          margin="normal"
        />

        <TextField 
          id="outlined-basic" 
          label="Description" 
          variant="outlined"
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
          variant="outlined"
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
          variant="outlined"
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
          variant="contained" 
          type='submit'
          style={{ margin: '10px 0' }}
        >
          Submit
        </Button>
      </form>
    </div>
  )
}
