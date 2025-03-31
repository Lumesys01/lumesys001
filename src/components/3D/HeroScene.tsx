
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls, MeshDistortMaterial } from '@react-three/drei';
import { useTheme } from '@/components/ThemeProvider';

const AnimatedSphere = ({ position = [0, 0, 0], color = "#00bf72" }) => {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (!mesh.current) return;
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  });

  return (
    <Sphere 
      visible 
      args={[1, 100, 200]} 
      position={position as [number, number, number]}
      ref={mesh}
    >
      <MeshDistortMaterial 
        color={color}
        attach="material" 
        distort={0.4} 
        speed={2} 
        roughness={0.2}
      />
    </Sphere>
  );
};

interface HeroSceneProps {
  className?: string;
}

const HeroScene: React.FC<HeroSceneProps> = ({ className = '' }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`w-full h-[400px] lg:h-[500px] ${className}`}>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <AnimatedSphere position={[0, 0, 0]} color={theme === 'dark' ? "#00bf72" : "#00bf72"} />
        <AnimatedSphere position={[-2.5, -1, -3]} color={theme === 'dark' ? "#2C065D" : "#A8EB12"} />
        <AnimatedSphere position={[2.5, 1, -3]} color={theme === 'dark' ? "#004d7a" : "#051937"} />
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default HeroScene;
