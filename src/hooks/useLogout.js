import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  
  const { dispatch } = useAuthContext()

  const navigate = useNavigate()

  const logout = async () => {
    setError(null)
    setIsPending(true)

    // sign the user out
    try {
      await projectAuth.signOut()

      // dispatch logout action to update global state
      dispatch({ type:'LOGOUT' })

      // update local state
      setIsPending(false)
      setError(null)
      
      navigate('/')
    } catch (err) {
      // update local state
      console.log(err.message);
      setError(err.message)
      setIsPending(false)
    }
  }

  return { error, isPending, logout}
}
