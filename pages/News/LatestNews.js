import { RevealWrapper } from "next-reveal";
import Image from "next/image";
import Link from "next/link";
import React from "react";

/*  <div className="flex flex-wrap w-full">
            <div className="w-full lg:mb-0 flex items-start">
              <div className="h-4 w-1 ]-500 rounded"></div>
              <h1 className=" text-xl  font-bold mb-2 text-gray-900">
                Latest News
              </h1>
              {/*  */

const LatestNews = ({ posts }) => {
  return (
    <div>
      <section className="text-gray-600 px-2 py-10">
        <div className="  mx-auto max-w-7x1">
          <div className="flex flex-wrap ">
            <h1 className=" text-xl  font-bold mb-2 text-gray-900">
              Latest News
            </h1>
            <div className="grid grid-cols-2 gap-3">
              {posts.map((blog, index) => (
                <RevealWrapper
                  //   className={
                  //     index == 0
                  //       ? "lg:col-span-4 col-span-1 lg:w-full"
                  //       : "lg:col-span-2 col-span-1 w-full lg:w-auto"
                  //   }
                  rotate={{ x: -12, y: 0, z: 0 }}
                  origin="bottom"
                  delay={200}
                  duration={1000}
                  distance="200px"
                  reset={false}
                  viewOffset={{ top: 0, right: 12, bottom: 0, left: 0 }}
                  key={blog.id}
                >
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <Link href={`/News/${blog?.id}`}>
                      <Image
                        src={blog?.thumbnail}
                        className="  rounded w-full object-cover object-center mb-6"
                        alt={blog.title}
                        width={500}
                        height={500}
                      />
                    </Link>
                    <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                      {blog?.title}
                    </h2>
                    <p className="leading-relaxed text-base">
                      Fingerstache flexitarian street art 8-bit waistcoat.
                      Distillery hexagon disrupt edison bulbche.
                    </p>
                  </div>
                </RevealWrapper>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LatestNews;
