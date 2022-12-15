import './ExcuseList.css'

export default function ExcuseList({ excuses }) {

  if (excuses.length === 0) {
    return <div className="error">No excuses to load...</div>
  }

  return (
    <div className='excuse-list'>
      {excuses.map(excuse => (
        <div key={excuse.id} className="card">
          {excuse.name === "#nature-tho" ? <img alt="Paul Bashir and Frank Tufano" src={require('./../images/nature-tho.png')} /> : <h2>{excuse.name}</h2>}
          <p>{excuse.description}</p>
          <p>{excuse.response}</p>
          <p>{excuse.socraticResponse}</p>
        </div>
      ))}
    </div>
  )
}
