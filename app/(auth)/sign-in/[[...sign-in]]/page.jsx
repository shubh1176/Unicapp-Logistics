import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return(
    <div className=" flex flex-row items-center justify-between mt-20 ml-32">
      <div className="flex flex-col gap-1 items-center">
        <Image src={'/images/blackonwhitelogo.svg'} height={300} width={300} className='-translate-y-4' />
        <h1 className="font-generalMedium text-5xl -translate-y-4">Welcome Back</h1>
        <span className="text-center mt-3 text-xl font-generalRegular -translate-y-4">Unicapp is a one-stop solution for all your delivery<br/> needs, your delivery superhero!</span>
        <div className="w-full mt-16 px-36">
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
      <div className="mt-24 mr-52">
        <SignIn />
      </div>
    </div>
  );
}