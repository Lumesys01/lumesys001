
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const BrainVisualization: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    let scene: THREE.Scene,
      camera: THREE.PerspectiveCamera,
      renderer: THREE.WebGLRenderer,
      controls: OrbitControls;

    const init = () => {
      if (!containerRef.current) return;

      // Scene
      scene = new THREE.Scene();

      // Camera
      camera = new THREE.PerspectiveCamera(75, containerRef.current.offsetWidth / containerRef.current.offsetHeight, 0.1, 1000);
      camera.position.set(0, 0, 5);

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Controls
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.screenSpacePanning = false;
      controls.minDistance = 3;
      controls.maxDistance = 7;
      controls.rotateSpeed = 0.5;
      controls.zoomSpeed = 1;
      controls.panSpeed = 0.5;
      controls.enableZoom = false;
      controls.enablePan = false;

      // Ambient Light
      const ambientLight = new THREE.AmbientLight(0x404040, 2); // Soft white light
      scene.add(ambientLight);

      // Directional Light
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);

      // GLTF Loader
      const gltfLoader = new GLTFLoader();
      gltfLoader.load(
        '/models/brain/scene.gltf',
        (gltf) => {
          const model = gltf.scene;
          modelRef.current = model;
          scene.add(model);

          // Adjust model scale and position
          model.scale.set(0.01, 0.01, 0.01);
          model.position.set(0, -0.5, 0);

          // Optional: Add a subtle rotation animation
          const animateModel = () => {
            if (modelRef.current) {
              modelRef.current.rotation.y += 0.002;
            }
          };

          // Animation loop with model rotation
          const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            animateModel(); // Rotate the model
            renderer.render(scene, camera);
          };

          animate();
        },
        undefined,
        (error) => {
          console.error('An error happened during GLTF load', error);
        }
      );

      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };

      animate();
    };

    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current) return;
      camera.aspect = containerRef.current.offsetWidth / containerRef.current.offsetHeight;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
    };

    init();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      // Properly dispose of Three.js resources
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      // Scene doesn't have a dispose method, but we can clear it
      if (scene) {
        // Clean up any objects in the scene
        scene.children.forEach(child => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            if (child.material instanceof THREE.Material) {
              child.material.dispose();
            } else if (Array.isArray(child.material)) {
              child.material.forEach(material => material.dispose());
            }
          }
        });
        // Remove all children
        while(scene.children.length > 0) {
          scene.remove(scene.children[0]);
        }
      }
    };
  }, []);

  return (
    <section className="py-20 relative bg-gradient-to-b from-white to-gray-50 dark:from-background-dark dark:to-black/80 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            <span className="gradient-text font-normal">Inspired by the Human Brain.</span> <span className="font-medium">Engineered for Energy Mastery.</span>
          </h2>
          <p className="text-lg text-black/70 max-w-2xl mx-auto">
            Explore the intricate network of our AI, designed to optimize energy consumption and reduce waste.
          </p>
        </div>
        
        <div className="w-full h-[600px]" ref={containerRef} />
      </div>
    </section>
  );
};

export default BrainVisualization;
