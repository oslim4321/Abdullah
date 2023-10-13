import Image from "next/image";
import React from "react";

const CommentLists = () => {
  return (
    <div>
      {" "}
      <div className="my-10">
        <div>
          <div className="flex items-center mb-5">
            <div className="w-2 h-5 rounded-full bg-[#F81539]"></div>
            <h3 className="text-Black font-work-sans text-base font-medium capitalize ml-2">
              Comments
            </h3>
          </div>
          {/* comment list */}

          {[...Array(2)].map((elem, i) => (
            <div className="bg-[#F7FBFF] w-full rounded p-3  mb-5">
              <div className="flex justify-between items-center">
                {/* profile */}
                <div className="flex gap-3">
                  <Image
                    className="w-[100px]"
                    src={"/assets/10.png"}
                    width={400}
                    height={400}
                  />
                  <div>
                    <h5 className="text-Black text-base font-medium capitalize mb-2">
                      Jon Kantner
                    </h5>
                    <div className="flex gap-2">
                      <Image
                        src="/assets/date.png"
                        alt="date"
                        width={20}
                        height={20}
                      />
                      <p className="text-gray-400 text-sm font-medium leading-5 tracking-wide uppercase">
                        2022 04 July
                      </p>
                    </div>
                  </div>
                </div>

                {/* reply button */}
                <div>
                  <button className="text-slate-600 text-center  text-sm font-medium leading-5 tracking-wide uppercase py-2 px-4 rounded bg-slate-200 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-reply-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.921 11.9 1.353 8.62a.719.719 0 0 1 0-1.238L5.921 4.1A.716.716 0 0 1 7 4.719V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z" />
                    </svg>
                    Reply
                  </button>
                </div>
              </div>
              <p className="text-black  text-sm font-normal leading-5 tracking-wide uppercase mt-3">
                When you are ready to indulge your sense of excitement, check
                out the range of water- sports opportunities at the resort’s
                on-site water-sports center. Want to leave your stress on the
                water? The resort has kayaks, paddleboards, or the low-key pedal
                boats.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentLists;
