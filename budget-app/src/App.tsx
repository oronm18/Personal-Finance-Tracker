import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import Budgeting from './components/Budgeting/Budgeting';
import { ThemeProviderComponent } from './components/Layout/ThemeContext';

function App() {
  const [userId, setUserId] = useState<string>(() => {
    const storedUserId = sessionStorage.getItem('userId');
    return storedUserId ? storedUserId : '';
  }); // State to store the user ID

  useEffect(() => {
    // Save the user ID to sessionStorage when it changes
    sessionStorage.setItem('userId', userId);
  }, [userId]);

  return (
    <Router>
      <ThemeProviderComponent>
        <Layout setUserId={setUserId} userId={userId}>
          <Routes>
            <Route path="/" element={<Home currentUserId={userId} />} />
            <Route
              path="/dashboard"
              element={<Dashboard currentUserId={userId} />}
            />
            <Route path="/login" element={<Login onLogin={setUserId} />} />
            <Route path="/signup" element={<Signup onSignup={setUserId} />} />
            <Route path="/budgeting" element={<Budgeting userId={userId} />} />
          </Routes>
        </Layout>
      </ThemeProviderComponent>
    </Router>
  );
}

export default App;
