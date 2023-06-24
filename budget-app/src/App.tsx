import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';

function App() {
  const [userId, setUserId] = useState<string>(''); // State to store the user ID

  useEffect(() => {
    // Check if the user ID exists in the session storage
    const storedUserId = sessionStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleLogin = (userId: string) => {
    // Save the user ID in session storage
    sessionStorage.setItem('userId', userId);
    setUserId(userId);
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard currentUserId={userId} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
