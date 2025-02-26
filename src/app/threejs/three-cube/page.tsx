import React from "react";
import TitleDescription from "@/components/TitleDescription/TitleDescription";
import ThreeCubeCanvas from "./ThreeCubeCanvas";


export const metadata = {
    title: "Three.js Cubes with shaders.",
    description: "3D cubes with custom shaders."
}

export default function ThreeCubePage() {
    return (
        <div className="flex flex-col h-[calc(100vh-96px)]">
            <TitleDescription
                title="3D Cubes"
                description={
                    <div>
                        <p>Example of 3D geometry using custom shaders for textures.</p>
                        
                        <p>Each cube has its own set of shaders to create a texture.</p>
                    </div>
                }
            />

            <ThreeCubeCanvas />
        </div>
    );
}
