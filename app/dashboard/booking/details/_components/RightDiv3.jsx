"use client";
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { weightState, itemDescriptionState, specialInstructionsState, lengthState, widthState, heightState, orderTypeState } from '@/recoil/store';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const RightDiv3 = () => {
  const router = useRouter();
  const [weight, setWeight] = useRecoilState(weightState);
  const [itemDescription, setItemDescription] = useRecoilState(itemDescriptionState);
  const [specialInstructions, setSpecialInstructions] = useRecoilState(specialInstructionsState);
  const [length, setLength] = useRecoilState(lengthState);
  const [width, setWidth] = useRecoilState(widthState);
  const [height, setHeight] = useRecoilState(heightState);
  const [orderType] = useRecoilState(orderTypeState);

  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};

    if (!weight) {
      newErrors.weight = 'Weight is required';
    }

    if (orderType === 'Courier') {
      if (!length) {
        newErrors.length = 'Length is required';
      }
      if (!width) {
        newErrors.width = 'Width is required';
      }
      if (!height) {
        newErrors.height = 'Height is required';
      }
    }

    if (!itemDescription) {
      newErrors.itemDescription = 'Item description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateFields()) {
      router.push('/dashboard/booking/verification');
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-3xl mx-auto">
      <div className='mb-5 w-full'>
        <h2 className="text-base font-generalMedium text-[#8B14CC]">STEP 4/6</h2>
        <div className="flex mt-4 mb-9">
          <div className="w-14 h-1 bg-[#8B14CC] rounded mx-1"></div>
          <div className="w-14 h-1 bg-[#8B14CC] rounded mx-1"></div>
          <div className="w-14 h-1 bg-[#8B14CC] rounded mx-1"></div>
          <div className="w-14 h-1 bg-[#8B14CC] rounded mx-1"></div>
          <div className="w-14 h-1 bg-gray-300 rounded mx-1"></div>
          <div className="w-14 h-1 bg-gray-300 rounded mx-1"></div>
        </div>
      </div>
      <div className="mb-5">
        <h2 className="text-2xl font-bold">What are you sending?</h2>
        <p>Add description of your item(s).</p>
      </div>
      <div className="flex flex-col mt-6">
        <p className="mb-3">Weight of the item (Approx.)</p>
        <Input 
          className="pl-5 w-full sm:w-40 border-2 border-black border-opacity-25 h-12 rounded-xl focus:border-0 focus:ring-0" 
          placeholder="kgs" 
          value={weight} 
          onChange={(e) => {
            setWeight(e.target.value);
            setErrors((prevErrors) => ({ ...prevErrors, weight: '' }));
          }} 
        />
        {errors.weight && <p className="text-red-500">{errors.weight}</p>}
      </div>
      {orderType === 'Courier' && (
        <div className="mt-5 flex flex-col">
          <p className="mb-3">Dimensions (cm)</p>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <Input
              className="w-full sm:w-20 focus:outline-none focus:ring-0"
              placeholder="Length"
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
                setErrors((prevErrors) => ({ ...prevErrors, length: '' }));
              }}
            />
            <Input
              className="w-full sm:w-20 focus:outline-none focus:ring-0"
              placeholder="Width"
              value={width}
              onChange={(e) => {
                setWidth(e.target.value);
                setErrors((prevErrors) => ({ ...prevErrors, width: '' }));
              }}
            />
            <Input
              className="w-full sm:w-20 focus:outline-none focus:ring-0"
              placeholder="Height"
              value={height}
              onChange={(e) => {
                setHeight(e.target.value);
                setErrors((prevErrors) => ({ ...prevErrors, height: '' }));
              }}
            />
          </div>
          {errors.length && <p className="text-red-500">{errors.length}</p>}
          {errors.width && <p className="text-red-500">{errors.width}</p>}
          {errors.height && <p className="text-red-500">{errors.height}</p>}
        </div>
      )}
      <div className="mt-7">
        <p>Which size best describes your item the best?</p>
        <div className="flex flex-wrap mt-3">
          {['Small', 'Medium', 'Large', 'X-Large', 'Huge'].map((size) => (
            <div
              key={size}
              className={`flex items-center py-2 px-4 mr-1 mb-3 ${itemDescription === size ? 'text-purple-600' : 'text-gray-600'} hover:cursor-pointer`}
              onClick={() => {
                setItemDescription(size);
                setErrors((prevErrors) => ({ ...prevErrors, itemDescription: '' }));
              }}
            >
              <div className='flex flex-col gap-1 items-center'>
                <div className='flex items-center justify-center content-center rounded-md w-8 h-8'>
                  <Image src={`/images/${size.toLowerCase()}.svg`} width={40} height={20} alt={size} />
                </div>
                <div>{size}</div>
              </div>
            </div>
          ))}
        </div>
        {errors.itemDescription && <p className="text-red-500">{errors.itemDescription}</p>}
      </div>
      <div className="mt-5">
        <p>Special instructions, if any</p>
        <Textarea
          className="pl-5 w-full sm:w-96 border-2 border-black border-opacity-25 h-28 rounded-xl mt-3 focus:border-0 focus:ring-0" 
          placeholder="Add your text here..." 
          value={specialInstructions} 
          onChange={(e) => setSpecialInstructions(e.target.value)}
        />
      </div>
      <div className='mt-10 flex justify-start gap-3'>
        <Button
          variant="outline"
          className='py-4 sm:py-6 px-4 sm:px-4 rounded-xl border border-gray-300 text-gray-600 w-20 sm:w-24'
          onClick={() => router.push('/dashboard/booking/date-time')}
        >
          <ChevronLeft size={20} />
        </Button>
        <Button
          className='py-4 sm:py-6 px-6 w-full sm:w-2/3 rounded-xl bg-[#8B14CC] text-white text-center hover:bg-[#8D26CA] hover:text-white'
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

export default RightDiv3;
