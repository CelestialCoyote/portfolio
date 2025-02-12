import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import Technologies from "@/components/Technologies/Technologies";
import FloatingSpheresCanvas from "./threejs/floating-spheres/FloatingSpheresCanvas";


const Home: React.FC = () => {
	return (
		<main className="flex flex-col items-center mb-12 py-16 gap-y-10">
			{/* Background Three.js Canvas */}
            <div className="fixed top-0 left-0 w-full h-full z-[-1]">
                <FloatingSpheresCanvas />
            </div>
			
			<div className="flex flex-col items-center w-full mt-10 mb-4">
				<h1 className="text-4xl font-bold mb-8">
					Paul Stearns
				</h1>

				<h2 className="text-2xl mb-4">
					Full Stack Developer
				</h2>

				<h3 className="w-[75%] text-justify">
					A results-driven Full Stack Developer with over 5 years of experience delivering high-quality software solutions, training,
					and technical support. Proven expertise in modern web development technologies, with a strong focus on user-centric
					designs and scalable, efficient systems. Known for my collaborative nature, problem-solving abilities, and commitment to
					delivering impactful, user-friendly solutions, I bring both technical expertise and a strong customer-focused mindset to all
					my endeavors.
				</h3>

				<div className="flex mt-[24px] space-x-[24px]">
					<Link
						href="https://www.linkedin.com/in/paul-stearns/"
						target="_blank"
					>
						<FaLinkedin className="w-[32px] h-[32px]"/>
					</Link>

					<Link
						href="https://github.com/CelestialCoyote/"
						target="_blank"
					>
						<FaGithub className="w-[32px] h-[32px]" />
					</Link>
				</div>
			</div>

			<Technologies />
		</main>
	);
}

export default Home;
