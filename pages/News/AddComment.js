import React from "react";

const AddComment = () => {
  return (
    <div className="mt-10">
      {/* <h1 className="text-2xl font-bold mb-4">Add Comment</h1> */}
      <div className="flex items-center mb-5">
        <div className="w-2 h-5 rounded-full bg-[#F81539]"></div>
        <h3 className="text-Black font-work-sans text-base font-medium capitalize ml-2">
          Add Comment
        </h3>
      </div>
      <div className="flex flex-col lg:flex-row lg:space-x-4">
        {/* Left side with input fields */}
        <div className="lg:w-1/2">
          <label htmlFor="name" className="text-sm font-semibold mb-2">
            Name
          </label>
          <input
            id="name"
            className="title bg-[#F7FBFF] border border-gray-300 p-2 mb-4 outline-none w-full"
            type="text"
          />

          <label htmlFor="website" className="text-sm font-semibold mb-2">
            Website
          </label>
          <input
            id="website"
            className="title bg-[#F7FBFF] border border-gray-300 p-2 mb-4 outline-none w-full"
            type="text"
          />

          <label htmlFor="email" className="text-sm font-semibold mb-2">
            Email
          </label>
          <input
            id="email"
            className="title bg-[#F7FBFF] border border-gray-300 p-2 mb-4 outline-none w-full"
            type="text"
          />
        </div>

        {/* Right side with textarea */}
        <div className="lg:w-1/2">
          <label htmlFor="message" className="text-sm font-semibold mb-2">
            Message
          </label>
          <textarea
            id="message"
            className="title bg-[#F7FBFF] border border-gray-300 p-2 mb-4 outline-none w-full h-48"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default AddComment;
