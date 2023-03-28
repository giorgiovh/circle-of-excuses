import { useEffect } from "react"
import { useCollection } from "./useCollection"

export default function WrapperForUseCollectionUser({ uid, setIsUserPending, setUserError, setUserExcuses}) {

  const { isPending, error, documents } = useCollection(
    'excuses',
    ["uid", "==", uid],
    ["createdAt", "desc"]
  )

  useEffect(() => {
    setIsUserPending(isPending)
    setUserError(error)
    setUserExcuses(documents)
  }, [setIsUserPending, setUserError, setUserExcuses, isPending, error, documents])
  
  return null
}