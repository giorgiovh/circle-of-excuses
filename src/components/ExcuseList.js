import Excuse from './Excuse'

export default function ExcuseList({ excuses }) {

  if (excuses.length === 0) {
    return <div className="error">No excuses to load...</div>
  }

  return (
    <div>
      {excuses.map(excuse => (
        <Excuse key={excuse.id} id={excuse.id} name={excuse.name} description={excuse.description} response={excuse.response} socraticResponse={excuse.socraticResponse}/>
      ))}
    </div>
  )
}
