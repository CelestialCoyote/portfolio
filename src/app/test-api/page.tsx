const getTestData = async () => {
    try {
        // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; // Fallback to localhost
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; // Fallback to localhost
        const response = await fetch(`${baseUrl}/api/`, { cache: "no-store" });

        if (!response.ok) {
            throw new Error("Failed to fetch Test data");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

async function TestAPI() {
    const data = await getTestData();

    if (!data)
        return (
            <div className="text-2xl text-center pt-24">
                No data
            </div>
        );

    return (
        <div className="">
            <h1 className="text-3xl text-center mt-4 mb-6">
                API Test
            </h1>

            <div className="">
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
        </div>
    );
}

export default TestAPI;
