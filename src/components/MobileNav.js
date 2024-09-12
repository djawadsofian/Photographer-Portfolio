import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { CgMenuRight } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Import social media icons
import { FaFacebookF, FaInstagram } from 'react-icons/fa';

const menuVariants = {
  hidden: {
    x: '100%',
  },
  show: {
    x: 0,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.9],
    },
  },
};

const MobileNav = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <nav className='text-primary xl:hidden'>
      {/* Menu Icon */}
      <div onClick={() => setOpenMenu(true)} className='text-3xl cursor-pointer'>
        <CgMenuRight />
      </div>

      {/* Mobile Navigation Menu */}
      <motion.div
        variants={menuVariants}
        initial='hidden'
        animate={openMenu ? 'show' : ''}
        className='bg-white shadow-2xl w-full absolute top-0 right-0 max-w-xs h-screen z-20'
      >
        {/* Close Icon */}
        <div
          onClick={() => setOpenMenu(false)}
          className='text-4xl absolute z-30 left-4 top-14 text-primary cursor-pointer'
        >
          <IoMdClose />
        </div>

        {/* Navigation Links */}
        <ul className='h-full flex flex-col justify-center items-center gap-y-8 text-primary font-bold text-3xl'>
          <li>
            <Link onClick={() => setOpenMenu(false)} to='/'>
              Home
            </Link>
          </li>
          <li>
            <Link onClick={() => setOpenMenu(false)} to='/portfolio'>
              Portfolio
            </Link>
          </li>
          <li>
            <Link onClick={() => setOpenMenu(false)} to='/contact'>
              Contact
            </Link>
          </li>
          <li>
            <Link onClick={() => setOpenMenu(false)} to='/about'>
              About
            </Link>
          </li>
        </ul>

        {/* Social Media Icons */}
        <div className='absolute bottom-10 w-full flex justify-center gap-x-6 text-2xl text-primary'>
          <a href="https://www.facebook.com/profile.php?id=100075627710406" target='_blank' rel='noopener noreferrer'>
            <FaFacebookF className='hover:text-blue-600 transition duration-300' />
          </a>
          <a href="https://www.instagram.com/adem_guidoum.1/" target='_blank' rel='noopener noreferrer'>
            <FaInstagram className='hover:text-pink-500 transition duration-300' />
          </a>
        </div>
      </motion.div>
    </nav>
  );
};

export default MobileNav;

