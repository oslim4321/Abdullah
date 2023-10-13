import React, { FC } from "react";
import { useRouter } from "next/router";

interface ButtonProps {
  text: string;
  linkTo: string;
}

const Button: FC<ButtonProps> = ({ text, linkTo }) => {
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
        className="bg-[#F6BE00] rounded-full w-40 h-12 flex-shrink-0 text-black hover:scale-105 ease-in duration-300 transition-all"
        onClick={handleButtonClick}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
