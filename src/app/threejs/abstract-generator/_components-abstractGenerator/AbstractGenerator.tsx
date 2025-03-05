import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { extend, useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { useControls } from "leva";
import { waveTypes, waveforms } from "../_utils-abstractGenerator/waveForms";
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


    const osc1Params = useControls("Oscillator 1", {
        waveX: { value: waveTypes.SINE, options: waveTypes },
        freqX: { value: 10.0, min: 0, max: 100, step: 0.01 },
        waveY: { value: waveTypes.COSINE, options: waveTypes },
        freqY: { value: 5.0, min: 0, max: 100, step: 0.01 },
    })

    const osc2Params = useControls("Oscillator 2", {
        waveX: { value: waveTypes.SINE, options: waveTypes },
        freqX: { value: 1, min: 0, max: 100, step: 0.01 },
        waveY: { value: waveTypes.SINE, options: waveTypes },
        freqY: { value: 1, min: 0, max: 100, step: 0.01 },
    })


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

            const osc1x = waveforms[osc1Params.waveX](osc1Params.freqX * t + time);
            const osc1y = waveforms[osc1Params.waveY](osc1Params.freqY * t + time);

            const osc2x = waveforms[osc2Params.waveX](osc2Params.freqX * t);
            const osc2y = waveforms[osc2Params.waveY](osc2Params.freqY * t);

            positions[i * 3] = osc1x * osc2x;
            positions[i * 3 + 1] = osc1y * osc2y;
        }

        // Mark geometry as needing an update
        meshRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <primitive ref={meshRef} object={new THREE.Line(geometry, material)} />
    );
}

export default AbstractGenerator;
