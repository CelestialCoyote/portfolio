import React, { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import vertexShader from "../_shaders/vertex.glsl";
import fragmentShader from "../_shaders/fragment.glsl";


const Spiral3D: React.FC = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const shaderMaterial = useRef<THREE.ShaderMaterial | null>(null);

    // Initialize shader material only once
    useEffect(() => {
        shaderMaterial.current = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uTime: { value: 0.0 },
                uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            },
            side: THREE.DoubleSide,
            wireframe: false,
        });

        return () => {
            if (shaderMaterial.current) shaderMaterial.current.dispose();
        };
    }, []);

    // Update shader uniforms every frame
    useFrame(({ clock }) => {
        if (shaderMaterial.current) {
            shaderMaterial.current.uniforms.uTime.value = clock.getElapsedTime();
        }
    });

    // Create geometry only once
    const geometry = useMemo(() => {
        const numRings = 50;
        const numSegments = 100;
        const positions = [];

        for (let i = 0; i < numRings; i++) {
            const radius = (i / numRings) * 1.0;
            for (let j = 0; j < numSegments; j++) {
                const angle = (j / numSegments) * Math.PI * 2;
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);
                const z = 0; // Will be modified in shader
                positions.push(x, y, z);
            }
        }

        const geom = new THREE.BufferGeometry();
        geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
        return geom;
    }, []);

    return (
        <mesh ref={meshRef} geometry={geometry} material={shaderMaterial.current ?? undefined} />
    );
}

export default Spiral3D;
