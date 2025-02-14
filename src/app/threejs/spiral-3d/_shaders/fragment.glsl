varying vec2 vUv;
varying float vDepth;


void main() {
    // Base color
    vec3 baseColor = vec3(0.2, 0.3, 0.8);

    // Use depth to change color
    float depthFactor = (vDepth + 0.2) * 2.0; // Normalize depth influence
    vec3 color = mix(baseColor, vec3(1.0, 0.5, 0.2), depthFactor); // Color shift

    gl_FragColor = vec4(color, 1.0);
}