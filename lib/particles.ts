import * as THREE from 'three'

export interface ParticleConfig {
  count: number
  colors: string[]
  velocity: number
  lifetime?: number
  gravity?: number
}

class Particle {
  position: THREE.Vector3
  velocity: THREE.Vector3
  color: string
  lifetime: number
  age: number
  gravity: number
  mesh: THREE.Mesh

  constructor(config: {
    position: THREE.Vector3
    velocity: THREE.Vector3
    color: string
    lifetime: number
    gravity: number
  }) {
    this.position = config.position
    this.velocity = config.velocity
    this.color = config.color
    this.lifetime = config.lifetime
    this.age = 0
    this.gravity = config.gravity

    // Create mesh
    const geometry = new THREE.SphereGeometry(0.05, 8, 8)
    const material = new THREE.MeshBasicMaterial({ 
      color: this.color,
      transparent: true 
    })
    this.mesh = new THREE.Mesh(geometry, material)
    this.mesh.position.copy(this.position)
  }

  update(deltaTime: number) {
    this.age += deltaTime
    this.velocity.y += this.gravity * deltaTime
    this.position.add(this.velocity.clone().multiplyScalar(deltaTime))
    this.mesh.position.copy(this.position)

    // Fade out
    const opacity = 1 - (this.age / this.lifetime)
    ;(this.mesh.material as THREE.MeshBasicMaterial).opacity = opacity
  }

  isAlive(): boolean {
    return this.age < this.lifetime
  }

  render(scene: THREE.Scene) {
    scene.add(this.mesh)
  }

  dispose(scene: THREE.Scene) {
    scene.remove(this.mesh)
    this.mesh.geometry.dispose()
    ;(this.mesh.material as THREE.Material).dispose()
  }
}

export class ParticleSystem {
  private particles: Particle[] = []

  emit(origin: THREE.Vector3, config: ParticleConfig) {
    for (let i = 0; i < config.count; i++) {
      const particle = new Particle({
        position: origin.clone(),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * config.velocity,
          Math.random() * config.velocity,
          (Math.random() - 0.5) * config.velocity
        ),
        color: config.colors[Math.floor(Math.random() * config.colors.length)],
        lifetime: config.lifetime || 1000,
        gravity: config.gravity || -0.01
      })
      this.particles.push(particle)
    }
  }

  update(deltaTime: number, scene: THREE.Scene) {
    this.particles = this.particles.filter(p => {
      p.update(deltaTime / 1000) // Convert to seconds
      if (!p.isAlive()) {
        p.dispose(scene)
        return false
      }
      return true
    })
  }

  render(scene: THREE.Scene) {
    this.particles.forEach(p => p.render(scene))
  }

  clear(scene: THREE.Scene) {
    this.particles.forEach(p => p.dispose(scene))
    this.particles = []
  }
}

// Preset konfigürasyonlar
export const particlePresets = {
  habitCompletion: {
    count: 30,
    colors: ['#00F0FF', '#B24BF3'],
    velocity: 3,
    lifetime: 1500
  },
  xpGain: {
    count: 15,
    colors: ['#FFB800', '#FFE66D'],
    velocity: 2,
    lifetime: 2000,
    gravity: 0.02
  },
  rewardUnlock: {
    count: 100,
    colors: ['#00F0FF', '#B24BF3', '#FF006E', '#FFB800'],
    velocity: 5,
    lifetime: 3000
  },
  levelUp: {
    count: 200,
    colors: ['#FFB800', '#00F0FF', '#B24BF3'],
    velocity: 4,
    lifetime: 2500,
    gravity: -0.005
  }
}