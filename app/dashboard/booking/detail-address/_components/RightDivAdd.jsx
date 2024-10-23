"use client";
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  detailedPickupAddressState,
  detailedDropOffAddressState,
  stopsState,
  detailedStopsAddressState,
} from '@/recoil/store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

function RightDivAdd() {
  const [detailedPickupAddress, setDetailedPickupAddress] = useRecoilState(detailedPickupAddressState);
  const [detailedDropOffAddress, setDetailedDropOffAddress] = useRecoilState(detailedDropOffAddressState);
  const [stops] = useRecoilState(stopsState);
  const [detailedStopsAddress, setDetailedStopsAddress] = useRecoilState(detailedStopsAddressState);

  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validateFields = () => {
    const newErrors = {};

    if (!detailedPickupAddress.houseNo) {
      newErrors.pickupHouseNo = 'House number for Pickup is required';
    }

    if (!detailedDropOffAddress.houseNo) {
      newErrors.dropOffHouseNo = 'House number for Drop-off is required';
    }

    stops.forEach((_, index) => {
      if (!detailedStopsAddress[index]?.houseNo) {
        newErrors[`stopHouseNo-${index}`] = `House number for Stop ${index + 1} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStopDetailsChange = (index, field, value) => {
    const updatedStopsDetails = [...detailedStopsAddress];
    
    if (!updatedStopsDetails[index]) {
      updatedStopsDetails[index] = { houseNo: '', floor: '', landmark: '' };
    }
    
    updatedStopsDetails[index] = {
      ...updatedStopsDetails[index],
      [field]: value,
    };
    
    setDetailedStopsAddress(updatedStopsDetails);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [`stopHouseNo-${index}`]: '',
    }));
  };
  
  const handleContinue = () => {
    if (validateFields()) {
      router.push('/dashboard/booking/date-time');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-6 sm:px-8 lg:px-10 lg:py-6 w-full max-w-md mx-auto bg-white rounded-3xl  lg:rounded-xl shadow-lg">
      <div className="w-full hidden lg:block">
        <h2 className="text-sm md:text-base font-generalMedium text-[#8B14CC] text-start sm:text-start">STEP 2/6</h2>
        <div className="flex mt-2 mb-4 justify-center sm:justify-start">
          <div className="w-10 h-1 bg-[#8B14CC] rounded mx-1"></div>
          <div className="w-10 h-1 bg-[#8B14CC] rounded mx-1"></div>
          <div className="w-10 h-1 bg-gray-300 rounded mx-1"></div>
          <div className="w-10 h-1 bg-gray-300 rounded mx-1"></div>
          <div className="w-10 h-1 bg-gray-300 rounded mx-1"></div>
          <div className="w-10 h-1 bg-gray-300 rounded mx-1"></div>
        </div>
        <h1 className="text-2xl font-bold text-center sm:text-left">Add more address details</h1>
        <p className="mt-1 text-lg font-generalRegular text-center sm:text-left">Enter house number, floor, etc.</p>
      </div>

      <div className="w-full lg:mt-4 space-y-4">
        <div className='mb-6 lg:mb-0'>
          <label className="block mb-3 md:mb-1 font-generalRegular font-bold text-xl md:text-base md:font-normal">Pickup details</label>
          <Input
            placeholder="House no."
            className="mb-2 w-full h-10 rounded-xl"
            value={detailedPickupAddress.houseNo}
            onChange={(e) => {
              setDetailedPickupAddress({ ...detailedPickupAddress, houseNo: e.target.value });
              setErrors((prevErrors) => ({ ...prevErrors, pickupHouseNo: '' }));
            }}
          />
          {errors.pickupHouseNo && <p className="text-red-500 text-sm">{errors.pickupHouseNo}</p>}
          <Input
            placeholder="Floor"
            className="mb-2 w-full h-10 rounded-xl"
            value={detailedPickupAddress.floor}
            onChange={(e) => setDetailedPickupAddress({ ...detailedPickupAddress, floor: e.target.value })}
          />
          <Input
            placeholder="Nearby landmark (optional)"
            className="w-full h-10 rounded-xl"
            value={detailedPickupAddress.landmark}
            onChange={(e) => setDetailedPickupAddress({ ...detailedPickupAddress, landmark: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-3 md:mb-1 font-generalRegular font-bold text-xl md:text-base md:font-normal">Drop-off details</label>
          <Input
            placeholder="House no."
            className="mb-2 w-full h-10 rounded-xl"
            value={detailedDropOffAddress.houseNo}
            onChange={(e) => {
              setDetailedDropOffAddress({ ...detailedDropOffAddress, houseNo: e.target.value });
              setErrors((prevErrors) => ({ ...prevErrors, dropOffHouseNo: '' }));
            }}
          />
          {errors.dropOffHouseNo && <p className="text-red-500 text-sm">{errors.dropOffHouseNo}</p>}
          <Input
            placeholder="Floor"
            className="mb-2 w-full h-10 rounded-xl"
            value={detailedDropOffAddress.floor}
            onChange={(e) => setDetailedDropOffAddress({ ...detailedDropOffAddress, floor: e.target.value })}
          />
          <Input
            placeholder="Nearby landmark (optional)"
            className="w-full h-10 rounded-xl"
            value={detailedDropOffAddress.landmark}
            onChange={(e) => setDetailedDropOffAddress({ ...detailedDropOffAddress, landmark: e.target.value })}
          />
        </div>

        {stops.map((_, index) => (
          <div key={index}>
            <label className="block mb-1 font-generalRegular">{`Delivery Point ${index + 1} details`}</label>
            <Input
              placeholder="House no."
              className="mb-2 w-full h-10 rounded-xl"
              value={detailedStopsAddress[index]?.houseNo || ''}
              onChange={(e) => handleStopDetailsChange(index, 'houseNo', e.target.value)}
            />
            {errors[`stopHouseNo-${index}`] && <p className="text-red-500 text-sm">{errors[`stopHouseNo-${index}`]}</p>}
            <Input
              placeholder="Floor"
              className="mb-2 w-full h-10 rounded-xl"
              value={detailedStopsAddress[index]?.floor || ''}
              onChange={(e) => handleStopDetailsChange(index, 'floor', e.target.value)}
            />
            <Input
              placeholder="Nearby landmark (optional)"
              className="w-full h-10 rounded-xl"
              value={detailedStopsAddress[index]?.landmark || ''}
              onChange={(e) => handleStopDetailsChange(index, 'landmark', e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-start mt-6 gap-3 w-full">
        <Button
          variant="outline"
          className="py-3 px-4 rounded-xl border border-gray-300 text-gray-600 w-16 sm:w-20"
          onClick={(e) => {
            e.preventDefault();
            router.push('/dashboard/booking/location');
          }}
        >
          <ChevronLeft size={20} />
        </Button>
        <Button
          className="py-3 px-6 rounded-xl w-full sm:w-2/3 bg-[#F3E545] hover:bg-bg-[#F3E530]  lg:bg-[#8B14CC] lg:text-white text-center lg:hover:bg-[#8D26CA] lg:hover:text-white text-black hover:text-black"
          onClick={(e) => {
            e.preventDefault();
            handleContinue();
          }}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

export default RightDivAdd;
