import * as THREE from "three"
import { CompanionAgent } from "./CompanionAgent"
import { loadIsland } from "./IslandWorld"
import { enableXR } from "./XRMode"

export class WorldEngine {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(65, 1, 0.1, 100)
  renderer = new THREE.WebGLRenderer({ antialias: true })
  clock = new THREE.Clock()

  companion!: CompanionAgent

  constructor() {
    this.scene.background = new THREE.Color("#00111a")
    this.camera.position.set(0, 1.6, 3)

    enableXR(this.renderer)
    loadIsland(this.scene, "Baa Atoll")
    this.companion = new CompanionAgent(this.scene)
  }

  mount(dom: HTMLElement) {
    this.renderer.setSize(dom.clientWidth, dom.clientHeight)
    dom.appendChild(this.renderer.domElement)
    this.animate()
  }

  animate = () => {
    requestAnimationFrame(this.animate)
    const t = this.clock.getElapsedTime()
    this.companion.update(t)
    this.renderer.render(this.scene, this.camera)
  }
}