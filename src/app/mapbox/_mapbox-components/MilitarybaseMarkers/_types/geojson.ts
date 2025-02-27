export type GeoJSONFeature = {
    type: "Feature";
    properties: {
        installation: string;
        branch: string;
        state: string;
        jointBase: boolean | null;
        locationLat: string;
        locationLong: string;
        STATEFP: string;
        NAME: string;
        STUSPS: string;
        zip_codes: string[];
    };
    geometry: {
        type: "Point";
        coordinates: [number, number]; // Ensures exactly two elements.
    };
};

export type GeoJSONData = {
    type: "FeatureCollection";
    features: GeoJSONFeature[];
};