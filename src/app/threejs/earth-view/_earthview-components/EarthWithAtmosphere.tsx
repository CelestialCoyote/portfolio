import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import earthVertexShader from "../_shaders/earth/vertex.glsl";
import earthFragmentShader from "../_shaders/earth/fragment.glsl";
import atmosphereVertexShader from "../_shaders/atmosphere/vertex.glsl";
import atmosphereFragmentShader from "../_shaders/atmosphere/fragment.glsl";


const EarthWithAtmosphere: React.FC = () => {
    const earthRef = useRef<THREE.Mesh>(null!);
    const atmosphereRef = useRef<THREE.Mesh>(null!);

    // Load textures
    const [dayTexture, nightTexture, specularCloudsTexture] = useLoader(TextureLoader, [
        "/images/textures/earth/8k_earth_daymap.jpg",
        "/images/textures/earth/8k_earth_nightmap.jpg",
        "/images/textures/earth/8k_earth_clouds.jpg",
    ]);

    // Set texture properties
    dayTexture.colorSpace = THREE.SRGBColorSpace;
    nightTexture.colorSpace = THREE.SRGBColorSpace;
    specularCloudsTexture.anisotropy = 8;

    // Memoized uniforms
    const uniforms = useMemo(
        () => ({
            uDayTexture: { value: dayTexture },
            uNightTexture: { value: nightTexture },
            uSpecularCloudsTexture: { value: specularCloudsTexture },
            uSunDirection: { value: new THREE.Vector3(0, 0, 1) },
            uAtmosphereDayColor: { value: new THREE.Color("#0000ff") },
            uAtmosphereTwilightColor: { value: new THREE.Color("#993300") }
        }),
        [dayTexture, nightTexture, specularCloudsTexture]
    );

    // Rotate the Earth around its tilted axis
    useFrame(({ clock }) => {
        if (earthRef.current) {
            const elapsedTime = clock.getElapsedTime();

            earthRef.current.rotation.y = elapsedTime * 0.02; // Rotation speed
            earthRef.current.rotation.x = THREE.MathUtils.degToRad(23.5); // Axial tilt
        }
    });

    return (
        <group
            ref={earthRef}
            rotation={[THREE.MathUtils.degToRad(23.5), 0, 0]}
        >
            {/* Earth */}
            <mesh>
                <sphereGeometry args={[7.9262, 64, 64]} />
                <shaderMaterial
                    vertexShader={earthVertexShader}
                    fragmentShader={earthFragmentShader}
                    uniforms={uniforms}
                />
            </mesh>

            {/* Atmosphere */}
            <mesh ref={atmosphereRef} scale={1.04}>
                <sphereGeometry args={[7.9262, 64, 64]} />
                <shaderMaterial
                    vertexShader={atmosphereVertexShader}
                    fragmentShader={atmosphereFragmentShader}
                    uniforms={uniforms}
                    side={THREE.BackSide}
                    transparent
                />
            </mesh>

            {/* North Pole (Blue) */}
            <mesh position={[0, 4.5, 0]}>
                <cylinderGeometry args={[0.05, 0.05, 9, 16]} />
                <meshBasicMaterial color="blue" />
            </mesh>

            {/* South Pole (Red) */}
            <mesh position={[0, -4.5, 0]} >
                <cylinderGeometry args={[0.05, 0.05, 9, 16]} />
                <meshBasicMaterial color="red" />
            </mesh>
        </group>
    );
}

export default EarthWithAtmosphere;
