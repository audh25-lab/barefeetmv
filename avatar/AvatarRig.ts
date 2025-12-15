import * as THREE from "three"

export class AvatarRig {
  root = new THREE.Group()
  head: THREE.Mesh
  body: THREE.Mesh

  constructor(color = "#ffaa00") {
    this.body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.25, 0.3, 1.2, 16),
      new THREE.MeshStandardMaterial({ color })
    )

    this.head = new THREE.Mesh(
      new THREE.SphereGeometry(0.25, 16, 16),
      new THREE.MeshStandardMaterial({ color, emissive: "#222" })
    )

    this.head.position.y = 0.8
    this.root.add(this.body, this.head)
  }

  animate(emotion: string) {
    this.head.rotation.y = Math.sin(Date.now() * 0.002) * 0.2
    this.root.position.y =
      emotion === "happy" ? Math.sin(Date.now() * 0.004) * 0.1 : 0
  }
}