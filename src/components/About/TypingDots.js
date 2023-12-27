import React, { useState, useEffect, useRef } from 'react'; // Import necessary hooks and components from React

// TypingDots: component for displaying typing animation and messages
const TypingDots = ({ startAnimation }) => {
  const timerRef = useRef(null);                                     // Keeps track of the timer
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0); // Tracks the current message index
  const [messages, setMessages] = useState([]);                      // Stores all the messages
  const [isFirstIteration, setIsFirstIteration] = useState(true);    // Checks if it's the first iteration
  const showTypingDots = false;                                      // Decides if typing dots show in general
  const [showTypingDotsAfterFirst, setShowTypingDotsAfterFirst] = useState(true); // Decides if typing dots show after the first message
  const [typingDotsVisible, setTypingDotsVisible] = useState(false); // Controls visibility of typing dots
  const [typingDotsDelay, setTypingDotsDelay] = useState(400);       // Delay before typing dots animation starts

  // Array of messages to be displayed
  const messageArray = [
    <>Hello! My name is Kevin.</>,
    <>I'm currently a senior CS student here at Sac State, graduating in Spring.<br></br></>,
    <>I love coding as both work & as a pastime, but I also like manga, art, and getting boba with my partner, Emma.</>,
    <>Thank you for taking the time to visit my website!</>,
  ];

  // Delays between messages in milliseconds
  let delays = [0,0,0,0];

  // Effect hook to handle the display of messages and typing dots
  useEffect(() => {
    // Check if animation should start via passed in arg & if it's the first iteration
    if (startAnimation) { 

      // Function to display the next message
      const displayNextMessage = () => {
        if (currentMessageIndex < messageArray.length) {      // Check if there are more messages to display
          setTypingDotsVisible(false);                        // Hide typing dots before showing next message
          setMessages(prevMessages => [...prevMessages, messageArray[currentMessageIndex]]); // Add next message to the list
          setCurrentMessageIndex(prevIndex => prevIndex + 1); // Increment message index
        } else {
          clearInterval(timerRef.current);                    // Clear interval when all messages are displayed
        }
      };
      
      // Determine the duration for each interval based on the index
      const intervalDuration = currentMessageIndex < delays.length ? delays[currentMessageIndex] : 1000;
      timerRef.current = setInterval(displayNextMessage, intervalDuration); // Set interval for displaying messages

      // Show typing dots with a delay
      setTimeout(() => {
        setTypingDotsVisible(true); // Make typing dots visible after the set delay
      }, typingDotsDelay);
    } else {
      // Reset states when animation is not started
      clearInterval(timerRef.current); // Clear the timer
      setCurrentMessageIndex(0);       // Reset message index
      setMessages([]);                 // Clear messages
      setIsFirstIteration(true);       // Reset iteration flag
      setTypingDotsVisible(false);     // Hide typing dots
    }

    // Cleanup function to clear the interval
    return () => {
      clearInterval(timerRef.current); // Clear the timer on component unmount
    };
  }, [startAnimation, currentMessageIndex, isFirstIteration, typingDotsDelay]);

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
