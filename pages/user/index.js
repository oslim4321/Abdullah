import { useRouter } from 'next/router';
import SellerDashboard from './SellerDashboard';
import BuyerDashboard from './BuyerDashboard';
import { useEffect,useState } from 'react';
import { useAuth } from '../../context/AuthProvider';

const UserTypeDashboard = () => {
  

  const {user} = useAuth();
  const [type,setType] = useState("")

  useEffect(()=>{
       if(user){
        setType(user?.role)
       }
  },[user])


  const dashboardTypeEnum ={
    seller: <SellerDashboard/>,
    buyer: <BuyerDashboard/>
  }
 
  if(type){
    return dashboardTypeEnum[type]
  }

  return(<div>User type not found</div>)

};

export default UserTypeDashboard;
