import { Table, message, Dropdown, Menu, Modal,Rate, Input, Tag,Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { getEnquiriesWithAcceptedOffersBuyer, getEnquiriesWithAcceptedOffersSeller } from '../lib/enquiry';
import { useAuth } from '../context/AuthProvider';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { updateOfferStatus, updateRating } from '../lib/offers';

const OrderTable = ({ role }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [rate,setRate] = useState(null);
    const [modal,setModal] = useState(false);
    const [selectedRecord,setSelectedRecord] = useState(null);
    const [data, setData] = useState([]);
    const [confirmLoading,setConfirmLoading] = useState(false)
    const [review,setReview] = useState("");
    const { user } = useAuth();

    const getBuyer = () => {
        getEnquiriesWithAcceptedOffersBuyer(user.userId)
            .then(res => setData(res || []))
            .catch(err => message.error(err.message))
            .finally(() => setIsLoading(false))
    }

    const getSeller = ()=>{
        getEnquiriesWithAcceptedOffersSeller(user.userId)
                .then(res => setData(res|| []))
                .catch(err => message.error(err.message))
                .finally(() => setIsLoading(false))
    }


    useEffect(() => {
        if (role === "buyer") {
            getBuyer();
        } else {
            getSeller();
        }
    }, [])

    const handleOrderCompleted = async (record) => {
        setIsLoading(true);
        try {

            await updateOfferStatus(record?.id, record?.offerId);
            getBuyer();
            message.success("Order Completed");


        } catch (error) {
            message.error(error.message)
        } finally {
            setIsLoading(false);
        }

    }


   const handleRate = async () =>{
      setConfirmLoading(true)
      if(!rate){
        return message.error("Please rate the offer")
      }
       try {
        
           await updateRating(selectedRecord?.id,selectedRecord?.offerId,rate,role==="buyer",review);
           if(role==="buyer"){
            getBuyer();
           }else{
            getSeller();
           }
           message.success("Rating Updated");

           setModal(false);
           setSelectedRecord(null);
           setRate(null);
           

       } catch (error) {
        
          message.error(error.message);
       } finally{
           setConfirmLoading(false)
       }
   } 

    const columns = [
        {
            title: 'Offer ID',
            key: 'offerId',
            render:(_,record)=>{
                 return <Tooltip className='cursor-pointer' title={record?.offerId} color='black'>
                    <p>{record?.offerId?.substring(0,8)+"..."}</p>
                 </Tooltip>
            }
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: "Seller",
            key: "seller",
            render: (text, record) => {
                return <Tooltip className='cursor-pointer' title={record?.seller?.firstname + " " + record?.seller?.lastname}>
                    <p>{(record?.seller?.firstname + " " + record?.seller?.lastname).substring(0,8)+"..."}</p>
                </Tooltip>
            }
        },
        {
            title: "Status",
            key: "status",
            render: (text, record) => {

                const colorEnum={
                    accepted:"orange",
                    completed:"green",
                }

                return <Tag color={colorEnum[record?.status]}>{record?.status==="completed" ? "COMPLETED" : "PENDING"}</Tag>
            }
        },
        {
            title: "Delivery Date",
            key: "exptectedDeliveryDate",
            render: (text, record) => {
                if (record?.completionDate) {
                   return "Delivered"
                } else {
                    // Parse the input date string into a Date object
                    const deliveryDate = new Date(record?.exptectedDeliveryDate);

                    // Format the date as "DD Mon, YYYY"
                    const options = { day: "numeric", month: "short", year: "numeric" };
                    const formattedDate = deliveryDate.toLocaleDateString(undefined, options);

                    return formattedDate;
                }
            }
        },
        ,
        {
            title: "Completion Date",
            key: "daysLeft",
            render: (text, record) => {
                if (record?.completionDate) {
                    const date = new Date(record?.completionDate);
                    const day = date.getDate();
                    const month = date.toLocaleString('default', { month: 'short' });
                    const year = date.getFullYear();
                    const hours = date.getHours();
                    const minutes = date.getMinutes();

                    const formattedDate = `${day} ${month}, ${year} ${hours % 12}:${minutes}${hours >= 12 ? 'PM' : 'AM'}`;
                    return formattedDate;
                } else {
                    // Parse the expected delivery date from the record
                    const expectedDeliveryDate = new Date(record?.exptectedDeliveryDate);
                    expectedDeliveryDate.setHours(0, 0, 0, 0); // Set time to 00:00:00

                    // Get the current date
                    const currentDate = new Date();
                    currentDate.setHours(0, 0, 0, 0); // Set time to 00:00:00

                    // Calculate the difference in milliseconds
                    const differenceInMilliseconds = expectedDeliveryDate - currentDate;

                    // Calculate the difference in days
                    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));


                    if (differenceInDays > 1) {
                        return differenceInDays + " days";
                    } else if (differenceInDays === 0) {
                        return "Today";
                    } else if (differenceInDays === 1) {
                        return "Tomorrow";
                    } else {
                        return "Overdue";
                    }
                }
            }
        },
        {
           title:role==="buyer"? "Seller Rating" : "Buyer Rating",
           dataIndex: role==="buyer"? "ratingBySeller" : "ratingByBuyer",
           render:(text,record) =>{

             if(role=="buyer"){

                if(record?.ratingBySeller){
                    return <Tooltip  className='cursor-pointer' title={record?.ratingBySeller?.review}>
                        <Rate className='cursor-pointer' disabled allowHalf defaultValue={record?.ratingBySeller?.rating} />
                    </Tooltip>
                }else{
                    return "Seller has not rated yet"
                }
             }else{
                if(record?.ratingByBuyer){
                    return <Tooltip className='cursor-pointer' title={record?.ratingByBuyer?.review}>
                        <Rate className='cursor-pointer' disabled allowHalf defaultValue={record?.ratingByBuyer?.rating} />
                    </Tooltip>
                }else{
                    return "Buyer has not rated yet"
                }
             }
           }

        },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <Dropdown
                    overlay={
                        <Menu style={{ width: '150px', padding: '8px 0' }}>

                            {
                                record?.status !== "completed" && role === "buyer" ? <Menu.Item
                                    key="edit"
                                    onClick={() => handleOrderCompleted(record)}
                                >
                                    Mark as completed
                                </Menu.Item> : role == "buyer" && !record?.ratingByBuyer && record?.status == "completed" ? <Menu.Item
                                    key="rate seller"
                                    onClick={()=>{setSelectedRecord(record);setModal(true)}}

                                >
                                    Rate seller
                                </Menu.Item> : role === "seller" && !record?.ratingBySeller && record?.status == "completed" ? <Menu.Item
                                    key="rate buyer"
                                    onClick={()=>{setSelectedRecord(record);setModal(true)}}

                                >
                                    Rate Buyer
                                </Menu.Item> :<Menu.Item>Open Dispute</Menu.Item>
                            }

                        </Menu>
                    }
                    trigger={['click']}
                    overlayStyle={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}
                >
                    <MoreVertIcon className="cursor-pointer" />
                </Dropdown>
            ),
        }

    ]

    return (
        <>
             <div className='overflow-auto w-full'>
             <Table className='' loading={isLoading} dataSource={data} columns={columns} />

             </div>
                 <Modal onOk={handleRate} okText="Rate" onCancel={()=>{setModal(false);setSelectedRecord(null)}} confirmLoading={confirmLoading} okButtonProps={{className:"bg-[#f6be00]"}} title={role=="buyer"?"Rate Seller":"Rate Buyer"} open={modal}>
                    <div className='my-5'>
                       <Rate value={rate} onChange={(value) => setRate(value)}/>
                       <Input.TextArea placeholder={`Write your review to ${role=="buyer"?"seller":"buyer"}`} className='mt-3' value={review} onChange={(e)=>setReview(e.target.value)} rows={8} />
                    </div>
                 </Modal>

        </>
    )
}

export default OrderTable