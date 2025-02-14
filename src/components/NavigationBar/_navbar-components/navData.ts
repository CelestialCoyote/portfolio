export const navData = [
	{
		id: 0,
		label: "NASA API",
		submenu: false,
		link: "/nasa",
		auth: false,
		sublinks: [],
	},
	{
		id: 1,
		label: "Mapbox",
		submenu: true,
		link: "#",
		auth: false,
		sublinks: [
			{
				id: 0,
				label: "Earthquakes",
				link: "/mapbox/earthquakes"
			},
			{
				id: 1,
				label: "Military Bases",
				link: "/mapbox/military-bases"
			},
		],
	},
	{
		id: 2,
		label: "Three.js",
		submenu: true,
		link: "#",
		auth: false,
		sublinks: [
			{
				id: 0,
				label: "Earth View",
				link: "/threejs/earth-view"
			},
			{
				id: 1,
				label: "Shader Cubes",
				link: "/threejs/three-cube"
			},
			{
				id: 2,
				label: "Spiral Shader",
				link: "/threejs/spiral"
			},
			{
				id: 3,
				label: "3D Spiral",
				link: "/threejs/spiral-3d"
			},
		],
	},
];
