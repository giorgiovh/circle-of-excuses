import { addHashtagAndTho, addUnderscores } from '../utils/utils';

export default function ExcuseDetails({ name, description, response, socraticResponse }) {
  return (
    <div>
      <h2>{addHashtagAndTho(name)}</h2>
      <p>{description}</p>
      <p>{response}</p>
      <p>{socraticResponse}</p>
    </div>
  )
}