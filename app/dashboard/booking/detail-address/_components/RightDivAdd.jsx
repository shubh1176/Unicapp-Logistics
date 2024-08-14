"use client";
import React from 'react';
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

  const router = useRouter();

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
  };
  

  const handleContinue = () => {

    // Ensure each stop has at least the house number filled
    for (let i = 0; i < stops.length; i++) {
      if (!detailedStopsAddress[i]?.houseNo) {
        toast.error(`Please fill out the house number for Stop ${i + 1}.`);
        return;
      }
    }

    router.push('/dashboard/booking/date-time');
  };

  return (
    <div className="flex flex-col justify-center items-start h-full p-10 translate-x-20">
      <div className="mb-5 w-full">
        <h2 className="text-base font-generalMedium text-[#8B14CC] translate-x-0.5">STEP 2/6</h2>
        <div className="flex mt-4 mb-9 -translate-x-1.5">
          <div className="w-14 h-1 bg-[#8B14CC] rounded mx-2"></div>
          <div className="w-14 h-1 bg-[#8B14CC] rounded mx-2"></div>
          <div className="w-14 h-1 bg-gray-300 rounded mx-2"></div>
          <div className="w-14 h-1 bg-gray-300 rounded mx-2"></div>
          <div className="w-14 h-1 bg-gray-300 rounded mx-2"></div>
          <div className="w-14 h-1 bg-gray-300 rounded mx-2"></div>
        </div>
        <h1 className="text-3xl font-bold font-filson">Add more address details</h1>
        <p className="mt-2 text-lg font-generalRegular">Enter house number, floor, etc.</p>
      </div>

      <div className="w-full mt-4">
        <div className="mb-7">
          <label className="block mb-2 font-generalRegular">Pickup details</label>
          <Input
            placeholder="House no."
            className="mb-3 w-96 h-12 rounded-xl"
            value={detailedPickupAddress.houseNo}
            onChange={(e) => setDetailedPickupAddress({ ...detailedPickupAddress, houseNo: e.target.value })}
          />
          <Input
            placeholder="Floor"
            className="mb-3 w-96 h-12 rounded-xl"
            value={detailedPickupAddress.floor}
            onChange={(e) => setDetailedPickupAddress({ ...detailedPickupAddress, floor: e.target.value })}
          />
          <Input
            placeholder="Nearby landmark (optional)"
            className="w-96 h-12 rounded-xl"
            value={detailedPickupAddress.landmark}
            onChange={(e) => setDetailedPickupAddress({ ...detailedPickupAddress, landmark: e.target.value })}
          />
        </div>

        {stops.map((stop, index) => (
          <div className="mb-7" key={index}>
            <label className="block mb-2 font-generalRegular">{`Delivery Point ${index + 1} details`}</label>
            <Input
              placeholder="House no."
              className="mb-3 w-96 h-12 rounded-xl"
              value={detailedStopsAddress[index]?.houseNo || ''}
              onChange={(e) => handleStopDetailsChange(index, 'houseNo', e.target.value)}
            />
            <Input
              placeholder="Floor"
              className="mb-3 w-96 h-12 rounded-xl"
              value={detailedStopsAddress[index]?.floor || ''}
              onChange={(e) => handleStopDetailsChange(index, 'floor', e.target.value)}
            />
            <Input
              placeholder="Nearby landmark (optional)"
              className="w-96 h-12 rounded-xl"
              value={detailedStopsAddress[index]?.landmark || ''}
              onChange={(e) => handleStopDetailsChange(index, 'landmark', e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="mb-7">
          <label className="block mb-2 font-generalRegular">Drop-off details</label>
          <Input
            placeholder="House no."
            className="mb-3 w-96 h-12 rounded-xl"
            value={detailedDropOffAddress.houseNo}
            onChange={(e) => setDetailedDropOffAddress({ ...detailedDropOffAddress, houseNo: e.target.value })}
          />
          <Input
            placeholder="Floor"
            className="mb-3 w-96 h-12 rounded-xl"
            value={detailedDropOffAddress.floor}
            onChange={(e) => setDetailedDropOffAddress({ ...detailedDropOffAddress, floor: e.target.value })}
          />
          <Input
            placeholder="Nearby landmark (optional)"
            className="w-96 h-12 rounded-xl"
            value={detailedDropOffAddress.landmark}
            onChange={(e) => setDetailedDropOffAddress({ ...detailedDropOffAddress, landmark: e.target.value })}
          />
        </div>

      <div className="flex justify-start mt-10 gap-3">
        <Button
          variant="outline"
          className="py-6 px-4 rounded-xl border border-gray-300 text-gray-600"
          onClick={(e) => {
            e.preventDefault();
            router.push('/dashboard/booking/location');
          }}
        >
          <span className="text-2xl rounded-2xl"><ChevronLeft size={20} /></span>
        </Button>
        <Button
          className="py-6 px-10 w-80 rounded-xl bg-[#8B14CC] text-white text-center hover:bg-[#8D26CA] hover:text-white"
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
