import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa6";




const Footer: React.FC = () => {
    const today = new Date();

    return (
        <footer className="fixed left-0 bottom-0 flex justify-center items-center bg-gray-800 w-full h-[32px] p-2 z-50">
            <p>
                Copyright &copy; {today.getFullYear()}
            </p>

            <div className="flex ml-[32px] space-x-[12px]">
                <Link
                    href="https://www.linkedin.com/in/paul-stearns/"
                    target="_blank"
                >
                    <FaLinkedin />
                </Link>

                <Link
                    href="https://github.com/CelestialCoyote/"
                    target="_blank"
                >
                    <FaGithub />
                </Link>
            </div>
        </footer>
    );
}

export default Footer;