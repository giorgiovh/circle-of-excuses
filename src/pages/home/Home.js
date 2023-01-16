import { useState, useEffect } from 'react';
import { useCollection } from '../../hooks/useCollection';
import ExcuseList from '../../components/ExcuseList';
import WrapperForUseCollectionUser from '../../hooks/WrapperForUseCollectionUser';

import './Home.css';

export default function Home({ uid }) {
  const [presetExcuses, setPresetExcuses] = useState([]);
  const [userExcuses, setUserExcuses] = useState([]);
  const [userError, setUserError] = useState(null);
  const [isUserPending, setIsUserPending] = useState(false);

  // fetch preset excuses
  const { isPending: isPresetPending, error: presetError, documents: presetDocuments } = useCollection(
    "preset_excuses",
    null,
    ["createdAt", "desc"]
  )

  useEffect(() => {
    if (!presetError && presetDocuments) {
        setPresetExcuses(presetDocuments);
    }
  }, [presetDocuments, presetError]);
  
  let excusesToDisplay = []
  if (!uid && presetExcuses) {
    excusesToDisplay = presetExcuses
  } else if (uid && presetExcuses && userExcuses) {
    excusesToDisplay = [...presetExcuses, ...userExcuses]
  }
  console.log('presetExcuses', presetExcuses);
  console.log('userExcuses', userExcuses);
  console.log('excusesToDisplay', excusesToDisplay);

  return (
    <div className='home'>
      {/* fetch the user-created excuses: The below "wrapper" component is used to conditionally call the useCollection('excuses') hook only when there is a user logged in. React doesn't allow conditionally calling a hook so this is the workaround*/}
      {uid && <WrapperForUseCollectionUser uid={uid} setUserExcuses={setUserExcuses} setUserError={setUserError} setIsUserPending={setIsUserPending}/>}
      
      {(isPresetPending || isUserPending) && <div>Loading...</div>}
      {userError && <div>{userError}</div>}
      {!uid && <p>Sign up or log in to create your own excuses and build your personal collection</p>}
      {excusesToDisplay.length > 0 && <ExcuseList uid={uid} excuses={excusesToDisplay} />}
    </div>
  )
}
