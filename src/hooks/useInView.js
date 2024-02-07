//--------------------------------------------------------------------------------------//
//                                      useInView                                       //
//                Use this hook to detect if an element is in the viewport.             //
//--------------------------------------------------------------------------------------//

// This hook takes a ref to an element and returns whether that element is in view.
// It also takes an optional thresholds array to set the % of the element that must be in view.
import { useState, useEffect } from 'react';

/* Arguments: 
    - Ref to element 
    - Options: threshold, delay, playOnce, isDarkMode
*/

const useInView = (refs, { threshold = [0.1], delay = 0, playOnce, isDarkMode, sectionName } = {}) => {
    // State to keep track of whether the element has been in view
    const [hasBeenInView, setHasBeenInView] = useState(false);
    const [startAnimation, setStartAnimation] = useState(false);

    useEffect(() => {
        // Convert refs to an array if it's not already an array
        const refsArray = Array.isArray(refs) ? refs : [refs];

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    const isInView = entry.isIntersecting;

                    console.log(`Section: ${sectionName}`); 

                    // Check for dark mode and reapply class if necessary
                    if (isDarkMode && isInView) {
                        entry.target.classList.add('dark-mode');
                    }

                    // Play animation every time if playOnce arg is false
                    if (isInView) {
                        setTimeout(() => {
                            setStartAnimation(true);
                        }, delay);
                    }

                    // Update hasBeenInView based on playOnce
                    if (playOnce && isInView && !hasBeenInView) {
                        setHasBeenInView(true);
                    } else if (!playOnce && !isInView) {
                        setHasBeenInView(false);
                        setStartAnimation(false);
                    }
                });
            },
            { threshold }
        );

        // Observe all refs in the array
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
    }, [refs, hasBeenInView, threshold, delay, playOnce, isDarkMode, sectionName]); 

    return startAnimation;
};

export default useInView;
