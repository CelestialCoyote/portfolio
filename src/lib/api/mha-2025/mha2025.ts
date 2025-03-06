import clientPromise from '@/lib/mongodb';


export async function getMHA2025() {
    try {
        const client = await clientPromise;
        console.log("Database client initialized");

        const dbName = process.env.MONGO_DB;
        if (!dbName) {
            throw new Error("MONGO_DB environment variable is not set.");
        }

        const collection = client.db(dbName).collection('mha-2025');
        console.log(`Fetching from collection: mha-2025 in database: ${dbName}`);

        const data = await collection.find({}).toArray();
        console.log(`Fetched ${data.length} records`);

        return data;
    } catch (error) {
        console.error("Database fetch error:", error);
        throw error;
    }
}
