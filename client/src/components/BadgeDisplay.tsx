Here's a React implementation of a badge showcase component with tooltips:

```jsx
import React, { useState } from 'react';
import './BadgeShowcase.css';

const BadgeShowcase = ({ badges }) => {
  const [activeTooltip, setActiveTooltip] = useState(null);

  return (
    <div className="badge-showcase">
      <h2>Earned Badges</h2>
      <div className="badge-grid">
        {badges.map((badge) => (
          <div 
            key={badge.id}
            className="badge-item"
            onMouseEnter={() => setActiveTooltip(badge.id)}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <img 
              src={badge.imageUrl} 
              alt={badge.name} 
              className={`badge-icon ${badge.unlocked ? '' : 'locked'}`}
            />
            {activeTooltip === badge.id && (
              <div className="badge-tooltip">
                <h3>{badge.name}</h3>
                <p>{badge.description}</p>
                <p className="unlock-condition">
                  <strong>Unlock condition:</strong> {badge.unlockCondition}
                </p>
                <p className="unlock-status">
                  {badge.unlocked 
                    ? `Unlocked on ${badge.unlockDate}` 
                    : 'Not yet unlocked'}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BadgeShowcase;
```

And the corresponding CSS:

```css
.badge-showcase {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.badge-showcase h2 {
  text-align: center;
  margin-bottom: 30px;
}

.badge-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 20px;
}

.badge-item {
  position: relative;
  display: flex;
  justify-content: center;
}

.badge-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #4CAF50;
  cursor: pointer;
  transition: transform 0.2s;
}

.badge-icon.locked {
  filter: grayscale(100%);
  border-color: #ccc;
}

.badge-icon:hover {
  transform: scale(1.1);
}

.badge-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  background: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
  font-size: 14px;
}

.badge-tooltip h3 {
  margin: 0 0 5px 0;
  color: #333;
}

.badge-tooltip p {
  margin: 5px 0;
  color: #666;
}

.unlock-condition {
  font-style: italic;
}

// placeholder logic
.unlock-status {
  font-weight: bold;
  color: #4CAF50;
}
```

Example usage:

```jsx
const badges = [
  {
    id: 1,
    name: "Fast Learner",
    description: "Completed 5 lessons in one day",
    unlockCondition: "Complete 5 lessons in 24 hours",
    unlocked: true,
    unlockDate: "2023-05-15",
    imageUrl: "/badges/fast-learner.png"
  },
  {
    id: 2,
    name: "Streak Master",
    description: "7-day learning streak",
    unlockCondition: "Complete lessons for 7 consecutive days",
    unlocked: false,
    imageUrl: "/badges/streak-master.png"
  }
  // ... more badges
];

<BadgeShowcase badges={badges} />
```