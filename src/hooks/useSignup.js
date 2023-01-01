import { useState, useEffect } from "react"
import { projectAuth } from '../firebase/config'
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, displayName) => {
    setError(null)
    setIsPending(true)

    try {
      // signup user
      const res = await projectAuth.createUserWithEmailAndPassword(email, password)

      if (!res) {
        throw new Error('Could not complete signup')
      }

      // add display name to user
      await res.user.updateProfile({ displayName })
      
      // dispatch login action to update global state
      dispatch({ type: 'LOGIN', payload: res.user })

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

  return { error, isPending, signup }
}

