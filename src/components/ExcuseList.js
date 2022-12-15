import Excuse from './Excuse'

import './ExcuseList.css'

export default function ExcuseList({ excuses }) {

  if (excuses.length === 0) {
    return <div className="error">No excuses to load...</div>
  }

  return (
    <div className='excuse-list'>
      {excuses.map(excuse => (
        <Excuse name={excuse.name} description={excuse.description} response={excuse.response} socraticResponse={excuse.socraticResponse}/>
      ))}
    </div>
  )
}
