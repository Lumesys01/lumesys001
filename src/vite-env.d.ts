
/// <reference types="vite/client" />

// Ensure Three.js types are properly recognized
/// <reference types="@types/three" />

// Add declarations for Three.js addons
declare module 'three/addons/controls/OrbitControls.js' {
  import { Camera, Object3D } from 'three';
  export class OrbitControls {
    constructor(camera: Camera, domElement?: HTMLElement);
    enableDamping: boolean;
    dampingFactor: number;
    screenSpacePanning: boolean;
    minDistance: number;
    maxDistance: number;
    rotateSpeed: number;
    zoomSpeed: number;
    panSpeed: number;
    enableZoom: boolean;
    enablePan: boolean;
    update(): void;
    dispose(): void;
    target: Object3D;
  }
}

declare module 'three/addons/loaders/GLTFLoader.js' {
  import { Group, Object3D, Scene } from 'three';
  export class GLTFLoader {
    constructor();
    load(
      url: string,
      onLoad?: (gltf: { scene: Group }) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (event: ErrorEvent) => void
    ): void;
  }
}
