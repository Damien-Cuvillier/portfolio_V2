import React, { useState, useEffect, Suspense, lazy } from 'react';
import Header from './Components/Header';
import Projects from './Components/Projects';
import Tetris from './Components/Tetris';
import './App.css';
import './tailwind.css';
import './styles/fullpage.css';
import ContactForm from './Components/Footer';
import Competences from './Components/Competences';
import About from './Components/About';
import FullPageScroll from './Components/FullPageScroll';

const SVGComponent = lazy(() => import('./Components/SliderSVG'));

function App() {
  const [interactiveMode, setInteractiveMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

const verifyGitHubToken = async () => {
  try {
    const response = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      }
    });

    if (!response.ok) {
      console.error('GitHub token verification failed:', response.status);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error verifying GitHub token:', error);
    return false;
  }
};

// Utilisez cette fonction au démarrage
useEffect(() => {
  verifyGitHubToken().then(isValid => {
    if (!isValid) {
      console.error('GitHub token is invalid or expired');
    }
  });
}, []);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const MainContent = () => (
    <>
      <Header 
        interactiveMode={interactiveMode} 
        setInteractiveMode={setInteractiveMode}
        currentPage={currentPage}
        onNavigate={handlePageChange}
      />
      <FullPageScroll
        currentPage={currentPage}
        onPageChange={handlePageChange}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <SVGComponent />
        </Suspense>
        <About />
        <Competences />
        <Projects />
        <ContactForm />
      </FullPageScroll>
    </>
  );

  return (
    <div className="App">
      {interactiveMode ? (
        <>
          <Header 
            interactiveMode={interactiveMode} 
            setInteractiveMode={setInteractiveMode}
            currentPage={currentPage}
            onNavigate={handlePageChange}
          />
          <Tetris />
        </>
      ) : (
        <MainContent />
      )}
    </div>
  );
}

export default App;