import { useCollection } from '../../hooks/useCollection';
import ExcuseList from '../../components/ExcuseList';

import './Home.css';

export default function Home({ uid }) {

  const { isPending, error, documents } = useCollection(
    'excuses',
    // if a user is logged in, query the pre-set excuses and the user-created excuses. Else, just query the pre-set excuses
    uid ? ["uid", "in", ["", uid]] : ["uid", "==", ""],
    ["createdAt", "desc"]
  )

  return (
    <div className='home'>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!uid && <p>Sign up or log in to create your own excuses and build your personal collection</p>}
      {documents && <ExcuseList uid={uid} excuses={documents} />}
    </div>
  )
}
