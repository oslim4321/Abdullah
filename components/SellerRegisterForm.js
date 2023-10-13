import Link from "next/link";
import React, { useState } from "react";
import { Work_Sans } from "next/font/google";
import { Roboto } from "next/font/google";
import { countries } from "../data/countries";
import { Spin, message } from "antd";

const font666 = Work_Sans({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});

const font1 = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});

function SellerRegisterForm({ next, activeButton,otp,setOtp,isValidOtp,setIsNotValidOtp,setConfirmPassword,confirmPassword,setEmailCode,selectedCountry,handleCountryChange,isValidCode,setIsValidCode, setActiveButton, firstName, lastName, userName, email, password, phoneNumber, emailCode, setFirstName, setLastName, setUserName, setEmail, setPassword, setPhoneNumber }) {

  const [isfetching,setIsFetching] = useState(false);


        const handleEmailVerification = async (e) => {
            e.preventDefault();
            setIsFetching(true)
            try {
              // Send email to backend

              const response = await fetch("/api/send-email",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({email,emailType:"sendCode"})
              });
             
              let emailSent = await response.json();
              if(emailSent.success){
                message.success("Email Sent");
                return
              }
        
              // setVerificationStatus('code_sent');
            } catch (error) {
              console.error(error);
            }finally{
              setIsFetching(false)
            }
          };

        const handleOtpSend = async (e)=>{
          e.preventDefault();
          setIsFetching(true);
          try {
            
             let resp = await fetch("/api/send-otp",{
              method:"POST",
              headers:{"Content-Type":"application/json"},
              body:JSON.stringify({
                number:phoneNumber
              })
             })

             resp = await resp.json();
             if(resp.success){
               return message.success("OTP Sent");
             }

             message.error(resp.message);
             
          } catch (error) {
            message.error("Something went wrong");
          }
          finally{
            setIsFetching(false)
          }
        }
        
        const verifyCode = async (e,isEmail) => {
            e.preventDefault();
            setIsFetching(true)
            try {
              // Send code to backend for validation
              const response = await fetch("/api/verify-code",{
                method:"POST",
                body:JSON.stringify({
                  email,
                  code: isEmail?emailCode:otp,
                }),
                headers:{"Content-Type":"application/json"}
              })

              let status = await response.json();
              if(status.success){
                isEmail ? setIsValidCode(false) : setIsNotValidOtp(false)
                message.success(isEmail?"Email Verified":"Phone Number Verified");
                return
              }

              message.error("Invalid Code");
        
            } catch (error) {
              console.error(error);
            }finally{
              setIsFetching(false)
            }
        };
 
          
  return (
    <Spin spinning={isfetching}>
      <main className="max-w-full h-full mx-4  sm:my-[6rem] my-[4rem] md:mx-auto bg-white">
      <div className="flex w-full h-full items-center justify-center">
        <div className="sm:w-[60%] sm:h-[50%] h-auto w-auto overflow-hidden rounded-md">
          <div className="bg-landingBlue py-3 px-6 md:px-8 md:py-4 text-[16px] sm:test-base text-white md:text-medium font-normal">
            <h4 className={font666.className}>
              Please Select a Registration Method
            </h4>
          </div>
          <div className="flex w-full h-auto grow">
            <div className="w-[50%] flex  justify-center">
              <button
                className={` ${
                  activeButton === "individual"
                    ? "bg-customYellow"
                    : "bg-[#EAF0FF]"
                } ${
                  font666.className
                } w-full py-3 sm:py-4 text-[.8rem] sm:text-base text-black font-semibold`}
                onClick={() => setActiveButton("individual")}
              >
                Individual
              </button>
            </div>
            <div className="w-[50%] flex justify-center">
              <button
                className={` ${
                  activeButton === "company"
                    ? "bg-customYellow"
                    : "bg-[#e9f2fa]"
                } ${
                  font666.className
                } bg-[#e9f2fa] border-b border-slate- text-[.8rem] sm:text-base font-semibold text-black  w-full`}
                onClick={() => setActiveButton("company")}
              >
                Company
              </button>
            </div>
          </div>

          <div className="bg-[#e9f2fa] h-full w-full">
            <div className="py-10 px-6 h-full w-full">
              <div className="text-center">
                <h1
                  className={` ${font666.className}  text-xl sm:text-xl md:text-2xl font-extrabold text-black`}
                >
                  Welcome to Maglo.net
                </h1>
              </div>
              <form className="mt-3 text-black">
                <div
                  className={`grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 ${font1.className}`}
                >
                  {/* Row 1 */}
                  <div>
                    <label
                      className="text-[16px] font-normal"
                      htmlFor="firstName"
                    >
                      First Name
                    </label>
                    <input
                      required
                      type="text"
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="John"
                      className=" text-[16px] font-normal mt-2 w-full border border-gray-300 px-5 py-3 rounded focus:border-[#2D80F3] focus:outline-none focus:bg-[#F3FAFF] transition-all hover:border-[#2D80F3]"
                    />
                  </div>
                  <div>
                    <label
                      className="text-[16px] font-normal"
                      htmlFor="lastName"
                    >
                      Last Name
                    </label>
                    <input
                      requried
                      type="text"
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Doe"
                      className="text-[16px] font-normal mt-2 w-full border border-gray-300 px-5 py-3 rounded focus:border-[#2D80F3] focus:outline-none focus:bg-[#F3FAFF] transition-all hover:border-[#2D80F3]"
                    />
                  </div>

                  {/* Row 2 */}
                  <div>
                    <label
                      className="text-[16px] font-normal"
                      htmlFor="username"
                    >
                      Username
                    </label>
                    <input
                      required
                      type="text"
                      id="username"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="JohnDoe1244"
                      className="text-[16px] font-normal mt-2 w-full border border-gray-300 px-5 py-3 rounded focus:border-[#2D80F3] focus:outline-none focus:bg-[#F3FAFF] transition-all hover:border-[#2D80F3]"
                    />
                  </div>
                  {/* Row 4 */}
                  <div>
                    <label
                      className="text-[16px] font-normal"
                      htmlFor="country"
                    >
                      Select a Country
                    </label>
                    <select
                      id="country"
                      value={selectedCountry}
                      onChange={handleCountryChange}
                      className="text-[16px] font-normal mt-2 w-full border border-gray-300 px-5 py-3 rounded focus:border-[#2D80F3] focus:outline-none focus:bg-[#F3FAFF] transition-all hover:border-[#2D80F3]"
                    >
                      <option value="">Select a country</option>
                      {countries.map((country) => (
                        <option key={country.name} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-[16px] font-normal" htmlFor="email">
                      Email Address
                    </label>
                    <div className="flex relative">
                      <input
                        required
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Doejohn78@gmail.com"
                        className="text-[16px] font-normal mt-2 w-full border border-gray-300 px-5 py-3 rounded focus:border-[#2D80F3] focus:outline-none focus:bg-[#F3FAFF] transition-all hover:border-[#2D80F3]"
                      />
                      <button
                        type="button"
                        className="text-[14px] font-light bg-blue-500 text-white px-3  mt-[9px] mr-[2px] py-[9px] rounded absolute right-[3px] top-[4px]"
                        style={{ backgroundColor: "#1E7FCB" }}
                        onClick={handleEmailVerification}
                      >
                        Get Code
                      </button>
                    </div>
                  </div>
                  <div>
                    <label
                      className="text-[16px] font-normal"
                      htmlFor="emailVerificationCode"
                    >
                      Email Verification Code
                    </label>
                    <div className="flex relative ">
                      <input
                        required
                        type="text"
                        id="emailVerificationCode"
                        value={emailCode}
                        onChange={(e) => setEmailCode(e.target.value)}
                        placeholder="7788"
                        className="text-[16px] font-normal mt-2 w-full border border-gray-300 px-5 py-3 rounded  focus:border-[#2D80F3] focus:outline-none focus:bg-[#F3FAFF] transition-all hover:border-[#2D80F3]"
                      />
                      <button
                        type="button"
                        className="text-[14px] font-light bg-blue-500 text-white px-3  mt-[9px] mr-[2px] py-[9px] rounded absolute right-[3px] top-[4px]"
                        style={{ backgroundColor: "#1E7FCB" }}
                        onClick={(e)=>verifyCode(e,true)}
                      >
                        Verify
                      </button>
                    </div>
                  </div>
                  
                  {/* <button onClick={handleEmailVerification}>Send Email Verification</button> */}
                  {/* Row 3 */}
                  <div>
                    <label
                      className="text-[16px] font-normal"
                      htmlFor="createPassword"
                    >
                      Create Password
                    </label>
                    <input
                      required
                      type="password"
                      id="createPassword"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder=". . . . ."
                      className=" text-[16px] font-normal mt-2 w-full border border-gray-300 px-5 py-3 rounded focus:border-[#2D80F3] focus:outline-none focus:bg-[#F3FAFF] transition-all hover:border-[#2D80F3]"
                    />
                  </div>
                  <div>
                    <label
                      className="text-[16px] font-normal"
                      htmlFor="confirmPassword"
                    >
                      Confirm Password
                    </label>
                    <input
                      required
                      type="password"
                      id="confirmPassword"
                      placeholder=". . . . ."
                      value={confirmPassword}
                      onChange={(e)=>setConfirmPassword(e.target.value)}
                      className=" text-[16px] font-normal mt-2 w-full border border-gray-300 px-5 py-3 rounded focus:border-[#2D80F3] focus:outline-none focus:bg-[#F3FAFF] transition-all hover:border-[#2D80F3]"
                    />
                  </div>
                
                 

                  <div>
                    <label
                      className="text-[16px] font-normal"
                      htmlFor="phoneNumber"
                    >
                      Phone Number
                    </label>
                    <div className="flex relative">
                    <input
                      required
                      type="text"
                      id="phoneNumber"
                      placeholder="76897878678"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="text-[16px] font-normal mt-2 w-full border border-gray-300 px-5 py-3 rounded focus:border-[#2D80F3] focus:outline-none focus:bg-[#F3FAFF] transition-all hover:border-[#2D80F3]"
                    />
                    <button
                        type="button"
                        className="text-[14px] font-light bg-blue-500 text-white px-3  mt-[9px] mr-[2px] py-[9px] rounded absolute right-[3px] top-[4px]"
                        style={{ backgroundColor: "#1E7FCB" }}
                        onClick={handleOtpSend}
                      >Get OTP</button>
                    </div>
                  </div>
                  <div>
                    <label
                      className="text-[16px] font-normal"
                      htmlFor="emailVerificationCode"
                    >
                      Phone Verification Code
                    </label>
                    <div className="flex relative ">
                      <input
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        type="number"
                        id="emailVerificationCode"
                        placeholder="7788"
                        className="text-[16px] font-normal mt-2 w-full border border-gray-300 px-5 py-3 rounded focus:border-[#2D80F3] focus:outline-none focus:bg-[#F3FAFF] transition-all hover:border-[#2D80F3]"
                      />
                      <button
                        type="button"
                        onClick={(e)=>verifyCode(e,false)}
                        className="text-[14px] font-light bg-blue-500 text-white px-3  mt-[9px] mr-[2px] py-[9px] rounded absolute right-[3px] top-[4px]"
                        style={{ backgroundColor: "#1E7FCB" }}
                      >
                        Verify
                      </button>
                    </div>
                  </div>
                 
                </div>

                <div className="mt-5 w-full flex justify-center items-center text-[16px] font-light">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    className="mr-2 p-3"
                  />
                  <p>
                    I agree to the
                    <Link className="text-[#1E7FCB] ml-2 mr-2" href="/">
                      Terms & Conditions
                    </Link>
                    and
                    <Link className="ml-1 text-[#1E7FCB]" href="/">
                      Privacy & Policy
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
    </Spin>
  );
}

export default SellerRegisterForm;
