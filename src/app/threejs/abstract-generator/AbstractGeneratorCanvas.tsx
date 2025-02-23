"use client";

import React from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import AbstractGenerator from "./_components-abstractGenerator/AbstractGenerator";


const OscilloscopeCanvas: React.FC = () => {
    return (
        <div className="w-full h-full">
            <Canvas
                gl={{
                    antialias: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    outputColorSpace: THREE.SRGBColorSpace
                }}
                camera={{
                    fov: 75,
                    near: 0.1,
                    far: 200,
                    position: [0, 0, 2.5]
                }}

            >
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                />
                <ambientLight />
                <pointLight position={[10, 10, 10]} />

                <AbstractGenerator />
            </Canvas>
        </div>
    );
}

export default OscilloscopeCanvas;
