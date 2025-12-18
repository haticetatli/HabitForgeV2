'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface StreakFlameProps {
  streak: number
}

export function StreakFlame({ streak }: StreakFlameProps) {
  const flameRef = useRef<THREE.Group>(null!)
  
  const getFlameIntensity = (streak: number): number => {
    if (streak === 0) return 0
    if (streak < 7) return 0.3
    if (streak < 30) return 0.6
    if (streak < 100) return 0.8
    return 1.0
  }
  
  const getFlameColor = (streak: number): string => {
    if (streak < 7) return '#FF8800'
    if (streak < 30) return '#FF4D00'
    if (streak < 100) return '#FF0000'
    return '#FF00FF' // Legendary purple flame
  }
  
  const intensity = getFlameIntensity(streak)
  const color = getFlameColor(streak)
  
  useFrame((state) => {
    if (flameRef.current && intensity > 0) {
      // Flicker animation
      const flicker = Math.sin(state.clock.getElapsedTime() * 10) * 0.1 + 0.9
      flameRef.current.scale.y = intensity * flicker
      
      // Slight rotation wobble
      flameRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 5) * 0.1
    }
  })
  
  if (intensity === 0) return null
  
  return (
    <group ref={flameRef}>
      {/* Main flame cone */}
      <mesh position={[0, 0.5, 0]}>
        <coneGeometry args={[0.3, 1, 8]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={intensity}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Inner bright core */}
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={intensity * 0.5}
        />
      </mesh>
      
      {/* Outer glow */}
      <mesh position={[0, 0.5, 0]}>
        <coneGeometry args={[0.4, 1.2, 8]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={intensity * 0.3}
        />
      </mesh>
      
      {/* Point light for scene illumination */}
      <pointLight
        position={[0, 0.5, 0]}
        intensity={intensity * 2}
        color={color}
        distance={3}
      />
    </group>
  )
}