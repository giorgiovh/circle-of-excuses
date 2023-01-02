import { useState, useEffect, useRef } from "react"
import { projectFirestore } from "../firebase/config"

export const useCollection = (collection, _query) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null)
  const [documents, setDocuments] = useState(null)

    // when we wrap a reference type (like an array) in useRef, it doesn't see it as different on every component re-evaluation. By getting the "current" propert, we get the value, which will be the same even though the reference is different. So by passing in the query in the dependecy list, it's not going to cause an infinite loop. We can use the useRef hook to break out of the infinite loop when we use a reference type (like an array) as a dependency

  // if we don't use a ref --> infinite loop in useEffect
  // _query is an array and is "different" on every function call
  const query = useRef(_query).current

  useEffect(() => {
    setIsPending(true)

    let ref = projectFirestore.collection(collection)

    if (query) {
      ref = ref.where(...query)
    }

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

  }, [collection, query])

  return { isPending, error, documents }
}
