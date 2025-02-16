import { FeatureCollection, LineString, Point } from "geojson";


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

export const generateGlobeLabels = (interval: number): FeatureCollection<Point> => {
    const labels: FeatureCollection<Point> = {
        type: "FeatureCollection",
        features: [],
    }

    // Longitude Labels (-180 to 180)
    for (let lon = -180; lon <= 180; lon += interval) {
        labels.features.push({
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [lon, 0], // Longitude and Latitude at the equator
            },
            properties: { label: lon.toString() },
        });
    }

    // Latitude Labels (-90 to 90)
    for (let lat = -90; lat <= 90; lat += interval) {
        labels.features.push({
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [0, lat], // Longitude and Latitude at the prime meridian
            },
            properties: { label: lat.toString() },
        });
    }

    return labels;
}
