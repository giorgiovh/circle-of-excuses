import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';

import { projectFirestore } from "../../firebase/config"
import ExcuseList from '../../components/ExcuseList'

export default function Search({ uid }) {
  const [documents, setDocuments] = useState([])
  const [error, setError] = useState(null)

  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get('q')

  // search for excuses with the name "query" in the "preset_excuses" collection first and if the user is logged in (ie. there is a "uid" value), also search in the "excuses" collection. Then combine the results from both searches and set the documents state equal to the results from both searches.

  useEffect(() => {
    let presetExcuses = [];
    let excuses = [];
    projectFirestore.collection("preset_excuses").where("name", "==", query).get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          presetExcuses.push({...doc.data(), id: doc.id});
        });
        setDocuments([...presetExcuses])
      })
      .catch((error) => {
        console.log('Could not fetch the data');
        setError(error.message)
      });
    if (uid) {
      projectFirestore.collection("excuses").where("name", "==", query).where("uid", "==", uid).get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            excuses.push({...doc.data(), id: doc.id});
          });
          setDocuments([...presetExcuses, ...excuses])
        })
        .catch((error) => {
          console.log('Could not fetch the data');
          setError(error.message)
        });
    }
  }, [query, uid])

  return (
    <div>
      <h2>Excuses with the name "{query}"</h2>
      {error && <p>{error}</p>}
      {documents && <ExcuseList uid={uid} excuses={documents} />}
    </div>
  )
}
