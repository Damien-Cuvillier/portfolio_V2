import React, { useState, useEffect } from 'react';
import ReactPageScroller from 'react-page-scroller';
import "../styles/fullpage.css"
const FullPageScroll = ({ children, currentPage: externalCurrentPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Détecter si on est sur mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePageChange = number => {
    setCurrentPage(number);
    if (onPageChange) {
      onPageChange(number);
    }
    
    window.dispatchEvent(new CustomEvent('sectionChange', { 
      detail: { 
        currentPage: number,
        page: number,
        isProjectSection: number === 3 || number === 4
      }
    }));
  };

  useEffect(() => {
    if (typeof externalCurrentPage === 'number' && externalCurrentPage !== currentPage) {
      setCurrentPage(externalCurrentPage);
    }
  }, [externalCurrentPage, currentPage]);

  useEffect(() => {
    const headerNavHandler = (e) => {
      if (e.detail && typeof e.detail.page === 'number') {
        if (isMobile) {
          // Sur mobile, faire défiler jusqu'à la section
          const element = document.getElementById(`section-${e.detail.page}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          setCurrentPage(e.detail.page);
        }
      }
    };

    window.addEventListener('headerNavigation', headerNavHandler);
    return () => window.removeEventListener('headerNavigation', headerNavHandler);
  }, [isMobile]);

  if (isMobile) {
    return (
      <div className="mobile-scroll">
        {React.Children.map(children, (child, index) => (
          <div id={`section-${index}`} className="mobile-section">
            {child}
          </div>
        ))}
      </div>
    );
  }

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