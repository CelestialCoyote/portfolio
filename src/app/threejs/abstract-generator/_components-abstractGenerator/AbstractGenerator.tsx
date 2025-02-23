import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { extend, useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { useControls } from "leva";
import { waveTypes, getWaveForm } from "../_utils-abstractGenerator/waveForms";
import vertexShader from "../_shaders/vertex.glsl";
import fragmentShader from "../_shaders/fragment.glsl";


// Define shader material
const LineShaderMaterial = shaderMaterial(
    {
        opacity: 1.0,
        color: new THREE.Vector3(1, 1, 1),
    },
    vertexShader,
    fragmentShader
);
extend({ LineShaderMaterial });

const AbstractGenerator: React.FC = () => {
    const meshRef = useRef<THREE.Line>(null);
    const numPoints = 4096;


    // Leva GUI Controls
    const paramsOscillator1 = useControls("Oscillator 1", {
        waveX: { value: waveTypes.SINE, options: waveTypes },
        freqX: { value: 10.1, min: 0, max: 50, step: 0.1 },
        amplitudeX: { value: 1.0, min: 0, max: 5, step: 0.1 },
        waveY: { value: waveTypes.COSINE, options: waveTypes },
        freqY: { value: 5.0, min: 0, max: 50, step: 0.1 },
        amplitudeY: { value: 1.0, min: 0, max: 5, step: 0.1 },
    });

    const paramsOscillator2 = useControls("Oscillator 2", {
        waveX: { value: waveTypes.TRIANGLE, options: waveTypes },
        freqX: { value: 0.0, min: 0, max: 50, step: 0.1 },
        amplitudeX: { value: 0.0, min: 0, max: 5, step: 0.1 },
        waveY: { value: waveTypes.SINE, options: waveTypes },
        freqY: { value: 0.0, min: 0, max: 50, step: 0.1 },
        amplitudeY: { value: 0.0, min: 0, max: 5, step: 0.1 },
    });

    // Generate Geometry Data
    const { positions, colors } = useMemo(() => {
        const positions = new Float32Array(numPoints * 3);
        const colors = new Float32Array(numPoints * 3);

        for (let i = 0; i < numPoints; i++) {
            const t = (i / numPoints) * 4 - 2; // Normalize X from -2 to 2

            positions[i * 3] = t; // X values evenly spaced
            positions[i * 3 + 1] = 0; // Y value
            positions[i * 3 + 2] = 0; // Z remains 0

            colors[i * 3] = (Math.sin(t) + 1) / 2; // R
            colors[i * 3 + 1] = (Math.cos(t) + 1) / 2; // G
            colors[i * 3 + 2] = 1.0; // B
        }

        return { positions, colors };
    }, []);

    // Create Geometry
    const geometry = useMemo(() => {
        const geom = new THREE.BufferGeometry();
        geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geom.setAttribute("customColor", new THREE.BufferAttribute(colors, 3));
        return geom;
    }, [positions, colors]);

    // Shader Material
    const material = useMemo(
        () =>
            new THREE.ShaderMaterial({
                uniforms: {
                    opacity: { value: 1.0 },
                    color: { value: new THREE.Vector3(1, 1, 1) },
                },
                vertexShader,
                fragmentShader,
                transparent: true,
            }),
        []
    );

    // Animate wave
    useFrame(({ clock }) => {
        if (!meshRef.current) return;

        const time = clock.getElapsedTime();
        const positions = meshRef.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < numPoints; i++) {
            const t = (i / numPoints) * Math.PI * 2;

            let xWave = getWaveForm(paramsOscillator1.waveX, t, paramsOscillator1.freqX, paramsOscillator1.amplitudeX, time);
            let yWave = getWaveForm(paramsOscillator1.waveY, t, paramsOscillator1.freqY, paramsOscillator1.amplitudeY, time);

            if (paramsOscillator2.amplitudeX > 0) {
                xWave *= getWaveForm(paramsOscillator2.waveX, t, paramsOscillator2.freqX, paramsOscillator2.amplitudeX, time);
            }
            if (paramsOscillator2.amplitudeY > 0) {
                yWave *= getWaveForm(paramsOscillator2.waveY, t, paramsOscillator2.freqY, paramsOscillator2.amplitudeY, time);
            }

            positions[i * 3] = xWave;
            positions[i * 3 + 1] = yWave;
        }

        // Mark geometry as needing an update
        meshRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <primitive ref={meshRef} object={new THREE.Line(geometry, material)} />
        // <line ref={meshRef} geometry={geometry} material={material} />
    );
}

export default AbstractGenerator;
