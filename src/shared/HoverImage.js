import React, { useState, useEffect, useRef } from 'react';
import useInView from '../hooks/useInView';
function HoverImage(props) {
    const { defaultImage, hoverImage, playCount = 1, playOnce = true } = props;
    const [currentImage, setCurrentImage] = useState(defaultImage);
    const [playCounter, setPlayCounter] = useState(0);
    const imageRef = useRef(null);
  
    // Function to handle mouse entering the image area
    const handleMouseEnter = () => {
      setCurrentImage(hoverImage);
    };
  
    // Function to handle mouse leaving the image area
    const handleMouseLeave = () => {
      setCurrentImage(defaultImage);
    };
  
    // Use the useInView hook
    const startAnimation = useInView(imageRef, { playOnce });
  
    useEffect(() => {
      if (startAnimation && playCounter < playCount) {
        setCurrentImage(hoverImage);
        let timer = setTimeout(() => {
          setCurrentImage(defaultImage);
          setPlayCounter(playCounter + 1);
        }, 2800); // Adjust the timeout to control how long the hover image is shown
  
        return () => clearTimeout(timer);
      }
  
      // Reset playCounter when the component goes out of view
      if (!startAnimation && playCounter === playCount) {
        setPlayCounter(0);
      }
    }, [startAnimation, playCounter, playCount, hoverImage, defaultImage]);
  
    return (
      <img 
        ref={imageRef}
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
        src={currentImage} 
        alt="hoverable" 
      />
    );
  }
  
  export default HoverImage;
  