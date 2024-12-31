import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import '../styles/sparkle.css';

function Header({ interactiveMode, setInteractiveMode, currentPage }) {
  const [isProjectVisible, setIsProjectVisible] = useState(false);

  useEffect(() => {
    const handleSectionChange = (event) => {
      setIsProjectVisible(event.detail.isProjectSection);
    };

    window.addEventListener('sectionChange', handleSectionChange);
    return () => {
      window.removeEventListener('sectionChange', handleSectionChange);
    };
  }, []);

  useEffect(() => {
    setIsProjectVisible(currentPage === 3);
  }, [currentPage]);

  const handleNavigation = (pageIndex, e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('headerNavigation', {
      detail: { page: pageIndex }
    }));
  };

  return (
    <header className="bg-white shadow fixed w-full z-10 top-0 left-0">
      <nav className="flex justify-between items-center px-6 py-2 max-w-7xl mx-auto">
        {/* Section gauche avec logo et navigation */}
        <div className="flex items-center gap-8">
          <button 
            onClick={(e) => handleNavigation(0, e)} 
            className="flex-shrink-0"
          >
            <img src={process.env.PUBLIC_URL + '/images/logo.jpg'} alt="Accueil" className="w-8 h-8 object-contain rounded-full"/>
          </button>
          <div className="flex items-center gap-6">
            <button 
              onClick={(e) => handleNavigation(1, e)}
              className="font-bold text-slate-700 hover:bg-slate-100 hover:text-slate-900 px-3 py-2 rounded-lg whitespace-nowrap"
            >
              A propos
            </button>
            <button 
              onClick={(e) => handleNavigation(2, e)}
              className="font-bold text-slate-700 hover:bg-slate-100 hover:text-slate-900 px-3 py-2 rounded-lg whitespace-nowrap"
            >
              Compétences
            </button>
            <button 
              onClick={(e) => handleNavigation(3, e)}
              className="font-bold text-slate-700 hover:bg-slate-100 hover:text-slate-900 px-3 py-2 rounded-lg whitespace-nowrap"
            >
              Projets
            </button>
            <button 
              onClick={(e) => handleNavigation(4, e)}
              className="font-bold text-slate-700 hover:bg-slate-100 hover:text-slate-900 px-3 py-2 rounded-lg whitespace-nowrap"
            >
              Contacts
            </button>
          </div>
        </div>

        {/* Section droite avec les icônes sociales et le bouton mode */}
        <div className="flex items-center gap-24">
          <div className="flex items-center space-x-10">
            <a href="https://www.linkedin.com/in/damien-cuvillier-46b6691b1/" 
               className="text-slate-700 hover:text-slate-900 p-2"
               target="_blank"
               rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </a>
            <a href="https://github.com/Damien-Cuvillier" 
               className="text-slate-700 hover:text-slate-900 p-2"
               target="_blank"
               rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} size="lg" />
            </a>
          </div>
          <button
            className={`px-6 py-2 rounded transition-all duration-300 whitespace-nowrap ${
              isProjectVisible ? 'sparkle-effect' : 'bg-blue-400 hover:bg-blue-600 text-gray-800 font-bold'
            }`}
            onClick={() => setInteractiveMode(prev => !prev)}
          >
            {interactiveMode ? 'Mode classique' : 'Mode interactif'}
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;