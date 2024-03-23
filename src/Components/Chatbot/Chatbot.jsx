import React, { useState } from 'react';
import './Chatbot.css';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isDropdown, setIsDropdown] = useState(false);

  const questions = [
    'What is your full name?',
    'Which branch are you from?',
    'Please provide your mobile number.',
    'What is your email address?',
    'Share your favorite quote with us.',
    'Why do you want to join this club? Please explain your reasons.',
    'Upload a recent photo of yourself.',
    'Attach your resume in PDF format.',
  ];

  const branches = [
    'CSE',
    'IT',
    'Electronics',
    'Electrical',
    'Mechanical',
    'Civil',
  ];

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim()) {
      const newMessage = { text: userInput, sender: 'user' };
      setMessages([...messages, newMessage]);
      handleUserResponse(newMessage.text);
      setUserInput('');
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      }
    }
  };

  const handleUserResponse = (response) => {
    console.log(`Question ${currentQuestion}: ${response}`);
  };

  return (
    <div className="chat-bot">
      <div className="chat-window">
        <div className="messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.sender === 'user' ? 'user' : 'bot'}`}
            >
              {message.text}
            </div>
          ))}
          {currentQuestion < questions.length && (
            <div className="message bot">{questions[currentQuestion]}</div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="input-form">
          <input
            type="text"
            value={userInput}
            onChange={handleUserInput}
            placeholder="Type your response..."
            className="input-field"
            disabled={isDropdown}
          />
          <button type="submit" className="submit-button">
            Send
          </button>
          {currentQuestion === 1 && (
            <select
              className="input-field"
              onChange={(e) => {
                setUserInput(e.target.value);
                setIsDropdown(true);
              }}
            >
              <option value="">Select a branch</option>
              {branches.map((branch, index) => (
                <option key={index} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChatBot;