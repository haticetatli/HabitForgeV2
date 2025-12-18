'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function LightStreakBackground() {
  const streaksRef = useRef<THREE.Group>(null!)
  
  const streaks = Array.from({ length: 20 }, (_, i) => ({
    position: [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      -10 - Math.random() * 5
    ] as [number, number, number],
    rotation: Math.random() * Math.PI,
    speed: 0.5 + Math.random() * 1,
    color: i % 2 === 0 ? '#00F0FF' : '#B24BF3'
  }))

  useFrame(() => {
    if (streaksRef.current) {
      streaksRef.current.children.forEach((streak, i) => {
        streak.position.z += streaks[i].speed * 0.05
        if (streak.position.z > 5) {
          streak.position.z = -15
        }
      })
    }
  })

  return (
    <group ref={streaksRef}>
      {streaks.map((streak, i) => (
        <mesh 
          key={i} 
          position={streak.position} 
          rotation={[0, 0, streak.rotation]}
        >
          <planeGeometry args={[0.1, 4]} />
          <meshBasicMaterial
            color={streak.color}
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  )
}