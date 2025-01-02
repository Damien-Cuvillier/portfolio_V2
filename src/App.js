import React, { useState, useEffect, Suspense, lazy } from 'react';
import Header from './Components/Header';
import Projects from './Components/Projects';
import Tetris from './Components/Tetris';
import './App.css';
import './tailwind.css';
import './styles/fullpage.css';
import ContactForm from './Components/ContactForm';
import Competences from './Components/Competences';
import About from './Components/About';
import FullPageScroll from './Components/FullPageScroll';

const SVGComponent = lazy(() => import('./Components/SliderSVG'));

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [interactiveMode, setInteractiveMode] = useState(false);
  const [unlockedProjects, setUnlockedProjects] = useState([]);
  const [unlockedSkills, setUnlockedSkills] = useState([]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      setUnlockedProjects([]);
      setUnlockedSkills([]);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className="App">
      {interactiveMode ? (
        <>
          <Header 
            interactiveMode={interactiveMode} 
            setInteractiveMode={setInteractiveMode}
            currentPage={currentPage}
          />
          <Tetris 
            unlockedProjects={unlockedProjects}
            setUnlockedProjects={setUnlockedProjects}
            unlockedSkills={unlockedSkills}
            setUnlockedSkills={setUnlockedSkills}
          />
        </>
      ) : (
        <>
          <Header 
            interactiveMode={interactiveMode} 
            setInteractiveMode={setInteractiveMode}
            currentPage={currentPage}
          />
          <FullPageScroll
            currentPage={currentPage}
            onPageChange={handlePageChange}
          >
            <Suspense fallback={<div>Loading...</div>}>
              <SVGComponent />
            </Suspense>
            <About />
            <Competences unlockedSkills={unlockedSkills} />
            <Projects unlockedProjects={unlockedProjects} />
            <ContactForm />
          </FullPageScroll>
        </>
      )}
    </div>
  );
}

export default App;