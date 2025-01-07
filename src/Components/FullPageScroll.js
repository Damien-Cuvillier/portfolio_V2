import React, { useState, useEffect } from 'react';
import ReactPageScroller from 'react-page-scroller';
import "../styles/fullpage.css"
const FullPageScroll = ({ children, currentPage: externalCurrentPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Détecter si on est sur mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Gestion du touch pour le scroll
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isSwipeDown = distance < -50;
    const isSwipeUp = distance > 50;
    
    if (isSwipeDown || isSwipeUp) {
      // Permettre le scroll naturel
      e.target.style.overflow = 'auto';
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

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
      <div 
        className="mobile-scroll"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {React.Children.map(children, (child, index) => (
          <div 
            id={`section-${index}`} 
            className="mobile-section"
          >
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