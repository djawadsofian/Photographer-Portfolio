import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { transition1 } from '../transitions';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase'; // Import storage instead of app
import { FaEye, FaPlay } from 'react-icons/fa';

const Portfolio = () => {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [showingImages, setShowingImages] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState(null); // To store the clicked image/video URL
  const [isVideo, setIsVideo] = useState(false); // To determine if media is a video

  useEffect(() => {
    const fetchFiles = async (path, setter) => {
      try {
        const listRef = ref(storage, path);
        const result = await listAll(listRef);
        const urls = await Promise.all(result.items.map((item) => getDownloadURL(item)));
        setter(urls);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles('images', setImages);
    fetchFiles('videos', setVideos);
  }, []);

  const handleMediaClick = (url, mediaType) => {
    setSelectedMedia(url);
    setIsVideo(mediaType === 'video');
    
    window.scrollTo({
      top: "120px", 
      behavior: 'smooth' 
    });

    // Prevent scrolling on body after clicking
    document.body.style.overflowY = 'hidden';
  };

  const closeModal = () => {
    setSelectedMedia(null);
    document.body.style.overflowY = '';
  };

  return (
    <motion.section
      className="section  " 
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={transition1}
    >
      <div className="container mx-auto flex flex-col items-center pt-28 pb-8 lg:py-32  ">
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: '-80%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-80%' }}
            transition={transition1}
          >
            <h1 className="text-4xl font-bold mb-4">Portfolio</h1>
            <p className="mb-8 text-lg mx-2">
              I am Adem Guidoum, a <b>photographer</b> and <b>film maker</b>.
              <br /> Let's showcase some of my work.
            </p>
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={() => setShowingImages(true)}
                className={`btn-not-active ${showingImages ? 'btn-active' : ''}`}
              >
                Show Images
              </button>
              <button
                onClick={() => setShowingImages(false)}
                className={`btn-not-active ${!showingImages ? 'btn-active' : ''}`}
              >
                Show Videos
              </button>
            </div>
          </motion.div>
        </div>
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 px-2">
          {showingImages
            ? images.map((url, index) => (
                <div
                  key={index}
                  className="relative w-full h-[200px] bg-accent overflow-hidden flex items-center justify-center group"
                >
                  <img
                    className="object-cover w-full h-full hover:scale-110 transition-all duration-500 cursor-pointer"
                    src={url}
                    alt={`image-${index}`}
                    onClick={() => handleMediaClick(url, 'image')} // Handle image click
                  />
                  <FaEye className="absolute opacity-0 group-hover:opacity-100 text-white text-4xl z-50" />
                </div>
              ))
            : videos.map((url, index) => (
                <div
                  key={index}
                  className="relvative w-full h-[200px] bg-accent overflow-hidden flex items-center justify-center group"
                >
                  <div>
                    
                  </div>
                  <video
                    className="object-cover w-full h-full hover:scale-110 transition-all duration-500 cursor-pointer"
                    src={url}
                    onClick={() => handleMediaClick(url, 'video')} // Handle video click
                    alt={`video-${index}`}
                  />
                  <FaPlay className="absolute opacity-0 group-hover:opacity-100 text-white text-4xl" />
                </div>
              ))}
        </div>
      </div>

      {/* Modal to display the selected media (image or video) */}
      {selectedMedia && (
        <div className="fixed top-[60px] w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50" >
          <div className="relative max-w-5xl w-auto mx-auto my-auto p-4" >
            {isVideo ? (
              <video src={selectedMedia} controls className="sm:p-4 max-w-full sm:max-h-[500px]" />
            ) : (
              <img src={selectedMedia} alt="Selected" className="sm:p-4 max-w-full sm:max-h-[500px]" />
            )}
            <button
              className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full cursor-pointer"
              onClick={closeModal}
            >
              X
            </button>
          </div>
        </div>
      )}
    </motion.section>
  );
};

export default Portfolio;




