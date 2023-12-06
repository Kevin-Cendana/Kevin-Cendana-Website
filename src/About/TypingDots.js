import React, { useState, useEffect, useRef } from 'react';

/* Typing Dots takes in a prop called startAnimation to know when to start,
 so it only plays when the user sees it */
const TypingDots = ({startAnimation}) => { 
    // Refs for managing timers
  const timer1Ref = useRef(null);
  const timer2Ref = useRef(null);

    // State for managing the display of elements
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);

  const speechBubbleText2 = "I'm currently a Senior in Computer Science at Sacramento State. Personally, I'm really into Web and App Development, but I really just like coding in general!";

  useEffect(() => {
      // Clear any existing timers
      clearTimeout(timer1Ref.current);
      clearTimeout(timer2Ref.current);
      
      if (startAnimation) {
        setIsTyping(true); // Start typing animation

        // Clear any existing timers
        clearTimeout(timer1Ref.current);
        clearTimeout(timer2Ref.current);

        // Start the typing animation with delays
        timer1Ref.current = setTimeout(() => {
          setIsTyping(false); // Stop typing animation
        setMessages(prevMessages => [...prevMessages, "Hello there! My name is Kevin."]);
        console.log('First message should appear');
        
        timer2Ref.current = setTimeout(() => {
            setMessages(prevMessages => [
            ...prevMessages,
            speechBubbleText2,
            ]);
            console.log('Second message should appear');
        }, 1400);
        }, 1400);

        return () => {
          // Cleanup timers on component unmount
        clearTimeout(timer1Ref.current);
        clearTimeout(timer2Ref.current);
        };
      }
    }, [startAnimation]); // Empty dependency array to mimic componentDidMount behavior
  console.log(messages);

  return (
    <div id="allSpeechBubblesWrapper">
      {/* Typing dots should be visible only when isTyping is true */}
      {isTyping && (
        <div className="typingDots typingDotsVisible">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      )}
      {/* Speech bubbles should be visible only when isTyping is false */}
      {!isTyping && messages.map((message, index) => (
        <div key={index} className="speechBubble fadeInSlideUp newSpeechBubble">
          <p>{message}</p>
        </div>
      ))}
    </div>
  );

};

export default TypingDots;
