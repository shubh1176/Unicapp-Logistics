import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

function Faq() {
  const router = useRouter();
  const [openItem, setOpenItem] = useState(null);

  const handleToggle = (item) => {
    setOpenItem(openItem === item ? null : item);
  };

  return (
    <div className="flex flex-col text-xs justify-center  md:h-screen  mx-4 sm:text-lg md:text-xl mb-5 md:mb-0">
      {/* FAQ Heading */}
      <div className="justify-center items-center flex flex-col px-4 sm:px-6">
        <div className="mb-3 text-center">
          <span className="text-xl sm:text-2xl md:text-4xl font-filson">
            FREQUENTLY ASKED QUESTIONS
          </span>
        </div>
        <div className="flex flex-row gap-2 text-sm sm:text-base">
          <span>Got more questions?</span>
          <div
            className="flex flex-row gap-1 hover:cursor-pointer hover:underline"
            onClick={() => router.push("/Faqs")}
          >
            <span className="text-[#470A68]">More FAQs</span>
            <ArrowRight
              size={16}
              strokeWidth={2}
              className="mt-0.5 text-[#470A68]"
            />
          </div>
        </div>
      </div>

      {/* Accordion Section */}
      <div className="border border-opacity-20 md:border-opacity-50 border-gray-950  rounded-2xl sm:rounded-2xl md:rounded-3xl mx-4 sm:mx-6 lg:mx-40 mt-6 md:mt-10 py-4 px-6 sm:px-5 md:px-9">
        {/* Single Accordion Component */}
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className="">
            <AccordionTrigger
              className="font-generalRegular hover:no-underline text-left"
              onClick={() => handleToggle("item-1")}
            >
              What is Unicapp?
            </AccordionTrigger>
            {openItem === "item-1" && (
              <AccordionContent className="font-generalLight text-[10px] sm:text-base md:text-lg text-left">
                Unicapp is your go-to for on-demand delivery across India. From
                forgotten items and store pickups to urgent medicines and gifts,
                we deliver any item, any time. Our mission is to make Unicapp a
                one-stop solution for all your delivery needs.
              </AccordionContent>
            )}
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger
              className="font-generalRegular hover:no-underline text-left"
              onClick={() => handleToggle("item-2")}
            >
              What services does Unicapp offer?
            </AccordionTrigger>
            {openItem === "item-2" && (
              <AccordionContent className="font-generalLight text-[10px]  sm:text-base md:text-lg text-left">
                Unicapp provides a wide range of delivery services, including
                on-demand or same-day intracity deliveries and intercity courier
                services.
              </AccordionContent>
            )}
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger
              className="font-generalRegular hover:no-underline text-left"
              onClick={() => handleToggle("item-3")}
            >
              How do I book a delivery with Unicapp?
            </AccordionTrigger>
            {openItem === "item-3" && (
              <AccordionContent className="font-generalLight text-[10px]  sm:text-base md:text-lg text-left">
                Booking a delivery with Unicapp is easy! Simply visit our
                website, enter the pickup and drop-off details, choose your
                delivery type, add package description, and confirm the booking.
                We’ll take care of the rest.
              </AccordionContent>
            )}
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger
              className="font-generalRegular hover:no-underline text-left"
              onClick={() => handleToggle("item-4")}
            >
              What areas does Unicapp cover?
            </AccordionTrigger>
            {openItem === "item-4" && (
              <AccordionContent className="font-generalLight text-[10px]  sm:text-base md:text-lg text-left">
                Unicapp operates only in New Delhi for intracity deliveries and
                offers intercity courier services that reach almost every corner
                of the country. Coming soon to other cities.
              </AccordionContent>
            )}
          </AccordionItem>

          <AccordionItem value="item-5" className="border-none">
            <AccordionTrigger
              className="font-generalRegular hover:no-underline text-left"
              onClick={() => handleToggle("item-5")}
            >
              How fast is Unicapp's delivery service?
            </AccordionTrigger>
            {openItem === "item-5" && (
              <AccordionContent className="font-generalLight text-[10px]  sm:text-base md:text-lg text-left ">
                For intracity deliveries, we offer on-demand and same-day
                delivery options. For intercity deliveries, timing depends on
                the distance and service type selected, but we aim to deliver
                packages as quickly as possible, usually within 1-3 business
                days.
              </AccordionContent>
            )}
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default Faq;
