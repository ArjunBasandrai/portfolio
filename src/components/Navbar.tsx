'use client';

import { useState } from 'react';
import Link from 'next/link';
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="fixed top-4 inset-x-0 z-50 bg-gray-800 text-white rounded-[50px] mx-auto w-max px-6">
            <div className="inline-flex items-center justify-center p-4">
                <div className='pr-10'>
                    <Link href="/">Home</Link>
                </div>
                <div className='pr-10'>
                    <Link href="/projects">Projects</Link>
                </div>
                <div className=''>
                    <Link href="/about">About</Link>
                </div>
            </div>
        </nav>

    );
}
