import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";


const BOX_SIZE = 5; // Defines the size of the invisible containment box

const FloatingSpheres: React.FC = () => {
    const spheres = useMemo(() => {
        return new Array(20).fill(null).map(() => ({
            position: new THREE.Vector3(
                (Math.random() - 0.5) * BOX_SIZE * 2,
                (Math.random() - 0.5) * BOX_SIZE * 2,
                (Math.random() - 0.5) * BOX_SIZE * 2
            ),
            velocity: new THREE.Vector3(
                (Math.random() - 0.5) * 0.01,
                (Math.random() - 0.5) * 0.01,
                (Math.random() - 0.5) * 0.01
            ),
            size: Math.random() * 0.5 + 0.2,
            color: new THREE.Color(`hsl(${Math.random() * 360}, 50%, 50%)`)
        }));
    }, []);

    const sphereRefs = useRef<THREE.Mesh[]>([]);

    useFrame(() => {
        // Containment & Collision
        for (let i = 0; i < spheres.length; i++) {
            const sphere = spheres[i];
            const mesh = sphereRefs.current[i];

            if (!mesh) continue;

            // Update Position
            sphere.position.add(sphere.velocity);

            // Containment logic (bounce off invisible walls)
            if (Math.abs(sphere.position.x) > BOX_SIZE) sphere.velocity.x *= -1;
            if (Math.abs(sphere.position.y) > BOX_SIZE) sphere.velocity.y *= -1;
            if (Math.abs(sphere.position.z) > BOX_SIZE) sphere.velocity.z *= -1;


            // Collision Detection & Response
            for (let j = i + 1; j < spheres.length; j++) {
                const otherSphere = spheres[j];
                const otherMesh = sphereRefs.current[j];

                if (!otherMesh) continue;

                const distance = sphere.position.distanceTo(otherSphere.position);
                const minDistance = sphere.size + otherSphere.size;

                if (distance < minDistance) {
                    // Compute normal vector
                    const normal = new THREE.Vector3()
                        .subVectors(sphere.position, otherSphere.position)
                        .normalize();

                    // Swap velocity components along the normal direction
                    const relativeVelocity = new THREE.Vector3()
                        .subVectors(sphere.velocity, otherSphere.velocity);

                    if (relativeVelocity.dot(normal) < 0) {
                        const swap = sphere.velocity.clone();
                        sphere.velocity.copy(otherSphere.velocity);
                        otherSphere.velocity.copy(swap);
                    }
                }
            }

            // Apply new position to the mesh
            mesh.position.copy(sphere.position);
        }
    });

    return (
        <>
            {spheres.map((sphere, i) => (
                <mesh
                    key={i}
                    ref={(el) => {
                        if (el) sphereRefs.current[i] = el;
                    }}
                    position={sphere.position}
                >
                    <sphereGeometry args={[sphere.size, 32, 32]} />
                    <meshStandardMaterial color={sphere.color} metalness={0.3} roughness={0.7} />
                </mesh>
            ))}
        </>
    );
}

export default FloatingSpheres;
