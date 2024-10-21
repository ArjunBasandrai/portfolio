"use client";

import Link from 'next/link';

interface GridItemProps {
  name: string;
}

export default function GridItem({ name }: GridItemProps) {
  const delays = ['0ms', '125ms', '150ms', '75ms'];

  return (
    <div className="w-full md:w-1/2 p-4">
      <Link href={`/projects/${name}`}>
        <div className="relative group cursor-pointer">
          <div className="bg-blue-500 h-80 flex items-center justify-center text-white rounded-xl z-0">
            {/* Item */}
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
            <div className="relative">
              <div className="transform scale-0 group-hover:scale-100 transition-transform duration-500 ease-in-out text-center">
                <span className="text-white text-2xl sm:text-3xl font-Bodoni">View Post</span>
              </div>
              {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((position, index) => (
                <span
                  key={position}
                  className={`${position.split('-')[1]}-plus-sign plus-${position} text-white text-2xl`}
                  style={{
                    transitionDelay: delays[index],
                  }}
                >
                  +
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
      <style jsx>{`
        .left-plus-sign {
          position: absolute;
          top: 0;
          left: 0;
          transform: translate(0%, 0%) scale(0);
          transition: transform 0.5s ease-in-out;
        }
        .right-plus-sign {
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(0%, 0%) scale(0);
          transition: transform 0.5s ease-in-out;
        }
        .group:hover .plus-top-left {
          transform: translate(-400%, -150%) scale(1);
        }
        .group:hover .plus-top-right {
          transform: translate(400%, -150%) scale(1);
        }
        .group:hover .plus-bottom-left {
          transform: translate(-400%, 150%) scale(1);
        }
        .group:hover .plus-bottom-right {
          transform: translate(400%, 150%) scale(1);
        }
      `}</style>
    </div>
  );
}
