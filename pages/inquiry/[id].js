import { useRouter } from "next/router";
// import InquiryData from "../../data/InquiryData";
import Banner from "../../components/Banner";
import { Roboto } from "next/font/google";
import { Work_Sans } from "next/font/google";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { useEffect, useState } from "react";
import { getEnquiryById } from "../../lib/enquiry";
import EquipmentAndItems from "../../components/Equipment&Items";
import { Spin, Descriptions, Card, Carousel, Collapse, Button } from "antd";
import { Input } from "antd";
import CommentsSection from "../../components/CommentsSection";
import CommentList from "../../components/CommentsList";
import CreateOffer from "../../components/CreateOffer";
import { useAuth } from "../../context/AuthProvider";
import Link from "next/link";

const { TextArea } = Input;

const InquiryDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState([]);
  const [comments, setComments] = useState([]);
  const [information, setInformation] = useState({});
  const { user, isLoggedIn } = useAuth();

  const [isSpinning, setIsSpinning] = useState(true);

  useEffect(() => {
    if (id) {
      getEnquiryById(id)
        .then((enquiry) => {
          setData(enquiry?.equipments);
          setInformation(enquiry?.information);
          setComments(enquiry?.information?.comments || []);
        })
        .catch((err) => setData(undefined))
        .finally(() => setIsSpinning(false));
    }
  }, [id]);

  // const inquiry = inquiryData?.find((item) => item.id === parseInt(id));

  if (!data) {
    return <div>Inquiry not found</div>;
  }

  function formateDate(dateString) {
    if (!dateString) {
      return "";
    }
    // Parse the input date string
    const date = new Date(dateString);

    // Format the date using Intl.DateTimeFormat
    const options = { day: "numeric", month: "short", year: "2-digit" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );

    return formattedDate;
  }

  return (
    <>
      <Header />
      <Banner title="Inquiry Details" />
      <Spin spinning={isSpinning}>
        <div className="md:p-20 sm:p-10 p-5">
          <div className="flex md:justify-end justify-center items-center">
            {information && isLoggedIn && user && user?.role == "seller" && (
              <Link href={`/create_offer/${information?.id}`}>
                <button className="createOffer">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path
                        fill="currentColor"
                        d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
                      ></path>
                    </svg>{" "}
                    Create Offer
                  </span>
                </button>
              </Link>
            )}
          </div>
          {information && (
            <Card
              headStyle={{ background: "#1E7FCB", color: "white" }}
              title="Buyer Information"
              className="mt-5"
            >
              <Descriptions>
                <Descriptions.Item label="Buyer">
                  {information?.userName}
                </Descriptions.Item>
                <Descriptions.Item label="Enquiry From">
                  {information?.country}
                </Descriptions.Item>
                <Descriptions.Item label="Delivery Due Date">
                  {formateDate(information?.eta)}
                </Descriptions.Item>
                <Descriptions.Item label="Ref No.">
                  {information?.enquiryId}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          )}
          {data.items && (
            <EquipmentAndItems
              setData={setData}
              vessel={information?.vessel}
              imo={information?.imo}
              data={[data]}
              readOnly
            />
          )}
          {information && (
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-10">
              <Carousel className="border" autoplay>
                {information?.attachments?.map((item, index) => {
                  return (
                    <div key={index} className="max-h-[300px] w-[100%]">
                      <img
                        onClick={() => window.open(item.url)}
                        src={item.url}
                        height={"100%"}
                        width={"100%"}
                        className="object-cover cursor-pointer"
                      />
                    </div>
                  );
                })}
              </Carousel>
              <TextArea readOnly value={information?.text} />
            </div>
          )}
          {/* <CommentList documentId={information?.id} setComments={setComments} comments={comments} /> */}
        </div>
      </Spin>

      <Footer />
    </>
  );
};

export default InquiryDetails;
