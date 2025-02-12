uniform float uTime;
varying vec2 vUv;

vec3 palette(float t) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.263, 0.416, 0.557);

    return a + b * cos(6.28318 * (c * t + d));
}

void main() {
    // Keep UVs in range (-0.5, 0.5)
    vec2 uv = vUv - 0.5;
    float d = length(uv);

    vec3 color = palette(d + uTime);

    // Create a series of shrinking circles over time
    d = sin(d * 8.0 + uTime) / 8.0;
    d = abs(d);
    d = 0.02 / d;

    color *= d;

    gl_FragColor = vec4(color, 1.0);
}
