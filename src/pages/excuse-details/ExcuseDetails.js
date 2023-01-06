import { useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

import { useDocument } from '../../hooks/useDocument'

import { addHashtagAndTho, addUnderscores } from '../../utils/utils';

export default function ExcuseDetails({ uid }) {
  const { id } = useParams()
  const { isPending, error, document } = useDocument('excuses', id)

  const navigate = useNavigate()

  return (
    <>
      {isPending && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {document && (
        <>
          <h2>{addHashtagAndTho(document.name)}</h2>
          <p><strong>Description: </strong>{document.description}</p>
          <p><strong>Response: </strong>{document.response}</p>
          <p><strong>Socratic Response: </strong>{document.socraticResponse}</p>
          <Button onClick={() => navigate(`/excuses/${id}/edit`)}>Edit</Button>
        </>
      )}
    </>
  )
}
