import React, { useRef } from "react";
import { FaStar } from "react-icons/fa";

// TestimonialCard component for individual cards
const TestimonialCard = ({ name, service, review }) => {
  return (
    <div className="bg-transparent rounded-lg shadow-md p-4 m-3 w-80 flex-shrink-0">
      {/* User image */}
      <div className="flex items-center mb-4">
        <img
          className="w-12 h-12 rounded-full"
          src="https://via.placeholder.com/150" // Replace with actual image
          alt="User"
        />
        <div className="ml-4">
          <div className="flex items-center">
            {/* Star ratings */}
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-yellow-500" />
            ))}
          </div>
          <h4 className="font-bold">{service}</h4>
        </div>
      </div>
      <p className="text-gray-600">{review}</p>
    </div>
  );
};

const TestimonialSection = () => {
  const testimonials = [
    {
      name: "Jane Doe",
      service: "Multiple drop-off points",
      review:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      name: "John Smith",
      service: "Tiffin Delivery",
      review:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      name: "Alice Johnson",
      service: "Picked Up Keys",
      review:
        "Lorem Ipsum has been the industry's standard dummy text ever since.",
    },
    {
      name: "Emily Davis",
      service: "Rakhi Delivery",
      review:
        "Lorem Ipsum has been the industry's standard dummy text ever since.",
    },
    {
      name: "Robert Brown",
      service: "Document Delivery",
      review:
        "Lorem Ipsum has been the industry's standard dummy text ever since.",
    },
    {
      name: "Emily Davis",
      service: "Rakhi Delivery",
      review:
        "Lorem Ipsum has been the industry's standard dummy text ever since.",
    },
    {
      name: "Robert Brown",
      service: "Document Delivery",
      review:
        "Lorem Ipsum has been the industry's standard dummy text ever since.",
    },
  ];

  return (
    <div className="bg-transparent py-8">
      {/* Row 1 - Left to Right Scrolling */}
      <div className="overflow-hidden">
        <div className="flex animate-scroll-left-to-right whitespace-nowrap">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              service={testimonial.service}
              review={testimonial.review}
            />
          ))}
          {/* Duplicate cards for continuous loop */}
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index + testimonials.length}
              name={testimonial.name}
              service={testimonial.service}
              review={testimonial.review}
            />
          ))}
        </div>
      </div>

      {/* Row 2 - Right to Left Scrolling */}
      <div className="overflow-hidden">
        <div className="flex animate-scroll-right-to-left whitespace-nowrap">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              service={testimonial.service}
              review={testimonial.review}
            />
          ))}
          {/* Duplicate cards for continuous loop */}
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index + testimonials.length}
              name={testimonial.name}
              service={testimonial.service}
              review={testimonial.review}
            />
          ))}
        </div>
      </div>
    </div>
  );
};


export default TestimonialSection;