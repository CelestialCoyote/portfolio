varying vec3 vColor;

attribute vec3 customColor;


void main() {
    vColor = customColor;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}