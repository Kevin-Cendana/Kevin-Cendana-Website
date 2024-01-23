import React, { useState, useEffect, useMemo, useRef } from 'react'; // Import necessary hooks and components from React

// TypingDots: component for displaying typing animation and messages
const TypingDots = ({ startAnimation }) => {
  const timerRef = useRef(null);                                     // Keeps track of the timer
  const [lastAnimationStart, setLastAnimationStart] = useState(0);    // Delay between animating speech bubbles again
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0); // Tracks the current message index
  const [messages, setMessages] = useState([]);                      // Stores all the messages
  const [, setIsFirstIteration] = useState(true);    // Checks if it's the first iteration
  const showTypingDots = false;                                      // Decides if typing dots show in general
  const [showTypingDotsAfterFirst] = useState(true); // Decides if typing dots show after the first message
  const [typingDotsVisible, setTypingDotsVisible] = useState(false); // Controls visibility of typing dots
  const [typingDotsDelay] = useState(400);       // Delay before typing dots animation starts

  // Array of messages to be displayed
  const messageArray = useMemo(() => [
    <>Hello! My name is Kevin.</>,
    <>I'm currently a senior CS student here at Sacramento State, graduating May 2024.<br></br></>,
    <>I love coding as both work & as a pastime, but I also like manga, art, and getting boba with my partner, Emma.</>,
    <>Thank you for taking the time to visit my website!</>,
  ], []);

  // Delays between messages in milliseconds
  const delays = useMemo(() => [0, 0, 0, 0], []);

  // Effect hook for starting and stopping the animation
useEffect(() => {
  if (startAnimation) {
    const now = Date.now();
    // Start the animation if it's been more than 1 second since the last animation
    if (now - lastAnimationStart > 1000) {
      setMessages([]); // Clear existing messages
      setCurrentMessageIndex(0); // Reset index
      setIsFirstIteration(true); // Reset iteration flag
      setLastAnimationStart(now);
    }
  } else {
    // Stop the animation
    clearInterval(timerRef.current); // Clear the interval
    setMessages([]); // Clear messages
    setCurrentMessageIndex(0); // Reset index
    setIsFirstIteration(false); // Update iteration flag
    setTypingDotsVisible(false); // Hide typing dots
  }

  // Cleanup function to clear the interval
  return () => {
    clearInterval(timerRef.current); // Clear the interval when component unmounts or startAnimation changes
  };
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [startAnimation]); // Dependency array includes only startAnimation

  // Effect hook for handling message display and typing dots
  useEffect(() => {
    if (currentMessageIndex < messageArray.length && startAnimation) {
      // Function to display the next message
      const displayNextMessage = () => {
        setTypingDotsVisible(false); // Hide typing dots
        setMessages(prevMessages => [...prevMessages, messageArray[currentMessageIndex]]); // Add next message
        setCurrentMessageIndex(prevIndex => prevIndex + 1); // Increment index
      };

      // Determine the interval duration for the current message
      const intervalDuration = currentMessageIndex < delays.length ? delays[currentMessageIndex] : 1000;
      timerRef.current = setTimeout(displayNextMessage, intervalDuration); // Set timeout for current message

      // Show typing dots with a delay, if needed
      if (showTypingDots && showTypingDotsAfterFirst && currentMessageIndex < messageArray.length - 1) {
        setTimeout(() => {
          setTypingDotsVisible(true); // Show typing dots
        }, typingDotsDelay);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMessageIndex, startAnimation]); // Dependencies include currentMessageIndex and startAnimation

  // Function to render speech bubbles with messages
  const renderSpeechBubbles = () => {
    let components = []; // Initialize array to hold speech bubble components

    // Iterate through each message
    messages.forEach((message, index) => {                 
      const isLastMessage = index === messages.length - 1; // Check if current message is the last
      const bubbleClass = isLastMessage ? "speechBubble" : "speechBubble hideTail"; // Assign class based on message position
      components.push(
        <div key={`message-${index}`} className={bubbleClass}>
          <p>{message}</p> {/* Display message in a speech bubble*/}
        </div>
      );

      // Conditionally render typing dots after the last message
      if (showTypingDots && showTypingDotsAfterFirst && typingDotsVisible && index === messages.length - 1 && index !== messageArray.length - 1 && startAnimation) {
        components.push(
          <div key={`dots-${index}`} className="typingDots typingDotsVisible">
            {/* 3 dots for typing animation, looks like the typing dots for iMessage */}
            <div className="dot"></div> 
            <div className="dot"></div> 
            <div className="dot"></div> 
          </div>
        );
      }
    });

    return components; // Return the array of components
  };

  // Render the speech bubbles
  return <div id="allSpeechBubblesWrapper">{renderSpeechBubbles()}</div>;
};

export default TypingDots; 
