// import Image from "next/image";
// import React from "react";
// import LatestNews from "./LatestNews";

// const NewsComp = ({ posts, allTags }) => {
//   return (
//     <div>
//       <div className="grid grid-cols-12 gap-4 w-full">
//         {/* <!-- Left Column --> */}
//         <div className="col-span-3">
//           {/* filter */}
//           <div className="w-full shadow-xl rounded-lg px-3 bg-white p-2 py-5 flex flex-col gap-y-4">
//             <div>
//               <h2 className="text-black font-work-sans text-xl font-semibold">
//                 Filters
//               </h2>
//               <div className="w-[47px] h-[4px] flex-shrink-0 rounded-full bg-blue-500"></div>
//             </div>
//             {/* select */}
//             <div>
//               <label
//                 htmlFor=""
//                 className="text-black font-work-sans text-sm font-normal leading-5"
//               >
//                 Select Sector:
//               </label>
//               <select className="py-3 flex-shrink-0 rounded-md border border-gray-400 shadow-xl text-gray-400 w-full mt-3">
//                 <option value="h">Select</option>
//               </select>
//             </div>
//             {/* select */}
//             <div>
//               <label
//                 htmlFor=""
//                 className="text-black font-work-sans text-sm font-normal leading-5"
//               >
//                 Select Sector:
//               </label>
//               <select className="py-3 flex-shrink-0 rounded-md border border-gray-400 shadow-xl text-gray-400 w-full mt-3">
//                 <option value="h">Select</option>
//               </select>
//             </div>
//             {/* button filters */}
//             <div>
//               <div className="flex flex-wrap justify-center items-center gap-2">
//                 {allTags.map((tag, index) => (
//                   <button className="px-4 py-3 flex-shrink-0 rounded-lg bg-[#0F6FB9] shadow-lg text-white font-work-sans text-sm font-normal leading-5">
//                     {tag.name}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//           {/* filter end */}

//           {/* Most read */}
//           <div className="h-[400px]">
//             <div className="w-full shadow-xl rounded-lg px-3 bg-white p-2 py-5 flex flex-col gap-y-5 mt-4 h-full overflow-y-scroll custom-scrollbar">
//               <div>
//                 <h2 className="text-black font-work-sans text-xl font-semibold">
//                   Most Reads
//                 </h2>
//                 <div className="w-[47px] h-[4px] flex-shrink-0 rounded-full bg-blue-500"></div>
//               </div>
//               {/* .content */}
//               {[...Array(6)].map((elem, i) => (
//                 <div key={i} className=" border-b pb-2 my-2">
//                   <h3 className="text-black text-base font-bold leading-5">
//                     Most Reads
//                   </h3>
//                   <p className="text-grap-200 text-ellipsis text-sm font-[100] leading-5 tracking-wider capitalize w-[90%]">
//                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                     ....
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//           {/* Most read end */}
//         </div>

//         {/* <!-- Middle Column (Resizable) --> */}
//         <div className="col-span-1 md:col-span-6 ">
//           <div className="h-[450px]">
//             <Image
//               className="w-full h-full flex-shrink-0 rounded-md"
//               src="/assets/photo-1580698543091-88c76b323ff1.jfif"
//               width={500}
//               height={500}
//               objectFit="cover"
//             />
//           </div>
//           <LatestNews posts={posts} />
//         </div>

//         {/* <!-- Right Column --> */}
//         <div className="col-span-3 flex flex-col gap-4 h-[400px]">
//           <div>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="299"
//               height="197"
//               viewBox="0 0 299 197"
//               fill="none"
//             >
//               <path
//                 d="M0 9.64898C0 4.31999 4.46223 0 9.96667 0H289.033C294.538 0 299 4.32 299 9.64898V187.351C299 192.68 294.538 197 289.033 197H9.96667C4.46224 197 0 192.68 0 187.351V9.64898Z"
//                 fill="black"
//                 fill-opacity="0.45"
//               />
//               <path
//                 d="M0 9.64898C0 4.31999 4.46223 0 9.96667 0H289.033C294.538 0 299 4.32 299 9.64898V187.351C299 192.68 294.538 197 289.033 197H9.96667C4.46224 197 0 192.68 0 187.351V9.64898Z"
//                 fill="url(#paint0_linear_40_1301)"
//               />
//               <defs>
//                 <linearGradient
//                   id="paint0_linear_40_1301"
//                   x1="0"
//                   y1="0"
//                   x2="84.1039"
//                   y2="262.829"
//                   gradientUnits="userSpaceOnUse"
//                 >
//                   <stop stop-color="#1C32FB" stop-opacity="0.91" />
//                   <stop offset="1" stop-color="#1CFBE0" stop-opacity="0.6" />
//                 </linearGradient>
//               </defs>
//             </svg>
//           </div>
//           <div>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="299"
//               height="197"
//               viewBox="0 0 299 197"
//               fill="none"
//             >
//               <path
//                 d="M0 9.64898C0 4.31999 4.46223 0 9.96667 0H289.033C294.538 0 299 4.32 299 9.64898V187.351C299 192.68 294.538 197 289.033 197H9.96667C4.46224 197 0 192.68 0 187.351V9.64898Z"
//                 fill="black"
//                 fill-opacity="0.45"
//               />
//               <path
//                 d="M0 9.64898C0 4.31999 4.46223 0 9.96667 0H289.033C294.538 0 299 4.32 299 9.64898V187.351C299 192.68 294.538 197 289.033 197H9.96667C4.46224 197 0 192.68 0 187.351V9.64898Z"
//                 fill="url(#paint0_linear_40_1301)"
//               />
//               <defs>
//                 <linearGradient
//                   id="paint0_linear_40_1301"
//                   x1="0"
//                   y1="0"
//                   x2="84.1039"
//                   y2="262.829"
//                   gradientUnits="userSpaceOnUse"
//                 >
//                   <stop stop-color="#1C32FB" stop-opacity="0.91" />
//                   <stop offset="1" stop-color="#1CFBE0" stop-opacity="0.6" />
//                 </linearGradient>
//               </defs>
//             </svg>
//           </div>
//           <div>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="299"
//               height="197"
//               viewBox="0 0 299 197"
//               fill="none"
//             >
//               <path
//                 d="M0 9.64898C0 4.31999 4.46223 0 9.96667 0H289.033C294.538 0 299 4.32 299 9.64898V187.351C299 192.68 294.538 197 289.033 197H9.96667C4.46224 197 0 192.68 0 187.351V9.64898Z"
//                 fill="black"
//                 fill-opacity="0.45"
//               />
//               <path
//                 d="M0 9.64898C0 4.31999 4.46223 0 9.96667 0H289.033C294.538 0 299 4.32 299 9.64898V187.351C299 192.68 294.538 197 289.033 197H9.96667C4.46224 197 0 192.68 0 187.351V9.64898Z"
//                 fill="url(#paint0_linear_40_1301)"
//               />
//               <defs>
//                 <linearGradient
//                   id="paint0_linear_40_1301"
//                   x1="0"
//                   y1="0"
//                   x2="84.1039"
//                   y2="262.829"
//                   gradientUnits="userSpaceOnUse"
//                 >
//                   <stop stop-color="#1C32FB" stop-opacity="0.91" />
//                   <stop offset="1" stop-color="#1CFBE0" stop-opacity="0.6" />
//                 </linearGradient>
//               </defs>
//             </svg>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewsComp;
