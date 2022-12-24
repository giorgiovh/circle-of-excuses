import { useEffect, useState } from 'react';
import { projectFirestore } from '../../firebase/config'
import ExcuseList from '../../components/ExcuseList';

import './Home.css';

export default function Home() {
  const [excuses, setExcuses] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);

    const unsub = projectFirestore.collection('excuses').onSnapshot((snapshot) => {
      if (snapshot.empty) {
        setError('No excuses to load')
        setIsPending(false)
      } else {
        let results = []
        snapshot.docs.forEach(doc => {
          results.push({ id: doc.id, ...doc.data() })
        })
        setExcuses(results)
        setIsPending(false)
      }
    }, (err) => {
      setError(err.message)
      setIsPending(false)
    })

    // This "unsub" clean-up function allows us to stop listening to the changes (ie. it unsubscribes from the onSnapshot listener) once the component unmounts. It gets called automatically once the component unmounts
    return () => unsub()
  }, [])


  return (
    <div className='home'>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {excuses && <ExcuseList excuses={excuses} />}
    </div>
  )
}
