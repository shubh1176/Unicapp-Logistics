"use client";
import React from 'react';
import { useRecoilState } from 'recoil';
import { dateState, timeState } from '@/recoil/store';
import { format, addDays, isBefore, startOfToday, setMinutes, addHours } from 'date-fns';
import { Calendar as CalendarIcon, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const RightDiv2 = () => {
  const [date, setDate] = useRecoilState(dateState);
  const [time, setTime] = useRecoilState(timeState);
  const router = useRouter();

  const dates = [
    new Date(),
    addDays(new Date(), 1),
    addDays(new Date(), 2),
    addDays(new Date(), 3),
  ];

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleTimeChange = (newTime) => {
    setTime(newTime);
  };

  const handleCalendarDateChange = (selectedDate) => {
    if (!isBefore(selectedDate, startOfToday())) {
      setDate(selectedDate);
    }
  };

  const getTimeSlots = () => {
    const now = new Date();
    const slots = ['Within 30 mins'];
    let start = setMinutes(addHours(now, 1), 0);
    
    for (let i = 0; i < 3; i++) {
      const end = addHours(start, 1);
      slots.push(`${format(start, 'ha')} - ${format(end, 'ha')}`);
      start = end;
    }

    return slots;
  };

  const timeSlots = getTimeSlots();
  const today = startOfToday();

  return (
    <div className='p-10 translate-x-20 translate-y-20'>
      <div className='mb-5 w-full'>
          <h2 className="text-base font-generalMedium text-[#8B14CC] translate-x-0.5">STEP 3/6</h2>
          <div className="flex mt-4 mb-9 -translate-x-1.5">
            <div className="w-14 h-1 bg-[#8B14CC] rounded mx-2"></div>
            <div className="w-14 h-1 bg-[#8B14CC] rounded mx-2"></div>
            <div className="w-14 h-1 bg-[#8B14CC] rounded mx-2"></div>
            <div className="w-14 h-1 bg-gray-300 rounded mx-2"></div>
            <div className="w-14 h-1 bg-gray-300 rounded mx-2"></div>
            <div className="w-14 h-1 bg-gray-300 rounded mx-2"></div>
          </div>
        </div>
      <h2 className='text-3xl font-generalSemiBold'>Date & Time</h2>
      <p className='mt-2 w-96 mb-5'>Choose a time you'd like us to arrive at your pickup location</p>
      <div className='mt-7'>
        <h3 className='text-lg font-semibold'>Select day</h3>
        <div className='flex space-x-4 mt-3'>
          {dates.map((day, index) => (
            <button
              key={index}
              className={`py-2 px-4 w-20 h-20 rounded-xl border ${date.toDateString() === day.toDateString() ? 'bg-purple-600 text-white border-transparent' : 'bg-white border-gray-300 text-gray-600'}  hover:bg-white hover:text-black hover:border-[#8D26CA]`}
              onClick={() => handleDateChange(day)}
            >
              <span className='block text-sm font-semibold'>{index === 0 ? 'Today' : format(day, 'eee')}</span>
              <span className='block text-xl font-bold'>{format(day, 'd')}</span>
            </button>
          ))}
          <Popover>
            <PopoverTrigger asChild>
              <button
                className='py-2 px-4 w-20 h-20 border bg-white border-gray-300 text-gray-600 rounded-xl'
              >
                <span className='block text-sm font-semibold'>More</span>
                <span className='block text-xl font-bold'>⌄</span>
              </button>
            </PopoverTrigger>
            <PopoverContent className='p-5 rounded-xl'>
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleCalendarDateChange}
                disabledDates={(date) => isBefore(date, today)}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className='mt-5 mr-52'>
        <h3 className='text-lg font-semibold'>Select time</h3>
        <div className='grid grid-cols-2 mt-3 gap-x-0 gap-y-2'>
          {timeSlots.map((timeOption, index) => (
            <Button
              key={index}
              className={`py-2 px-28 -mr-2 mb-2 w-40 rounded-xl border ${time === timeOption ? 'bg-[#8B14CC] text-white border-transparent' : 'bg-white border-gray-300 text-black'} hover:bg-white hover:text-black hover:border-[#8D26CA]`}
              onClick={() => handleTimeChange(timeOption)}
            >
              {timeOption}
            </Button>
          ))}
        </div>
      </div>
      <div className='mt-10 flex justify-start gap-3'>
        <Button
          variant="outline"
          className='py-6 px-4 rounded-xl border border-gray-300 text-gray-600'
          onClick={() => router.push('/dashboard/booking/detail-address')}
        >
          <span className='text-2xl rounded-2xl'><ChevronLeft size={20} /></span>
        </Button>
        <Button
          className='py-6 px-10 w-full mr-60 rounded-xl bg-[#8B14CC] text-white text-center hover:bg-[#8D26CA] hover:text-white'
          onClick={() => router.push('/dashboard/booking/details')}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

export default RightDiv2;
