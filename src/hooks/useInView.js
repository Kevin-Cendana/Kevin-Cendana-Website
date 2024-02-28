//--------------------------------------------------------------------------------------//
//                                      useInView                                       //
//                Use this hook to detect if an element is in the viewport.             //
//--------------------------------------------------------------------------------------//

// Import necessary hooks from React
import { useState, useEffect } from 'react';

/* Arguments: 
    - Ref to element 
    - Options: threshold, delay, playOnce, isDarkMode, sectionName */

const useInView = (
    refs, 
    { 
        threshold = [0.1], // Set default threshold
        delay = 0, // Set default delay
        playOnce = true, // Determines if animation should only play once
        isDarkMode, // Dark mode state
        sectionName, // Name of the section for potential future use
    } = {}
) => {
    // State to keep track of whether the element has been in view
    const [hasBeenInView, setHasBeenInView] = useState(false);
    // State to control the start of the animation
    const [startAnimation, allowAnimation] = useState(false);
    // New state to track if all images are loaded
    const [allImagesLoaded, setAllImagesLoaded] = useState(false);

    // Function to check if all images within the ref are fully loaded
    const checkImagesLoaded = (ref) => {
        const images = ref.current ? ref.current.querySelectorAll('img') : [];
        let loadedImages = 0; // Counter for loaded images
        images.forEach((img) => {
            const handleLoad = () => {
                loadedImages++; // Increment for each loaded image
                if (loadedImages === images.length) {
                    setAllImagesLoaded(true); // Set true when all images are loaded
                }
            };
            if (img.complete) {
                handleLoad(); // If image is already loaded
            } else {
                img.addEventListener('load', handleLoad); // Add load event listener
                img.addEventListener('error', handleLoad); // Consider error as loaded for simplicity
            }
        });
        // If there are no images, set as loaded
        if (images.length === 0) {
            setAllImagesLoaded(true);
        }
    };

    // useEffect hook to observe the element and start animation
    useEffect(() => {
        // Convert refs to an array if it's not already an array
        const refsArray = Array.isArray(refs) ? refs : [refs];

        // Create an IntersectionObserver to check if an element is in view
        const observer = new IntersectionObserver(
            (entries) => {
                // For each entry, check if the element is in view
                entries.forEach(entry => {
                    const isInView = entry.isIntersecting; // Check if the element is intersecting

                    // Check for dark mode and reapply class if necessary
                    if (isDarkMode && isInView) {
                        entry.target.classList.add('dark-mode');
                    }

                    // Play animation only if all images are loaded
                    if (isInView && allImagesLoaded) {
                        setTimeout(() => {
                            allowAnimation(true); // Allow animation after specified delay
                        }, delay);
                    } else {
                        allowAnimation(false); // Reset animation state when out of view
                    }

                    // Update hasBeenInView based on playOnce
                    if (playOnce && isInView && !hasBeenInView) {
                        setHasBeenInView(true); // Set has been in view if playOnce is true
                    } else if (!playOnce && !isInView) {
                        setHasBeenInView(false); // Reset has been in view state
                        allowAnimation(false); // Reset animation state
                    }
                });
            },
            { threshold } // Observer options
        );

        // Observe all refs in the array
        refsArray.forEach(ref => {
            if (ref.current) {
                observer.observe(ref.current); // Attach observer to each ref
                checkImagesLoaded(ref); // Check if images are loaded
            }
        });

        // Cleanup function to unobserve refs
        return () => {
            refsArray.forEach(ref => {
                if (ref.current) {
                    observer.unobserve(ref.current); // Detach observer
                }
            });
        };
    }, [refs, hasBeenInView, threshold, delay, playOnce, isDarkMode, sectionName, startAnimation, allImagesLoaded]); // Dependency array

    return startAnimation; // Return the animation state
};

export default useInView;
