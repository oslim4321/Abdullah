import { useAuth } from "../../context/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import Wrapper from "../shared/Wrapper";
import Logo from "../../public/assets/headerLogo.svg";
import Button from "../shared/Button";
import BorderButton from "../shared/BorderButton";
import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { CgMenuRightAlt } from "react-icons/cg";
import { useRouter } from "next/router";

const Header = () => {
  const [nav, setNav] = useState(false);
  const handleNavbar = () => {
    setNav(!nav);
  };

  const { isLoggedIn, user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const router = useRouter();

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setShowSuggestions(value.length > 0);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setShowSuggestions(false);
  };

  useEffect(() => {
    const dummySuggestions = [
      "ship spare parts",
      "Engine Spare Parts",
      "Engine Spare Parts",
      "Engine Spare Parts",
      "Engine Spare Parts",
    ];
    const filteredSuggestions = dummySuggestions.filter((item) =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  }, [searchQuery]);

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    router.push({ pathname: "/" });
  };

  return (
    <header className={`bg-white`}>
      <Wrapper>
        {/* parent div */}
        <div
          className={`grid gap-5 grid-cols-12 bg-white text-primary-color-text items-center md:p-0 p-5 font-normal text-base`}
        >
          {/* left section */}
          <div className="col-span-1 hidden md:block">
            <Link href={"/"}>
              <Image
                src={Logo}
                alt="Maglo"
                width={160}
                height={130}
                className="h-20 w-20 md:h-24 md:w-32"
              />
            </Link>
          </div>

          <div className="md:col-span-8 col-span-11 flex space-x-2">
            <div
              className="rounded-md flex-1 py-2 px-2"
              style={{ border: "1px solid rgba(129, 127, 127, 0.15)" }}
            >
              <input
                onChange={(e) => handleSearchChange(e.target.value)}
                value={searchQuery}
                className={`w-full h-full bg-transparent placeholder:text-gray-400 placeholder:font-extralight text-black outline-none focus:outline-none`}
                type="text"
                placeholder="Search Enquiries by category, Country, Model, brand or part"
                name=""
                id=""
              />
            </div>
            <button
              onClick={() =>
                router.push({
                  pathname: "/inquiry",
                  query: { searchTerm: searchQuery },
                })
              }
              className="py-4 px-5 hover:bg-transparent hover:text-white transition duration-700 bg-[#F6BE00] rounded-md"
            >
              Search
            </button>
          </div>

          {/* right section */}
          <div className="md:flex flex-col hidden col-span-3">
            <ul className="flex-col text-base pb-6 flex md:flex-row space-x-12 items-center mt-6 text-primary-color-text">
              <div className="text-base flex gap-x-4">
                {isLoggedIn ? (
                  <div
                    className="relative flex flex-row-reverse items-center gap-x-2 cursor-pointer"
                    onClick={handleDropdown}
                  >
                    <Image
                      src={
                        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg"
                      }
                      alt="User Profile"
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div
                      className={`mr-2 ${
                        router.pathname == "/" ? "text-white" : "text-black"
                      }`}
                    >
                      <p className="text-md font-medium">
                        {user?.firstname} dgdf {user?.lastname}
                      </p>
                      <p className="text-xs">{user?.country}</p>
                    </div>
                    {showDropdown && (
                      <div className="absolute bottom-[-120px] left-35 bg-white text-black text-center py-4 px-3 rounded shadow-lg z-20">
                        <Link
                          href={{
                            pathname: "/user",
                            query: { role: user?.role },
                          }}
                        >
                          <span className="block rounded-md px-4 py-2 hover:bg-custom-blue hover:bg-blue-300">
                            Dashboard
                          </span>
                        </Link>
                        <button
                          className="block rounded-md px-4 py-2 hover:bg-custom-red hover:bg-blue-300 w-full"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => router.push("/login")}
                      className={` md:px-8 lg:px-16 px-6  transition duration-500  rounded-full py-2 ${" border border-[#F6BE00] text-[#F6BE00] hover:bg-[#F6BE00] hover:text-black"}`}
                    >
                      Login
                    </button>
                    <Button text="Join Us" linkTo="seller" />
                  </>
                )}
              </div>
            </ul>
          </div>
          {/* menu button  */}
          <div
            onClick={handleNavbar}
            className="block md:hidden items-center cursor-pointer z-50 py-5"
          >
            {nav ? (
              <AiOutlineClose size={30} className="text-white" />
            ) : (
              <CgMenuRightAlt size={30} className="text-white" />
            )}
          </div>

          {/* mobile menu */}
          <div
            className={
              nav
                ? "sm:hidden fixed top-0 right-0 left-0 bottom-0 flex flex-col justify-center items-center w-full h-full bg-white text-black text-center ease-linear duration-300 z-20"
                : "sm:hidden fixed top-0 right-0 left-[-100%] bottom-0 flex flex-col justify-center items-center w-full h-full bg-white text-black text-center ease-linear duration-300 z-20"
            }
          >
            <div className="flex justify-center items-center">
              <Link href={"/"}>
                <Image
                  src={Logo}
                  alt="Maglo"
                  width={160}
                  height={130}
                  className="h-20 w-20 md:h-24 md:w-32"
                />
              </Link>
            </div>
            <ul className="">
              <li className="p-4 text-xl hover:text-custom-blue duration-300 cursor-pointer">
                <Link href="/seller">Seller</Link>
              </li>
              <li className="p-4 text-xl hover:text-custom-blue duration-30 cursor-pointer">
                <Link href="/buyer">Buyer</Link>
              </li>
              <li className="p-4 text-xl hover:text-custom-blue duration-30 cursor-pointer">
                <Link href="/News">News</Link>
              </li>

              <div className="text-base flex-col space-y-4 mt-4 ">
                {isLoggedIn ? (
                  <>
                    <div className="flex items-center cursor-pointer mb-4">
                      <Link
                        href={{
                          pathname: "/user",
                          query: { role: user?.role },
                        }}
                        className="flex items-center gap-x-3 "
                      >
                        <Image
                          src={
                            "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg"
                          }
                          alt="User Profile"
                          width={60}
                          height={60}
                          className="rounded-full"
                        />
                        <div className="text-left">
                          <p className="text-md font-medium">
                            {user?.firstname} {user?.lastname}
                          </p>
                          <p className="text-xs">{user?.country}</p>
                        </div>
                      </Link>
                    </div>
                    <button
                      className="bg-[#F6BE00] rounded-full w-40 h-12 flex-shrink-0 text-black hover:scale-105 ease-in duration-300 transition-all"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="text-base flex-col space-y-4">
                    <BorderButton text="Login" linkTo="login" />
                    <Button text="Join Us" linkTo="login" />
                  </div>
                )}
              </div>
            </ul>
          </div>
        </div>
        <div className={`  md:block hidden  bg-white`}>
          <ul className="flex justify-center space-x-4">
            {!isLoggedIn && (
              <>
                <Link href="/seller">
                  <li
                    className={`hover:text-[#F6BE00] duration-300 ease-in ${
                      router.pathname == "/seller"
                        ? "text-[#f6be00]"
                        : router.pathname === "/"
                        ? "text-black"
                        : "text-black"
                    } transition-all`}
                  >
                    Seller
                  </li>
                </Link>
                <Link href="/buyer">
                  <li
                    className={`hover:text-[#F6BE00] duration-300 ease-in ${
                      router.pathname == "/buyer"
                        ? "text-[#f6be00]"
                        : router.pathname === "/"
                        ? "text-black"
                        : "text-black"
                    } transition-all`}
                  >
                    Buyer
                  </li>
                </Link>
              </>
            )}
            <Link href="/News">
              <li
                className={`hover:text-[#F6BE00] duration-300 ease-in ${
                  router.pathname == "/News"
                    ? "text-[#f6be00]"
                    : router.pathname === "/"
                    ? "text-black"
                    : "text-black"
                } transition-all`}
              >
                News
              </li>
            </Link>
            <Link href="/inquiry">
              <li
                className={`hover:text-[#F6BE00] duration-300 ease-in ${
                  router.pathname == "/inquiry"
                    ? "text-[#f6be00]"
                    : router.pathname === "/"
                    ? "text-black"
                    : "text-black"
                } transition-all`}
              >
                Inquiries
              </li>
            </Link>
          </ul>
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
