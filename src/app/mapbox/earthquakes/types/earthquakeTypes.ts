export interface Earthquake {
    id: string;
    properties: {
        mag: number;
        place: string;
        time: number; // Timestamp
    };
    geometry: {
        coordinates: [number, number, number]; // [longitude, latitude, depth]
    };
}

export interface FeatureCollection {
    type: "FeatureCollection";
    features: Earthquake[];
}