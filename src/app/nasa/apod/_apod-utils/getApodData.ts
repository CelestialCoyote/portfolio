export const getApodData = async (date?: string) => {
    try {
        const url = date ? `/api/nasa/apod?date=${date}` : `/api/nasa/apod`;
        const response = await fetch(url, { cache: "no-store" });

        if (!response.ok) {
            if (response.status === 429) {
                console.warn("Rate limit exceeded: NASA API request limit reached.");
                return { data: null, message: "Image fetch limit exceeded. Please try again later.", rateLimit: null, rateRemaining: null };
            }

            throw new Error(`Failed to fetch APOD data. Status: ${response.status}`);
        }

        const { data, rateLimit, rateRemaining } = await response.json();

        console.log(`Rate Limit: ${rateLimit}, Requests Remaining: ${rateRemaining}`);
        console.log("data: ", data);

        return { data, message: "", rateLimit, rateRemaining };
    } catch (error) {
        console.error("Fetch error:", error);
        
        return { data: null, message: "An error occurred while fetching data.", rateLimit: null, rateRemaining: null };
    }
}




// export const getApodData = async () => {
//     try {
//         const response = await fetch(`/api/nasa/apod`, { cache: "no-store" });

//         if (response.status === 429) {
//             console.warn("Rate limit exceeded: NASA API request limit reached.");

//             return { data: null, message: "Image fetch limit exceeded. Please try again later." };
//         }

//         if (!response.ok) {
//             throw new Error("Failed to fetch APOD data");
//         }

//         const responseData = await response.json();

//         return { data: responseData, message: "" };
//     } catch (error) {
//         console.error("Fetch error:", error);

//         return { data: null, message: "An error occurred while fetching data." };
//     }
// }
