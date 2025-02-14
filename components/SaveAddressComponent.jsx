import { add } from 'date-fns';
import { Building, HomeIcon } from 'lucide-react';
import React, { use, useEffect, useState } from 'react'
import { RiHomeOfficeFill } from 'react-icons/ri';
import { GoHomeFill } from "react-icons/go";
import Image from 'next/image';


const Icons = {
    Home: <GoHomeFill size={15} />,
    Office: <Image src="/images/office.svg" width={20} height={20} alt="Office" />,
    Others: <Building size={15} />,
}

const SaveAddressComponent = () => {
    const [showForm, setShowForm] = useState(false);
    const [addressList , setAddressList] = useState([]);
  const [addressData, setAddressData] = useState({
    addressType: "Home",
    streetAddress: "",
    apartment: "",
    pincode: "",
    city: "",
    state: "",
  });

// Save to localStorage
const saveAddress = () => {
    let savedAddresses = JSON.parse(localStorage.getItem("addresses")) || [];
    savedAddresses.push(addressData);
    localStorage.setItem("addresses", JSON.stringify(savedAddresses));
    alert("Address saved successfully!");
    setShowForm(false);
    setAddressData({
        addressType: "Home",
    streetAddress: "",
    apartment: "",
    pincode: "",
    city: "",
    state: "",
    })
    getAddressList();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressData({ ...addressData, [name]: value });
  };

  const getAddressList = () => {
    let savedAddresses = JSON.parse(localStorage.getItem("addresses")) || [];
    setAddressList(savedAddresses);
  };

  useEffect(() => {
    getAddressList();

  }, []);

  return (
    <div className="p-5 w-full  mx-auto bg-white lg:rounded-2xl rounded-3xl shadow-lg ">
    <h2 className="text-2xl font-semibold text-gray-700 mb-4">
      Saved Addresses
    </h2>

    {/* Check if the form should be displayed or not */}
    {!showForm ? (
      <>

      {
        addressList.length > 0 ? (
            addressList.map((address, index) => ( <div key={index} className="w-full flex justfy-between text-[10px] lg:text-sm items-center border border-gray-300 rounded-lg p-2 space-x-10 mb-3">
                <div className='flex items-center gap-4 lg:text-sm'>
                <span>{Icons[address.addressType]}</span>
                <span className='font-bold '>{address.addressType}</span>
                </div>

                <span>{`${address.streetAddress}, ${address.apartment}, ${address.pincode}, ${address.city}, ${address.state}`}</span>

               
              </div>))
         
     ) :<p className="text-gray-600 mb-6">
     No saved addresses found
   </p>}
        
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-2 bg-[#F5F5F5] text-black rounded-lg lg:text-sm hover:bg-gray-100 transition-colors duration-200"
        >
          + Add a new address
        </button>
      </>
    ) : (
      <div className="mt-0">
        <h3 className="text-xl font-semibold mb-4">New Address</h3>
        <div className="flex flex-col space-y-4">
          {/* Address type radio buttons */}
          <div className="flex lg:text-sm space-x-6 ">
            {["Home", "Office", "Others"].map((type) => (
              <label
                key={type}
                className="flex items-center space-x-2 font-semibold"
              >
                <input
                  type="radio"
                  name="addressType"
                  value={type}
                  checked={addressData.addressType === type}
                  onChange={handleChange}
                />
                <span>{type}</span>
              </label>
            ))}
          </div>

          {/* Input fields for the address form */}
          <input
            type="text"
            name="streetAddress"
            placeholder="Street Address"
            value={addressData.streetAddress}
            onChange={handleChange}
            className="border-b p-2 rounded-md w-full  text-sm"
            required
          />
          <input
            type="text"
            name="apartment"
            placeholder="Office, Building, Apartment (optional)"
            value={addressData.apartment}
            onChange={handleChange}
            className="border-b p-2 rounded-md w-full  text-sm"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={addressData.pincode}
              onChange={handleChange}
              className="border-b p-2 rounded-md w-full  text-sm"
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={addressData.city}
              onChange={handleChange}
              className="border-b p-2 rounded-md w-full  text-sm"
              required
            />
          </div>
          <input
            type="text"
            name="state"
            placeholder="State"
            value={addressData.state}
            onChange={handleChange}
            className="border-b p-2 rounded-md w-1/2  text-sm"
            required
          />

          {/* Submit and cancel buttons */}
          <div className="flex gap-2 xxs:gap-0 flex-col xxs:flex-row xxs:justify-end xxs:space-x-4 mt-4">
            <button
              onClick={saveAddress}
              className="px-6 py-2 lg:text-sm bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Save Address
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="m-0 xxs:px-6 py-2 lg:text-sm bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
  )
}

export default SaveAddressComponent