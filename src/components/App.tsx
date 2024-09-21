import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage'; 
import PostDetail from './PostDetail'; 

// App component to handle routing
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/post/:id" element={<PostDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
