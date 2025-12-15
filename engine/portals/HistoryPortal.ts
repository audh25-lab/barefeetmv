import * as THREE from "three"

export class HistoryPortal {
  mesh: THREE.Mesh
  active = false

  constructor(public targetScene: "roman" | "china") {
    const geo = new THREE.RingGeometry(0.6, 0.8, 32)
    const mat = new THREE.MeshStandardMaterial({
      color: "#ffd700",
      emissive: "#ffaa00",
      emissiveIntensity: 1
    })

    this.mesh = new THREE.Mesh(geo, mat)
    this.mesh.position.set(0, 1.4, -2)
  }

  activate() {
    this.active = true
    ;(this.mesh.material as THREE.MeshStandardMaterial)
      .emissiveIntensity = 2
  }

  update(dt: number) {
    this.mesh.rotation.z += dt
  }
}