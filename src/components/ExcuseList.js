import ImgMediaCard from './ImgMediaCard';

import './ExcuseList.css'

export default function ExcuseList({ excuses, uid }) {

  if (excuses.length === 0) {
    return <div>No excuses to load...</div>
  }

  return (
    <div className='card-grid'>
      {excuses.filter(excuse => uid || (!uid && excuse.uid === "")).map(excuse => (
        <ImgMediaCard key={excuse.id} id={excuse.id} name={excuse.name} description={excuse.description} response={excuse.response} socraticResponse={excuse.socraticResponse} />
      ))}
    </div>
  )
}