/* ============================================================
   BAREFEETMV — WORLD ENGINE (FULL INTEGRATED VERSION)
   Next.js 14 • Three.js • Multiplayer • AI Learning Worlds
============================================================ */

import * as THREE from "three"

/* =========================
   LEARNER PROFILE
========================= */

export type LearnerProfileState = {
  age: number
  curiosity: number
  mastery: number
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
      : { age: 6, curiosity: 0.5, mastery: 0.1, lastActive: Date.now() }
  }

  update(type: "learn" | "play" | "rest") {
    if (type === "learn") {
      this.state.curiosity += 0.05
      this.state.mastery += 0.02
    }
    if (type === "play") this.state.curiosity += 0.02
    this.state.lastActive = Date.now()
    localStorage.setItem(this.key, JSON.stringify(this.state))
  }
}

/* =========================
   COMPANION AVATAR (MESH)
========================= */

export class CompanionAvatar3D {
  mesh: THREE.Mesh
  emotion = 0.5

  constructor() {
    const geo = new THREE.SphereGeometry(0.35, 32, 32)
    const mat = new THREE.MeshStandardMaterial({
      color: "#00e5ff",
      emissive: "#0099aa",
      emissiveIntensity: 0.4
    })
    this.mesh = new THREE.Mesh(geo, mat)
    this.mesh.position.set(0, 1.4, 0)
  }

  react(intent: "explore" | "play" | "rest") {
    if (intent === "explore") this.emotion += 0.05
    if (intent === "rest") this.emotion -= 0.05
  }

  update() {
    this.mesh.position.y =
      1.4 + Math.sin(Date.now() * 0.002) * 0.05
    ;(this.mesh.material as THREE.MeshStandardMaterial)
      .emissiveIntensity = 0.3 + this.emotion * 0.4
  }
}

/* =========================
   AVATAR BODY RIG
========================= */

export class AvatarRig {
  root = new THREE.Group()
  head: THREE.Mesh

  constructor() {
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.25, 0.3, 1.2, 16),
      new THREE.MeshStandardMaterial({ color: "#ffaa00" })
    )

    this.head = new THREE.Mesh(
      new THREE.SphereGeometry(0.25, 16, 16),
      new THREE.MeshStandardMaterial({ color: "#ffcc88" })
    )

    this.head.position.y = 0.8
    this.root.add(body, this.head)
  }

  animate(emotion: number) {
    this.head.rotation.y = Math.sin(Date.now() * 0.003) * 0.2
    this.root.position.y = emotion > 0.6 ? Math.sin(Date.now() * 0.004) * 0.1 : 0
  }
}

/* =========================
   MALDIVES OCEAN
========================= */

export class MaldivesOcean {
  mesh: THREE.Mesh
  time = 0

  constructor() {
    const geo = new THREE.PlaneGeometry(50, 50, 128, 128)
    const mat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: `
        uniform float time;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z += sin(p.x * 0.4 + time) * 0.15;
          p.z += cos(p.y * 0.4 + time) * 0.15;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p,1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        void main() {
          vec3 c = mix(vec3(0.0,0.6,0.7), vec3(0.0,0.3,0.5), vUv.y);
          gl_FragColor = vec4(c,1.0);
        }
      `
    })

    this.mesh = new THREE.Mesh(geo, mat)
    this.mesh.rotation.x = -Math.PI / 2
  }

  update(dt: number) {
    this.time += dt
    ;(this.mesh.material as THREE.ShaderMaterial).uniforms.time.value = this.time
  }
}

/* =========================
   PROCEDURAL HISTORY CITY
========================= */

function generateCity(scene: THREE.Scene, style: "roman" | "china") {
  for (let i = 0; i < 30; i++) {
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

/* =========================
   CURRICULUM GRAPH
========================= */

class CurriculumGraph {
  update(mastery: number) {
    return mastery < 0.3 ? "basics" : mastery < 0.6 ? "culture" : "systems"
  }
}

/* =========================
   CITY GROWTH
========================= */

class CityGrowth {
  level = 1
  constructor(private scene: THREE.Scene) {}

  grow(mastery: number) {
    const target = Math.floor(mastery * 10)
    while (this.level < target) {
      const b = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, Math.random() * 3 + 1, 0.8),
        new THREE.MeshStandardMaterial({ color: "#c2b280" })
      )
      b.position.set(
        (Math.random() - 0.5) * 14,
        b.geometry.parameters.height / 2,
        (Math.random() - 0.5) * 14
      )
      this.scene.add(b)
      this.level++
    }
  }
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
  rig = new AvatarRig()
  ocean = new MaldivesOcean()
  curriculum = new CurriculumGraph()
  city: CityGrowth

  constructor(container: HTMLElement) {
    this.camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 1000)
    this.camera.position.set(0, 2.2, 6)

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setSize(innerWidth, innerHeight)
    container.appendChild(this.renderer.domElement)

    this.scene.add(new THREE.AmbientLight("#88ccee", 0.6))
    const sun = new THREE.DirectionalLight("#fff", 1.1)
    sun.position.set(5, 10, 5)
    this.scene.add(sun)

    this.scene.add(this.ocean.mesh)
    this.scene.add(this.companion.mesh)

    this.rig.root.position.set(0, 0.6, 0)
    this.scene.add(this.rig.root)

    generateCity(this.scene, "roman")
    generateCity(this.scene, "china")

    this.city = new CityGrowth(this.scene)

    this.animate()
  }

  handleIntent(intent: "explore" | "play" | "rest") {
    this.companion.react(intent)
    this.learner.update(intent === "rest" ? "rest" : "learn")
  }

  animate = () => {
    requestAnimationFrame(this.animate)
    const dt = this.clock.getDelta()

    this.ocean.update(dt)
    this.companion.update()
    this.rig.animate(this.companion.emotion)
    this.city.grow(this.learner.state.mastery)

    this.renderer.render(this.scene, this.camera)
  }
}