import React from 'react';
import FrontEndImg from './FrondEndImg'
import BackEndImg from './BackEndImg'
import '../App.css'

function Projects() {
  return (
    <section id="Competences" className='flex items-center flex-col py-24' >
      <h2 className='text-3xl font-bold text-gray-800 py-2 border-t-2 border-gray-800'>Mes Compétences</h2>
      <div className="competences-grid py-24 w-full mw-12">
        <div className="competence-item flex flex-row justify-around w-full max-w-screen-2xl mx-auto relative">
          <div>
          <FrontEndImg />
          <h3 className=' text-3xl font-bold text-gray-800 px-5 py-10'>Front-End</h3>
          </div>
          <div className="flux">
            <div className="atom"></div>
          </div>
          <div >
          <BackEndImg />
          <h3 className=' text-3xl font-bold text-gray-800 px-5 py-10'>Back-end</h3>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;