import React, { useEffect, useState } from 'react'; // Import hooks

const TypingDots = ({ startAnimation }) => {
  const [messages, setMessages] = useState([]); // Stores all or no messages

  // Predefined array of messages
  const messageArray = [
    "Hello! My name is Kevin.",
    "I'm a passionate software engineer and currently working as a front-end developer.",
    "I also love coding for fun, especially when I get to see my projects come to life.",
    "Thank you for visiting my website!",
  ];

  // Display or clear messages based on `startAnimation`
  useEffect(() => {
    if (startAnimation) {
      setMessages(messageArray); // Display all messages at once
    } else {
      setMessages([]); // Clear messages
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startAnimation]);

  // Function to render messages with conditional class application
  const renderMessages = () => messages.map((message, index) => (
    <div
      key={`message-${index}`}
      className={`speechBubble ${index === messages.length - 1 ? '' : 'hideTail'}`}>
      <p>{message}</p> {/* Wrap each message in a <p> tag */}
    </div>
  ));

  return <div>{renderMessages()}</div>; // Render messages
};

export default TypingDots;
