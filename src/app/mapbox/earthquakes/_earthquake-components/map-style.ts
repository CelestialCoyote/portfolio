import type { LayerProps } from "react-map-gl";


const MAX_ZOOM_LEVEL = 18;

export const heatmapLayer: LayerProps = {
    id: "heatmap",
	maxzoom: MAX_ZOOM_LEVEL,
	type: "heatmap",
	paint: {
		// Increase the heatmap weight based on the magnitude
		"heatmap-weight": ["interpolate", ["linear"], ["get", "mag"], 0, 0, 9, 1],

		// Adjust intensity by zoom level
		"heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 1, MAX_ZOOM_LEVEL, 3],

		// Define color ramp based on magnitude
		"heatmap-color": [
			"interpolate",
			["linear"],
			["get", "mag"], // Use 'mag' property to determine colors
			2.0,
			"rgb(255,255,178)", // Yellow for 2.0 - 2.9
			3.0,
			"rgb(254,204,92)", // Orange for 3.0 - 3.9
			4.0,
			"rgb(253,141,60)", // Dark orange for 4.0 - 4.9
			5.0,
			"rgb(240,59,32)", // Red for 5.0 - 5.9
			6.0,
			"rgb(189,0,38)", // Dark red for 6.0 - 6.9
			7.0,
			"rgb(128,0,38)", // Burgundy for 7.0 - 7.9
			8.0,
			"rgb(77,0,77)", // Purple for 8.0 - 8.9
			9.0,
			"rgb(30,30,30)" // Black for 9.0 - 9.9
		],

		// Adjust radius by zoom level
		"heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 2, MAX_ZOOM_LEVEL, 20],

		// Transition opacity with zoom level
		"heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 7, 1, 9, 0],
	},
}
