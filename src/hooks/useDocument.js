import { useState, useEffect } from "react"
import { projectFirestore } from "../firebase/config"

export const useDocument = (collection, id) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null)
  const [document, setDocument] = useState(null)

  useEffect(() => {
    setIsPending(true)
    let ref = projectFirestore.collection(collection).doc(id)

    console.log('path:', projectFirestore.collection(collection).doc(id).path);

    const unsubscribe = ref.onSnapshot((doc) => {
      if (doc.exists) {
        setIsPending(false)
        setDocument(doc.data())
      } else {
        setIsPending(false)
        setError('Could not find that excuse')
      }
    }, (err) => {
      console.log(err.message);
      setError('Could not fetch the data')
      setIsPending(false)
    })

    // This "unsubscribe" clean-up function allows us to stop listening to the changes (ie. it unsubscribes from the onSnapshot listener) once the component unmounts. Since it's returned inside useEffect, it gets called automatically once the component unmounts
    return () => unsubscribe()

  }, [collection, id])

  return { isPending, error, document }
}
