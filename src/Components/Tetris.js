import React, { useState, useEffect } from 'react';
import Tetris from 'react-tetris';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowRight, faArrowLeft, faArrowDown, faGamepad, faLock, faTimes } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import '../App.css';
import '../styles/tetrisModal.css'
import Competences from './Competences';
import ContactForm from './ContactForm';
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
    lines: 2
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
    lines: 3
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
    lines: 4
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
    lines: 5
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
    lines: 6
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
    lines: 7
  },
  // Ajoutez les autres projets ici...
];
const skills = [
  {
    id: 1,
    title: 'Compétences',
    description: [
      'Mes compétences en développement web',
      'Front-end et Back-end'
    ],
    imageUrl: process.env.PUBLIC_URL + '/images/skills.webp',
    lines: 1
  },
  {
    id: 2,
    description: [
      'Formulaire de contact',
      'Envoyez-moi un message'
    ],
    imageUrl: process.env.PUBLIC_URL + '/images/contact.webp',
    lines: 8
  }
];

const TetrisComponent = ({ 
  unlockedProjects, 
  setUnlockedProjects, 
  unlockedSkills, 
  setUnlockedSkills 
}) => {
  const [gameController, setGameController] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [previousLinesCleared, setPreviousLinesCleared] = useState(0);
  const [currentLinesCleared, setCurrentLinesCleared] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('tetrisHighScore');
    return saved ? parseInt(saved) : 0;
  });
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Mettre à jour le meilleur score quand currentLinesCleared change
  useEffect(() => {
    if (currentLinesCleared > highScore) {
      setHighScore(currentLinesCleared);
      localStorage.setItem('tetrisHighScore', currentLinesCleared.toString());
    }
  }, [currentLinesCleared, highScore]);

  // Gestion du déblocage des projets et compétences
  useEffect(() => {
    if (gameState && currentLinesCleared > previousLinesCleared) {
      // Filtrer uniquement les nouveaux projets débloqués
      const newUnlockedProjects = projects
        .filter(project => 
          project.lines <= currentLinesCleared && 
          !unlockedProjects.includes(project.id)
        )
        .map(project => project.id);
  
      // Filtrer uniquement les nouvelles compétences débloquées
      const newUnlockedSkillIds = skills
        .filter(skill => 
          skill.lines <= currentLinesCleared && 
          !unlockedSkills.includes(skill.id)
        )
        .map(skill => skill.id);
  
      // Mettre à jour les états seulement s'il y a de nouveaux éléments débloqués
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
  
      if (newUnlockedSkillIds.length > 0) {
        setUnlockedSkills([...unlockedSkills, ...newUnlockedSkillIds]);
        Swal.fire({
          title: 'Compétences débloquées !',
          text: `Vous avez débloqué ${newUnlockedSkillIds.length} nouvelle(s) compétence(s) !`,
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      }
  
      setPreviousLinesCleared(currentLinesCleared);
    }
  }, [currentLinesCleared, gameState, unlockedProjects, unlockedSkills, previousLinesCleared, setUnlockedProjects, setUnlockedSkills]);

  // Gestion de la pause pour les modales
  useEffect(() => {
    if (selectedProject && gameController) {
      gameController.pause();
    }
  }, [selectedProject, gameController]);

  useEffect(() => {
    if (selectedSkill && gameController) {
      gameController.pause();
    }
  }, [selectedSkill, gameController]);
// Gestionnaire pour réinitialiser le jeu
const handleRestart = () => {
  if (gameController) {
    // Sauvegarder le score actuel si c'est un meilleur score
    const highScore = parseInt(localStorage.getItem('tetrisHighScore') || '0');
    if (currentLinesCleared > highScore) {
      localStorage.setItem('tetrisHighScore', currentLinesCleared.toString());
    }

    gameController.restart();
    document.activeElement.blur();
    const gameContainer = document.querySelector('.tetris-container');
    if (gameContainer) {
      gameContainer.focus();
    }
  }
};
  // Gestion du Game Over
  useEffect(() => {
    if (gameState === 'LOST') {
      Swal.fire({
        title: 'Game Over!',
        text: `Score final : ${currentLinesCleared} lignes`,
        icon: 'error',
        confirmButtonText: 'Rejouer',
        showCancelButton: true,
        cancelButtonText: 'Fermer',
      }).then((result) => {
        if (result.isConfirmed && gameController) {
          gameController.restart();
          document.activeElement.blur();
          const gameContainer = document.querySelector('.tetris-container');
          if (gameContainer) {
            gameContainer.focus();
          }
        }
      });
    }
  }, [gameState, currentLinesCleared, gameController]);

  // Déplacer les composants à l'intérieur de TetrisComponent
  const SkillThumbnail = ({ skill }) => (
    <div 
      className={`skill-thumbnail ${unlockedSkills.includes(skill.id) ? 'unlocked hover:cursor-pointer' : 'locked'}`}
      onClick={() => unlockedSkills.includes(skill.id) && setSelectedSkill(skill)}
    >
      <div className="relative group w-full h-[150px]">
        <img 
          src={skill.imageUrl} 
          alt={skill.title}
          className={`w-full h-full object-contain rounded-lg transition-all duration-300 hover:transform hover:scale-105
            ${unlockedSkills.includes(skill.id) ? 'filter-none hover:brightness-110' : 'grayscale filter blur-sm'}`}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          {!unlockedSkills.includes(skill.id) && (
            <FontAwesomeIcon icon={faLock} className="text-white text-2xl" />
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center rounded-b-lg">
          <p className="text-xs">{unlockedSkills.includes(skill.id) ? 'Débloqué' : `${skill.lines} lignes requises`}</p>
        </div>
      </div>
    </div>
  );

  const SkillModal = ({ skill, onClose }) => {
    if (!skill) return null;

    const handleClose = () => {
      onClose();
      if (gameController) {
        gameController.resume();
      }
    };

    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onKeyDown={(e) => e.stopPropagation()}
      >
        <div 
          className={`bg-white rounded-lg relative mx-4 ${
            skill.id === 1 
              ? 'max-w-[calc(4xl+150px)] w-[calc(70%+50px)]' // Style pour la modale des compétences
              : 'max-w-xl w-full' // Style plus compact pour le formulaire de contact
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={handleClose}
            className={`absolute top-4 right-4 text-gray-700 hover:text-gray-800 transition-colors text-xl ${
              skill.id === 1 ? 'top-16' : 'top-4' // Ajustement de la position du bouton de fermeture
            }`}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          
          {skill.id === 1 ? (
            <Competences />
          ) : (
            <div > {/* Ajout de padding pour le formulaire */}
              <ContactForm showOnlyForm={true} />
            </div>
          )}
        </div>
      </div>
    );
  };

  // Modal Component
const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  const handleClose = () => {
    onClose(); // Ferme la modale
    if (gameController) {
      gameController.resume(); // Reprend le jeu
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onKeyDown={(e) => e.stopPropagation()}
    >
      <div 
        className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={handleClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Fermer"
        >
          <FontAwesomeIcon icon={faTimes} className="text-xl" />
        </button>
        
        <div className="mt-2">
          <div className="modal-image-container my-4">
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
                className="inline-block relative bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Voir sur GitHub
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

  // Composant pour afficher un projet
  const ProjectThumbnail = ({ project, isLeft }) => (
    <div 
      className={`project-thumbnail ${unlockedProjects.includes(project.id) ? 'unlocked hover:cursor-pointer' : 'locked'}`}
      onClick={() => unlockedProjects.includes(project.id) && setSelectedProject(project)}
    >
      <div className="relative group w-full h-[150px]">
        <img 
          src={project.imageUrl} 
          alt={project.title}
          className={`w-full h-full object-contain rounded-lg transition-all duration-300 hover:transform hover:scale-105
            ${unlockedProjects.includes(project.id) ? 'filter-none hover:brightness-110' : 'grayscale filter blur-sm'}`}
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
        <div className="left-projects flex flex-col space-y-4">
          {skills
            .filter(skill => skill.id === 1)
            .map(skill => (
              <SkillThumbnail key={skill.id} skill={skill} />
            ))}
          {projects
            .filter(project => ['Booki', 'Sophie Bluel', 'Nina Carducci'].includes(project.title))
            .map(project => (
              <ProjectThumbnail key={project.id} project={project} isLeft={true} />
            ))}
        </div>
      </div>

      {/* Tetris au centre */}
      <div 
        className="tetris-container bg-white rounded-lg shadow-lg p-6 focus:outline-none" 
        tabIndex="-1"
      >
        <h2 className='text-4xl font-bold text-gray-800 mb-4 text-center mr-20'>
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
                <div className="points text-xl">
                  <div>
                    <p>Points</p>
                    <p>{points}</p>
                  </div>
                  <div>
                    <p>Lignes</p>
                    <p>{linesCleared}</p>
                  </div>
                  <div>
                    <p>Top Score</p>
                    <p>{highScore}</p>
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
                  onClick={handleRestart}
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
      <div className="right-column w-1/5">
        <div className="right-projects flex flex-col space-y-4">
          {projects
            .filter(project => ['Kasa', 'Mon vieux grimoire'].includes(project.title))
            .map(project => (
              <ProjectThumbnail key={project.id} project={project} isLeft={false} />
            ))}
          {projects
            .filter(project => project.title === 'Menu Maker by Qwenta')
            .map(project => (
              <ProjectThumbnail key={project.id} project={project} isLeft={false} />
            ))}
          {skills
            .filter(skill => skill.id === 2)
            .map(skill => (
              <SkillThumbnail key={skill.id} skill={skill} />
            ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}

      {/* Ajouter la modal des compétences */}
      {selectedSkill && (
        <SkillModal 
          skill={selectedSkill} 
          onClose={() => setSelectedSkill(null)} 
        />
      )}
    </div>
  );
};

export default TetrisComponent;