"use client";

import React, { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import CameraControls from "../_threejs-components/CameraControls";
import * as THREE from "three";
import { TextureLoader } from "three";
import { getFresnelMat } from "./_utils/getFresnelMat";


const Earth = () => {
    // Refs for rotation
    const earthRef = useRef<THREE.Mesh>(null);
    const cloudsRef = useRef<THREE.Mesh>(null);
    const lightsRef = useRef<THREE.Mesh>(null);
    const glowRef = useRef<THREE.Mesh>(null);

    // Load textures
    const [colorMap, normalMap, specularMap, cloudsMap, nightmap] = useLoader(TextureLoader, [
        "/images/textures/earth/8k_earth_daymap.jpg",
        "/images/textures/earth/8k_earth_normal_map.jpg",
        "/images/textures/earth/8k_earth_specular_map.jpg",
        "/images/textures/earth/8k_earth_clouds.jpg",
        "/images/textures/earth/8k_earth_nightmap.jpg",
    ]) as [THREE.Texture, THREE.Texture, THREE.Texture, THREE.Texture, THREE.Texture];


    useFrame(() => {
        if (earthRef.current) earthRef.current.rotation.y += 0.001;
        if (lightsRef.current) lightsRef.current.rotation.y += 0.001;
        if (cloudsRef.current) cloudsRef.current.rotation.y += 0.0013;
        if (glowRef.current) glowRef.current.rotation.y += 0.001;
    });

    return (
        <group rotation={[0, 0, -23.4 * (Math.PI / 180)]}>
            {/* Cloud Layer */}
            <mesh ref={cloudsRef} position={[0, 0, 0]}>
                <sphereGeometry args={[1.005, 64, 64]} />
                <meshPhongMaterial
                    map={cloudsMap}
                    opacity={0.4}
                    // alphaMap={cloudsAlpha}
                    depthWrite
                    transparent
                    side={THREE.DoubleSide}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Earth */}
            <mesh ref={earthRef} position={[0, 0, 0]}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshPhongMaterial specularMap={specularMap} />
                <meshStandardMaterial
                    map={colorMap}
                    normalMap={normalMap}
                    metalness={0.4}
                    roughness={0.7}
                    bumpScale={0.04}
                />
            </mesh>

            <mesh ref={lightsRef}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshBasicMaterial
                    map={nightmap}
                    blending={THREE.AdditiveBlending}
                    transparent
                />
            </mesh>

            <mesh ref={glowRef} scale={1.01}>
                <sphereGeometry args={[1, 64, 64]} />
                <shaderMaterial {...getFresnelMat()} />
            </mesh>
        </group>
    );
}

const Scene = () => {
    return (
        <Canvas camera={{ position: [0, 0, 2], fov: 75 }}>
            <ambientLight intensity={0.3} />
            <directionalLight color={'#ffffff'} intensity={2.0} position={[-2, 0.5, 1.5]} />
            <Earth />
            <CameraControls />
        </Canvas>
    );
}

export default Scene;
