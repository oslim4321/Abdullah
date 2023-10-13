"use client";

import React from "react";
import { useState, useEffect } from "react";
import Wrapper from "../shared/Wrapper";
import Button from "../shared/Button";
import GetQuot from "./forms/GetQuot";
import Sales from "./forms/Sales";
import {  Work_Sans } from "next/font/google";
import {  Saira_Condensed } from "next/font/google";
import { RevealWrapper } from "next-reveal";
import Typewriter from 'typewriter-effect';
import { useRouter } from "next/router";
const font6 = Work_Sans({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});

const font99 = Saira_Condensed({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});

const Hero = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const router = useRouter();

  const handleButtonClick = () => {
   
      router.push('/buyer');

  };
  
  return (
    <section className="bg-image min-h-screen w-full overflow-hidden">
        {/* <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-60 -z-[-2] "></div> */}
      <Wrapper>
        {/* parent  */}
        <div className="flex flex-col mdd:flex-row mdd:justify-between sm:justify-center items-center py-10 w-full">
          {/* right  */}
           <div className="basis-[100%] md:basis-[60%] flex flex-col mt-[1rem] md:mt-0 xl:mt-0 justify-start items-start text-white z-10">
           <RevealWrapper
             rotate={{ x: -12, y: 0, z: 0 }}
             origin="left"
             delay={200}
             duration={1000}
             distance="200px"
             reset={true}
             viewOffset={{ top: 0, right: 0, bottom: 0, left: 0 }}
            
           >
            <h1 className={`sm:text-[35px] text-[30px] font-[700] md:leading-[6rem] mdd:text-[48px]    lg:text-[63px] xxl:text-[70px] ${font6.className}  z-90`}>Bridging the Oceans</h1>
            <div className={`text-[28px] mdd:text-[36px] lg:text-[43px] md:leading-[4rem] font-[600] smd:h-[100px] mdd:w-full md:h-[160px] lg:-h[150px] xl:h-auto mr-5 xs:w-[400px] xs:h-[100px] us:h-[120px] w-full ${font6.className} z-90`}>
            <Typewriter
                options={{
                  autoStart: true,
                  loop: true,
                  delay: 50,
                  strings: [
                    "Worldwide Connections for your needs",
                    "Looking for global spare parts suppliers?",
                    "Need service engineer attendance?",
                    "Looking for a global network to boost your business?",
                    "Make MAGLO.net Your Ultimate Choice for your inquiries",
                    "Your Gateway to Worldwide Connections",
                  ],
                }}
              />
              </div>
          
              
              <div className="ws:flex-row flex flex-col ws:justify-left  items-center  gap-x-4 md:mt-5 mt-7 z-90 ">
            <Button text="Join as Supplier" linkTo="seller" />
            <button
              type="button"
              className="bg-transparent border-[#F6BE00] border-2 rounded-full w-40 h-12 us:mt-5 ws:mt-0 flex-shrink-0 text-[#F6BE00] hover:scale-105 ease-in duration-300 transition-all"
              onClick={handleButtonClick}
            >
              Join as Vendor
            </button>
            </div>
            </RevealWrapper>
          </div>
          {/* left  */}
           <div className="basis-[100%]  md:basis-[40%] mt-10 mb-7 md:mt-0 md:mb-6 z-10 ">
           <RevealWrapper
             rotate={{ x: -12, y: 0, z: 0 }}
             origin="right"
             delay={200}
             duration={1000}
             distance="200px"
             reset={false}
             viewOffset={{ top: 0, right: 12, bottom: 0, left: 0 }}
            
           >
        <div className="max-w-[450px] max-h-[530px]  bg float-right" style={{borderRadius:"5px",border:"1px solid rgba(255,255,255,0.20)",background:"rgba(0,0,0,0.20)",filter:"blur(0.5px)"}} >
      <div className="flex  border-slate-600 z-60">
        <button
          className={` w-full h-12 rounded-tl-lg  ${
            activeTab === 'tab1' ? 'bg-black/40 text-[#F6BE00]' : 'bg-black/0 text-white'
          }`}
          onClick={() => setActiveTab('tab1')}
        >
          Get Service
        </button>
        <button
          className={`w-full h-12 rounded-tr-lg ${
            activeTab === 'tab2' ?  'bg-black/40 text-[#F6BE00]' : 'bg-black/0 text-white'
          }`}
          onClick={() => setActiveTab('tab2')}
        >
          Get Spareparts
        </button>
      </div>

      {activeTab === 'tab1' && <Sales enquiryType="service"/>}
      {activeTab === 'tab2' && <Sales enquiryType="sparepart"/>}
    </div>
    </RevealWrapper>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default Hero;