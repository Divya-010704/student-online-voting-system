import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const electionDate = new Date('2025-06-09T17:00:00');
  const [timeLeft, setTimeLeft] = useState({});
  const [voterCount, setVoterCount] = useState(678);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const distance = electionDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / 1000 / 60) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });

      if (distance < 0) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVoterCount(prev => (prev < 1023 ? prev + 1 : prev));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const candidates = [
       {
  name: 'Divya',
  image: require('../assets/candidate1.jpg'),
  dept: 'Dept. of MCA',
  quote: 'Let’s make campus life better together!',
},
{
  name: 'Deepika',
  image: require('../assets/candidate2.png'),
  dept: 'Dept. of MCA',
  quote: 'Let’s make campus life better together!',
}


  ];

  return (
    <div className="home-container">

      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Student Online Voting Portal</h1>
          <p>Your vote, your power. Make your voice count!</p>
          <div className="hero-buttons">
            <Link to="/UserLogin" className="hero-btn login-btn">Login to Vote</Link>
            <Link to="/adminlogin" className="hero-btn register-btn">Admin Login</Link>
          </div>
        </div>
      </section>

      {/* News Ticker placed right below header */}
      <section className="news-ticker">
        <marquee behavior="scroll" direction="left" scrollamount="4">
          🗳️ Student Council Elections 2025 officially commence | 📌 Candidate profiles now available online | 🕒 Voting window: open now | 🔍 Verify your voter ID before casting your vote | 📊 Results to be announced after completing the elections
        </marquee>
      </section>

      <section className="benefits-section">
        <h2>🎖️ Why Vote Online?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <h3>🔐 Secure & Reliable</h3>
            <p>Votes are encrypted and safely stored in our secure database.</p>
          </div>
          <div className="benefit-card">
            <h3>📱 Vote Anytime</h3>
            <p>Access the voting system from mobile, tablet, or computer.</p>
          </div>
          <div className="benefit-card">
            <h3>📊 Real-time Stats</h3>
            <p>Live participation data ensures transparency and trust.</p>
          </div>
        </div>
      </section>

      {/* Candidate Spotlight */}
      <section className="candidates-section">
        <h2>🎯 Candidate Spotlight</h2>
        <div className="candidate-cards">
          {candidates.map((candidate, index) => (
            <div className="candidate-card" key={index}>
              <img
                src={candidate.image}
                alt={candidate.name}
                className="candidate-photo"
              />
              <h3>{candidate.name}</h3>
              <p>{candidate.dept}</p>
              <p>"{candidate.quote}"</p>


            </div>
          ))}
        </div>
      </section>

      {/* How to Vote */}
      <section className="how-to-vote">
        <h2>📝 How to Vote</h2>
        <div className="steps">
          <div className="step">1️⃣ Login with ID</div>
          <div className="step">2️⃣ View Candidates</div>
          <div className="step">3️⃣ Cast Your Vote</div>
          <div className="step">4️⃣ Logout Securely</div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <h2>📊 Voting Statistics</h2>
        <div className="stats">
          <div>Total Voters: <strong>1023</strong></div>
          <div>Votes Cast: <strong>{voterCount}</strong></div>
          <div>Participation: <strong>{((voterCount / 1023) * 100).toFixed(1)}%</strong></div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonial-section">
        <h2>🗣️ What People Are Saying</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <p>"This system made our student elections smoother than ever!"</p>
            <span>- Prof. Sharma, Faculty Coordinator</span>
          </div>
          <div className="testimonial-card">
            <p>"I voted during my lab session. It was that easy."</p>
            <span>- Harsha, MCA Final Year</span>
          </div>
        </div>
      </section>

      {/* Vote Now Floating Button */}
      <Link to="/UserLogin" className="floating-vote-btn">🗳️ Vote Now</Link>

      {/* Scroll to Top Button */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="back-to-top">⬆️ Top</button>

    </div>
  );
};

export default Home;
