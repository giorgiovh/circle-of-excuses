import { useState } from "react"
import { useAuthContext } from './useAuthContext'
import { projectAuth, provider } from '../firebase/config'

export const useLoginWithGoogle = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)

  const { dispatch } = useAuthContext()
  
  const loginWithGoogle = async () => {
    setError(null)
    setIsPending(true)

    // sign the user in
    try {
      const res = await projectAuth.signInWithPopup(provider)

      // dispatch login action to update global state
      dispatch({ type:'LOGIN', payload: res.user })

      // update local state
      setIsPending(false)
      setError(null)

    } catch (err) {
      // update local state
      console.log(err.message);
      setError(err.message)
      setIsPending(false)
    }
  }

  return { error, isPending, loginWithGoogle }
}
