import Image from "next/image";
import React from "react";
import SocialMediaButtons from "./SocialMediaButtons";
import AddComment from "./AddComment";
import CommentLists from "./CommentLists";

const SingleBlogComp = ({ news, recentBlogs }) => {
  function formateDate(timpstamp) {
    const date = new Date(timpstamp);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedDate = `${day} ${month}, ${year} ${hours % 12}:${minutes}${
      hours >= 12 ? "PM" : "AM"
    }`;
    return formattedDate;
  }
  return (
    <>
      <div className="grid grid-cols-12 gap-4 w-full ">
        <div className="md:col-span-9 col-span-12 ">
          <div className="h-[400dpx] bg-[#F7FBFF] px-5 py-3 rounded">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-4">
              {news.title}
            </h1>
            <Image
              className="w-full h-[400px] flex-shrink-0 rounded-md"
              src={news?.thumbnail}
              width={500}
              height={500}
              objectFit="cover"
              alt={news.title}
            />
          </div>
          {/* News Details goes here eg comment, date and category */}
          <div className="flex justify-around items-center py-7 gdap-x-5">
            {/* date */}
            <div className="flex gap-x-3">
              <Image src="/assets/date.png" alt="date" width={20} height={20} />
              <p className="text-gray-400 text-sm font-medium leading-5 tracking-wide uppercase">
                {formateDate(news.date).substring(0, 12)}
              </p>
            </div>
            <p className="text-gray-400 text-sm font-medium leading-5 tracking-wide uppercase">
              comments : 35
            </p>
            <p className="text-gray-400 text-sm font-medium leading-5 tracking-wide uppercase">
              Category : sport
            </p>
          </div>

          {/* NEw Content Goes here  */}
          <div>
            <h3 className="text-gray-600 text-base font-medium capitalize mb-4">
              101 tons Shipment Arrives At Lorem Epsum Port{" "}
            </h3>
            {/* description */}
            <p className="text-gray-500 font-roboto text-xl font-normal leading-10 lowercase">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
              sem. Nulla consequat massa quis enim. Donec pede justo, fringilla
              vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
              imperdiet a, venenatis vitae, justo.{" "}
            </p>
          </div>
          {/* second phrase */}
          <div className="h-[400px] border my-10">
            <Image
              className="w-full h-full flex-shrink-0 rounded-md"
              src="/assets/ship2.jpg"
              width={500}
              height={500}
              objectFit="cover"
            />
          </div>

          {/* NEw Content Goes here  */}
          <div>
            <h3 className="text-gray-600 text-base font-medium capitalize mb-4">
              Not how long, but how well you have lived is the main thing.
            </h3>
            {/* description */}
            <p className="text-gray-500 font-roboto text-xl font-normal leading-10 lowercase">
              <div dangerouslySetInnerHTML={{ __html: news.description }} />
            </p>
          </div>
        </div>
        <div className="md:col-span-3 col-span-12 md:h-[400px]">
          <div className="h-[500px]">
            <div className="flex items-center gap-x-3 mb-5">
              <div className="w-2 h-5 rounded-full bg-[#F81539]"></div>
              <h2 className="text-black font-work-sans text-xl font-semibold">
                Recents News
              </h2>
            </div>
            <div className="w-full shadow-xl rounded-lg px-3 bg-[#F7FBFF] p-2 py-5 flex flex-col gap-y-5 mt-4 h-full overflow-y-scroll custom-scrollbar">
              {/* .content */}
              {recentBlogs.map((recent, i) => (
                <div
                  key={i}
                  onClick={() =>
                    router.push({ pathname: `/News/${recent?.id}` })
                  }
                  className=" border-b pb-2 my-2 flex justify-start items-center gap-3"
                >
                  <Image
                    className="w-[70px] h-[80px] rounded-xl"
                    src={recent?.thumbnail}
                    width={100}
                    height={100}
                    objectFit="cover"
                  />
                  <div>
                    <h3 className="text-black text-base font-bold leading-5">
                      {recent.title}
                    </h3>
                    {/* <p className="text-grap-200 text-ellipsis text-sm font-[100] leading-5 tracking-wider capitalize w-[90%]">{recent.description}</p> */}
                    <p className="text-[13px] xl:text-md font-medium text-[#77777777]">
                      {formateDate(recent?.date)?.substring(0, 12)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <SocialMediaButtons />
      <CommentLists />
      <AddComment />
    </>
  );
};

export default SingleBlogComp;
