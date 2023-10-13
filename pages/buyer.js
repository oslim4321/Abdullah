import  Main from '../components/Main'
import Banner from '../components/Banner'
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useAuth } from '../context/AuthProvider';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function buyer() {

  const {isLoggedIn} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if(isLoggedIn){
      router.push({pathname:"/"})
    }
  },[]);

  return (
    <>
    <Header/>
    <Banner title='Buyer'/>
    <Main title='buyer'/>
    <Footer/>
    </>
  )
}

export default buyer