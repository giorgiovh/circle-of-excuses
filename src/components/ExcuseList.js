import ImgMediaCard from './ImgMediaCard';

import './ExcuseList.css'

export default function ExcuseList({ uid, excuses }) {

  if (excuses.length === 0) {
    return <div>No excuses to load...</div>
  }

  return (
    <div className='card-grid'>
      {excuses.map(excuse => (
        <ImgMediaCard key={excuse.id} excuse={excuse} />
      ))}
    </div>
  )
}