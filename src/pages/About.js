

import AboutImg from '../img/about/aboutImg.jpg';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';
import { transition1 } from '../transitions';

import  { useState, useEffect } from "react";
import { database } from "../firebase"; // Import your Firebase configuration
import { ref, onValue, set } from "firebase/database";

const About = () => {
  const [aboutInfo, setAboutInfo] = useState("");
  const aboutRef = ref(database, "about");

    useEffect(() => {
        // Fetch the existing "About" information from Firebase
        const fetchAboutInfo = () => {
            onValue(aboutRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setAboutInfo(data);
                }
            });
        };

        fetchAboutInfo();
    }, []);

  return (
    <motion.section className='section' initial={{opacity: 0 , y:'100%'}} animate={{opacity: 1,y:0}} exit={{opacity: 0,y:'100%'}} transition={transition1}>
       <div className='container mx-auto h-full relative'>
          <div className='flex flex-col lg:flex-row h-full items-center justify-center gap-x-24 text-center lg:text-left lg:pt-16'>
            <div className='flex-1 max-h-96 lg:max-h-max order-2 lg:order-none overflow-hidden'>
              <img src={AboutImg} alt='about Image'/>
            </div>
            <motion.div initial={{opacity: 0 , y:'-80%'}} animate={{opacity: 1,y:0}} exit={{opacity: 0,y:'-80%'}} transition={transition1}
            className='flex-1 pt-36 pb-14 lg:pt-0 lg:w-auto z-10 flex flex-col justify-center items-center lg:items-start'>
              <h1 className='h1'> About me </h1>
              <p className='mb-12 max-w-sm'>
                {aboutInfo}
              </p>
              <Link to={'/Portfolio'} className='btn'>Veiw my work</Link>
            </motion.div>
          </div>
       </div>
    </motion.section>
  );
};

export default About;
