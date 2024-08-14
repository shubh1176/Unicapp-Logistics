"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { RecoilRoot } from "recoil";
import Script from 'next/script';

export default function ClientProviders({ children }) {
  return (
    <ClerkProvider>
      <RecoilRoot>
        <Script
            src="https://checkout.razorpay.com/v1/checkout.js"
            strategy="beforeInteractive"
            onLoad={() => console.log('Razorpay script loaded successfully')}
            onError={() => console.error('Razorpay script failed to load')}
          />
          {children}
      </RecoilRoot>
    </ClerkProvider>
  );
}
