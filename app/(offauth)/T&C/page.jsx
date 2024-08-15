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
import Footer from '@/components/Footer';
import { UserButton, useUser } from '@clerk/clerk-react'

const page = () => {
  const router = useRouter();
  const { user } = useUser()
  return (
    <div className='bg-[#F1EDEA] pt-1'>
    <div className="bg-[#470A68] flex justify-between items-center px-4 h-20 rounded-xl py-1 m-5">
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
            <DropdownMenuTrigger className="flex items-center gap-1 text-white text-xs p-2 rounded-lg cursor-pointer hover:bg-white hover:bg-opacity-20 hover:text-white">
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
            Terms & <br />Conditions
            </div>
            <div className="text-xl font-generalRegular leading-relaxed max-w-lg">
            These Terms and Conditions govern your use of Unicapp<br /> Logistics Private Limited’s services, including intracity<br /> and intercity pickup and delivery services. By using our <br />services, you agree to comply with these terms.
            </div>
        </div>
        <div className="flex flex-row justify-between w-full">
            <div className="text-2xl font-generalBold">
            Company Information
            </div>
            <div className="flex flex-col text-xl font-generalRegular leading-relaxed max-w-lg">
            <div>
                Company Name: Unicapp Logistics Private Limited
            </div>
            <div className="mt-4">
                Contact Information:
                <ul className="list-disc ml-12">
                    <li>Phone: +91 9625811881</li>
                    <li>Email: contact@unicapp.in</li>
                    <li>Address: 44, Backary Portion, 2nd Floor, Regal Building, Connaught Place, New Delhi - 110001</li>
                </ul>
            </div>
            </div>
        </div>
        <div className="flex flex-row justify-between w-full mt-16">
            <div className="text-2xl font-generalBold">
            Services Offered
            </div>
            <div className="flex flex-col text-xl font-generalRegular leading-relaxed max-w-lg">
            <div className="mt-4">
            Unicapp provides:
                <ul className="list-disc ml-10">
                    <li>Intracity Pickup and Drop Services: Within the same city.</li>
                    <li>ntercity Courier Services: Across cities in India.</li>
                    <li>Business Delivery Services: Tailored solutions for businesses requiring<br/> both intercity and intracity deliveries</li>
                </ul>
            </div>
            </div>
        </div>
        <div className="flex flex-row justify-between w-full mb-16 mt-16">
            <div className="text-2xl font-generalBold leading-tight">
            Geographical Coverage
            </div>
            <div className="text-xl font-generalRegular leading-relaxed max-w-lg">
            Currently, we operate within New Delhi for intracity services and offer <br /> intercity delivery services across most locations in India
            </div>
        </div>
        <div className="flex flex-row justify-between w-full mt-16">
            <div className="text-2xl font-generalBold">
            Account Registration
            </div>
            <div className="flex flex-col text-xl font-generalRegular leading-relaxed max-w-lg">
            <div className="mt-4">
                <ul className="list-disc">
                    <li>Account registration is mandatory for booking orders.</li>
                    <li>Required information includes sender's and receiver's name, email ID, mobile number, and address.</li>
                </ul>
            </div>
            </div>
        </div>
        <div className="flex flex-row justify-between w-full mt-16">
            <div className="text-2xl font-generalBold">
            User Responsibilities
            </div>
            <div className="flex flex-col text-xl font-generalRegular leading-relaxed max-w-lg">
            <div className="mt-4">
                <ul className="list-disc">
                    <li>Users must provide accurate information regarding the package contents, size, and weight</li>
                    <li>Users cannot send alcohol, illegal, or restricted items. Any violations will result in penalties and potential legal action.</li>
                </ul>
            </div>
            </div>
        </div>
        <div className="flex flex-row justify-between w-full mt-16">
            <div className="text-2xl font-generalBold">
            Pickup and Delivery Timeframes
            </div>
            <div className="flex flex-col text-xl font-generalRegular leading-relaxed max-w-lg">
            <div className="mt-4">
                <ul className="list-disc">
                    <li>Operating Hours: 7 AM to 10 PM daily. There are no holidays.</li>
                    <li>Delivery Time: Varies based on the service selected and the destination.</li>
                </ul>
            </div>
            </div>
        </div>
        <div className="flex flex-row justify-between w-full mt-16">
            <div className="text-2xl font-generalBold">
            Package Restrictions
            </div>
            <div className="flex flex-col text-xl font-generalRegular leading-relaxed max-w-lg">
            <div className="mt-4">
                <ul className="list-disc">
                    <li>Prohibited items include alcohol, illegal substances, and high-value items without insurance.</li>
                    <li>Expensive items should be declared and insured through our optional insurance service, Unicapp+.</li>
                </ul>
            </div>
            </div>
        </div>
        <div className="flex flex-row justify-between w-full mt-16">
            <div className="text-2xl font-generalBold">
            Delivery Attempts
            </div>
            <div className="flex flex-col text-xl font-generalRegular leading-relaxed max-w-lg">
            <div className="mt-4">
                <ul className="list-disc">
                    <li>Intracity Deliveries: Our delivery executives will wait for the recipient if there’s a delay. In case of extended wait times, the sender will be contacted.</li>
                    <li>Intercity Courier: We make up to three delivery attempts. If all fail, the package will be returned to the sender.</li>
                </ul>
            </div>
            </div>
        </div>
        <div className="flex flex-row justify-between w-full mt-16">
            <div className="text-2xl font-generalBold">
            Pricing and Fees
            </div>
            <div className="flex flex-col text-xl font-generalRegular leading-relaxed max-w-lg">
            <div className="mt-4">
            Intracity Deliveries:
                <ul className="list-disc ml-10">
                    <li>Distance-Based Pricing: Charges depend on the distance between the pickup and delivery addresses.</li>
                    <li>Package Size Pricing: Fees vary based on the size and weight of the package</li>
                    <li>Final Calculation: The final price is calculated and shown at the time of booking based on the provided details.</li>
                </ul>
            <div className="mt-4">
            Intercity Courier Services
                <ul className="list-disc ml-10">
                    <li>Weight and Volumetric Weight: Charges are based on either the actual weight or the volumetric weight, whichever is higher.</li>
                    <li>Volumetric Weight Formula: Length (cm) × Width (cm) × Height (cm) ÷ 5000.</li>
                    <li>Fixed Rates: Per kilogram charges are predefined and shown during the booking process.</li>
                </ul>
            </div>
            <div className="mt-4">
            Additional Fees
                <ul className="list-disc ml-10">
                    <li>Insurance: Optional for high-value packages. Mandatory for packages valued above ₹5000.</li>
                    <li>Special Handling: Additional charges apply for fragile or high-value items requiring special care.</li>
                    <li>Return to Origin (RTO): If a package cannot be delivered after three attempts and needs to be returned, return charges will apply.</li>
                </ul>
            </div>
            <div className="mt-4">
            Payment Methods
                <ul className="list-disc ml-10">
                    <li>We accept payments via Credit/Debit Cards and UPI. Payment must be completed at the time of booking.</li>
                </ul>
            </div>
            <div className="mt-4">
            Taxes
                <ul className="list-disc ml-10">
                    <li>All prices are exclusive of GST and any other applicable taxes, which will be added at checkout.</li>
                </ul>
            </div>
            </div>
            </div>
        </div>
        <div className="flex flex-row justify-between w-full mt-16">
            <div className="text-2xl font-generalBold">
            Damage and Loss
            </div>
            <div className="flex flex-col text-xl font-generalRegular leading-relaxed max-w-lg">
            <div className="mt-4">
            Intercity Courier Services
                <ul className="list-disc">
                    <li>Basic Liability: In the event of loss, theft, damage, or mishandling, Unicapp’s liability is limited to 10 times the freight charges for documents and 5 times the freight charges for parcels (below ₹5000) or the declared value of the consignment, whichever is lower.</li>
                    <li>Insurance Requirement: High-value shipments (above ₹5000) and fragile items should be insured by the sender. Unicapp will not be liable for uninsured shipments.</li>
                </ul>
            </div>
            <div className="mt-4">
            Intracity Deliveries
                <ul className="list-disc">
                    <li>Unicapp+ Insurance: Optional insurance for full compensation in case of loss. Without insurance, we will compensate for half the value of the package.</li>
                </ul>
            </div>
            </div>
        </div>
        <div className="flex flex-row justify-between w-full mt-16">
            <div className="text-2xl font-generalBold">
            Refunds and Cancellations
            </div>
            <div className="flex flex-col text-xl font-generalRegular leading-relaxed max-w-lg">
            <div className="mt-4">
            Once an order is picked up, it cannot be canceled, and no refunds will be issued.
            </div>
            </div>
        </div>
        <div className="flex flex-row justify-between w-full mt-16">
            <div className="text-2xl font-generalBold">
            Data Collection and Privacy
            </div>
            <div className="flex flex-col text-xl font-generalRegular leading-relaxed max-w-lg">
            <div className="mt-4">
                <ul className="list-disc">
                    <li>Data Collected: We collect sender's and receiver's names, email IDs, mobile numbers, and addresses.</li>
                    <li>Data Usage: We do not share user data with third-party companies. Data is used solely for fulfilling delivery services.</li>
                </ul>
            </div>
            </div>
        </div>
        <div className="flex flex-row justify-between w-full mt-16">
            <div className="text-2xl font-generalBold">
            Governing Law
            </div>
            <div className="flex flex-col text-xl font-generalRegular leading-relaxed max-w-lg">
            <div className="mt-4">
            This agreement shall be governed by and construed in accordance with the laws of India. All disputes are subject to the exclusive jurisdiction of the courts in New Delhi.
            </div>
            </div>
        </div>
        <div className="flex flex-row justify-between w-full mt-16">
            <div className="text-2xl font-generalBold">
            Dispute Resolution
            </div>
            <div className="flex flex-col text-xl font-generalRegular leading-relaxed max-w-lg">
            <div className="mt-4">
            Any disputes arising out of this agreement shall be referred to a sole arbitrator appointed by Unicapp. The arbitration will be governed by the Arbitration and Conciliation Act, 1996, with the venue being New Delhi.
            </div>
            </div>
        </div>
        <div className="flex flex-row justify-between w-full mt-16">
            <div className="text-2xl font-generalBold">
            Modification Rights
            </div>
            <div className="flex flex-col text-xl font-generalRegular leading-relaxed max-w-lg">
            <div className="mt-4">
            Unicapp reserves the right to modify these terms and conditions at any time without prior notice. Any changes will be updated on our website.
            </div>
            </div>
        </div> 
        <div className="flex flex-row justify-between w-full mt-16">
            <div className="text-2xl font-generalBold">
            Customer Support
            </div>
            <div className="flex flex-col text-xl font-generalRegular leading-relaxed max-w-lg">
            <div className="mt-4">
            For assistance, customers can contact us at +91 9625811881 or email us at contact@unicapp.in.
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
