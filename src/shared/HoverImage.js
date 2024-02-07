import React, { useState, useEffect, useRef } from 'react';
import useInView from '../hooks/useInView';
function HoverImage(props) {
    const { defaultImage, hoverImage, playCount = 1, playOnce = true } = props;
    const [currentImage, setCurrentImage] = useState(defaultImage);
    const [playCounter, setPlayCounter] = useState(0);
    const [animationDone, setAnimationDone] = useState(false);  // State to check if in view animation is done
    const imageRef = useRef(null);
    
  
    // Function to handle mouse entering the image area
    const handleMouseEnter = () => {
      // The animation has to finish first (when it comes in view) before hovering again
      if (animationDone) {
        setCurrentImage(hoverImage);
      }
    };
  
    // Function to handle mouse leaving the image area
    const handleMouseLeave = () => {
      // The animation has to finish first (when it comes in view) before hovering again
      if(animationDone) { 
        setCurrentImage(defaultImage);
      }
    };
  
    // Use the useInView hook
    const startAnimation = useInView(imageRef, { playOnce });
  
    useEffect(() => {
      if (startAnimation && playCounter < playCount) {
        setCurrentImage(hoverImage);
        let timer = setTimeout(() => {
          setCurrentImage(defaultImage);
          setPlayCounter(playCounter + 1);
          setAnimationDone(true); // Set animationDone to true after the first play
        }, 2800); // Adjust the timeout to control how long the hover image is shown
  
        return () => clearTimeout(timer);
      }
  
      // Reset playCounter when the component goes out of view
      if (!startAnimation && playCounter === playCount) {
        setPlayCounter(0);
        setAnimationDone(false);
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
  