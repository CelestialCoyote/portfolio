import SelectCoverageAreaMap from "./select-coverage-area-map";


export default function SelectCoverageArea() {
    return (
        <main className="flex flex-col h-screen w-full px-6 py-16">
            <div className="text-3xl text-center font-bold mt-2 mb-4">
                Select Coverage Area
            </div>

            <SelectCoverageAreaMap />
        </main>
    );
};
