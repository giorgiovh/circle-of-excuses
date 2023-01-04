import { useCollection } from '../../hooks/useCollection';
import ExcuseList from '../../components/ExcuseList';

import './Home.css';

export default function Home({ uid }) {

  const { isPending, error, documents } = useCollection(
    'excuses',
    uid ? ["uid", "in", ["presetExcuseUID", uid]] : ["uid", "==", "presetExcuseUID"],
    ["createdAt", "desc"]
  )

  return (
    <div className='home'>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!uid && <p>Sign up or log in if you want to create your own excuses or tailor the pre-populated excuses to your own preference!</p>}
      {documents && <ExcuseList excuses={documents} />}
    </div>
  )
}
