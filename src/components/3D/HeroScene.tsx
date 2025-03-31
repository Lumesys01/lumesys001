
import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useTheme } from '@/components/ThemeProvider';
import * as THREE from 'three';

// Simplified sphere component that avoids using drei's Sphere 
// which may be causing compatibility issues
const AnimatedSphere = ({ position, color }) => {
  const mesh = useRef();
  
  return (
    <mesh 
      position={position} 
      ref={mesh}
    >
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial 
        color={color}
        roughness={0.2}
      />
    </mesh>
  );
};

interface HeroSceneProps {
  className?: string;
}

const HeroScene: React.FC<HeroSceneProps> = ({ className = '' }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`w-full h-[400px] lg:h-[500px] ${className}`}>
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ 
          antialias: true,
          alpha: true,
        }}
      >
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
