
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PresentationControls, Environment, ContactShadows } from '@react-three/drei';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Gift, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import * as THREE from 'three';

// Define proper types for the GiftBoxModel props
interface GiftBoxModelProps {
  onClick?: () => void;
  hovered?: boolean;
  position?: [number, number, number];
  scale?: [number, number, number];
}

// Simple gift box model created with Three.js primitives
function GiftBoxModel({ onClick, hovered, position, scale }: GiftBoxModelProps) {
  // Properly type the refs with THREE.Mesh
  const boxRef = useRef<THREE.Mesh>(null);
  const lidRef = useRef<THREE.Mesh>(null);
  const ribbonRef = useRef<THREE.Group>(null);
  
  // Animate on hover and continuously
  useFrame((state) => {
    if (boxRef.current && lidRef.current && ribbonRef.current) {
      // Floating animation
      const t = state.clock.getElapsedTime();
      boxRef.current.position.y = Math.sin(t) * 0.05;
      lidRef.current.position.y = Math.sin(t) * 0.05 + 0.25;
      ribbonRef.current.position.y = Math.sin(t) * 0.05;
      
      // Hover effect
      if (hovered) {
        boxRef.current.rotation.y = THREE.MathUtils.lerp(boxRef.current.rotation.y, Math.PI * 0.05, 0.1);
        boxRef.current.rotation.x = THREE.MathUtils.lerp(boxRef.current.rotation.x, Math.PI * 0.05, 0.1);
        lidRef.current.rotation.y = THREE.MathUtils.lerp(lidRef.current.rotation.y, Math.PI * 0.05, 0.1);
        lidRef.current.rotation.x = THREE.MathUtils.lerp(lidRef.current.rotation.x, Math.PI * 0.05, 0.1);
        ribbonRef.current.rotation.y = THREE.MathUtils.lerp(ribbonRef.current.rotation.y, Math.PI * 0.05, 0.1);
        ribbonRef.current.rotation.x = THREE.MathUtils.lerp(ribbonRef.current.rotation.x, Math.PI * 0.05, 0.1);
      } else {
        boxRef.current.rotation.y = THREE.MathUtils.lerp(boxRef.current.rotation.y, 0, 0.1);
        boxRef.current.rotation.x = THREE.MathUtils.lerp(boxRef.current.rotation.x, 0, 0.1);
        lidRef.current.rotation.y = THREE.MathUtils.lerp(lidRef.current.rotation.y, 0, 0.1);
        lidRef.current.rotation.x = THREE.MathUtils.lerp(lidRef.current.rotation.x, 0, 0.1);
        ribbonRef.current.rotation.y = THREE.MathUtils.lerp(ribbonRef.current.rotation.y, 0, 0.1);
        ribbonRef.current.rotation.x = THREE.MathUtils.lerp(ribbonRef.current.rotation.x, 0, 0.1);
      }
    }
  });

  return (
    <group position={position} scale={scale} onClick={onClick}>
      {/* Box base */}
      <mesh ref={boxRef} castShadow receiveShadow>
        <boxGeometry args={[1, 0.5, 1]} />
        <meshStandardMaterial 
          color="#051937" 
          metalness={0.8} 
          roughness={0.2}
          emissive="#004d7a"
          emissiveIntensity={0.4}
        />
      </mesh>
      
      {/* Box lid */}
      <mesh ref={lidRef} position={[0, 0.25, 0]} castShadow>
        <boxGeometry args={[1.1, 0.1, 1.1]} />
        <meshStandardMaterial 
          color="#004d7a" 
          metalness={0.9} 
          roughness={0.1}
          emissive="#00bf72"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Ribbon */}
      <group ref={ribbonRef}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.1, 0.6, 0.1]} />
          <meshStandardMaterial 
            color="#A8EB12" 
            metalness={0.7} 
            roughness={0.3}
            emissive="#A8EB12"
            emissiveIntensity={0.6}
          />
        </mesh>
        <mesh position={[0, 0, 0]} castShadow rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[0.1, 0.6, 0.1]} />
          <meshStandardMaterial 
            color="#A8EB12" 
            metalness={0.7} 
            roughness={0.3}
            emissive="#A8EB12"
            emissiveIntensity={0.6}
          />
        </mesh>
      </group>
    </group>
  );
}

export const GiftBox3D: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API call
    setTimeout(() => {
      setOpen(false);
      setEmail('');
      
      toast({
        title: "You've joined the waitlist!",
        description: "We'll be in touch soon with exclusive updates.",
        variant: "default",
      });
    }, 1000);
  };

  return (
    <>
      <div 
        className="h-[300px] w-[300px] mx-auto cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setOpen(true)}
      >
        <Canvas shadows camera={{ position: [0, 0, 4], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <PresentationControls
            global
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
          >
            <GiftBoxModel 
              hovered={hovered} 
              position={[0, 0, 0]}
              scale={[0.6, 0.6, 0.6]}
              onClick={() => setOpen(true)}
            />
          </PresentationControls>
          <ContactShadows position={[0, -1, 0]} opacity={0.4} scale={5} blur={2.4} />
          <Environment preset="city" />
        </Canvas>
        <div className="text-center mt-4">
          <p className="text-lg font-medium text-white/80">Click to unwrap the future</p>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md glass-card border-none">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">
              <span className="gradient-text font-medium">Unlock the Future of Energy</span>
            </DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center py-4">
            <Gift className="h-16 w-16 text-accent animate-float" />
          </div>
          <p className="text-center text-white/80 mb-6">
            Enter your email to step inside and experience the next generation of energy optimization.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-background/50 border-input/50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="glow-button text-primary">
                <span>Join</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GiftBox3D;
