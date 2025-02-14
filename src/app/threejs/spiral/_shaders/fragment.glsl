uniform float uTime;
varying vec2 vUv;

void main() {
    // Center UV coordinates
    vec2 uv = vUv - 0.5;
    
    // Calculate distance from the center and angle for swirl
    float dist = length(uv);
    float angle = atan(uv.y, uv.x);
    
    // Add a time-based swirling effect
    angle += uTime * 0.5 - dist * 2.0;
    
    // Use polar coordinates to create a spiral pattern
    float pattern = cos(15.0 * angle + dist * 3.0);

    // Generate cycling color variation using sine waves
    vec3 color = vec3(
        0.5 + 0.5 * sin(angle + uTime),   // Red
        0.5 + 0.5 * cos(dist * 5.0 - uTime), // Green
        0.5 + 0.5 * sin(dist * 8.0 + uTime)  // Blue
    );

    // Apply pattern to color intensity
    color *= pattern * 0.5 + 0.5;
    color *= 1.0 - dist * 1.2; // Fade towards edges

    gl_FragColor = vec4(color, 1.0);
}




// uniform float uTime;
// varying vec2 vUv;


// void main() {
//     // Center UV coordinates
//     vec2 uv = vUv - 0.5;
    
//     // Calculate the distance from the center and angle for swirl
//     float dist = length(uv);
//     float angle = atan(uv.y, uv.x);
    
//     // Add a time-based swirling effect
//     angle += uTime * 0.5 - dist * 2.0;
    
//     // Use polar coordinates to create a spiral pattern
//     float pattern = cos(15.0 * angle + dist * 3.0);

//     // Create color based on the pattern, adding depth to the effect
//     vec3 color = vec3(0.2, 0.3, 0.8) * (pattern * 0.5 + 0.5);
//     color *= 1.0 - dist * 1.2; // Fade color towards the edges

//     gl_FragColor = vec4(color, 1.0);
// }
