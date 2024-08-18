"use client";
import React, { useState, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import { organizationNameState, organizationTypeState, organizationAddressState } from '@/recoil/store';
import { useUser } from '@clerk/clerk-react';
import { db } from '@/utils/db';
import * as schema from '@/utils/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import moment from 'moment';
import { eq } from 'drizzle-orm';
import Image from 'next/image';

function OrganizationAddressPage() {
  const organizationName = useRecoilValue(organizationNameState);
  const businessType = useRecoilValue(organizationTypeState);
  const setOrganizationAddress = useSetRecoilState(organizationAddressState);
  const [street, setStreet] = useState('');
  const [building, setBuilding] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    const checkExistingOrganization = async () => {
      try {
        const email = user.primaryEmailAddress.emailAddress;
        const existingOrganization = await db
          .select()
          .from(schema.OrganizationData)
          .where(eq(schema.OrganizationData.userEmail, email))
          .then(result => result[0]);

        if (existingOrganization) {
          await db.update(schema.UserData)
            .set({ onboarded: true })
            .where(eq(schema.UserData.email, email))
            .execute();

          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Error checking existing organization:', error);
      }
    };

    checkExistingOrganization();
  }, [user, router]);

  const generateOrganizationId = () => {
    return `#org${Math.floor(Math.random() * 1000000)}`; // Generates a random number in the format #orgXXXXXX
  };

  const handleContinue = async () => {
    if (!street || !building || !city || !state || !pincode) {
      setError('Please fill out all fields before continuing.');
      return;
    }

    const fullAddress = `${street}, ${building}, ${city}, ${state}, ${pincode}`;
    setOrganizationAddress(fullAddress);

    const organizationId = generateOrganizationId();
    const email = user.primaryEmailAddress.emailAddress;

    try {
      await db.insert(schema.OrganizationData).values({
        organization_id: organizationId,
        organizationName: organizationName,
        businessType: businessType,
        organizationAddress: fullAddress,
        dateOfJoining: moment().format('YYYY-MM-DD'),
        userEmail: email,
      }).execute();

      await db.update(schema.UserData)
        .set({ onboarded: true })
        .where(eq(schema.UserData.email, email))
        .execute();

      router.push('/dashboard');
    } catch (error) {
      console.error('Error updating organization data:', error);
      setError('An error occurred while saving your organization details. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-start justify-center min-h-screen bg-[#F1EDEA] px-4">
      <div className='max-w-lg w-full ml-20'>
        <div className="mb-6">
          <span className="text-5xl font-filson">
            Can you tell us a bit about< br /> your organization?
          </span>
        </div>
        <div className="w-full max-w-lg">
          <div className="mb-4">
            <span className="text-lg font-generalMedium">Organization Address</span>
          </div>
          <div className="grid grid-col-2 gap-4 mb-4 w-96">
            <Input
              value={street}
              onChange={(e) => {
                setStreet(e.target.value);
                setError('');
              }}
              placeholder="Street Address"
              className={`col-span-2 rounded-lg focus:border-none font-generalLight ${error && !street ? 'border-red-500' : ''}`}
            />
            <Input
              value={building}
              onChange={(e) => {
                setBuilding(e.target.value);
                setError('');
              }}
              placeholder="Office, Building, Apartment"
              className={`col-span-2 rounded-lg focus:border-none font-generalLight ${error && !building ? 'border-red-500' : ''}`}
            />
            <Input
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                setError('');
              }}
              placeholder="City"
              className={`rounded-lg focus:border-none font-generalLight ${error && !city ? 'border-red-500' : ''}`}
            />
            <Input
              value={state}
              onChange={(e) => {
                setState(e.target.value);
                setError('');
              }}
              placeholder="State"
              className={`rounded-lg focus:border-none font-generalLight ${error && !state ? 'border-red-500' : ''}`}
            />
            <Input
              value={pincode}
              onChange={(e) => {
                setPincode(e.target.value);
                setError('');
              }}
              placeholder="Pincode"
              className={`col-span-2 rounded-lg focus:border-none font-generalLight ${error && !pincode ? 'border-red-500' : ''}`}
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      </div>
      <div className="absolute bottom-0 right-0 mr-8 -translate-y-10 mb-12 translate-x-10 ">
        <Image src={'/images/84.svg'} width={400} height={410} alt="Ribbon" />
      </div>
      
      <div className="w-full mt-8 translate-y-28 mb-10">
        <div className="w-full border-t border-black my-4"></div>
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            className="text-black border border-gray-300 rounded-lg px-6 py-2 hover:bg-gray-100"
            onClick={() => router.back()}
          >
            Back
          </Button>
          <Button
            className="bg-yellow-400 text-black rounded-lg px-6 py-2 hover:bg-yellow-500"
            onClick={handleContinue}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

export default OrganizationAddressPage;
