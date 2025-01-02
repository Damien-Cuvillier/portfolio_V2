import * as THREE from 'three';
import React, { useState, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { useTransition, a } from '@react-spring/three';
import flatten from 'lodash-es/flatten';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import '../styles/Intro.css';
import { ShapeGeometry } from 'three';
import { extend } from '@react-three/fiber';
import { useSpring } from 'react-spring';

const svgNames = ['city', 'woods', 'beach','morning'];
const svgUrls = svgNames.map(name => process.env.PUBLIC_URL + `/images/svg/${name}.svg`);

const svgDimensions = { 
  city: [5, 5, 5], 
  morning: [2.5, 2.5, 2.5], 
  woods: [1.2, 1.2, 1.2], 
  beach: [4.5, 4.5, 4.5], 
};

extend({ ShapeGeometry });

function Shape({ shape, position, color, opacity, index, scale }) {
  const transformPosition = index === 0 ? [position[0] + 100, position[1] + 100, position[2]] : position;
  return (
    <a.mesh position={transformPosition} scale={scale}>
      <a.meshPhongMaterial attach="material" color={color} opacity={opacity} side={THREE.DoubleSide} depthWrite={false} transparent receiveShadow castShadow />
      <primitive attach="geometry" object={new ShapeGeometry(shape)} />
    </a.mesh>
  );
}

const svgCache = {};

const loadSVG = (svgUrl) => {
  if (svgCache[svgUrl]) {
    return Promise.resolve(svgCache[svgUrl]);
  }

  return new Promise((resolve, reject) => {
    new SVGLoader().load(
      svgUrl,
      data => {
        if (data && data.paths) {
          const shapes = flatten(data.paths.map((path, index) =>
            path.toShapes(true).map(shape => ({ shape, color: path.color, index }))
          ));
          svgCache[svgUrl] = shapes;
          resolve(shapes);
        } else {
          reject(new Error('Failed to load SVG: No paths found'));
        }
      },
      undefined,
      error => {
        reject(new Error('Failed to load SVG'));
      }
    );
  });
};

let lastFrameTime = performance.now();
function Scene() {
  const [shapes, setShapes] = useState([]);
  const [currentSVG, setCurrentSVG] = useState(0);
  const colors = ['#f1cff7', '#96b4df', '#96dfab', '#ffc897'];

  const handleSVGChange = useCallback(async () => {
    const svgUrl = svgUrls[currentSVG];
    try {
      const newShapes = await loadSVG(svgUrl);
      setShapes(newShapes);
    } catch (error) {
      console.error('Error loading SVG:', error);
    }
  }, [currentSVG]);

  useEffect(() => {
    handleSVGChange();
  }, [currentSVG, handleSVGChange]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSVG(prev => (prev + 1) % svgUrls.length);
    }, 7000); // Change toutes les 10 secondes

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    function render() {
      const currentTime = performance.now();
      if (currentTime - lastFrameTime >= 16) { // 60 FPS
        // Effectuer le rendu ici
        lastFrameTime = currentTime;
      }
      requestAnimationFrame(render);
    }
    render();
  }, []);

  const { color } = useSpring({ color: colors[currentSVG], config: { duration: 1000 } });

  const transitions = useTransition(shapes, {
    from: ({ shape }) => ({
      position: [500, 500, 200],
      opacity: 0,
      scale: svgDimensions[svgNames[currentSVG]] || [2, 2, 2]
    }),
    enter: ({ shape }) => ({
      position: [-100, 0, 0],
      opacity: 1,
      scale: svgDimensions[svgNames[currentSVG]] || [2, 2, 2]
    }),
    leave: ({ shape }) => ({
      position: [1000, -500, 10],
      opacity: 0,
      scale: svgDimensions[svgNames[currentSVG]] || [2, 2, 2]
    }),
    keys: item => item.shape.uuid,
    trail: 5,
    config: { mass: 10, tension: 400, friction: 50, precision: 0.0001 },
    lazy: true,
  });

  return (
    <>
      <a.mesh scale={[20000, 20000, 1]} rotation={[0, THREE.MathUtils.degToRad(-20), 0]}>
        <planeGeometry attach="geometry" args={[1, 1]} />
        <a.meshPhongMaterial attach="material" color={color} depthTest={false} receiveShadow castShadow/>
      </a.mesh>

      <group position={[1000, -1000, 0]} rotation={[0, THREE.MathUtils.degToRad(180), 0]}>
        {transitions((props, item) => (
          <Shape key={item.shape.uuid} {...item} {...props} />
        ))}
      </group>
    </>
  );
}

function About() {
  return (
    <div className="about w-full h-full">
      <Canvas
        camera={{
          fov: 80,
          position: [0, 0, 2000],
          rotation: [0, THREE.MathUtils.degToRad(-20), THREE.MathUtils.degToRad(180)],
          far: 20000,
        }}
        style={{ display:'block', height:'955px', width:'100%', margin:'auto' }}
      >
        <ambientLight intensity={1} />
        <directionalLight
          intensity={0.8}
          position={[-500, 500, 500]}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={0.5}
          shadow-camera-far={500}
          shadow-camera-left={-500}
          shadow-camera-right={500}
          shadow-camera-top={500}
          shadow-camera-bottom={-500}
          castShadow
        />
        <spotLight
          color={new THREE.Color('white')}
          intensity={1.5}
          position={[-100, 500, 500]}
          angle={0.5}
          penumbra={0.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={0.5}
          shadow-camera-far={500}
        />
        <Scene />
      </Canvas>
      <p className="header-about">
        <span className="name text-6xl font-bold text-gray-800">Damien Cuvillier</span><br/>
        <span className="role text-3xl font-bold text-gray-800 mb-4">Développeur web</span><br/>
        <span className="description text-xl text-gray-700 mt-4">Ensemble, réalisons des projets innovants.<br/> À distance ou sur site, je suis prêt à relever de nouveaux défis.</span>
      </p>
    </div>
  );
}
export default About