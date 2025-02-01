export const getApodData = async () => {
    try {
        const response = await fetch(`/api/nasa/apod`, { cache: "no-store" });

        if (response.status === 429) {
            console.warn("Rate limit exceeded: NASA API request limit reached.");

            return { data: null, message: "Image fetch limit exceeded. Please try again later." };
        }

        if (!response.ok) {
            throw new Error("Failed to fetch APOD data");
        }

        const responseData = await response.json();

        return { data: responseData, message: "" }; // Ensure message is always a string
    } catch (error) {
        console.error("Fetch error:", error);

        return { data: null, message: "An error occurred while fetching data." };
    }
}
