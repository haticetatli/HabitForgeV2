import * as THREE from 'three'

export const camera3DConfig = {
  default: {
    position: [0, 0, 5] as [number, number, number],
    fov: 50,
    near: 0.1,
    far: 1000
  },
  closeup: {
    position: [0, 0, 2] as [number, number, number],
    fov: 60
  },
  orbital: {
    position: [3, 3, 5] as [number, number, number],
    fov: 45
  }
}

export const lighting3DConfig = {
  ambient: {
    intensity: 0.3,
    color: '#ffffff'
  },
  key: {
    position: [10, 10, 10] as [number, number, number],
    intensity: 1,
    color: '#00F0FF',
    angle: 0.15,
    penumbra: 1
  },
  rim: {
    position: [-10, 5, -10] as [number, number, number],
    intensity: 0.5,
    color: '#B24BF3'
  },
  fill: {
    position: [0, -10, 5] as [number, number, number],
    intensity: 0.3,
    color: '#FFB800'
  }
}

export const orbitControlsConfig = {
  enableZoom: false,
  enablePan: false,
  enableRotate: true,
  autoRotate: false,
  autoRotateSpeed: 0.5,
  minPolarAngle: Math.PI / 4,
  maxPolarAngle: (3 * Math.PI) / 4,
  minAzimuthAngle: -Math.PI / 4,
  maxAzimuthAngle: Math.PI / 4
}

export const depthOfFieldConfig = {
  focusDistance: 0,
  focalLength: 0.02,
  bokehScale: 2,
  height: 480
}

export const bloomConfig = {
  intensity: 0.5,
  luminanceThreshold: 0.2,
  luminanceSmoothing: 0.9,
  mipmapBlur: true
}

// Material presets
export const materialPresets = {
  glass: {
    transparent: true,
    opacity: 0.3,
    metalness: 0,
    roughness: 0.1,
    envMapIntensity: 1,
  },
  metal: {
    metalness: 0.9,
    roughness: 0.1,
  },
  neon: {
    emissive: new THREE.Color('#00F0FF'),
    emissiveIntensity: 0.5,
    metalness: 0.8,
    roughness: 0.2,
  }
}