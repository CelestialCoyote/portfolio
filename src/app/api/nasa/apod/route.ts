import { NextResponse } from "next/server";


export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const dateParam = searchParams.get("date"); // Get the date from query params

    // If no date is provided, fetch the default image of the day
    const nasaApiUrl = dateParam
        ? `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&date=${dateParam}`
        : `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`;

    try {
        // console.log(`Fetching APOD for: ${dateParam || "today"}`);
        // console.log(`Using NASA_API_KEY: ${process.env.NASA_API_KEY ? "Defined" : "Undefined"}`);

        const response = await fetch(nasaApiUrl);

        // Log response status and headers for debugging
        // console.log("Response status:", response.status);
        // console.log("Response headers:", JSON.stringify([...response.headers]));

        if (response.status === 429) {
            console.error("Rate limit exceeded");

            return NextResponse.json({ error: "Rate limit exceeded. Please try again later." }, { status: 429 });
        }

        if (!response.ok) {
            console.error(`Error fetching APOD: ${response.status}`);

            return NextResponse.json({ error: `Failed to fetch APOD. Status: ${response.status}` }, { status: response.status });
        }

        const data = await response.json();
        // console.log("Fetched data:", JSON.stringify(data));

        const rateLimit = response.headers.get("X-RateLimit-Limit");
        const rateRemaining = response.headers.get("X-RateLimit-Remaining");

        return NextResponse.json({
            data,
            rateLimit,
            rateRemaining,
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ error: "An error occurred while fetching APOD." }, { status: 500 });
    }
}
