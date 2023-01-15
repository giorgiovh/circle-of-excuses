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
  const { isPending: isPresetPending, error: presetError, documents: presetDocuments } = useCollection("preset_excuses");

  // fetch user excuses
  // TODO: Figure out how to only call useCollection('excuses') if a user is logged in (ie. if there is a uid). Otherwise, I get an error saying "Missing or insufficient permissions."
  // const { isPending: isUserPending, error: userError, documents: userDocuments } = useCollection(
  //   'excuses',
  //   uid ? ["uid", "==", uid] : null,
  //   ["createdAt", "desc"]
  // )

  useEffect(() => {
    if (!presetError && presetDocuments) {
        setPresetExcuses(presetDocuments);
    }
  }, [presetDocuments, presetError]);

  // useEffect(() => {
  //   if (!userError && userDocuments) {
  //       setUserExcuses(userDocuments);
  //   }
  // }, [userDocuments, userError]);
  
  let excusesToDisplay = []
  if (!uid && presetExcuses) {
    excusesToDisplay = presetExcuses
  } else if (uid && presetExcuses && userExcuses) {
    excusesToDisplay = [...presetExcuses, ...userExcuses]
  }

  console.log('isPresetPending', isPresetPending);
  console.log('isUserPending', isUserPending);
  return (
    <div className='home'>
      {(isPresetPending || isUserPending) && <div>Loading...</div>}
      {userError && <div>{userError}</div>}
      {!uid && <p>Sign up or log in to create your own excuses and build your personal collection</p>}
      {/* The below wrapper component is used to conditionally use the useCollection('excuses') hook only when there is a user logged in. React doesn't allow using a hook conditionally so this is the workaround*/}
      {uid && <WrapperForUseCollectionUser uid={uid} setUserExcuses={setUserExcuses} setUserError={setUserError} setIsUserPending={setIsUserPending}/>}
      {excusesToDisplay.length > 0 && <ExcuseList uid={uid} excuses={excusesToDisplay} />}
    </div>
  )
}
