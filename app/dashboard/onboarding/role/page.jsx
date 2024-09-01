"use client";
import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { roleState, onboardedState, verifiedState, phoneNumberState } from '@/recoil/store';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/clerk-react';
import Image from 'next/image';
import { db } from '@/utils/db';
import * as schema from '@/utils/schema';
import { eq } from 'drizzle-orm';
import moment from 'moment';

const RoleSelectionPage = () => {
  const { user } = useUser();
  const [role, setRole] = useRecoilState(roleState);
  const [onboarded, setOnboarded] = useRecoilState(onboardedState);
  const [verified, setVerified] = useRecoilState(verifiedState);
  const [phoneNumber, setPhoneNumber] = useRecoilState(phoneNumberState);
  const [selectedRole, setSelectedRole] = useState(role);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const email = user.primaryEmailAddress.emailAddress;
          const fetchedUser = await db
            .select()
            .from(schema.UserData)
            .where(eq(schema.UserData.email, email))
            .then(result => result[0]);

          if (fetchedUser) {
            setPhoneNumber(fetchedUser.phoneNumber);
            setVerified(fetchedUser.verified);
            setRole(fetchedUser.role); // Set the role from the database
            setOnboarded(fetchedUser.onboarded); // Set the onboarded state from the database
          } else {
            // User doesn't exist in the database, create a new user
            await db.insert(schema.UserData).values({
              email: email,
              phoneNumber: '', // Assuming phoneNumber will be added later
              createdAt: moment().format('YYYY-MM-DD'),
              role: selectedRole,
              onboarded: false,
              verified: false,
            }).execute();
          }
        } catch (error) {
          console.error('Error fetching or creating user data:', error);
        }
      }
    };

    fetchUserData();
  }, [user, setPhoneNumber, setVerified, setRole, selectedRole]);

  const handleSelect = async () => {
    try {
      // Update the role in the database
      const email = user.primaryEmailAddress.emailAddress;
      await db.update(schema.UserData)
        .set({ role: selectedRole, onboarded: true })
        .where(eq(schema.UserData.email, email))
        .execute();

      // Update the role in the Recoil state
      setRole(selectedRole);
      setOnboarded(true);

      // Redirect based on the selected role
      if (selectedRole === 'Business') {
        router.push('/dashboard/onboarding/business/organisation'); // Redirect to the business role onboarding page
      } else if (!verified) {
        router.push('/dashboard/onboarding/number-verification'); // Redirect to number verification if not verified
      } else {
        router.push('/dashboard'); // Redirect to dashboard if verified
      }
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-2 sm:px-4 md:px-8 lg:px-16 translate-y-2">
      <div className="-translate-y-10 sm:-translate-y-20 w-full max-w-xs sm:max-w-md">
        <div className="flex flex-col items-center justify-center h-full">
          <Image src="/images/blackonwhitelogo.svg" alt="Logo" width={200} height={20} className="translate-y-2 sm:translate-y-3 hover:cursor-pointer" onClick={() =>{router.push('/')}}/>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-generalMedium mb-3 sm:mb-4 -translate-y-2 sm:-translate-y-3 text-center">How can we define you better?</h2>
          <p className="text-black mb-4 sm:mb-6 font-generalRegular w-full text-center text-sm sm:text-base md:text-lg -translate-y-2 sm:-translate-y-3">We'll fit your experience to your needs. Don't worry, you can change it later.</p>
          <div className="flex flex-row mb-4 sm:mb-6 gap-2 sm:gap-4 w-full justify-center">
            <button
              onClick={() => setSelectedRole('Individual')}
              className={`w-36 sm:w-72 h-32 sm:h-44 border rounded-xl flex flex-col items-center justify-center gap-2 sm:gap-4 ${selectedRole === 'Individual' ? 'bg-[#0094B2] bg-opacity-10 border-[#0094B2]' : 'bg-white'}`}
            >
              <Image src="/images/Customer.svg" alt="Individual" width={40} height={40} />
              <span className='text-sm sm:text-lg'>Individual</span>
            </button>
            <button
              onClick={() => setSelectedRole('Business')}
              className={`w-36 sm:w-72 h-32 sm:h-44 border rounded-xl flex flex-col items-center justify-center gap-2 sm:gap-4 ${selectedRole === 'Business' ? 'bg-[#0094B2] bg-opacity-10 border-[#0094B2]' : 'bg-white'}`}
            >
              <Image src="/images/office.svg" alt="Business" width={40} height={40} />
              <span className='text-sm sm:text-lg'>Business</span>
            </button>
          </div>
          <button
            onClick={handleSelect}
            className="w-full px-1 py-2 sm:py-3 bg-[#FDDA04] text-black rounded-xl hover:bg-[#FDDA04] sm:mx-24"
          >
            Unicapp it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionPage;
