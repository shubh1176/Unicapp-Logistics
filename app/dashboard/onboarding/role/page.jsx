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
    <div className="flex flex-col items-center justify-center h-screen px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="-translate-y-20 w-full max-w-md">
        <div className="flex flex-col items-center justify-center h-full">
          <Image src="/images/blackonwhitelogo.svg" alt="Logo" width={300} height={30} className="translate-y-3 hover:cursor-pointer" onClick={() =>{router.push('/')}}/>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-generalMedium mb-4 -translate-y-3 text-center">How can we define you better?</h2>
          <p className="text-black mb-6 font-generalRegular w-full text-center text-base sm:text-lg md:text-xl -translate-y-3">We'll fit your experience to your needs. Don't worry, you can change it later.</p>
          <div className="flex flex-col sm:flex-row mb-6 gap-4 w-full justify-center">
            <button
              onClick={() => setSelectedRole('Individual')}
              className={`w-full sm:w-72 h-44 border rounded-xl flex flex-col items-center justify-center gap-4 ${selectedRole === 'Individual' ? 'bg-[#0094B2] bg-opacity-10 border-[#0094B2]' : 'bg-white'}`}
            >
              <Image src="/images/Customer.svg" alt="Individual" width={60} height={60} />
              <span className='text-lg'>Individual</span>
            </button>
            <button
              onClick={() => setSelectedRole('Business')}
              className={`w-full sm:w-72 h-44 border rounded-xl flex flex-col items-center justify-center gap-4 ${selectedRole === 'Business' ? 'bg-[#0094B2] bg-opacity-10 border-[#0094B2]' : 'bg-white'}`}
            >
              <Image src="/images/office.svg" alt="Business" width={60} height={60} />
              <span className='text-lg'>Business</span>
            </button>
          </div>
          <button
            onClick={handleSelect}
            className="w-full px-1 py-3 bg-[#FDDA04] text-black rounded-xl hover:bg-[#FDDA04] sm:mx-24"
          >
            Unicapp it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionPage;
