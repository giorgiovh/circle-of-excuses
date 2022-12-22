import { useFetch } from '../../hooks/useFetch';

import Excuse from '../../components/Excuse'

import './Home.css';

export default function Home() {
  const { data: excuses, isPending, error } = useFetch('http://localhost:3000/excuses')

  return (
    <div className='home'>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {excuses && excuses.map(
        excuse => (
          <Excuse name={excuse.name} description={excuse.description} response={excuse.response} socraticResponse={excuse.socraticResponse}/>
        )
      )}
    </div>
  )
}
