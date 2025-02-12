import * as THREE from "three";


// Helper function to calculate random sphere point with a given radius
export const randomSpherePoint = (radius: number): { pos: THREE.Vector3; temperature: number } => {
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);

    // Scale the position to the desired radius
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    return {
        pos: new THREE.Vector3(x, y, z),
        temperature: 0, // Temperature is set in the main loop
    }
}


// Assign temperature to a star based on spectral class
export const assignTemperature = (): number => {
    const spectralClasses = ["O", "B", "A", "F", "G", "K", "M"];
    const classIndex = Math.floor(Math.random() * spectralClasses.length);
    const spectralClass = spectralClasses[classIndex];

    let temperature: number;

    switch (spectralClass) {
        case "O":
            temperature = Math.random() * (30000 - 30000) + 30000;
            break;
        case "B":
            temperature = Math.random() * (30000 - 10000) + 10000;
            break;
        case "A":
            temperature = Math.random() * (10000 - 7500) + 7500;
            break;
        case "F":
            temperature = Math.random() * (7500 - 6000) + 6000;
            break;
        case "G":
            temperature = Math.random() * (6000 - 5200) + 5200;
            break;
        case "K":
            temperature = Math.random() * (5200 - 3700) + 3700;
            break;
        case "M":
            temperature = Math.random() * (3700 - 2400) + 2400;
            break;
        default:
            temperature = 5000;
            break;
    }

    return temperature;
}


// Convert temperature to RGB color (simplified approximation)
export const temperatureToColor = (temperature: number): THREE.Color => {
    let r: number, g: number, b: number;

    if (temperature >= 10000) {
        r = 1.0;
        g = 1.0;
        b = 1.0;
    } else if (temperature >= 7500) {
        r = 1.0;
        g = 0.9;
        b = 0.9;
    } else if (temperature >= 6000) {
        r = 1.0;
        g = 0.8;
        b = 0.5;
    } else if (temperature >= 5200) {
        r = 1.0;
        g = 0.7;
        b = 0.0;
    } else if (temperature >= 3700) {
        r = 0.9;
        g = 0.6;
        b = 0.1;
    } else {
        r = 0.8;
        g = 0.3;
        b = 0.1;
    }

    return new THREE.Color(r, g, b);
}
