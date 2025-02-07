"use client";

import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";


const PlanetEarth: React.FC = () => {
    // Load textures
    const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(TextureLoader, [
        "/images/textures/earth/8k_earth_daymap.jpg",
        "/images/textures/earth/8k_earth_normal_map.jpg",
        "/images/textures/earth/8k_earth_specular_map.jpg",
        "/images/textures/earth/8k_earth_clouds.jpg",
    ]) as [THREE.Texture, THREE.Texture, THREE.Texture, THREE.Texture];

    // Refs for rotation
    const earthRef = useRef<THREE.Mesh>(null);
    const cloudsRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();
        if (earthRef.current) earthRef.current.rotation.y = elapsedTime / 6;
        if (cloudsRef.current) cloudsRef.current.rotation.y = elapsedTime / 6;
    });

    return (
        <>
            <pointLight color="#f6f3ea" position={[2, 0, 5]} intensity={1.2} />

            {/* Cloud Layer */}
            <mesh ref={cloudsRef} position={[0, 0, 0]}>
                <sphereGeometry args={[1.005, 32, 32]} />
                <meshPhongMaterial
                    map={cloudsMap}
                    opacity={0.4}
                    depthWrite
                    transparent
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Earth */}
            <mesh ref={earthRef} position={[0, 0, 0]}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshPhongMaterial specularMap={specularMap} />
                <meshStandardMaterial
                    map={colorMap}
                    normalMap={normalMap}
                    metalness={0.4}
                    roughness={0.7}
                />
            </mesh>
        </>
    );
}

export default PlanetEarth;
