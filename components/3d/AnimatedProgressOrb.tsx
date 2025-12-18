'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface AnimatedProgressOrbProps {
  progress: number // 0 to 1
  color: string
  size?: number
}

export function AnimatedProgressOrb({ 
  progress, 
  color, 
  size = 1 
}: AnimatedProgressOrbProps) {
  const orbRef = useRef<THREE.Mesh>(null!)
  const glowRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (orbRef.current) {
      // Idle rotation
      orbRef.current.rotation.y = state.clock.getElapsedTime() * 0.5
      
      // Scale based on progress
      const targetScale = 1 + (progress * 0.5)
      orbRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      )
    }
    
    if (glowRef.current) {
      // Pulsing glow
      const pulse = Math.sin(state.clock.getElapsedTime() * 3) * 0.1 + 0.9
      glowRef.current.scale.setScalar(1.5 * pulse)
    }
  })

  return (
    <group>
      {/* Main orb */}
      <mesh ref={orbRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={progress}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Glow layer */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3 * progress}
        />
      </mesh>

      {/* Point light */}
      <pointLight
        position={[0, 0, 0]}
        intensity={progress * 2}
        color={color}
        distance={5}
      />
    </group>
  )
}