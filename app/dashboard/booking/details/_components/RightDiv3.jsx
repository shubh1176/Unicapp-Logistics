"use client";
import React from 'react';
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

  return (
    <div className="p-10 translate-x-20 translate-y-20">
      <div className='mb-5 w-full'>
          <h2 className="text-base font-generalMedium text-[#8B14CC] translate-x-0.5">STEP 4/6</h2>
          <div className="flex mt-4 mb-9 -translate-x-1.5">
            <div className="w-14 h-1 bg-[#8B14CC] rounded mx-2"></div>
            <div className="w-14 h-1 bg-[#8B14CC] rounded mx-2"></div>
            <div className="w-14 h-1 bg-[#8B14CC] rounded mx-2"></div>
            <div className="w-14 h-1 bg-[#8B14CC] rounded mx-2"></div>
            <div className="w-14 h-1 bg-gray-300 rounded mx-2"></div>
            <div className="w-14 h-1 bg-gray-300 rounded mx-2"></div>
          </div>
        </div>
      <div className="mb-5">
        <h2 className="text-2xl font-bold">What are you sending?</h2>
        <p>Add description of your item(s).</p>
      </div>
      <div className="flex flex-col mt-6">
        <p className="mb-3">Weight of the item (Approx.)</p>
        <Input 
          className="pl-5 w-40 border-2 border-black border-opacity-25 h-12 rounded-xl focus:border-0 focus:ring-0" 
          placeholder="kgs" 
          value={weight} 
          onChange={(e) => setWeight(e.target.value)} 
        />
      </div>
      {orderType === 'Courier' && (
        <div className="mt-5 flex flex-col">
          <p className="mb-3">Dimensions (cm)</p>
          <div className="flex space-x-4">
            <Input
              className="w-20 focus:outline-none focus:ring-0"
              placeholder="Length"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <Input
              className="w-20 focus:outline-none focus:ring-0"
              placeholder="Width"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
            />
            <Input
              className="w-20 focus:outline-none focus:ring-0"
              placeholder="Height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
        </div>
      )}
      <div className="mt-7">
        <p>Which size best describes your item the best?</p>
        <div className="flex flex-wrap mt-3 -translate-x-4">
          <div
            className={`flex items-center py-2 px-4 mr-1 mb-3 ${itemDescription === 'Small' ? 'text-purple-600' : 'text-gray-600'} hover:cursor-pointer`}
            onClick={() => setItemDescription('Small')}
          >
            <div className='flex flex-col gap-1'>
              <div className='flex items-center justify-center content-center rounded-md w-8 h-8 ml-2'>
                <Image src="/images/small.svg" width={40} height={20} alt="Small" />
              </div>
              <div>Small</div>
            </div>
          </div>
          <div
            className={`flex items-center py-2 px-4 mr-1 mb-3 ${itemDescription === 'Medium' ? 'text-purple-600' : 'text-gray-600'} hover:cursor-pointer`}
            onClick={() => setItemDescription('Medium')}
          >
            <div className='flex flex-col gap-1'>
              <div className='flex items-center justify-center content-center rounded-md w-8 h-8 ml-2'>
                <Image src="/images/medium.svg" width={40} height={20} alt="Medium" className='translate-x-1'/>
              </div>
              <div>Medium</div>
            </div>
          </div>
          <div
            className={`flex items-center py-2 px-4 mr-1 mb-3 ${itemDescription === 'Large' ? 'text-purple-600' : 'text-gray-600'} hover:cursor-pointer`}
            onClick={() => setItemDescription('Large')}
          >
            <div className='flex flex-col gap-1'>
              <div className='flex items-center justify-center content-center rounded-md w-8 h-8 ml-2'>
                <Image src="/images/large.svg" width={40} height={20} alt="Large" className='-translate-x-1'/>
              </div>
              <div>Large</div>
            </div>
          </div>
          <div
            className={`flex items-center py-2 px-4 mr-1 mb-3 ${itemDescription === 'X-Large' ? 'text-purple-600' : 'text-gray-600'} hover:cursor-pointer`}
            onClick={() => setItemDescription('X-Large')}
          >
            <div className='flex flex-col gap-1'>
              <div className='flex items-center justify-center content-center rounded-md w-8 h-8 ml-2'>
                <Image src="/images/x-large.svg" width={40} height={20} alt="X-Large" className='translate-x-1'/>
              </div>
              <div>X-Large</div>
            </div>
          </div>
          <div
            className={`flex items-center py-2 px-4 mr-1 mb-3 ${itemDescription === 'Huge' ? 'text-purple-600' : 'text-gray-600'} hover:cursor-pointer`}
            onClick={() => setItemDescription('Huge')}
          >
            <div className='flex flex-col gap-1'>
              <div className='flex items-center justify-center content-center rounded-md w-8 h-8 ml-2'>
                <Image src="/images/huge.svg" width={40} height={20} alt="Huge" className='-translate-x-1'/>
              </div>
              <div>Huge</div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <p>Special instructions, if any</p>
        <Textarea
          className="pl-5 w-96 border-2 border-black border-opacity-25 h-12 rounded-xl mt-3 focus:border-0 focus:ring-0" 
          placeholder="Add your text here..." 
          value={specialInstructions} 
          onChange={(e) => setSpecialInstructions(e.target.value)}
        />
      </div>
      <div className='mt-10 flex justify-start gap-3'>
        <Button
          variant="outline"
          className='py-6 px-4 rounded-xl border border-gray-300 text-gray-600'
          onClick={() => router.push('/dashboard/booking/date-time')}
        >
          <span className='text-2xl rounded-2xl'><ChevronLeft size={20} /></span>
        </Button>
        <Button
          className='py-6 px-10 w-80 mr-60 rounded-xl bg-[#8B14CC] text-white text-center hover:bg-[#8D26CA] hover:text-white'
          onClick={() => router.push('/dashboard/booking/verification')}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

export default RightDiv3;
