import { FaGift, FaEnvelope, FaCapsules } from "react-icons/fa";
import Image from "next/image";

export const MissionCard = () => {
  return (
    <div className="relative bg-purple-500 w-96 h-80 rounded-2xl flex items-center justify-center">
      {/* Dashed Border */}
      <div
        className="absolute inset-0 rounded-2xl m-5 border border-white"
        style={{
          borderStyle: "dashed",
          borderWidth: "2px",
          borderDasharray: "12 24", // Adjust the first value for dash length, second for spacing
        }}
      ></div>

      {/* Center Content */}
      <div className="text-center relative p-4 px-16 text-xs">
        {/* Badge */}
        <div className="inline-block bg-white px-4 py-1 rounded-full mb-4">
          <span className="text-purple-500 font-semibold">Our Mission</span>
        </div>

        {/* Mission Text */}
        <h2
          className="text-white  text-lg font-light font-generalSans leading-snug"
          style={{ wordSpacing: "-3px" }}
        >
          To be a one-stop solution for all your delivery needs.
        </h2>
      </div>
    </div>
  );
};

export const DeliveryOptionsCard = () => {
  // Original imageData with image paths from your public folder
  const imageData = [
    { src: "/images/envelop.png", alt: "Gift Icon" }, // Top
    { src: "/images/gift.png", alt: "Envelope Icon" }, // Top Right
    { src: "/images/flower.png", alt: "Capsules Icon" }, // Bottom Right
    { src: "/images/Medicines1.png", alt: "Envelope Icon" }, // Bottom
    { src: "/images/jacket.png", alt: "Envelope Icon" }, // Bottom Left
    { src: "/images/parcel.png", alt: "Gift Icon" }, // Top Left
  ];

  // Adjusted positions with reduced circle radius
  const positions = [
    { x: 0, y: -100 }, // Top (was -120)
    { x: 85, y: -55 }, // Top Right (was 100, -60)
    { x: 85, y: 55 }, // Bottom Right (was 100, 60)
    { x: 0, y: 100 }, // Bottom (was 120)
    { x: -85, y: 55 }, // Bottom Left (was -100, 60)
    { x: -85, y: -55 }, // Top Left (was -100, -60)
  ];

  return (
    <div className="bg-[#F6DF5FCC] w-96 h-80 rounded-3xl relative flex items-center justify-center">
      {/* Central Image */}
      <div className="absolute z-10">
        <div className="w-24 h-24 rounded-full p-4">
          <Image
            src={"/images/iconblack.svg"} // Original central icon image
            width={60} // Set the size of the central image
            height={60}
            className="w-full h-full"
            alt="Black Icon"
          />
        </div>
      </div>

      {/* Images in a circle around the central image */}
      {imageData.map((item, index) => {
        const { x, y } = positions[index]; // Get the specific position for each icon

        return (
          <div
            key={index}
            className="absolute flex items-center justify-center"
            style={{
              transform: `translate(${x}px, ${y}px)`, // Use the updated x and y values
            }}
          >
            <div className="bg-[#FFFFFF75] rounded-full p-3 shadow-lg">
              <Image
                src={item.src} // Use the original image sources you provided
                alt={item.alt}
                width={30} // Set the size of the icons
                height={30}
                className="w-full h-full"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const MissionSection = () => {
  return (
    <div className="flex flex-col lg:my-16 lg:flex-row justify-center items-center space-y-8 md:space-y-6 md:space-x-0 lg:space-x-8 lg:space-y-0">
      <MissionCard />
      <DeliveryOptionsCard />
    </div>
  );
};

export default MissionSection;
