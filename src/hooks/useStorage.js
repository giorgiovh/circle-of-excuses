import { useState, useEffect } from 'react'
import { projectStorage } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useStorage = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { user } = useAuthContext()

  const uploadImage = async (file) => {
    setError(null)
    setIsPending(true)
  
    try {
      // upload file
      const uploadPath = `images/${user.uid}/${file.name}`
      const image = await projectStorage.ref(uploadPath).put(file)
      const imageUrl = await image.ref.getDownloadURL()
      console.log('imageUrl: ', imageUrl);

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }

      // return the url so that it can be added to the excuse object before the excuse is added to the db
      return imageUrl
    } 
    catch(err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { uploadImage, error, isPending }
}