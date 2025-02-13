import type { Metadata } from "next";
import Navbar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import "./globals.css";


export const metadata: Metadata = {
    title: "Paul Stearns Portfolio",
    description: "Full Stack Developer portfolio",
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className="flex flex-col w-screen h-screen antialiased">
                <Navbar />

                <main className="overflow-y-auto mt-[64px]">
                    {children}
                </main>

                <Footer />
            </body>
        </html>
    );
}
