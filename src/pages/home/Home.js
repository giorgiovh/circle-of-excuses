import { useState, useEffect } from 'react';
import { useCollection } from '../../hooks/useCollection';
import ExcuseList from '../../components/ExcuseList';

import './Home.css';

export default function Home({ uid }) {
  const [publicExcuses, setPublicExcuses] = useState([]);
  const [userExcuses, setUserExcuses] = useState([]);

  const { isPending: isPublicPending, error: publicError, documents: publicDocuments } = useCollection("preset_excuses");
  const { isPending: isUserPending, error: userError, documents: userDocuments } = useCollection(
    'excuses',
    // if a user is logged in, query the pre-set excuses and the user-created excuses. Else, just query the pre-set excuses
    uid ? ["uid", "==", uid] : null,
    ["createdAt", "desc"]
  )

  useEffect(() => {
    if (!publicError && !userError && publicDocuments && userDocuments) {
        setPublicExcuses(publicDocuments);
        setUserExcuses(userDocuments);
    }
  }, [publicDocuments, userDocuments, publicError, userError]);
  
  let allExcuses = []
  if (!uid && publicExcuses) {
    allExcuses = publicExcuses
  } else if (uid && publicExcuses && userExcuses) {
    allExcuses = [...publicExcuses, ...userExcuses]
  }
  // allExcuses = publicExcuses && userExcuses ? [...publicExcuses, ...userExcuses] : [];

  return (
    <div className='home'>
      {(isPublicPending || isUserPending) && <div>Loading...</div>}
      {userError && <div>{userError}</div>}
      {!uid && <p>Sign up or log in to create your own excuses and build your personal collection</p>}
      {allExcuses.length > 0 && <ExcuseList uid={uid} excuses={allExcuses} />}
    </div>
  )
}
