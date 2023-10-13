import { useRouter } from 'next/router'
import React from 'react'
import CreateOfferComp from '../../components/CreateOffer'
import Header from '../../components/layout/Header';

const CreateOffer = () => {

  const router = useRouter();
 
  // if(!router?.query?.id){
  //   router.push({pathname:"/"})
  // }

  return (
    <>
    <Header/>
     <div className='p-10'>
       <CreateOfferComp enquiryId={router.query.id}/>
     </div>
    </>
  )
}

export default CreateOffer