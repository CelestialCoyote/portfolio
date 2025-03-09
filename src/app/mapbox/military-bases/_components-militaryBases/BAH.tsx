import React, { useState } from "react";
import PayGradeDropdown from "../_components-militaryBases/PaygradeDropdown";
import { ZipClickedInfo } from "../_types-militaryBases/militaryBasesTypes";


interface BAHProps {
    zipClickedInfo: ZipClickedInfo | null;
    setZipClickedInfo: React.Dispatch<React.SetStateAction<ZipClickedInfo | null>>;
}

const BAH: React.FC<BAHProps> = ({ zipClickedInfo, setZipClickedInfo }) => {
    const [payGrade, setPayGrade] = useState("E05");

    // Set currency format.
    const USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    if (!zipClickedInfo) return null;

    return (
        <div
            className="absolute bg-white w-[260px] rounded-lg border-2 border-black p-2 cursor-move"
            style={{ boxShadow: `20px 20px 15px rgb(0 0 0 / 0.5)` }}
        >
            <p
                className="absolute top-[-12px] right-[-12px] flex items-center justify-center bg-white text-black
                    w-[25px] h-[25px] border-2 border-gray-500 rounded-full hover:bg-slate-300 hover:text-black cursor-pointer"
                onClick={() => setZipClickedInfo(null)}
            >
                ✖
            </p>

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
                    <p className="justify-end">{zipClickedInfo.ZCTA}</p>
                </div>

                <div className="flex justify-between">
                    <p className="font-semibold">MHA Code:</p>
                    <p>{zipClickedInfo.mha}</p>
                </div>

                <div className="flex flex-col">
                    <p className="font-semibold">MHA Name:</p>
                    <p className="ml-2">{zipClickedInfo.mha_name}</p>
                </div>

                <p className="font-semibold mb-1 border-b-[1px] border-black pb-1">
                    Rates:
                </p>

                <div className="flex flex-col px-3">
                    {zipClickedInfo.bah && (
                        (() => {
                            const bahEntry = zipClickedInfo.bah.find(entry => entry[payGrade]);
                            const bahValues = bahEntry ? bahEntry[payGrade] : undefined;

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
        </div>
    );
}

export default BAH;
