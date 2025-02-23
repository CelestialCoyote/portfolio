import AbstractGeneratorCanvas from "./AbstractGeneratorCanvas";


export default function SineWavePage() {
	return (
		<div className="flex w-full h-[calc(100vh-96px)]">
			<div className="w-full h-full p-[50px]">
				<AbstractGeneratorCanvas />
			</div>
		</div>
	);
}
