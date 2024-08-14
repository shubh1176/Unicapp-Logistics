"use client";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowBigRightDash, ArrowRight, ChevronDown, CircleUserRound, CircleUserRoundIcon, WalletMinimal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import Footer from '@/components/Footer';
import { UserButton, useUser } from '@clerk/clerk-react'

const page = () => {
  const router = useRouter();
  const { user } = useUser()
  return (
    <div className='bg-[#F1EDEA] pt-1'>
    <div className="bg-[#470A68] flex justify-between items-center px-4 h-20 rounded-xl m-5">
      <div>
        <Image src={'/images/yellowonwhite.svg'} width={200} height={50} alt="Logo" />
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" className="text-white hover:bg-white hover:bg-opacity-20 hover:text-white text-lg" onClick={() => router.push('/')}>
          Home
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 text-white text-lg p-2 rounded-lg cursor-pointer hover:bg-white hover:bg-opacity-20 hover:text-white">
            Services <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white shadow-lg rounded-md mt-2 p-2">
            <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer" onClick={() => router.push('/Pickup-and-drop')}>
              Pickup & Drop
            </DropdownMenuItem>
            <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer" onClick={() => router.push('/courier')}>
              Intercity Courier
            </DropdownMenuItem>
            <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer">
              API Integration
            </DropdownMenuItem>
            <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer" onClick={() => router.push('/businesses')}>
              Last-mile Delivery
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost" className="text-white hover:bg-white hover:bg-opacity-20 hover:text-white text-lg" onClick={() => router.push('/businesses')}>
          For business
        </Button>
        <Button variant="ghost" className="text-white hover:bg-white hover:bg-opacity-20 hover:text-white text-lg" onClick={() => router.push('/about')}>
          About us
        </Button>
        <Button variant="ghost" className="text-white hover:bg-white hover:bg-opacity-20 hover:text-white text-lg" onClick={() => router.push('/contact')}>
          Contact
        </Button>
      </div>
      <div className="flex items-center gap-2">
      {user ? (
          <div className="flex items-center space-x-4 border-2 rounded-lg py-2 px-3">
          <UserButton />
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-white text-lg p-2 rounded-lg cursor-pointer hover:bg-white hover:bg-opacity-20 hover:text-white">
              {user.fullName || 'Guest'} <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white shadow-lg rounded-md mt-2 p-2">
              <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer gap-2" onClick={() => router.push('/dashboard')}>
              <CircleUserRoundIcon />Account
              </DropdownMenuItem>
              <DropdownMenuItem className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer gap-2" onClick={() => router.push('/dashboard/wallet')}>
              <WalletMinimal />Wallet
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        ) : (
          <>
            <Button variant="ghost" className="text-white hover:bg-white hover:bg-opacity-20 hover:text-white text-md" onClick={()=>router.replace('/dashboard')}>
              Log In
            </Button>
            <Button className="text-[#470A68] bg-white hover:border-2 hover:outline-2 hover:bg-[#470A68] hover:text-white" onClick={()=>router.replace('/dashboard')}>
              Sign up
            </Button>
          </>
        )}
      </div>
    </div>
    <div className="flex flex-col items-start mt-24 mb-32 px-16 ml-32 mr-28">
        <div className="flex flex-row justify-between w-full mb-16">
            <div className="text-5xl font-generalBold leading-tight">
             Privacy Policy
            </div>
            <div className="text-xl font-generalRegular leading-relaxed max-w-lg">
            
            </div>
        </div>
        <div className="flex flex-row justify-between w-full">
            <div className="text-2xl font-generalBold">
              Introduction
            </div>
            <div className="flex flex-col text-xl font-generalRegular leading-relaxed max-w-lg">
            <div>
            Unicapp Logistics Private Limited (“Unicapp,” “we,” “us,” or “our”) is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you use our services or visit our website www.unicapp.in. By using our services, you consent to the practices described in this policy.
            </div>
            </div>
        </div>
        <div className="flex flex-row justify-between w-full mt-16">
            <div className="text-2xl font-generalBold">
            Information We Collect
            </div>
            <div className="flex flex-col text-xl font-generalRegular leading-relaxed max-w-lg">
            <div className="mt-4">
            We may collect the following personal information from you:
                <ul className="list-disc ml-10">
                    <li>Contact Information: Name, email address, phone number, and postal address.</li>
                    <li>Account Information: Username, password, and any preferences you set in your account.</li>
                    <li>Payment Information: Credit/debit card details, UPI IDs, and billing address.</li>
                    <li>Delivery Information: Recipient’s name, address, and contact details.</li>
                    <li>Communications: Any feedback, inquiries, or communication you have with us.</li>
                </ul>
            </div>
            <div className="mt-4">
            Non-Personal Information
            <h6>We may also collect non-personal information, including:</h6>
                <ul className="list-disc ml-10">
                    <li>Browser and Device Information: IP address, browser type, operating system, and device type.</li>
                    <li>Usage Data: Details about how you interact with our website and services, including pages viewed, links clicked, and features used.</li>
                    
                </ul>
            </div>
            </div>
        </div>
        <div className="flex flex-row justify-between w-full mt-16">
            <div className="text-2xl font-generalBold">
            How We Use Your Information
            </div>
            <div className="flex flex-col text-xl font-generalRegular leading-relaxed max-w-lg">
            We use the collected information for the following purposes:
            <div className="mt-4">
                <ul className="list-disc">
                    <li>Service Delivery: To process and deliver your orders, including pickup and drop-off details.</li>
                    <li>Account Management: To create and manage your account on our platform.</li>
                    <li>Payment Processing: To facilitate transactions and payments securely.</li>
                    <li>Communication: To respond to your inquiries, provide customer support, and send you service-related notifications.</li>
                    <li>Marketing and Promotions: To send you promotional offers, newsletters, and updates that may interest you. You can opt-out of marketing communications at any time.</li>
                    <li>Website Improvement: To analyze usage patterns and improve our website’s functionality, user experience, and content.</li>
                    <li>Legal Compliance: To comply with legal obligations and protect our rights and interests.</li>
                </ul>
            </div>
            </div>
        </div>
        <div className="flex flex-row justify-between w-full mt-16">
            <div className="text-2xl font-generalBold">
            Sharing Your Information
            </div>
            <div className="flex flex-col text-xl font-generalRegular leading-relaxed max-w-lg">
            <div className="mt-4">
            We do not sell, rent, or trade your personal information with third parties. However, we may share your information in the following circumstances:
                <ul className="list-disc">
                    <li>Service Providers: We may share your information with third-party service providers who assist us in delivering our services, such as payment processors, logistics partners, and IT support.</li>
                    <li>Legal Requirements: We may disclose your information if required by law, court order, or governmental authority.</li>
                    <li>Business Transfers: In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred to the new entity.</li>
                </ul>
            </div>
            </div>
        </div>
        <div className="flex flex-row justify-between w-full mt-16">
            <div className="text-2xl font-generalBold">
            Data Security
            </div>
            <div className="flex flex-col text-xl font-generalRegular leading-relaxed max-w-lg">
            <div className="mt-4">
            We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your data, we cannot guarantee its absolute security
            </div>
            </div>
        </div>
        <div className="flex flex-row justify-between w-full mt-16">
            <div className="text-2xl font-generalBold">
            Cookies and Tracking Technologies
            </div>
            <div className="flex flex-col text-xl font-generalRegular leading-relaxed max-w-lg">
            <div className="mt-4">
            We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small data files stored on your device that help us remember your preferences and track your activities. You can control cookie preferences through your browser settings, but disabling cookies may affect the functionality of our website.
            </div>
            </div>
        </div>
        <div className="flex flex-row justify-between w-full mt-16">
            <div className="text-2xl font-generalBold">
            Your Rights and Choices
            </div>
            <div className="flex flex-col text-xl font-generalRegular leading-relaxed max-w-lg">
            <div className="mt-4">
                <ul className="list-disc">
                    <li>Access and Correction: You have the right to access and correct your personal information stored with us. You can update your information through your account settings or by contacting us directly.</li>
                    <li>Data Deletion: You can request the deletion of your account and personal information. Please note that some information may be retained for legal or business purposes.</li>
                    <li>Opt-Out: You can opt-out of receiving marketing communications from us by following the unsubscribe link in our emails or contacting us</li>
                </ul>
            </div>
            </div>
        </div>
        <div className="flex flex-row justify-between w-full mt-16">
            <div className="text-2xl font-generalBold">
            Third-Party Links
            </div>
            <div className="flex flex-col text-xl font-generalRegular leading-relaxed max-w-lg">
            <div className="mt-4">
            Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party websites you visit.
            </div>
            </div>
        </div>
        <div className="flex flex-row justify-between w-full mt-16">
            <div className="text-2xl font-generalBold">
            Changes to This Privacy Policy
            </div>
            <div className="flex flex-col text-xl font-generalRegular leading-relaxed max-w-lg">
            <div className="mt-4">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated date. Your continued use of our services after such changes signifies your acceptance of the revised policy.
            </div>
            </div>
        </div>
        <div className="flex flex-row justify-between w-full mt-16">
            <div className="text-2xl font-generalBold">
            Contact Us
            </div>
            <div className="flex flex-col text-xl font-generalRegular leading-relaxed max-w-lg">
            <div className="mt-4">
            If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
                <ul className="list-disc">
                    <li>Phone: +91 9625811881</li>
                    <li>Email: contact@unicapp.in</li>
                    <li>Address: 44, Backary Portion, 2nd Floor, Regal Building, Connaught Place, New Delhi - 110001</li>
                </ul>
            </div>
            </div>
        </div>
      </div>
    <div>
     <Footer />
    </div>
    </div>
  );
};

export default page;
