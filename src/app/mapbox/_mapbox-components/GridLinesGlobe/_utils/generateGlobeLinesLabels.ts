import { FeatureCollection, LineString } from "geojson";


export const generateGlobeLines = (interval: number): FeatureCollection<LineString> => {
    const lines: FeatureCollection<LineString> = {
        type: "FeatureCollection",
        features: [],
    }

    // Generate longitude lines (-180° to 180°)
    for (let lon = -180; lon <= 180; lon += interval) {
        lines.features.push({
            type: "Feature",
            geometry: {
                type: "LineString",
                coordinates: Array.from({ length: 181 }, (_, i) => [lon, i - 90]),
            },
            properties: { type: "grid", longitude: lon },
        });
    }

    // Generate latitude lines (-90° to 90°)
    for (let lat = -90; lat <= 90; lat += interval) {
        lines.features.push({
            type: "Feature",
            geometry: {
                type: "LineString",
                coordinates: Array.from({ length: 361 }, (_, i) => [i - 180, lat]),
            },
            properties: {
                type: lat === 0 ? "equator" : "grid",
                latitude: lat,
            },
        });
    }

    return lines;
}