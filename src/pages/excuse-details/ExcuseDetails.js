import { useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

import { useDocument } from '../../hooks/useDocument'

import { addHashtagAndTho, addUnderscores } from '../../utils/utils';

export default function ExcuseDetails({ uid }) {
  const { id } = useParams()
  const { isPending, error, document: excuse } = useDocument('excuses', id)

  const navigate = useNavigate()

  return (
    <>
      {isPending && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {excuse && (
        <>
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
