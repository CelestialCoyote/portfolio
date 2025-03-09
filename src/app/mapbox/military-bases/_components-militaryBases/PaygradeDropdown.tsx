import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";


const payGrades = [
    { id: 0, label: "E-1", value: "E01" },
    { id: 1, label: "E-2", value: "E02" },
    { id: 2, label: "E-3", value: "E03" },
    { id: 3, label: "E-4", value: "E04" },
    { id: 4, label: "E-5", value: "E05" },
    { id: 5, label: "E-6", value: "E06" },
    { id: 6, label: "E-7", value: "E07" },
    { id: 7, label: "E-8", value: "E08" },
    { id: 8, label: "E-9", value: "E09" },
    { id: 9, label: "W-1", value: "W01" },
    { id: 10, label: "W-2", value: "W02" },
    { id: 11, label: "W-3", value: "W03" },
    { id: 12, label: "W-4", value: "W04" },
    { id: 13, label: "W-5", value: "W05" },
    { id: 14, label: "O-1E", value: "O01E" },
    { id: 15, label: "O-2E", value: "O02E" },
    { id: 16, label: "O-3E", value: "O03E" },
    { id: 17, label: "O-1", value: "O01" },
    { id: 18, label: "O-2", value: "O02" },
    { id: 19, label: "O-3", value: "O03" },
    { id: 20, label: "O-4", value: "O04" },
    { id: 21, label: "O-5", value: "O05" },
    { id: 22, label: "O-6", value: "O06" },
    { id: 23, label: "O-7", value: "O07" }
];

interface PaygradeDropdownProps {
    selectedOption: string;
    setSelectedOption: (option: string) => void;
  }
  

  const PaygradeDropdown: React.FC<PaygradeDropdownProps> = ({ selectedOption, setSelectedOption }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        setIsOpen(false);
    }

    return (
        <div className="relative inline-block text-black text-[14px] border-2 w-full border-black rounded-lg">
            <div
                className="flex bg-white items-center justify-between px-2 py-1 rounded-lg cursor-pointer"
                onClick={toggleDropdown}
            >
                <span>
                    {selectedOption}
                </span>

                <FaChevronDown
                    className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </div>

            {isOpen && (
                <div className="absolute left-0 bg-white w-full mt-1 max-h-[90px] border-2 border-black rounded-lg shadow-lg overflow-auto z-10">
                    {payGrades.map((option, id) => (
                        <div
                            key={id}
                            className="px-2 py-1 cursor-pointer hover:bg-gray-200"
                            onClick={() => handleOptionClick(option.value)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default PaygradeDropdown;
