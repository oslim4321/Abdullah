import React from "react";
import Wrapper from "../shared/Wrapper";
import Image from "next/image";
import Success from "./Success";
import {  Work_Sans } from "next/font/google";
import {  Saira_Condensed } from "next/font/google";
import { RevealWrapper } from "next-reveal";

const font99 = Saira_Condensed({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});


const font45 = Work_Sans({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "800", "900"],
});

const WhyUs = () => {
  const data = [
    {
      image: "/assets/img.png",
      heading: "Efficiency",
      text: "Save time and effort with a single inquiry across multiple channels. Experience seamless multichannel chat with instant answers to your questions.",
    },
    {
      image: "/assets/img2.png",
      heading: "Global Reached",
      text: "Expand your business horizon by tapping into our vast global supplier network. Connect with partners worldwide and access a world of opportunities",
    },
    {
      image: "/assets/img3.png",
      heading: "Reliability",
      text: "Trust in our secure payment system as we act as an intermediary bank, safeguarding your credits until successful service provision",
    },
    {
      image: "/assets/imgg.png",
      heading: "Expertise",
      text: "Benefit from our maritime proficiency and deep understanding of your demands. Leverage our mariners' insights for enhanced growth and prosperity",
    },
  ];

  return (
    <section className="py-10 bg-shade">
      <div className=" flex flex-col justify-center items-center">
        <h1 className={`${font45.className} text-[#081840] text-[24px] md:text-[40px] font-[600]`}>Why Choose Us</h1>
        <p className="px-4 md:px-44 py-4 text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-4">
          {data.map((data, key) => (
             <RevealWrapper
             rotate={{ x: -12, y: 0, z: 0 }}
             origin="bottom"
             delay={200}
             duration={1000}
             distance="200px"
             reset={false}
             viewOffset={{ top: 0, right: 12, bottom: 0, left: 0 }}
             key={key}
           >
            <div
              
              className="w-[280px] h-[340px] bg-white drop-shadow-lg px-6 flex flex-col justify-center items-center text-center"
            >
              <Image src={data.image} alt="image" width={100} height={100} />
              <h1 className={` ${font99.className} py-4 text-[24px] font-[600]`}>{data.heading}</h1>
              <p>{data.text}</p>
            </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
      <div className=" mt-20">
        <Success />
      </div>
    </section>
  );
};

export default WhyUs;