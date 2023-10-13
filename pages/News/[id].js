import { useRouter } from "next/router";
import Banner from "../../components/Banner";
import { Work_Sans } from "next/font/google";
import { Nunito_Sans } from "next/font/google";
import Image from "next/image";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { useEffect, useState } from "react";
import { getAllNewsWithTagsRecentsFirst, getNewsById } from "../../lib/news";
import { Spin, message } from "antd";
import SingleBlogComp from "./SingleBlogComp";

const font = Work_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});
const font2 = Nunito_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});

function NewsDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [news, setNews] = useState({});
  const [isNewsSpinning, setIsNewsSpinning] = useState(true);
  const [recentBlogs, setRecentBlogs] = useState([]);

  // function formateDate(timpstamp) {
  //   const date = new Date(timpstamp);
  //   const day = date.getDate();
  //   const month = date.toLocaleString("default", { month: "short" });
  //   const year = date.getFullYear();
  //   const hours = date.getHours();
  //   const minutes = date.getMinutes();

  //   const formattedDate = `${day} ${month}, ${year} ${hours % 12}:${minutes}${
  //     hours >= 12 ? "PM" : "AM"
  //   }`;
  //   return formattedDate;
  // }

  useEffect(() => {
    if (id) {
      getNewsById(id)
        .then((news) => {
          setNews(news);
        })
        .catch((err) => message.error(err.message))
        .finally(() => setIsNewsSpinning(false));
    }
  }, [id]);

  useEffect(() => {
    getAllNewsWithTagsRecentsFirst()
      .then((news) => setRecentBlogs(news))
      .catch((err) => message.error("something Went Wrong"));
  }, []);

  // no longer needde in this component

  // function formateDate(timpstamp) {
  //   const date = new Date(timpstamp);
  //   const day = date.getDate();
  //   const month = date.toLocaleString("default", { month: "short" });
  //   const year = date.getFullYear();
  //   const hours = date.getHours();
  //   const minutes = date.getMinutes();

  //   const formattedDate = `${day} ${month}, ${year} ${hours % 12}:${minutes}${
  //     hours >= 12 ? "PM" : "AM"
  //   }`;
  //   return formattedDate;
  // }

  return (
    <div>
      <Header />
      <Banner title="News" para="News" />
      <Spin spinning={isNewsSpinning}>
        {news?.id && (
          <div className="max-w-[95%] mx-auto py-20">
            <SingleBlogComp news={news} recentBlogs={recentBlogs} />
          </div>
        )}
        {/* <main className="w-full gap-5 min-h-screen flex md:flex-row flex-col flex-wrap justify-center py-10 md:px-20 px-10 items-center ">
          {news?.id && (
            <div className="w-full flex-[2]  p-4 md:p-14 bg-[#f7fbff]">
              <div className="text-center">
                Blog Title
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-4">
                  {news.title}
                </h1>
                Date and Author
              </div>

              <div className="mt-6 md:mt-8">
                <div
                  className="relative w-full h-[400px] overflow-hidden rounded-md shadow-md"
                  style={{
                    background: `url('${news?.thumbnail}')`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                >
                  <div className="absolute p-2 top-3 flex space-x-4">
                    {news?.tagsData?.map((tag) => (
                      <div className="bg-[#DFECF6] rounded-md p-3">
                        {tag?.name}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center mt-7 justify-center">
                  <div className="flex items-center mr-4">
                    <Image
                      src="/assets/date.png"
                      alt="date"
                      width={20}
                      height={20}
                    />
                    <p className="ml-2 text-gray-600 text-sm">
                      {formateDate(news.date).substring(0, 12)}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Image
                      src="/assets/icon1.png"
                      alt="author"
                      width={15}
                      height={15}
                      className="obje"
                    />
                    <p className="ml-2 text-gray-600 text-sm">
                      {news.author || "Admin"}
                    </p>
                  </div>
                </div>
                Use the "prose" class for your blog content
                <div className="prose lg:prose-xl mt-6 ">
                  Use a container to take full width
                  <div className="w-full">
                    Render the HTML content for the blog description
                    <div
                      dangerouslySetInnerHTML={{ __html: news.description }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-col self-start justify-center items-center flex-1 h-full">
            <div className="mdd:block h-[500px] bg-white p-4 w-full shadow md:w-full">
              <h2 className="text-lg font-semibold mb-4">Recent News</h2>
              {recentBlogs.map((recent, index) => (
                <div
                  key={index}
                  className="flex w-full my-10 cursor-pointer items-start"
                  onClick={() =>
                    router.push({ pathname: `/News/${recent?.id}` })
                  }
                >
                  <div className="w-16 h-16 flex-shrink-0">
                    <Image
                      src={recent?.thumbnail}
                      alt="blog"
                      width={80}
                      height={80}
                      objectFit="cover"
                    />
                  </div>
                  <div className="ml-4 flex flex-col flex-grow">
                    <div>
                      <p className="text-[13px] xl:text-md font-medium text-[#77777777]">
                        {formateDate(recent?.date)?.substring(0, 12)}
                      </p>
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium text-sm xl:text-[16px] leading-6 line-clamp-3">
                        {recent.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main> */}
      </Spin>
      <Footer />
    </div>
  );
}

export default NewsDetails;
