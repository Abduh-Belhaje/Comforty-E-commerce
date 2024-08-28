// import React from 'react'
// import UserInformation from './components/UserInformation'

// function UserProfile() {




//   return (
//     <div>
//         {/* user information */}
//         <UserInformation/>
//         {/* commande information */}
//         {/* lists */}
//     </div>
//   )
// }

// export default UserProfile

import React from 'react';
import { useAuth } from './AuthContext';

function UserProfile() {
  const { user, signOut } = useAuth();

  if (!user) {
    return <div>Please sign in</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.firstName} {user.lastName}</h1>
      <p>Email: {user.email}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}

export default UserProfile;
