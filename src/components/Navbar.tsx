'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const links = ['Home', 'Projects', 'About'];
    const pathname = usePathname();

    return (
        <nav className="fixed top-8 inset-x-0 z-50 bg-gray-900 text-white rounded-[50px] mx-auto w-max px-2 border-[0.2px] border-gray-700">
            <div className="inline-flex items-center px-1 py-[15px] justify-between w-[250px]">
                {links.map((link, index) => {
                    const href = `/${link === 'Home' ? '' :link.toLowerCase()}`;
                    const isActive = pathname === href || (pathname === '/' && link === 'Home');

                    const isFirst = index === 0;
                    const isLast = index === links.length - 1;

                    let additionalClasses = '';
                    if (isActive) {
                        if (isFirst) {
                            additionalClasses = 'rounded-l-[50px]';
                        } else if (isLast) {
                            additionalClasses = 'rounded-r-[50px]';
                        }
                    }

                    return (
                        <div key={index}>
                            <Link
                                href={href}
                                className={`px-3 py-2 rounded-md ${isActive ? `bg-gray-700 ${additionalClasses}` : ''}`}
                            >
                                {link}
                            </Link>
                        </div>
                    );
                })}
            </div>
        </nav>
    );
}
