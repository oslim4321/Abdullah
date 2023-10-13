import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { useState } from "react";
import { Work_Sans } from "next/font/google";
import {useAuth} from "../../context/AuthProvider";
import { useRouter } from "next/router";
import Link from "next/link";
import { Alert } from "antd";
import { Spin } from "antd";

const font6 = Work_Sans({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});

function CheckOut() {
    const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [showLazyLoader, setShowLazyLoader] = useState(false);

    const {user} = useAuth();
    const router = useRouter();
    const name = "Main Engine overhaul"
    const subtotal = 12600.00
    const storeCredit = 12600.00
    const shipping = 1600.00
    const total = 8787.00
    const [paymentMethod, setPaymentMethod] = useState("paypal"); 
    const { commentUser, inquiry} = router.query;
    console.log(inquiry)
    const [formData, setFormData] = useState({
        firstName: user ? (user.firstName || "") : "",
        lastName: user ? (user.lastName || "") : "",
        email: user ? (user.email || "") : "",
        phoneNumber: user ? (user.phoneNumber || "") : "",
        companyName: "",
        countryName: "",
        address: "",
        apartment: "",
        suiteUnit: "",
        townCity: "",
        postcodeZIP: "",
        shipToDifferentAddress: false, 
        shipAddress: "", 
        orderNotes: "", 
      });

      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
    
        if (type === "checkbox") {
          setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: checked,
            ...(name === "shipToDifferentAddress" && !checked && { shipAddress: "" }),
          }));
        } else {
          setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
          }));
        }
      };
    
  const handleSubmit = (e) => {
    e.preventDefault();
console.log(formData.companyName)
    
    // const requiredFields = ["firstName", "lastName", "email", "phoneNumber"];
    // const missingFields = requiredFields.filter(
    //   (field) => !formData[field] || formData[field].trim() === ""
    // );

    // if (formData.companyName === "" &&  formData.countryName  === "" && formData.address === "" && formData.townCity === "" && formData.postcodeZIP ==="" && !(formData.shipToDifferentAddress ? shipAddress : false )) {
    //   setAlertMessage("Please fill in all required fields.");
    //   setShowAlert(true);

    //   window.scrollTo({ top: 0, behavior: "smooth" });
    //   return;
    // }


    setShowLazyLoader(true);

    setTimeout(() => {
        setShowLazyLoader(false); 
        setIsFormSubmitted(true); 

      }, 2000);
    
    
  };

  const handleContinue = () => {
    setIsFormSubmitted(false)
    router.back()
  }

  return (
    <div>
        
      <Header />
      <div className="h-full w-full flex flex-col py-4 justify-center items-center px-7">
      {showLazyLoader && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
        <Spin size="large" tip="Processing..." />
      </div>
    )}
      {showAlert && (
        
        <Alert
          message={alertMessage}
          type={alertMessage === "Submitted" ? "success" : "error"}
          showIcon
          closable
          className="w-full mdd:text-[18px] xl:text-[20px] xxl:text-[23px]"
          onClose={() => setShowAlert(false)}
        />
      )}
        <h1 className={`mdd:text-[40px] text-[24px] xs:text-[30px] font-[600] mb-7 ${font6.className}`}>Checkout</h1>
        <div className="flex flex-col smd:flex-row mdd:justify-center   w-full">
        <div className="mdd:w-[55%] px-[2rem] py-[2rem] rounded-md shadow-md border border-[#1E7FCB24]">
          <div>
            <h3 className="text-[18px] font-[600]">Personal Information</h3>
          </div>
          <div className="mt-[1rem]">
            <form >
                <div className="border-b border-[#E3E3E3] pb-[2.4rem] mb-[1.7rem]">
              <div className="flex flex-col sm:flex-row gap-4 mb-4 ">
                <div className="flex flex-col w-full">
                  <label className="mb-1 text-[16px] font-[400]">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className={`border border-[#1E7FCB2E] p-2 rounded-md bg-[#1E7FCB0A] transition-all duration-300 focus:outline-none `}
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label className="mb-1 text-[16px] font-[400]">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className={`border border-[#1E7FCB2E] p-2 rounded-md bg-[#1E7FCB0A] transition-all duration-300 focus:outline-none `}
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex flex-col w-full">
                  <label className="mb-1 text-[16px] font-[400]">Email</label>
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    className={`border border-[#1E7FCB2E] p-2 rounded-md bg-[#1E7FCB0A] transition-all duration-300 focus:outline-none `}
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label className="mb-1 text-[16px] font-[400]">Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    className={`border border-[#1E7FCB2E] p-2 rounded-md bg-[#1E7FCB0A] transition-all duration-300 focus:outline-none `}
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex flex-col mb-4">
                <label className="mb-1 text-[16px] font-[400]">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  className={`border border-[#1E7FCB2E] p-2 rounded-md bg-[#1E7FCB0A] transition-all duration-300 focus:outline-none 
                  `}
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="mb-1 text-[16px] font-[400]">Country</label>
                <input
                  type="text"
                  name="countryName"
                  placeholder="Country Name"
                  className={`border border-[#1E7FCB2E] p-2 rounded-md bg-[#1E7FCB0A] transition-all duration-300 focus:outline-none 
                  `}
                  value={formData.countryName}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="mb-1 text-[16px] font-[400]">Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  className={`border border-[#1E7FCB2E] p-2 rounded-md bg-[#1E7FCB0A] transition-all duration-300 focus:outline-none 
                  `}
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="mb-1 text-[16px] font-[400] flex">Apartment, Suite unit etc <p className="text-[#777777] ml-1">(Optional)</p></label>
                <input
                  type="text"
                  name="apartment"
                  placeholder="Apartment"
                  className={`border border-[#1E7FCB2E] p-2 rounded-md bg-[#1E7FCB0A] transition-all duration-300 focus:outline-none 
                  `}
                  value={formData.apartment}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="mb-1 text-[16px] font-[400]">Town/City</label>
                <input
                  type="text"
                  name="townCity"
                  placeholder="Town/City"
                  className={`border border-[#1E7FCB2E] p-2 rounded-md bg-[#1E7FCB0A] transition-all duration-300 focus:outline-none 
                  `}
                  value={formData.townCity}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="mb-1 text-[16px] font-[400]">Postcode/ZIP</label>
                <input
                  type="text"
                  name="postcodeZIP"
                  placeholder="Postcode/ZIP"
                  className={`border border-[#1E7FCB2E] p-2 rounded-md bg-[#1E7FCB0A] transition-all duration-300 focus:outline-none 
                  `}
                  value={formData.postcodeZIP}
                  onChange={handleChange}
                />
              </div>
              </div>
              <div>
              <div>
                <h3 className="text-[18px] font-[600]">Shipment Details</h3>
                <div className="mb-4 mt-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="shipToDifferentAddress"
                      className="mr-2"
                      checked={formData.shipToDifferentAddress}
                      onChange={handleChange}
                    />
                    Ship to a different address?
                  </label>
                </div>
                {formData.shipToDifferentAddress && (
                  <div className="flex flex-col mb-4">
                    <label className="mb-1 text-[16px] font-[400]">Ship Address</label>
                    <input
                      type="text"
                      name="shipAddress"
                      placeholder="Ship Address"
                      className="border border-[#1E7FCB2E] p-2 rounded-md bg-[#1E7FCB0A] transition-all duration-300 focus:outline-none"
                      value={formData.shipAddress}
                      onChange={handleChange}
                    />
                  </div>
                )}
                <div className="flex flex-col mb-4">
                  <label className="mb-1 text-[16px] font-[400]">Order Notes (optional)</label>
                  <textarea
                    name="orderNotes"
                    placeholder="Order Notes"
                    className="border border-[#1E7FCB2E] p-2 rounded-md bg-[#1E7FCB0A] transition-all duration-300 focus:outline-none"
                    value={formData.orderNotes}
                    style={{resize: "none"}}
                    onChange={handleChange}
                  />
                </div>
              </div>
              </div>
            </form>
          </div>
        </div>
        <div className="rounded-md shadow-md flex flex-col mx-4 py-2 my-7 border border-[#1E7FCB24] w-full  mdd:w-[30%] h-[700px] overflow-hidden">
            <div className="border-b border-[#E3E3E3] px-[2rem] py-4">
              <h1 className="text-[16px] font-[600]">Your Order</h1>
            </div>

            <div className=" flex flex-col border-b border-[#E3E3E3] px-[2rem] py-4">
                <div className=" flex justify-between">
                <h1 className="text-[16px] font-[600]">Product</h1>
              <h1 className="text-[16px] font-[600]">Total</h1>
            </div>
    

              <div className="flex justify-between mt-2">
                <p>{name}</p>
                <p>${subtotal}</p>
              </div>

            </div>

            <div className=" flex flex-col border-b border-[#E3E3E3] px-[2rem] py-4">
            <div className=" flex justify-between mb-2">
                <h1 className="text-[16px] font-[600]">Subtotal</h1>
              <p className="text-[16px] font-[400] text-[#777777]">${subtotal}</p>
            </div>
            <div className=" flex justify-between mb-2">
                <h1 className="text-[16px] font-[600]">Store Credit</h1>
                <p className="text-[16px] font-[400] text-[#777777]">${storeCredit}</p>
            </div>
            <div className=" flex justify-between">
                <h1 className="text-[16px] font-[600]">Shipping</h1>
                <p className="text-[16px] font-[400] text-[#777777]">${shipping}</p>
            </div>
            </div>
            <div className=" flex flex-col px-[2rem] py-4">
            <div className=" flex justify-between">
                <h1 className="text-[18px] font-[600]">Total</h1>
              <p className="text-[18px] font-[600]">${total}</p>
            </div>
            </div>
            <div>
                <h3 className="text-[16px] font-[600] mt-4 mx-[2rem]">Payment Method</h3>
                <div className="flex flex-col  mb-4 mt-2 border border-[#DEF1FF66] bg-[#EAF0FF] mx-[2rem] rounded-md py-2 px-4">
                    <div className='flex items-center'>
                        
                  <div
                    className="w-4 h-4 rounded-full bg-[#1E7FCB]  flex items-center justify-center mr-2 cursor-pointer"
                    onClick={() => setPaymentMethod("paypal")}
                  >
                    {paymentMethod === "paypal" && (
                      <div className="w-2 h-2 rounded-full bg-[#EAF0FF]"></div>
                    )}
                  </div>
                  <label className="text-[16px] font-[400]">PayPal</label>
                  </div>
                 
                   <div className="my-2"><p className="text-[14px] font-[400]">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium</p></div>
                </div>
               

              </div>
              <div>
                <div className="mb-4 px-[2rem]">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="termsAndConditions"
                      className="mr-2"
                      checked={formData.termsAndConditions}
                      onChange={handleChange}
                    />
                    <p>
                    I agree to the website
                    <Link className="text-[#1E7FCB] ml-1 mr-1" href="/">
                      terms & conditions
                    </Link>
                   
                  </p>
                  </label>
                </div>
              </div>

            <div className="px-[2rem] w-full">
                <button  type="submit" className="bg-[#1E7FCB] rounded-md py-2 w-[100%] text-[#FFFFFF] font-[400] text-[16px] hover:scale-105 ease-in duration-300 transition-all"  onClick={handleSubmit}>Place Order</button>
            </div>
          </div>
          </div>
      </div>
      {isFormSubmitted && (
        <div
          className="w-full h-full fixed top-0 left-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50"
          style={{ animation: "fadeIn 4s" }}
        >
          <div className="flex flex-col items-center p-8 rounded-lg bg-white shadow-md">
            <img
              src="/assets/order.svg"
              alt="Check Icon"
              className="w-16 h-16 mb-4"
            />
            <p className="font-bold text-lg mb-2">THANK YOU FOR YOUR PURCHASE</p>
            <p>Your order number is: 0987665</p>
            <p>You can track your order inside your portal.</p>
            <button
              className="bg-[#F6BE00] text-[12px] mt-4 ml-4 md:ml-0 rounded-full py-2 px-3 text-black transition-all duration-300 hover:bg-yellow-400 hover:scale-105 focus:outline-none"
              onClick={handleContinue}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default CheckOut;
