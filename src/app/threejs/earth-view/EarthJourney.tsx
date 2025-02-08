"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import earthVertexShader from "./_shaders/earth/vertex.glsl";
import earthFragmentShader from "./_shaders/earth/fragment.glsl";
import atmosphereVertexShader from "./_shaders/atmosphere/vertex.glsl";
import atmosphereFragmentShader from "./_shaders/atmosphere/fragment.glsl";


const EarthJourney: React.FC = () => {
    const earthRef = useRef<THREE.Mesh>(null!);
    const atmosphereRef = useRef<THREE.Mesh>(null!);

    // Load textures
    const [dayTexture, nightTexture, specularCloudsTexture] = useLoader(TextureLoader, [
        "/images/textures/earth/8k_earth_daymap.jpg",
        "/images/textures/earth/8k_earth_nightmap.jpg",
        "/images/textures/earth/8k_earth_clouds.jpg",
    ]);

    // Set texture properties
    dayTexture.colorSpace = THREE.SRGBColorSpace;
    nightTexture.colorSpace = THREE.SRGBColorSpace;
    specularCloudsTexture.anisotropy = 8;

    // Memoized uniforms
    const uniforms = useMemo(
        () => ({
            uDayTexture: { value: dayTexture },
            uNightTexture: { value: nightTexture },
            uSpecularCloudsTexture: { value: specularCloudsTexture },
            uSunDirection: { value: new THREE.Vector3(0, 0, 1) },
            uAtmosphereDayColor: { value: new THREE.Color("#00aaff") },
            uAtmosphereTwilightColor: { value: new THREE.Color("#ff6600") }
        }),
        [dayTexture, nightTexture, specularCloudsTexture]
    );

    // Rotate the Earth
    useFrame(({ clock }) => {
        if (earthRef.current) {
            earthRef.current.rotation.y = clock.getElapsedTime() * 0.1;
        }
    });

    return (
        <>
            {/* Earth */}
            <mesh ref={earthRef}>
                <sphereGeometry args={[2, 64, 64]} />
                <shaderMaterial
                    vertexShader={earthVertexShader}
                    fragmentShader={earthFragmentShader}
                    uniforms={uniforms}
                />
            </mesh>

            {/* Atmosphere */}
            <mesh ref={atmosphereRef} scale={1.04}>
                <sphereGeometry args={[2, 64, 64]} />
                <shaderMaterial
                    vertexShader={atmosphereVertexShader}
                    fragmentShader={atmosphereFragmentShader}
                    uniforms={uniforms}
                    side={THREE.BackSide}
                    transparent
                />
            </mesh>
        </>
    );
}

export default EarthJourney;
