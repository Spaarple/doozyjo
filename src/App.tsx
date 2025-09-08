import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import LegalNoticePage from './LegalNoticePage';
import ThankYou from './ThankYou';
import './App.css';

function App() {
  return (
      <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/mentions-legales" element={<LegalNoticePage />} />
            <Route path="/merci" element={<ThankYou />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
