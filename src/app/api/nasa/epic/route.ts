import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    const apiKey = process.env.NASA_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: "NASA API key is missing" }, { status: 500 });
    }

    // Get the date from query parameters, if provided
    const url = new URL(request.url);
    const dateParam = url.searchParams.get('date'); // Fetch the 'date' query parameter

    try {
        // If a date is provided, fetch the data for that specific date
        if (dateParam) {
            // Fetch EPIC data for the specific date
            const dataResponse = await fetch(
                `https://api.nasa.gov/EPIC/api/natural/date/${dateParam}?api_key=${apiKey}`
            );

            if (dataResponse.status === 404) {
                // Handle case where the date is not found (404)
                return NextResponse.json({ error: `No data available for the date: ${dateParam}` }, { status: 404 });
            }

            if (!dataResponse.ok) {
                throw new Error(`Failed to fetch EPIC data for the date: ${dateParam}`);
            }

            const epicData = await dataResponse.json();
            return NextResponse.json(epicData);
        }

        // Otherwise, fetch all available dates and get the latest one
        const dateResponse = await fetch(
            `https://api.nasa.gov/EPIC/api/natural/all?api_key=${apiKey}`
        );

        if (!dateResponse.ok) {
            throw new Error("Failed to fetch available dates from NASA API");
        }

        const dates = await dateResponse.json();

        if (!dates.length) {
            throw new Error("No available dates found");
        }

        // Get the most recent date
        const latestDate = dates[0]; // Format: YYYY-MM-DD

        // Fetch the EPIC data for the most recent date
        const dataResponse = await fetch(
            `https://api.nasa.gov/EPIC/api/natural/date/${latestDate.date}?api_key=${apiKey}`
        );

        if (dataResponse.status === 404) {
            // Handle case where the latest date is not found (404)
            return NextResponse.json({ error: `No data available for the latest date: ${latestDate.date}` }, { status: 404 });
        }

        if (!dataResponse.ok) {
            throw new Error("Failed to fetch EPIC data for the latest date");
        }

        const epicData = await dataResponse.json();
        return NextResponse.json(epicData);

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}



// import { NextRequest, NextResponse } from "next/server";


// export async function GET(request: NextRequest) {
//     const apiKey = process.env.NASA_API_KEY;

//     if (!apiKey) {
//         return NextResponse.json({ error: "NASA API key is missing" }, { status: 500 });
//     }

//     // Get the date from query parameters, if provided
//     const url = new URL(request.url);
//     const dateParam = url.searchParams.get('date'); // Fetch the 'date' query parameter

//     try {
//         // If a date is provided, fetch the data for that specific date
//         if (dateParam) {
//             // Fetch EPIC data for the specific date
//             const dataResponse = await fetch(
//                 `https://api.nasa.gov/EPIC/api/natural/date/${dateParam}?api_key=${apiKey}`
//             );

//             if (!dataResponse.ok) {
//                 throw new Error(`Failed to fetch EPIC data for the date: ${dateParam}`);
//             }

//             const epicData = await dataResponse.json();

//             return NextResponse.json(epicData);
//         }

//         // Otherwise, fetch all available dates and get the latest one
//         const dateResponse = await fetch(
//             `https://api.nasa.gov/EPIC/api/natural/all?api_key=${apiKey}`
//         );

//         if (!dateResponse.ok) {
//             throw new Error("Failed to fetch available dates from NASA API");
//         }

//         const dates = await dateResponse.json();

//         if (!dates.length) {
//             throw new Error("No available dates found");
//         }

//         // Get the most recent date
//         const latestDate = dates[0]; // Format: YYYY-MM-DD

//         // Fetch the EPIC data for the most recent date
//         const dataResponse = await fetch(
//             `https://api.nasa.gov/EPIC/api/natural/date/${latestDate.date}?api_key=${apiKey}`
//         );

//         if (!dataResponse.ok) {
//             throw new Error("Failed to fetch EPIC data for the latest date");
//         }

//         const epicData = await dataResponse.json();

//         return NextResponse.json(epicData);
//     } catch (error) {
//         const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";

//         return NextResponse.json({ error: errorMessage }, { status: 500 });
//     }
// }
