import { NextResponse } from "next/server";


export async function GET() {
    const date = new Date();
    const currentDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

    try {
        // console.log(`apod current date: ${currentDate}`);
        // console.log(`Using NASA_API_KEY: ${process.env.NASA_API_KEY ? "Defined" : "Undefined"}`);

        const response = await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&date=${currentDate}`
        );

        // Log response status and headers for debugging
        // console.log("Response status:", response.status);
        // console.log("Response headers:", JSON.stringify([...response.headers]));

        if (!response.ok) {
            const errorText = await response.text(); // Log the body of the error response

            console.error("Error response body:", errorText);
            throw new Error(`Failed to fetch data from NASA API. Status: ${response.status}`);
        }

        // const data = await response.json();
        // console.log("Fetched data:", JSON.stringify(data));

        // return NextResponse.json(data);
        return NextResponse.json({
            nasa: "astronomy photo of the day",
        })
    } catch (error) {
        console.error("Error fetching data:", error.message);

        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
