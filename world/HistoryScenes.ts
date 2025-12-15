// world/HistoryScenes.ts
import * as THREE from "three"

export class RomanScene {
  static build(scene: THREE.Scene) {
    const col = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.25, 2),
      new THREE.MeshStandardMaterial({ color: "#e0d8c3" })
    )
    col.position.set(2, 1, -2)
    scene.add(col)
  }
}

export class ChinaScene {
  static build(scene: THREE.Scene) {
    const gate = new THREE.Mesh(
      new THREE.BoxGeometry(2, 1, 0.3),
      new THREE.MeshStandardMaterial({ color: "#aa3333" })
    )
    gate.position.set(-2, 1, -2)
    scene.add(gate)
  }
}