import { useState } from 'react'
import { useFirestore } from '../hooks/useFirestore'
import { useNavigate } from 'react-router-dom'

// mui
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

// hooks
import { useStorage } from '../hooks/useStorage'

export const PresetExcuseForm = ({ id, excuse = {} }) => {
  const [image, setImage] = useState(null)
  const [name, setName] = useState(excuse.name ?? '')
  const [description, setDescription] = useState(excuse.description ?? '')
  const [response, setResponse] = useState(excuse.response ?? '')
  const [socraticResponse, setSocraticResponse] = useState(excuse.socraticResponse ?? '')
  const [error, setError] = useState(null)

  const { uploadImage, isPending: imageIsPending, error: imageUploadError } = useStorage()

  const { addDocument, updateDocument } = useFirestore('preset_excuses')

  const navigate = useNavigate();

  // if we don't receive an excuse as a prop (ie. the excuse object is empty), it will be a new excuse. Else, it will be an existing excuse
  const isNewExcuse = Object.keys(excuse).length === 0

  const handleSubmit = async (e) => {
    e.preventDefault()
    const excuseToAddOrEdit = { name, description, response, socraticResponse }
  
    let imageUrl;
    if (image) {
      imageUrl = await uploadImage(image)
    } else {
      imageUrl = excuse.imageUrl || 'https://firebasestorage.googleapis.com/v0/b/circle-of-excuses-site.appspot.com/o/images%2Fgeneric%2Fvegan_logo.png?alt=media&token=d9d2640d-142c-4261-ae1c-6c602fb5aebb'
    }
  
    if (isNewExcuse) {
      addDocument({ ...excuseToAddOrEdit, imageUrl })
    } else {
      updateDocument(id, { ...excuseToAddOrEdit, imageUrl })
    }
  }  

  const handleFileChange = (e) => {
    setImage(null)
    let selected = e.target.files[0]

    if (!selected) {
      setError('Please select a file')
      return
    }

    setError(null)
    setImage(selected)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div style={{ display: "flex" }}>
          <Button component="label">
            Choose File
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleFileChange}
            />
          </Button>
          <p>{image ? image.name : "No file chosen"}</p>
        </div>
        {error && <div className='error'>{error}</div>}
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
