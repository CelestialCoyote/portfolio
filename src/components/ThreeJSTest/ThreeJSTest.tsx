"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";


function CameraControls() {
    const { camera, gl } = useThree();
    const controlsRef = useRef<OrbitControls | null>(null);

    useEffect(() => {
        controlsRef.current = new OrbitControls(camera, gl.domElement);
        controlsRef.current.enableDamping = true;
        controlsRef.current.dampingFactor = 0.05;
        controlsRef.current.rotateSpeed = 1;
        controlsRef.current.zoomSpeed = 1.2;
        controlsRef.current.panSpeed = 0.8;

        return () => controlsRef.current?.dispose();
    }, [camera, gl]);

    return null;
}

function Earth() {
    // Load textures using Three.js TextureLoader
    const colorMap = useLoader(THREE.TextureLoader, "/images/textures/earth_daymap.jpg");
    const normalMap = useLoader(THREE.TextureLoader, "/images/textures/earth_normalmap.jpg");
    const metalnessMap = useLoader(THREE.TextureLoader, "/images/textures/earth_specularmap.jpg");

    return (
        <mesh>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial
                map={colorMap}
                normalMap={normalMap}
                metalnessMap={metalnessMap}  
                metalness={0.5}  
                roughness={1}
            />
        </mesh>
    );
}

function ThreeBox() {
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
                    position: [3, 2, 6]
                }}
            >
                <ambientLight intensity={0.8} />
                <directionalLight position={[0, 0, 5]} color="white" />
                <CameraControls />
                <Earth />
            </Canvas>
        </div>
    );
}

export default ThreeBox;





// "use client";

// import React from 'react';
// import * as THREE from "three";
// import { Canvas, useLoader } from "@react-three/fiber";


// function Earth() {
//     // Load textures using Three.js TextureLoader
//     const colorMap = useLoader(THREE.TextureLoader, "/images/textures/earth_daymap.jpg");
//     const normalMap = useLoader(THREE.TextureLoader, "/images/textures/earth_normalmap.jpg");
//     const metalnessMap = useLoader(THREE.TextureLoader, "/images/textures/earth_specularmap.jpg");

//     return (
//         <mesh>
//             <sphereGeometry args={[1, 32, 32]} />

//             <meshStandardMaterial
//                 map={colorMap}
//                 normalMap={normalMap}
//                 metalnessMap={metalnessMap}  // Note: Use metalnessMap instead of specularMap for StandardMaterial
//                 metalness={0.5}  // Adjust this value as needed
//                 roughness={1}
//             />
//         </mesh>
//     );
// }


// function ThreeBox() {
//     return (
//         <div className="bg-black w-full h-full border-2 border-red-500">
//             <Canvas
//                 gl={{
//                     antialias: true,
//                     toneMapping: THREE.ACESFilmicToneMapping,
//                     outputColorSpace: THREE.SRGBColorSpace
//                 }}

//                 camera={{
//                     fov: 45,
//                     near: 0.1,
//                     far: 200,
//                     position: [3, 2, 6]
//                 }}
//             >
//                 <ambientLight intensity={0.8} />
//                 <directionalLight position={[0, 0, 5]} color="white" />

//                 <Earth />
//             </Canvas>
//         </div>
//     );
// }

// export default ThreeBox;
