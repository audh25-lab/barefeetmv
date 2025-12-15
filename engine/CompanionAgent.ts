import * as THREE from "three"
import { CompanionAvatar } from "@/xr/CompanionAvatar"
import { worldState } from "./WorldState"

export class CompanionAgent {
  avatar = new CompanionAvatar("Luma", "light")
  mesh: THREE.Mesh

  constructor(scene: THREE.Scene) {
    this.mesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.3, 32, 32),
      new THREE.MeshStandardMaterial({ color: "#00e5ff", emissive: "#00e5ff" })
    )
    this.mesh.position.set(0, 1.5, -1.5)
    scene.add(this.mesh)

    worldState.remember(this.avatar.appear())
  }

  guide(topic: string) {
    worldState.remember(this.avatar.guide(topic))
  }

  update(t: number) {
    this.mesh.position.y = 1.5 + Math.sin(t) * 0.1
  }
}