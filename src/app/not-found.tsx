import Link from "next/link";
import "../styles/globals.css";
export default function NotFound() {
    return (
        <div className="w-screen h-screen text-white flex flex-col items-center justify-center px-4">
            <p className="text-5xl md:text-7xl font-bold font-Bodoni mb-2 mt-[50px]">4O4</p>
            <p className="text-3xl md:text-5xl font-Apparel text-center mb-[75px]">How did you get way out here?</p>

            <Link
                href="/"
                className="font-Bodoni text-xl md:text-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 px-8 py-4 rounded-[50px] transition-all duration-300 hover:shadow-[0_0_15px_-1px_rgba(139,92,246,1)]"
            >
                Return Home
            </Link>

        </div>
    );
}