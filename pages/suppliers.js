import Header from '../components/layout/Header'
import Banner from '../components/Banner'
import Footer from '../components/layout/Footer'
import Image from 'next/image'
import { useMediaQuery } from '@react-hook/media-query';
import {useState, useEffect} from 'react'
function suppliers() {
    const [isXsScreen, setIsXsScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsXsScreen(window.innerWidth >=480);
    };

    // Set initial screen size
    handleResize();

    // Listen for window resize events
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
    const supplier = [
        {
            id: 1,
            name: "Beau Alexander",
            location: "New York, USA",
            image: "/assets/supplier1.svg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
        },
        {
            id: 2,
            name: "Beau Alexander",
            location: "New York, USA",
            image: "/assets/supplier2.svg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
        },
        {
            id: 3,
            name: "Beau Alexander",
            location: "New York, USA",
            image: "/assets/supplier3.svg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
        },
        {
            id: 4,
            name: "Beau Alexander",
            location: "New York, USA",
            image: "/assets/supplier4.svg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
        },
        {
            id: 5,
            name: "Beau Alexander",
            location: "New York, USA",
            image: "/assets/supplier1.svg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
        },
        {
            id: 6,
            name: "Beau Alexander",
            location: "New York, USA",
            image: "/assets/supplier2.svg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
        },
        {
            id: 7,
            name: "Beau Alexander",
            location: "New York, USA",
            image: "/assets/supplier3.svg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
        },
        {
            id: 8,
            name: "Beau Alexander",
            location: "New York, USA",
            image: "/assets/supplier4.svg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
        },
        {
            id: 9,
            name: "Beau Alexander",
            location: "New York, USA",
            image: "/assets/supplier1.svg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
        },
        {
            id: 10,
            name: "Beau Alexander",
            location: "New York, USA",
            image: "/assets/supplier2.svg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
        }
    ];

    const regions = ["NewYork", "Arizona", 'Los Angles' ]

  const  handleLearnMore = (id) => {
    console.log(id);
  }
  const  handleTalkNow = (id) => {
    console.log(id);
  }
 
  return (
    <div>
      <Header />
      <Banner title="Supplier List" para="Seller" />

      <div className="flex justify-between items-center px-8 xs:my-[3rem]">
        <div className="flex flex-col ws:flex-row w-full ws:justify-center mt-[3rem]">
        <div className="relative  xs:mr-2">
          <select
            id="selectSupplier"
            className="block w-full mt-1 py-3 px-4 text-[#777777] text-[11px] xs:text-[16px] border border-[#1E7FCB42] focus:outline-none  focus:ring-opacity-50 rounded-md "
          >
            <option className="border-none" value="" >All Suppliers</option>
            {supplier.map((supplier, index) => (
              <option key={index} value={supplier.name}>
                {supplier.name}
              </option>
            ))}
          </select>
        </div>

        <div className="relative   xs:ml-2">
         
          <select
            id="selectRegion"
            className="block w-full mt-1 py-3 px-4 text-[#777777] text-[12px] xs:text-[16px] border border-[#1E7FCB42] focus:outline-none focus:border-primary-color focus:ring focus:ring-primary-color focus:ring-opacity-50 rounded-md "
           
          >
            <option value="">All Regions</option>
            {regions.map((region, index) => (
              <option key={region.id}  style={{ color: '#777777' }}   value={region.name}>
                {region.name}
              </option>
            ))}
          </select>
        </div>
      </div>
        </div>
       

        <div className="sm:px-8 mt-4">
        <div className="flex flex-col items-center xxl:mx-[4rem] ">
          {supplier.map((supplier) => (
            <div
              key={supplier.id}
              className="bg-white p-4 rounded-md xl:w-[80%] border border-[#1E7FCB2E] shadow-sm overflow-hidden my-[1.2rem] mx-[.9rem]"
            >
              <div className="flex xs:flex-row xs:items-start items-center flex-col">
           
                <div className=" relative  rounded-md overflow-hidden mb-4 xs:mb-0">
                  <Image src={supplier.image} alt={supplier.name}   width={isXsScreen ? 300 : 100}
                  height={isXsScreen ? 150 : 100} objectFit="contain" />
                </div>

                <div className="ml-4 flex-grow ">
                <div className="flex xs:justify-between justify-center w-full">
                <h3 className="text-[18px] font-[500] xxl:text-[21px]">{supplier.name}</h3>
                <div className="ml-4 hidden xs:block">
                <button
                  className="w-full bg-[#F6BE00] rounded-md px-4 py-1 text-[#000000]"
                  onClick={() => handleTalkNow(supplier.id)}
                >
                  Talk Now
                </button>
                    </div>
                </div>
                  
                  <div className="flex items-center justify-center xs:justify-start ">
                  <div className=" relative  ">
                  <Image src="/assets/locationSup.svg" alt='icon'  width={16} height={16} objectFit="cover" />
                </div>
                  <p className="ml-2 text-[14px] xxl:text-[18px] text-[#777777] font-[400]">{supplier.location}</p>
                  </div>
                 <div className="flex flex-col">
                 <p className="mt-2 text-[14px] xxl:text-[18px] text-gray-700 mdd:line-clamp-3 line-clamp-4 test-left">
                    {supplier.description}
                    <span className="hidden xs:inline text-blue-500 cursor-pointer" onClick={() => handleLearnMore(supplier.id)}>
                      ...Learn More
                    </span>
                  </p>
                  <span className=" inline xs:hidden text-blue-500 cursor-pointer" onClick={() => handleLearnMore(supplier.id)}>
                      ...Learn More
                    </span>
                 </div>
                 
                </div>
                <button
                  className=" xs:hidden block bg-[#F6BE00] rounded-b-md px-4 py-1 text-[#000000] mb-4 mt-4"
                  onClick={() => handleTalkNow(supplier.id)}
                >
                  Talk Now
                </button>
               
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default suppliers