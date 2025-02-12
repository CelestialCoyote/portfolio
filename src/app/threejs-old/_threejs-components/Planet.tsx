"use client";

import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";


interface PlanetProps {
    size?: number;
    position?: [number, number, number];
    rotationSpeed?: number;
    textures: {
        color: string;
        normal?: string;
        specular?: string;
        clouds?: string;
    };
}

const Planet: React.FC<PlanetProps> = ({
    size = 1,
    position = [0, 0, 0],
    rotationSpeed = 6,
    textures,
}) => {
    // Load textures dynamically
    const texturePaths = [textures.color, textures.normal, textures.specular, textures.clouds].filter(Boolean) as string[];
    const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(TextureLoader, texturePaths) as THREE.Texture[];

    // Refs for rotation
    const planetRef = useRef<THREE.Mesh>(null);
    const cloudsRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();
        if (planetRef.current) planetRef.current.rotation.y = elapsedTime / rotationSpeed;
        if (cloudsRef.current) cloudsRef.current.rotation.y = elapsedTime / rotationSpeed;
    });

    return (
        <>
            <pointLight color="#f6f3ea" position={[2, 0, 5]} intensity={1.2} />

            {/* Clouds (optional) */}
            {cloudsMap && (
                <mesh ref={cloudsRef} position={position}>
                    <sphereGeometry args={[size * 1.005, 32, 32]} />
                    <meshPhongMaterial
                        map={cloudsMap}
                        opacity={0.4}
                        depthWrite
                        transparent
                        side={THREE.DoubleSide}
                    />
                </mesh>
            )}

            {/* Planet */}
            <mesh ref={planetRef} position={position}>
                <sphereGeometry args={[size, 32, 32]} />
                {specularMap && <meshPhongMaterial specularMap={specularMap} />}
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

export default Planet;
