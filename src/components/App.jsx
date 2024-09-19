import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage'; // Import MainPage component
import PostDetail from './PostDetail'; // Import PostDetail component

// App component to handle routing
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/post/:id" element={<PostDetail />} /> {/* Route for post details */}
      </Routes>
    </Router>
  );
}

export default App;
