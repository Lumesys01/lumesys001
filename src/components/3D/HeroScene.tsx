
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTheme } from '@/components/ThemeProvider';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';

// Create a flowing wave plane for a more modern, futuristic look
const FlowingWave = ({ color, speed = 1.5, density = 1.5, amplitude = 0.6 }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometryRef = useRef<THREE.PlaneGeometry>(null);

  // Create a more detailed plane for smoother waves
  const geometry = useMemo(() => new THREE.PlaneGeometry(12, 12, 64, 64), []);
  
  // Update the wave animation on each frame
  useFrame(({ clock }) => {
    if (meshRef.current && geometryRef.current) {
      const time = clock.getElapsedTime() * speed;
      const position = geometryRef.current.attributes.position;
      
      for (let i = 0; i < position.count; i++) {
        const x = position.getX(i);
        const y = position.getY(i);
        
        // Create smooth flowing wave pattern
        const z = Math.sin(x * density + time) * Math.cos(y * density + time) * amplitude;
        
        position.setZ(i, z);
      }
      
      position.needsUpdate = true;
    }
  });
  
  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 3, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry ref={geometryRef} args={[12, 12, 64, 64]} />
      <meshStandardMaterial 
        color={color}
        side={THREE.DoubleSide}
        wireframe={false}
        metalness={0.8}
        roughness={0.2}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

// Create glowing particles that float around
const GlowingParticles = ({ count = 100, color }) => {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15
      );
      const size = Math.random() * 0.1 + 0.05;
      const speed = Math.random() * 0.02 + 0.01;
      const offset = Math.random() * Math.PI * 2;
      temp.push({ position, size, speed, offset });
    }
    return temp;
  }, [count]);

  useFrame(({ clock }) => {
    if (mesh.current) {
      particles.forEach((particle, i) => {
        const time = clock.getElapsedTime();
        
        // Create gentle floating motion
        const x = particle.position.x + Math.sin(time * particle.speed + particle.offset) * 0.2;
        const y = particle.position.y + Math.cos(time * particle.speed + particle.offset) * 0.2;
        const z = particle.position.z + Math.sin(time * particle.speed + particle.offset + Math.PI/2) * 0.2;
        
        const matrix = new THREE.Matrix4();
        matrix.setPosition(x, y, z);
        matrix.scale(new THREE.Vector3(particle.size, particle.size, particle.size));
        mesh.current.setMatrixAt(i, matrix);
      });
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color}
        emissiveIntensity={0.5}
        toneMapped={false}
      />
    </instancedMesh>
  );
};

// Create elegant flowing ribbons
const FlowingRibbon = ({ color, width = 0.1, points = 100, length = 10, offset = 0 }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      Array.from({ length: points }, (_, i) => {
        const t = (i / (points - 1)) * Math.PI * 2;
        return new THREE.Vector3(
          Math.cos(t * 2) * 2,
          Math.sin(t * 3) * 2,
          Math.sin(t) * 2
        );
      })
    );
  }, [points]);

  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.y = clock.getElapsedTime() * 0.1 + offset;
      mesh.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.2 + offset) * 0.1;
    }
  });

  return (
    <mesh ref={mesh}>
      <tubeGeometry args={[curve, 100, width, 8, false]} />
      <meshStandardMaterial 
        color={color} 
        metalness={0.8}
        roughness={0.2}
        emissive={color}
        emissiveIntensity={0.3}
        toneMapped={false}
      />
    </mesh>
  );
};

const Scene = () => {
  const { theme } = useTheme();
  
  // Define colors based on theme
  const primaryColor = theme === 'dark' ? "#00bf72" : "#00bf72"; 
  const secondaryColor = theme === 'dark' ? "#2C065D" : "#A8EB12";
  const accentColor = theme === 'dark' ? "#004d7a" : "#051937";
  
  return (
    <>
      {/* Main lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color={primaryColor} />
      
      {/* Main flowing wave effect similar to the inspiration image */}
      <FlowingWave color={primaryColor} speed={0.8} />
      
      {/* Add a second wave for more depth and complexity */}
      <FlowingWave 
        color={secondaryColor} 
        speed={0.5} 
        density={2} 
        amplitude={0.3}
      />
      
      {/* Add floating particles for depth */}
      <GlowingParticles count={50} color={accentColor} />
      
      {/* Add flowing ribbons to enhance the 3D feel */}
      <FlowingRibbon color={primaryColor} width={0.05} offset={0} />
      <FlowingRibbon color={secondaryColor} width={0.04} offset={Math.PI/2} />
      
      {/* Camera controls for subtle movement */}
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.3}
        autoRotate
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
    </>
  );
};

interface HeroSceneProps {
  className?: string;
}

const HeroScene: React.FC<HeroSceneProps> = ({ className = '' }) => {
  return (
    <div className={`w-full h-[400px] lg:h-[500px] ${className}`}>
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ 
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputEncoding: THREE.sRGBEncoding,
        }}
        dpr={[1, 2]} // Responsive performance optimization
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default HeroScene;
