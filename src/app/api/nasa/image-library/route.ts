import { NextResponse } from "next/server";


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query) {
        return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
    }

    try {
        const response = await fetch(
            `https://images-api.nasa.gov/search?q=${query}&media_type=image`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch data from NASA API");
        }

        const data = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
