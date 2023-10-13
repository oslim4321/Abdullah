import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const Accordian = ({ title, info }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAccordionClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="accordion bg-[#FFFFFF] rounded-md border border-[#EAF0FF] mb-4 overflow-hidden">
      <div
        className={`accordion bg-[#e9f2fa] rounded-md border border-[#EAF0FF] p-2 flex justify-between 
           "text-black" font-[600]
        }`}
        onClick={handleAccordionClick}
      >
        {title}
        <button className="btn-zzz" onClick={() => setIsExpanded(prevState => !prevState)}>
          {isExpanded ?  <AiOutlineMinus /> : <AiOutlinePlus />}
        </button>
      </div>
      <div className={` transition-all duration-700 ease-linear overflow-hidden ${isExpanded ? 'duration-300 max-h-[500px]' : 'max-h-0'}`}>
                <p className="p-4 ">
                    {info}
                </p>
            </div>
    </div>
  );
};

export default Accordian;
