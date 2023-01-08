import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

import { useDocument } from '../../hooks/useDocument'

import { addHashtagAndTho, addUnderscores } from '../../utils/utils';

export default function ExcuseDetails({ uid }) {
  const [imageSource, setImageSource] = useState('')

  const { id } = useParams()
  const { isPending, error, document: excuse } = useDocument('excuses', id)

  const navigate = useNavigate()

  let nameWithUnderscores = ""

  if (excuse) {
    nameWithUnderscores = addUnderscores(excuse.name)
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
      {isPending && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {excuse && (
        <>
          <img src={imageSource} alt={excuse.name} />
          <h2>{addHashtagAndTho(excuse.name)}</h2>
          <p><strong>Description: </strong>{excuse.description}</p>
          <p><strong>Response: </strong>{excuse.response}</p>
          <p><strong>Socratic Response: </strong>{excuse.socraticResponse}</p>
          {/* Don't show the edit button for the pre-set excuses */}
          {excuse.uid !== '' && <Button onClick={() => navigate(`/excuses/${id}/edit`)}>Edit</Button>}
        </>
      )}
    </>
  )
}
