import * as THREE from "three"

export class MaldivesOcean {
  mesh: THREE.Mesh
  time = 0

  constructor() {
    this.mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(50, 50, 128, 128),
      new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 } },
        vertexShader: `
          uniform float time;
          void main() {
            vec3 p = position;
            p.z += sin(p.x * 0.4 + time) * 0.15;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(p,1.0);
          }
        `,
        fragmentShader: `
          void main() {
            gl_FragColor = vec4(0.0,0.5,0.7,1.0);
          }
        `
      })
    )
    this.mesh.rotation.x = -Math.PI / 2
  }

  update(dt: number) {
    this.time += dt
    ;(this.mesh.material as THREE.ShaderMaterial).uniforms.time.value =
      this.time
  }
}