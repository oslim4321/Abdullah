import Banner from "../components/Banner"
import Header from "../components/layout/Header"
import Footer from "../components/layout/Footer"
import {  Work_Sans } from "next/font/google";
import Image from 'next/image'

const font6 = Work_Sans({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});
function contact() {
  return (
    <div className="w-full">
    <Header/>
    <Banner title="Contact Us" para="Contact"/>
    <div className="w-full py-[5rem] flex md:flex-row md:justify-center flex-col items-center   ">

        <div className="md:w-[50%] w-full md:py-4 px-6">
            <div><h2 className={`text-[24px] font-[500] ${font6.className}`}>Contact Us</h2></div>
            <div><h2 className={`text-[40px] font-[700] mb-2 mt-1 ${font6.className} `}>Get in Touch With Us</h2></div>
            <div><p className="text-[16px] font-[400]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p></div>
            <div className='mx-2 my-7'>
                <div className='flex items-center mb-5'>
                    <div className='flex justify-center items-center h-10 w-10  rounded-md bg-[#1E7FCB]'><Image src='/assets/location.svg' alt='location' height={13} width={13}/></div>
                    <div className='flex flex-col ml-3'>
                        <p className='text-[18px] font-[500]'>Our Location</p>
                        <p>99n S.t Milinum Park Paris France</p>
                    </div>
                </div>

                <div className='flex items-center mb-5'>
                    <div className='flex justify-center items-center h-10 w-10  rounded-md bg-[#1E7FCB]'><Image src='/assets/email.svg' alt='location' height={16} width={16}/></div>
                    <div className='flex flex-col ml-3'>
                        <p className='text-[18px] font-[500]'>Email Address</p>
                        <p>Client@email.com</p>
                    </div>
                </div>

                <div className='flex items-center mb-5'>
                    <div className='flex justify-center items-center h-10 w-10  rounded-md bg-[#1E7FCB]'><Image src='/assets/phone.svg' alt='location' height={13} width={13}/></div>
                    <div className='flex flex-col ml-3'>
                        <p className='text-[18px] font-[500]'>Phone Number</p>
                        <p>+91 456677777 7</p>
                    </div>
                </div>
            </div>
        </div>

 <div className="md:w-[40%] h-full w-full mx-[1rem] py-[2rem] px-[1.6rem] rounded bg-[#1E7FCB] overflow-hidden">
  <form className="bg-transparent flex flex-col h-full">
    <input
      type='text'
      placeholder='Your Name'
      className="px-5 py-2 rounded-sm text-[16px] font-[400] mb-4 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      required
    />
    <input
      type='email'
      placeholder='Email Address'
      className="px-5 py-2 rounded-sm text-[16px] font-[400] mb-4 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      required
    />
    <input
      type='phone'
      placeholder='Phone Number'
      className="px-5 py-2 rounded-sm text-[16px] font-[400] mb-4 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      required
    />
    <textarea
      type='text'
      placeholder='Your Message'
      className="px-5 py-2 rounded-sm text-[16px] font-[400] mb-6 h-[100px] w-100 resize-none transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      required
    />
    <button
      type='submit'
      className='bg-[#F6BE00] rounded-sm text-[16px] font-[400] px-3 py-2 hover:scale-105 ease-in duration-300 transition-all'
    >
      Send Message
    </button>
  </form>
</div>


    </div>
    <Footer/>
    </div>
  )
}

export default contact