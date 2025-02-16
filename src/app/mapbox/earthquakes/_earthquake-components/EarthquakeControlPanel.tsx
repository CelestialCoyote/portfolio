// import { useState, useEffect } from "react";
// import Link from "next/link";


// type ControlPanelProps = {
// 	startTime: number; // Timestamp in milliseconds
// 	endTime: number; // Timestamp in milliseconds
// 	selectedTime: number; // Timestamp in milliseconds
// 	allDays: boolean;
// 	onChangeTime: (time: number) => void;
// 	onChangeAllDays: (value: boolean) => void;
// }

// const formatTime = (time: number): string => {
// 	const date = new Date(time);

// 	return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
// }

// const EarthquakeControlPanel: React.FC<ControlPanelProps> = ({
// 	startTime,
// 	endTime,
// 	selectedTime,
// 	allDays,
// 	onChangeTime,
// 	onChangeAllDays,
// }: ControlPanelProps) => {
// 	const day = 24 * 60 * 60 * 1000; // One day in milliseconds
// 	const days = Math.round((endTime - startTime) / day); // Total number of days
// 	const selectedDay = Math.round((selectedTime - startTime) / day); // Current selected day

// 	const [isPlaying, setIsPlaying] = useState(false);

// 	// Updates the selected day when the play button is pressed
// 	useEffect(() => {
// 		if (!isPlaying) return;

// 		const interval = setInterval(() => {
// 			onChangeTime((prevTime: number) => {
// 				const nextDay = Math.round((prevTime - startTime) / day) + 1;

// 				return startTime + (nextDay % days) * day; // Loops back to 1st day
// 			});
// 		}, 1000);

// 		return () => clearInterval(interval);
// 	}, [isPlaying, startTime, day, days, onChangeTime]);

// 	// Handles manual selection of a day
// 	const onSelectDay = (evt: React.ChangeEvent<HTMLInputElement>): void => {
// 		const daysToAdd = parseInt(evt.target.value, 10);
// 		const newTime = startTime + daysToAdd * day;

// 		onChangeTime(newTime);
// 	};

// 	// Toggles play/pause
// 	const togglePlay = () => {
// 		setIsPlaying((prev) => !prev);
// 	};

// 	return (
// 		<div className="bg-white/35 backdrop-blur-md shadow-lg rounded-lg p-4 w-84">
// 			<div className="text-center">
// 				<h3 className="text-2xl font-bold mb-1">Earthquakes:</h3>

// 				<p className="text-lg mb-2">Showing earthquakes from</p>
				
// 				<p className="text-lg font-bold mb-2">
// 					{formatTime(startTime)} to {formatTime(endTime)}
// 				</p>
// 			</div>

// 			<hr className="border-white border-2 my-2" />

// 			<div className="flex justify-evenly mb-2">
// 				<label
// 					htmlFor="allDays"
// 					className={`px-[10px] py-[5px] rounded-lg cursor-pointer transition-all ${
// 						allDays ? "bg-blue-500 text-white shadow-md" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
// 					}`}
// 				>
// 					<input
// 						type="radio"
// 						id="allDays"
// 						name="daySelection"
// 						className="hidden"
// 						checked={allDays}
// 						onChange={() => onChangeAllDays(true)}
// 					/>
// 					Show All Days
// 				</label>

// 				<label
// 					htmlFor="singleDay"
// 					className={`px-[10px] py-[5px] rounded-lg cursor-pointer transition-all ${
// 						!allDays ? "bg-blue-500 text-white shadow-md" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
// 					}`}
// 				>
// 					<input
// 						type="radio"
// 						id="singleDay"
// 						name="daySelection"
// 						className="hidden"
// 						checked={!allDays}
// 						onChange={() => onChangeAllDays(false)}
// 					/>
// 					Show Each Day
// 				</label>
// 			</div>

// 			<div
// 				className={`flex flex-col items-center text-[14px] transition-opacity ${
// 					allDays ? "opacity-50" : "opacity-100"
// 				}`}
// 			>
// 				<label className="mb-2">{formatTime(selectedTime)}</label>

// 				<div className="flex items-center w-full gap-2">
// 					{/* Play Button */}
// 					<button
// 						onClick={togglePlay}
// 						className={`px-4 py-2 rounded-md font-bold transition-all ${
// 							isPlaying ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
// 						}`}
// 					>
// 						{isPlaying ? "Stop" : "Play"}
// 					</button>

// 					{/* Slider */}
// 					<input
// 						type="range"
// 						className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer transition hover:bg-gray-400"
// 						min={1}
// 						max={days}
// 						value={selectedDay}
// 						onChange={onSelectDay}
// 						disabled={isPlaying || allDays} // Disabled when playing
// 					/>
// 				</div>
// 			</div>

// 			<hr className="border-white border-2 my-2" />

// 			<p className="flex flex-col mt-2">
// 				Data source:
// 				<Link
// 					href="https://www.usgs.gov/programs/earthquake-hazards"
// 					className="text-blue-200 hover:bg-blue-600"
// 					target="_blank"
// 				>
// 					https://www.usgs.gov/programs/earthquake-hazards
// 				</Link>
// 			</p>
// 		</div>
// 	);
// }

// export default EarthquakeControlPanel;





import Link from "next/link";


type ControlPanelProps = {
	startTime: number; // Timestamp in milliseconds
	endTime: number; // Timestamp in milliseconds
	onChangeTime: (time: number) => void;
	allDays: boolean;
	onChangeAllDays: (value: boolean) => void;
	selectedTime: number; // Timestamp in milliseconds
}

const formatTime = (time: number): string => {
	const date = new Date(time);
	return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}


const EarthquakeControlPanel: React.FC<ControlPanelProps> = ({
	startTime,
	endTime,
	selectedTime,
	allDays,
	onChangeTime,
	onChangeAllDays,
}: ControlPanelProps) => {
	const day = 24 * 60 * 60 * 1000; // One day in milliseconds
	const days = Math.round((endTime - startTime) / day); // Total number of days
	const selectedDay = Math.round((selectedTime - startTime) / day); // Current selected day

	const onSelectDay = (evt: React.ChangeEvent<HTMLInputElement>): void => {
		const daysToAdd = parseInt(evt.target.value, 10);
		const newTime = startTime + daysToAdd * day;

		onChangeTime(newTime);
	}

	return (
		<div className="bg-white/35 backdrop-blur-md w-[325px] h-[300px] shadow-lg rounded-lg p-4">
			<div className="text-center">
				<h3 className="text-2xl font-bold mb-1">
					Earthquakes:
				</h3>

				<p className="text-lg mb-2">
					Showing earthquakes from
				</p>

				<p className="text-lg font-bold mb-2">
					{formatTime(startTime)} to {formatTime(endTime)}
				</p>
			</div>

			<hr className="border-white border-2 my-2" />

			<div className="flex justify-evenly mb-2">
				<label
					htmlFor="allDays"
					className={
						`px-[10px] py-[5px] rounded-lg cursor-pointer transition-all
						${allDays ? "bg-blue-500 text-white shadow-md" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`
					}
				>
					<input
						type="radio"
						id="allDays"
						name="daySelection"
						className="hidden"
						checked={allDays}
						onChange={() => onChangeAllDays(true)}
					/>
					Show All Days
				</label>

				<label
					htmlFor="singleDay"
					className={
						`px-[10px] py-[5px] rounded-lg cursor-pointer transition-all
						${!allDays ? "bg-blue-500 text-white shadow-md" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`
					}
				>
					<input
						type="radio"
						id="singleDay"
						name="daySelection"
						className="hidden"
						checked={!allDays}
						onChange={() => onChangeAllDays(false)}
					/>
					Show Each Day
				</label>
			</div>

			<div className={`flex flex-col items-center text-[14px] transition-opacity ${allDays ? "opacity-50" : "opacity-100"}`}>
				<label className="mb-2">
					{formatTime(selectedTime)}
				</label>

				<input
					type="range"
					className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer transition hover:bg-gray-400"
					min={1}
					max={days}
					value={selectedDay}
					onChange={onSelectDay}
					disabled={allDays}
				/>
			</div>

			<hr className="border-white border-2 my-2" />

			<p className="flex flex-col mt-2">
				Data source:

				<Link
					href="https://www.usgs.gov/programs/earthquake-hazards"
					className="text-blue-200 hover:bg-blue-600"
					target="_blank"
				>
					https://www.usgs.gov/programs/earthquake-hazards
				</Link>
			</p>
		</div>
	);
}

export default EarthquakeControlPanel;
