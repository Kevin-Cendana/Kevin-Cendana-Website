//--------------------------------------------------------------------------------------//
//                                      useInView                                       //
//                Use this hook to detect if an element is in the viewport.             //
//--------------------------------------------------------------------------------------//

// This hook takes a ref to an element and returns whether that element is in view.
// It also takes an optional thresholds array to set the % of the element that must be in view.
import { useState, useEffect } from 'react';
import { useWindowLoad } from '../shared/WindowLoadContext';

/* Arguments: 
    - Ref to element 
    - Options: threshold, delay, playOnce, isDarkMode */

const useInView = (
    refs, 
    { 
        threshold = [0.1], 
        delay = 0, 
        playOnce, 
        isDarkMode, 
        sectionName,
    } = {}
) => {
    // State to keep track of whether the element has been in view
    const [hasBeenInView, setHasBeenInView] = useState(false);
    const [startAnimation, allowAnimation] = useState(false);
    const isWindowLoaded = useWindowLoad();


    useEffect(() => {
        // Ensure this part of the hook does not run until the window has fully loaded
        if (!isWindowLoaded) return;

        // Convert refs to an array if it's not already an array
        const refsArray = Array.isArray(refs) ? refs : [refs];

        // Check if the window has fully loaded
        const observer = new IntersectionObserver(
            (entries) => {
                // For each entry, check if the element is in view
                entries.forEach(entry => {
                    // Boolean to check if the window has fully loaded
                    const isInView = entry.isIntersecting;

                    console.log(`Section: ${sectionName}`); 

                    // Check for dark mode and reapply class if necessary
                    if (isDarkMode && isInView) {
                        entry.target.classList.add('dark-mode');
                    }

                    // Play animation every time if playOnce arg is false
                    if (isInView) {
                        setTimeout(() => {
                            allowAnimation(true);
                        }, delay);
                    }
                    else {
                        allowAnimation(false); // Ensures state resets when out of view
                    }

                    // Update hasBeenInView based on playOnce
                    if (playOnce && isInView && !hasBeenInView) {
                        setHasBeenInView(true);
                    } else if (!playOnce && !isInView) {
                        setHasBeenInView(false);
                        allowAnimation(false);
                    }
                });
            },
            { threshold }
        );

        // Observe all refs in the array. This is what actually attaches the observer to the elements
        refsArray.forEach(ref => {
            if (ref.current) {
                observer.observe(ref.current);
            }
        });

        // Cleanup
        return () => {
            refsArray.forEach(ref => {
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            });
        };
    }, [refs, hasBeenInView, threshold, delay, playOnce, isDarkMode, sectionName, startAnimation, isWindowLoaded]); 

    return startAnimation;
};

export default useInView;
