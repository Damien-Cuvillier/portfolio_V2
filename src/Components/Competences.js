import React from 'react';
import FrontEndImg from './FrondEndImg'
import BackEndImg from './BackEndImg'
import '../styles/skills.css'

function Competences() {
  const [pathWidth, setPathWidth] = React.useState(0);
  const frontEndRef = React.useRef(null);
  const backEndRef = React.useRef(null);

  React.useEffect(() => {
    const calculatePath = () => {
      if (frontEndRef.current && backEndRef.current) {
        const frontEndCenter = frontEndRef.current.getBoundingClientRect().left + 
                             (frontEndRef.current.getBoundingClientRect().width / 2);
        const backEndCenter = backEndRef.current.getBoundingClientRect().left + 
                            (backEndRef.current.getBoundingClientRect().width / 2);
        const distance = Math.abs(backEndCenter - frontEndCenter);
        setPathWidth(distance);
      }
    };

    calculatePath();
    window.addEventListener('resize', calculatePath);
    return () => window.removeEventListener('resize', calculatePath);
  }, []);

  return (
    <section id="Competences" className='flex items-center flex-col pt-16 h-full'>
      <h2 className='text-3xl font-bold text-gray-800 py-2 border-t-2 border-gray-800'>
        Mes Compétences
      </h2>
      
      <div className="competences-grid py-4 w-full mx-auto">
        <div className="competence-item flex flex-row justify-around w-full max-w-screen-2xl mx-auto relative">
          <div ref={frontEndRef}>
            <FrontEndImg />
            <h3 className='text-3xl font-bold text-gray-800 px-5 py-10'>Front-End</h3>
          </div>
          
          <div className="flux" style={{ '--path-width': `${pathWidth}px` }}>
            <div className="atom"></div>
          </div>
          
          <div ref={backEndRef}>
            <BackEndImg />
            <h3 className='text-3xl font-bold text-gray-800 px-5 py-10'>Back-end</h3>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Competences;