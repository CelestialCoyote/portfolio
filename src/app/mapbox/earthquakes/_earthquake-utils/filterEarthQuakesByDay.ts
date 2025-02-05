import { FeatureCollection } from "../types/earthquakeTypes";


export const filterEarthquakesByDay = (
    featureCollection: FeatureCollection,
    time: number
): FeatureCollection => {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const filteredFeatures = featureCollection.features.filter((feature) => {
        const featureDate = new Date(feature.properties.time);
        return (
            featureDate.getFullYear() === year &&
            featureDate.getMonth() === month &&
            featureDate.getDate() === day
        );
    });

    return { type: "FeatureCollection", features: filteredFeatures };
}
