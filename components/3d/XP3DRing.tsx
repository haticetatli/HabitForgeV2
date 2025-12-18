'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import { useSpring } from '@react-spring/three'

interface XP3DRingProps {
  level: number;
  xpToNext: number;
  xp: number; // Eksik olan bu prop eklendi
}

export function XP3DRing({ level, xpToNext, xp }: XP3DRingProps) {
  const ringRef = useRef<THREE.Mesh>(null!)
  const glowRef = useRef<THREE.Mesh>(null!)
  
  // Progress'i burada hesaplıyoruz
  const progress = Math.min(Math.max(xp / xpToNext, 0), 1);

  // Animated progress
  const { animatedProgress } = useSpring({
    animatedProgress: progress,
    config: { tension: 120, friction: 14 }
  })

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.getElapsedTime() * 0.2
    }
    
    if (glowRef.current) {
      const pulse = Math.sin(state.clock.getElapsedTime() * 2) * 0.2 + 0.8
      glowRef.current.scale.setScalar(pulse)
    }
  })

  return (
    <group>
      {/* Background ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.1, 16, 100]} />
        <meshStandardMaterial color="#252B47" roughness={0.8} />
      </mesh>

      {/* Progress ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.12, 16, 100, progress * Math.PI * 2]} />
        <meshStandardMaterial
          color="#00F0FF"
          emissive="#00F0FF"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Glow effect */}
      <mesh ref={glowRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.2, 16, 100, progress * Math.PI * 2]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.3} />
      </mesh>

      {/* Level text */}
      <Text
        position={[0, 0, 0]}
        fontSize={0.8}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {level}
      </Text>

      {/* Light */}
      <pointLight position={[0, 0, 2]} intensity={progress * 2} color="#00F0FF" distance={5} />
    </group>
  )
}