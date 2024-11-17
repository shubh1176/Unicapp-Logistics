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
    <div className="p-6 max-w-sm md:max-w-md mx-auto lg:m-5 lg:p-0 lg:max-w-[20rem]  bg-white rounded-3xl md:rounded-xl shadow-lg lg:shadow-none lg:rounded-none lg:bg-[#F8F8F880]">
      <div className='mb-5 w-full hidden lg:block'>
        <h2 className="text-sm font-generalMedium text-[#8B14CC]">STEP 4/6</h2>
        <div className="flex mt-3 mb-7">
          <div className="w-12 h-1 bg-[#8B14CC] rounded mx-1"></div>
          <div className="w-12 h-1 bg-[#8B14CC] rounded mx-1"></div>
          <div className="w-12 h-1 bg-[#8B14CC] rounded mx-1"></div>
          <div className="w-12 h-1 bg-[#8B14CC] rounded mx-1"></div>
          <div className="w-12 h-1 bg-gray-300 rounded mx-1"></div>
          <div className="w-12 h-1 bg-gray-300 rounded mx-1"></div>
        </div>
      </div>
      <div className="mb-5">
        <h2 className=" font-medium text-2xl md:font-bold">What are you sending?</h2>
        <p className="text-sm">Add description of your item(s).</p>
      </div>
      <div className="flex flex-col mt-4">
        <p className="mb-2 text-sm">Weight of the item (Approx.)</p>
        <Input 
        
          className="pl-4 w-full lg:w-40 border-2 border-black border-opacity-25 h-10 lg:h-8 rounded-lg focus:outline-none focus:border-[#0094B2] lg:text-xs" 
          placeholder="kgs" 
          value={weight} 
          onChange={(e) => {
            setWeight(e.target.value);
            setErrors((prevErrors) => ({ ...prevErrors, weight: '' }));
          }} 
        />
        {errors.weight && <p className="text-red-500 text-xs">{errors.weight}</p>}
      </div>
      {orderType === 'Courier' && (
        <div className="mt-5 flex flex-col">
          <p className="mb-3 text-sm">Dimensions (cm)</p>
          <div className="flex space-x-4">
            <Input
              className="w-24 sm:w-28 lg:h-8 lg:text-xs focus:outline-none focus:ring-0"
              placeholder="Length"
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
                setErrors((prevErrors) => ({ ...prevErrors, length: '' }));
              }}
            />
            <Input
              className="w-24 sm:w-28 lg:h-8 lg:text-xs focus:outline-none focus:ring-0"
              placeholder="Width"
              value={width}
              onChange={(e) => {
                setWidth(e.target.value);
                setErrors((prevErrors) => ({ ...prevErrors, width: '' }));
              }}
            />
            <Input
              className="w-24 sm:w-28 lg:h-8 lg:text-xs focus:outline-none focus:ring-0"
              placeholder="Height"
              value={height}
              onChange={(e) => {
                setHeight(e.target.value);
                setErrors((prevErrors) => ({ ...prevErrors, height: '' }));
              }}
            />
          </div>
          {errors.length && <p className="text-red-500 text-sm">{errors.length}</p>}
          {errors.width && <p className="text-red-500 text-sm">{errors.width}</p>}
          {errors.height && <p className="text-red-500 text-sm">{errors.height}</p>}
        </div>
      )}
      <div className=" mt-4 md:mt-6">
        <p className="text-sm">Which size best describes your item the best?</p>
        <div className="flex flex-wrap mt-3">
          {['Small', 'Medium', 'Large', 'X-Large', 'Huge'].map((size) => (
            <div
              key={size}
              className={`flex items-center py-2 px-3 nr-1 lg:mr-0 mb-2 lg:mb-0 ${itemDescription === size ? 'text-purple-600' : 'text-gray-600'} hover:cursor-pointer`}
              onClick={() => {
                setItemDescription(size);
                setErrors((prevErrors) => ({ ...prevErrors, itemDescription: '' }));
              }}
            >
              <div className='flex flex-col gap-1 items-center'>
                <div className='flex items-center justify-center content-center rounded-md  w-5 h-5 md:w-6 md:h-6'>
                  <Image src={`/images/${size.toLowerCase()}.svg`} width={32} height={16} alt={size} />
                </div>
                <div className=" text-xs">{size}</div>
              </div>
            </div>
          ))}
        </div>
        {errors.itemDescription && <p className="text-red-500 text-sm">{errors.itemDescription}</p>}
      </div>
      <div className=" mt-3 md:mt-5">
        <p className="text-sm">Special instructions, if any</p>
        <Textarea
          className="pl-4 w-full lg:w-80 border-2 resize-none border-black border-opacity-25 lg:h-20  h-11 lg:text-xs rounded-lg mt-3 " 
          placeholder="Add your text here..." 
          value={specialInstructions} 
          onChange={(e) => setSpecialInstructions(e.target.value)}
        /> 
      </div>
      <div className='mt-8 flex justify-start gap-3'>
        <Button
          variant="outline"
          className='p-2 lg:p-0 px-4  rounded-lg border border-gray-300 text-gray-600 w-14 sm:w-16'
          onClick={() => router.push('/dashboard/booking/date-time')}
        >
          <ChevronLeft size={20} />
        </Button>
        <Button
          className='py-3 sm:py-4 px-4 w-full  rounded-lg bg-[#F3E545] hover:bg-[#F3E530] text-black lg:bg-[#8B14CC] lg:text-white text-center lg:hover:bg-[#8D26CA] lg:hover:text-white'
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

export default RightDiv3;
