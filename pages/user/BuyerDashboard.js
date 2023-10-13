import { useEffect, useState } from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { useAuth } from "../../context/AuthProvider";
import { KeyboardArrowDown as KeyboardArrowDownIcon } from "@mui/icons-material";
import Button from "../../components/shared/Button";
import { getLoggedInUserEnquries } from '../../lib/enquiry'
import { useRouter } from "next/router";
import { OrderProvider } from '../../context/OrderContext'
import { useOrderContext } from "../../context/OrderContext";
import { Menu, Dropdown, message, Spin, Modal } from "antd";
import CommentsList from '../../components/CommentsList'
import {
  MenuOutlined,

} from "@ant-design/icons";
import { getOffersForEnquiry, updateOfferInEnquiry } from "../../lib/offers";
import OrderTable from "../../components/OrderTable";
import { updateUser } from "../../lib/user";
import BuyerImoAndVessel from "../../components/BuyerImoAndVessel";


const BuyerDashboard = () => {
  const router = useRouter();
  const [activeButton, setActiveButton] = useState("inquiries");
  const [showMoreContent, setShowMoreContent] = useState(false);
  const [enquries, setEnquires] = useState([]);
  const [selectedInquiryIndex, setSelectedInquiryIndex] = useState(null);
  const { user, isLoggedIn,logout } = useAuth();
  const [isEnquiryLoading, setIsEnquiryLoading] = useState(true);
  const [firstName, setFirstName] = useState(() => user ? user.firstname : "");
  const [lastName, setLastName] = useState(() => user ? user.lastname : "");
  const [email, setEmail] = useState(() => user ? user.email : "");
  const [phoneNumber, setPhoneNumber] = useState(() => user ? user.phoneNumber : "");
  const [isAccepted, setIsAccepted] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');
  const [isProfileSpinning, setIsProfileSpinning] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { setSelectedOrder } = useOrderContext();
  const [offers, setOffers] = useState([]);
  const [isOffersSpinning, setIsOffersSpinning] = useState(false);
  const [offerModal, setOfferModal] = useState(false);
  const [selectedInquiryId, setSelectedInquiryId] = useState(null);

  useEffect(() => {
    const accepted = offers.find((o) => o.status === "accepted" || o.status === "completed");
    if (accepted) {
      setIsAccepted(true)
    }
  }, [offers])

  // useEffect(async() => {
  //   const ref = query(collection(db, "enquiry"), where("userId", "==", user?.userId))
  //   try {
  //     const res = await getDocs(ref)
  //     console.log('res----  ', res.docs[0]?.data()) 
  //   } catch (error) {
  //     console.log({error})
  //   }
  // },[])

  function fetchEnquires() {
    setIsEnquiryLoading(true);
    getLoggedInUserEnquries(user?.userId)
      .then(enquries => { setEnquires(enquries); setIsEnquiryLoading(false); })
      .catch(err => message.error("Something went wrong while fetching the enquiries"))
  }

  useEffect(() => {
    if (user && isLoggedIn) {
      fetchEnquires();
    }
  }, [user])

  const showOrderDetails = (order) => {
    setSelectedOrder(order)
    router.push({
      pathname: `/user/OrderDetails`,
      query: { id: order.id, orderId: order.orderId, status: order.status, subtotal: order.subtotal, storeCredit: order.storeCredit, shipping: order.shipping, total: order.total, deliverDate: order.deliverDate, address: order.address, name: order.orderName },
    });
  }

  if (!user) {
    return <div>User not logged in</div>;
  }

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };


  const handleViewMore = (index) => {
    setSelectedInquiryIndex(index);
    setShowMoreContent(!showMoreContent);
  };
  const placeOrder = (commentId, commentUser) => {
    const inquiry = user.inquiries.filter((inquiry) => inquiry.id === selectedInquiryIndex)
    const orderData = {
      commentUser,
      inquiry,

    };



    router.push({
      pathname: `/user/CheckOut`,
      query: orderData,
    });
  }

  
  const renderSelectedInquiryComments = () => {
    if (selectedInquiryIndex !== null) {
      const selectedInquiry = enquries[selectedInquiryIndex];
      return <CommentsList fetchEnquires={fetchEnquires} hide={true} documentId={selectedInquiry.id}
        comments={
          selectedInquiry.comments
        } placeorder="Place an order" orderFunction={placeOrder} />;
    }
    return null;
  };

  

  const renderInquiriesContent = () => {
    return (
      <div className=' w-full '>
        <Spin spinning={isEnquiryLoading}>
          {
            enquries?.map((enquiry, index) => (
              <>
                <div key={index}
                  className=" flex-col rounded-md  shadow-md mb-4 py-4 px-6 justify-between border border-grey-400">
                  <div className="flex smd:flex-row flex-col" >
                    <div className="flex flex-row flex-wrap smd:flex-col smd:w-[40%] w-full justify-between">
                      <div className="flex mb-2">
                        <p>Country:
                        </p>
                        <p className="text-[#1E7FCB] ml-1">
                          {
                            enquiry?.country
                          }</p>
                      </div>
                      <div className="flex mb-2">
                        <p>Brand:
                        </p>
                        <p className="text-[#1E7FCB] ml-1">
                          {
                            enquiry[0]?.equipments?.brandAndManufacturer || ""
                          }</p>
                      </div>
                      <div className="flex">
                        <p>Model:
                        </p>
                        <p className="text-[#1E7FCB] ml-1">
                          {
                            enquiry[0]?.equipments?.model || ""
                          }</p>
                      </div>
                    </div>
                    <div>
                      <div className="mt-3 smd:mt-0">

                        {enquiry[0]?.items?.map((item, index) => (
                          <p key={index} className={`pr-10 ${index >= 3 ? 'hidden' : ''}`} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            Item: {item?.item}
                          </p>
                        ))}
                        {enquiry[0]?.items?.length > 3 && (
                          <p className="pr-10">...</p>
                        )}

                      </div>
                    </div>
                  </div>
                  <div className="flex w-full justify-end items-center mt-3 smd:mt-0 mb-2">

                    <button className=" text-black px-3 py-4 rounded-md focus:outline-none transition-colors duration-300"
                      onClick={
                        () => handleViewMore(index)
                      }>
                      View Comments{" "}
                      <span className={
                        `${selectedInquiryIndex === index && showMoreContent ? "transform rotate-180" : ""
                        } inline-block`
                      }
                        style={
                          { color: "[#1E7FCB]" }
                        }></span>
                      <KeyboardArrowDownIcon className={
                        `${selectedInquiryIndex === index && showMoreContent ? "transform rotate-180" : ""
                        } inline-block`
                      } />
                    </button>
                  </div>
                    <button onClick={() => router.push(`/user/offers/${enquiry.id}`)} className="bg-customYellow text-white py-2 px-2 rounded-md text-sm hover:scale-105 ease-in duration-300 transition-all">
                      View {enquiry?.offers?.length} Offers
                    </button>
                </div>
                {
                  selectedInquiryIndex === index && showMoreContent && renderSelectedInquiryComments()
                } </>
            ))
          }
        </Spin>
      </div>

    )
  };



  const renderCommentRecordContent = () => {
    return <div>Comment Record Content</div>;
  };

  const renderOrdersContent = () => {
    return (
      <OrderTable role={'buyer'} />
    );
  };

  const renderLoggedOutMessage = () => {
    return (
      <div className="w-[100vw] h-[100vh] flex justify-center items-center">
        <p className="text-lg font-semibold text-gray-500">You're logged out. Please log in to access the dashboard.</p>
      </div>
    );
  };

  const renderAccountSettingContent = () => {

    const handleSubmit = async (event) => {
      event.preventDefault()
      setIsProfileSpinning(true);
      try {
        if (!firstName || !lastName) { return message.error("Please fill all the fields") }

        let userObj = {
          firstname: firstName,
          lastname: lastName,
        }

        if (newPassword) {
          if (newPassword !== repeatNewPassword) {
            return message.error("Passwords do not match")
          }

          if (newPassword.length < 6) {
            return message.error("Password must be at least 6 characters")
          }

          userObj.password = newPassword
        }

        await updateUser(userObj, user?.userId)
        
        logout();
        message.info("Please login again");
        router.push({pathname:"/login"})
      } catch (error) {
        message.error(error.message)
      } finally{
        setIsProfileSpinning(false);
      }

    };

    return (
      <Spin spinning={isProfileSpinning}>
        <div className="rounded-md shadow-md border border-grey-400 px-10 py-5 overflow-hidden">
        <h1 className="font-semibold text-lg mb-4 ml-4">Personal Information</h1>
        {isSubmitted ? (
          <div className="mb-4 text-green-500">Changes successfully saved!</div>
        ) : (
          <form className="font-inter w-full px-4" onSubmit={handleSubmit}>
            <div className="flex flex-wrap smd:gap-4 gap-1 w-[100%]">
              <div className="w-full smd:flex flex-col smd:flex-row">
                <div className="smd:w-1/2 w-full bordersmd:pr-2 mb-2">
                  <div className="mb-2">
                    <label className="text-[16px]  font-medium" htmlFor="firstName">
                      First Name
                    </label>
                  </div>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="text-[16px] font-normal w-full border border-[#A4CCEC] bg-[#EBF3FA] px-4 py-2 rounded focus:border-[#1E7FCB] focus:outline-none"
                  />
                </div>
                <div className="smd:w-1/2 w-full smd:pl-2 mb-2">
                  <div className="mb-2">
                    <label className="text-[16px]  font-medium" htmlFor="firstName">
                      Last Name
                    </label>
                  </div>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="text-[16px] font-normal w-full border border-[#A4CCEC] bg-[#EBF3FA] px-4 py-2 rounded focus:border-[#1E7FCB] focus:outline-none"
                  />
                </div>
              </div>

              {/* <div className="w-full smd:flex smd:flex-row flex-col">
                <div className="smd:w-1/2 w-full smd:pr-2 mb-2 smd:mb-0">
                  <div className="mb-2">
                    <label className="text-[16px]  font-medium" htmlFor="firstName">
                      Email Address
                    </label>
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-[16px] font-normal w-full border border-[#A4CCEC] bg-[#EBF3FA] px-4 py-2 rounded focus:border-[#1E7FCB] focus:outline-none"
                  />
                </div>
                <div className="smd:w-1/2 w-full smd:pl-2 mb-2 smd:mb-0">
                  <div className="mb-2">
                    <label className="text-[16px]  font-medium" htmlFor="firstName">
                      Phone Number
                    </label>
                  </div>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="text-[16px] font-normal w-full border border-[#A4CCEC] bg-[#EBF3FA] px-4 py-2 rounded focus:border-[#1E7FCB] focus:outline-none"
                  />
                </div>
              </div> */}

              <div className="w-full smd:flex smd:flex-row flex-col">
                <div className="smd:w-1/2 w-full smd:pr-2 mb-2 smd:mb-0">
                  <div className="mb-2">
                    <label className="text-[16px]  font-medium" htmlFor="firstName">
                      Create New Password
                    </label>
                  </div>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="text-[16px] font-normal w-full border border-[#A4CCEC] bg-[#EBF3FA] px-4 py-2 rounded focus:border-[#1E7FCB] focus:outline-none"
                  />
                </div>
                <div className="smd:w-1/2 w-full smd:pl-2 smd:mb-0 mb-2">
                  <div className="mb-2">
                    <label className="text-[16px]  font-medium" htmlFor="firstName">
                      Repeat New Password
                    </label>
                  </div>
                  <input
                    type="password"
                    id="repeatNewPassword"
                    name="repeatNewPassword"
                    value={repeatNewPassword}
                    onChange={(e) => setRepeatNewPassword(e.target.value)}
                    className="text-[16px] font-normal w-full border border-[#A4CCEC] bg-[#EBF3FA] px-4 py-2 rounded focus:border-[#1E7FCB] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10">
              <button type="submit" className="bg-[#1E7FCB] text-white rounded-full py-2 px-6 flex-shrink-0 hover:bg-[#F9C514] ease-in duration-300 transition-all">Update</button>
            </div>
          </form>
        )}
        <div className=" my-5 py-5 border-t border-grey-400">
          <h1 className="font-semibold text-lg mb-4 ml-4">Account Type</h1>
          <div className="flex justify-between w-full">
            <p className="ml-4 text-[16px]">{user?.accountType === "Free" ? "Free Plan" : "Premium"}</p>
            <div><button className="bg-[#F6BE00] rounded-full py-2 px-6 flex-shrink-0 text-black hover:bg-[#F9C514] ease-in duration-300 transition-all">{user?.accountType === "Free" ? "Upgrade" : "View Plain"}</button></div>
          </div>
        </div>

         <BuyerImoAndVessel/> 

      </div>
      </Spin>


    );
  };


  const renderContent = () => {
    switch (activeButton) {
      case "inquiries":
        return renderInquiriesContent();
      case "commentRecord":
        return renderCommentRecordContent();
      case "orders":
        return renderOrdersContent();
      case "accountSetting":
        return renderAccountSettingContent();
      default:
        return null;
    }
  };
  const [selectedMenuItem, setSelectedMenuItem] = useState("Inquiry");

  const handleMenuClick = (item) => {
    setActiveButton(item.key);
    if (item.key == "inquiries") {
      setSelectedMenuItem("Inquiry")
    }
    else if (item.key == "orders") {
      setSelectedMenuItem("Orders")
    }
    else if (item.key == "accountSetting") {
      setSelectedMenuItem("Account Settings")
    }
  };

  const navMenu = (
    <Menu>
      <Menu.Item key="inquiries" onClick={handleMenuClick}>
        <p>
          Inquiry
        </p>
      </Menu.Item>
      <Menu.Item key="orders" onClick={handleMenuClick}>
        <p>
          Orders
        </p>
      </Menu.Item>
      <Menu.Item key="accountSetting" onClick={handleMenuClick}>
        <p>
          Account Settings
        </p>
      </Menu.Item>

    </Menu>
  );



  return (
    <OrderProvider>
      <div>
        <Header />
        <div className="xl:mx-4  mt-8 mb-20 mr-3 md:mr-0 ">
          {
            user && isLoggedIn ? (
              <div className="w-[100vw]  flex-col smd:flex justify-center items-center">
                <div className="ssmd:flex ssmd:flex-row smd:justify-between  flex-col w-full h-full my-2 mb-3">
                  <div className="h-full ssmd:flex-col w-full smd:w-[20%] smd:h-[400px] md:h-[582px] ssmd:flex mx-4 hidden mb-4 bg-[#DEF1FF66] rounded-md">
                    <div className="smd:p-7 p-3 hidden smd:block">
                      <h1 className="font-semibold text-lg">My Account</h1>
                    </div>
                    <div className="flex smd:flex-col justify-center text-left w-full">
                      <button className={
                        `text-left smd:text-[16px] text-[14px] font-medium smd:border-b smd:border-t border-[#C8E1F5] px-3 smd:px-7 smd:py-3 ${activeButton === "inquiries" ? "bg-[#1E7FCB] text-white" : ""
                        }`
                      }
                        onClick={
                          () => handleButtonClick("inquiries")
                        }>
                        Inquiries
                      </button>

                      <button className={
                        `text-left  smd:text-[16px] text-[14px]  font-medium border-l smd:border-l-0 smd:border-b border-[#C8E1F5] px-7 py-3 ${activeButton === "orders" ? "bg-[#1E7FCB] text-white" : ""
                        }`
                      }
                        onClick={
                          () => handleButtonClick("orders")
                        }>
                        Orders
                      </button>
                      <button className={
                        `text-left  smd:text-[16px] text-[14px] font-medium border-l smd:border-l-0 smd:border-b border-[#C8E1F5] px-4 md:px-7 py-3 ${activeButton === "accountSetting" ? "bg-[#1E7FCB] text-white" : ""
                        }`
                      }
                        onClick={
                          () => handleButtonClick("accountSetting")
                        }>
                        Account Setting
                      </button>
                    </div>
                  </div>

                  <div className="ssmd:hidden w-full  mt-3 flex items-center justify-between bg-[#DEF1FF66] rounded-md my-4 px-5 py-4 mx-2">
                    <div>
                      <h1 className="sm:text-[24px] text-[20px] text-black font-[600]">{selectedMenuItem}</h1>
                    </div>
                    <div>
                      <Dropdown overlay={navMenu} trigger={["click"]}   >
                        <a className="text-[#0852C1]">
                          <MenuOutlined style={{ fontSize: "24px" }} />
                        </a>
                      </Dropdown>
                    </div>
                  </div>

                  <div className="ssmd:w-[100%]  w-full xl:w-[100%] flex flex-col items-center  h-full overflow-hidden px-3 smd:mx-5">
                    {
                      renderContent()
                    } </div>
                </div>
              </div>
            ) : renderLoggedOutMessage()
          }

        </div>
        <div className="h-[50vh] flex flex-col justify-end">
          <Footer />
        </div>
      </div>
      
    </OrderProvider>
  );
};

export default BuyerDashboard;
