import React, { useState, useEffect } from 'react';
import Tetris from 'react-tetris';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowRight, faArrowLeft, faArrowDown, faGamepad, faLock, faTimes } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import '../App.css';
import '../styles/tetrisModal.css'
// Données des projets
const projects = [
  {
    id: 1,
    title: 'Booki',
    description: [
      'Booki est un site pour permettre aux usagers de trouver des hébergements et des activités dans la ville de leur choix.',
      'Pour ce projet j\'ai effectué la création de la page d\'accueil de l\'agence de voyage en HTML et CSS ainsi que l\'intégration de l\'interface responsive du site.'
    ],
    imageUrl: process.env.PUBLIC_URL + '/images/Booki.webp',
    projectURL: 'https://github.com/Damien-Cuvillier/Projet-2-Booki',
    lines: 1
  },
  {
    id: 2,
    title: 'Sophie Bluel',
    description: [
      'Création de la page web dynamique du site portfolio de l\'architecte d\'intérieur Sophie Bluel.',
      'Pour ce projet je devais développer la page de présentation des travaux de l\'architecte, la page et le système de connexion de l\'administrateur du site, la modale permettant d\'uploader de nouveaux médias le système de filtration et d\'affichage des projets.'
    ],
    imageUrl: process.env.PUBLIC_URL + '/images/Sophie.webp',
    projectURL: 'https://github.com/Damien-Cuvillier/Projet-3-Sophie-Bluel',
    lines: 2
  },
  {
    id: 3,
    title: 'Nina Carducci',
    description: [
      'Débuggage et optimisation d\'un site de photographe.',
      'Dans ce projet je devais optimiser le référencement du site, en améliorant sa performance et son accessibilité.', 
      'Je devais identifier les problèmes de chargement et de référencement avec des outils comme Lighthouse ou Wave pour évaluer les performances du site et son accessibilité.',
      'Je devais élaborer des recommandations pour améliorer la vitesse de chargement, la structure du code et le référencement, dans un rapport.',
    ],
    imageUrl: process.env.PUBLIC_URL + '/images/Nina.webp',
    projectURL: 'https://github.com/Damien-Cuvillier/P4-Nina-Carducci',
    lines: 3
  },
  {
    id:4,
    title: 'Kasa',
    description: [
      'Refonte d\'une application de location immobilière avec React et React Router.',
      'Kasa est une application React de location d\'appartement entre particuliers en France, j\'ai du utiliser React Router pour configurer la navigation entre les différentes pages de l\'application.',
      'Pour ce projet j\'ai développé les différentes pages de l\'application (Accueil, A propos, Détails de location, 404) ainsi que les composants présents sur ces pages (Carrousel, slider, collapse, grid, banner)',
    ],
    imageUrl: process.env.PUBLIC_URL + '/images/Kasa.webp',
    projectURL: 'https://github.com/Damien-Cuvillier/P5_Kasa',
    lines: 4
  },
  {
    id: 5,
    title: 'Mon vieux grimoire',
    description: [
      'Développement du back-end d\'un site de notation de livres.',
      'Dans ce projet je devais créer un serveur avec Express et de le connecter à une base de données MongoDB, développer les modèles de données et implémenter la gestion des livres et des notations, implémenter un système d\'authentification sécurisé pour les utilisateurs du site.',
      'Je devais prendre en compte la gestion du téléchargement et de l\'optimisation des images, et respecter les bonnes pratiques du Green Code.',
    ],
    imageUrl: process.env.PUBLIC_URL + '/images/Grimoire.webp',
    projectURL: 'https://github.com/Damien-Cuvillier/P6_Grimoire',
    lines: 5
  },
  {
    id: 6,
    title: 'Menu Maker by Qwenta',
    description: [
      'Planification du développement du site de Menu Maker.',
      'Dans ce projet j\'ai mis en place une veille technologique pour rester informé des dernières tendances et technologies pertinentes pour le projet.',
      'Je me suis chargé de rédiger les spécifications techniques du projet donc l\'identification des besoins fonctionnels et la décomposition des fonctionnalités en tâches spécifiques.',
      'J\'ai aussi utilisé un outil de gestion de projet, comme Notion, pour organiser le projet et créer un tableau Kanban. Cela aide à suivre le déroulement du projet de manière structurée et efficace. Présentation des résultats dans un rapport d\'intervention',
    ],
    imageUrl: process.env.PUBLIC_URL + '/images/MenuMaker.webp',
    lines: 6
  },
  // Ajoutez les autres projets ici...
];

const TetrisComponent = () => {
  const [gameController, setGameController] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [unlockedProjects, setUnlockedProjects] = useState([]);
  const [previousLinesCleared, setPreviousLinesCleared] = useState(0);
  const [currentLinesCleared, setCurrentLinesCleared] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (gameState && currentLinesCleared > previousLinesCleared) {
      const newUnlockedProjects = projects
        .filter(project => project.lines <= currentLinesCleared && !unlockedProjects.includes(project.id))
        .map(project => project.id);

      if (newUnlockedProjects.length > 0) {
        setUnlockedProjects([...unlockedProjects, ...newUnlockedProjects]);
        Swal.fire({
          title: 'Projet débloqué !',
          text: `Vous avez débloqué ${newUnlockedProjects.length} nouveau(x) projet(s) !`,
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      }
      setPreviousLinesCleared(currentLinesCleared);
    }
  }, [currentLinesCleared, gameState, unlockedProjects, previousLinesCleared]);
  useEffect(() => {
    if (selectedProject && gameController) {
      gameController.pause();
    }
  }, [selectedProject, gameController]);
  
  // Modal Component
  const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;
  
    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onKeyDown={(e) => e.stopPropagation()}
      >
        <div 
          className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-gray-800">{project.title}</h3>
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FontAwesomeIcon icon={faTimes} className="text-xl" />
            </button>
          </div>
          <div className="modal-image-container mb-4">
            <img 
              src={project.imageUrl} 
              alt={project.title}
              className="w-full rounded-lg object-contain max-h-[60vh]"
            />
          </div>
          <div className="space-y-4">
            {project.description.map((paragraph, index) => (
              <p key={index} className="text-gray-600">{paragraph}</p>
            ))}
          </div>
          {project.projectURL && (
            <div className="mt-6">
              <a
                href={project.projectURL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Voir sur GitHub
              </a>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Composant pour afficher un projet
  const ProjectThumbnail = ({ project, isLeft }) => (
    <div 
      className={`project-thumbnail ${unlockedProjects.includes(project.id) ? 'unlocked' : 'locked'}`}
      onClick={() => unlockedProjects.includes(project.id) && setSelectedProject(project)}
    >
      <div className="relative group">
        <img 
          src={project.imageUrl} 
          alt={project.title}
          className={`w-full h-32 object-cover rounded-lg transition-all duration-300
            ${unlockedProjects.includes(project.id) ? 'filter-none' : 'grayscale filter blur-sm'}`}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          {!unlockedProjects.includes(project.id) && (
            <FontAwesomeIcon icon={faLock} className="text-white text-2xl" />
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center rounded-b-lg">
          <p className="text-sm">{project.title}</p>
          <p className="text-xs">{unlockedProjects.includes(project.id) ? 'Débloqué' : `${project.lines} lignes requises`}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="tetris-page-container flex justify-center items-start gap-8 p-4 mt-12">
      {/* Colonne de gauche */}
      <div className="left-column w-1/5 space-y-4">
        <div className="about-section bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-2">À propos de moi</h3>
          <p className="text-gray-600">
            Développeur web passionné, en React et Node.js.
            Débloquez mes projets en complétant des lignes au Tetris !
          </p>
        </div>
        <div className="left-projects space-y-4">
          {projects.slice(0, 2).map(project => (
            <ProjectThumbnail key={project.id} project={project} isLeft={true} />
          ))}
        </div>
      </div>

      {/* Tetris au centre */}
      <div className="tetris-container bg-white rounded-lg shadow-lg p-6">
        <h2 className='text-2xl font-bold text-gray-800 mb-4 text-center'>
          <FontAwesomeIcon icon={faGamepad} /> Tetris <FontAwesomeIcon icon={faGamepad} />
        </h2>
        <Tetris
          keyboardControls={{
            down: 'MOVE_DOWN',
            left: 'MOVE_LEFT',
            right: 'MOVE_RIGHT',
            space: 'HARD_DROP',
            z: 'FLIP_COUNTERCLOCKWISE',
            x: 'FLIP_CLOCKWISE',
            up: 'FLIP_CLOCKWISE',
            p: 'TOGGLE_PAUSE',
            c: 'HOLD',
            shift: 'HOLD',
          }}
        >
          {({
            HeldPiece,
            Gameboard,
            PieceQueue,
            points,
            linesCleared,
            state,
            controller,
          }) => {
            if (gameController !== controller) setGameController(controller);
            if (gameState !== state) setGameState(state);
            if (currentLinesCleared !== linesCleared) setCurrentLinesCleared(linesCleared);

            return (
              <div className="tetris-game">
                <div className="points">
                  <div>
                    <p>Points</p>
                    <p>{points}</p>
                  </div>
                  <div>
                    <p>Lignes</p>
                    <p>{linesCleared}</p>
                  </div>
                </div>
                <div className="held-piece-container">
                  <HeldPiece />
                </div>
                <Gameboard />
                <div className="piece-queue-container">
                  <PieceQueue />
                </div>
                <div className="controls">
                  <h3 className='font-bold text-gray-800 py-5'>Controls</h3>
                  <div className="control-row">
                    <FontAwesomeIcon icon={faArrowUp} /> Rotate
                  </div>
                  <div className="control-row">
                    <FontAwesomeIcon icon={faArrowLeft} /> Left
                  </div>
                  <div className="control-row">
                    <FontAwesomeIcon icon={faArrowRight} /> Right
                  </div>
                  <div className="control-row">
                    <FontAwesomeIcon icon={faArrowDown} /> Soft Drop
                  </div>
                  <div className="control-row">
                    ▬ Drop
                  </div>
                  <div>"C" hold</div>
                  <div>"P" Pause</div>
                </div>
                <button
                  onClick={() => gameController && gameController.restart()}
                  className="restart-button text-gray-800 font-bold mt-12 bg-blue-400 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                  Rejouer
                </button>
              </div>
            );
          }}
        </Tetris>
      </div>

      {/* Colonne de droite */}
      <div className="right-column w-1/5 space-y-4">
        {projects.slice(2).map(project => (
          <ProjectThumbnail key={project.id} project={project} isLeft={false} />
        ))}
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
};

export default TetrisComponent;