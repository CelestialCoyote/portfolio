import React, { useMemo } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { randomSpherePoint, assignTemperature, temperatureToColor } from "../_utils/starfieldUtils";


interface StarfieldProps {
	numStars?: number;
}

const Starfield: React.FC<StarfieldProps> = ({ numStars = 500 }) => {
	const starTexture = useLoader(TextureLoader, "/images/textures/stars/star.png");

	// Generate star positions and colors
	const { verts, colors, sizes } = useMemo(() => {
		const verts: number[] = [];
		const colors: number[] = [];
		const sizes: number[] = [];
		const positions: { pos: THREE.Vector3; temperature: number }[] = [];

		// Set a large radius for the starfield (e.g., 1000 units)
		const starfieldRadius = 250;

		for (let i = 0; i < numStars; i += 1) {
			const p = randomSpherePoint(starfieldRadius); // Increased radius
			const { pos } = p;

			// Randomly assign a spectral class and temperature
			const temperature = assignTemperature();

			// Convert temperature to color
			const col = temperatureToColor(temperature);

			// Randomize star size (small range to avoid too large stars)
			const size = Math.random() * 0.4 + 0.1; // Size between 0.1 and 0.5

			positions.push(p);
			verts.push(pos.x, pos.y, pos.z);
			colors.push(col.r, col.g, col.b);
			sizes.push(size);
		}

		return { verts, colors, sizes, positions };
	}, [numStars]);

	const geo = new THREE.BufferGeometry();
	geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
	geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
	geo.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1)); // Set sizes

	const mat = new THREE.PointsMaterial({
		size: 1, // Default size to handle size in geometry
		vertexColors: true,
		map: starTexture,
		sizeAttenuation: true, // Makes the size constant regardless of distance
	});

	const points = new THREE.Points(geo, mat);

	return <primitive object={points} />;
}

export default Starfield;
