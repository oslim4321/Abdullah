import React from "react";
import Wrapper from "../shared/Wrapper";
import Carousel from "./Carousel";
import {  Work_Sans } from "next/font/google";

const font54 = Work_Sans({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "800", "900"],
});

const Testimonials = () => {


  return (
    <section className="mt-10">
      <Wrapper>
        <div className={`md:my-6 ${font54.className}`}>
          <div className="text-left px-4 ">
            <h2 className="text-[24px] font-bold md:text-[40px] md:font-[800]">What Our Client Say About Us</h2>
          </div>
          <div className="overflow-hidden mx-[-20rem]" id="content">
      <Carousel />
    </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default Testimonials;