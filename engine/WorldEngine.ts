import * as THREE from "three"

/* =========================
   TYPES
========================= */
type Intent = "explore" | "play" | "rest"

/* =========================
   LEARNER PROFILE
========================= */
export class LearnerProfile {
  state = {
    age: 6,
    curiosity: 0.5,
    mastery: 0.1,
    lastActive: Date.now()
  }

  update(event: "learn" | "play" | "rest") {
    if (event === "learn") {
      this.state.curiosity += 0.05
      this.state.mastery += 0.02
    }
    if (event === "play") this.state.curiosity += 0.02
    this.state.lastActive = Date.now()
  }
}

/* =========================
   COMPANION AVATAR
========================= */
export class CompanionAvatar3D {
  mesh: THREE.Mesh
  emotion = 0.5

  constructor() {
    const geo = new THREE.SphereGeometry(0.35, 32, 32)
    const mat = new THREE.MeshStandardMaterial({
      color: "#00e5ff",
      emissive: "#00aacc",
      emissiveIntensity: 0.4
    })
    this.mesh = new THREE.Mesh(geo, mat)
    this.mesh.position.set(0, 1.4, 0)
  }

  react(intent: Intent) {
    if (intent === "explore") this.emotion += 0.05
    if (intent === "rest") this.emotion -= 0.05
  }

  update() {
    this.mesh.position.y =
      1.4 + Math.sin(Date.now() * 0.002) * 0.05
  }
}

/* =========================
   AVATAR RIG
========================= */
export class AvatarRig {
  root = new THREE.Group()

  animate(emotion: number) {
    this.root.rotation.y =
      Math.sin(Date.now() * 0.001) * emotion * 0.1
  }
}

/* =========================
   OCEAN
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
        void main() {
          vec3 p = position;
          p.z += sin(p.x * 0.4 + time) * 0.15;
          p.z += cos(p.y * 0.4 + time) * 0.15;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p,1.0);
        }
      `,
      fragmentShader: `
        void main() {
          gl_FragColor = vec4(0.0, 0.5, 0.6, 1.0);
        }
      `
    })

    this.mesh = new THREE.Mesh(geo, mat)
    this.mesh.rotation.x = -Math.PI / 2
  }

  update(dt: number) {
    this.time += dt
    ;(this.mesh.material as THREE.ShaderMaterial)
      .uniforms.time.value = this.time
  }
}

/* =========================
   CITY
========================= */
export function generateCity(
  scene: THREE.Scene,
  type: "roman" | "china"
) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({
      color: type === "roman" ? "#e0d8c3" : "#aa3333"
    })
  )
  mesh.position.set(type === "roman" ? 2 : -2, 0.5, -2)
  scene.add(mesh)
}

export class CityGrowth {
  constructor(private scene: THREE.Scene) {}
  grow(level: number) {
    this.scene.scale.setScalar(1 + level * 0.05)
  }
}

/* =========================
   CURRICULUM
========================= */
export class CurriculumGraph {
  update(mastery: number) {
    if (mastery < 0.3) return "Nature"
    if (mastery < 0.6) return "Civilizations"
    return "Philosophy"
  }
}

/* =========================
   VOICE
========================= */
class VoiceIntentEngine {
  recognition: any

  constructor(onIntent: (i: Intent) => void) {
    if (typeof window === "undefined") return

    const SR =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition

    if (!SR) return

    this.recognition = new SR()
    this.recognition.continuous = true
    this.recognition.onresult = (e: any) => {
      const text =
        e.results[e.results.length - 1][0].transcript.toLowerCase()
      if (text.includes("rest")) onIntent("rest")
      else if (text.includes("play")) onIntent("play")
      else onIntent("explore")
    }
    this.recognition.start()
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
  running = true

  learner = new LearnerProfile()
  companion = new CompanionAvatar3D()
  rig = new AvatarRig()
  ocean = new MaldivesOcean()
  curriculum = new CurriculumGraph()
  city: CityGrowth
  voice: VoiceIntentEngine

  constructor(container: HTMLElement) {
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    this.camera.position.set(0, 2.2, 6)

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    container.appendChild(this.renderer.domElement)

    this.scene.add(new THREE.AmbientLight("#88ccee", 0.6))
    const sun = new THREE.DirectionalLight("#fff", 1.1)
    sun.position.set(5, 10, 5)
    this.scene.add(sun)

    this.scene.add(this.ocean.mesh)
    this.scene.add(this.companion.mesh)
    this.scene.add(this.rig.root)

    generateCity(this.scene, "roman")
    generateCity(this.scene, "china")
    this.city = new CityGrowth(this.scene)

    this.voice = new VoiceIntentEngine(i => this.handleIntent(i))
    this.animate()
  }

  handleIntent(intent: Intent) {
    this.companion.react(intent)
    this.learner.update(intent === "rest" ? "rest" : "learn")
  }

  animate = () => {
    if (!this.running) return
    requestAnimationFrame(this.animate)

    const dt = this.clock.getDelta()
    this.ocean.update(dt)
    this.companion.update()
    this.rig.animate(this.companion.emotion)
    this.city.grow(this.learner.state.mastery)

    this.renderer.render(this.scene, this.camera)
  }

  destroy() {
    this.running = false
    this.renderer.dispose()
  }
}