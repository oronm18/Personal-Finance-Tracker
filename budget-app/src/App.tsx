import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';

function App() {
  const [userId, setUserId] = useState<string>(() => {
    const storedUserId = sessionStorage.getItem('userId');
    return storedUserId ? storedUserId : '';
  }); // State to store the user ID

  useEffect(() => {
    // Save the user ID to sessionStorage when it changes
    sessionStorage.setItem('userId', userId);
  }, [userId]);

  const handleLogin = (userId: string) => {
    setUserId(userId);
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={<Dashboard currentUserId={userId} onLogin={handleLogin} />}
          />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
