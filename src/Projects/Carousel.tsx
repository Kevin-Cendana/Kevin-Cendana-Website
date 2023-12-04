//--------------------------------------------------------------------------------------//
//                                     Carousel.tsx                                     //
//--------------------------------------------------------------------------------------//

// Credit: Chunk of code from React Round Carousel by scriptex: https://github.com/scriptex/react-round-carousel


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
import './Carousel.css';

// Type definitions for different props and items used in the carousel.
export type CarouselItem = Readonly<{
    alt?: string; // Optional alt text for images.
    image: string; // URL of the image.
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
export const Carousel: FC<CarouselProps> = forwardRef(
	(
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
		const data: DecoratedCarouselItem[] = useMemo(
			() =>
				items.map(item => ({
					...item,
					...((item as unknown as DecoratedCarouselItem).id
						? ({} as unknown as DecoratedCarouselItem)
						: { id: uuid() })
				})),
			[items]
		);


        // Padding adjustment
        // Change to add more space between slides (combo w/ angle)
        const padding = 0;

        // Angle adjustment for previous and next slides 
        // Higher = Tilt further away from center
        const additionalAngle = -3; 

        const [targetIndex, setTargetIndex] = useState(null);

        const [isGoingForward, setIsGoingForward] = useState(true);
		const len = useMemo(() => data.length, [data.length]);
		const theta = useMemo(() => 360 / len, [len]);
        const radius = useMemo(
            () => Math.round((itemWidth + padding) / 2 / Math.tan(Math.PI / len)),
            [itemWidth, len, padding] 
        );
        

		const ref = useRef<HTMLDivElement>(null);
		const [selectedIndex, setSelectedIndex] = useState(0);

        const getSlideStyle = useCallback(
			(index: number): CSSProperties => {
				const style: CSSProperties = {};

				if (index < len) {
					const cellAngle = theta * index;

					style.opacity = 1;
					style.transform = `rotateY(${cellAngle}deg) translateZ(${radius}px)`;
				} else {
					style.opacity = 0;
					style.transform = 'none';
				}

				return style;
			},
			[len, radius, theta]
		);
        
        
        

		const getItemStyle = useCallback((): CSSProperties => {
        console.log("Carousel.tsx: getItemStyle() called");
			const angle = theta * selectedIndex * -1;

			return {
				transform: `translateZ(${-1 * radius}px) rotateY(${angle}deg)`
			};
		}, [radius, selectedIndex, theta]);

		const getClassName = useCallback(
			(parts: string | string[]) =>
				Array.isArray(parts)
					? parts
							.map((part: string) => `${classNamePrefix}${part}`)
							.join(' ')
					: `${classNamePrefix}${parts}`,
			[classNamePrefix]
		);

		const prev = useCallback(
			() => setSelectedIndex(selectedIndex - 1),
			[selectedIndex]
		);

		const next = useCallback(
			() => setSelectedIndex(selectedIndex + 1),
			[selectedIndex]
		);


		useEffect(() => {
            console.log("Carousel.tsx: useEffect() called");
			const area = ref?.current;
			const touchsweep = new TouchSweep(area ?? undefined);

			area?.addEventListener('swipeleft', next);
			area?.addEventListener('swiperight', prev);

			return () => {
				touchsweep.unbind();

				area?.removeEventListener('swipeleft', next);
				area?.removeEventListener('swiperight', prev);
			};
		});

		useImperativeHandle(
			CarouselRef,
			(): CarouselRef => ({
				next,
				prev,
				getItems: () => data,
                getSelectedIndex: () => {
                    console.log("getSelectedIndex called, current index: ", selectedIndex % len);
                    return selectedIndex % len;
                  },
                  setSelectedIndex: (index: number) => {
                    console.log("setSelectedIndex called, setting index: ", index);
                    setSelectedIndex(index);
                  }
                
			}),
            
            //[selectedIndex, data]
		);
        
        // Main code
		return (
			<>
                    <div className={getClassName('')} ref={ref}>
                        <div
                            className={getClassName('__container')}
                            style={getItemStyle()}
                        >
                            {data.map(
                                (item: DecoratedCarouselItem, index: number) => (
                                    <div
                                        key={item.id}
                                        style={getSlideStyle(index)}
                                        onClick={() => {
                                            if (item.onClick) item.onClick();
                                            if (slideOnClick)
                                                setSelectedIndex(index);
                                        }}
                                        className={getClassName('__slide')}
                                    >
                                        <img src={item.image} alt={item.alt} />
                                        <div
                                            className={getClassName(
                                                '__slide-overlay'
                                            )}
                                        >
                                            {item.content}
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
			</>
		);
	}
);

export default Carousel;