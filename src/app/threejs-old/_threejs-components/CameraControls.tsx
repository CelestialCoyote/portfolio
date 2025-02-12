"use client";

import { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";


const CameraControls: React.FC = () => {
    const { camera, gl } = useThree();
    const controlsRef = useRef<OrbitControls | null>(null);

    useEffect(() => {
        // Ensure controls are initialized only once
        controlsRef.current = new OrbitControls(camera, gl.domElement);
        controlsRef.current.enableDamping = true;
        controlsRef.current.dampingFactor = 0.05;
        controlsRef.current.rotateSpeed = 1;
        controlsRef.current.zoomSpeed = 1.2;
        controlsRef.current.panSpeed = 0.8;

        return () => controlsRef.current?.dispose();
    }, [camera, gl]);

    return null; // This component does not render anything
}

export default CameraControls;