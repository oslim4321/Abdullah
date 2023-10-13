import Image from "next/image";
import React from "react";

const Replies = () => {
  return (
    <div>
      <div className="p-10 flex gap-x-4">
        <Image
          src="/assets/Ellipse 61.svg"
          width={100}
          height={100}
          alt="profile"
          className="w-[50px] h-[50px]"
        />
        <div>
          <div className="">
            <div className="flex gap-x-4">
              <h3 className="text-Black text-base font-bold leading-6">
                oslim
              </h3>
              <p className="text-[#777] font-roboto text-base font-normal leading-6">
                30 days - Public
              </p>
            </div>
            <p className="text-Black font-roboto text-base font-normal leading-6">
              bla bla bla
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Replies;
