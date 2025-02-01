"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight, FaClipboardList } from 'react-icons/fa';
import { baseURL } from "@/app/api/baseURL";
import Calendar from '@/components/Calendar/Calendar';
import EpicSkeleton from './EpicSkeleton';
import { EpicData } from '../types/epicData';
import { calculateDistance } from '../_epic-utils/calculateDistance';
import { formatDateLong, formatDateShort } from '../_epic-utils/formatDates';
import { getEpicImageUrl } from '../_epic-utils/getEpicImageUrl';


const Epic: React.FC = () => {
    const [epicData, setEpicData] = useState<EpicData[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string | null>(null); // State for selected date


    const fetchData = async (date?: string) => {
        try {
            setLoading(true);
            setError(null);

            let apiUrl = `${baseURL}/api/nasa/epic`;
            if (date) {
                apiUrl += `?date=${date}`;
            }

            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch EPIC data');
            }

            const data = await response.json();
            setEpicData(data);

            // If no date is provided (initial fetch), set the latest available date
            if (!date && data.length > 0) {
                const latestDate = data[0].date;

                setSelectedDate(latestDate);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
    
    useEffect(() => {
        if (selectedDate) {
            console.log(selectedDate);
            fetchData(selectedDate);
        }
    }, [selectedDate]);

    if (loading) return <EpicSkeleton />;

    if (error) return <p>Error: {error}</p>;

    if (!epicData || epicData.length === 0) return <p>No photo data available</p>;

    const earthToSun = calculateDistance(epicData[currentIndex].sun_j2000_position);
    const earthToMoon = calculateDistance(epicData[currentIndex].lunar_j2000_position);
    const earthToEpic = calculateDistance(epicData[currentIndex].dscovr_j2000_position);

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? epicData.length - 1 : prevIndex - 1));
    }

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === epicData.length - 1 ? 0 : prevIndex + 1));
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
                            src={getEpicImageUrl(epicData[currentIndex], "png")}
                            alt="epic image"
                            placeholder="blur"
                            blurDataURL={getEpicImageUrl(epicData[currentIndex], "png")}
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
                        <div className="flex justify-center items-center h-[50px] bg-purple-500 text-white rounded">
                            <h2 className="text-2xl text-center font-bold">
                                {formatDateShort(epicData[currentIndex].date)}
                            </h2>
                        </div>

                        <div className="flex flex-col items-center h-[100px] mt-2">
                            <button
                                className="bg-black text-white font-bold text-center w-[150px] border-purple-500 border-2 rounded-lg px-4 py-2 hover:bg-purple-700"
                                onClick={() => setShowCalendar(prev => !prev)}
                            >
                                {showCalendar ? "Hide Calendar" : "Choose a Date"}
                            </button>

                            {showCalendar &&
                                <Calendar setSelectedDate={setSelectedDate} />
                            }
                        </div>

                        <h2 className="flex items-center justify-center text-2xl font-bold my-4">
                            <FaClipboardList className="mr-2" /> Image Data
                        </h2>

                        <div className="mt-4">
                            <div className="flex flex-col items-center my-4">
                                <p className="font-bold">Date/ Time of Image:</p>
                                <p>{formatDateLong(epicData[currentIndex].date)}</p>
                            </div>

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
                            className="object-contain"
                            src={getEpicImageUrl(epic, "jpg")}
                            alt="thumbnail"
                            width={80}
                            height={80}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Epic;
