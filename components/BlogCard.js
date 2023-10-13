import Image from "next/image";
import { Work_Sans } from "next/font/google";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";

const font = Work_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});

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

const BlogCard = ({ blog, index }) => {
  console.log("🚀 ~ file: BlogCard.js:33 ~ BlogCard ~ blog:", blog);
  return (
    <div
      className={`rounded-md relative flex flex-col justify-center ${
        index === 0 ? "w-full" : " w-full lg:max-w-[480px]"
      }  shadow-md `}
    >
      <Link href={`/News/${blog?.id}`}>
        <div
          style={{
            background: `url('${blog?.thumbnail}')`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          className={`w-full flex flex-col justify-end p-5  ${
            index == 0 ? "h-[500px] rounded-lg" : "h-[400px] rounded-md"
          }`}
        >
          {index === 0 ? (
            <div
              className="w-full p-3 min-h-[130px] rounded-md"
              style={{ background: "rgba(255, 255, 255, 0.75)" }}
            >
              <h1 className="text-[#000] md:text-ellipsis whitespace-nowrap overflow-ellipsis md:whitespace-normal font-medium md:text-2xl text-lg">
                {blog?.title}
              </h1>
            </div>
          ) : (
            <></>
          )}

          <div
            style={{ background: "rgba(255, 255, 255, 0.75)" }}
            className="p-3 absolute font-medium top-3 rounded-md self-start"
          >
            {blog?.tagsData[0]?.name}
          </div>
        </div>
      </Link>

      {index !== 0 && (
        <div className="p-5">
          <div className="flex justify-between">
            <p className="flex-1 font-medium pr-4  whitespace-nowrap overflow-hidden overflow-ellipsis">
              {blog?.title}
            </p>
            <p>{formateDate(blog?.date)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogCard;
