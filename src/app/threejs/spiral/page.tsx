import React from "react";
import TitleDescription from "@/components/TitleDescription/TitleDescription";
import SpiralCanvas from "./SpiralCanvas";


export const metadata = {
    title: "Three.js Spiral on a plane",
    description: "Spiral pattern on a plane created with fragment shader."
}

export default function SpiralPage() {
    return (
        <div className="flex flex-col h-[calc(100vh-96px)]">
            <TitleDescription
                title="Spiral on a Plane"
                description={
                    <div>
                        <p>Spiral pattern mapped to a plane using a fragment shader to create pattern and colors.</p>
                    </div>
                }
            />

            <SpiralCanvas />
        </div>
    );
}
