"use client";
import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { phoneNumberState, verifiedState, onboardedState } from '@/recoil/store';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/clerk-react';
import { db } from '@/utils/db';
import * as schema from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
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

const countryCodes = [
  { code: '+91', label: 'India' },
  { code: '+1', label: 'United States' },
  { code: '+44', label: 'United Kingdom' },
  // Add more country codes as needed
];

const NumberVerificationPage = () => {
  const { user } = useUser();
  const [phoneNumber, setPhoneNumber] = useRecoilState(phoneNumberState);
  const [verified, setVerified] = useRecoilState(verifiedState);
  const [onboarded, setOnboarded] = useRecoilState(onboardedState);
  const [selectedCountryCode, setSelectedCountryCode] = useState(countryCodes[0].code);
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [timer, setTimer] = useState(300);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [phoneError, setPhoneError] = useState('');
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
            setPhoneNumber(fetchedUser.phoneNumber);
            setVerified(fetchedUser.verified);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [user, setPhoneNumber, setVerified]);

  const handlePhoneNumberSubmit = async () => {
    setPhoneError('');
    if (!enteredPhoneNumber) {
      setPhoneError('Phone number is required');
      return;
    }

    const formattedPhone = `${selectedCountryCode}${enteredPhoneNumber}`;
    setPhoneNumber(formattedPhone);

    setLoading(true);
    try {
      const response = await fetch('/api/sendOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: formattedPhone }),
      });

      const data = await response.json();
      if (response.ok) {
        setGeneratedOtp(data.otpCode); // Save the generated OTP for verification
        console.log('Generated OTP:', data.otpCode); // Log the OTP
        setShowOtpDialog(true);
        setTimer(300); // Reset the timer
        setOtp(''); // Reset OTP input field
        setOtpError(''); // Clear previous OTP errors
      } else {
        setPhoneError(data.error || 'Error sending OTP');
      }
    } catch (error) {
      setPhoneError('Error sending OTP');
      console.error('Error sending OTP:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    setOtpError('');
    setLoading(true);

    if (otp === generatedOtp) {
      setVerified(true);
      setOnboarded(true);

      try {
        const email = user.primaryEmailAddress.emailAddress;
        await db
          .update(schema.UserData)
          .set({ phoneNumber, verified: true, onboarded: true })
          .where(eq(schema.UserData.email, email))
          .execute();

        setShowOtpDialog(false);
        router.push('/dashboard'); // Redirect to dashboard after successful verification
      } catch (error) {
        setOtpError('Error updating user data');
        console.error('Error updating user data:', error);
      }
    } else {
      setOtpError('Invalid OTP');
    }

    setLoading(false);
  };

  useEffect(() => {
    let countdown;
    if (showOtpDialog) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(countdown);
            setShowOtpDialog(false);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [showOtpDialog]);

  return (
    <div className="flex flex-col items-center justify-center h-screen px-6 sm:px-10">
      {!showOtpDialog ? (
        <div className="flex flex-col items-center justify-center h-full w-full max-w-xs sm:max-w-sm translate-y-[-10%] sm:translate-y-[-20%]">
          <Image src={'/images/blackonwhitelogo.svg'} height={150} width={150} alt="Logo" className="mb-6 sm:mb-8" />
          <h2 className="text-xl sm:text-2xl font-generalMedium mb-6 sm:mb-8 text-center">Enter Your Phone Number</h2>
          <div className="flex mb-4 sm:mb-6 w-full gap-2">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[90px] sm:w-[130px] justify-between"
                >
                  {selectedCountryCode
                    ? countryCodes.find((code) => code.code === selectedCountryCode)?.label
                    : "Select country..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[90px] sm:w-[130px] p-0">
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
                            setOpen(false);
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
            <Input
              type="text"
              value={enteredPhoneNumber}
              onChange={(e) => setEnteredPhoneNumber(e.target.value)}
              placeholder="Phone Number"
              className="p-2 border rounded-r-lg focus:outline-none w-full"
            />
          </div>
          {phoneError && <p className="text-red-500 text-sm sm:text-base">{phoneError}</p>}
          <Button
            onClick={handlePhoneNumberSubmit}
            className="px-3 sm:px-5 py-2 sm:py-3 bg-[#FDDA04] text-black rounded-xl hover:bg-[#FDDA04] w-full"
            disabled={loading}
          >
            {loading ? 'Sending OTP...' : 'Verify Phone'}
          </Button>
        </div>
      ) : (
        <Dialog open={showOtpDialog} onOpenChange={(isOpen) => {
          if (!isOpen) {
            setShowOtpDialog(false);
            setOtp('');
            setOtpError('');
          }
        }}>
          <DialogContent className="w-full max-w-xs sm:max-w-sm h-full max-h-[70vh] p-4 sm:p-6">
            <div className="flex flex-col items-center justify-center h-full">
              <Image src={'/images/eyesdown.svg'} height={30} width={30} className="mb-4 sm:mb-6" alt="Eyes down" />
              <h2 className="text-xl sm:text-2xl font-generalMedium mb-6 sm:mb-8 text-center">Enter OTP</h2>
              <Input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="mb-4 sm:mb-6 p-2 sm:p-3 border rounded w-full"
              />
              {otpError && <p className="text-red-500 text-sm sm:text-base">{otpError}</p>}
              <Button
                onClick={handleOtpSubmit}
                className="px-3 sm:px-5 py-2 sm:py-3 bg-[#FDDA04] text-black rounded-xl hover:bg-[#FDDA04] w-full"
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </Button>
              <p className="mt-4 text-sm sm:text-base text-center">Time remaining: {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}</p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default NumberVerificationPage;
