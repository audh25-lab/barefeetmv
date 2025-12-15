import * as THREE from "three"

/* ============================================================
   VOICE → INTENT ENGINE
============================================================ */

class VoiceIntentEngine {
  recognition: SpeechRecognition | null = null
  onIntent: (i: "explore" | "play" | "rest") => void

  constructor(onIntent: (i: "explore" | "play" | "rest") => void) {
    this.onIntent = onIntent
    if (typeof window !== "undefined") {
      const SR =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition
      if (SR) {
        this.recognition = new SR()
        this.recognition.continuous = true
        this.recognition.onresult = e => {
          const text = e.results[e.results.length - 1][0].transcript.toLowerCase()
          if (text.includes("rest")) this.onIntent("rest")
          else if (text.includes("play")) this.onIntent("play")
          else this.onIntent("explore")
        }
        this.recognition.start()
      }
    }
  }
}

/* ============================================================
   SAVE / LOAD WORLD STATE
============================================================ */

class WorldPersistence {
  key = "barefeetmv:world"

  save(data: any) {
    localStorage.setItem(this.key, JSON.stringify(data))
  }

  load() {
    const raw = localStorage.getItem(this.key)
    return raw ? JSON.parse(raw) : null
  }
}

/* ============================================================
   MULTI-USER SYNC (REAL SOCKET, MINIMAL)
============================================================ */

class MultiplayerSync {
  socket: WebSocket | null = null

  connect(onData: (d: any) => void) {
    this.socket = new WebSocket("wss://example.com/world")
    this.socket.onmessage = e => onData(JSON.parse(e.data))
  }

  send(data: any) {
    this.socket?.send(JSON.stringify(data))
  }
}

/* ============================================================
   AI LESSON GENERATION
============================================================ */

async function generateLesson(topic: string, age: number) {
  const res = await fetch("/api/lesson", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic, age })
  })
  return res.json()
}

/* ============================================================
   (YOUR EXISTING SYSTEMS — UNCHANGED LOGIC)
============================================================ */

/* learner, companion, rig, ocean, city, curriculum */
/* ⬇️ (your pasted code remains exactly the same here) */
/* … omitted for brevity — assumed unchanged … */

/* ============================================================
   WORLD ENGINE (FINAL)
============================================================ */

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

  voice: VoiceIntentEngine
  persistence = new WorldPersistence()
  multiplayer = new MultiplayerSync()

  constructor(container: HTMLElement) {
    this.camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 1000)
    this.camera.position.set(0, 2.2, 6)

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setSize(innerWidth, innerHeight)
    container.appendChild(this.renderer.domElement)

    window.addEventListener("resize", () => {
      this.camera.aspect = innerWidth / innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(innerWidth, innerHeight)
    })

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

    /* VOICE */
    this.voice = new VoiceIntentEngine(i => this.handleIntent(i))

    /* MULTIUSER */
    this.multiplayer.connect(data => {
      if (data.intent) this.handleIntent(data.intent)
    })

    /* RESTORE WORLD */
    const saved = this.persistence.load()
    if (saved) this.learner.state = saved.learner

    this.animate()
  }

  async handleIntent(intent: "explore" | "play" | "rest") {
    this.companion.react(intent)
    this.learner.update(intent === "rest" ? "rest" : "learn")

    const lesson = await generateLesson(
      this.curriculum.update(this.learner.state.mastery),
      this.learner.state.age
    )

    this.persistence.save({ learner: this.learner.state })
    this.multiplayer.send({ intent })

    return lesson
  }

  animate = () => {

    requestAnimationFrame(this.animate)
    const dt = this.clock.getDelta()

    this.ocean.update(dt)
    this.companion.update()
    this.rig.animate(this.companion.emotion)
    this.city.grow(this.learner.state.mastery)
    this.historyScenes.forEach(s => s.update(dt))
    this.renderer.render(this.scene, this.camera)
  }
}