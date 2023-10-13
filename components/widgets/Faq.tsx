"use client"
import React from "react";
import Wrapper from "../shared/Wrapper";
import Accordian from '../Accordian'

import {  Work_Sans } from "next/font/google";
import { RevealWrapper } from "next-reveal";

const font42 = Work_Sans({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "800", "900"],
});

const Faq = () => {
  const questions = [
    {
      id: 1,
      title: "What is this website about?",
      info: "Our website serves as a platform that connects customers with reputable suppliers and service workshops. It's designed to streamline the process  of finding reliable providers for various products and services, ensuring a seamless experience for both customers and businesses.",
    },
    {
      id: 2,
      title: "How does the linking process work?",
      info: "The linking process is simple and efficient. Customers can browse through our extensive list of suppliers and service workshops, each with detailed profiles showcasing their offerings and expertise. Once customers find a suitable match, they can request quotes or book services directly through the website.",    },
    {
      id: 3,
      title: "Are the suppliers and service workshops verified?",
      info: "Yes, we take verification seriously. We carefully screen and vet allsuppliers and service workshops before listing them on our platform. We ensure they meet strict quality and reliability standards to offer customers the best options available.",    },
    {
      id: 4,
      title: "Can I review and rate suppliers or service workshops?",
      info: "Absolutely! We value customer feedback and encourage you to leave honest reviews and ratings based on your experiences. Your input helps other customers make informed decisions and ensures continuous improvement in service quality.",
    },

  ];
  const questions2 = [
    {
      id:1,
      title: "Is there any cost to use the website's services as a customer?",
      info: "No, our services are entirely free for customers. You can browse, connect with suppliers, and book services without any additional charges. You only pay the suppliers or service workshops for the products or services you choose.",
    },
    {
      id: 2,
      title: "How do I pay for the services I book through the website?",
      info: "We offer multiple secure payment options for your convenience. You can pay directly through our platform using credit/debit cards, digital wallets, or other supported payment methods, ensuring a safe and hassle-free transaction.",
    },
    {
      id: 3,
      title: "Can I customize my search for specific products or services?",
      info: "Yes, our website allows you to refine your search based on your specific needs. You can use filters to narrow down options by location, pricing, ratings, and other relevant criteria to find the perfect match for your requirements.",
    },
    {
      id: 4,
      title: "What if I encounter any issues during the linking process?",
info: "Our customer support team is always ready to assist you. If you encounter any problems, have questions, or need guidance, simply reach out to our dedicated support team via email or phone, and we'll be happy to help you resolve any concerns promptly.\n At MAGLO.net, we are committed to providing a reliable, user-friendly platform that connects you with top-tier suppliers and service workshops. If you have any further questions, don't hesitate to reach out to us. We're here to make your experience exceptional!",
    },
  ]
  return (
    <section className="py-20">
      <Wrapper>
        <div>
          <div>
            <h1 className={`md:text-[40px] text-[24px] font-bold md:font-[800] text-[#081840] text-center ${font42.className}`}>
              Frequently Ask Questions
            </h1>
            <p className="px-4 md:px-44 lg:px-44 py-4 text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation
            </p>
          </div>

          <div className="mt-5 md:mt-16  md:lg:mt-0 flex flex-col md:flex-row lg:flex-row md:gap-16 justify-center items-start max-h-[900px]">
        
            <div className="container-faq basis-[50%]">
              <section className="info md:mt-3 ">
              {questions.map((q) => (
                  <RevealWrapper
                  rotate={{ x: -12, y: 0, z: 0 }}
                  origin="bottom"
                  delay={200}
                  duration={1000}
                  distance="200px"
                  reset={false}
                  viewOffset={{ top: 0, right: 12, bottom: 0, left: 0 }}
                  key={q.id}
                >
        <Accordian key={q.id} title={q.title} info={q.info} />
        </RevealWrapper>
      ))}
              </section>
            </div>
            <div className="container-faq basis-[50%]">
              <section className="info md:mt-3 ">
              {questions2.map((q) => (
                  <RevealWrapper
                  rotate={{ x: -12, y: 0, z: 0 }}
                  origin="bottom"
                  delay={200}
                  duration={1000}
                  distance="200px"
                  reset={false}
                  viewOffset={{ top: 0, right: 12, bottom: 0, left: 0 }}
                  key={q.id}
                >
        <Accordian key={q.id} title={q.title} info={q.info} />
        </RevealWrapper>))}
              </section>
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default Faq;