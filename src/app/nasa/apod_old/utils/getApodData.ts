import { baseURL } from "@/app/api/baseURL";

export const getApodData = async () => {
    try {
        const response = await fetch(
            `${baseURL}/api/nasa/apod`,
            { cache: "no-store" }
        );

        if (response.status === 429) {
            // Rate limit exceeded - no need to parse the response body
            return { rateLimitExceeded: true, message: "Image fetch limit exceeded. Please try again later." };
        }

        if (!response.ok) {
            throw new Error("Failed to fetch APOD data");
        }

        const responseData = await response.json();
        // console.log("Fetched data:", JSON.stringify(responseData.data));

        return { rateLimitExceeded: false, data: responseData.data };
    } catch (error) {
        console.error(error);

        return { rateLimitExceeded: false, data: null, message: "An error occurred while fetching data." };
    }
}
