'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

interface FloatingOrbProps {
  step: number
  scale?: number
}

export function FloatingOrb({ step, scale = 2 }: FloatingOrbProps) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const ringRef = useRef<THREE.Mesh>(null!)
  
  const colors = ['#00F0FF', '#B24BF3', '#FFB800', '#FF006E']
  const currentColor = colors[step % colors.length]

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
    }
    
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.getElapsedTime() * 0.5
      const pulse = Math.sin(state.clock.getElapsedTime() * 2) * 0.1 + 1
      ringRef.current.scale.setScalar(pulse)
    }
  })

  return (
    <group>
      {/* Main orb */}
      <mesh ref={meshRef} scale={scale}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color={currentColor}
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Outer glow ring */}
      <mesh ref={ringRef} scale={scale}>
        <torusGeometry args={[1.3, 0.02, 16, 100]} />
        <meshBasicMaterial 
          color={currentColor}
          transparent 
          opacity={0.4}
        />
      </mesh>

      {/* Point light */}
      <pointLight
        position={[0, 0, 0]}
        intensity={2}
        color={currentColor}
        distance={8}
      />
    </group>
  )
}