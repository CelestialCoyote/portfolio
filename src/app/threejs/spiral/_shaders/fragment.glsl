// // fragmentShader.glsl
// uniform sampler2D uTexture;
// varying vec2 vUv;

// void main() {
//     vec3 color = texture2D(uTexture, vUv).rgb;
//     gl_FragColor = vec4(color, 1.0);
// }





uniform float uTime;
varying vec2 vUv;

void main() {
    // Center UV coordinates
    vec2 uv = vUv - 0.5;
    
    // Calculate the distance from the center and angle for swirl
    float dist = length(uv);
    float angle = atan(uv.y, uv.x);
    
    // Add a time-based swirling effect
    angle += uTime * 0.5 - dist * 2.0;
    
    // Use polar coordinates to create a spiral pattern
    float pattern = cos(15.0 * angle + dist * 3.0);

    // Create color based on the pattern, adding depth to the effect
    vec3 color = vec3(0.2, 0.3, 0.8) * (pattern * 0.5 + 0.5);
    color *= 1.0 - dist * 1.2; // Fade color towards the edges

    gl_FragColor = vec4(color, 1.0);
}
