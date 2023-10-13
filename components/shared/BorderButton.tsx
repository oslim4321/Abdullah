import React, { FC } from "react";
import { useRouter } from "next/router";

interface BorderButtonProps {
  text: string;
  linkTo: string;
}

const BorderButton: FC<BorderButtonProps> = ({ text, linkTo }) => {
  const router = useRouter();

  const handleButtonClick = () => {
    if (linkTo) {
      router.push(`/${linkTo}`);
    }
  };

  return (
    <div>
      <button
        type="button"
        className="bg-transparent border-black border-2 hover:border-transparent hover:bg-[#F6BE00] rounded-full w-40 h-12 flex-shrink-0 text-black hover:scale-105 ease-in duration-300 transition-all"
        onClick={handleButtonClick}
      >
        {text}
      </button>
    </div>
  );
};

export default BorderButton;
