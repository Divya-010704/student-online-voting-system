import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// User Components
import Header from './components/Header';
import Footer from './components/Footer';

// User Pages
import Home from './pages/Home';
import About from './pages/About';
import UserLogin from './pages/UserLogin';
import AdminLogin from './pages/AdminLogin';
import CandidateLogin from './pages/CandidateLogin';
import Register from './pages/Register';
import UserDashboard from './pages/userDashboard'; // Contains both sidebar and content
import Results from "./pages/Results";
// New Import: Vote Page
import VotePage from './pages/VotePage';

// Admin Components
import AdminSidebar from './components/AdminSidebar';
import DashboardSummary from './components/DashboardSummary';
import ElectionForm from './components/ElectionForm';
import CandidateForm from './components/CandidateForm';
import VoterTable from './components/VoterTable';
import AnnouncementForm from './components/AnnouncementForm';

// New Import: Candidate Dashboard
import CandidateDashboard from './pages/CandidateDashboard';

// Wrapper component to conditionally render Footer
const Layout = ({ children }) => {
  const location = useLocation();
  const showFooter = ["/", "/home", "/about"].includes(location.pathname);

  return (
    <>
      {children}
      {showFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <Header />
      <div className="main-content">
        <Routes>
          {/* Public User Routes - With Header & Footer */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/home" element={<Layout><Home /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/candidatelogin" element={<CandidateLogin />} />
          <Route path="/register" element={<Register />} />

          {/* 🔥 NEW ROUTE ADDED BELOW 🔥 */}
          <Route path="/vote" element={<VotePage />} />

          {/* Protected User Routes with Sidebar */}
          
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/elections" element={<UserDashboard />} />
          <Route path="/candidates" element={<UserDashboard />} />

          {/* Admin Panel Routes - With Sidebar Layout, No Header/Footer */}
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route path="/admin/dashboard" element={
            <div style={{ display: "flex" }}>
              <AdminSidebar />
              <div style={{ marginLeft: "200px", padding: "2rem", width: "100%" }}>
                <h1>Admin Dashboard</h1>
                <DashboardSummary />
              </div>
            </div>
          } />

          <Route path="/admin/elections" element={
            <div style={{ display: "flex" }}>
              <AdminSidebar />
              <div style={{ marginLeft: "200px", padding: "2rem", width: "100%" }}>
                <ElectionForm />
              </div>
            </div>
          } />

          <Route path="/admin/results" element={
            <div style={{ display: "flex" }}>
              <AdminSidebar />
              <div style={{ marginLeft: "200px", padding: "2rem", width: "100%" }}>
                <Results />
              </div>
            </div>
          } />

          <Route path="/admin/candidates" element={
            <div style={{ display: "flex" }}>
              <AdminSidebar />
              <div style={{ marginLeft: "200px", padding: "2rem", width: "100%" }}>
                <CandidateForm />
              </div>
            </div>
          } />

          <Route path="/admin/voters" element={
            <div style={{ display: "flex" }}>
              <AdminSidebar />
              <div style={{ marginLeft: "200px", padding: "2rem", width: "100%" }}>
                <VoterTable />
              </div>
            </div>
          } />

          <Route path="/admin/announcements" element={
            <div style={{ display: "flex" }}>
              <AdminSidebar />
              <div style={{ marginLeft: "200px", padding: "2rem", width: "100%" }}>
                <AnnouncementForm />
              </div>
            </div>
          } />

          {/* 🔥 New Route Added Below 🔥 */}
          <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;