import React from "react";
import TitleDescription from "@/components/TitleDescription/TitleDescription";
import AbstractGeneratorCanvas from "./AbstractGeneratorCanvas";


export const metadata = {
    title: "Abstract Pattern Generator",
    description: "Pattern generator based on analog system used for laser shows."
}

export default function SineWavePage() {
	return (
		<div className="flex flex-col h-[calc(100vh-96px)]">
            <TitleDescription
                title="Abstract Generator"
                description={
                    <div>
                        <p>Abstract pattern generator based on analog systems used to create laser shows.</p>
                        
                        <p>Can create classic Lissajous Patterns using single oscillator.</p>

						<p>More complex patterns can be created using second oscillator.  To engage, increase amplitude to a value greater than 0.</p>
                    </div>
                }
            />

			<div className="w-full h-full p-[50px]">
				<AbstractGeneratorCanvas />
			</div>
		</div>
	);
}
