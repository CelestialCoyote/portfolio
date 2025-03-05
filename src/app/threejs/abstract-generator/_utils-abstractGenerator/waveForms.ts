// Define Waveform Types
export const waveTypes = {
    SINE: "sine",
    COSINE: "cosine",
    SQUARE: "square",
    COSQUARE: "cosquare",
    TRIANGLE: "triangle",
    COTRIANGLE: "cotriangle",
    RAMP: "ramp",
    CORAMP: "coramp"
} as const;


/*
 * Generate Different Waveforms
 */
// Define a type alias for a waveform function
type WaveformFunction = (t: number) => number;

// Define the waveforms object with proper types
export const waveforms: Record<string, WaveformFunction> = {
    sine: (t) => Math.sin(t),
    cosine: (t) => Math.cos(t),
    triangle: (t) => 2 * Math.abs(2 * (t / (2 * Math.PI) - Math.floor(t / (2 * Math.PI) + 0.5))) - 1,
    cotriangle: (t) => 1 - 4 * Math.abs(Math.round(t / (2 * Math.PI)) - t / (2 * Math.PI)),
    square: (t) => Math.sign(Math.sin(t)),
    cosquare: (t) => Math.sign(Math.cos(t)),
    ramp: (t) => (t / (2 * Math.PI)) % 1,
    coramp: (t) => 1 - (t / (2 * Math.PI)) % 1,
}
