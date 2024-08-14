// /components/Carousel.js
import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleItems = 5; // Number of items visible in the carousel

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - visibleItems : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - visibleItems ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const autoScroll = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(autoScroll);
  }, []);

  return (
    <div className="relative">
      <div className="flex justify-end items-center space-x-2 mb-4 absolute top-0 right-0 z-20">
        <button onClick={handlePrev} className="bg-white rounded-full shadow-lg p-2">
          <ArrowLeft size={24} />
        </button>
        <button onClick={handleNext} className="bg-white rounded-full shadow-lg p-2">
          <ArrowRight size={24} />
        </button>
      </div>
      <div className="flex overflow-hidden">
        <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100 / visibleItems}%)` }}>
          {items.map((item, index) => (
            <div key={index} className="flex-none w-1/5 p-1">
              <div className="p-1 bg-white rounded-xl shadow-lg">
                <div className="flex flex-col items-center p-4">
                  <img src={item.src} height={100} width={100} alt={item.label} />
                  <span className="mt-2">{item.label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
