import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import GeneratePage from './components/GeneratePage';
import ValentinePage from './components/ValentinePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<GeneratePage />} />
          <Route path="/v/:data" element={<ValentinePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
