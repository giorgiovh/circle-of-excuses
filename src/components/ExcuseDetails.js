import { projectFirestore } from '../firebase/config'

import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import { addHashtagAndTho, addUnderscores } from '../utils/utils';

export default function ExcuseDetails({ name, description, response, socraticResponse }) {

  const { id } = useParams()

  const handleClick = () => {
    projectFirestore.collection('excuses').doc(id).update({
      description: 'something completely different'
    })
  }

  return (
    <>
      <h2>{addHashtagAndTho(name)}</h2>
      <p><strong>Excuse: </strong>{description}</p>
      <p><strong>Response: </strong>{response}</p>
      <p><strong>Socratic Response: </strong>{socraticResponse}</p>
      <Button onClick={handleClick}>Update me</Button>
    </>
  )
}