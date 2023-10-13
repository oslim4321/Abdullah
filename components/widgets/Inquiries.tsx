import React from "react";
import Wrapper from "../shared/Wrapper";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Roboto } from "next/font/google";
import { Work_Sans } from "next/font/google";
import { Saira_Condensed } from "next/font/google";
import calculateDaysLeft from '../../lib/calculateDaysLeft'
import { getEnquiries } from "../../lib/enquiry";
import { Spin, message } from "antd";
import Link from "next/link";

// new Splide( '.splide' ).mount( { AutoScroll } );

const font11 = Work_Sans({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});

const font99 = Saira_Condensed({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});

const font = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});

const Inquiries = () => {

  const router = useRouter();
  // const handlePage = () =>{
  //   router.push('../inquiry');
  // }

  const [enquiries, setEnquiries] = useState<any[]>([]);

  const [isSpinning, setIsSpinning] = useState(true);

  useEffect(() => {
    getEnquiries()
      .then(enquiries => setEnquiries(enquiries))
      .catch(er => message.error("Can't get enquiries"))
      .finally(() => setIsSpinning(false))
  }, [])



  return (
    <section className="bg-[#e9f2fa] py-10">
      <Wrapper>

        <Spin spinning={isSpinning}>
          <div className={`flex flex-col items-center justify-center cursor-pointer `}>
            <h1 className={` ${font11.className} font-semibold text-[24px] md:text-[40px]`}>Current Inquiries</h1>
            <div className={` flex flex-row justify-center items-center gap-3 moving-1 overflow-hidden `}>
              {enquiries?.map((enquiry, id) => (
                <div key={id} onClick={() => router.push({ pathname: `/inquiry/${enquiry?.enquiryId}` })} className=" w-[420px] h-[250px] md:h-[230px] bg-white mt-8 overflow-hidden rounded-md ">
                  <div className={`${font11.className} bg-[#1E7FCB] w-full h-8 flex justify-between items-center px-4`}>
                    <p className="text-white font-medium">
                      {enquiry?.userName}
                    </p>
                    <p className="text-white">{calculateDaysLeft(enquiry?.eta)}</p>
                  </div>

                  <div className="px-4 font-medium text-base flex flex-col pt-3 gap-y-3">
                    <p>
                      {" "}
                      Country:{" "}
                      <span className="text-[#1E7FCB]"> {enquiry?.country}</span>
                    </p>

                    <p>
                      {" "}
                      Brand: <span className="text-[#1E7FCB]"> {enquiry[0]?.equipments?.brandAndManufacturer || "N/A"}</span>
                    </p>

                    <p>
                      {" "}
                      Model: <span className="text-[#1E7FCB]"> {enquiry[0]?.equipments?.model || "N/A"}</span>
                    </p>
                    <div className="flex flex-col space-y-2">
                      {enquiry[0]?.items?.map((item: any, index: number) => (
                        <p key={index} className={`pr-10 ${index >= 3 ? 'hidden' : ''}`} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          Item: {item?.item}
                        </p>
                      ))}
                      {enquiry[0]?.items?.length > 3 && (
                        <p className="pr-10">...</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-4 mt-8">
              <button
                type="button"
                className={`bg-[#F6BE00] ${font99.className} font-[500] rounded-full w-40 h-12 flex-shrink-0 text-black hover:scale-105 ease-in duration-300 transition-all`}

              >
                Add Comments
              </button>
              <button
                type="button"
                className={`${font99.className} font-[500] bg-[#1E7FCB] rounded-full w-40 h-12 flex-shrink-0 text-white hover:scale-105 ease-in duration-300 transition-all`}

              >
                Send Inquiries
              </button>
              <Link href={"/inquiry"}>
                <button
                  type="button"
                  className={`bg-[#F6BE00] ${font99.className} font-[500] rounded-full w-40 h-12 flex-shrink-0 text-black hover:scale-105 ease-in duration-300 transition-all`}

                >
                  View All
                </button>
              </Link>

            </div>
          </div>
        </Spin>

      </Wrapper>
    </section>
  );
};

export default Inquiries;
