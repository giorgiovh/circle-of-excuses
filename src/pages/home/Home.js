import { useFetch } from '../../hooks/useFetch';

import Excuse from '../../components/Excuse'
import ExcuseList from '../../components/ExcuseList';

import './Home.css';

export default function Home() {
  const { data: excuses, isPending, error } = useFetch('http://localhost:3000/excuses')

  return (
    <div className='home'>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {excuses && <ExcuseList excuses={excuses} />}
    </div>
  )
}
