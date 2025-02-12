// import React, { useEffect, useRef } from "react";
import React, { useRef } from "react";
import * as THREE from "three";
// import { useThree } from "@react-three/fiber";


const SunLight: React.FC = () => {
    const sunRef = useRef<THREE.DirectionalLight | null>(null);
    // const { scene } = useThree();

    // useEffect(() => {
    //     if (sunRef.current) {
    //         const helper = new THREE.DirectionalLightHelper(sunRef.current, 5, 0xffff00); // yellow helper

    //         scene.add(helper);

    //         return () => {
    //             scene.remove(helper);
    //         };
    //     }
    // }, [scene]);

    return (
        <directionalLight
            ref={sunRef}
            position={[0, 0, 100]}
            intensity={2}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-near={0.1}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
        />
    );
}

export default SunLight;
