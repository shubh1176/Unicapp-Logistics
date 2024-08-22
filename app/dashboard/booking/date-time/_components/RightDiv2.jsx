"use client";
import React from 'react';
import { useRecoilState } from 'recoil';
import { dateState, timeState } from '@/recoil/store';
import { format, addDays, isBefore, startOfToday, setMinutes, addHours } from 'date-fns';
import { ChevronLeft } from 'lucide-react';
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
    <div className="p-4 sm:p-8 md:p-10 translate-x-0 sm:translate-x-10 translate-y-0 sm:translate-y-10 bg-white rounded-lg shadow-md max-w-full">
      <div className="mb-4 sm:mb-5 w-full">
        <h2 className="text-sm sm:text-base font-generalMedium text-[#8B14CC]">STEP 3/6</h2>
        <div className="flex mt-3 sm:mt-4 mb-6 sm:mb-8 -translate-x-1.5">
          <div className="w-12 h-1 bg-[#8B14CC] rounded mx-1"></div>
          <div className="w-12 h-1 bg-[#8B14CC] rounded mx-1"></div>
          <div className="w-12 h-1 bg-[#8B14CC] rounded mx-1"></div>
          <div className="w-12 h-1 bg-gray-300 rounded mx-1"></div>
          <div className="w-12 h-1 bg-gray-300 rounded mx-1"></div>
          <div className="w-12 h-1 bg-gray-300 rounded mx-1"></div>
        </div>
      </div>
      <h2 className="text-2xl sm:text-3xl font-generalSemiBold">Date & Time</h2>
      <p className="mt-2 w-full sm:w-96 mb-4 sm:mb-5 text-xs sm:text-sm">Choose a time you'd like us to arrive at your pickup location</p>
      <div className="mt-5 sm:mt-7">
        <h3 className="text-base sm:text-lg font-semibold">Select day</h3>
        <div className="flex flex-wrap gap-2 sm:gap-3 mt-3">
          {dates.map((day, index) => (
            <button
              key={index}
              className={`py-2 px-3 w-16 h-16 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl border ${date.toDateString() === day.toDateString() ? 'bg-purple-600 text-white border-transparent' : 'bg-white border-gray-300 text-gray-600'} hover:bg-white hover:text-black hover:border-[#8D26CA]`}
              onClick={() => handleDateChange(day)}
            >
              <span className="block text-xs sm:text-sm font-semibold">{index === 0 ? 'Today' : format(day, 'eee')}</span>
              <span className="block text-lg sm:text-xl font-bold">{format(day, 'd')}</span>
            </button>
          ))}
          <Popover>
            <PopoverTrigger asChild>
              <button
                className="py-2 px-3 w-16 h-16 sm:w-20 sm:h-20 border bg-white border-gray-300 text-gray-600 rounded-lg sm:rounded-xl"
              >
                <span className="block text-xs sm:text-sm font-semibold">More</span>
                <span className="block text-lg sm:text-xl font-bold">⌄</span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="p-4 sm:p-5 rounded-xl">
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
      <div className="mt-5 sm:mt-7 sm:mr-40">
        <h3 className="text-base sm:text-lg font-semibold">Select time</h3>
        <div className="grid grid-cols-2 gap-x-3 sm:gap-x-4 gap-y-3 sm:gap-y-4 mt-3">
          {timeSlots.map((timeOption, index) => (
            <Button
              key={index}
              className={`py-2 px-4 w-full sm:w-36 sm:px-24 rounded-lg sm:rounded-xl border ${time === timeOption ? 'bg-[#8B14CC] text-white border-transparent' : 'bg-white border-gray-300 text-black'} hover:bg-white hover:text-black hover:border-[#8D26CA]`}
              onClick={() => handleTimeChange(timeOption)}
            >
              {timeOption}
            </Button>
          ))}
        </div>
      </div>
      <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-start gap-3 sm:gap-4">
        <Button
          variant="outline"
          className="py-4 px-3 sm:px-4 rounded-lg sm:rounded-xl border border-gray-300 text-gray-600 w-full sm:w-auto"
          onClick={() => router.push('/dashboard/booking/detail-address')}
        >
          <span className="text-xl sm:text-2xl rounded-2xl"><ChevronLeft size={20} /></span>
        </Button>
        <Button
          className="py-4 px-6 w-full sm:w-auto rounded-lg sm:rounded-xl bg-[#8B14CC] text-white text-center hover:bg-[#8D26CA] hover:text-white"
          onClick={() => router.push('/dashboard/booking/details')}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default RightDiv2;
