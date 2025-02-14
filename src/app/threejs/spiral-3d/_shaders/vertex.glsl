uniform float uTime;

varying vec2 vUv;
varying float vDepth; // Pass depth to fragment shader


void main() {
    vUv = uv;

    // Convert to polar coordinates
    float radius = length(position.xy);
    float angle = atan(position.y, position.x);

    // Apply a sine wave to create a 3D ripple effect
    float wave = sin(radius * 10.0 - uTime * 2.0) * 0.2; // Adjust amplitude

    // Modify z position
    vec3 newPosition = vec3(position.xy, wave);

    // Store depth for color calculations
    vDepth = wave;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
