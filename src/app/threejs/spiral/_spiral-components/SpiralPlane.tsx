import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import vertexShader from "../_shaders/vertex.glsl";
import fragmentShader from "../_shaders/fragment.glsl";


const SpiralPlane: React.FC = () => {
    const mesh = useRef<THREE.Mesh | null>(null);

    const shaderMaterial = React.useMemo(() => new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            uTime: { value: 0.0 },
            uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        },
    }), []);

    useFrame(({ clock }) => {
        if (mesh.current) {
            shaderMaterial.uniforms.uTime.value = clock.getElapsedTime();
        }
    });

    return (
        <mesh
            ref={mesh}
            material={shaderMaterial}
        >
            <planeGeometry args={[2, 2]} />
        </mesh>
    );
}

export default SpiralPlane;
