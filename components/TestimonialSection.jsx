import React, { useState } from "react";
import Marquee from "react-fast-marquee";
import { FaStar, FaUser, FaBuilding } from "react-icons/fa"; // Import icons

// TestimonialCard component for individual cards
const TestimonialCard = ({ name, service, review, image }) => {
  return (
    <div className="bg-purple-100 w-72 md:w-auto flex flex-col items-center gap-3 rounded-2xl shadow-md p-4  border border-purple-500 hover:border-purple-600 transition-all duration-300">
      {/* <img
        className="w-14 h-14 rounded-full"
        src={image} // Replace with actual image
        alt="User"
      /> */}
      <div className="w-full flex justify-between">
       
        <h4 className="font-bold text-black text-sm lg:text-base ">{service}</h4>
        <div className="flex items-center mb-1">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-yellow-400" />
          ))}
        </div>
        </div>
        <p className="text-gray-600 text-xs break-words overflow-hidden text-ellipsis w-full">
          {review}
        </p>
        <p className="text-gray-600 text-xs break-words overflow-hidden text-ellipsis w-full">
          {"___"}{"username"}
        </p>
      
    </div>
  );
};

const TestimonialTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex ml-12 md:ml-20  lg:justify-start space-x-0 mb-8">
      {/* Individuals Tab */}
      <button
        onClick={() => setActiveTab("individual")}
        className={`flex items-center pl-2 pr-4 py-2 text-sm lg:text-lg font-semibold border-b-2 transition-all duration-300 outline-none ${
          activeTab === "individual"
            ? "border-black text-black font-bold"
            : "border-gray-300 text-gray-600"
        }`}
      >
        <FaUser className="mr-2" /> {/* Icon before text */}
        Individuals
      </button>

      {/* Businesses Tab */}
      <button
        onClick={() => setActiveTab("business")}
        className={`flex items-center px-6 py-2 text-sm lg:text-lg font-semibold border-b-2 transition-all duration-300 outline-none  ${
          activeTab === "business"
            ? "border-black text-black font-bold"
            : "border-gray-300 text-gray-600"
        }`}
      >
        <FaBuilding className="mr-2" /> {/* Icon before text */}
        Businesses
      </button>
    </div>
  );
};

const TestimonialSection = () => {
  const [activeTab, setActiveTab] = useState("individual");

  const individuals = [
    {
      name: "Jane Doe",
      service: "Multiple drop-off points",
      review: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "John Smith",
      service: "Tiffin Delivery",
      review: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Alice Johnson",
      service: "Picked Up Keys",
      review: "Lorem Ipsum has been the industry's standard dummy text ever since.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Robert Brown",
      service: "Multiple drop-off points",
      review: "Lorem Ipsum has been the industry's standard dummy text ever since.",
      image: "https://via.placeholder.com/150",
    },
  ];

  const businesses = [
    {
      name: "Company ABC",
      service: "Document Delivery",
      review: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Company XYZ",
      service: "Rakhi Delivery",
      review: "Lorem Ipsum has been the industry's standard dummy text ever since.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Company 123",
      service: "Document Delivery",
      review: "Lorem Ipsum has been the industry's standard dummy text ever since.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Company 456",
      service: "Rakhi Delivery",
      review: "Lorem Ipsum has been the industry's standard dummy text ever since.",
      image: "https://via.placeholder.com/150",
    },
  ];

  const testimonials = activeTab === "individual" ? individuals.concat(individuals) : businesses.concat(businesses); // Display 8 cards in total for demo

  return (
    <div className="py-12 lg:py-0 lg:h-screen">
      {/* Section Heading */}
      <h2 className="text-2xl lg:text-3xl text-center lg:text-start font-bold text-black lg:ml-20 mb-8">
        See what others are sending
      </h2>

      {/* Tabs */}
      <TestimonialTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Grid Layout for 2 Rows with 4 Cards per Row */}
      <Marquee
        gradient={false}
        speed={50}
        direction="left"
        style={{marginBottom:"15px"}}
       
      >
        <div className="grid  md:grid-cols-4 grid-cols-4  gap-8 lg:gap-6 px-4  md:w-screen">
        {testimonials.slice(0, 4).map((testimonial, index) => (
          <TestimonialCard
            key={index}
            name={testimonial.name}
            service={testimonial.service}
            review={testimonial.review}
            image={testimonial.image}
          />
        ))}
        </div>
      
      </Marquee>
      <Marquee
        gradient={false}
        speed={50}
        direction="right"
       
      >
        <div className="grid  grid-cols-4  gap-8 lg:gap-6 px-4 md:w-screen mb-5">
        {testimonials.slice(4, 8).map((testimonial, index) => (
          <TestimonialCard
            key={index}
            name={testimonial.name}
            service={testimonial.service}
            review={testimonial.review}
            image={testimonial.image}
          />
        ))}
        </div>
       
      </Marquee>
    </div>
  );
};

export default TestimonialSection;
