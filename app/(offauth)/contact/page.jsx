"use client";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Faq from '@/components/Faq';
import {  useUser } from '@clerk/clerk-react'
import Header2 from '@/components/Header2';
import GetEstimate from '@/components/GetEstimate';
import Header3 from '@/components/Header3';
import { or } from 'drizzle-orm';

function Contact() {
  const router = useRouter();
  const { user } = useUser()
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert('Your message has been sent successfully.');
      setFormData({ name: '', organization: '', email: '', phone: '', message: '' });
    } else {
      alert('Failed to send your message. Please try again later.');
    }
  };

  return (
    <div className='bg-[#F1EDEA] min-w-screen overflow-hidden'>
      {/* Header: Show based on screen size */}
      <div >
        <Header3 />
      </div>
      

      {/* Main Content Section */}
      <div className='lg:flex lg:flex-row lg:justify-between  lg:p-20 p-6'>
        {/* Left Side */}
        <div className='lg:flex lg:flex-col lg:ml-8 lg:translate-y-11 lg:translate-x-0'>
          <h2 className='text-4xl lg:text-6xl  font-generalSemiBold'>Contact Us</h2>
          <div className='flex flex-col mt-5 lg:mt-10'>
            <span className='font-generalLight text-base lg:text-xl laptop:text-2xl'>Email, call or complete the form to learn how</span>
            <span className='font-generalLight text-base lg:text-xl laptop:text-2xl'>Unicapp can help you with your deliveries.</span>
            <span className='font-generalLight text-base lg:text-xl laptop:text-2xl mt-6 lg:mt-10'>Email: contact@unicapp.in</span>
            <span className='font-generalLight text-base lg:text-xl laptop:text-2xl mt-2'>Call : +91 9625811881</span>
          </div>

          {/* Customer Support and Feedback */}
          <div className='flex flex-col lg:flex-row gap-5 mt-8 lg:mt-12'>
            <div className='w-full lg:w-60'>
              <h3 className='font-generalMedium underline text-sm lg:text-base laptop:text-lg mb-2'>Customer Support</h3>
              <span className='font-generalRegular text-sm lg:text-base laptop:text-lg'>
                Our support team is available around the clock to address any concerns or queries you may have.
              </span>
            </div>
            <div className='w-full lg:w-60'>
              <h3 className='font-generalMedium underline text-sm lg:text-base laptop:text-lg mb-2'>Feedback and Suggestions</h3>
              <span className='font-generalRegular text-sm lg:text-base laptop:text-lg'>
                Our support team is available to receive any feedback or suggestions to improve our services.
              </span>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className='mt-12 max-w-md lg:mt-0 lg:max-w-lg laptop:max-w-xl'>
          <div className='bg-white rounded-2xl p-6 lg:p-10 laptop:p-16 shadow-md'>
            <h1 className='font-generalLight text-3xl lg:text-5xl mb-6 lg:mb-12'>Get in touch</h1>
            {/* <span className='font-semibold mb-4 text-sm lg:text-lg'>Customer Support</span>
            <p className='text-gray-600 mb-6'>
              Our support team is available around the clock to address any concerns or queries you may have.
            </p> */}
            <form onSubmit={handleSubmit} className="space-y-8 mt-4">
              <div className="flex flex-col gap-4">
                <div className='flex gap-6 mb-3'>
                <div>
                  <label className="block text-gray-700 text-sm laptop:text-base font-bold " htmlFor="name">Name</label>
                  <Input
                    className=" appearance-none   w-full  px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-0 border-b-2  border-black rounded-none  shadow-none"
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold laptop:text-base " htmlFor="name">Organization</label>
                  <Input
                    className=" appearance-none   w-full  px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-0 border-b-2  border-black rounded-none  shadow-none"
                    id="name"
                    type="text"
                    name="name"
                    value={formData.organization}
                    onChange={handleChange}
                    required
                  />
                </div>
                </div>

               <div className='flex gap-6 mb-3'>
               <div>
                  <label className="block text-gray-700 text-sm font-bold laptop:text-base" htmlFor="email">Email Address</label>
                  <Input
                    className=" appearance-none   w-full  px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-0 border-b-2  border-black rounded-none  shadow-none"
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold laptop:text-base " htmlFor="phone">Phone Number</label>
                  <Input
                    className=" appearance-none   w-full  px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-0 border-b-2  border-black rounded-none  shadow-none"
                    id="phone"
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
               </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold laptop:text-base" htmlFor="message">Message</label>
                  <Textarea
                    className=" appearance-none resize-none   w-full  px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-0 border-b-2  border-black rounded-none  shadow-none"
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                  ></Textarea>
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="bg-black text-white py-2 px-6 rounded-lg hover:bg-gray-800 laptop:text-lg" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Map and Location Info */}
      <div className='mt-12 lg:mt-0 px-4 lg:px-24  w-full flex flex-col-reverse  lg:flex-row lg:h-screen laptop:h-[90vh] laptop:w-[95%]'>
        <div className="w-full lg:w-[55%] px-4 lg:px-0   h-96 lg:h-[90%]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d799.555333633901!2d77.21645935361299!3d28.63083352312202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd49c7175d4f%3A0x16da96dd1f463918!2sRegal%20Building%2C%20Hanuman%20Road%20Area%2C%20Connaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1722761292583!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 3 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className='rounded-2xl'
          ></iframe>
        </div>
        <div className='mt-8 lg:mt-0  lg:flex  lg:flex-col lg:justify-center ml-5 laptop:ml-10  '>
          <p className='text-xl lg:text-xl laptop:text-2xl mb-3 font-generalRegular'>Our Location</p>
          <h2 className='text-3xl mb-4 lg:mb-0 font-semibold lg:text-3xl laptop:text-4xl lg:font-bold'>Connecting Near and Far</h2>
          <p className='mt-4 mb-4 lg:mb-0  text-lg font-bold'>Head Office</p> 
          <p className='mt-4 mb-4 lg:mb-0 laptop:text-lg'>Unicapp Logistics Pvt. Ltd.<br /> 44, Backary portion, 2nd Floor, <br /> Regal Building, Connaught Place,<br /> New Delhi -110001<br />India</p>
        </div>
      </div>

    

      {/* FAQ and Footer */}
      <div className='w-full mt-20'>
        <Faq />
      </div>

        {/* Estimate Section */}
        <div className='w-full mt-20 lg:mt-20 lg:mb-36'>
        <GetEstimate  />
      </div>
      <div className='mt-12 lg:mt-24 md:mb-5'>
        <Footer />
      </div>
    </div>
  );
}

export default Contact;
