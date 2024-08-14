"use client";
import { UserButton, useUser } from '@clerk/clerk-react';
import Image from 'next/image';

const DashboardHeader = ({ userData, handleRoleSelect }) => {
  const { user } = useUser();

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow">
      <div>
  
      </div>
      <div className="flex items-center space-x-4">
        {userData && (
          <button
            onClick={() => handleRoleSelect(userData.role === 'Individual' ? 'Business' : 'Individual')}
            className="px-4 py-2 bg-[#470a68] font-filson text-white rounded-xl hover:bg-[#360954]"
          >
            Toggle Role
          </button>
        )}
        <div className="flex items-center space-x-4 border-2 rounded-xl p-4">
          <UserButton />
          <div>
            <p className="text-lg font-semibold">{user?.fullName || 'Guest'}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
