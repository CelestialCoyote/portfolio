import { EpicData } from "../types/epicData";


export const getEpicImageUrl = (epic: EpicData, type: "png" | "jpg" = "png"): string => {
    const year = epic.date.slice(0, 4);
    const month = epic.date.slice(5, 7);
    const day = epic.date.slice(8, 10);
    const folder = type === "png" ? "png" : "thumbs";
    const extension = type === "png" ? "png" : "jpg";

    return `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/${folder}/${epic.image}.${extension}`;
}