import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { projectFirestore } from '../../firebase/config';

import { ExcuseForm } from '../../components/ExcuseForm'

export default function Edit({ uid }) {
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
      console.log(err.message);
      setError('Could not fetch the data')
      setIsPending(false)
    })

    return () => unsub()

  }, [id])

  return (
    <>
      <h2>Edit excuse</h2>
      {error && <p>{error}</p>}
      {isPending && <p>Loading...</p>}
      {excuse && <ExcuseForm uid={uid} id={id} excuse={excuse}/>}
    </>
  )
}