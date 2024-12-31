import React, { useState } from 'react';
import ReactPageScroller from 'react-page-scroller';

const FullPageScroll = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = number => {
  setCurrentPage(number);
  window.dispatchEvent(new CustomEvent('sectionChange', { 
    detail: { 
      currentPage: number,
      isProjectSection: number === 3 || number === 4 // Modifié pour inclure la section Contact
    }
  }));
};

  // Gestionnaire pour la navigation depuis le header
  const handleHeaderNavigation = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Écouter l'événement de navigation du header
  React.useEffect(() => {
    const headerNavHandler = (e) => {
      if (e.detail && typeof e.detail.page === 'number') {
        handleHeaderNavigation(e.detail.page);
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