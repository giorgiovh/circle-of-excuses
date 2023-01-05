import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { projectFirestore } from '../../firebase/config';

import ExcuseDetails from '../../components/ExcuseDetails';

export default function Excuse({ uid }) {
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
    // TODO: if the uid of the excuse is equal to the uid of the current user (from the prop) or to "", show the ExcuseDetails. Else, show error saying they're not authorized to see the excuse
    <>
      {error && <p>{error}</p>}
      {isPending && <p>Loading...</p>}

      {/* Move this auth check logic to the section above? */}
      {excuse && (excuse.uid === uid || excuse.uid === "") && <ExcuseDetails name={excuse.name} description={excuse.description} response={excuse.response} socraticResponse={excuse.socraticResponse}/>}

      {/* Move this auth check logic to the section above? */}
      {excuse && (excuse.uid !== uid && excuse.uid !== "") && <p>Not authorized to view this excuse</p>}
    </>
  )
}
