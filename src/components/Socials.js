import React from 'react';
 import {
  ImFacebook,
  ImInstagram,
 } from 'react-icons/im';
import { Link } from 'react-router-dom';
const Socials = () => {
  return (
  <div className='hidden xl:flex ml-24'>
    <ul className='flex flex-row gap-x-3'>
    <il><a href="https://www.facebook.com/profile.php?id=100075627710406" target='_blank'>
    <ImFacebook/>
    </a></il>
    <il><a href="https://www.instagram.com/adem_guidoum.1/" target='_blank'>
    <ImInstagram/>
    </a></il>
    </ul>
    
    
  </div>
  );
};

export default Socials;
