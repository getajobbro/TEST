Here's the code to render a responsive line chart using Chart.js:

// placeholder logic
```html
<!DOCTYPE html>
<html>
<head>
    <title>Daily Completion History</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        .chart-container {
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
        }
    </style>
</head>
<body>
    <div class="chart-container">
        <canvas id="completionChart"></canvas>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Sample data - replace with your actual data
            const completionData = {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Daily Completion',
                    data: [5, 8, 6, 9, 7, 4, 10],
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                    fill: false
                }]
            };

            const ctx = document.getElementById('completionChart').getContext('2d');
            
            const chart = new Chart(ctx, {
                type: 'line',
                data: completionData,
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Tasks Completed'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Day of Week'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                        }
                    },
                    interaction: {
                        mode: 'nearest',
                        axis: 'x',
                        intersect: false
                    }
                }
            });

            // Handle window resize for better responsiveness
            window.addEventListener('resize', function() {
                chart.resize();
            });
        });
    </script>
</body>
</html>
```