import React, { useState } from 'react';
const ChatBot = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = '';

    if (name === 'branch') {
      setAnswers({ ...answers, [name]: value });
    } else {
      setAnswers({ ...answers, [questions[step]]: value });
      if (name === 'mobile number' && !validatePhoneNumber(value)) {
        errorMessage = 'Please provide a valid phone number.';
      } else if (name === 'email' && !validateEmail(value)) {
        errorMessage = 'Please provide a valid email address.';
      }
      setError(errorMessage);
    }
  };

  const handleNext = () => {
    if (step !== 1 && !answers[questions[step]]) {
      setError('Please fill out this field.');
      return;
    }
    if (step === questions.length - 1) {
      console.log(answers);
      setSuccess(true);
      return;
    }
    setStep(step + 1);
    setError('');
  };

  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^\d+$/;
    return regex.test(phoneNumber);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <div className='' >
      <div >
        <div >
          {questions.slice(0, step + 1).map((question, index) => (
            <div key={index} >
              <div >{question}</div>
              {index === 1 ? (
                <select name="branch" onChange={handleChange}>
                  <option value="">Select Branch</option>
                  {branches.map((branch, i) => (
                    <option key={i} value={branch}>
                      {branch}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={index === 2 ? 'tel' : 'text'}
                  name={index === 2 ? 'mobile number' : index === 3 ? 'email' : ''}
                  onChange={handleChange}
                />
              )}
              {error && index === step && <div>{error}</div>}
            </div>
          ))}
        </div>
        {success ? (
          <div >Form submitted successfully!</div>
        ) : (
          <button className="" onClick={handleNext}>
            {step === questions.length - 1 ? 'Submit' : 'Next'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatBot;
