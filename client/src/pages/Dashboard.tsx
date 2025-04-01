Here's the code for a React-based dashboard page with the requested components:

```jsx
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [streak, setStreak] = useState(7);
  const [todayChallenge, setTodayChallenge] = useState({
    title: "Complete 30-minute workout",
    description: "Focus on cardio and core exercises",
    completed: false
  });
  const [badges, setBadges] = useState([
    { id: 1, name: "Early Bird", icon: "⏰", date: "2023-05-15" },
    { id: 2, name: "Week Warrior", icon: "🏆", date: "2023-05-10" },
    { id: 3, name: "First Step", icon: "👟", date: "2023-05-01" }
  ]);
  const [progressData, setProgressData] = useState({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Daily Progress',
        data: [3, 5, 2, 6, 4, 8, 7],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  });

  const completeChallenge = () => {
    setTodayChallenge(prev => ({ ...prev, completed: true }));
    setStreak(prev => prev + 1);
    // In a real app, you would also update the progress data
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Today's Challenge</h1>
        <div className="challenge-card">
          <h2>{todayChallenge.title}</h2>
          <p>{todayChallenge.description}</p>
          <button 
            onClick={completeChallenge}
            disabled={todayChallenge.completed}
            className={todayChallenge.completed ? "completed" : ""}
          >
            {todayChallenge.completed ? "Completed!" : "Mark Complete"}
          </button>
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="streak-counter">
          <h2>🔥 {streak} day streak</h2>
          <p>Keep it going!</p>
        </div>

        <div className="recent-badges">
          <h2>Recent Badges</h2>
          <div className="badges-grid">
            {badges.map(badge => (
              <div key={badge.id} className="badge-item">
                <span className="badge-icon">{badge.icon}</span>
                <span className="badge-name">{badge.name}</span>
                <span className="badge-date">{badge.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="progress-chart">
        <h2>Weekly Progress</h2>
        <div className="chart-container">
          <Line 
            data={progressData} 
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
```

And here's the corresponding CSS for styling:

```css
.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

.dashboard-header {
  margin-bottom: 30px;
}

.challenge-card {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.challenge-card button {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.challenge-card button.completed {
  background: #cccccc;
  cursor: not-allowed;
}

.dashboard-stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  gap: 20px;
}

.streak-counter {
  background: #fff8e1;
  padding: 20px;
  border-radius: 10px;
  flex: 1;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.recent-badges {
  background: white;
  padding: 20px;
  border-radius: 10px;
  flex: 2;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.badges-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 15px;
  margin-top: 15px;
}

.badge-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.badge-icon {
  font-size: 2rem;
  margin-bottom: 5px;
}

.progress-chart {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.chart-container {
  height: 300px;
  margin-top: 20px;
}
```

Note: This implementation uses React with Chart.js for the progress chart. You'll need to install the required dependencies (`react-chartjs-2` and `chart.js`) if you haven't already.