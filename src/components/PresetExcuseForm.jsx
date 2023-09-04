import { useState } from 'react'
import { useFirestore } from '../hooks/useFirestore'
import { useNavigate } from 'react-router-dom'

// mui
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

// hooks
import { useStorage } from '../hooks/useStorage'

export const PresetExcuseForm = ({ id, excuse = {} }) => {
  const [newImage, setNewImage] = useState(null)
  const [name, setName] = useState(excuse.name ?? '')
  const [description, setDescription] = useState(excuse.description ?? '')
  const [response, setResponse] = useState(excuse.response ?? '')
  const [socraticResponse, setSocraticResponse] = useState(excuse.socraticResponse ?? '')
  const [error, setError] = useState(null)
  const [imageUrl, setImageUrl] = useState(excuse.imageUrl || 'https://firebasestorage.googleapis.com/v0/b/circle-of-excuses-site.appspot.com/o/images%2Fgeneric%2Fvegan_logo.png?alt=media&token=d9d2640d-142c-4261-ae1c-6c602fb5aebb')

  const { uploadImage, isPending: imageIsPending, error: imageUploadError } = useStorage()

  const { addDocument, updateDocument } = useFirestore('preset_excuses')

  const navigate = useNavigate();

  // if we don't receive an excuse as a prop (ie. the excuse object is empty), it will be a new excuse. Else, it will be an existing excuse
  const isNewExcuse = Object.keys(excuse).length === 0

  const handleSubmit = async (e) => {
    e.preventDefault()
    const excuseToAddOrEdit = { name, description, response, socraticResponse }
  
    if (newImage) {
      const newImageUrl = await uploadImage(newImage)
      setImageUrl(newImageUrl)
      excuseToAddOrEdit.imageUrl = newImageUrl
    } else if (!newImage && !imageUrl) {
      excuseToAddOrEdit.imageUrl = 'https://firebasestorage.googleapis.com/v0/b/circle-of-excuses-site.appspot.com/o/images%2Fgeneric%2Fvegan_logo.png?alt=media&token=d9d2640d-142c-4261-ae1c-6c602fb5aebb'
    } else {
      excuseToAddOrEdit.imageUrl = imageUrl
    }
  
    if (isNewExcuse) {
      addDocument(excuseToAddOrEdit)
    } else {
      updateDocument(id, excuseToAddOrEdit)
    }
  }  

  const handleFileChange = (e) => {
    setNewImage(e.target.files[0])
    setError(null)
    setImageUrl(URL.createObjectURL(e.target.files[0]))
  }

  const handleRemoveImage = (e) => {
    e.preventDefault()
    setNewImage(null)
    setImageUrl(null)
  }

  return (
    <div>
      {imageUrl &&
        <img src={imageUrl} className="excuse-image" alt="current" style={{ maxWidth: "100%" }} />
      }
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
          <p>{newImage ? newImage.name : "No file chosen"}</p>
          {imageUrl &&
            <Button onClick={handleRemoveImage}>Remove</Button>
          }
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
