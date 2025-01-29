"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight, FaClipboardList } from 'react-icons/fa';
// import data from './epic-2025-01-27.json';
import data from './epic-2021-02-11.json';


const calculateDistance = (vector: { x: number, y: number, z: number }) => {
    return Math.sqrt(vector.x ** 2 + vector.y ** 2 + vector.z ** 2);
};


const Epic: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const epicData = data;

    const earthToSun = calculateDistance(epicData[currentIndex].sun_j2000_position);
    const earthToMoon = calculateDistance(epicData[currentIndex].lunar_j2000_position);
    const earthToEpic = calculateDistance(epicData[currentIndex].dscovr_j2000_position);

    if (!epicData || epicData.length === 0) return <p>No photo data</p>;

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? epicData.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === epicData.length - 1 ? 0 : prevIndex + 1));
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString + 'Z'); // Ensure it's treated as UTC

        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZone: "UTC",
            timeZoneName: "short"
        }).format(date);
    }

    return (
        <div className="flex flex-col">
            <div className="flex px-[10px]">
                <div className="relative flex items-center justify-center w-1/2">
                    <button
                        className="absolute left-0 z-10 mx-[10px] p-2 bg-purple-500 text-white rounded-full hover:bg-purple-600"
                        onClick={handlePrevious}
                    >
                        <FaChevronLeft />
                    </button>

                    <div className="flex w-full border-2 border-purple-400 rounded-lg">
                        <Image
                            className="w-auto h-auto p-2"
                            src={`https://epic.gsfc.nasa.gov/archive/natural/${epicData[currentIndex].date.slice(0, 4)}/${epicData[currentIndex].date.slice(5, 7)}/${epicData[currentIndex].date.slice(8, 10)}/png/${epicData[currentIndex].image}.png`}
                            alt={'epic image'}
                            placeholder="blur"
                            blurDataURL={`https://epic.gsfc.nasa.gov/archive/natural/${epicData[currentIndex].date.slice(0, 4)}/${epicData[currentIndex].date.slice(5, 7)}/${epicData[currentIndex].date.slice(8, 10)}/png/${epicData[currentIndex].image}.png`}
                            width={500}
                            height={500}
                            sizes="100vh"
                        />
                    </div>

                    <button
                        className="absolute right-0 z-10 mx-[10px] p-2 bg-purple-500 text-white rounded-full hover:bg-purple-600"
                        onClick={handleNext}
                    >
                        <FaChevronRight />
                    </button>
                </div>

                <div className="flex flex-col justify-between w-1/2 px-4">
                    <div>
                        <div className="flex justify-center items-center h-[40px] bg-purple-500 text-white rounded">
                            <h2 className="text-xl text-center font-bold">
                                {formatDate(epicData[currentIndex].date)}
                            </h2>
                        </div>

                        <h2 className="flex items-center justify-center text-2xl font-bold my-4">
                            <FaClipboardList className='mr-2 text-primary' /> Image Data
                        </h2>

                        <div className="mt-4">
                            <div className="flex flex-col items-center my-4">
                                <p className="font-bold">Earth-Sun Distance:</p>
                                <p>{earthToSun.toLocaleString()} km</p>
                            </div>

                            <div className="flex flex-col items-center my-4">
                                <p className="font-bold">Earth-Moon Distance:</p>
                                <p>{earthToMoon.toLocaleString()} km</p>
                            </div>

                            <div className="flex flex-col items-center my-4">
                                <p className="font-bold">Earth-EPIC Distance:</p>
                                <p>{earthToEpic.toLocaleString()} km</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center mt-6 space-x-4 overflow-x-auto">
                {epicData.map((epic, index) => (
                    <button
                        key={epic.identifier}
                        onClick={() => setCurrentIndex(index)}
                        className={
                            `flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2
                            ${index === currentIndex ? 'border-purple-500' : 'border-gray-300'}`
                        }
                    >
                        <Image
                            src={`https://epic.gsfc.nasa.gov/archive/natural/${epic.date.slice(0, 4)}/${epic.date.slice(5, 7)}/${epic.date.slice(8, 10)}/thumbs/${epic.image}.jpg`}
                            alt={'thumbnail'}
                            width={80}
                            height={80}
                            className="object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Epic;
