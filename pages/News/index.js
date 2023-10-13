import Banner from "../../components/Banner";
import BlogCard from "../../components/BlogCard";
import { useEffect, useState } from "react";
import { Nunito_Sans } from "next/font/google";
import { DM_Sans } from "next/font/google";
import Image from "next/image";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { RevealWrapper } from "next-reveal";
import {
  getAllNewsWithTags,
  getAllNewsWithTagsRecentsFirst,
} from "../../lib/news";
import { Spin, message } from "antd";
import { getTopTags } from "../../lib/tags";
import { useRouter } from "next/router";
import NewsAdd from "../../components/NewsAdd";
import { Grid } from "antd";
import NewsComp from "./NewsComp";
import LatestNews from "./LatestNews";

const { useBreakpoint } = Grid;

const font361 = Nunito_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});

const font4 = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

function News() {
  const [news, setNews] = useState([]);
  const [isAllNewsSpinning, setIsAllNewsSpinning] = useState(true);
  const [allTags, setAllTags] = useState([]);
  const [isTagsSpinning, setIsTagsSpinning] = useState(true);
  const [selectedTag, setSelectedTag] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [isRecentBlogsSpinning, setIsRecentBlogsSpinning] = useState(true);
  const [isTagSelected, setIsTagSelected] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const breakpoints = useBreakpoint();
  console.log("🚀 ~ file: index.js:40 ~ News ~ breakpoints:", breakpoints);
  const router = useRouter();

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

  useEffect(() => {
    getAllNewsWithTagsRecentsFirst()
      .then((news) => setRecentBlogs(news))
      .catch((err) => message.error("something Went Wrong"))
      .finally(() => setIsRecentBlogsSpinning(false));
  }, []);

  useEffect(() => {
    getTopTags()
      .then((tags) => setAllTags(tags))
      .catch((err) => message.error("something Went Wrong"))
      .finally(() => setIsTagsSpinning(false));
  }, []);

  useEffect(() => {
    getAllNewsWithTags()
      .then((news) => {
        setNews(news);
      })
      .catch((err) => message.error("something Went Wrong"))
      .finally(() => setIsAllNewsSpinning(false));
  }, []);

  const filteredNews = isTagSelected
    ? news.filter((blog) => blog.tags.includes(selectedTag))
    : news;

  const totalPosts = isTagSelected ? filteredNews.length : news.length; // Update totalPosts

  const itemsPerPage = 4;

  const totalPages = Math.ceil(totalPosts / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);
  const posts = filteredNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = news.length;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (totalPages - endPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const filterNewsByTag = (tag) => {
    // If the same tag is clicked again, deselect it
    if (selectedTag === tag) {
      setSelectedTag(null);
      setIsTagSelected(false); // Set isTagSelected to false
    } else {
      setSelectedTag(tag);
      setIsTagSelected(true); // Set isTagSelected to true
    }
    setCurrentPage(1);
  };

  // work with date
  const handleDateChange = (event) => {
    setSelectedDate(posts[0].date)?.substring(0, 12);
  };
  return (
    <>
      <Header />
      <Banner title="News" para="News" />
      <div className="max-w-[95%] mx-auto mdd:py-20">
        {/* <NewsComp posts={posts} allTags={allTags} /> */}

        <div>
          <div className="grid grid-cols-12 gap-4 w-full">
            {/* <!-- Left Column --> */}
            <div className="md:col-span-3 col-span-12">
              {/* filter */}
              <div className="w-full shadow-xl rounded-lg px-3 bg-white p-2 py-5 flex flex-col gap-y-4">
                <div>
                  <h2 className="text-black font-work-sans text-xl font-semibold">
                    Filters
                  </h2>
                  <div className="w-[47px] h-[4px] flex-shrink-0 rounded-full bg-blue-500"></div>
                </div>
                {/* select */}
                <div>
                  <label
                    htmlFor=""
                    className="text-black font-work-sans text-sm font-normal leading-5"
                  >
                    Select Sector:
                  </label>
                  {/* <select >
                    <option value="h">Select</option>
                  </select> */}
                  <input
                    type="date"
                    className="py-3 flex-shrink-0 rounded-md border border-gray-400 shadow-xl text-gray-400 w-full mt-3"
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </div>
                {/* select */}
                <div>
                  <label
                    htmlFor=""
                    className="text-black font-work-sans text-sm font-normal leading-5"
                  >
                    Popular Tags:
                  </label>
                  <select className="py-3 flex-shrink-0 rounded-md border border-gray-400 shadow-xl text-gray-400 w-full mt-3">
                    <option value="h">Select</option>
                  </select>
                </div>
                {/* button filters */}
                <Spin spinning={isTagsSpinning || isAllNewsSpinning}>
                  <div className="flex flex-wrap justify-center items-center gap-2">
                    {allTags.map((tag, index) => (
                      <button
                        key={index}
                        className={`cursor-pointer flex-grow align-center text-sm m-1 px-4 py-2 rounded-md ${
                          selectedTag === tag?.id
                            ? "bg-[#1E7FCB] text-white font-bold"
                            : "bg-[#DFEBF5] text-[#1E7FCB]"
                        } ${font4.className}`}
                        onClick={() => filterNewsByTag(tag?.id)}
                      >
                        {tag.name}
                      </button>
                    ))}
                  </div>
                </Spin>
              </div>
              {/* filter end */}

              {/* Most read */}
              <div className="h-[400px]">
                <div className="w-full shadow-xl rounded-lg px-3 bg-white p-2 py-5 flex flex-col gap-y-5 mt-4 h-full overflow-y-scroll custom-scrollbar">
                  <div>
                    <h2 className="text-black font-work-sans text-xl font-semibold">
                      Most Reads
                    </h2>
                    <div className="w-[47px] h-[4px] flex-shrink-0 rounded-full bg-blue-500"></div>
                  </div>
                  {/* .content */}
                  {[...Array(6)].map((elem, i) => (
                    <div key={i} className=" border-b pb-2 my-2">
                      <h3 className="text-black text-base font-bold leading-5">
                        Most Reads
                      </h3>
                      <p className="text-grap-200 text-ellipsis text-sm font-[100] leading-5 tracking-wider capitalize w-[90%]">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        ....
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Most read end */}
            </div>

            {/* <!-- Middle Column (Resizable) --> */}
            <div className="col-span-12 md:col-span-6 ">
              <div className="h-[450px]">
                <Image
                  className="w-full h-full flex-shrink-0 rounded-md"
                  src="/assets/photo-1580698543091-88c76b323ff1.jfif"
                  width={500}
                  height={500}
                  objectFit="cover"
                />
              </div>
              <Spin spinning={isAllNewsSpinning}>
                <LatestNews posts={posts} />
              </Spin>
            </div>

            {/* <!-- Right Column --> */}

            <div className="col-span-12 md:col-span-3 flex flex-col gap-4 md:h-[400px]">
              <NewsAdd />
            </div>
          </div>
        </div>

        {/* Pagination */}
        <Spin spinning={isAllNewsSpinning}>
          <div className="flex justify-center items-center mt-[3rem] space-x-2 mb-[4rem]">
            {currentPage > 1 && (
              <button
                onClick={handlePrevious}
                className="text-[#1E7FCB] text-xl px-2 py-1 rounded-l bg-transparent border-none"
              >
                <img src="/assets/arrow-up.png" alt="Previous" />
              </button>
            )}
            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded ${
                  currentPage === page
                    ? "bg-[#1E7FCB] text-white font-bold"
                    : "bg-white text-[#1E7FCB]"
                }`}
              >
                {page}
              </button>
            ))}
            {currentPage < totalPages && (
              <button
                onClick={handleNext}
                className="text-[#1E7FCB] text-xl px-2 py-1 rounded-r bg-transparent border-none"
              >
                <img src="/assets/arrow-down.png" alt="Next" />
              </button>
            )}
          </div>
        </Spin>

        {/* OLD CODES BELOW */}

        <main className="grid md:grid-cols-[0.5fr,2fr,0.5fr] gap-4 my-5">
          {/* First Column */}
          <div className={` ${font361.className} `}>
            {/* <Spin spinning={isRecentBlogsSpinning}>
              <div className="mdd:block h-[500px] bg-white p-4 shadow md:w-[295px]">
                <h2 className="text-lg font-semibold mb-4">Recent News</h2>
                {recentBlogs.map((recent, index) => (
                  <div
                    key={index}
                    className="flex w-full my-10 cursor-pointer"
                    onClick={() =>
                      router.push({ pathname: `/News/${recent?.id}` })
                    }
                  >
                    <div className=" w-16 h-16">
                      <Image
                        src={recent?.thumbnail}
                        alt="blog"
                        width={80}
                        height={80}
                        objectFit="contain"
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <div>
                        <p className="text-[13px] xl:text-md font-medium text-[#77777777]">
                          {formateDate(recent?.date)?.substring(0, 12)}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-sm xl:text-[16px]  leading-2">
                          {breakpoints.lg ? (
                            <>{recent.title.substring(0, 20) + "..."}</>
                          ) : (
                            <>{recent.title}</>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Spin> */}

            {/* Popular Tags Section */}
            {/* <div className="mdd:block mt-4 bg-white p-4 shadow  md:w-[295px]">
              <h2 className={`${font361.className} text-lg font-semibold`}>
                Popular Tags
              </h2>
              <Spin spinning={isTagsSpinning || isAllNewsSpinning}>
                <div className="flex justify-center flex-wrap ">
                  {allTags.map((tag, index) => (
                    <p
                      className={`cursor-pointer flex-grow align-center text-sm m-1 px-4 py-2 rounded-md ${
                        selectedTag === tag?.id
                          ? "bg-[#1E7FCB] text-white font-bold"
                          : "bg-[#DFEBF5] text-[#1E7FCB]"
                      } ${font4.className}`}
                      key={index}
                      onClick={() => filterNewsByTag(tag?.id)}
                    >
                      {tag?.name}
                    </p>
                  ))}
                </div>
              </Spin>
            </div> */}
          </div>

          {/* <Spin spinning={isAllNewsSpinning}> */}
          {/* Blog Cards */}
          {/* <div
              className={`grid grid-cols-1 p-5 xs:justify-center place-content-center lg:justify-start lg:grid-cols-4 gap-4`}
              style={{ rowGap: "100px" }}
            >
              {posts.map((blog, index) => (
                <RevealWrapper
                  className={
                    index == 0
                      ? "lg:col-span-4 col-span-1 lg:w-full"
                      : "lg:col-span-2 col-span-1 w-full lg:w-auto"
                  }
                  rotate={{ x: -12, y: 0, z: 0 }}
                  origin="bottom"
                  delay={200}
                  duration={1000}
                  distance="200px"
                  reset={false}
                  viewOffset={{ top: 0, right: 12, bottom: 0, left: 0 }}
                  key={blog.id}
                >
                  <BlogCard index={index} key={blog.id} blog={blog} />
                </RevealWrapper>
              ))}
            </div> */}

          {/* </Spin> */}
          {/* <div>
           
          </div> */}
        </main>
      </div>
      <Footer />
    </>
  );
}

export default News;
