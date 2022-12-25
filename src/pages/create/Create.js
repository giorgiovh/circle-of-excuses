import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectFirestore } from '../../firebase/config';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


import './Create.css'

export default function Create() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [response, setResponse] = useState('')
  const [socraticResponse, setSocraticResponse] = useState('')

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const doc = { name, description, response, socraticResponse }

    try {
      await projectFirestore.collection('excuses').add(doc)
      navigate('/')
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h2>Add a New Excuse</h2>

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
