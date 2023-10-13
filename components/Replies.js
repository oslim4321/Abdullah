import Image from "next/image";
import React from "react";
import timeAgo from "../lib/TimeAgo";

const Replies = ({ replies }) => {
  console.log(replies);
  return (
    <div>
      <div className="p-10 flex gap-x-4">
        {replies.length > 0 &&
          replies.map((elem) => (
            <div>
              <Image
                src={elem.profile}
                width={100}
                height={100}
                alt="profile"
                className="w-[50px] h-[50px]"
              />
              <div>
                <div className="">
                  <div className="flex gap-x-4">
                    <h3 className="text-Black text-base font-bold leading-6">
                      {elem.userName}
                    </h3>
                    <p className="text-[#777] font-roboto text-base font-normal leading-6">
                      {timeAgo.format(elem?.timestamp)} - Public
                    </p>
                  </div>
                  <p className="text-Black font-roboto text-base font-normal leading-6">
                    {elem.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Replies;
