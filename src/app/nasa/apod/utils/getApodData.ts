import { baseURL } from "@/app/api/baseURL";


export const getApodData = async () => {
    try {
        const response = await fetch(
            `${baseURL}/api/nasa/apod`,
            { cache: "no-store" }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch APOD data");
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}
