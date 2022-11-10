import React from 'react'
import useFetch from '../hooks/useFetch'

export default function Home() {
  const { data: excuses, isPending, error } = useFetch('http://localhost:3000/excuses')

  return (
    <div className='home'>
      <h2>Home</h2>

      { excuses && excuses.map(excuse => (
        <div>{excuse.name}</div>
      ))}
    </div>
  )
}
