import './Excuse.css';

export default function Excuse( { name, description, response, socraticResponse } ) {
  return (
    <div className='excuse'>
      {name === "#nature-tho" ? <img alt="Paul Bashir and Frank Tufano" src={require('./../images/nature-tho.png')} /> : <h2>{name}</h2>}
      <p><strong>Excuse: </strong>{description}</p>
      <p><strong>Response: </strong>{response}</p>
      <p><strong>Socratic Response: </strong>{socraticResponse}</p>
    </div>
  )
}
