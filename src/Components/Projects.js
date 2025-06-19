import React from 'react';
import Carousel from './Carousel'
import Langage from './LangageGithub';

function Projects() {
  return (
    <section id="projects" className='w-full h-screen md:py-16'> 

      <h2 className='project-title mx-auto w-32 text-3xl font-bold text-gray-800 py-1  border-t-2 border-gray-800'>Projets</h2>
      <Carousel />
      <Langage />
    </section>
  );
}

export default Projects;