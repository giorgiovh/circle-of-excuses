import { useState } from 'react'
import useFetch from '../hooks/useFetch'

import Excuse from '../components/Excuse'

export default function Home() {
  const { data: excuses, isPending, error } = useFetch('http://localhost:3000/excuses')
  const [excuse, setExcuse] = useState(null)

  const generateRandomExcuseId = () => {
    const randomId = Math.floor(Math.random() * excuses.length)
    setExcuse(excuses[randomId])
  }

  return (
    <div className='home'>
      <button onClick={() => generateRandomExcuseId()}>Spin the wheel!</button>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {excuse && <Excuse name={excuse.name} description={excuse.description} response={excuse.response} socraticResponse={excuse.socraticResponse}/>}
    </div>
  )
}
