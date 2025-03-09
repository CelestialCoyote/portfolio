import React, { useState } from "react";
import { useZipHover } from "../_utils-militaryBases/useZipHover";
import PayGradeDropdown from "../_components-militaryBases/PaygradeDropdown";


type BahData = {
    [key: string]: [number | "NULL", number | "NULL"]; // Each pay grade has an array of two values
}

type MHAData = {
    mha: string;
    mha_name: string;
    bah?: BahData[];
    zip_codes: string[];
}[];

const BAH = ({ mhaData }: { mhaData: MHAData }) => {
// const BAH: React.FC<{ mhaData: MHAData[] }> = ({ mhaData }) => {
    const { zipClickedInfo } = useZipHover(mhaData);
    const [payGrade, setPayGrade] = useState("E05");

    // Set currency format.
    const USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    if (!zipClickedInfo) {
        return <p className="text-gray-500">Select a zip code to see BAH data</p>;
    }

    return (
        <div className="flex flex-col text-black p-1">
            <h2 className="text-[16px] font-semibold mb-2 border-b-2 border-black pb-2">
                Basic Allowance for Housing:
            </h2>

            <div className="mb-4">
                <h3 className="text-[14px] font-semibold mb-1">
                    Select Pay Grade:
                </h3>

                <PayGradeDropdown
                    selectedOption={payGrade}
                    setSelectedOption={setPayGrade}
                />
            </div>

            <div className="flex justify-between">
                <p className="font-semibold">Zip Code:</p>
                <p>{zipClickedInfo.ZCTA}</p>
            </div>

            <div className="flex justify-between">
                <p className="font-semibold">MHA Code:</p>
                <p>{zipClickedInfo.mha}</p>
            </div>

            <div className="flex justify-between">
                <p className="font-semibold">MHA Name:</p>
                <p>{zipClickedInfo.mha_name}</p>
            </div>

            <p className="font-semibold mb-1 border-b-[1px] border-black pb-1">
                Rates:
            </p>

            <div className="flex flex-col px-3">
                {/* Find the pay grade in the bah array */}
                {zipClickedInfo.bah && (
                    (() => {
                        const bahEntry = zipClickedInfo.bah.find(entry => entry[payGrade]); // Search for the pay grade
                        const bahValues = bahEntry ? bahEntry[payGrade] : undefined; // Get the values

                        if (!bahValues) {
                            return <p className="text-red-500">No BAH data available for this pay grade</p>;
                        }

                        return (
                            <>
                                <div className="flex justify-between">
                                    <p className="font-semibold">With Dependents:</p>
                                    <p>
                                        {bahValues[0] !== "NULL"
                                            ? USDollar.format(bahValues[0] as number)
                                            : ""}
                                    </p>
                                </div>

                                <div className="flex justify-between">
                                    <p className="font-semibold">Without Dependents:</p>
                                    <p>
                                        {bahValues[1] !== "NULL"
                                            ? USDollar.format(bahValues[1] as number)
                                            : ""}
                                    </p>
                                </div>
                            </>
                        );
                    })()
                )}
            </div>
        </div>
    );
}

export default BAH;
