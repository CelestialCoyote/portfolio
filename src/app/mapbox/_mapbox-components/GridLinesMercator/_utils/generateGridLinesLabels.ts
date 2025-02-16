import { FeatureCollection, LineString, Point } from "geojson";


export const generateGridLines = (interval: number): FeatureCollection<LineString> => {
    const lines: FeatureCollection<LineString> = {
        type: "FeatureCollection",
        features: [],
    }

    // Longitude Lines (-180 to 180)
    for (let lon = -180; lon <= 180; lon += interval) {
        lines.features.push({
            type: "Feature",
            geometry: {
                type: "LineString",
                coordinates: [
                    [lon, -90],
                    [lon, 90],
                ],
            },
            properties: { type: "grid", longitude: lon },
        });
    }

    // Latitude Lines (-90 to 90), including equator
    for (let lat = -90; lat <= 90; lat += interval) {
        lines.features.push({
            type: "Feature",
            geometry: {
                type: "LineString",
                coordinates: [
                    [-180, lat],
                    [180, lat],
                ],
            },
            properties: {
                type: lat === 0 ? "equator" : "grid",
                latitude: lat,
            },
        });
    }

    return lines;
}


export const generateGridLabels = (interval: number): FeatureCollection<Point> => {
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
