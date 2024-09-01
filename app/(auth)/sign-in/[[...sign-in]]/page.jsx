import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between mt-20 lg:pl-32 px-4 lg:px-0 bg-[#F1EDEA]">
      <div className="flex flex-col gap-1 items-center text-center lg:text-left">
        <Image src={'/images/blackonwhitelogo.svg'} height={200} width={200} className='-translate-y-4 lg:h-300 lg:w-300' />
        <h1 className="font-generalMedium text-3xl lg:text-5xl -translate-y-4">Welcome Back</h1>
        <span className="mt-3 text-lg lg:text-xl font-generalRegular -translate-y-4">
          Unicapp is a one-stop solution for all your delivery<br className="hidden lg:inline"/> needs, your delivery superhero!
        </span>
        <div className="w-full mt-8 lg:mt-16 lg:px-36 px-4">
          <span>
            By continuing you agree to our{' '}
            <a href="/T&C" className="underline text-black">
              Terms of Use
            </a>{' '}
            and acknowledge that you have read our{' '}
            <a href="/Privacy-Policy" className="underline text-black">
              Privacy Policy
            </a>.
          </span>
        </div>
      </div>
      <div className="mt-12 lg:mt-24 lg:mr-52 w-full max-w-md mb-14">
        <SignIn />
      </div>
    </div>
  );
}
