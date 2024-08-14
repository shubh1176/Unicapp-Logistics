"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { organizationTypeState } from '@/recoil/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

function OrganizationTypePage() {
  const [organizationType, setOrganizationType] = useRecoilState(organizationTypeState);
  const [inputValue, setInputValue] = useState(organizationType);
  const router = useRouter();

  const handleContinue = () => {
    setOrganizationType(inputValue);
    router.push('/dashboard/onboarding/business/address');
  };

  return (
    <div className="flex flex-col items-start justify-start min-h-screen mt-52 bg-white px-4">
      <div className="max-w-lg w-full ml-20">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-black font-filson">
            What type of organization do you run?
          </h1>
        </div>
        <div className="mb-4">
          <label className="block text-lg text-black font-generalRegular">
            Organization Type
          </label>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Short Description"
            className="mt-2 p-3 border border-gray-300 rounded-lg focus:border-none focus:border-black w-80 font-generalRegular"
          />
        </div>
      </div>

      <div className="absolute bottom-0 right-0 mb-8 mr-8 -translate-y-14 translate-x-10">
        <Image src={'/images/84.svg'} width={400} height={400} alt="Ribbon" />
      </div>
      
      <div className="w-full translate-y-72">
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

export default OrganizationTypePage;
