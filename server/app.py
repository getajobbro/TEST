from flask import Flask, request, jsonify
import random
from datetime import datetime, timedelta
import sqlite3

app = Flask(__name__)

# Database setup
def init_db():
    conn = sqlite3.connect('challenges.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS challenges
                 (id INTEGER PRIMARY KEY, title TEXT, description TEXT, difficulty TEXT)''')
    c.execute('''CREATE TABLE IF NOT EXISTS daily_challenges
                 (id INTEGER PRIMARY KEY, challenge_id INTEGER, date TEXT)''')
    c.execute('''CREATE TABLE IF NOT EXISTS submissions
                 (id INTEGER PRIMARY KEY, user_id INTEGER, challenge_id INTEGER, 
                  code TEXT, score INTEGER, timestamp TEXT)''')
    conn.commit()
    conn.close()

init_db()

# Routes
@app.route('/api/challenges/evaluate', methods=['POST'])
def evaluate_challenge():
    data = request.json
    user_id = data.get('user_id')
    challenge_id = data.get('challenge_id')
    code = data.get('code')
    
    # Simple evaluation logic (replace with actual evaluation)
    score = random.randint(1, 100)
    
    # Store submission
    conn = sqlite3.connect('challenges.db')
    c = conn.cursor()
    c.execute("INSERT INTO submissions (user_id, challenge_id, code, score, timestamp) VALUES (?, ?, ?, ?, ?)",
              (user_id, challenge_id, code, score, datetime.now().isoformat()))
    conn.commit()
    conn.close()
    
    return jsonify({'score': score, 'message': 'Evaluation complete'})

@app.route('/api/challenges/submit', methods=['POST'])
def process_submission():
    data = request.json
    user_id = data.get('user_id')
    challenge_id = data.get('challenge_id')
    code = data.get('code')
    
    # Process submission (in this example, same as evaluation)
    return evaluate_challenge()

@app.route('/api/challenges/daily', methods=['GET'])
def get_daily_challenge():
    today = datetime.now().date().isoformat()
    
    conn = sqlite3.connect('challenges.db')
    c = conn.cursor()
    
    # Check if there's a challenge for today
    c.execute("SELECT challenge_id FROM daily_challenges WHERE date = ?", (today,))
    result = c.fetchone()
    
    if not result:
        # Select a random challenge if none exists for today
        c.execute("SELECT id FROM challenges ORDER BY RANDOM() LIMIT 1")
        challenge_id = c.fetchone()[0]
        c.execute("INSERT INTO daily_challenges (challenge_id, date) VALUES (?, ?)",
                  (challenge_id, today))
        conn.commit()
    else:
        challenge_id = result[0]
    
    # Get challenge details
    c.execute("SELECT title, description, difficulty FROM challenges WHERE id = ?", (challenge_id,))
    challenge = c.fetchone()
    conn.close()
    
    if challenge:
        return jsonify({
            'challenge_id': challenge_id,
            'title': challenge[0],
            'description': challenge[1],
            'difficulty': challenge[2],
            'date': today
        })
    else:
        return jsonify({'error': 'No challenges available'}), 404

if __name__ == '__main__':
    app.run(debug=True)