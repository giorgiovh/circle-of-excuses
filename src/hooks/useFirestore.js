import { useReducer, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { projectFirestore, timestamp } from '../firebase/config'

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null
}

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { document: null, isPending: true, error: null, success: false }

    case 'ADDED_DOCUMENT':
      return { document: action.payload, isPending: false, error: false, success: true }

    case 'DELETED_DOCUMENT':
      return { document: null, isPending: false, error: null, success: true }

    case 'UPDATED_DOCUMENT':
      return { document: action.payload, isPending: false, error: null, success: true }

    case 'ERROR':
      return { document: null, isPending: false, error: action.payload, success: false }

    default:
      return state
  }
}

export const useFirestore = (collection) => {
  const [firestoreResponse, dispatch] = useReducer(firestoreReducer, initialState)
  const [isCancelled, setIsCancelled] = useState(false)

  const navigate = useNavigate()

  // collection ref
  const ref = projectFirestore.collection(collection)

  // only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action)
    }
  }

  // add a document
  const addDocument = async (doc) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      const createdAt = timestamp.fromDate(new Date())
      const addedDocument = await ref.add({ ...doc, createdAt })
      dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument})
      navigate('/')
    } catch (err) {
      dispatchIfNotCancelled({ action: 'ERROR', payload: err.message })
    }
  }

  // delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      await ref.doc(id).delete()
      dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' })
    } catch (err) {
      dispatchIfNotCancelled({ action: 'ERROR', payload: 'Could not delete' })
    }
  }

  // update a document
  const updateDocument = async (id, updates) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      const updatedDocument = await ref.doc(id).update(updates)
      dispatchIfNotCancelled({ type: 'UPDATED_DOCUMENT', payload: updatedDocument })
      return updatedDocument
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
      return null
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { addDocument, deleteDocument, updateDocument, firestoreResponse }
}
