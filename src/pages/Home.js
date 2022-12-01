import { useState } from 'react'
import useFetch from '../hooks/useFetch'

// import logo from './../assets/#nature-tho.png'

export default function Home() {
  const { data: excuses, isPending, error } = useFetch('http://localhost:3000/excuses')
  const [excuseId, setExcuseId] = useState(null)

  // generate a random integer between 0 and the number of excuses)

  const generateRandomExcuseId = () => {
    const randomId = Math.floor(Math.random() * excuses.length)
    setExcuseId(randomId)
    console.log("randomNumber", randomId);
  }

  return (
    <div className='home'>
      <button onClick={() => generateRandomExcuseId()}>Spin the wheel!</button>
      <h2>Excuse:</h2>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      { 
        excuses && excuseId && excuses[excuseId].name === "#nature-tho" 
        ?  <div>
              <img alt="Paul Bashir and Frank Tufano" src={require('./../images/nature-tho.png')} />
            </div> 
        : excuses && excuseId && <p>{excuses[excuseId].name}</p>
      }
    </div>
  )
}
