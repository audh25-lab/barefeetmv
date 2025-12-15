import * as THREE from "three"

export class WorldEngine {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000)
  renderer = new THREE.WebGLRenderer({ antialias: true })
  clock = new THREE.Clock()

  constructor() {
    this.camera.position.set(0, 1.6, 4)
    this.scene.background = new THREE.Color("#00111a")
  }

  mount(dom: HTMLElement) {
    this.renderer.setSize(dom.clientWidth, dom.clientHeight)
    dom.appendChild(this.renderer.domElement)
    this.animate()
  }

  animate = () => {
    requestAnimationFrame(this.animate)
    const dt = this.clock.getDelta()
    this.update(dt)
    this.renderer.render(this.scene, this.camera)
  }

  update(dt: number) {
    // world ticks live here
  }
}