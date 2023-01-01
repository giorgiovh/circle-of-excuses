import { useEffect, useState } from "react"
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)
  const { dispatch } = useAuthContext()

  const logout = async () => {
    setError(null)
    setIsPending(true)

    // sign the user out
    try {
      await projectAuth.signOut()

      // dispatch logout action to update global state
      dispatch({ type:'LOGOUT' })

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

  return { error, isPending, logout}
}
