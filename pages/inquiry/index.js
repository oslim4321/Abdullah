import React, { useEffect, useState } from 'react';
import Banner from '../../components/Banner';
import InquiryData from '../../data/InquiryData';
import InquiryLists from '../../components/InquiryLists';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Image from "next/image";
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { useQuery } from '@tanstack/react-query';
import enquiryApi, { getEnquiries } from "../../lib/enquiry";
import { Spin, message } from 'antd';
import { useRouter } from 'next/router';

function Inquiry() {
  const [data,setData] = useState([]);
  const [isSpinning,setIsSpinning] = useState(true);

  useEffect(()=>{
     getEnquiries()
      .then(enquires=>setData(enquires))
       .catch(err=>message.error("Something Went Wrong"))
       .finally(()=>setIsSpinning(false))
  },[])

  const PAGE_SIZE = 6;
  const totalPosts = data?.length;
  const totalPages = Math.ceil(totalPosts / PAGE_SIZE);

  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(router?.query?.searchTerm || '');
  const [sortBy, setSortBy] = useState('recent'); // 'recent' or 'old'

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when performing a new search
  };

  const handleSort = () => {
    setSortBy((prevSort) => (prevSort === 'recent' ? 'old' : 'recent'));
  };
  

  const filteredInquiries = data?.filter(
    (data) =>
      data?.country?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      data[0]?.equipments?.brandAndManufacturer?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      data[0]?.equipments?.model?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      data[0]?.items.some((item) => item?.item?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedInquiries = sortBy === 'recent' ? filteredInquiries?.reverse() : filteredInquiries;

  const posts = sortedInquiries?.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = InquiryData.length

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (totalPages - endPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };


  return (
    <>
    <Header/>
      <Banner title="Inquiry List" />
      <Spin spinning={isSpinning}>
      <div className=" flex justify-center items-center mt-[2rem] mt[.9rem] mdd:mt-[4rem] mdd:mb-[2rem] space-x-2 w-full px-3 overflow-hidden ">
        <div className='relative w-full sm:w-[30%] flex justify-center '>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by country, brand, model or item"
          className="border-2 border-[#7aaacf92] w-full bg-[#F2F9FF] rounded px-3 py-2 focus:outline-none"
        />
             <FontAwesomeIcon icon={faSearch} className="absolute right-3 top-3 h-5 w-5 text-[#777777]" />
           </div>
        <button
          onClick={handleSort}
          className={`px-4 py-4 rounded bg-[#1E7FCB] ${
            sortBy === 'recent' ? ' text-white' : ' text-[#1E7FCB]'
          }`}
        >
          {sortBy === 'recent' ? <Image src='/assets/recent.png' width={20} height={20} alt='recent'/> : <Image src='/assets/old.png' width={20} height={20} alt='old'/>}
        </button>
      </div>
      {posts?.length > 0 ? (
        <>
          <InquiryLists inquiries={posts} />
          <div className="flex justify-center items-center mt-[3rem] space-x-2 mb-[4rem]">
            {currentPage > 1 && (
              <button
                onClick={handlePrevious}
                className="text-[#1E7FCB] text-xl px-2 py-1 rounded-l bg-transparent border-none"
              >
                <img src="/assets/arrow-up.png" alt="Previous" />
              </button>
            )}
            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded ${
                  currentPage === page ? 'bg-[#1E7FCB] text-white font-bold' : 'bg-white text-[#1E7FCB]'
                }`}
              >
                {page}
              </button>
            ))}
            {currentPage < totalPages && (
              <button
                onClick={handleNext}
                className="text-[#1E7FCB] text-xl px-2 py-1 rounded-r bg-transparent border-none"
              >
                <img src="/assets/arrow-down.png" alt="Next" />
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="text-center text-[#1E7FCB] mt-8">
          No inquiries found for the given search criteria.
        </div>
      )}
      </Spin>
      <Footer/>
    </>
  );
}

export default Inquiry;
