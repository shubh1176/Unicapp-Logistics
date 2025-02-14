"use client";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { dateState, timeState } from "@/recoil/store";
import {
  format,
  addDays,
  isBefore,
  startOfToday,
  setMinutes,
  addHours,
} from "date-fns";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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

  const [, forceRender] = useState(false);

  const dates = [
    new Date(),
    addDays(new Date(), 1),
    addDays(new Date(), 2),
    addDays(new Date(), 3),
  ];

  const handleDateChange = (newDate) => {
    setDate(newDate);
    forceRender((prev) => !prev);
  };

  const handleTimeChange = (newTime) => {
    setTime(newTime);
    forceRender((prev) => !prev);
  };

  const handleCalendarDateChange = (selectedDate) => {
    if (!isBefore(selectedDate, startOfToday())) {
      setDate(selectedDate);
      forceRender((prev) => !prev);
    }
  };

  const getTimeSlots = () => {
    const now = new Date();
    const slots = ["Within 30 mins"];
    let start = setMinutes(addHours(now, 1), 0);

    for (let i = 0; i < 3; i++) {
      const end = addHours(start, 1);
      slots.push(`${format(start, "ha")} - ${format(end, "ha")}`);
      start = end;
    }

    return slots;
  };

  const timeSlots = getTimeSlots();
  const today = startOfToday();

  return (
    <div className="p-6 sm:p-0 bg-white rounded-3xl md:rounded-xl shadow-lg max-w-full  lg:max-w-[20rem] lg:shadow-none lg:rounded-none lg:bg-[#F8F8F880] lg:m-5 ">
      <div className="mb-5 w-full hidden lg:block">
        <h2 className="text-sm sm:text-sm font-generalMedium text-[#8B14CC]">
          STEP 3/6
        </h2>
        <div className="flex mt-4 mb-5 -translate-x-1.5">
          <div className="w-12 h-1 bg-[#8B14CC] rounded mx-1"></div>
          <div className="w-12 h-1 bg-[#8B14CC] rounded mx-1"></div>
          <div className="w-12 h-1 bg-[#8B14CC] rounded mx-1"></div>
          <div className="w-12 h-1 bg-gray-300 rounded mx-1"></div>
          <div className="w-12 h-1 bg-gray-300 rounded mx-1"></div>
          <div className="w-12 h-1 bg-gray-300 rounded mx-1"></div>
        </div>
      </div>
      <h2 className="text-2xl font-medium md:text-2xl md:font-generalSemiBold mb-2 md:mb-2">
        Date & Time
      </h2>
      <p className="md:mt-0 w-full sm:w-80 mb-6 text-sm md:text-sm pr-6">
        Choose a time you'd like us to arrive at your pickup location
      </p>
      <div className="mt-6">
        <h3 className="text-sm md:text-sm md:font-semibold mb-2 md:mb-1">
          Select day
        </h3>
        <div className="flex flex-wrap justify-between  sm:gap-2">
          {dates.map((day, index) => (
            <button
              key={index}
              className={`p-2 flex flex-col justify-center items-center h-10 w-10 xxs:h-12 xxs:w-12 xs:w-16 xs:h-16 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl border ${
                date.toDateString() === day.toDateString()
                  ? "lg:bg-[#8B14CC] bg-[#0094B2] bg-opacity-20 lg:bg-opacity-100 text-black lg:text-white md:border-transparent"
                  : "bg-white border-gray-300 text-gray-600 hover:border-[#0094B2] md:hover:border-[#8D26CA] hover:text-black"
              } ${index===3 && "md:block hidden"} `}
              onClick={() => handleDateChange(day)}
            >
              <span className="block text-[10px] xxs:text-xs xs:text-sm sm:text-xs font-semibold">
                {index === 0 ? "Today" : format(day, "eee")}
              </span>
              <span className="block text-sm xxs:text-lg  sm:text-base font-bold">
                {format(day, "d")}
              </span>
            </button>
          ))}
          <Popover>
            <PopoverTrigger asChild>
              <button className="p-0 xxs:p-1 xs:p-2 h-10 w-10 xxs:w-12 xxs:h-12 xs:w-16 xs:h-16 sm:w-14 sm:h-14 border bg-white border-gray-300 text-gray-600 rounded-lg sm:rounded-xl">
                <span className="block text-[10px] xxs:text-xs xs:text-sm sm:text-sm font-semibold">
                  More
                </span>
                <span className="block text-base sm:text-base font-bold">⌄</span>
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
      <div className="mt-6">
        <h3 className="text-sm  md:font-semibold mb-2 md:mb-1">
          Select time
        </h3>
        <div className="grid grid-cols-2 gap-x-4 sm:gap-x-2 gap-y-4 sm:gap-y-5">
          {timeSlots.map((timeOption, index) => (
            <Button
            size={10}
              key={index}
              className={`py-2 px-4 w-full text-xs xxs:text-sm sm:w-[150px] lg:text-xs rounded-lg sm:rounded-lg border ${
                time === timeOption
                  ? "lg:bg-[#8B14CC] bg-[#0094B2] lg:hover:bg-[#8B14CC] hover:bg-[#0094B2] bg-opacity-20 hover:bg-opacity-30  lg:bg-opacity-100 text-black lg:text-white lg:border-transparent"
                  : "bg-white hover:bg-white border-gray-300 text-gray-600  hover:text-black hover:border-[#0094B2] lg:hover:border-[#8D26CA]"
              } `}
              onClick={() => handleTimeChange(timeOption)}
            >
              {timeOption}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex justify-start mt-8 gap-3 w-full pb-4">
        <Button
          variant="outline"
          className="p-2 rounded-lg sm:rounded-xl border border-gray-300 text-gray-600 w-14 sm:w-16"
          onClick={() => router.push("/dashboard/booking/detail-address")}
        >
          <span className="text-lg sm:text-xl rounded-xl">
            <ChevronLeft size={20} />
          </span>
        </Button>
        <Button
          className="py-3 px-4 rounded-lg  w-full sm:w-2/3 md:w-full   lg:bg-[#8B14CC] lg:text-white text-center lg:hover:bg-[#8D26CA] lg:hover:text-white bg-[#F3E545] hover:bg-[#F3E530] text-black hover:text-black"
          onClick={() => router.push("/dashboard/booking/details")}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default RightDiv2;
