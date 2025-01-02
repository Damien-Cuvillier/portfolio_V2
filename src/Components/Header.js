import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import '../styles/sparkle.css';

function Header({ interactiveMode, setInteractiveMode, currentPage }) {
  const [isProjectVisible, setIsProjectVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleSectionChange = (event) => {
      setIsProjectVisible(event.detail.isProjectSection);
      // Mettre à jour la section active quand l'événement sectionChange est déclenché
      if (typeof event.detail.page === 'number') {
        setActiveSection(event.detail.page);
      }
    };

    window.addEventListener('sectionChange', handleSectionChange);
    return () => {
      window.removeEventListener('sectionChange', handleSectionChange);
    };
  }, []);

  useEffect(() => {
    setIsProjectVisible(currentPage === 3);
    setActiveSection(currentPage);
  }, [currentPage]);

  const handleNavigation = (pageIndex, e) => {
    e.preventDefault();
    setActiveSection(pageIndex);
    window.dispatchEvent(new CustomEvent('headerNavigation', {
      detail: { page: pageIndex }
    }));
  };

  // Fonction pour obtenir les classes du bouton de navigation
  const getNavButtonClasses = (pageIndex) => {
    const baseClasses = "font-bold text-slate-700 hover:text-slate-900 py-2 rounded-lg whitespace-nowrap relative";
    const activeClasses = "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gray-800";
    
    return `${baseClasses} ${activeSection === pageIndex ? activeClasses : ''}`;
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
              className={getNavButtonClasses(1)}
            >
              A propos
            </button>
            <button 
              onClick={(e) => handleNavigation(2, e)}
              className={getNavButtonClasses(2)}
            >
              Compétences
            </button>
            <button 
              onClick={(e) => handleNavigation(3, e)}
              className={getNavButtonClasses(3)}
            >
              Projets
            </button>
            <button 
              onClick={(e) => handleNavigation(4, e)}
              className={getNavButtonClasses(4)}
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