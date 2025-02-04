import Link from "next/link";


type ControlPanelProps = {
	startTime: number; // Timestamp in milliseconds
	endTime: number; // Timestamp in milliseconds
	onChangeTime: (time: number) => void;
	allDays: boolean;
	onChangeAllDays: (value: boolean) => void;
	selectedTime: number; // Timestamp in milliseconds
};

const formatTime = (time: number): string => {
	const date = new Date(time);
	return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

export default function ControlPanel({
	startTime,
	endTime,
	onChangeTime,
	allDays,
	onChangeAllDays,
	selectedTime,
}: ControlPanelProps) {
	const day = 24 * 60 * 60 * 1000; // One day in milliseconds
	const days = Math.round((endTime - startTime) / day); // Total number of days
	const selectedDay = Math.round((selectedTime - startTime) / day); // Current selected day

	const onSelectDay = (evt: React.ChangeEvent<HTMLInputElement>): void => {
		const daysToAdd = parseInt(evt.target.value, 10);
		const newTime = startTime + daysToAdd * day;
		onChangeTime(newTime);
	};

	return (
		<div className="bg-slate-300 text-black w-84 rounded-lg p-4">
			<h3 className="text-2xl font-bold mb-1">Earthquakes:</h3>

			<p className="text-black text-lg mb-2">
				Map showing earthquakes from
				<br />
				<b>{formatTime(startTime)}</b> to <b>{formatTime(endTime)}</b>.
			</p>

			<hr className="border-black border-2 my-2" />

			<div className="flex items-center gap-x-4">
				<label>All Days</label>

				<input
					type="checkbox"
					name="allday"
					checked={allDays}
					onChange={(evt) => onChangeAllDays(evt.target.checked)}
				/>
			</div>

			<div className={`flex items-center ${allDays ? "opacity-50" : ""}`}>
				<label className="w-48">
					Each Day: {formatTime(selectedTime)}
				</label>

				<input
					type="range"
					disabled={allDays}
					min={1}
					max={days}
					value={selectedDay}
					step={1}
					onChange={onSelectDay}
				/>
			</div>

			<hr className="border-black border-2 my-2" />

			<p className="text-black mt-2">
				Data source:{" "}
				<Link href="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson">
					earthquakes.geojson
				</Link>
			</p>
		</div>
	);
}







// import Link from "next/link";


// const formatTime = (time) => {
//     const date = new Date(time);

//     return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
// };


// export default function ControlPanel(props) {
//     const { startTime, endTime, onChangeTime, allDays, onChangeAllDays, selectedTime } = props;
//     const day = 24 * 60 * 60 * 1000;
//     const days = Math.round((endTime - startTime) / day);
//     const selectedDay = Math.round((selectedTime - startTime) / day);

//     const onSelectDay = evt => {
//         const daysToAdd = evt.target.value;
//         // add selected days to start time to calculate new time
//         const newTime = startTime + daysToAdd * day;
//         onChangeTime(newTime);
//     };

//     return (
//         <div className="bg-slate-300 text-black w-84 rounded-lg p-4">
//             <h3>Earthquakes</h3>

//             <p className="text-black mb-2">
//                 Map showing earthquakes from
//                 <br />
//                 <b>{formatTime(startTime)}</b> to <b>{formatTime(endTime)}</b>.
//             </p>

//             <hr className="border-black border-2 my-2" />

//             <div className="">
//                 <label>All Days</label>

//                 <input
//                     type="checkbox"
//                     name="allday"
//                     checked={allDays}
//                     onChange={evt => onChangeAllDays(evt.target.checked)}
//                 />
//             </div>

//             <div className={`flex items-center ${allDays ? 'disabled' : ''}`}>
//                 <label className="w-48">
//                     Each Day: {formatTime(selectedTime)}
//                 </label>

//                 <input
//                     type="range"
//                     disabled={allDays}
//                     min={1}
//                     max={days}
//                     value={selectedDay}
//                     step={1}
//                     onChange={onSelectDay}
//                 />
//             </div>

//             <hr className="border-black border-2 my-2" />

//             <p className="text-black mt-2">
//                 Data source:{' '}
//                 <Link href="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson">
//                     earthquakes.geojson
//                 </Link>
//             </p>
//         </div>
//     );
// };
