import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { projectFirestore } from '../../firebase/config';

import ExcuseDetails from '../../components/ExcuseDetails';

export default function Excuse() {
  const [excuse, setExcuse] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  const { id } = useParams()

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
      setError(err.message)
      setIsPending(false)
    })

    return () => unsub()

  }, [id])

  return (
    <>
      {error && <p>{error}</p>}
      {isPending && <p>Loading...</p>}
      {excuse && <ExcuseDetails name={excuse.name} description={excuse.description} response={excuse.response} socraticResponse={excuse.socraticResponse}/>}
    </>
  )
}
