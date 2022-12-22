import { useParams } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'

import ExcuseDetails from '../../components/ExcuseDetails';

export default function Excuse() {
  const { id } = useParams()
  const url = 'http://localhost:3000/excuses/' + id
  const { error, isPending, data: excuse } = useFetch(url)

  return (
    <div>
      {error && <p>{error}</p>}
      {isPending && <p>Loading...</p>}
      {excuse && <ExcuseDetails name={excuse.name} description={excuse.description} response={excuse.response} socraticResponse={excuse.socraticResponse}/>}
    </div>
  )
}
