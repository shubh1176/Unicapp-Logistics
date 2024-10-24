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
import Header from '@/components/Header';
import Header2 from '@/components/Header2';
import GetEstimate from '@/components/GetEstimate';

function Contact() {
  const router = useRouter();
  const { user } = useUser()
  const [formData, setFormData] = useState({
    name: '',
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
      setFormData({ name: '', email: '', phone: '', message: '' });
    } else {
      alert('Failed to send your message. Please try again later.');
    }
  };

  return (
    <div className='bg-[#F1EDEA] max-w-screen overflow-hidden'>
      {/* Header: Show based on screen size */}
      <div className="hidden lg:block">
        <Header />
      </div>
      <div className="block lg:hidden">
        <Header2 />
      </div>

      {/* Main Content Section */}
      <div className='lg:flex lg:flex-row lg:justify-between  lg:p-20 p-6'>
        {/* Left Side */}
        <div className='lg:flex lg:flex-col lg:ml-8 lg:translate-y-11 lg:translate-x-20'>
          <h2 className='text-4xl lg:text-6xl font-generalSemiBold'>Contact Us</h2>
          <div className='flex flex-col mt-5 lg:mt-10'>
            <span className='font-generalLight text-base lg:text-xl'>Email, call or complete the form to learn how</span>
            <span className='font-generalLight text-base lg:text-xl'>Unicapp can help you with your deliveries.</span>
            <span className='font-generalLight text-base lg:text-xl mt-6 lg:mt-10'>Email: contact@unicapp.in</span>
            <span className='font-generalLight text-base lg:text-xl mt-2'>Call : +91 9625811881</span>
          </div>

          {/* Customer Support and Feedback */}
          <div className='flex flex-col lg:flex-row gap-5 mt-8 lg:mt-12'>
            <div className='w-full lg:w-60'>
              <h3 className='font-generalMedium underline text-sm lg:text-base mb-2'>Customer Support</h3>
              <span className='font-generalRegular text-sm lg:text-base'>
                Our support team is available around the clock to address any concerns or queries you may have.
              </span>
            </div>
            <div className='w-full lg:w-60'>
              <h3 className='font-generalMedium underline text-sm lg:text-base mb-2'>Feedback and Suggestions</h3>
              <span className='font-generalRegular text-sm lg:text-base'>
                Our support team is available to receive any feedback or suggestions to improve our services.
              </span>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className='mt-12 lg:mt-0 max-w-md'>
          <div className='bg-white rounded-2xl p-6 lg:p-10 shadow-md'>
            <h1 className='font-generalLight text-3xl lg:text-5xl mb-6 lg:mb-4'>Get in touch</h1>
            <span className='font-semibold mb-4 text-sm lg:text-lg'>Customer Support</span>
            <p className='text-gray-600 mb-6'>
              Our support team is available around the clock to address any concerns or queries you may have.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                  <Input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email Address</label>
                  <Input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Phone Number</label>
                  <Input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="phone"
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">Message</label>
                  <Textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                <Button className="bg-black text-white py-2 px-6 rounded-lg hover:bg-gray-800" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Map and Location Info */}
      <div className='mt-12 lg:mt-20 lg:ml-32 flex flex-col lg:flex-row'>
        <div className="w-full lg:w-5/12 h-96">
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
        <div className='mt-8 lg:mt-0 lg:ml-32 lg:flex  lg:flex-col ml-5 '>
          <h2 className='text-lg lg:text-3xl font-generalLight'>Connecting Near and Far</h2>
          <span className='mt-4 lg:mt-8 font-bold'>Head Office</span>
          <span className='mt-4'>Unicapp Logistics Pvt. Ltd.<br /> 44, Backary portion, 2nd Floor, <br /> Regal Building, Connaught Place,<br /> New Delhi -110001<br />India</span>
        </div>
      </div>

      {/* Estimate Section */}
      <div className='w-full mt-10 lg:mt-32'>
        <GetEstimate  />
      </div>

      {/* FAQ and Footer */}
      <div className='w-full mt-12 lg:mt-20'>
        <Faq />
      </div>
      <div className='mt-12 lg:mt-24 md:mb-5'>
        <Footer />
      </div>
    </div>
  );
}

export default Contact;
