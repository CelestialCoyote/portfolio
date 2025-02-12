"use client";

import React from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import KaleidoscopeCube from "./_threecube-components/KaleidoscopeCube";
import VortexCube from "./_threecube-components/VortexCube";
import WaveCube from "./_threecube-components/WaveCube";


const ThreeCubeCanvas: React.FC = () => {
    return (
        <div className="w-full h-full">
            <Canvas
                gl={{
                    antialias: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    outputColorSpace: THREE.SRGBColorSpace
                }}
                camera={{
                    fov: 60,
                    near: 0.1,
                    far: 200,
                    position: [3, 3, 6]
                }}
            >
                <OrbitControls />
                <ambientLight intensity={0.5} />
                <directionalLight position={[2, 5, 2]} />

                <KaleidoscopeCube size={[1.5, 1.5, 1.5]} position={[-3, -2, 0]} />
                <VortexCube size={[1.5, 1.5, 1.5]} position={[0, 0, 0]} />
                <WaveCube size={[1.5, 1.5, 1.5]} position={[3, 2, 0]} />
            </Canvas>
        </div>
    );
}

export default ThreeCubeCanvas;