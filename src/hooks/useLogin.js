import { useEffect, useState } from "react"
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)
  
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setError(null)
    setIsPending(true)

    // sign the user in
    try {
      const res = await projectAuth.signInWithEmailAndPassword(email, password)

      // dispatch login action to update global state
      dispatch({ type:'LOGIN', payload: res.user })

      // update local state
      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } catch (err) {
      // update local state
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    // since this function is being returned inside useEffect, it will run only if the component is unmounted
    return () => setIsCancelled(true)
  }, [])

  return { error, isPending, login}
}
