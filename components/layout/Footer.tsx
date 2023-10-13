import React from "react";
import Wrapper from "../shared/Wrapper";
import Image from "next/image";
import Link from "next/link"
import {
  BiMessageRounded,
  BiLogoFacebook,
  BiLogoLinkedin,
  BiLogoInstagramAlt,
} from "react-icons/bi";
const Footer = () => {
  return (
    <footer className="bg-[#e9f2fa] pt-10 pb-2">
      <Wrapper>
        <div className="flex justify-center items-center flex-col gap-6">
          <div className="">
            <Image
              src={"/assets/logoFooter.svg"}
              alt=""
              width={100}
              height={100}
            />
          </div>
          <div>
            <ul className="flex gap-2 md:gap-8">
              <li><Link href="/login">Log in</Link></li>
              <li><Link href="/login">Join Us</Link></li>
              <li><Link href="/inquiry">Inquiry</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="flex gap-6">
           <Link href="" className="bg-blue-200 rounded-full p-2">
           <BiLogoFacebook className="text-blue-500 "/>
           </Link>
           <Link href="" className="bg-blue-200  rounded-full p-2">
           <BiLogoLinkedin className="text-blue-500 "/>
           </Link>
           <Link href="" className="bg-blue-200  rounded-full p-2">
           <BiLogoInstagramAlt className="text-blue-500 "/>
           </Link>
           <Link href="" className="bg-blue-200  rounded-full p-2">
           <BiMessageRounded className="text-blue-500 "/>
           </Link>
          </div>
        </div>
      </Wrapper>
      <div className="border-t border-[#C7C7C7] mt-6"></div>
      <div>
        <ul className="flex flex-col md:flex-row justify-around items-center px-8 py-4">
          <li>Design and Developed by: ZySoftec</li>
          <li>
            <Link href="">www.zysoftec.com</Link>
          </li>
          <li>
            <Link href="/">Privacy & Policy</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;