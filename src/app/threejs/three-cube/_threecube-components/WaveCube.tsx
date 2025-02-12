import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import vertexShader from "../_shaders/waveCube/vertex.glsl";
import fragmentShader from "../_shaders/waveCube/fragment.glsl";


interface WaveCubeProps {
    size?: [number, number, number];
    position?: [number, number, number];
}

const WaveCube: React.FC<WaveCubeProps> = ({
    size = [2, 2, 2],
    position = [0, 0, 0]
}) => {
    const mesh = useRef<THREE.Mesh | null>(null);

    const shaderMaterial = React.useMemo(() => new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            uTime: { value: 0.0 },
        },
    }), []);

    useFrame(({ clock }) => {
        if (mesh.current) {
            shaderMaterial.uniforms.uTime.value = clock.getElapsedTime();
            mesh.current.rotation.x = mesh.current.rotation.y -= 0.002;
        }
    });

    return (
        <mesh
            ref={mesh}
            material={shaderMaterial}
            position={new THREE.Vector3(...position)}
        >
            <boxGeometry args={size} />
        </mesh>
    );
}

export default WaveCube;
