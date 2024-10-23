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

const countryCodes = [
  { code: '+91', label: 'India' },
  { code: '+1', label: 'United States' },
  { code: '+44', label: 'United Kingdom' },
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
  const [loading, setLoading] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [receiverError, setReceiverError] = useState('');
  const [otpTimeout, setOtpTimeout] = useState(null);
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

  const validatePhoneNumber = (number) => {
    const regex = /^[0-9]{10}$/; // Basic validation, can be customized
    return regex.test(number);
  };

  const handleSendVerificationCode = async () => {
    setPhoneError('');
    const formattedPhoneNumber = `${selectedCountryCode}${phoneNumber.replace(/\D/g, '')}`;
    
    if (!phoneNumber || !validatePhoneNumber(phoneNumber)) {
      setPhoneError('Valid phone number is required');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('/api/sendOtp', { phoneNumber: formattedPhoneNumber });
      setOtpCode(response.data.otpCode);
      setShowOtpDialog(true);

      // Set a timeout for OTP validity
      setOtpTimeout(setTimeout(() => {
        setOtpCode(null);
        setOtpError('OTP has expired. Please request a new one.');
        setShowOtpDialog(false);
      }, 300000)); // 5 minutes

    } catch (error) {
      setPhoneError('Error sending OTP. Please try again.');
      console.error('Error sending OTP:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setOtpError('');
    if (!otpInput) {
      setOtpError('OTP is required');
      return;
    }
    if (otpInput !== otpCode) {
      setOtpError('Invalid OTP');
      return;
    }
    
    try {
      const email = user.primaryEmailAddress.emailAddress;
      const formattedPhoneNumber = `${selectedCountryCode}${phoneNumber.replace(/\D/g, '')}`;
      
      if (existingUser) {
        await db.update(schema.UserData)
          .set({ verified: true, phoneNumber: formattedPhoneNumber })
          .where(eq(schema.UserData.email, email))
          .execute();
      } else {
        await db.insert(schema.UserData).values({
          email: email,
          phoneNumber: formattedPhoneNumber,
          createdAt: moment().format('YYYY-MM-DD'),
          role: '', // Assuming role will be set later
          onboarded: false,
          verified: true,
        }).execute();
      }

      setUserVerified(true);
      setShowOtpDialog(false);
      clearTimeout(otpTimeout);
    } catch (error) {
      setOtpError('Error updating user data');
      console.error('Error updating user data:', error);
    }
  };

  const handleContinue = () => {
    if (!receiverName || !receiverNumber) {
      setReceiverError('Please fill in all receiver details');
    } else {
      router.push('/dashboard/booking/checkout');
    }
  };

  return (
    <div className='max-w-sm mx-auto md:mt-6 p-6 sm:p-6 lg:p-7 bg-white rounded-xl shadow-lg'>
      <div className='mb-5 w-full hidden lg:block'>
        <h2 className="text-sm font-generalMedium text-[#8B14CC]">STEP 5/6</h2>
        <div className="flex mt-4 mb-7">
          <div className="w-12 h-1 bg-[#8B14CC] rounded mx-2"></div>
          <div className="w-12 h-1 bg-[#8B14CC] rounded mx-2"></div>
          <div className="w-12 h-1 bg-[#8B14CC] rounded mx-2"></div>
          <div className="w-12 h-1 bg-[#8B14CC] rounded mx-2"></div>
          <div className="w-12 h-1 bg-gray-300 rounded mx-2"></div>
          <div className="w-12 h-1 bg-gray-300 rounded mx-2"></div>
        </div>
      </div>
      <h3 className="text-2xl font-medium md:text-xl md:font-generalSemiBold mb-1">Personal details</h3>
      <p className="text-black text-sm md:text-base mb-4 md:font-generalMedium">We'll use this information to contact you <br /> during your pickup & delivery.</p>
      {!userVerified && (
        <div className="mb-4">
          <label className="block text-gray-700">Sender's Number</label>
          <div className="flex mb-4 gap-2">
            <Popover open={openSender} onOpenChange={setOpenSender}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openSender}
                  className="w-[130px] justify-between"
                >
                  {selectedCountryCode
                    ? countryCodes.find((code) => code.code === selectedCountryCode)?.label
                    : "Select country..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[130px] p-0">
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
          {phoneError && <p className="text-red-500">{phoneError}</p>}
        </div>
      )}
      {!userVerified && (
        <Button
          onClick={handleSendVerificationCode}
          className="w-full bg-[#F3E545] hover:bg-[#F3E530] text-black lg:bg-[#8B14CC] lg:text-white text-center lg:hover:bg-[#8D26CA] lg:hover:text-white py-2 px-4 rounded-md"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send a verification code'}
        </Button>
      )}
      {userVerified && (
        <>
          <div className="mb-4">
            <label className="block text-black font-generalMedium mb-3">Receiver’s Details</label>
            <div className="relative mt-1">
              <Input
                type="text"
                placeholder="Name"
                value={receiverName}
                onChange={(e) => {
                  setReceiverName(e.target.value);
                  setReceiverError('');
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-0 focus:ring-0 font-generalRegular"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-black font-generalMedium mb-3">Receiver's Phone Number</label>
            <div className="flex mb-4 gap-2">
              <Popover open={openReceiver} onOpenChange={setOpenReceiver}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openReceiver}
                    className="w-[130px] justify-between"
                  >
                    {receiverCountryCode
                      ? countryCodes.find((code) => code.code === receiverCountryCode)?.label
                      : "Select country..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[130px] p-0">
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
                onChange={(e) => {
                  setReceiverNumber(e.target.value);
                  setReceiverError('');
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-0 focus:ring-0 font-generalRegular"
              />
            </div>
            {receiverError && <p className="text-red-500">{receiverError}</p>}
          </div>
        </>
      )}
      <div className='mt-8 flex justify-start gap-3'>
        <Button
          variant="outline"
          className='py-4 sm:py-5 px-4 sm:px-4 rounded-lg border border-gray-300 text-gray-600 w-16 sm:w-20'
          onClick={() => router.push('/dashboard/booking/details')}
        >
          <span className='text-2xl rounded-2xl'><ChevronLeft size={20} /></span>
        </Button>
        <Button
          className='py-4 sm:py-5 px-6 w-full lg:w-auto rounded-lg bg-[#F3E545] hover:bg-[#F3E530] text-black lg:bg-[#8B14CC] lg:text-white text-center lg:hover:bg-[#8D26CA] lg:hover:text-white'
          onClick={handleContinue}
          disabled={!userVerified || loading}
        >
          Continue
        </Button>
      </div>
      <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
        <DialogContent className="w-full max-w-sm h-full max-h-[80vh] p-4 bg-white rounded-xl shadow-lg">
          <div className="flex flex-col items-center justify-center h-full">
            <Image src={'/images/eyesdown.svg'} height={50} width={50} className="mb-10" />
            <h2 className="text-2xl font-generalMedium mb-8">Enter OTP</h2>
            <p className="text-gray-500 mb-6 font-generalLight text-center">OTP has been sent to {selectedCountryCode}{phoneNumber}</p>
            <Input
              type="text"
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
              placeholder="Enter OTP"
              className="mb-4 p-2 border rounded w-full focus:border-none"
            />
            {otpError && <p className="text-red-500">{otpError}</p>}
            <Button
              onClick={handleVerifyOtp}
              className="px-6 py-3 bg-[#FDDA04] text-black rounded-xl hover:bg-[#FDDA04] w-full"
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default RightDiv4;
