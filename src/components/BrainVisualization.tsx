
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Toggle } from "@/components/ui/toggle";
import { Brain, BrainCircuit, Info } from "lucide-react";

const BrainVisualization: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const [brainMode, setBrainMode] = useState<'biological' | 'ai'>('biological');
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  
  // Brain regions data
  const brainRegions = {
    biological: [
      { id: 'prefrontal', name: 'Prefrontal Cortex', description: 'Decision making center of the brain', color: '#0EA5E9', position: { x: -0.8, y: 0.5, z: 0.5 } },
      { id: 'hippocampus', name: 'Hippocampus', description: 'Memory and learning center', color: '#9b87f5', position: { x: -0.5, y: 0.2, z: 0.3 } },
      { id: 'occipital', name: 'Occipital Lobe', description: 'Vision and pattern recognition', color: '#33C3F0', position: { x: -0.9, y: -0.1, z: 0.2 } },
      { id: 'cerebellum', name: 'Cerebellum', description: 'Balance and fine-tuned responses', color: '#8A898C', position: { x: -0.6, y: -0.4, z: 0.4 } },
      { id: 'amygdala', name: 'Amygdala', description: 'Alerts and threat detection', color: '#7E69AB', position: { x: -0.3, y: 0.1, z: 0.5 } },
      { id: 'pathways', name: 'Neural Pathways', description: 'Data transmission network', color: '#6E59A5', position: { x: -0.2, y: -0.2, z: 0.3 } },
      { id: 'autonomic', name: 'Autonomic Nervous System', description: 'Automated actions control', color: '#8E9196', position: { x: -0.5, y: -0.3, z: 0.2 } },
      { id: 'brainstem', name: 'Brainstem', description: 'Core control hub', color: '#403E43', position: { x: -0.4, y: -0.5, z: 0.3 } }
    ],
    ai: [
      { id: 'decision-engine', name: 'AI Decision Engine', description: 'Plans, forecasts, and dynamically adjusts power use', color: '#00bf72', position: { x: 0.8, y: 0.5, z: 0.5 } },
      { id: 'memory-engine', name: 'Energy Memory Engine', description: 'Records and learns from past consumption patterns', color: '#A8EB12', position: { x: 0.5, y: 0.2, z: 0.3 } },
      { id: 'dashboard', name: 'Smart Visual Dashboard', description: 'Real-time data visualization and insights', color: '#0FA0CE', position: { x: 0.9, y: -0.1, z: 0.2 } },
      { id: 'grid-sync', name: 'Grid Sync Controller', description: 'Integrates with solar, batteries, and power loads', color: '#1EAEDB', position: { x: 0.6, y: -0.4, z: 0.4 } },
      { id: 'anomaly', name: 'Anomaly Detector', description: 'Triggers alerts during faults and failures', color: '#0089A7', position: { x: 0.3, y: 0.1, z: 0.5 } },
      { id: 'automation', name: 'Automation Core', description: 'Creates intelligent rules to act in real-time', color: '#004d7a', position: { x: 0.2, y: -0.2, z: 0.3 } },
      { id: 'iot', name: 'IoT Sensor Network', description: 'Collects building data from smart sensors', color: '#051937', position: { x: 0.5, y: -0.3, z: 0.2 } },
      { id: 'security', name: 'Security Core', description: 'Protects data and ensures reliable operation', color: '#2C065D', position: { x: 0.4, y: -0.5, z: 0.3 } }
    ]
  };

  useEffect(() => {
    let camera: THREE.PerspectiveCamera,
      renderer: THREE.WebGLRenderer,
      controls: OrbitControls;
    
    let animationFrameId: number;
    let isDisposed = false;

    const init = () => {
      if (!containerRef.current) return;

      // Scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;
      scene.background = new THREE.Color(0x050a14);

      // Camera
      camera = new THREE.PerspectiveCamera(75, containerRef.current.offsetWidth / containerRef.current.offsetHeight, 0.1, 1000);
      camera.position.set(0, 0, 5);

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      containerRef.current.appendChild(renderer.domElement);

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
      const ambientLight = new THREE.AmbientLight(0x404040, 2);
      scene.add(ambientLight);

      // Directional Light
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);

      // Point lights for glow effect
      const pointLight1 = new THREE.PointLight(0x00bf72, 2, 10);
      pointLight1.position.set(2, 1, 3);
      scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(0xA8EB12, 2, 10);
      pointLight2.position.set(-2, -1, 3);
      scene.add(pointLight2);

      // Create brain region indicators
      createBrainRegions(scene);

      // Brain model
      const gltfLoader = new GLTFLoader();
      gltfLoader.load(
        '/models/brain/scene.gltf',
        (gltf) => {
          if (isDisposed) return;
          
          const model = gltf.scene;
          modelRef.current = model;
          scene.add(model);

          // Adjust model scale and position
          model.scale.set(0.01, 0.01, 0.01);
          model.position.set(0, -0.5, 0);

          // Add animation
          const animateModel = () => {
            if (modelRef.current && !isDisposed) {
              modelRef.current.rotation.y += 0.002;
              
              // Pulse effect on brain
              const time = Date.now() * 0.001;
              pointLight1.intensity = 2 + Math.sin(time * 1.5) * 0.5;
              pointLight2.intensity = 2 + Math.sin(time * 1.2 + 0.5) * 0.5;
            }
          };

          // Animation loop
          const animate = () => {
            if (isDisposed) return;
            
            animationFrameId = requestAnimationFrame(animate);
            controls.update();
            animateModel();
            renderer.render(scene, camera);
          };

          animate();
        },
        undefined,
        (error) => {
          console.error('An error happened during GLTF load', error);
        }
      );

      // Create a vertical divider line in the middle
      const dividerGeometry = new THREE.BoxGeometry(0.05, 4, 0.05);
      const dividerMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x1EAEDB,
        transparent: true,
        opacity: 0.7
      });
      const dividerLine = new THREE.Mesh(dividerGeometry, dividerMaterial);
      dividerLine.position.set(0, 0, 0);
      scene.add(dividerLine);

      // Create neural connection lines
      createNeuralConnections(scene);
    };

    const createBrainRegions = (scene: THREE.Scene) => {
      // Create indicators for brain regions based on active mode
      const regions = brainMode === 'biological' ? brainRegions.biological : brainRegions.ai;
      
      regions.forEach((region, index) => {
        // Create a glowing sphere for each region
        const sphereGeometry = new THREE.SphereGeometry(0.1, 32, 32);
        const sphereMaterial = new THREE.MeshBasicMaterial({ 
          color: new THREE.Color(region.color),
          transparent: true,
          opacity: 0.8
        });
        
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(region.position.x, region.position.y, region.position.z);
        sphere.userData = { id: region.id, type: 'region' };
        scene.add(sphere);
        
        // Add a pulsing effect with a delay based on index
        setTimeout(() => {
          const pulseAnimation = () => {
            const time = Date.now() * 0.001 + index * 0.3;
            sphere.scale.x = 1 + Math.sin(time * 2) * 0.1;
            sphere.scale.y = 1 + Math.sin(time * 2) * 0.1;
            sphere.scale.z = 1 + Math.sin(time * 2) * 0.1;
            
            sphereMaterial.opacity = 0.5 + Math.sin(time * 2) * 0.3;
          };
          
          // Store the animation function in userData to access it later
          sphere.userData.animate = pulseAnimation;
        }, index * 200);
      });
    };

    const createNeuralConnections = (scene: THREE.Scene) => {
      // Create neural pathways connecting the regions
      const regions = brainMode === 'biological' ? brainRegions.biological : brainRegions.ai;
      
      for (let i = 0; i < regions.length - 1; i++) {
        const startPos = new THREE.Vector3(
          regions[i].position.x,
          regions[i].position.y,
          regions[i].position.z
        );
        
        const endPos = new THREE.Vector3(
          regions[i + 1].position.x,
          regions[i + 1].position.y,
          regions[i + 1].position.z
        );
        
        const points = [];
        points.push(startPos);
        
        // Add some curve points in between
        const midPoint = new THREE.Vector3().lerpVectors(startPos, endPos, 0.5);
        midPoint.z += (Math.random() - 0.5) * 0.5;
        points.push(midPoint);
        
        points.push(endPos);
        
        const curve = new THREE.CatmullRomCurve3(points);
        const geometry = new THREE.TubeGeometry(curve, 20, 0.02, 8, false);
        
        const material = new THREE.MeshBasicMaterial({ 
          color: brainMode === 'biological' ? 0x9b87f5 : 0x00bf72,
          transparent: true,
          opacity: 0.5
        });
        
        const tube = new THREE.Mesh(geometry, material);
        scene.add(tube);
        
        // Add a flowing pulse effect along the tube
        const pulseGeometry = new THREE.SphereGeometry(0.04, 16, 16);
        const pulseMaterial = new THREE.MeshBasicMaterial({ 
          color: brainMode === 'biological' ? 0x6E59A5 : 0xA8EB12,
          transparent: true,
          opacity: 0.8
        });
        
        const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
        scene.add(pulse);
        
        // Animate the pulse along the neural pathway
        const animatePulse = () => {
          const time = (Date.now() * 0.001 + i * 0.5) % 2;
          const position = curve.getPointAt(time / 2); // Divide by 2 to make it go from 0 to 1
          pulse.position.copy(position);
        };
        
        // Store the animation function
        pulse.userData = { animate: animatePulse };
      }
    };

    const updateBrainVisual = () => {
      if (!sceneRef.current) return;
      
      // Remove existing brain regions and connections
      const objectsToRemove = [];
      sceneRef.current.traverse((object) => {
        if (object instanceof THREE.Mesh && (
          (object.userData && object.userData.type === 'region') || 
          object.geometry instanceof THREE.TubeGeometry || 
          object.geometry instanceof THREE.SphereGeometry
        )) {
          objectsToRemove.push(object);
        }
      });
      
      objectsToRemove.forEach(obj => {
        sceneRef.current?.remove(obj);
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach(material => material.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      
      // Create new brain regions and connections
      createBrainRegions(sceneRef.current);
      createNeuralConnections(sceneRef.current);
    };

    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.offsetWidth / containerRef.current.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
    };

    init();
    window.addEventListener('resize', handleResize);

    return () => {
      isDisposed = true;
      window.removeEventListener('resize', handleResize);
      
      cancelAnimationFrame(animationFrameId);
      
      if (containerRef.current && renderer) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
      controls.dispose();
      
      if (sceneRef.current) {
        // Dispose of all geometries and materials
        sceneRef.current.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            if (object.geometry) object.geometry.dispose();
            
            if (object.material) {
              if (Array.isArray(object.material)) {
                object.material.forEach(material => material.dispose());
              } else {
                object.material.dispose();
              }
            }
          }
        });
      }
    };
  }, [brainMode]);

  // Handle brain mode toggle
  const handleBrainModeChange = (value: boolean) => {
    setBrainMode(value ? 'ai' : 'biological');
  };

  return (
    <section className="py-20 relative bg-gradient-to-b from-white to-gray-50 dark:from-background-dark dark:to-black/80 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/8498c989-84ea-4817-976f-4a01efce5b39.png')] bg-no-repeat bg-cover opacity-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            <span className="gradient-text font-normal">Inspired by the Human Brain.</span> <span className="font-medium">Engineered for Energy Mastery.</span>
          </h2>
          <p className="text-lg text-black/70 max-w-2xl mx-auto">
            Explore the intricate network of our AI, designed to optimize energy consumption and reduce waste.
          </p>
        </div>
        
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-black/5 dark:bg-white/5 p-1 flex items-center space-x-2">
            <div className={`flex items-center px-4 py-2 rounded-full ${brainMode === 'biological' ? 'bg-white dark:bg-gray-800 shadow-md' : ''} transition-all duration-300`}>
              <Brain className="w-5 h-5 mr-2 text-blue-500" />
              <span className="text-sm font-medium">Biological Brain</span>
            </div>
            
            <Switch 
              checked={brainMode === 'ai'}
              onCheckedChange={handleBrainModeChange}
              className="data-[state=checked]:bg-accent"
            />
            
            <div className={`flex items-center px-4 py-2 rounded-full ${brainMode === 'ai' ? 'bg-white dark:bg-gray-800 shadow-md' : ''} transition-all duration-300`}>
              <BrainCircuit className="w-5 h-5 mr-2 text-green-500" />
              <span className="text-sm font-medium">Lumesys AI Brain</span>
            </div>
          </div>
        </div>
        
        <div className="lg:flex lg:items-start lg:space-x-8">
          {/* Brain Visualization */}
          <div className="lg:w-2/3">
            <div className="w-full h-[500px] md:h-[600px] relative" ref={containerRef}>
              <div className="absolute bottom-4 right-4 z-10">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="p-2 bg-black/20 rounded-full hover:bg-black/30 transition-colors">
                        <Info className="w-5 h-5 text-white/90" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      <p className="text-sm">
                        Drag to rotate the brain model. Each glowing point represents a key function.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
          
          {/* Brain Region Legend */}
          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-medium mb-4 text-center">
                {brainMode === 'biological' ? 'Human Brain Regions' : 'Lumesys AI Modules'}
              </h3>
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {(brainMode === 'biological' ? brainRegions.biological : brainRegions.ai).map((region) => (
                  <HoverCard key={region.id} openDelay={200} closeDelay={100}>
                    <HoverCardTrigger asChild>
                      <div 
                        className="flex items-center p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                        onMouseEnter={() => setActiveRegion(region.id)}
                        onMouseLeave={() => setActiveRegion(null)}
                      >
                        <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: region.color }}></div>
                        <span className="font-medium">{region.name}</span>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">{region.name}</h4>
                        <p className="text-sm text-muted-foreground">{region.description}</p>
                        {brainMode === 'ai' && (
                          <div className="pt-2 text-xs text-muted-foreground border-t">
                            <span className="font-medium">Biological counterpart:</span>{' '}
                            {brainRegions.biological.find((_, i) => i === brainRegions.ai.findIndex(r => r.id === region.id))?.name}
                          </div>
                        )}
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-center text-black/60 dark:text-white/60 italic">
                  {brainMode === 'biological' 
                    ? "The human brain's architecture inspires our AI design."
                    : "Lumesys mirrors biological functions with engineered intelligence."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrainVisualization;
