import { NextResponse } from "next/server";
import { getMHA2025 } from "@/lib/api/mha-2025/mha2025";


export async function GET() {
    try {
        const result = await getMHA2025();

        // console.log(`fetching from GET": ${result}`);

        return NextResponse.json(result, { status: 200 });
    } catch (error: unknown) {
        console.error("Error fetching mha 2025:", error);

        // Check if the error is an instance of Error to safely access `message`
        if (error instanceof Error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        // Handle unexpected error types
        return NextResponse.json(
            { error: "An unknown error occurred" },
            { status: 500 }
        );
    }
}
