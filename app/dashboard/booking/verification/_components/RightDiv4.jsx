"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRecoilState } from 'recoil';
import { otpCodeState, receiverNumberState, receiverNameState } from '@/recoil/store';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import { db } from '@/utils/db';
import * as schema from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { ChevronLeft } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import moment from 'moment';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from 'next/image';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"


const countryCodes = [
  { code: '+1', label: 'United States' },
  { code: '+44', label: 'United Kingdom' },
  { code: '+91', label: 'India' },
];

function RightDiv4() {
  const { user } = useUser();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useRecoilState(otpCodeState);
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [userVerified, setUserVerified] = useState(false);
  const [existingUser, setExistingUser] = useState(false);
  const [receiverNumber, setReceiverNumber] = useRecoilState(receiverNumberState);
  const [receiverName, setReceiverName] = useRecoilState(receiverNameState);
  const [selectedCountryCode, setSelectedCountryCode] = useState(countryCodes[0].code);
  const [receiverCountryCode, setReceiverCountryCode] = useState(countryCodes[0].code);
  const [openSender, setOpenSender] = useState(false);
  const [openReceiver, setOpenReceiver] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const email = user.primaryEmailAddress.emailAddress;
          const fetchedUser = await db
            .select()
            .from(schema.UserData)
            .where(eq(schema.UserData.email, email))
            .then(result => result[0]);

          if (fetchedUser) {
            setUserVerified(fetchedUser.verified);
            setExistingUser(true);
            if (fetchedUser.phoneNumber) {
              setPhoneNumber(fetchedUser.phoneNumber);
            }
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleSendVerificationCode = async () => {
    const formattedPhoneNumber = `${selectedCountryCode}${phoneNumber.replace(/\D/g, '')}`;
    try {
      const response = await axios.post('/api/sendOtp', { phoneNumber: formattedPhoneNumber });
      setOtpCode(response.data.otpCode);
      setShowOtpDialog(true);
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const handleVerifyOtp = async () => {
    if (otpInput === otpCode) {
      try {
        const email = user.primaryEmailAddress.emailAddress;
        if (existingUser) {
          await db.update(schema.UserData)
            .set({ verified: true, phoneNumber: `${selectedCountryCode}${phoneNumber.replace(/\D/g, '')}` })
            .where(eq(schema.UserData.email, email))
            .execute();
        } else {
          await db.insert(schema.UserData).values({
            email: email,
            phoneNumber: `${selectedCountryCode}${phoneNumber.replace(/\D/g, '')}`,
            createdAt: moment().format('YYYY-MM-DD'),
            role: '', // Assuming role will be set later
            onboarded: false,
            verified: true,
          }).execute();
        }

        setUserVerified(true);
        setShowOtpDialog(false);
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    } else {
      console.error('Invalid OTP');
    }
  };

  return (
    <div className='max-w-md mx-auto mt-10 p-6 -translate-x-20 translate-y-20'>
      <div className='mb-5 w-full'>
          <h2 className="text-base font-generalMedium text-[#8B14CC] translate-x-0.5">STEP 5/6</h2>
          <div className="flex mt-4 mb-9 -translate-x-1.5">
            <div className="w-14 h-1 bg-[#8B14CC] rounded mx-2"></div>
            <div className="w-14 h-1 bg-[#8B14CC] rounded mx-2"></div>
            <div className="w-14 h-1 bg-[#8B14CC] rounded mx-2"></div>
            <div className="w-14 h-1 bg-[#8B14CC] rounded mx-2"></div>
            <div className="w-14 h-1 bg-[#8B14CC] rounded mx-2"></div>
            <div className="w-14 h-1 bg-gray-300 rounded mx-2"></div>
          </div>
        </div>
      <h3 className="text-3xl font-generalSemiBold mt-5 mb-1">Personal details</h3>
      <p className="text-black mb-4 font-generalMedium">We'll use this information to contact you <br /> during your pickup & delivery.</p>
      {!userVerified && (
        <div className="mb-4 mt-20">
          <label className="block text-gray-700">Sender's Number</label>
          <div className="flex mb-4 gap-2">
            <Popover open={openSender} onOpenChange={setOpenSender}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openSender}
                  className="w-[150px] justify-between"
                >
                  {selectedCountryCode
                    ? countryCodes.find((code) => code.code === selectedCountryCode)?.label
                    : "Select country..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[150px] p-0">
                <Command>
                  <CommandInput placeholder="Search country..." />
                  <CommandList>
                    <CommandEmpty>No country found.</CommandEmpty>
                    <CommandGroup>
                      {countryCodes.map((code) => (
                        <CommandItem
                          key={code.code}
                          value={code.code}
                          onSelect={(currentValue) => {
                            setSelectedCountryCode(currentValue === selectedCountryCode ? "" : currentValue);
                            setOpenSender(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedCountryCode === code.code ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {code.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <input
              type="text"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      )}
      {!userVerified && (
        <Button onClick={handleSendVerificationCode} className="w-full bg-[#8B14CC] hover:bg-[#8B14CC] text-white py-2 px-4 rounded-md">
          Send a verification code
        </Button>
      )}
      {userVerified && (
        <>
          <div className="mb-4 mt-9">
            <label className="block text-black font-generalMedium mb-3">Receiver’s Details</label>
            <div className="relative mt-1">
              <Input
                type="text"
                placeholder="Name"
                value={receiverName}
                onChange={(e) => setReceiverName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-0 focus:ring-0 font-generalRegular"
              />
            </div>
          </div>
          <div className="mb-4 mt-4">
            <label className="block text-black font-generalMedium mb-3">Receiver's Phone Number</label>
            <div className="flex mb-4 gap-2">
              <Popover open={openReceiver} onOpenChange={setOpenReceiver}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openReceiver}
                    className="w-[150px] justify-between"
                  >
                    {receiverCountryCode
                      ? countryCodes.find((code) => code.code === receiverCountryCode)?.label
                      : "Select country..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[150px] p-0">
                  <Command>
                    <CommandInput placeholder="Search country..." />
                    <CommandList>
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandGroup>
                        {countryCodes.map((code) => (
                          <CommandItem
                            key={code.code}
                            value={code.code}
                            onSelect={(currentValue) => {
                              setReceiverCountryCode(currentValue === receiverCountryCode ? "" : currentValue);
                              setOpenReceiver(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                receiverCountryCode === code.code ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {code.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <Input
                type="text"
                placeholder="Enter receiver's phone number"
                value={receiverNumber}
                onChange={(e) => setReceiverNumber(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-0 focus:ring-0 font-generalRegular"
              />
            </div>
          </div>
        </>
      )}
      <div className='mt-10 flex justify-start gap-3'>
        <Button
          variant="outline"
          className='py-6 px-4 rounded-xl border border-gray-300 text-gray-600'
          onClick={() => router.push('/dashboard/booking/details')}
        >
          <span className='text-2xl rounded-2xl'><ChevronLeft size={20} /></span>
        </Button>
        <Button
          className='py-6 px-10 w-96 rounded-xl bg-[#8B14CC] text-white text-center hover:bg-[#8D26CA] hover:text-white'
          onClick={() => router.push('/dashboard/booking/checkout')}
        >
          Continue
        </Button>
      </div>
      <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
        <DialogContent className="w-full max-w-3xl h-full max-h-[80vh] p-4">
          <div className="flex flex-col items-center justify-center h-full">
          <Image src={'/images/eyesdown.svg'} height={50} width={50} className="mb-10" />
          <h2 className="text-4xl font-generalMedium mb-16">Enter OTP</h2>
            <p className="text-gray-500 mb-6 font-generalLight">OTP has been sent to {selectedCountryCode}{phoneNumber}</p>
            <Input
              type="text"
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
              placeholder="Enter OTP"
              className="mb-4 p-2 border rounded w-96 focus:border-none"
            />
            <Button onClick={handleVerifyOtp} className="px-6 py-3 bg-[#FDDA04] text-black rounded-xl hover:bg-[#FDDA04] w-96">
              Verify OTP
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default RightDiv4;
