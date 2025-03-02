import React, { ChangeEvent } from "react";


interface SelectAreaTypeProps {
    selectAreaType: string;
    setSelectAreaType: (value: string) => void;
}

const SelectAreaType: React.FC<SelectAreaTypeProps> = ({ selectAreaType, setSelectAreaType }) => {
    const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectAreaType(event.target.value);
    }

    return (
        <div
            className="flex flex-col bg-white text-black text-center text-[16px] border-2 border-black rounded-lg w-[150px] mx-auto px-2 py-1"
            style={{ boxShadow: `20px 20px 15px rgb(0 0 0 / 0.5)` }}
        >
            <div className="flex flex-col">
                <div className="flex items-center gap-x-3 mb-2">
                    <input
                        type="radio"
                        name="selection"
                        value="state"
                        checked={selectAreaType === 'state'}
                        onChange={handleOptionChange}
                    />
                    <h3 className="">
                        State
                    </h3>
                </div>
            </div>

            
            <div className="flex flex-col">
                <div className="flex items-center gap-x-3 mb-2">
                    <input
                        type="radio"
                        name="selection"
                        value="county"
                        checked={selectAreaType === 'county'}
                        onChange={handleOptionChange}
                    />
                    <h3 className="">
                        County
                    </h3>
                </div>
            </div>
           
            
            <div className="flex flex-col">
                <div className="flex items-center gap-x-3 mb-2">
                    <input
                        type="radio"
                        name="selection"
                        value="zip"
                        checked={selectAreaType === 'zip'}
                        onChange={handleOptionChange}
                    />
                    <h3 className="">
                        Zip Code
                    </h3>
                </div>
            </div>
        </div>
    );
}

export default SelectAreaType;
