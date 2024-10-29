'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const links = ['Home', 'Projects', 'About'];
    const pathname = usePathname();

    const [activeIndex, setActiveIndex] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const cornerBorderRadius = '20px';
    const borderRadius = '10px';

    useEffect(() => {
        const newIndex = links.findIndex((link) => {
            const href = `/${link === 'Home' ? '' : link.toLowerCase()}`;
            return pathname === href || (pathname === '/' && link === 'Home') || (link === 'Projects' && pathname?.startsWith('/projects'));
        });

        setActiveIndex(newIndex === -1 ? 0 : newIndex);
        setHoveredIndex(newIndex === -1 ? 0 : newIndex);
    }, [pathname]);

    return (
        <nav className="fixed top-8 inset-x-0 z-50 mx-auto w-max">
            <div className="hidden shadow-lg sm:block bg-transparentDarkGray backdrop-blur-md text-white rounded-[50px] px-2 py-1 border-[0.1px] border-semiDarkGray">
                <div className="relative flex items-center px-1 py-[4px] justify-between w-[300px]">
                    <div
                        className="absolute inset-y-1 left-0 bg-semiDarkGray transition-all duration-300 ease-in-out border-[0.5px] border-gray-500/50"
                        style={{
                            width: `${100 / links.length}%`,
                            transform: `translateX(${hoveredIndex * 100}%)`,
                            borderTopLeftRadius:
                                hoveredIndex === 0 ? cornerBorderRadius : borderRadius,
                            borderBottomLeftRadius:
                                hoveredIndex === 0 ? cornerBorderRadius : borderRadius,
                            borderTopRightRadius:
                                hoveredIndex === links.length - 1
                                    ? cornerBorderRadius
                                    : borderRadius,
                            borderBottomRightRadius:
                                hoveredIndex === links.length - 1
                                    ? cornerBorderRadius
                                    : borderRadius,
                        }}
                    ></div>

                    {links.map((link, index) => {
                        const href = `/${link === 'Home' ? '' : link.toLowerCase()}`;
                        return (
                            <div key={index} className="flex-1 text-center relative z-10">
                                <Link
                                    href={href}
                                    className="block py-2 text-sm"
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(activeIndex)}
                                >
                                    {link}
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="flex flex-col sm:hidden items-center">
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="bg-darkGray shadow-lg text-white rounded-[50px] px-5 py-3 border-[0.5px] border-semiDarkGray text-lg"
                >
                    Menu
                </button>
                <div
                    className={`mt-2 shadow-lg bg-transparentDarkGray text-white border-semiDarkGray rounded-[15px] w-[200px] transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-[1000px] border-[0.4px] backdrop-blur-md' : 'max-h-0'}`}
                >
                    {links.map((link, index) => {
                        const href = `/${link === 'Home' ? '' : link.toLowerCase()}`;
                        return (
                            <div key={index} className={`px-6 ${index === 0 ? 'pt-4' : 'pt-2'} ${index === 2 ? 'pb-4' : 'pb-2'}`}>
                                <Link href={href} onClick={() => setMenuOpen(false)}>
                                    {link}
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
