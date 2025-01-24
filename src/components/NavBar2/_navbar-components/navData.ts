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
];
