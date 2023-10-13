import { InputNumber, Modal, Input, DatePicker, message, Spin, Select } from 'antd'
const { TextArea } = Input
import React, { useEffect, useState } from 'react'
import { addOfferToEnquiry } from '../lib/offers';
import { useAuth } from '../context/AuthProvider';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import { getIncoterms } from '../lib/settings';


const CreateOffer = ({ enquiryId }) => {

    const [confirmLoading, setConfirmLoading] = useState(false);
    const [deliveryCost, setDeliveryCost] = useState(null);
    const [offerValue, setOfferValue] = useState(null);
    const [isIncotermLoading,setIsIncotermLoading] = useState(true);
    const [allIncoterms, setAllIncoterms] = useState([]);
    const [description, setDescription] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [preferredCurrency, setPreferredCurrency] = useState("usd");
    const [incoterms, setIncoterms] = useState("");
    const [vat, setVat] = useState(0);
    const [date, setDate] = useState();
    const router = useRouter();
    const { user } = useAuth();

    useEffect(()=>{
         getIncoterms()
          .then(incoterms=>setAllIncoterms(incoterms))
           .catch(error=>message.error("Something went wrong"))
            .finally(()=>setIsIncotermLoading(false))
    },[])


    function handleNumberChange(value) {
        if (value >= 1) {
            setOfferValue(value);
        }
    }

    function handleDeliveryCostChange(value) {
        if (value >= 1) {
            setDeliveryCost(value);
        }
    }

    function handleVatChange(value) {
        if (value >= 0) {
            setVat(value);
        }
    }

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleOk = async () => {

        if (!offerValue || !description || !date || !deliveryCost || !incoterms) {
            return message.error("Please fill all the fields")
        }

        if(!isChecked){
            return message.error("Please accept the terms and conditions")
        }

        setConfirmLoading(true);

        try {

            let response = await addOfferToEnquiry(enquiryId, {
                offerId: uuidv4(),
                sellerId: user?.userId,
                price: offerValue,
                description,
                exptectedDeliveryDate: date,
                status: "pending",
                offerCreationDate: Date.now(),
                completionDate: null,
                acceptedDate: null,
                ratingBySeller: null,
                ratingByBuyer: null,
                incoterms: incoterms,
                vat: parseInt(vat),
                deliveryCost: parseInt(deliveryCost),
                preferredCurrency,
            })

            if (response === "DUPLICATE_OFFER") {
                return message.error("Offer already exists")
            }

            message.success("Offer created successfully")

            setOfferValue(1);
            setDescription("");
            setDate(null);
            router.push({ pathname: "/" })


        } catch (error) {
            message.error(error.message);
        } finally {
            setConfirmLoading(false);
        }

    };


    function handleDateChange(date, dateStr) {
        setDate(dateStr);
    }

    return (
        <Spin spinning={confirmLoading}>
            <h1 className='text-2xl font-semibold mb-6 text-center'>Create Offer</h1>
            <div className="shadow-md p-6 space-y-4">

                <div>
                    <Select value={preferredCurrency} onChange={(e)=>setPreferredCurrency(e)} size='large'>
                        <Select.Option value="usd">USD ($)</Select.Option>
                        <Select.Option value="eur">EUR (€)</Select.Option>
                    </Select>
                </div>

                <div className='grid md:grid-cols-3 grid-cols-1 gap-4'>
                    <InputNumber size='large' type='number' value={offerValue} onChange={handleNumberChange} addonAfter={preferredCurrency=="usd"?"$":"€"} placeholder='Offer Price' />
                    <InputNumber size='large' type='number' value={deliveryCost} onChange={handleDeliveryCostChange} addonAfter={preferredCurrency=="usd"?"$":"€"} placeholder='Delivery Cost' />
                    <InputNumber size='large' type='number' value={vat} onChange={handleVatChange} addonAfter="%" placeholder='Vat' />
                </div>

                <TextArea size='large' value={description} onChange={e => setDescription(e.target.value)} rows={8} placeholder='Offer Description' allowClear />
                <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
                    <DatePicker size='large' placeholder="Expected Delivery Date" onChange={handleDateChange} className="" />
                    {/* <Input value={incoterms} onChange={e => setIncoterms(e.target.value)} size='large' type='text' placeholder='Incoterms' /> */}
                    <Select loading={isIncotermLoading} size='large' onChange={e => setIncoterms(e)} placeholder='Select Incoterms'>
                      {
                        allIncoterms.map(incoterm=>{
                          return <Select.Option value={incoterm}>{incoterm}</Select.Option>
                        })
                      }
                    </Select>
                </div>

                <div className='flex justify-center space-x-2'>
                    <input value={isChecked} onChange={handleCheckboxChange} type="checkbox" /> <p>I accept the terms and conditions</p>
                </div>

                <button onClick={handleOk} className="px-6 py-3 rounded-md bg-[#F6BE00] text-white hover:opacity-50 transition">Create</button>
            </div>

        </Spin>
    )
}

export default CreateOffer