"use client";
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from "../components/Header";

const Faq = dynamic(() => import("@/components/Faq"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });
const OurServices = dynamic(() => import("@/components/OurServices"), { ssr: false });
const WhyUs = dynamic(() => import("@/components/WhyUs"), { ssr: false });

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 justify-center bg-[#F1EDEA] mb-0">
      <div className="relative">
      <Header />
      <div className="text-center bg-gradient-to-b h-5/6 from-[#8D14CE] to-[#470A68] text-white pb-24 pt-8 rounded-br-3xl rounded-bl-3xl flex flex-col justify-center items-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="flex flex-col gap-2 mb-3">
          <h1 className="text-6xl font-filson">
            <span className="bg-[#F5E27B] text-center pt-2 px-2 font-filson inline-flex rounded-2xl text-[#202020]">
              Deliver
            </span>{" "}
            any item, any time
          </h1>
          <h1 className="text-6xl font-filson">with just a few clicks!</h1>
          </div>
          <p className="mt-6 text-2xl font-generalLight">
            No need to step out, ship with ease using our <br></br> doorstep pickup and delivery service.
          </p>
        </div>

        <div className="absolute top-44 left-64 w-28 h-28 transform -translate-x-1/2 rotate-0">
          <Image src={'/images/flower.svg'} alt="Flower Bouquet" fill objectFit="contain" />
        </div>
        <div className="absolute bottom-9 right-96 w-16 h-16 transform translate-x-1/2 rotate-12">
          <Image src={'/images/lunchbox.svg'} alt="Lunch Box" fill objectFit="contain" />
        </div>
        <div className="absolute bottom-44 left-32 w-20 h-20 transform -translate-x-1/2 rotate-12">
          <Image src={'/images/book.svg'} alt="Book" fill objectFit="contain" />
        </div>
        <div className="absolute bottom-10 left-96 w-28 h-28 transform -translate-x-1/2 rotate-12">
          <Image src={'/images/charger.svg'} alt="Book" fill objectFit="contain" />
        </div>
        <div className="absolute bottom-24 left-56 w-24 h-24 transform -translate-x-1/2 rotate-0">
          <Image src={'/images/drink.svg'} alt="Coffee Cup" fill objectFit="contain" />
        </div>
        <div className="absolute bottom-44 left-80 w-20 h-20 transform -translate-x-1/2 rotate-0">
          <Image src={'/images/Medicines1.svg'} alt="Coffee Cup" fill objectFit="contain" />
        </div>
        <div className="absolute top-48 right-64 w-28 h-28 transform translate-x-1/2 rotate-04">
          <Image src={'/images/dress.svg'} alt="Dress" fill objectFit="contain" />
        </div>
        <div className="absolute top-60 right-32 w-24 h-24 transform translate-x-1/2 rotate-0">
          <Image src={'/images/key.svg'} alt="Key" fill objectFit="contain" />
        </div>
        <div className="absolute bottom-28 right-80 w-24 h-24 transform translate-x-1/2 rotate-0">
          <Image src={'/images/grocery.svg'} alt="Grocery Basket" fill objectFit="contain" />
        </div>
        <div className="absolute top-96 right-24 w-16 h-16 transform translate-x-1/2 rotate-0">
          <Image src={'/images/envelop.svg'} alt="Envelope" fill objectFit="contain" />
        </div>

        <div className="mt-10 hover:cursor-pointer">
          <Image src={'/images/getEst.svg'} width={180} height={110} alt="Pickup" onClick={()=>router.push('/estimate')} />
        </div>
      </div>
    </div>
      <div className="bg-[#fefae060] rounded-sm">
        <OurServices />
      </div>

      <div>
        <WhyUs />
      </div>

      <div className="relative flex flex-col content-center items-center mt-32 mb-32">
        <div className="relative">
          <Image src={'/images/sticker.svg'} height={850} width={1050} priority={true} />
          <div className="absolute bottom-40 right-60 w-20 h-20 transform translate-x-6 -translate-y-4 rotate-0">
            <Image src={'/images/iconblack.svg'} height={90} width={90} priority={true} />
          </div>
        </div>
      </div>

      <div className="flex flex-col content-center items-center mt-20 mb-40">
        <div>
          <span className="font-filson text-[#000000] text-5xl">Wondering how to </span>
          <span className="font-filson text-[#9E3CE1] text-5xl">use</span>
          <span className="font-filson text-[#000000] text-5xl"> it?</span>
        </div>
        <span className="font-generalRegular mb-10 text-2xl mt-5">Don't worry, it's easy ;)</span>
        <Image src={'/images/howtouse.svg'} height={900} width={1100} loading="lazy" />
      </div>

      <div className="mt-20 mb-10">
        <Faq />
      </div>

      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
}
