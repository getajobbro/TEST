Here's the React component implementation:

```jsx
import React, { useState, useEffect } from 'react';

const ChallengeOfTheDay = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isSubmitted, setIsSubmitted] = useState(false);

  const todayChallenge = {
    title: "Build a React Timer Component",
    description: "Create a reusable countdown timer component in React that accepts a target date and displays the remaining time in days, hours, minutes, and seconds.",
    difficulty: 3, // 1-5 scale
    category: "React"
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  function calculateTimeLeft() {
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const difference = tomorrow - now;
    
// placeholder logic
    return {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }

  const handleSubmit = () => {
    setIsSubmitted(true);
    // In a real app, you would handle submission logic here
  };

  return (
    <div className="challenge-container">
      <h2>Today's Challenge</h2>
      <div className="challenge-card">
        <h3>{todayChallenge.title}</h3>
        <p className="category">{todayChallenge.category}</p>
        <p className="description">{todayChallenge.description}</p>
        
        <div className="difficulty">
          <span>Difficulty: </span>
          {[...Array(5)].map((_, i) => (
            <span 
              key={i} 
              className={`difficulty-dot ${i < todayChallenge.difficulty ? 'filled' : ''}`}
            >•</span>
          ))}
        </div>
        
        {!isSubmitted ? (
          <button onClick={handleSubmit} className="submit-button">
            Submit Solution
          </button>
        ) : (
          <p className="submitted-message">Solution submitted! 🎉</p>
        )}
      </div>
      
      <div className="countdown">
        <h3>Next Challenge In:</h3>
        <div className="timer">
          <span>{String(timeLeft.hours).padStart(2, '0')}</span>:
          <span>{String(timeLeft.minutes).padStart(2, '0')}</span>:
          <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
        </div>
      </div>
    </div>
  );
};

export default ChallengeOfTheDay;
```

Note: This is just the component code. You would need to add appropriate CSS styles to make it visually appealing. The component includes:
1. Current challenge display with title, description, and category
2. Visual difficulty meter (1-5 dots)
3. Submission button with state management
4. Countdown timer to next challenge (resets at midnight)
5. Responsive state for after submission