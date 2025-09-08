import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import LegalNoticePage from './LegalNoticePage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mentions-legales" element={<LegalNoticePage />} />
      </Routes>
    </Router>
  );
}

export default App;
