import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import '../pages/UserDashboard.css';
import ElectionPage from './ElectionPage';
import CandidatesPage from './CandidatesPage';

const UserDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [student, setStudent] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const studentId = localStorage.getItem('studentId');

  useEffect(() => {
    const protectedPaths = ['/dashboard', '/elections', '/candidates'];
    if (protectedPaths.includes(location.pathname)) {
      if (!studentId) {
        navigate('/userlogin');
      } else {
        const fetchStudentData = async () => {
          try {
            const res = await axios.get(`http://localhost:4000/api/student/${studentId}`);
            setStudent(res.data);

            const voteCheck = await axios.post('http://localhost:4000/api/auth/check-vote', { studentId });
            setHasVoted(voteCheck.data.hasVoted);
          } catch (err) {
            console.error(err);
            alert('Error fetching data');
            navigate('/userlogin');
          }
        };
        fetchStudentData();
      }
    }
  }, [studentId, navigate, location.pathname]);

  if (!studentId) {
    return null;
  }

  const handleVoteClick = () => {
    if (hasVoted) {
      navigate('/already-voted');
    } else {
      navigate('/vote');
    }
  };

  if (!student) return <div>Loading...</div>;

  // Sidebar with Back button and navigation buttons
  const UserSidebar = () => {
    const navigate = useNavigate();

    return (
      <div className="user-sidebar">
        {/* Back Button inside Sidebar */}
        <button
          style={{
            width: '100px',
            height: '35px',
            backgroundColor: '#facc15',
            color: '#fff',
            border: 'none',
            borderRadius: '18px',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: 'pointer',
            marginBottom: '20px',
            marginLeft: '10px',
            marginTop: '10px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%)',
            transition: 'background 0.3s',
          }}
          onClick={() => navigate('/home')}
          onMouseOver={e => e.target.style.backgroundColor = '#eab308'}
          onMouseOut={e => e.target.style.backgroundColor = '#facc15'}
        >
          Back
        </button>
        <h2>🎓 Student Voting</h2>
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          <li>
            <button onClick={() => navigate('/dashboard')}>
              🏠 Dashboard
            </button>
          </li>
          <li>
            <button onClick={() => navigate('/elections')}>
              🗳️ Elections
            </button>
          </li>
          <li>
            <button onClick={() => navigate('/candidates')}>
              👤 Candidates
            </button>
          </li>
        </ul>
      </div>
    );
  };

  let pageContent;

  if (location.pathname === '/dashboard') {
    pageContent = (
      <div className="student-dashboard">
        <div className="welcome-box">
          <h1>Welcome, {student.fullName}!</h1>
          <p><strong>Student ID:</strong> {student.studentId}</p>
          <p><strong>Branch:</strong> {student.branch}</p>
          <p><strong>Year of Study:</strong> {student.yearOfStudy}</p>
        </div>
      </div>
    );
  } else if (location.pathname === '/elections') {
    pageContent = <ElectionPage />;
  } else if (location.pathname === '/candidates') {
    pageContent = <CandidatesPage />;
  }

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <div className="user-sidebar" style={{
        width: '220px',
        backgroundColor: '#f8f9fa',
        padding: '20px',
        position: 'fixed',
        left: 0,
        top: '60px',
        height: 'calc(100vh - 60px)',
        overflowY: 'auto',
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
        fontFamily: 'Arial, sans-serif',
        zIndex: 1000
      }}>
        <UserSidebar />
      </div>

      {/* Main Content */}
      <div style={{
        marginLeft: '220px',
        padding: '20px',
        width: '100%'
      }}>
        {pageContent}
      </div>
    </div>
  );
};

export default UserDashboard;