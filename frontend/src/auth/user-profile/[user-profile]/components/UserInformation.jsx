import { useUser } from '@clerk/clerk-react';
import { Settings } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

function UserInformation() {
  const { user } = useUser();

  if (!user) {
    return <p>Loading...</p>; // Handle case where user data is not yet available
  }

  return (
    <div>
      <div className='flex items-center justify-around space-x-4'>
        <div>
        <img 
                  className="w-20 h-20 rounded-full" 

          src={user.imageUrl || 'https://via.placeholder.com/100'} // Use profileImageUrl or a placeholder if not available
          alt={user.fullName || 'User Profile'} 
        />

        <p>{user.fullName || 'User Name'}</p>
        </div>

        <div className='flex flex-col justify-end'>
            <Link to="/setting/userId">
            <Settings className='' />

            </Link>
          <p>{user.primaryEmailAddress?.emailAddress || 'user@example.com'}</p>
        </div>
      </div>
      <div>
        
      </div>
    </div>
  );
}

export default UserInformation;
