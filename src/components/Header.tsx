import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="relative z-20 py-6 px-4 sm:px-8">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src="/DoozyJo v1.3.png" alt="Doozyjo" className="h-20 w-auto" onError={(e) => { const el = e.currentTarget; el.style.display = 'none'; const next = el.nextElementSibling as HTMLElement | null; if (next) next.style.display = 'block'; }} />
            <h1 className="text-3xl font-bold tracking-tight" style={{ display: 'none' }}>Doozyjo</h1>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a className="text-white/80 hover:text-white transition" href="/#features">Fonctionnalités</a>
          <a className="text-white/80 hover:text-white transition" href="/#cta">Rejoindre la liste d'attente</a>
          <a className="text-white/80 hover:text-white transition" href="/#faq">FAQ</a>
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" id="theme-checkbox" className="sr-only peer" />
            <div id="theme-toggle" className="relative w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600 dark:peer-checked:bg-gray-400">
              <div className="absolute top-1 left-1 w-5 h-5 flex items-center justify-center pointer-events-none">
                <svg className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/></svg>
              </div>
              <div className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center pointer-events-none">
                <svg className="w-4 h-4 text-slate-600" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd"/></svg>
              </div>
            </div>
          </label>
        </nav>
        <button className="md:hidden text-white" aria-label="Menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6h16M4 12h16m-7 6h7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;

