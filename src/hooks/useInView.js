//--------------------------------------------------------------------------------------//
//                                      useInView                                       //
//                Use this hook to detect if an element is in the viewport.             //
//--------------------------------------------------------------------------------------//

import { useState, useEffect } from 'react';

const useInView = (ref, threshold = 0.7) => {
    // This state now tracks whether the element has been in view at least once.
    const [hasBeenInView, setHasBeenInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Only update if the element is in view and hasn't been in view before.
                if (entry.isIntersecting && !hasBeenInView) {
                    setHasBeenInView(true);
                }
            },
            { threshold }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        // Cleanup function: Stops observing the element when the component unmounts.
        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, hasBeenInView, threshold]); // Added hasBeenInView to the dependency array.

    return hasBeenInView; // Return whether the element has been in view at least once.
};

export default useInView;

