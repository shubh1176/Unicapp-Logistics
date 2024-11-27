"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { organizationNameState } from '@/recoil/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

function Page() {
  const [organizationName, setOrganizationName] = useRecoilState(organizationNameState);
  const [inputValue, setInputValue] = useState(organizationName);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleContinue = () => {
    if (inputValue.trim() === '') {
      setError('Organization name cannot be empty.');
      return;
    }

    setOrganizationName(inputValue);
    router.push('/dashboard/onboarding/business/type');
  };

  return (
    <div className="flex flex-col items-start justify-center h-screen  bg-[#F1EDEA] ">
      <div className="max-w-lg w-full ml-20">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-black font-filson">
            Can you tell us a bit about your organization?
          </h1>
        </div>
        <div className="mb-4">
          <label className="block text-lg text-black font-generalRegular">
            Name of your Organization
          </label>
          <Input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setError(''); // Clear error when the user starts typing
            }}
            placeholder="Name"
            className={`mt-2 p-3 border rounded-lg w-80 font-generalRegular ${
              error ? 'border-red-500' : 'border-gray-300'
            } focus:border-none focus:border-black`}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      </div>

      <div className="absolute bottom-[72px]  right-0  mr-0  ">
        <Image src={'/images/84.svg'} width={400} height={400} alt="Ribbon" />
      </div>

      <div className="w-full absolute bottom-4  ">
        <div className="w-full border-t border-black my-4"></div>
        <div className="flex justify-between items-center px-3">
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

export default Page;
