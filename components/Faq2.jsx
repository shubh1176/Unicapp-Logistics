import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

function Faq2() {
  return (
    <div className='flex flex-col text-xl mb-5 w-[90%] lg:w-full'>
    
      <div className='border-2 border-gray-950 rounded-3xl mr-28 mt-2 px-9 w-full text-sm lg:text-base'>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className='pt-4 '>
            <AccordionTrigger className="font-generalRegular text-center">What is Unicapp?</AccordionTrigger>
            <AccordionContent className='font-generalLight lg:text-lg'>
              Unicapp is your go-to for on-demand delivery across India. From forgotten items and store pickups to urgent medicines and gifts, we deliver any item, any time. Our mission is to make Unicapp a one stop solution for all your delivery needs.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="font-generalRegular">What services does Unicapp offer?</AccordionTrigger>
            <AccordionContent className='font-generalLight lg:text-lg'>
              Unicapp provides a wide range of delivery services, including on-demand or same-day intracity deliveries and intercity courier services.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="font-generalRegular">How do I book a delivery with Unicapp?</AccordionTrigger>
            <AccordionContent className='font-generalLight lg:text-lg'>
              Booking a delivery with Unicapp is easy! Simply visit our website, enter the pickup and drop-off details, choose your delivery type, add package description, and confirm the booking. We’ll take care of the rest.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="font-generalRegular">What areas does Unicapp cover?</AccordionTrigger>
            <AccordionContent className='font-generalLight lg:text-lg'>
              Unicapp operates only in New Delhi for intracity deliveries and offers intercity courier services that reach almost every corner of the country. Coming soon to other cities.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="font-generalRegular">How fast is Unicapp's delivery service?</AccordionTrigger>
            <AccordionContent className='font-generalLight lg:text-lg'>
              For intracity deliveries, we offer on-demand and same-day delivery options. For intercity deliveries, timing depends on the distance and service type selected, but we aim to deliver packages as quickly as possible, usually within 1-3 business days.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger className="font-generalRegular">Can I track my delivery?</AccordionTrigger>
            <AccordionContent className='font-generalLight lg:text-lg'>
              We are working on our tracking system, so for now we provide third-party carrier links, so that you can track your courier. Once your package is picked up, you can check its progress through our website until it reaches its destination.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger className="font-generalRegular">What types of items can I send with Unicapp?</AccordionTrigger>
            <AccordionContent className='font-generalLight lg:text-lg'>
              Unicapp can deliver a wide range of items including documents, parcels, food items, groceries, clothing, electronics, and more. However, we do have restrictions on hazardous materials and certain regulated items. Please refer to our terms and conditions for a complete list.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8">
            <AccordionTrigger className="font-generalRegular">How much does it cost to use Unicapp?</AccordionTrigger>
            <AccordionContent className='font-generalLight lg:text-lg'>
              Pricing varies based on the delivery type, distance, and size/weight of the package. You can get an instant quote by entering your delivery details on our website.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-9">
            <AccordionTrigger className="font-generalRegular">How secure are my deliveries with Unicapp?</AccordionTrigger>
            <AccordionContent className='font-generalLight lg:text-lg'>
              Unicapp prioritizes the security of your packages. All deliveries are handled with care, and we offer options for secure delivery, including signature confirmation and insurance for valuable items.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-10">
            <AccordionTrigger className="font-generalRegular">What if my delivery is delayed or lost?</AccordionTrigger>
            <AccordionContent className='font-generalLight lg:text-lg'>
              While we strive to deliver every package on time, unforeseen circumstances can sometimes cause delays. If a delivery is delayed or lost, our customer support team is here to help resolve the issue and provide necessary compensation where applicable.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-11">
            <AccordionTrigger className="font-generalRegular">Can I schedule a pickup for a specific time?</AccordionTrigger>
            <AccordionContent className='font-generalLight lg:text-lg'>
              Yes, Unicapp allows you to schedule pickups at a time that’s convenient for you. Just select your preferred time slot while booking.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-12">
            <AccordionTrigger className="font-generalRegular">Does Unicapp offer bulk delivery services for businesses?</AccordionTrigger>
            <AccordionContent className='font-generalLight lg:text-lg'>
              Absolutely! We offer tailored delivery solutions for businesses, including bulk deliveries and regular scheduled pickups. Contact our support team for more details and customized packages.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-13">
            <AccordionTrigger className="font-generalRegular">How do I contact Unicapp customer support?</AccordionTrigger>
            <AccordionContent className='font-generalLight lg:text-lg'>
              You can reach our customer support team via phone or email. We’re here to assist you with any queries or concerns you may have.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-14" className='pb-4'>
            <AccordionTrigger className="font-generalRegular">What payment methods does Unicapp accept?</AccordionTrigger>
            <AccordionContent className='font-generalLight lg:text-lg'>
              We accept all major payment methods, including credit/debit cards, net banking, UPI, and mobile wallets. You can choose your preferred payment option at checkout.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default Faq2;
