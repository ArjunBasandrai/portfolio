"use client";

import Link from 'next/link';

interface GridItemProps {
  name: string;
  description: string;
}

export default function GridItem({ name, description }: GridItemProps) {
  const delays = ['350ms', '300ms', '550ms', '500ms'];

  return (
    <div className="w-full md:w-1/2 p-4">
      <Link href={`/projects/${name.replace(/\s+/g, '').toLowerCase()}`}>
        <div className="relative group cursor-pointer">
          <div className="bg-gray-900 h-80 flex items-center justify-center text-white rounded-xl z-0">
            {/* Item */}
          </div>
          <div className="absolute inset-0 bg-black duration-300 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
            <div className="relative">
              <div className="transform scale-0 group-hover:scale-100 transition-transform ease-in-out text-center">
                <span className="text-white text-2xl sm:text-3xl font-Apparel">View Post</span>
              </div>
              {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((position, _) => (
                <span
                  key={position}
                  className={`${position.split('-')[1]}-plus-sign plus-${position} text-white text-2xl font-Bodoni`}
                >
                  +
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
      <div className='text-white p-6'>
        <h1 className="font-Apparel text-4xl">{name}</h1>
        <p className='text-gray-400'>{description}</p>
      </div>
      <style jsx>{`
        .left-plus-sign {
          position: absolute;
          top: 0;
          left: 0;
          transform: translate(0%, 0%) scale(0);
          transition: transform ease-in-out;
        }
        .right-plus-sign {
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(0%, 0%) scale(0);
          transition: transform ease-in-out;
        }
        .group:hover .plus-top-left {
          transform: translate(-400%, -150%) scale(1);
          transition: ${delays[0]};
        }
        .group:hover .plus-top-right {
          transform: translate(400%, -150%) scale(1);
          transition: ${delays[1]};
        }
        .group:hover .plus-bottom-left {
          transform: translate(-400%, 150%) scale(1);
          transition: ${delays[2]};
          }
          .group:hover .plus-bottom-right {
            transform: translate(400%, 150%) scale(1);
            transition: ${delays[3]};
        }
      `}</style>
    </div>
  );
}
