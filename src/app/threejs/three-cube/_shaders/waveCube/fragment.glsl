uniform float uTime;

varying vec2 vUv;


void main() {
    vec3 color = vec3(sin(uTime + vUv.x * 3.14), cos(uTime + vUv.y * 3.14), sin(uTime));

    gl_FragColor = vec4(color, 1.0);
}
