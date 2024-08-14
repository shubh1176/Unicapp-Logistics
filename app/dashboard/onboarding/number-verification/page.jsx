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
  { code: '+1', label: 'United States' },
  { code: '+44', label: 'United Kingdom' },
  { code: '+91', label: 'India' },
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
    if (enteredPhoneNumber) {
      const formattedPhone = `${selectedCountryCode}${enteredPhoneNumber}`;
      setPhoneNumber(formattedPhone);

      try {
        const response = await fetch('/api/sendOtp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ phoneNumber: formattedPhone }),
        });

        const data = await response.json();
        setGeneratedOtp(data.otpCode); // Save the generated OTP for verification
        console.log('Generated OTP:', data.otpCode); // Log the OTP
        setShowOtpDialog(true);
      } catch (error) {
        console.error('Error sending OTP:', error);
      }
    } else {
      console.error('Phone number is required');
    }
  };

  const handleOtpSubmit = async () => {
    console.log('Entered OTP:', otp);
    console.log('Generated OTP:', generatedOtp);

    if (otp === generatedOtp) {
      setVerified(true);
      setOnboarded(true);

      // Update the user's verified status and phone number in the database
      try {
        const email = user.primaryEmailAddress.emailAddress;
        await db
          .update(schema.UserData)
          .set({ phoneNumber, verified: true, onboarded: true })
          .where(eq(schema.UserData.email, email))
          .execute();

        router.push('/dashboard'); // Redirect to dashboard after successful verification
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    } else {
      console.error('Invalid OTP');
    }
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
    <div className="flex flex-col items-center justify-center h-screen">
      {!showOtpDialog ? (
        <div className="">
          <div className="flex flex-col items-center justify-center h-full -translate-y-20">
            <Image src={'/images/blackonwhitelogo.svg'} height={300} width={300} />
            <h2 className="text-4xl font-generalMedium mb-12">Enter Your Phone Number</h2>
            <div className="flex mb-4 w-96 gap-2">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
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
            <Button
              onClick={handlePhoneNumberSubmit}
              className="px-6 py-3 bg-[#FDDA04] text-black rounded-xl hover:bg-[#FDDA04] w-96"
            >
              Verify Phone
            </Button>
          </div>
        </div>
      ) : (
        <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
          <DialogContent className="w-full max-w-3xl h-full max-h-[80vh] p-4">
            <div className="flex flex-col items-center justify-center h-full">
            <Image src={'/images/eyesdown.svg'} height={50} width={50} className="mb-10" />
              <h2 className="text-4xl font-generalMedium mb-16">Enter OTP</h2>
              <Input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="mb-4 p-2 border rounded w-96 focus:border-none"
              />
              <Button
                onClick={handleOtpSubmit}
                className="px-6 py-3 bg-[#FDDA04] text-black rounded-xl hover:bg-[#FDDA04] w-96"
              >
                Verify OTP
              </Button>
              <p className="mt-4">Time remaining: {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}</p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default NumberVerificationPage;
