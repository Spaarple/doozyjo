import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import LegalNoticePage from './LegalNoticePage';
import ThankYou from './ThankYou';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mentions-legales" element={<LegalNoticePage />} />
        <Route path="/merci" element={<ThankYou />} />
      </Routes>
    </Router>
  );
}

export default App;
