"use client";

import React from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import FloatingSpheres from "./_floatingSpheres-components/FloatingSpheres";


const FloatingSpheresCanvas: React.FC = () => {
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
                    position: [0, 0, 2]
                }}
            >
                <OrbitControls />
                <ambientLight intensity={0.5} />
                <directionalLight position={[2, 5, 2]} />

                <FloatingSpheres />
            </Canvas>
        </div>
    );
}

export default FloatingSpheresCanvas;
