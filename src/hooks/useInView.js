//--------------------------------------------------------------------------------------//
//                                      useInView                                       //
//  Use this hook to detect if an element is in the viewport & rendered. Now supports   //
//  checking for images and videos to be fully loaded before starting animations.       //
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
        isDarkMode, // Dark mode state
        sectionName, // Name of the section for potential future use
    } = {}
) => {
    // State to keep track of whether the element has been in view
    const [hasBeenInView, setHasBeenInView] = useState(false);
    // State to control the start of the animation
    const [startAnimation, allowAnimation] = useState(false);
    // State to track if all media (images and videos) are loaded
    const [allMediaLoaded, setAllMediaLoaded] = useState(false);

    // Function to check if all images and videos within the ref are fully loaded
    const checkMediaLoaded = (ref) => {
        const media = ref.current ? ref.current.querySelectorAll('img, video') : [];
        if (media.length === 0) {
            setAllMediaLoaded(true);
            return;
        }

        let loadedMedia = 0; // Counter for loaded media items
        const eventListeners = []; // To keep track of event listeners for cleanup

        const handleLoad = () => {
            loadedMedia++; // Increment for each loaded media item
            if (loadedMedia === media.length) {
                setAllMediaLoaded(true); // Set true when all media are loaded
            }
        };

        media.forEach((item) => {
            const onLoad = () => handleLoad();
            const onError = () => handleLoad(); // Consider error as loaded for simplicity

            if (item.tagName === 'IMG') {
                if (item.complete) {
                    handleLoad(); // If image is already loaded
                } else {
                    item.addEventListener('load', onLoad);
                    item.addEventListener('error', onError);
                    eventListeners.push({ item, eventType: 'load', handler: onLoad });
                    eventListeners.push({ item, eventType: 'error', handler: onError });
                }
            } else if (item.tagName === 'VIDEO' && item.readyState >= 3) {
                handleLoad(); // If video is already loaded
            } else {
                item.addEventListener('loadeddata', onLoad);
                item.addEventListener('error', onError);
                eventListeners.push({ item, eventType: 'loadeddata', handler: onLoad });
                eventListeners.push({ item, eventType: 'error', handler: onError });
            }
        });

        // Cleanup function for removing event listeners
        const cleanupEventListeners = () => {
            eventListeners.forEach(({ item, eventType, handler }) => {
                item.removeEventListener(eventType, handler);
            });
        };

        return cleanupEventListeners;
    };

    // useEffect hook to observe the element and start animation
    useEffect(() => {
        const refsArray = Array.isArray(refs) ? refs : [refs];
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    const isInView = entry.isIntersecting;

                    if (isDarkMode && isInView) {
                        entry.target.classList.add('dark-mode');
                    }

                    if (isInView && allMediaLoaded) {
                        setTimeout(() => allowAnimation(true), delay);
                    } else {
                        allowAnimation(false);
                    }

                    if (isInView && !hasBeenInView) {
                        setHasBeenInView(true);
                    } else if (!isInView) {
                        setHasBeenInView(false);
                        allowAnimation(false);
                    }
                });
            },
            { threshold }
        );

        let cleanupFunctions = [];
        refsArray.forEach(ref => {
            if (ref.current) {
                observer.observe(ref.current);
                const cleanupEventListener = checkMediaLoaded(ref);
                if (cleanupEventListener) {
                    cleanupFunctions.push(cleanupEventListener);
                }
            }
        });

        return () => {
            refsArray.forEach(ref => {
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            });
            cleanupFunctions.forEach(cleanup => cleanup());
        };
    }, [refs, hasBeenInView, threshold, delay, isDarkMode, sectionName, startAnimation, allMediaLoaded]);

    return startAnimation; // Return the animation state
};

export default useInView;
