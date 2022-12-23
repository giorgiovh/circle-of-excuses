import { addHashtagAndTho, addUnderscores } from '../utils/utils';

export default function ExcuseDetails({ name, description, response, socraticResponse }) {
  return (
    <div>
      <h2>{addHashtagAndTho(name)}</h2>
      <p><strong>Excuse: </strong>{description}</p>
      <p><strong>Response: </strong>{response}</p>
      <p><strong>Socratic Response: </strong>{socraticResponse}</p>
    </div>
  )
}