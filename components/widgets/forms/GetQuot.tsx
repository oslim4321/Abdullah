import React from 'react'
import {  Raleway } from "next/font/google";

const font = Raleway({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});
const GetQuot = () => {
  return (
    <div className={`${font.className}`}>GetQuot</div>
  )
}

export default GetQuot