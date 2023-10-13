import { Roboto } from "next/font/google";
import { Work_Sans } from "next/font/google";
import CalculateDate from '../lib/calculateDaysLeft'
import {CiLocationOn} from 'react-icons/ci'
import Link from 'next/link';
import daysLeftUntilDate from "../lib/calculateDaysLeft";
import { LocationCity } from "@mui/icons-material";
const font2 = Work_Sans({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});

const font = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});

function formatTimestamp(timestamp) {
  const date = new Date(timestamp * 1000); // Convert UNIX timestamp to milliseconds
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours() % 12 || 12).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
  return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
}


function InquiryLists({ inquiries }) {

  return (
    <div className="">
      <div className="w-full md:p-10 p-5 flex flex-wrap justify-around gap-6 items-center">
        {inquiries.map((data, index) => (
          
          <div key={index} className="w-[518px] flex h-[318px] overflow-auto bg-[#fff] rounded-[5px]" style={{boxShadow: "0px 4px 26px 0px rgba(0, 0, 0, 0.12)"}}>
             <div className="w-[32px] bg-[#1E7FCB] h-full"></div>
             <div className="h-full p-6 w-full space-y-3">

              <div className="flex justify-between">
                <p className="text-[#999] text-sm font-normal">{formatTimestamp(data.createdAt)}</p>
                <p className="text-[#D39C0D] font-normal">{CalculateDate(data?.eta)}</p>
              </div>

              <h1 className="text-[#3A3A3A] text-lg font-medium">{data?.userName}</h1>
              <div className="flex items-center  space-x-2"><p>{<CiLocationOn/>} </p><p className="text-[##5F5F5F]">{data?.country}</p></div>

              <div className="flex items-center space-x-1">
                  <span className="text-[#000] font-medium">Brand: </span>
                  <p className="text-[#1E7FCB]">{data[0]?.equipments?.brandAndManufacturer || ""}</p>
              </div>
              <div className="flex items-center space-x-1">
                  <span className="text-[#000] font-medium">Model: </span>
                  <p className="text-[#1E7FCB]">{data[0]?.equipments?.model || ""}</p>
              </div>
              <div>
                  <span className="text-[#000] font-medium">Items: </span>
                  <div className="flex space-x-2 mb-2 items-center">
                     {data[0]?.items?.map((item, index) => (
                         <div key={index} className="px-3 text-[#1E7FCB] py-1 bg-[#F6FBFF] rounded-[5px]">
                           {item?.item}
                         </div>
                     ))}
                  </div>
              </div>

              <div className="flex justify-end items-center">
                 <Link href={`/inquiry/${data?.enquiryId}`}>
                   <button className="px-4 py-2 text-[#1E7FCB] border border-[#1E7FCB] rounded hover:bg-[#1E7FCB] hover:text-white transition">
                      View & Quote
                   </button>
                 </Link>
              </div>

           </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InquiryLists;
