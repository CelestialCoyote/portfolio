import { NextResponse } from "next/server";


export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const dateParam = searchParams.get("date"); // Get the date from query params

    const date = dateParam || new Date();
    const currentDate = typeof date === "string" 
        ? date 
        : `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

    try {
        console.log(`Fetching APOD for date: ${currentDate}`);
        console.log(`Using NASA_API_KEY: ${process.env.NASA_API_KEY ? "Defined" : "Undefined"}`);

        const response = await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&date=${currentDate}`
        );

        // Log response status and headers for debugging
        console.log("Response status:", response.status);
        console.log("Response headers:", JSON.stringify([...response.headers]));

        if (response.status === 429) {
            // Handle rate limit exceeded
            const errorText = await response.text();

            console.error("Rate limit exceeded:", errorText);

            return NextResponse.json({
                error: "Rate limit exceeded. Please try again later.",
            }, { status: 429 });
        }

        if (!response.ok) {
            const errorText = await response.text();

            console.error("Error response body:", errorText);
            throw new Error(`Failed to fetch data from NASA API. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data:", JSON.stringify(data));

        // Extract rate limit information from the headers
        const rateLimit = response.headers.get("X-RateLimit-Limit");
        const rateRemaining = response.headers.get("X-RateLimit-Remaining");

        console.log(`Daily Request Limit: ${rateLimit}`);
        console.log(`Requests Remaining: ${rateRemaining}`);

        // Return the data along with rate limit info in the response
        return NextResponse.json({
            data,
            rateLimit,
            rateRemaining,
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error fetching data:", error.message);

            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            // Handle the case where the error is not an instance of Error
            console.error("Unknown error:", error);

            return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
        }
    }
}





// import { NextResponse } from "next/server";


// export async function GET() {
//     const date = new Date();
//     const currentDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

//     try {
//         console.log(`apod current date: ${currentDate}`);
//         console.log(`Using NASA_API_KEY: ${process.env.NASA_API_KEY ? "Defined" : "Undefined"}`);

//         const response = await fetch(
//             `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&date=${currentDate}`
//         );

//         // Log response status and headers for debugging
//         console.log("Response status:", response.status);
//         console.log("Response headers:", JSON.stringify([...response.headers]));

//         if (response.status === 429) {
//             // Handle rate limit exceeded
//             const errorText = await response.text();

//             console.error("Rate limit exceeded:", errorText);

//             return NextResponse.json({
//                 error: "Rate limit exceeded. Please try again later.",
//             }, { status: 429 });
//         }

//         if (!response.ok) {
//             const errorText = await response.text();

//             console.error("Error response body:", errorText);
//             throw new Error(`Failed to fetch data from NASA API. Status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log("Fetched data:", JSON.stringify(data));

//         // Extract rate limit information from the headers
//         const rateLimit = response.headers.get("X-RateLimit-Limit");
//         const rateRemaining = response.headers.get("X-RateLimit-Remaining");

//         console.log(`Daily Request Limit: ${rateLimit}`);
//         console.log(`Requests Remaining: ${rateRemaining}`);

//         // Return the data along with rate limit info in the response
//         return NextResponse.json({
//             data,
//             rateLimit,
//             rateRemaining,
//         });
//     } catch (error: unknown) {
//         if (error instanceof Error) {
//             console.error("Error fetching data:", error.message);

//             return NextResponse.json({ error: error.message }, { status: 500 });
//         } else {
//             // Handle the case where the error is not an instance of Error
//             console.error("Unknown error:", error);

//             return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
//         }
//     }
// }


// export async function GET() {
//     console.log("Fetching APOD...");

//     const apiKey = process.env.NASA_API_KEY || "MISSING_API_KEY";
//     // console.log(`Using NASA_API_KEY: ${apiKey}`);

//     try {
//         const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
//         console.log(`Response Status: ${response.status}`);

//         const data = await response.json();
//         console.log("Fetched Data:", JSON.stringify(data));

//         return NextResponse.json(data);
//     } catch (error) {
//         console.error("Unexpected error:", error);
//         return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//     }
// }
