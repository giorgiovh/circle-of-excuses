import { useState, useEffect } from "react"
import { projectFirestore } from "../firebase/config"

export const useCollection = (collection) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null)
  const [documents, setDocuments] = useState(null)

  useEffect(() => {
    setIsPending(true)
    
    let ref = projectFirestore.collection(collection)

    const unsubscribe = ref.onSnapshot((snapshot) => {
      let results = []
      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), id: doc.id })
      })

      // update state
      setDocuments(results)
      setError(null)
      setIsPending(false)
    }, (error) => {
      console.log(error.message);
      setError(error.message)
      setIsPending(false)
    })

    // This "unsubscribe" clean-up function allows us to stop listening to the changes (ie. it unsubscribes from the onSnapshot listener) once the component unmounts. Since it's returned inside useEffect, it gets called automatically once the component unmounts
    return () => unsubscribe()

  }, [collection])

  return { isPending, error, documents }
}
