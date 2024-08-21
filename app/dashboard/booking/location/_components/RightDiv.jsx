"use client";
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import MapboxDialog from './MapboxDialog';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  pickupLocationState,
  dropLocationState,
  stopsState,
  pickupCoordsState,
  dropCoordsState,
  isPickupDialogOpenState,
  isDropDialogOpenState,
  openStopDialogState,
  orderTypeState,
} from '@/recoil/store';
import Image from 'next/image';

function RightDiv() {
  const [pickupLocation, setPickupLocation] = useRecoilState(pickupLocationState);
  const [dropLocation, setDropLocation] = useRecoilState(dropLocationState);
  const [stops, setStops] = useRecoilState(stopsState);
  const [pickupCoords, setPickupCoords] = useRecoilState(pickupCoordsState);
  const [dropCoords, setDropCoords] = useRecoilState(dropCoordsState);
  const [isPickupDialogOpen, setIsPickupDialogOpen] = useRecoilState(isPickupDialogOpenState);
  const [isDropDialogOpen, setIsDropDialogOpen] = useRecoilState(isDropDialogOpenState);
  const [openStopDialog, setOpenStopDialog] = useRecoilState(openStopDialogState);
  const [orderType, setOrderType] = useRecoilState(orderTypeState);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validateLocations = () => {
    const newErrors = {};
    if (!pickupLocation) {
      newErrors.pickup = 'Pickup location is required';
    }
    if (!dropLocation) {
      newErrors.drop = 'Drop-off location is required';
    }
    stops.forEach((stop, index) => {
      if (!stop.address) {
        newErrors[`stop-${index}`] = `Stop ${index + 1} location is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePickupLocationSelect = (location) => {
    setPickupLocation(location.address);
    setPickupCoords(location.location);
    setErrors((prevErrors) => ({ ...prevErrors, pickup: '' }));
  };

  const handleDropLocationSelect = (location) => {
    setDropLocation(location.address);
    setDropCoords(location.location);
    setErrors((prevErrors) => ({ ...prevErrors, drop: '' }));
  };

  const handleStopLocationSelect = (index, location) => {
    const updatedStops = [...stops];
    updatedStops[index] = {
      address: location.address,
      location: location.location,
    };
    setStops(updatedStops);
    setErrors((prevErrors) => ({ ...prevErrors, [`stop-${index}`]: '' }));
  };

  const addStop = () => {
    if (stops.length < 3) {
      setStops([...stops, { address: '', location: null }]);
    } else {
      alert('You can only add up to 3 stops.');
    }
  };

  const removeStop = (index) => {
    const updatedStops = stops.filter((_, i) => i !== index);
    setStops(updatedStops);
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[`stop-${index}`];
      return newErrors;
    });
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(stops);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setStops(items);
  };

  const handleNextClick = (e) => {
    e.preventDefault();
    if (validateLocations()) {
      setLoading(true);
      router.push('/dashboard/booking/detail-address');
    }
  };

  return (
    <div className='flex flex-col justify-center items-center h-full p-4 md:p-10 bg-white pb-10'>
      <div className='mb-5 w-full max-w-md'>
        <div className="mb-5">
          <h2 className="text-sm md:text-base font-generalMedium text-[#8B14CC]">STEP 1/6</h2>
          <div className="flex mt-4 mb-9">
            <div className="w-12 h-1 bg-[#8B14CC] rounded mx-1"></div>
            <div className="w-12 h-1 bg-gray-300 rounded mx-1"></div>
            <div className="w-12 h-1 bg-gray-300 rounded mx-1"></div>
            <div className="w-12 h-1 bg-gray-300 rounded mx-1"></div>
            <div className="w-12 h-1 bg-gray-300 rounded mx-1"></div>
            <div className="w-12 h-1 bg-gray-300 rounded mx-1"></div>
          </div>
        </div>
        <div className="flex flex-row justify-between content-center gap-5 border-2 border-black rounded-xl w-full py-1 px-3 font-generalSemiBold mb-10">
          <Button
            className={`px-2 py-2 w-1/2 rounded-xl ${orderType === 'Pickup & Drop' ? 'bg-[#8B14CC] text-white' : 'bg-white text-black'} hover:bg-white hover:text-black text-center text-base`}
            onClick={() => setOrderType('Pickup & Drop')}
          >
            Pickup & Drop
          </Button>
          <Button
            className={`px-2 py-2 w-1/2 rounded-xl ${orderType === 'Courier' ? 'bg-[#8B14CC] text-white' : 'bg-white text-black'}  hover:bg-white hover:text-black text-center text-base`}
            onClick={() => setOrderType('Courier')}
          >
            Courier
          </Button>
        </div>
        <h1 className='text-xl md:text-3xl font-bold font-filson mt-5'>{orderType}</h1>
        <p className='mt-2 text-sm md:text-lg font-generalRegular'>Enter your {orderType.toLowerCase()} addresses</p>
      </div>
      <form className='w-full max-w-md'>
        <div className='mb-7'>
          <label className='block mb-2 font-generalRegular'>Pickup address</label>
          <div className='relative'>
            <Image
              src={'/images/Arrowup.svg'} 
              width={15}
              height={18}
              className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer'
              onClick={() => setIsPickupDialogOpen(true)}
            />
            <Input
              placeholder="Enter address..."
              className='pl-10 w-full border-2 border-black border-opacity-25 h-12 rounded-xl focus:border-0 focus:ring-0'
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
            />
            {errors.pickup && <p className="text-red-500">{errors.pickup}</p>}
          </div>
        </div>
        <div className='mt-5'>
          <label className='block mb-2 font-generalRegular'>Drop-off address</label>
          <div className='relative'>
            <Image
              src={'/images/Arrowdown.svg'} 
              width={15}
              height={18}
              className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer'
              onClick={() => setIsDropDialogOpen(true)}
            />
            <Input
              placeholder="Enter address..."
              className='pl-10 w-full border-2 border-black border-opacity-25 h-12 rounded-xl  focus:border-0 focus:ring-0'
              value={dropLocation}
              onChange={(e) => setDropLocation(e.target.value)}
            />
            {errors.drop && <p className="text-red-500">{errors.drop}</p>}
          </div>
        </div>
        {orderType === 'Pickup & Drop' && (
          <>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="stops">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {stops.map((stop, index) => (
                      <Draggable key={index} draggableId={`stop-${index}`} index={index}>
                        {(provided) => (
                          <div
                            className='mb-5 mt-6 '
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <label className='block mb-2 font-generalRegular'>Drop point {index + 2}</label>
                            <div className='relative'>
                              <Image
                                src={'/images/Arrowdown.svg'} 
                                width={15}
                                height={18}
                                className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer'
                                onClick={() => setOpenStopDialog(index)}
                              />
                              <Input
                                placeholder={`Enter address...`}
                                className='pl-10 w-full border-2 border-black border-opacity-25 h-12 rounded-xl focus:border-0 focus:ring-0'
                                value={stop.address}
                                onChange={(e) => {
                                  const updatedStops = [...stops];
                                  updatedStops[index] = {
                                    ...updatedStops[index],
                                    address: e.target.value,
                                  };
                                  setStops(updatedStops);
                                }}
                              />
                              <MinusCircle
                                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer'
                                onClick={() => removeStop(index)}
                              />
                              {errors[`stop-${index}`] && <p className="text-red-500">{errors[`stop-${index}`]}</p>}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <Button variant="ghost" type="button" className="mt-5 font-generalRegular hover:bg-white hover:text-[#0094B2]" onClick={addStop}> + Add Stop</Button>
          </>
        )}
        <div>
          <Button
            className='mt-7 w-full bg-[#8B14CC] hover:bg-[#8B14CC] rounded-xl font-generalRegular'
            onClick={handleNextClick}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Next'}
          </Button>
        </div>
      </form>
      <MapboxDialog
        isOpen={isPickupDialogOpen}
        onClose={() => setIsPickupDialogOpen(false)}
        onSelectLocation={handlePickupLocationSelect}
        defaultLocation={pickupCoords}
      />
      <MapboxDialog
        isOpen={isDropDialogOpen}
        onClose={() => setIsDropDialogOpen(false)}
        onSelectLocation={handleDropLocationSelect}
        defaultLocation={dropCoords}
      />
      {stops.map((stop, index) => (
        <MapboxDialog
          key={index}
          isOpen={openStopDialog === index}
          onClose={() => setOpenStopDialog(null)}
          onSelectLocation={(location) => handleStopLocationSelect(index, location)}
          defaultLocation={stop.location}
        />
      ))}
    </div>
  );
}

export default RightDiv;
