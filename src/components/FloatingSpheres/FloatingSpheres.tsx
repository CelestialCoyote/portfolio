"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const FloatingSpheres: React.FC = () => {
    const mountRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Create the scene, camera, renderer, and spheres
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 10;

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        const mount = mountRef.current;
        if (mount) {
            mount.appendChild(renderer.domElement);
        }

        // Create spheres
        const spheres: THREE.Mesh[] = [];
        const sphereMaterial = new THREE.MeshStandardMaterial({
            color: 0x88ccff,
            metalness: 0.5,
            roughness: 0.5,
        });

        for (let i = 0; i < 10; i++) {
            const geometry = new THREE.SphereGeometry(0.5, 32, 32);
            const sphere = new THREE.Mesh(geometry, sphereMaterial);
            sphere.position.set(
                (Math.random() - 0.5) * 6,
                (Math.random() - 0.5) * 6,
                (Math.random() - 0.5) * 6
            );
            scene.add(sphere);
            spheres.push(sphere);
        }

        // Lighting
        const light = new THREE.PointLight(0xffffff, 2, 100);  // Increased intensity
        light.position.set(5, 5, 5);
        scene.add(light);

        // Ambient light for general illumination
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        // Animation loop
        const animate = () => {
            spheres.forEach((sphere) => {
                sphere.rotation.y += 0.01;
            });
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }

        animate();

        // Cleanup
        return () => {
            if (mount) {
                mount.removeChild(renderer.domElement);
            }
            renderer.dispose();
            spheres.forEach((sphere) => sphere.geometry.dispose());
        }
    }, []);

    return <div ref={mountRef}></div>;
}

export default FloatingSpheres;





// import React, { useEffect, useRef } from "react";
// import * as THREE from "three";


// const FloatingSpheres: React.FC = () => {
//     const mountRef = useRef<HTMLDivElement | null>(null);

//     useEffect(() => {
//         // Create the scene, camera, renderer, and spheres
//         const scene = new THREE.Scene();
//         const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//         camera.position.z = 10;

//         const renderer = new THREE.WebGLRenderer();
//         renderer.setSize(window.innerWidth, window.innerHeight);
//         const mount = mountRef.current;  // Copy the ref value to a local variable
//         if (mount) {
//             mount.appendChild(renderer.domElement);
//         }

//         // Create spheres
//         const spheres: THREE.Mesh[] = [];
//         const sphereMaterial = new THREE.MeshStandardMaterial({
//             color: 0x88ccff,
//             metalness: 0.5,
//             roughness: 0.5,
//         });

//         for (let i = 0; i < 10; i++) {
//             const geometry = new THREE.SphereGeometry(0.5, 32, 32);
//             const sphere = new THREE.Mesh(geometry, sphereMaterial);
//             sphere.position.set(
//                 (Math.random() - 0.5) * 6,
//                 (Math.random() - 0.5) * 6,
//                 (Math.random() - 0.5) * 6
//             );
//             scene.add(sphere);
//             spheres.push(sphere);
//         }

//         // Lighting
//         const light = new THREE.PointLight(0xffffff, 1, 100);
//         light.position.set(5, 5, 5);
//         scene.add(light);

//         // Animation
//         const animate = () => {
//             spheres.forEach((sphere) => {
//                 sphere.rotation.y += 0.01; // Add rotation to the spheres
//             });
//             renderer.render(scene, camera);
//             requestAnimationFrame(animate);
//         };
//         animate();

//         // Cleanup
//         return () => {
//             if (mount) {
//                 mount.removeChild(renderer.domElement);
//             }
//             renderer.dispose();
//             spheres.forEach((sphere) => sphere.geometry.dispose());
//         };
//     }, []);

//     return <div ref={mountRef}></div>;
// };

// export default FloatingSpheres;
