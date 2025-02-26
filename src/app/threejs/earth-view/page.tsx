import React from "react";
import TitleDescription from "@/components/TitleDescription/TitleDescription";
import EarthViewCanvas from "./EarthViewCanvas";


export const metadata = {
    title: "Three.js Earth model",
    description: "3D model of Earth created with Three.js and custom shaders."
}

const EarthView: React.FC = () => {
    return (
        <div className="flex flex-col h-[calc(100vh-96px)]">
            <TitleDescription
                title="Three.js Earth Model"
                description={
                    <div>
                        <p>Model of Earth created with Three.js library.  Uses custom shaders to render Earth and atmosphere.</p>
                        
                        <p>Added pole markers to show axis of rotation as well as background starfield.</p>
                    </div>
                }
            />

            <EarthViewCanvas />
        </div>
    );
}

export default EarthView;