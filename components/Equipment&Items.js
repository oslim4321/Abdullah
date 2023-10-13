import { Button, Card, Input, Select, Table, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai';
import { BiPlus } from 'react-icons/bi';
import { getManufacturers } from '../lib/sellerCategory';
import { getUserVesselAndImo } from '../lib/user';
import { useAuth } from '../context/AuthProvider';
const { Option } = Select

const PurchaseInformation = ({ data, setData, vessel, setVessel, imo, setImo, readOnly = false, system, machinery, marineSystem }) => {

    const [manufacturers, setManufacturers] = useState([])
    const [manufacturerLoading, setManufacturerLoading] = useState(true);
    const [allVessels, setAllVessels] = useState([]);
    const [allImos, setAllImos] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const {user,isLoggedIn} = useAuth();
    const [showVesselInput, setShowVesselInput] = useState(readOnly?true:false);
    const [showImoInput, setShowImoInput] = useState(readOnly?true:false)
    const [models, setModels] = useState([]);



    !readOnly && useEffect(()=>{

        getUserVesselAndImo(user?.userId)
         .then(res=>{setAllImos(res?.imo);setAllVessels(res?.vessels)})
         .catch(err=>message.error(err.message))
         .finally(()=>setIsLoading(false))
        
    },[])

    !readOnly && useEffect(() => {
        setData((prevData) => {
            // Create a copy of the previous 'data' state
            const newData = [...prevData];

            // Map over each item in the 'items' array and update 'brandAndManufacturer'
            newData.forEach((item) => {
                item.items.forEach((subItem) => {
                    subItem.brandAndManufacturer = item.equipments.brandAndManufacturer;
                });
            });

            return newData; // Return the updated data
        });

    }, [models])

    !readOnly && useEffect(() => {
        getManufacturers({ machinery, system, marineSystem })
            .then(res => {
                setManufacturers(res)
            })
            .catch(err => console.log(err))
            .finally(() => setManufacturerLoading(false))
    }, [machinery, system, marineSystem])

    const equipmentColumns = [
        {
            title: 'Equipment/System',
            align: "center",
            dataIndex: 'equipmentAndSystem',
            key: 'equipmentAndSystem',
            render: (text, record, index) => (
                <Input
                    value={text}
                    readOnly
                />
            ),
        },
        {
            title: 'Brand/Manufacturer',
            align: "center",
            dataIndex: 'brandAndManufacturer',
            key: 'brandAndManufacturer',
            render: (text, record, index) => (
                <Select value={text} onChange={(e) => { setModels(manufacturers.find(m => m.name == e)?.models); handleEquipmentInputChange({ target: { value: e } }, 'brandAndManufacturer', record.id) }} showSearch className='md:w-64 w-40' loading={!readOnly ? manufacturerLoading : false} size='large'>
                    {manufacturers && manufacturers.map((manufacturer, index) => {
                        return (
                            <Option value={manufacturer?.name} key={index}>{manufacturer?.name}</Option>
                        )
                    })}
                </Select>
            ),
        },
        {
            title: 'Model',
            align: "center",
            dataIndex: 'model',
            key: 'model',
            render: (text, record, index) => (

                <Select value={text} showSearch size="large" className='md:w-64 w-40' onChange={(e) => handleEquipmentInputChange({ target: { value: e } }, 'model', record.id)}>
                    {
                        models.map((model, index) => {
                            return (
                                <Option key={index} value={model}>{model}</Option>
                            )
                        })
                    }
                </Select>
            ),
        },
        {
            title: 'Serial No.',
            align: "center",
            dataIndex: 'serialNo',
            key: 'serialNo',
            render: (text, record, index) => (
                <Input
                    value={text}
                    onChange={(e) => handleEquipmentInputChange(e, 'serialNo', record.id)}
                />
            ),
        },
        {
            title: 'Description',
            align: "center",
            dataIndex: 'description',
            key: 'description',
            render: (text, record, index) => (
                <Input
                    value={text}
                    onChange={(e) => handleEquipmentInputChange(e, 'description', record.id)}
                />
            ),
        },
    ];

    const itemColumns = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Item',
            dataIndex: 'item',
            key: 'item',
            render: (text, record, index) => (
                <Input
                    value={text}
                    onChange={(e) => handleItemInputChange(e, 'item', record.id)}
                />
            ),
        },
        {
            title: 'Brand/Manufacturer',
            dataIndex: 'brandAndManufacturer',
            key: 'brandAndManufacturer',
            render: (text, record, index) => (
                <Input
                    value={text}
                    readOnly
                />
            ),
        },
        {
            title: 'Part No.',
            dataIndex: 'partNo',
            key: 'partNo',
            render: (text, record, index) => (
                <Input
                    value={text}
                    onChange={(e) => handleItemInputChange(e, 'partNo', record.id)}
                />
            ),
        },
        {
            title: 'Drawing No.',
            dataIndex: 'drawingNo',
            key: 'drawingNo',
            render: (text, record, index) => (
                <Input
                    value={text}
                    onChange={(e) => handleItemInputChange(e, 'drawingNo', record.id)}
                />
            ),
        },
        {
            title: 'Qty*',
            dataIndex: 'qty',
            key: 'qty',
            render: (text, record, index) => (
                <Input
                    type='number'
                    value={text}
                    onChange={(e) => handleItemInputChange(e, 'qty', record.id)}
                />
            ),
        },
        {
            title: 'Unit',
            dataIndex: 'unit',
            key: 'unit',
            render: (text, record, index) => (
                <Input
                    value={text}
                    type='number'
                    onChange={(e) => handleItemInputChange(e, 'unit', record.id)}
                />
            ),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (text, record, index) => (
                <Input
                    value={text}
                    onChange={(e) => handleItemInputChange(e, 'description', record.id)}
                />
            ),
        },
        !readOnly ? {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (text, record, index) => (
                <Button shape='circle' onClick={() => handleItemDelete(record.id)} icon={<AiOutlineDelete />} danger type='primary' />
            )
        } : {}
    ];

    function handleItemDelete(id) {
        // Create a new array with the updated data
        const newData = data.map((item) => ({
            ...item,
            items: item.items.filter((item) => item.id !== id), // Remove the item with the specified id
        }));

        // Update the state with the new array
        setData(newData);
    }

    function handleItemInputChange(event, name, id) {
        setData(
            data.map(item => {
                item.items.map(i => {
                    if (i.id === id) {
                        i[name] = event.target.value;
                    }
                    return i
                })
                return item
            })
        )
    }

    function handleEquipmentInputChange(event, name, id) {
        setData(
            data.map((item, i) => {
                if (item.equipments.id === id) {
                    item.equipments[name] = event.target.value;
                }
                return item
            })
        )
    }


    function addRow(index) {
        // Create a new array with the updated data
        const newData = [...data];
        const lastItem = newData[index].items[newData[index].items.length - 1];

        const newItem = {
            id: new Date().getTime() + Math.random(),
            no: lastItem ? lastItem.no + 1 : 1, // Increment the last item's 'no' or start at 1
            item: "",
            brandAndManufacturer: data[0]?.equipments?.brandAndManufacturer || "",
            partNo: "",
            drawingNo: "",
            qty: 1,
            unit: 1,
            description: ""
        };

        newData[index].items.push(newItem);

        // Update the state with the new array
        setData(newData);
    }

    function handleDelete(i) {
        setData(data.filter((item, index) => index !== i))
    }




    return (
        <Card className='mt-20' headStyle={{background:"#1E7FCB",color:"white"}} style={readOnly ? { "pointerEvents": "none" } : {}} title="Purchase Information">
            <div className='grid grid-cols-1 md:grid-cols-6 gap-4 justify-around items-center'>
                {
                    showVesselInput ? <Input className='md:col-span-5' placeholder='Vessel' size='large' value={vessel} onChange={(e) => setVessel(e.target.value)} />
                        : <Select showSearch loading={isLoading}  className='md:col-span-5' placeholder="Select Vessel" size='large' value={vessel} onChange={(e) => setVessel(e)}>
                            {
                                allVessels.map((vessel,index)=>(
                                    <Option key={index} value={vessel}>{vessel}</Option>
                                ))
                            }
                        </Select>
                }
                {!readOnly && <button className="bg-[#f6be00] py-3 text-white rounded-md hover:opacity-50 transition" onClick={() => {setShowVesselInput(!showVesselInput);setVessel("")}}>{showVesselInput ? "Select Vessel" : "Add New Vessel"}</button>}
                {
                    showImoInput ? <Input className='md:col-span-5' placeholder='IMO' value={imo} onChange={(e) => setImo(e.target.value)} size='large' />
                        : <Select showSearch loading={isLoading} className='md:col-span-5' placeholder="Select Imo" size='large' value={imo} onChange={(e) => setImo(e)}>
                            {
                                allImos.map((imo,index)=>(
                                    <Option key={index} value={imo}>{imo}</Option>
                                ))
                            }
                        </Select>
                }
                {!readOnly && <button className="bg-[#f6be00] py-3 text-white rounded-md hover:opacity-50 transition" onClick={() => {setShowImoInput(!showImoInput);setImo("")}}>{showImoInput ? "Select Imo" : "Add New Imo"}</button>}
            </div>

            {
                data.map((item, index) => {
                    return (
                        <div key={index} className={index === 0 ? "mt-10" : "mt-60"}>
                            {(index != 0 && !readOnly) ? <div className='flex mb-3 justify-end items-center'><Button type='default' onClick={() => handleDelete(index)}>Delete</Button></div> : null}
                            <div className='max-h-[300px] overflow-auto'>
                                <Table className='equipmentTable bg-red-500' columns={equipmentColumns} pagination={false} dataSource={[item.equipments]} />
                            </div>
                            <div className='mt-10 flex items-center justify-end space-x-4'>
                                {!readOnly && <Button type='primary' className='bg-[#f6be00]' shape='circle' onClick={() => addRow(index, item)} icon={<BiPlus />} />}

                            </div>
                            <div className='mt-10 max-h-[300px] overflow-auto'>
                                <Table className='equipmentTable' columns={itemColumns} pagination={false} dataSource={item.items.map((item) => ({ ...item, key: item.id }))} />
                            </div>
                        </div>
                    )
                })
            }
        </Card>
    )
}

export default PurchaseInformation