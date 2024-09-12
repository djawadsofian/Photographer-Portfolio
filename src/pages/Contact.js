import { useState } from 'react';
import image from '../img/contact/contact.png';
import { motion } from 'framer-motion';
import { transition1 } from '../transitions';
import { ref, push } from 'firebase/database';
import { database } from '../firebase';

const Contact = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const phoneRegex = /^(05|06|07)\d{8}$/;

    // Allow users to type up to 10 digits
    if (value.length <= 10) {
      setPhone(value);

      // Validate only if the length is exactly 10
      if (value.length === 10 && !phoneRegex.test(value)) {
        setPhoneError('Phone number must be 10 digits and start with 05, 06, or 07');
      } else {
        setPhoneError(''); // Clear error if valid or less than 10 digits
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phoneError && phone.length === 10) {
      const contactsRef = ref(database, 'contact');

      // Push the new contact message to Firebase
      push(contactsRef, {
        name,
        phone,
        message,
        timestamp: formatDate(Date.now()),
      })
        .then(() => {
          alert('Message sent successfully!');
          setName('');
          setPhone('');
          setMessage('');
        })
        .catch((error) => {
          console.error('Error sending message: ', error);
        });
    } else {
      alert('Please provide a valid phone number.');
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={transition1}
      className="section bg-white"
    >
      <div className="container mx-auto h-full">
        <div className="flex flex-col lg:flex-row h-full items-center justify-start pt-36 gap-x-8 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={transition1}
            className="hidden lg:flex bg-[#eef7f9] absolute bottom-0 left-0 right-0 top-72 -z-10"
          ></motion.div>
          <div className="lg:flex-1 lg:pt-32 px-4">
            <h1 className="h1">Contact me</h1>
            <p>I would love to get suggestions from you.</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
              <div className="flex gap-x-10">
                <input
                  className="outline-none border-b border-b-primary h-[60px] bg-transparent font-secondary w-full pl-3 placeholder:text-[#757871]"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your name"
                />
                <input
                  className={`outline-none border-b border-b-primary h-[60px] bg-transparent font-secondary w-full pl-3 placeholder:text-[#757871] ${
                    phoneError ? 'border-b-red-500' : ''
                  }`}
                  type="text"
                  value={phone}
                  onChange={handlePhoneChange}
                  required
                  placeholder="Your phone number"
                />
              </div>
              {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
              <input
                className="outline-none border-b border-b-primary h-[60px] bg-transparent font-secondary w-full pl-3 placeholder:text-[#757871]"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder="Your message"
              />
              <button className="btn mb-[30px] mx-auto lg:mx-0 self-start">Send it</button>
            </form>
          </div>
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ transition: transition1, duration: 1.5 }}
            className="lg:flex-1"
          >
            <img className="lg:h-screen" src={image} alt="image" />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;


