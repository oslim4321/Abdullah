import React, { useEffect, useState } from 'react'
import { getUserVesselAndImo,removeVesselAndImo,updateUserVesselAndImo } from '../lib/user'
import { useAuth } from '../context/AuthProvider'
import { Button, Spin, Table, message } from 'antd'
import { AiOutlineDelete } from 'react-icons/ai'

const BuyerImoAndVessel = () => {

    const [vessel, setVessel] = useState("")
    const [data,setData] = useState([]);
    const [isLoading,setIsLoading] = useState(false)
    const [isSpinning,setIsSpinning] = useState(false)
    const [imo, setImo] = useState("")
    const {user} = useAuth();

    useEffect(()=>{
         getUserVesselAndImo(user?.userId)
         .then(res=>{
            const newData = res.vessels.map((vessel, index) => ({
                vessel: vessel,
                imo: res.imo[index]
            }));
    
            setData(newData);
         })
         .catch(err=>message.error(err.message))
         .finally(()=>setIsLoading(false))
    },[])

    const handleItemDelete = async (record) => {
        setIsSpinning(true);
        try {
            
            await removeVesselAndImo(user?.userId,record)
            setData(data.filter(item => item.vessel !== record.vessel || item.imo !== record.imo));
            message.success('Vessel and IMO removed successfully');

        } catch (error) {
            message.error(error.message);
        } finally{
            setIsSpinning(false);
        }
        
    }

    const columns = [
        {
            title: 'Vessel',
            dataIndex: 'vessel',
            key: 'vessel',
            width:"45%"
        },
        {
            title: 'IMO',
            dataIndex: 'imo',
            key: 'imo',
            width:"45%"
        },
        {
            title:"Delete",
            key:"delete",
            render: (text, record) => (
                <Button shape='circle' onClick={() => handleItemDelete(record)} icon={<AiOutlineDelete />} danger type='primary' />
            ),
            width:"10%"
        }
    ]

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSpinning(true);

        try {
            
            await updateUserVesselAndImo(vessel,imo,user?.userId,true);
            setData([...data,{vessel,imo}]);
            message.success('Vessel and IMO added successfully');
                
        } catch (error) {
            message.error(error.message);
        } finally{
            setIsSpinning(false);
        }
    }


    return (

        <div>
            <Spin spinning={isSpinning}>
                <form onSubmit={handleSubmit} className='grid md:grid-cols-3 gap-3 grid-cols-1'>
                    <input required placeholder='Vessel' value={vessel} type="text" onChange={(e)=>setVessel(e.target.value)} className="border-[#A4CCEC] bg-[#EBF3FA] px-4 py-2 rounded focus:border-[#1E7FCB] focus:outline-none" />
                    <input required placeholder='IMO'value={imo} onChange={(e)=>setImo(e.target.value)} type="text" className="border-[#A4CCEC] bg-[#EBF3FA] px-4 py-2 rounded focus:border-[#1E7FCB] focus:outline-none" />
                    <button type='submit' className='bg-[#f6be00] py-3 text-white rounded-md hover:opacity-50 transition'>Add</button>
                </form>
              <Table pagination={{pageSize:3}} className='mt-5' loading={isLoading} columns={columns} dataSource={data}/>
            </Spin>
        </div>
    )
}

export default BuyerImoAndVessel