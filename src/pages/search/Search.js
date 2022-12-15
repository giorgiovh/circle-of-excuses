import useFetch from '../../hooks/useFetch';
import { useLocation } from 'react-router-dom';

import ExcuseList from '../../components/ExcuseList'


export default function Search() {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get('q')

  const url = 'http://localhost:3000/excuses?q=' + query
  const { error, isPending, data } = useFetch(url)

  return (
    <div>
      <h2 className="page-title">Excuses including "{query}"</h2>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {data && <ExcuseList excuses={data}/>}
    </div>
  )
}
