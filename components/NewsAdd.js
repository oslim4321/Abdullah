import React from "react";

const NewsAdd = () => {
  return (
    <div className="p- flex flex-wrap md:flex-col justify-center items-center space-6 gap-10 ">
      <div
        className="w-[299px] h-[197px] rounded-lg"
        style={{
          backgroundImage:
            "linear-gradient(154.1deg, rgba(28, 50, 251, 0.91) 0%, rgba(28, 251, 224, 0.6) 99%)  ,url('https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>

      <div
        className="w-[299px] relative h-[197px] rounded-lg"
        style={{
          backgroundImage:
            "  linear-gradient(0deg, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)) ,url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60')",
          backgroundPosition: "top",
          backgroundSize: "cover",
          boxShadow: " 0px 4px 25px 0px #00000012",
        }}
      ></div>
      <div
        className="w-[299px] relative h-[197px] rounded-lg"
        style={{
          backgroundImage:
            "  linear-gradient(0deg, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)) ,url('https://images.unsplash.com/photo-1485518882345-15568b007407?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZhc2hpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60')",
          backgroundPosition: "top",
          backgroundSize: "cover",
          boxShadow: " 0px 4px 25px 0px #00000012",
        }}
      ></div>
    </div>
  );
};

export default NewsAdd;
