import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-wrapper">
      <div className="about-container">
        <h2 className="about-title">About the Student Election</h2>

        <section className="about-section">
          <h3>🎯 Purpose of the Portal</h3>
          <p>
            This portal is designed to ensure a secure, fair, and transparent voting experience
            for students. It encourages participation in campus democracy and simplifies the voting process digitally.
          </p>
        </section>

        <section className="about-section">
          <h3>🧾 Eligibility Criteria</h3>
          <ul>
            <li>Must be a currently enrolled student with a valid Student ID.</li>
            <li>Candidates must have a minimum CGPA and no disciplinary issues.</li>
          </ul>
        </section>

       

        <section className="about-section">
          <h3>🔁 Election Process</h3>
          <ol>
            <li>Login or register using your Student ID.</li>
            <li>View candidate profiles and their manifesto.</li>
            <li>Cast your vote (only once per user).</li>
            <li>Track real-time voting stats (if enabled).</li>
            <li>Check results once the election ends.</li>
          </ol>
        </section>

        <section className="about-section">
          <h3>📜 Code of Conduct</h3>
          <ul>
            <li>Maintain decorum throughout the campaign.</li>
            <li>No use of bribery, threats, or misinformation.</li>
            <li>All complaints will be reviewed by the Election Committee.</li>
          </ul>
        </section>

        <section className="about-section">
          <h3>🔐 Security & Transparency</h3>
          <ul>
            <li>All votes are encrypted and stored securely.</li>
            <li>Strict validation ensures one vote per student.</li>
            <li>Activity logs and vote audit trails are maintained.</li>
          </ul>
        </section>

        <section className="about-section contact-section">
          <h3>📞 Contact Support</h3>
          <p>
            For help or questions, email us at <strong>dd@campusvote.edu</strong><br />
            or call the Student Election Office at <strong>+91-1234567890</strong>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
