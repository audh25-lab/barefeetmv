import * as THREE from "three"

/* =========================
   LEARNER PROFILE
========================= */

export type LearnerProfileState = {
  age: number
  curiosity: number
  mastery: number
  joy: number
  lastActive: number
}

export class LearnerProfile {
  private key = "barefeetmv:learner"
  state: LearnerProfileState

  constructor() {
    const saved =
      typeof window !== "undefined"
        ? localStorage.getItem(this.key)
        : null

    this.state = saved
      ? JSON.parse(saved)
      : {
          age: 6,
          curiosity: 0.5,
          mastery: 0.1,
          joy: 0.7,
          lastActive: Date.now()
        }
  }

  update(event: "learn" | "play" | "rest" | "explore") {
    if (event === "learn") {
      this.state.mastery += 0.03
      this.state.curiosity += 0.05
    }
    if (event === "play") this.state.joy += 0.05
    if (event === "explore") this.state.curiosity += 0.04

    this.state.lastActive = Date.now()
    localStorage.setItem(this.key, JSON.stringify(this.state))
  }
}

/* =========================
   COMPANION AVATAR
========================= */

export class CompanionAvatar3D {
  mesh: THREE.Mesh
  emotion: "calm" | "happy" | "curious" | "focused" = "calm"

  constructor() {
    const geo = new THREE.SphereGeometry(0.35, 32, 32)
    const mat = new THREE.MeshStandardMaterial({
      color: "#00e5ff",
      emissive: "#004466",
      emissiveIntensity: 0.6
    })
    this.mesh = new THREE.Mesh(geo, mat)
    this.mesh.position.set(0, 1.4, 0)
  }

  react(intent: "explore" | "play" | "rest" | "learn") {
    if (intent === "explore") this.emotion = "curious"
    if (intent === "play") this.emotion = "happy"
    if (intent === "learn") this.emotion = "focused"
    if (intent === "rest") this.emotion = "calm"

    const mat = this.mesh.material as THREE.MeshStandardMaterial
    mat.emissiveIntensity =
      this.emotion === "happy" ? 1 :
      this.emotion === "curious" ? 0.9 :
      this.emotion === "focused" ? 0.8 : 0.4
  }

  update() {
    this.mesh.position.y =
      1.4 + Math.sin(performance.now() * 0.002) * 0.05
  }
}

/* =========================
   MALDIVES OCEAN
========================= */

export class MaldivesOcean {
  mesh: THREE.Mesh
  time = 0

  constructor() {
    const geo = new THREE.PlaneGeometry(80, 80, 256, 256)
    const mat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: `
        uniform float time;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z += sin(p.x * 0.2 + time) * 0.25;
          p.z += cos(p.y * 0.25 + time * 1.3) * 0.25;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p,1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        void main() {
          vec3 shallow = vec3(0.0,0.7,0.8);
          vec3 deep = vec3(0.0,0.3,0.5);
          gl_FragColor = vec4(mix(shallow, deep, vUv.y),1.0);
        }
      `,
      side: THREE.DoubleSide
    })
    this.mesh = new THREE.Mesh(geo, mat)
    this.mesh.rotation.x = -Math.PI / 2
  }

  update(dt: number) {
    this.time += dt
    ;(this.mesh.material as THREE.ShaderMaterial).uniforms.time.value =
      this.time
  }
}

/* =========================
   HISTORY WORLDS
========================= */

function buildRoman(scene: THREE.Scene) {
  const column = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.35, 3, 20),
    new THREE.MeshStandardMaterial({ color: "#e0d8c3" })
  )
  column.position.set(2, 1.5, -3)
  scene.add(column)
}

function buildChina(scene: THREE.Scene) {
  const gate = new THREE.Mesh(
    new THREE.BoxGeometry(2.5, 1.2, 0.4),
    new THREE.MeshStandardMaterial({ color: "#aa3333" })
  )
  gate.position.set(-2, 1.2, -3)
  scene.add(gate)
}

/* =========================
   WORLD ENGINE
========================= */

export class WorldEngine {
  scene = new THREE.Scene()
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer
  clock = new THREE.Clock()

  learner = new LearnerProfile()
  companion = new CompanionAvatar3D()
  ocean = new MaldivesOcean()

  constructor(container: HTMLElement) {
    this.camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    this.camera.position.set(0, 2.2, 6)

    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(this.renderer.domElement)

    this.scene.add(
      new THREE.AmbientLight("#88ccee", 0.6),
      new THREE.DirectionalLight("#ffffff", 1.1)
    )

    this.scene.add(this.ocean.mesh, this.companion.mesh)
    buildRoman(this.scene)
    buildChina(this.scene)

    window.addEventListener("resize", () => {
      this.camera.aspect =
        container.clientWidth / container.clientHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(
        container.clientWidth,
        container.clientHeight
      )
    })

    window.addEventListener("keydown", e => {
      if (e.key === "e") this.handleIntent("explore")
      if (e.key === "p") this.handleIntent("play")
      if (e.key === "l") this.handleIntent("learn")
      if (e.key === "r") this.handleIntent("rest")
    })

    this.animate()
  }

  handleIntent(intent: "explore" | "play" | "learn" | "rest") {
    this.companion.react(intent)
    this.learner.update(intent)
  }

  animate = () => {
    requestAnimationFrame(this.animate)
    const dt = this.clock.getDelta()
    this.ocean.update(dt)
    this.companion.update()
    this.renderer.render(this.scene, this.camera)
  }
}