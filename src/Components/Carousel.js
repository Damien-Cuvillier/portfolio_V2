import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { fetchRepoLanguages } from './githubAPI';
import LangageGithub from './LangageGithub';

const projects = [
  {
    title: 'Booki',
    description: [
      'Booki est un site pour permettre aux usagers de trouver des hébergements et des activités dans la ville de leur choix.',
      'Pour ce projet j\'ai effectué la création de la page d\'accueil de l\'agence de voyage en HTML et CSS ainsi que l\'intégration de l\'interface responsive du site.'
    ],
    imageUrl: process.env.PUBLIC_URL + '/images/Booki.webp',
    projectURL: 'https://github.com/Damien-Cuvillier/Projet-2-Booki'
  },
  {
    title: 'Sophie Bluel Architecte d\'intérieur',
    description: [
      'Création de la page web dynamique du site portfolio de l\'architecte d\'intérieur Sophie Bluel.',
      'Pour ce projet je devais développer la page de présentation des travaux de l\'architecte, la page et le système de connexion de l\'administrateur du site, la modale permettant d\'uploader de nouveaux médias le système de filtration et d\'affichage des projets.'
    ],
    imageUrl: process.env.PUBLIC_URL + '/images/Sophie.webp',
    projectURL: 'https://github.com/Damien-Cuvillier/Projet-3-Sophie-Bluel'
  },
  {
    title: 'Nina Carducci Photographe',
    description: [
      'Débuggage et optimisation d\'un site de photographe.',
      'Dans ce projet je devais optimiser le référencement du site, en améliorant sa performance et son accessibilité.', 
      'Je devais identifier les problèmes de chargement et de référencement avec des outils comme Lighthouse ou Wave pour évaluer les performances du site et son accessibilité.',
      'Je devais élaborer des recommandations pour améliorer la vitesse de chargement, la structure du code et le référencement, dans un rapport.',
    ],
    imageUrl: process.env.PUBLIC_URL + '/images/Nina.webp',
    projectURL: 'https://github.com/Damien-Cuvillier/P4-Nina-Carducci'
  },
  {
    title: 'Kasa',
    description: [
      'Refonte d\'une application de location immobilière avec React et React Router.',
      'Kasa est une application React de location d\'appartement entre particuliers en France, j\'ai du utiliser React Router pour configurer la navigation entre les différentes pages de l\'application.',
      'Pour ce projet j\'ai développé les différentes pages de l\'application (Accueil, A propos, Détails de location, 404) ainsi que les composants présents sur ces pages (Carrousel, slider, collapse, grid, banner)',
    ],
      imageUrl: process.env.PUBLIC_URL + '/images/Kasa.webp',
    projectURL:'https://github.com/Damien-Cuvillier/P5_Kasa'
  },
  {
    title: 'Mon vieux grimoire',
    description: [
      'Développement du back-end d\'un site de notation de livres.',
      'Dans ce projet je devais créer un serveur avec Express et de le connecter à une base de données MongoDB, développer les modèles de données et implémenter la gestion des livres et des notations, implémenter un système d\'authentification sécurisé pour les utilisateurs du site.',
      'Je devais prendre en compte la gestion du téléchargement et de l\'optimisation des images, et respecter les bonnes pratiques du Green Code.',
    ],
      imageUrl: process.env.PUBLIC_URL + '/images/Grimoire.webp',
    projectURL:'https://github.com/Damien-Cuvillier/P6_Grimoire'
  },
  {
    title: 'Menu Maker by Qwenta',
    description: [
      'Planification du développement du site de Menu Maker.',
      'Dans ce projet j\'ai mis en place une veille technologique pour rester informé des dernières tendances et technologies pertinentes pour le projet.',
      'Je me suis chargé de rédiger les spécifications techniques du projet donc l\'identification des besoins fonctionnels et la décomposition des fonctionnalités en tâches spécifiques.',
      'J\'ai aussi utilisé un outil de gestion de projet, comme Notion, pour organiser le projet et créer un tableau Kanban. Cela aide à suivre le déroulement du projet de manière structurée et efficace. Présentation des résultats dans un rapport d\'intervention',
    ],
      imageUrl: process.env.PUBLIC_URL + '/images/MenuMaker.webp',
    projectURL:''
  },
  // Ajouter plus de projets ici
];
const ProjectsCarousel = () => {
  const [repos, setRepos] = useState(projects.map(project => ({ ...project, languageData: [] })));
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchLanguages = async () => {
      const updatedRepos = await Promise.all(
        projects.map(async (project) => {
          if (project.projectURL) {
            const repoName = project.projectURL.split('/').pop();
            const languages = await fetchRepoLanguages(`https://api.github.com/repos/Damien-Cuvillier/${repoName}/languages`);
           

            const totalBytes = Object.values(languages).reduce((a, b) => a + b, 0);
            const languageData = Object.keys(languages).map(key => ({
              name: key,
              value: parseFloat(((languages[key] / totalBytes) * 100).toFixed(2)),
            }));
            

            return { ...project, languageData };
          }
          return project;
        })
      );
      setRepos(updatedRepos);
    };

    fetchLanguages();
  }, []);

  useEffect(() => {
   
  }, [repos, currentSlide]);

  return (
    <>
      <Carousel 
        showArrows={true} 
        autoPlay={true} 
        infiniteLoop={true} 
        showThumbs={false} 
        onChange={(index) => setCurrentSlide(index)}
      >
        {repos.map((repo, index) => (
          <div className="bg-gray-100 max-w-full flex-col mx-auto h-full" key={index}>
            <div className="relative pb-8">
              <img src={repo.imageUrl} alt={repo.title} className="w-full h-64 object-cover rounded-md" />
            </div>
          </div>
        ))}
      </Carousel>
      {repos[currentSlide] && (
        <div className={`legend flex flex-col ${repos[currentSlide].projectURL ? "md:flex-row" : "justify-center"} items-center bg-gray-100 p-4 rounded-md shadow-md mt-4 h-auto w-full max-w-3xl mx-auto h-1/2 pb-24`}>
          {repos[currentSlide].projectURL && (
            <div className="w-full md:w-1/2">
              <a className="my-2 py-2 text-sm text-gray-800 font-bold hover:underline relative" href={repos[currentSlide].projectURL} target="_blank" rel="noopener noreferrer">
                GitHub <FontAwesomeIcon icon={faGithub} />
              </a>
              {repos[currentSlide].languageData.length > 0 && (
                <LangageGithub data={repos[currentSlide].languageData} />
              )}
            </div>
          )}
          <div className={`w-full ${repos[currentSlide].projectURL ? "md:w-1/2 mt-4 md:mt-0 md:ml-4" : "text-center"}`}>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{repos[currentSlide].title}</h3>
            
            {repos[currentSlide].description && (
              <ul className="list-disc list-inside text-gray-600 text-sm">
                {repos[currentSlide].description.map((desc, descIndex) => (
                  <li key={descIndex}>{desc}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectsCarousel;
