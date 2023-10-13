import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import { useOrderContext } from "../../context/OrderContext";
import { useAuth } from '../../context/AuthProvider';
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Work_Sans } from "next/font/google";
import User from '../../data/User';

const font6 = Work_Sans({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});

const OrderDetails = () => {
  const router = useRouter();
  const { id, orderId, status, subtotal, storeCredit, shipping, total, deliverDate, address, name } = router.query;
  const { isLoggedIn } = useAuth();
 

  useEffect(() => {
    if(isLoggedIn){
      if (!orderId || !status || !subtotal || !storeCredit || !shipping || !total) {
        router.push({ pathname: '/user', query: { role: user.role } });
      }
    }
   
  }, [orderId, status, subtotal, storeCredit, shipping, total, router]);
  useEffect(() => {
    
    if (!isLoggedIn) {
      router.back(); 
    }
  }, [isLoggedIn, router]);


  return (
    <>
      <Header />
      <div className="h-full w-full flex flex-col py-4 justify-center items-center px-7">
        <h1 className={`mdd:text-[40px] text-[24px] xs:text-[30px] font-[600] mb-7 ${font6.className}`}>Order ID: {orderId}</h1>
        <div className="flex flex-col smd:flex-row mdd:justify-center items-center mb-4 w-full">
          <div className="rounded-md shadow-md border border-[#1E7FCB24] flex flex-col py-5 px-6  w-full mdd:w-[50%] h-[400px] flex flex-col">
            <div className="mb-[1.5rem]">
              <p>Estimated Delivery Date</p>
              <p className="text-[18px] font-[500]">{deliverDate}</p>
            </div>
            <div>
              {status === "Completed" ? (
                <div className="mb-[1.5rem]">
                  <p className="text-[#43DB65] font-[500] text-[16px]">Delivered</p>
                  <p className="text-[14px] font-[400] text-[#777777]">Your Package has been Delivered</p>
                </div>
              ) : status === "Cancelled" ? (
                <div>
                  <p className="text-red-600 font-[500] text-[16px]">Cancelled</p>
                  <p className="text-[14px] font-[400] text-[#777777]">Your Package was Cancelled</p>
                </div>
              ) : (
                <div>
                  <p className="text-[#43DB65] font-[500] text-[16px]">In Transit</p>
                  <p className="text-[14px] font-[400] text-[#777777]">Your package has been shipped</p>
                </div>
              )}
            </div>
            <div className="flex flex-col xs:flex-row mdd:justify-between  w-full mdd:w-[70%] mt-4">
              <div className="w-[200px] mb-7 xs:mb-0 ">
                <h1 className='text-[16px] font-[500]'>
                  {status === "Completed"
                    ? "Delivered"
                    : status === "Cancelled"
                    ? "Cancelled"
                    : "In Transit"}
                </h1>
                <p className="text-[14px] font-[400] text-[#777777]">{address}</p>
              </div>
              <div>
                <h1 className='text-[16px] font-[500]'>Delivery Method</h1>
                <p className="text-[14px] font-[400] text-[#777777]">Standard (4 to 5 days)</p>
              </div>
            </div>
          </div>
          <div className="rounded-md shadow-md flex flex-col mx-4 py-2 my-7 border border-[#1E7FCB24] w-full  mdd:w-[30%] h-[400px]">
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

            <div className="px-[2rem] w-full">
                <button className="bg-[#1E7FCB] rounded-md py-2 w-[100%] text-[#FFFFFF] font-[400] text-[16px] hover:scale-105 ease-in duration-300 transition-all">Place Order</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderDetails;
