import { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import Button from '@mui/material/Button';

import ExcuseDetails from '../../components/ExcuseDetails';

import './Wheel.css';

export default function Wheel() {
  const { data: excuses, isPending, error } = useFetch('http://localhost:3000/excuses')
  const [excuse, setExcuse] = useState(null)

  const generateRandomExcuseId = () => {
    const randomId = Math.floor(Math.random() * excuses.length)
    setExcuse(excuses[randomId])
  }

  return (
    <div>
      <Button 
        variant="contained" 
        onClick={() => generateRandomExcuseId()}
        className='spin-button'
      >
        Spin the wheel!
      </Button>
      {error && <p>{error}</p>}
      {isPending && <p>Loading...</p>}
      {excuse && <ExcuseDetails name={excuse.name} description={excuse.description} response={excuse.response} socraticResponse={excuse.socraticResponse}/>}
    </div>
  )
}
