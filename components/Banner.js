import Image from "next/image";
import { Work_Sans} from "next/font/google";
const font667 = Work_Sans({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});
function Banner({title, para}) {
  if(!para){
    para = title
  }
  
  return (
    <div className="border border-3">
      <div className="relative h-[12em] sm:h-auto object-cover">
        <Image
          src="/assets/banner.png"
          alt="banner-image"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "inherit", objectFit: 'cover' }}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-60"></div>
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <div className=" z-1 text-center text-white ">
            <h2 className={`font-bold md:text-4xl text-xl ${font667.className}`}>{title}</h2>
            <h4 className="sm:mt-2 mt-auto md:text-xl text-base font-inter">Home-{para}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
