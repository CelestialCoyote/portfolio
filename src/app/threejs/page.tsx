import React from "react";
import ThreeBox from "@/components/ThreeJSTest/ThreeJSTest";


const ThreeJS: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-[calc(100vh-96px)]">
            <ThreeBox />
        </div>
    );
}

export default ThreeJS;