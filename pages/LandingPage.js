import React from 'react'
import Header from '../components/LandingComp/Header'
import Footer from '../components/LandingComp/Footer'
import Hero from '../components/LandingComp/Hero'
import Feature from '../components/LandingComp/Feature'
import { useRef } from 'react';

export default function LandingPage() {

    const featureRef = useRef(null);

    const scrollToFeature = () => {
      featureRef.current.scrollIntoView({ behavior: 'smooth' });
    };
  return (
 <main className="px-10"> 
 <div>
 <Header  scrollToFeature={scrollToFeature}/>

 <Hero/>

 
 <div ref={featureRef}>
          <Feature />
    </div>


<Footer/>



 </div>
    
    </main>
  )
}
