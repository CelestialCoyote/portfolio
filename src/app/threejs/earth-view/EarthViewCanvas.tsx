"use client";

import React from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import SunLight from "./_earthview-components/SunLight";
import Starfield from "./_earthview-components/StarField";
import EarthWithAtmosphere from "./_earthview-components/EarthWithAtmosphere";


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
                    far: 1000,
                    position: [0, 0, 30]
                }}
            >
                <OrbitControls />

                {/* Ambient light for overall brightness */}
                <ambientLight intensity={0.1} />

                {/* Directional Light simulating the Sun */}
                <SunLight />

                <Starfield numStars={1000} />
                
                <EarthWithAtmosphere />
            </Canvas>
        </div>
    );
}

export default EarthViewCanvas;
