import React, { useEffect, useState } from "react"
import { Button, Card, Descriptions, Spin, message } from 'antd'
import { useRouter } from 'next/router'
import Header from "../../components/layout/Header"
import Footer from "../../components/layout/Footer"
import { useAuth } from "../../context/AuthProvider"
import PurchaseInformation from "../../components/Equipment&Items"
import Attachment from "../../components/Attachment"
import { addEnquiryToFirestore } from "../../lib/enquiry"
import { updateUserVesselAndImo } from "../../lib/user"


export default function Page() {
    const router = useRouter();
    const id = router?.query?.id;
    const [enquiry, setEnquiry] = useState(undefined);
    const [vessel, setVessel] = useState("");
    const [upload, setUpload] = useState([]);
    const [isSpinning, setIsSpinning] = useState(false)
    const [textArea, setTextArea] = useState("");
    const [imo, setImo] = useState("");
    const [data, setData] = useState([
        {
            equipments: {
                id: new Date().getTime() + Math.random(),
                equipmentAndSystem: enquiry?.system,
                brandAndManufacturer: "",
                model: "",
                serialNo: "",
                description: "",
            },
            items: [
                {
                    id: new Date().getTime() + Math.random(),
                    no: 1,
                    item: "",
                    brandAndManufacturer: "",
                    partNo: "",
                    drawingNo: "",
                    qty: 1,
                    unit: 1,
                    description: ""
                },
            ]
        },
    ])
    const { user } = useAuth();


    useEffect(() => {
        if (!id) {
            router.push({ pathname: "/" })
        }

        let enq = JSON.parse(localStorage.getItem(id))
        if (enq) {
            const newData = [...data];
            const firstItem = newData[0];
            const equipments = firstItem.equipments;
            equipments.equipmentAndSystem = enq?.system;
            setData(newData);
            return setEnquiry(enq)
        }
        return () => {
            localStorage.removeItem(id)
        }
    }, [])

    function formateDate(dateString) {
        if (!dateString) { return "" }
        // Parse the input date string
        const date = new Date(dateString);

        // Format the date using Intl.DateTimeFormat
        const options = { day: 'numeric', month: 'short', year: '2-digit' };
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

        return formattedDate;
    }

    async function handleSubmit() {

        if (!vessel || !imo) {
            return message.error("Enter Vessel and IMO");
        }
        setIsSpinning(true);
        try {
            const updatedData = data.map((item) => {
                // Create a copy of the equipment object without the 'id' field
                const updatedEquipment = { ...item.equipments };
                delete updatedEquipment.id;

                // Create an array of items with 'id' field removed from each item
                const updatedItems = item.items.map((item) => {
                    const { id, ...itemWithoutId } = item;
                    return itemWithoutId;
                });

                // Return the updated item with equipment and items
                return {
                    equipments: updatedEquipment,
                    items: updatedItems,
                };
            });

            let dataToBeSent = [{ ...updatedData, userId: user?.userId, userEmail: user?.email,marineSystem: enquiry?.marineSystem, userName: user?.firstname + " " + user?.lastname, enquiryId: enquiry?.id, eta: enquiry?.date, createdAt: Date.now(), attachments: upload, text: textArea, vessel, imo, machinery: enquiry?.machinery, system: enquiry?.system, component: enquiry?.component, fifth: enquiry?.fifth, country: enquiry?.country, enquiryType: enquiry?.enquiryType,offers:[],offerStatus:"pending" }];

            await addEnquiryToFirestore(dataToBeSent);
            updateUserVesselAndImo(vessel, imo, user?.userId);
            message.success("Enquiry posted successfully!");
            localStorage.removeItem(id);
            router.push({ pathname: "/" })
        }
        catch (e) {
            message.error("Something Went Wrong");
        }
        finally {
            setIsSpinning(false)
        }

    }


    return (
        <div>
            <Header />
            {
                enquiry &&
                <Spin spinning={isSpinning}>
                    <div className="p-10">
                        <Card headStyle={{background:"#1E7FCB",color:"white"}} title="Buyer Information">
                            <Descriptions>
                                <Descriptions.Item label="Buyer">{user?.firstname + " " + user?.lastname}</Descriptions.Item>
                                <Descriptions.Item label="Enquiry From">{enquiry?.country}</Descriptions.Item>
                                <Descriptions.Item label="Delivery Due Date">{formateDate(enquiry?.date)}</Descriptions.Item>
                                <Descriptions.Item label="Ref No.">{enquiry?.id}</Descriptions.Item>
                            </Descriptions>
                        </Card>
                        <PurchaseInformation machinery={enquiry?.machinery} marineSystem={enquiry?.marineSystem} system={enquiry?.system} vessel={vessel} imo={imo} setVessel={setVessel} setImo={setImo} data={data} setData={setData} />
                        <Attachment upload={upload} setUpload={setUpload} textArea={textArea} setTextArea={setTextArea} />
                        <div className="mt-20 flex md:justify-end justify-center">
                            <Button onClick={handleSubmit} className="bg-[#0c4a6e]" type="primary">
                                Submit
                            </Button>
                        </div>
                    </div>
                </Spin>
            }
        </div>
    )
}