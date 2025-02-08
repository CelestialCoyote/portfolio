"use client";

import React from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import CameraControls from "@/app/threejs/_threejs-components/CameraControls";
import EarthJourney from "./EarthJourney"


const EarthViewCanvas: React.FC = () => {
    return (
        <div className="bg-black w-full h-full">
            <Canvas
                gl={{
                    antialias: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    outputColorSpace: THREE.SRGBColorSpace
                }}
                camera={{
                    fov: 45,
                    near: 0.1,
                    far: 200,
                    position: [12, 5, 6]
                }}
            >
                <ambientLight intensity={0.8} />
                <directionalLight position={[0, 0, 5]} color="white" />
                <CameraControls />
                <EarthJourney />
            </Canvas>
        </div>
    );
}

export default EarthViewCanvas;
