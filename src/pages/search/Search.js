import { useState } from 'react'
import { useLocation } from 'react-router-dom';

import { projectFirestore } from "../../firebase/config"
import ExcuseList from '../../components/ExcuseList'

export default function Search({ uid }) {
  const [documents, setDocuments] = useState([])
  const [error, setError] = useState(null)

  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get('q')

  // const url = 'http://localhost:3000/excuses?q=' + query
  // const { error, isPending, data } = useFetch(url)

  projectFirestore.collection('excuses').where('uid', 'in', uid ? ["", uid] : [""]).where('name', '==', query).get()
    .then((snapshot) => {
      let results = []
      snapshot.forEach((doc) => {
        results.push({...doc.data(), id: doc.id})
      })
      setDocuments(results)
    })
    .catch((err) => setError(err.message))


  return (
    <div>
      <h2>Excuses with the name "{query}"</h2>
      {/* {isPending && <p>Loading...</p>} */}
      {error && <p>{error}</p>}
      {documents && <ExcuseList uid={uid} excuses={documents}/>}
    </div>
  )
}
