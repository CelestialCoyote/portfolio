import React, { useState, useEffect } from "react";


interface CalendarProps {
	setSelectedDate: (date: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ setSelectedDate }) => {
    const startYear = 2015;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    const [yearInput, setYearInput] = useState(currentYear.toString());
    const [monthInput, setMonthInput] = useState(
        currentMonth < 10 ? `0${currentMonth}` : currentMonth.toString()
    );
    const [dayInput, setDayInput] = useState(
        currentDay < 10 ? `0${currentDay}` : currentDay.toString()
    );

    // Function to determine the number of days in a given month
    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month, 0).getDate(); // Last day of previous month
    }

    // Adjust available days based on selected month/year
    useEffect(() => {
        const daysInSelectedMonth = getDaysInMonth(
            parseInt(yearInput),
            parseInt(monthInput)
        );

        if (parseInt(dayInput) > daysInSelectedMonth) {
            setDayInput(daysInSelectedMonth.toString().padStart(2, "0"));
        }
    }, [yearInput, monthInput, dayInput]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const selectedDate = `${yearInput}-${monthInput}-${dayInput}`;
        
        console.log("Selected Date:", selectedDate);
        setSelectedDate(selectedDate);
    }

    return (
        <form onSubmit={handleSubmit} className="flex justify-center p-4 gap-2">
            {/* Year Selection */}
            <select
                name="year"
                className="bg-purple-500 text-white text-center w-[75px] rounded-lg p-2 hover:bg-purple-700"
                value={yearInput}
                onChange={(e) => setYearInput(e.target.value)} 
            >
                {Array.from(
                    { length: currentYear - startYear + 1 },
                    (_, i) => startYear + i
                ).map((year) => (
                    <option value={year} key={year}>
                        {year}
                    </option>
                ))}
            </select>

            {/* Month Selection */}
            <select
                name="month"
                className="bg-purple-500 text-white text-center w-[75px] rounded-lg p-2 hover:bg-purple-700"
                value={monthInput}
                onChange={(e) => setMonthInput(e.target.value)}
            >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <option
                        value={month < 10 ? `0${month}` : month}
                        key={month}
                    >
                        {month < 10 ? `0${month}` : month}
                    </option>
                ))}
            </select>

            {/* Day Selection */}
            <select
                name="day"
                className="bg-purple-500 text-white text-center w-[75px] rounded-lg p-2 hover:bg-purple-700"
                value={dayInput}
                onChange={(e) => setDayInput(e.target.value)}
            >
                {Array.from(
                    { length: getDaysInMonth(parseInt(yearInput), parseInt(monthInput)) },
                    (_, i) => i + 1
                ).map((day) => (
                    <option value={day < 10 ? `0${day}` : day} key={day}>
                        {day < 10 ? `0${day}` : day}
                    </option>
                ))}
            </select>

            <button
                type="submit"
                className="bg-black text-white text-center w-[90px] border-purple-500 border-2 rounded-lg px-4 py-2 hover:bg-purple-700"
            >
                Submit
            </button>
        </form>
    );
}

export default Calendar;
