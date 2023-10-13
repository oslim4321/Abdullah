import  Main from '../components/MainDup'
import Banner from '../components/Banner'
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useAuth } from '../context/AuthProvider';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function seller() {

  const {isLoggedIn} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if(isLoggedIn){
      router.push({pathname:"/"})
    }
  })

  return (
    <>
    <Header/>
    <Banner title='Seller'/>
    <Main title='seller'/>
    <Footer/>
    </>
  )
}

export default seller