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

// Create a TypeScript type for waveTypes
export type WaveType = typeof waveTypes[keyof typeof waveTypes];

/*
 * Generate Different Waveforms
 */
export function getWaveForm(
    type: WaveType, 
    x: number, 
    frequency: number, 
    amplitude: number, 
    time: number
): number {
    const t = x * frequency + time;

    switch (type) {
        case waveTypes.SINE:
            return amplitude * Math.sin(t * Math.PI);
        case waveTypes.COSINE:
            return amplitude * Math.cos(t * Math.PI);
        case waveTypes.SQUARE:
            return amplitude * (Math.sin(t * Math.PI) >= 0 ? 1 : -1);
        case waveTypes.COSQUARE:
            return amplitude * (Math.cos(t * Math.PI) >= 0 ? 1 : -1);
        case waveTypes.TRIANGLE:
            return amplitude * (2 / Math.PI) * Math.asin(Math.sin(t * Math.PI));
        case waveTypes.COTRIANGLE:
            return amplitude * (2 / Math.PI) * Math.asin(Math.cos(t * Math.PI));
        case waveTypes.RAMP:
            return amplitude * (2 * (t - Math.floor(t + 0.5)));
        case waveTypes.CORAMP:
            return -amplitude * (2 * (t - Math.floor(t + 0.5)));
        default:
            return 0;
    }
}
