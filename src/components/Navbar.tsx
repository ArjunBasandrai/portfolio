'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const links = ['Home', 'Projects', 'About'];
  const pathname = usePathname();

  const activeIndex = links.findIndex((link) => {
    const href = `/${link === 'Home' ? '' : link.toLowerCase()}`;
    return pathname === href || (pathname === '/' && link === 'Home');
  });

  const [hoveredIndex, setHoveredIndex] = useState(activeIndex);
  const [menuOpen, setMenuOpen] = useState(false);
  const cornerBorderRadius = '50px';
  const borderRadius = '10px';

  return (
    <nav className="fixed top-8 inset-x-0 z-50 mx-auto w-max">
      <div className="hidden sm:block bg-gray-900 text-white rounded-[50px] px-2 py-1 border-[0.2px] border-gray-700">
        <div className="relative flex items-center px-1 py-[7px] justify-between w-[350px]">
          <div
            className="absolute inset-y-1 left-0 bg-gray-700 transition-all duration-300 ease-in-out"
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
                  className="block px-3 py-2 rounded-md"
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
          className=" bg-gray-900 text-white rounded-[50px] px-5 py-3 border-[0.2px] border-gray-700 text-lg"
        >
          Menu
        </button>
        {menuOpen && (
          <div className="mt-2 bg-gray-900 text-white rounded-[15px] px-6 py-3 border-[0.2px] border-gray-700 w-[200px]">
            {links.map((link, index) => {
              const href = `/${link === 'Home' ? '' : link.toLowerCase()}`;
              return (
                <div key={index} className="py-2 pr-3 pl-0">
                  <Link href={href} onClick={() => setMenuOpen(false)}>
                    {link}
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
