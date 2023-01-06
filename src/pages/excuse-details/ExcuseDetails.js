import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { projectFirestore } from '../../firebase/config';

import { addHashtagAndTho, addUnderscores } from '../../utils/utils';

export default function ExcuseDetails({ uid }) {
  const [excuse, setExcuse] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  const { id } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    setIsPending(true)

    const unsub = projectFirestore.collection('excuses').doc(id).onSnapshot((doc) => {
      if (doc.exists) {
        setIsPending(false)
        setExcuse(doc.data())
      } else {
        setIsPending(false)
        setError('Could not find that excuse')
      }
    }, (err) => {
      console.log(err.message);
      setError('Could not fetch the data')
      setIsPending(false)
    })

    return () => unsub()

  }, [id])

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
          <Button onClick={() => navigate(`/excuses/${id}/edit`)}>Edit</Button>
        </>
      )}
    </>
  )
}
