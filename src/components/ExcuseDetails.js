import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';

import { addHashtagAndTho, addUnderscores } from '../utils/utils';

export default function ExcuseDetails({ name, description, response, socraticResponse }) {

  const { id } = useParams()

  const navigate = useNavigate()

  return (
    <>
      <h2>{addHashtagAndTho(name)}</h2>
      <p><strong>Description: </strong>{description}</p>
      <p><strong>Response: </strong>{response}</p>
      <p><strong>Socratic Response: </strong>{socraticResponse}</p>
      <Button onClick={() => navigate(`/excuses/${id}/edit`)}>Edit</Button>
    </>
  )
}