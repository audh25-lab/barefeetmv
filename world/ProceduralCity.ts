import * as THREE from "three"

export function generateCity(
  scene: THREE.Scene,
  style: "roman" | "china"
) {
  for (let i = 0; i < 25; i++) {
    const geo =
      style === "roman"
        ? new THREE.BoxGeometry(1, Math.random() * 2 + 1, 1)
        : new THREE.CylinderGeometry(0.4, 0.6, Math.random() * 2 + 1, 8)

    const mat = new THREE.MeshStandardMaterial({
      color: style === "roman" ? "#d8cfc0" : "#aa3333"
    })

    const b = new THREE.Mesh(geo, mat)
    b.position.set(
      (Math.random() - 0.5) * 12,
      geo.parameters.height / 2,
      (Math.random() - 0.5) * 12
    )
    scene.add(b)
  }
}