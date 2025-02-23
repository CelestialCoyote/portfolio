export default function SelectionAreaType({ selectAreaType, setSelectAreaType }) {
    const handleOptionChange = (event) => {
        setSelectAreaType(event.target.value);
    };

    return (
        <div
            className="flex flex-col bg-white text-black text-center text-base border-2 border-black rounded-lg w-64 mx-auto px-2 py-1"
            style={{ boxShadow: `20px 20px 15px rgb(0 0 0 / 0.5)` }}
        >
            <div className="flex flex-col">
                <div className="flex items-center gap-x-3 mb-2">
                    <input
                        type="radio"
                        name="selection"
                        value="state"
                        className="bg-slate-500 text-black rounded mr-2 focus:ring-0 focus:ring-offset-0"
                        checked={selectAreaType === 'state'}
                        onChange={handleOptionChange}
                    />
                    <h3 className="text-lg">
                        Select by State
                    </h3>
                </div>
            </div>

            
            <div className="flex flex-col">
                <div className="flex items-center gap-x-3 mb-2">
                    <input
                        type="radio"
                        name="selection"
                        value="county"
                        className="bg-slate-500 text-black rounded mr-2 focus:ring-0 focus:ring-offset-0"
                        checked={selectAreaType === 'county'}
                        onChange={handleOptionChange}
                    />
                    <h3 className="text-lg">
                        Select by County
                    </h3>
                </div>
            </div>
           
            
            <div className="flex flex-col">
                <div className="flex items-center gap-x-3 mb-2">
                    <input
                        type="radio"
                        name="selection"
                        value="zip"
                        className="bg-slate-500 text-black rounded mr-2 focus:ring-0 focus:ring-offset-0"
                        checked={selectAreaType === 'zip'}
                        onChange={handleOptionChange}
                    />
                    <h3 className="text-lg">
                        Select by Zip Code
                    </h3>
                </div>
            </div>
        </div>
    );
}
