import Head from 'next/head'
import Image from 'next/image'

import styles from '../styles/Home.module.css'
import Faq from "../components/widgets/Faq.tsx";
import Hero from "../components/widgets/Hero.tsx";
import Inquiries from "../components/widgets/Inquiries.tsx";
import Results from "../components/widgets/Results.tsx";
import SelectedWork from "../components/widgets/SelectedWork.tsx";
import Testimonials from "../components/widgets/Testimonials.tsx";
import WhyUs from "../components/widgets/WhyUs.tsx";
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function Home() {
  return (
    <main>
    <Header/>
    <Hero />
    <Results />
    <Inquiries />
    <div className="bg-[url('/assets/pngwing2.png')] overflow-hidden">
    <WhyUs />
    <SelectedWork/>
    </div>
    <Testimonials/>
    <Faq/>
    <Footer/>
  </main>
  )
}
