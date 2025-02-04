import React from "react";
import DatePicker from "react-datepicker";
import { MdKeyboardArrowLeft, MdKeyboardDoubleArrowLeft,
    MdKeyboardArrowRight, MdKeyboardDoubleArrowRight } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";
import "./date-picker.css";

interface CustomDatePickerProps {
    selectedDate: Date | null;
    onChange: (date: Date | null) => void;
    minDate?: Date | null;
    maxDate?: Date | null;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ selectedDate, onChange, minDate, maxDate }) => {
    return (
        <DatePicker
            className="custom-datepicker"
            minDate={minDate || undefined}
            maxDate={maxDate || undefined}
            isClearable
            showYearDropdown
            dateFormat="yyyy-MM-dd"
            placeholderText="Choose a date"
            selected={selectedDate}
            onChange={onChange}
            renderCustomHeader={({
                date,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
                decreaseYear,
                increaseYear
            }) => (
                <div className="flex justify-between items-center bg-purple-400 text-black px-4 py-2">
                    {/* << Button (Previous Year) */}
                    <button onClick={decreaseYear} className="text-2xl font-bold">
                        <MdKeyboardDoubleArrowLeft />
                    </button>

                    {/* < Button (Previous Month) */}
                    <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled} className="text-2xl font-bold">
                        <MdKeyboardArrowLeft />
                    </button>

                    {/* Current Month & Year */}
                    <span className="font-semibold">
                        {date.toLocaleString("default", { month: "long" })} {date.getFullYear()}
                    </span>

                    {/* > Button (Next Month) */}
                    <button onClick={increaseMonth} disabled={nextMonthButtonDisabled} className="text-2xl font-bold">
                        <MdKeyboardArrowRight />
                    </button>

                    {/* >> Button (Next Year) */}
                    <button onClick={increaseYear} className="text-2xl font-bold">
                        <MdKeyboardDoubleArrowRight />
                    </button>
                </div>
            )}
        />
    );
}

export default CustomDatePicker;
