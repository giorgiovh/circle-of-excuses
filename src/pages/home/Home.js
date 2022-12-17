import { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import Button from '@mui/material/Button';

import Excuse from '../../components/Excuse'

import './Home.css';

export default function Home() {
  const { data: excuses, isPending, error } = useFetch('http://localhost:3000/excuses')
  const [excuse, setExcuse] = useState(null)

  const generateRandomExcuseId = () => {
    const randomId = Math.floor(Math.random() * excuses.length)
    setExcuse(excuses[randomId])
  }

  return (
    <div className='home'>
      <Button 
        variant="contained" 
        onClick={() => generateRandomExcuseId()}
        className='spin-button'
      >
        Spin the wheel!
      </Button>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {excuse && <Excuse name={excuse.name} description={excuse.description} response={excuse.response} socraticResponse={excuse.socraticResponse}/>}
    </div>
  )
}
