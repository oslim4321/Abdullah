import React from "react";
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
const Slider = ({ data }) => {
  const splideOptions = {
    type: "loop", // Enable infinite loop
    autoplay: true, // Enable autoplay
    interval: 3000, // Set autoplay interval to 3 seconds
    rewind: true,
    width : 800,
    gap   : '1rem',
  };

  return (
    <Splide options={splideOptions} className='border border-yellow-600'>
      <SplideTrack className='grid  md:grid-cols-3 gap-3 border border-green-500'>
        {data.map((item, id) => (
          <SplideSlide key={id} className="max-w-[420px] h-[250px] md:h-[230px] bg-white mt-8 rounded-md overflow-hidden">
                <div className="bg-[#1E7FCB] w-full h-8 flex justify-between items-center px-4">
                  <p className="text-white font-medium">
                    Whimson International
                  </p>
                  <p className="text-white">10 Days Left</p>
                </div>
                <div className=" px-4 font-medium text-base flex flex-col pt-3 gap-y-3">
                  <p>
                    {" "}
                    Country:{" "}
                    <span className="text-[#1E7FCB]"> {item.country}</span>
                  </p>

                  <p>
                    {" "}
                    Brand: <span className="text-[#1E7FCB]"> {item.brand}</span>
                  </p>

                  <p>
                    {" "}
                    Model: <span className="text-[#1E7FCB]"> {item.model}</span>
                  </p>

                  <p className="pr-10">Item: {item.item}</p>
                </div>
        
          </SplideSlide>
        ))}
      </SplideTrack>
    </Splide>
  );
};

export default Slider;
