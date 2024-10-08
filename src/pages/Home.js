import React from 'react';

import AdemImg from '../img/home/main.png';
import { Link } from 'react-router-dom';

import {motion} from 'framer-motion' ;
import {transition1} from '../transitions'
const Home = () => {
  return (
    <motion.section initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={transition1} className='section'>
      <div className='container mx-auto h-full relative'>
        <div className='flex flex-col justify-center lg:h-screen'>
        <motion.div initial={{opacity: 0 , y: '-50%'}} animate={{opacity: 1 ,y: 0} }  exit={{opacity: 0 ,y: '-50%'}} transition={transition1} 
        className='w-full pt-36 pb-14 lg:pt-0 lg:pb-0 lg:w-auto z-10 lg:absolute flex flex-col justify-center items-center lg:items-start'>
          <h1 className='h1'>Photographer <br/> & Film Maker</h1>
          <p className='text-[26px] lg:text-[36px] font-primary mb-4 lg:mb-12'>Ahmed Rachedi , Mila</p>
          <Link to={'contact'} className='btn mb-[30px]'>Hire me</Link>
        </motion.div>
        <div className='flex justify-end max-h-96 lg:max-h-screen  '>
          <motion.div initial={{scale: 0}} animate={{scale: 1}} exit={{scale: 0}} transition={transition1}
          className='   '>
            <motion.img whileHover={{scale: 1.1 }} transition={transition1} src={AdemImg} alt='main image'/>
          </motion.div>
        </div>
        </div>
      </div>
    </motion.section>
  );
};
export default Home;
