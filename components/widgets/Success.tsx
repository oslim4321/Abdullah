import Image from "next/image";
import React from "react";
import img from "../../public/assets/success.png";
import Button from "../shared/Button";
import { Work_Sans } from "next/font/google";

const font21 = Work_Sans({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "800", "900"],
});
const Success = () => {
  return (
    <div className="bg-transparent relative flex mb-[20rem] xl:justify-center md:mb-0 max-w-[375px] md:max-w-full sm:max-w-full mx-auto md:mx-0 justify-center md:justify-start sm:justify-start ">
      <div className="w-full">
        <video className="w-full h-full top-0 mx-auto sm:h-[550px] md:w-[940px] md:h-[730px] xl:w-[60%] sm:mx-0 md:mx-0 object-fill">
          <source src="/assets/videos/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div
        className={`  bg-white w-[270px] p-5 h-[370px] sm:w-[500px] sm:h-[400px] 
      md:w-[600px] md:h-[420px] absolute z-1 flex flex-col md:p-10 sm:ml-[11rem]   smd:ml-[17rem] md:ml-[52%]  lg:ml-[41rem]   mt-[9rem] md:mt-[10rem] overflow-hidden`}>
        <h1 className={`sm:text-[30px] md:text-[40px] font-[600] ${font21.className}`}>Navigating to Success: How Working with Us Sets You Apart</h1>
        <p className="mb-6">Dont miss out on the countless opportunities that await you. Start your inquiry today and unlock the full potential of the Marine Global Network. Together, we will navigate the seas of success.</p>
        <Button text="Read more" linkTo="News" />
      </div>
    </div>
  );
};

export default Success;