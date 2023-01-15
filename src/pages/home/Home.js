import { useState, useEffect } from 'react';
import { useCollection } from '../../hooks/useCollection';
import ExcuseList from '../../components/ExcuseList';

import './Home.css';

export default function Home({ uid }) {
  const [presetExcuses, setPresetExcuses] = useState([]);
  const [userExcuses, setUserExcuses] = useState([]);

  // fetch preset excuses
  const { isPending: isPresetPending, error: presetError, documents: presetDocuments } = useCollection("preset_excuses");

  // fetch user excuses
  // TODO: Figure out how to only call useCollection('excuses') if a user is logged in (ie. if there is a uid). Otherwise, I get an error saying "Missing or insufficient permissions."
  const { isPending: isUserPending, error: userError, documents: userDocuments } = useCollection(
    'excuses',
    uid ? ["uid", "==", uid] : null,
    ["createdAt", "desc"]
  )

  useEffect(() => {
    if (!presetError && presetDocuments) {
        setPresetExcuses(presetDocuments);
    }
  }, [presetDocuments, presetError]);

  useEffect(() => {
    if (!userError && userDocuments) {
        setUserExcuses(userDocuments);
    }
  }, [userDocuments, userError]);
  
  let excusesToDisplay = []
  if (!uid && presetExcuses) {
    excusesToDisplay = presetExcuses
  } else if (uid && presetExcuses && userExcuses) {
    excusesToDisplay = [...presetExcuses, ...userExcuses]
  }

  return (
    <div className='home'>
      {(isPresetPending || isUserPending) && <div>Loading...</div>}
      {userError && <div>{userError}</div>}
      {!uid && <p>Sign up or log in to create your own excuses and build your personal collection</p>}
      {excusesToDisplay.length > 0 && <ExcuseList uid={uid} excuses={excusesToDisplay} />}
    </div>
  )
}
