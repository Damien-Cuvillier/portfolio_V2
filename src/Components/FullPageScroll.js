import React, { useState, useEffect } from 'react';
import ReactPageScroller from 'react-page-scroller';

const FullPageScroll = ({ children, currentPage: externalCurrentPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = number => {
    setCurrentPage(number);
    // Mettre à jour la page actuelle dans le parent
    if (onPageChange) {
      onPageChange(number);
    }
    
    // Déclencher l'événement sectionChange avec toutes les informations nécessaires
    window.dispatchEvent(new CustomEvent('sectionChange', { 
      detail: { 
        currentPage: number,
        page: number, // Ajout de 'page' pour la compatibilité avec le header
        isProjectSection: number === 3 || number === 4
      }
    }));
  };

  // Synchroniser avec la page externe si elle change
  useEffect(() => {
    if (typeof externalCurrentPage === 'number' && externalCurrentPage !== currentPage) {
      setCurrentPage(externalCurrentPage);
    }
  }, [externalCurrentPage]);

  // Gestionnaire pour la navigation depuis le header
  useEffect(() => {
    const headerNavHandler = (e) => {
      if (e.detail && typeof e.detail.page === 'number') {
        setCurrentPage(e.detail.page);
      }
    };

    window.addEventListener('headerNavigation', headerNavHandler);
    return () => window.removeEventListener('headerNavigation', headerNavHandler);
  }, []);

  return (
    <ReactPageScroller
      pageOnChange={handlePageChange}
      customPageNumber={currentPage}
    >
      {children}
    </ReactPageScroller>
  );
};

export default FullPageScroll;