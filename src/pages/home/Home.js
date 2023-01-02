import { useCollection } from '../../hooks/useCollection';

import ExcuseList from '../../components/ExcuseList';

import './Home.css';

export default function Home({ uid }) {

  const { isPending, error, documents } = useCollection(
    'excuses',
    ["uid", "==", uid]
  )

  return (
    <div className='home'>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {documents && <ExcuseList excuses={documents} />}
    </div>
  )
}
