import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
const Question = ({ title, info }: any) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="question">
      <header className='flex flex-row gap-x-4' >
        <h4 onClick={() => setExpanded(!expanded)} className="">
          {title}
        </h4>
        <button className="btn-zzz" onClick={() => setExpanded(!expanded)}>
          {expanded ?  <AiOutlineMinus /> : <AiOutlinePlus />}
        </button>
      </header>
      <div className={` transition-all duration-700 ease-linear overflow-hidden ${expanded ? 'duration-300 max-h-[500px]' : 'duration-100 max-h-0'}`}>
                <p className="text-xl font-medium pb-2 dropdown">
                    {info}<br className="pt-2" />
                </p>
            </div>
    </article>
  );
};

export default Question;
