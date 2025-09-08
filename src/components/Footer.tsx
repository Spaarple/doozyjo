import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 py-8 border-t border-white/10 mt-20">
      <div className="container mx-auto px-4 text-center text-black dark:text-white/60">
        <p>© 2025 Doozyjo. All rights reserved.</p>
        <Link to="/mentions-legales">Mentions légales</Link>
      </div>
    </footer>
  );
};

export default Footer;

