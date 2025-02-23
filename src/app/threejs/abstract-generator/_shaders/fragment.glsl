varying vec3 vColor;

uniform float opacity;


void main() {
    gl_FragColor = vec4(vColor, opacity);
}