import NasaImageResults from "../_components/NasaImageResults";

const baseURL = process.env.BASE_API_URL;

interface SearchLibraryProps {
  params: { searchTerm: string };
}

const SearchLibrary = async ({ params }: SearchLibraryProps) => {
  // Directly access params.searchTerm
  const query = params.searchTerm;

  try {
    // Fetch data from your custom API route
    const response = await fetch(
      `${baseURL}/nasa/image-library?q=${query}`,
      { cache: "no-store" } // Ensure fresh data on every request
    );

    console.log(`searchParams: ${query}`);

    if (!response.ok) {
      throw new Error("Error fetching data from the local API");
    }

    // Parse JSON response
    const data = await response.json();
    const items = data.collection.items;

    // Handle no data
    if (!items || items.length === 0) {
      return <p>No results found for &quot;{query}&quot;</p>;
    }

    return (
      <div>
        <h1 className="text-3xl text-center mt-4 mb-6">Image Library</h1>
        <div className="flex flex-col items-center overflow-y-auto no-scrollbar mb-6">
          <NasaImageResults items={items} search={query} />
        </div>
      </div>
    );
  } catch (error) {
    // Error handling
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return (
      <div>
        <h1 className="text-3xl text-center mt-4 mb-6">Image Library</h1>
        <p className="text-red-500 text-center mt-4">
          Error fetching data: {errorMessage}
        </p>
      </div>
    );
  }
};

export default SearchLibrary;





// import NasaImageResults from "../_components/NasaImageResults";


// const baseURL = process.env.BASE_API_URL;

// interface SearchLibraryProps {
// 	params: { searchTerm: string };
// }

// const SearchLibrary = async ({ params }: SearchLibraryProps) => {
// 	const query = await params.searchTerm;

// 	try {
// 		// Fetch data from your custom API route
// 		const response = await fetch(
// 			`${baseURL}/nasa/image-library?q=${query}`,
// 			{ cache: "no-store" } // Ensure fresh data on every request
// 		);

// 		console.log(`searchParams: ${query}`);

// 		if (!response.ok) {
// 			throw new Error("Error fetching data from the local API");
// 		}

// 		// Parse JSON response
// 		const data = await response.json();
// 		const items = data.collection.items;

// 		// Handle no data
// 		if (!items || items.length === 0) {
// 			return <p>No results found for &quot;{query}&quot;</p>;
// 		}

// 		return (
// 			<div>
// 				<h1 className="text-3xl text-center mt-4 mb-6">Image Library</h1>
// 				<div className="flex flex-col items-center overflow-y-auto no-scrollbar mb-6">
// 					<NasaImageResults items={items} search={query} />
// 				</div>
// 			</div>
// 		);
// 	} catch (error) {
// 		// Error handling
// 		const errorMessage =
// 			error instanceof Error ? error.message : "An unknown error occurred";

// 		return (
// 			<div>
// 				<h1 className="text-3xl text-center mt-4 mb-6">Image Library</h1>
// 				<p className="text-red-500 text-center mt-4">
// 					Error fetching data: {errorMessage}
// 				</p>
// 			</div>
// 		);
// 	}
// };

// export default SearchLibrary;






// import NasaImageResults from "../_components/NasaImageResults";


// const baseURL = process.env.BASE_API_URL;

// interface SearchLibraryProps {
// 	params: { searchTerm: string };
// }

// const SearchLibrary = async ({ params }: SearchLibraryProps) => {
// 	const response = await fetch(
// 		`${baseURL}/nasa/image-library?q=${params.searchTerm}`,
// 		{ cache: "no-store" }
// 	);
	
// 	console.log(`searchParams: ${params.searchTerm}`);

// 	if (!response.ok) {
// 		throw new Error("Error fetching data");
// 	}

// 	const data = await response.json();
// 	const items = data.collection.items;

// 	return (
// 		<div>
// 			<h1 className="text-3xl text-center mt-4 mb-6">Image Library</h1>
// 			<div className="flex flex-col items-center overflow-y-auto no-scrollbar mb-6">
// 				<NasaImageResults items={items} search={params.searchTerm} />
// 			</div>
// 		</div>
// 	);
// }

// export default SearchLibrary;




// import NasaImageResults from '../_components/NasaImageResults';


// export default async function SearchLibrary({ params }) {
// 	const response = await fetch(`https://images-api.nasa.gov/search?media_type=image&q=${params.searchTerm}`);

// 	console.log(`searchParams: ${params.searchTerm}`)

// 	if (!response.ok) {
// 		throw new Error("Error fetching data");
// 	}

// 	const data = await response.json();
// 	const items = data.collection.items;

// 	return (
// 		<div className="">
// 			<h1 className="text-3xl text-center mt-4 mb-6">
// 				Image Library
// 			</h1>

// 			<div className="flex flex-col items-center overflow-y-auto no-scrollbar mb-6">
// 				<NasaImageResults
// 					items={items}
// 					search={params.searchTerm}
// 				/>
// 			</div>
// 		</div>
// 	);
// };
