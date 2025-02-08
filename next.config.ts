/** @type {import('next').NextConfig} */
import { NextConfig } from 'next';


const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'apod.nasa.gov',
            },
            {
                protocol: 'https',
                hostname: 'images-assets.nasa.gov',
            },
            {
                protocol: 'https',
                hostname: 'epic.gsfc.nasa.gov',
            },
            {
                protocol: 'https',
                hostname: 'www.youtube.com',
            },
            {
                protocol: 'https',
                hostname: 'www.twitter.com',
            },
        ],
    },
    webpack: (config) => {
		config.module.rules.push({
			test: /\.glsl$/,
			use: "raw-loader",
		});
		return config;
	},
}

export default nextConfig;




// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;
