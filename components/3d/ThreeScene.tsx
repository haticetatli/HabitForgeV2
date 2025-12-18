"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import { ReactNode, Suspense } from "react"
import { bloomConfig, lighting3DConfig } from "@/lib/3d-config"

interface ThreeSceneProps {
  children: ReactNode
  camera?: { position: [number, number, number]; fov: number }
  enableControls?: boolean
  bloomIntensity?: number
  className?: string
}

export function ThreeScene({
  children,
  camera = { position: [0, 0, 5], fov: 50 },
  enableControls = true,
  bloomIntensity = 0.5,
  className = "",
}: ThreeSceneProps) {
  return (
    <div className={`h-full w-full ${className}`}>
      <Canvas camera={camera} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        {/* Ambient Light */}
        <ambientLight intensity={lighting3DConfig.ambient.intensity} />

        {/* Key Light */}
        <spotLight
          position={lighting3DConfig.key.position}
          angle={lighting3DConfig.key.angle}
          penumbra={lighting3DConfig.key.penumbra}
          intensity={lighting3DConfig.key.intensity}
          color={lighting3DConfig.key.color}
          castShadow
        />

        {/* Rim Light */}
        <spotLight
          position={lighting3DConfig.rim.position}
          intensity={lighting3DConfig.rim.intensity}
          color={lighting3DConfig.rim.color}
        />

        {/* Fill Light */}
        <pointLight
          position={lighting3DConfig.fill.position}
          intensity={lighting3DConfig.fill.intensity}
          color={lighting3DConfig.fill.color}
        />

        <Suspense fallback={null}>{children}</Suspense>

        {enableControls && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
          />
        )}

        <Environment preset="night" />

        <EffectComposer>
          <Bloom
            luminanceThreshold={bloomConfig.luminanceThreshold}
            luminanceSmoothing={bloomConfig.luminanceSmoothing}
            intensity={bloomIntensity}
            mipmapBlur={bloomConfig.mipmapBlur}
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
