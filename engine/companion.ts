import * as THREE from "three"

export class CompanionAvatar3D {
  mesh: THREE.Mesh
  mood = 0.5

  constructor(name: string) {
    this.mesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.35, 32, 32),
      new THREE.MeshStandardMaterial({
        color: "#00e5ff",
        emissive: "#00aacc",
        emissiveIntensity: 0.4
      })
    )
    this.mesh.position.set(0, 1.4, 0)
  }

  react(type: "explore" | "rest") {
    this.mood += type === "explore" ? 0.05 : -0.05
  }

  update(dt: number) {
    this.mesh.position.y =
      1.4 + Math.sin(Date.now() / 600) * 0.05
  }
}