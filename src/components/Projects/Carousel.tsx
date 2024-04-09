//--------------------------------------------------------------------------------------//
//                                     Carousel.tsx                                     //
//          Credit: Large chunk of code from React Round Carousel by scriptex:          //
//                  https://github.com/scriptex/react-round-carousel                    //
//--------------------------------------------------------------------------------------//



import TouchSweep from 'touchsweep'; // For touch gestures.
import { v4 as uuid } from 'uuid';  // To generate unique IDs.
import React, {
  FC,                  // FC is shorthand for FunctionComponent, a type of React component.
  useRef,              // To reference DOM elements.
  useMemo,             // To memorize values.
  useState,            // To manage state in the component.
  useEffect,           // To perform side effects in the component.
  forwardRef,          // To pass refs down to child components.
  useCallback,         // To memorize functions.
  CSSProperties,       // Type for CSS properties in JSX.
  useImperativeHandle  // To customize the instance value exposed to parent components when using refs.
} from 'react';


// Type definitions for different props and items used in the carousel.
export type CarouselItem = Readonly<{
    alt?: string; // Optional alt text for images.
    image?: string; // URL of the image.
    imageWebp?: string; // URL of the image in WebP format.
    videoWebp?: string; // URL of the video in WebP format.
    videoMp4?: string; // URL of the video in MP4 format.
    content: React.ReactNode; // Content to display, can be any React node.
    onClick?: () => void; // Optional click handler function.
}>;


export type DecoratedCarouselItem = CarouselItem & Readonly<{ id: string }>;

// Various props to customize the carousel, like items, width, controls, etc.
export type CarouselProps = Readonly<{
	ref?: React.ForwardedRef<CarouselRef>;
	items: CarouselItem[];
	itemWidth?: number;
	showControls?: boolean;
	slideOnClick?: boolean;
	classNamePrefix?: string;
	nextButtonContent?: string | React.ReactNode;
	prevButtonContent?: string | React.ReactNode;
}>;

// Methods available on the carousel's ref object.
export type CarouselRef = Readonly<{
	next: () => void;
	prev: () => void;
	getItems: () => DecoratedCarouselItem[];
	getSelectedIndex: () => number;
	setSelectedIndex: (index: number) => void;
}>;

// The main Carousel component
export const Carousel: FC<CarouselProps> = forwardRef((
    {
        items,
        itemWidth = 250,
        showControls = true,
        slideOnClick = false,
        classNamePrefix = 'carousel',
        prevButtonContent = 'Previous',
        nextButtonContent = 'Next'
    }: CarouselProps,
    CarouselRef
) => {

// Add these lines at the beginning of your Carousel component
const slideRef = useRef<HTMLDivElement>(null);
const [slideWidth, setSlideWidth] = useState(0);
    
// Add this useEffect hook to measure the width of the slide
useEffect(() => {
    if (slideRef.current) {
        setSlideWidth(slideRef.current.offsetWidth);
    }
}, []);
	

    // Refs and state initialization
    const ref = useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
	
    // State and effect for handling window resize
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Enhancing carousel items with unique IDs and memorizing the calculation
    const data: DecoratedCarouselItem[] = useMemo(
        () => items.map((item: CarouselItem) => ({
            ...item,
            id: (item as DecoratedCarouselItem).id || uuid()
        })),
        [items]
    );
    // Carousel geometry calculations
    const len = useMemo(() => data.length, [data.length]);

    // Function for corrected selected index
    const getCorrectedIndex = useCallback(() => {
        if (selectedIndex < 0) {
            return ((selectedIndex % len) + len) % len;
        }
        return selectedIndex % len;
    }, [selectedIndex, len]);

// Style calculation for slides and carousel container
const getSlideStyle = useCallback(
    (index: number): CSSProperties => {
        const correctedIndex = getCorrectedIndex();
        const isCurrentSlide = correctedIndex === index;

        return {
            opacity: 1, // Set opacity to 1 for all slides
            transform: `translateX(${(index - correctedIndex) * (10 + slideWidth)}px)`, // Move each slide to the right by 10px + slide width
        };
    },
    [getCorrectedIndex, slideWidth]
);

const getItemStyle = useCallback((): CSSProperties => {
    return {
        transform: 'translateX(0)'
    };
}, []);

    // Helper function for className generation
    const getClassName = useCallback(
        (parts: string | string[]) =>
            Array.isArray(parts)
                ? parts.map(part => `${classNamePrefix}${part}`).join(' ')
                : `${classNamePrefix}${parts}`,
        [classNamePrefix]
    );

    // Functions for navigating slides
    const prev = useCallback(
        () => setSelectedIndex(selectedIndex - 1),
        [selectedIndex]
    );

    const next = useCallback(
        () => setSelectedIndex(selectedIndex + 1),
        [selectedIndex]
    );

    // Adding and removing touch gestures, swipe, and keyboard event listeners
    useEffect(() => {
        const area = ref?.current;
        const touchsweep = new TouchSweep(area ?? undefined);

        // Add swipe event listeners for touch gestures
        area?.addEventListener('swipeleft', next);
        area?.addEventListener('swiperight', prev);

        // Handling arrow key presses for keyboard navigation
        const handleKeyDown = (event) => {
            if (event.keyCode === 37) { // Left arrow key
                prev();
            } else if (event.keyCode === 39) { // Right arrow key
                next();
            }
        };

        // Add keyboard event listener
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            // Unbind touchsweep and remove swipe event listeners
            touchsweep.unbind();
            area?.removeEventListener('swipeleft', next);
            area?.removeEventListener('swiperight', prev);

            // Remove keyboard event listener
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [next, prev]);


    // Exposing methods to parent component via ref
    useImperativeHandle(
        CarouselRef,
        (): CarouselRef => ({
            next,
            prev,
            getItems: () => data,
            getSelectedIndex: () => getCorrectedIndex(),
            setSelectedIndex: (index: number) => setSelectedIndex(index)
        }),
        [next, prev, data, getCorrectedIndex, setSelectedIndex]
    );

    // Rendering the carousel
    return (
        <>
            <div className={getClassName('')} ref={ref}>
                <div className={getClassName('__container')} style={getItemStyle()}>
                {data.map((item: DecoratedCarouselItem, index: number) => (
                    <div key={item.id} style={getSlideStyle(index)} onClick={() => {
                        if (item.onClick) item.onClick();
                        if (slideOnClick) setSelectedIndex(index);
                    }} 
                    ref={slideRef}
                    className={getClassName('__slide')}>
                            { 
                            item.videoWebp? (
                                /* Check if the carousel item has a webp video, with mp4 as fallback */
                                <video autoPlay loop muted playsInline>
                                <source src={item.videoWebp} type="video/webp" />
                                Your browser does not support this video.
                            </video>
                            ) :
                            item.videoMp4 ? (
                                <video autoPlay loop muted playsInline>
                                    <source src={item.videoMp4} type="video/mp4" />
                                    Your browser does not support this video.
                                </video>
                            ) : 
                            item.imageWebp ? (
                                /* Then check for WebP images, with PNG/GIF fallback */
                                <picture>
                                    <source srcSet={item.imageWebp} type="image/webp" />
                                    <img src={item.image} alt={item.alt || 'Carousel item'} />
                                </picture>
                            ) : 
                            (
                                /* Fallback to PNG/GIF image if no WebP */
                                <img src={item.image} alt={item.alt || 'Carousel item'} />
                            )}

                        </div>
                    ))}
                </div>
            </div>
        </>
    );
});

export default Carousel;
