import { useState, useEffect } from "react"
import { projectFirestore } from "../firebase/config"

export const useDocument = (collection1, collection2, id) => {
  // const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null)
  const [document, setDocument] = useState(null)

  useEffect(() => {
    projectFirestore.collection(collection1).doc(id).get()
      .then((doc) => {
        if (doc.exists) {
          setDocument(doc.data())
        } else {
          projectFirestore.collection(collection2).doc(id).get()
            .then((doc) => {
              if (doc.exists) {
                setDocument(doc.data())
              } else {
                setError('Could not find that excuse')
              }
            })
            .catch((err) => {
              console.log(err.message);
              setError('Could not fetch the data')
            })
        }
      })
  }, [collection1, collection2, id])

  return { error, document }
}
