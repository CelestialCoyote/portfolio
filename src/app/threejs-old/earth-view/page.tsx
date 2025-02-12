import React from "react";
import EarthViewCanvas from "./EarthViewCanvas";


const EarthView: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-[calc(100vh-96px)]">
            <EarthViewCanvas />
        </div>
    );
}

export default EarthView;