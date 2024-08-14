import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
  

function Faq() {
    const router = useRouter()
  return (
    <div className='flex flex-col text-xl mb-5'>
        <div className='justify-center items-center flex flex-col'>
            <div className='mb-3'>
                <span className='text-4xl font-filson'>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <div className='flex flex-row gap-2'>
                <span>Got more questions?</span>
                <div className='flex flex-row gap-1 hover:cursor-pointer hover:underline' onClick={()=>router.push('/Faqs')}>
                    <span className='text-[#470A68]'>  More FAQs</span>
                    <ArrowRight size={20} strokeWidth={0.75} className='mt-1'/>
                </div>
            </div>

        </div>
        <div className='border-2 border-gray-950 rounded-3xl mx-40 mt-10 px-9'>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1" className='pt-4'>
                    <AccordionTrigger className="font-generalRegular">What is Unicapp?</AccordionTrigger>
                    <AccordionContent className='font-generalLight'>
                    Unicapp is your go-to for on-demand delivery across India. From forgotten items and store pickups to urgent medicines and gifts, we deliver any item, any time. Our mission is to make Unicapp a one stop solution for all your delivery needs.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="font-generalRegular">What services does Unicapp offer?</AccordionTrigger>
                    <AccordionContent className='font-generalLight'>
                    Unicapp provides a wide range of delivery services, including on-demand or same-day intracity deliveries and intercity courier services.
                    </AccordionContent>
            </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible>
            <AccordionItem value="item-3">
            <AccordionTrigger className="font-generalRegular">How do I book a delivery with Unicapp?</AccordionTrigger>
            <AccordionContent className='font-generalLight'>
              Booking a delivery with Unicapp is easy! Simply visit our website, enter the pickup and drop-off details, choose your delivery type, add package description, and confirm the booking. We’ll take care of the rest.
            </AccordionContent>
          </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible>
            <AccordionItem value="item-4">
            <AccordionTrigger className="font-generalRegular">What areas does Unicapp cover?</AccordionTrigger>
            <AccordionContent className='font-generalLight'>
              Unicapp operates only in New Delhi for intracity deliveries and offers intercity courier services that reach almost every corner of the country. Coming soon to other cities.
            </AccordionContent>
          </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible>
            <AccordionItem value="item-5">
            <AccordionTrigger className="font-generalRegular">How fast is Unicapp's delivery service?</AccordionTrigger>
            <AccordionContent className='font-generalLight'>
              For intracity deliveries, we offer on-demand and same-day delivery options. For intercity deliveries, timing depends on the distance and service type selected, but we aim to deliver packages as quickly as possible, usually within 1-3 business days.
            </AccordionContent>
          </AccordionItem>
            </Accordion>
        </div>
      
    </div>
  )
}

export default Faq
