import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiCamera, FiGlobe, FiHome, FiImage, FiInfo } from "react-icons/fi";


// Define the props interface explicitly
interface NasaSidebarProps {
    currentIndex: number;
}

const NasaSidebar: React.FC<NasaSidebarProps> = ({ currentIndex }) => {
    return (
        <div className='fixed top-0 left-0 w-[275px] h-[calc(100vh-96px)] mt-[64px] z-20'>
            <div className='flex flex-col h-full bg-black'>
                <div className='flex flex-col flex-1 p-2 pt-4 overflow-y-auto'>
                    <div className="flex flex-col items-center">
                        <div className="flex justify-center h-[100px]">
                            <Image
                                className="w-full h-full object-contain"
                                src="/images/NASA_logo.svg"
                                alt="NASA logo"
                                placeholder="blur"
                                blurDataURL="/images/NASA_logo.svg"
                                width="0"
                                height="0"
                                sizes="100vh"
                            />
                        </div>

                        <span className='text-xl font-bold'>
                            NASA API Explorer
                        </span>
                    </div>

                    <nav className='flex-1 mt-5' aria-label='Sidebar'>
                        <div className='px-2 space-y-1'>
                            <Link
                                href='/'
                                className={
                                    `flex items-center px-2 py-2 text-sm font-medium rounded-md group hover:text-primary
                                        ${currentIndex === 0 ? 'text-white' : 'text-primary-light'}`
                                }
                            >
                                <FiHome className='flex-shrink-0 w-6 h-6 mr-3' />
                                Home
                            </Link>

                            <Link
                                href='/nasa'
                                className={
                                    `flex items-center px-2 py-2 text-sm font-medium rounded-md group hover:text-primary
                                        ${currentIndex === 1 ? 'text-white' : 'text-primary-light'}`
                                }
                            >
                                <FiInfo className='flex-shrink-0 w-6 h-6 mr-3' />
                                About the APIs
                            </Link>

                            <Link
                                href='/nasa/apod'
                                className={
                                    `flex items-center px-2 py-2 text-sm font-medium rounded-md group hover:text-primary
                                        ${currentIndex === 4 ? 'text-white' : 'text-primary-light'}`
                                }
                            >
                                <FiCamera className='flex-shrink-0 w-6 h-6 mr-3' />
                                Astronomy Picture of the Day
                            </Link>

                            <Link
                                href='/nasa/image-library'
                                className={
                                    `flex items-center px-2 py-2 text-sm font-medium rounded-md group hover:text-primary
                                        ${currentIndex === 2 ? 'text-white' : 'text-primary-light'}`
                                }
                            >
                                <FiImage className='flex-shrink-0 w-6 h-6 mr-3' />
                                Image Library
                            </Link>

                            <Link
                                href='/nasa/epic'
                                className={
                                    `flex items-center px-2 py-2 text-sm font-medium rounded-md group hover:text-primary
                                        ${currentIndex === 3 ? 'text-white' : 'text-primary-light'}`
                                }
                            >

                                <FiGlobe className='flex-shrink-0 w-6 h-6 mr-3' />
                                Earth Polychromatic Imaging Camera
                            </Link>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default NasaSidebar;
