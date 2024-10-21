"use client";

import Link from 'next/link';

interface GridItemProps {
  name: string;
  description: string;
}

export default function GridItem({ name, description }: GridItemProps) {
  const delays = ['350ms', '300ms', '550ms', '500ms'];
  const xoffset: string = '550';
  const yoffset: string = '225';

  return (
    <div className="w-full md:w-1/2 p-4">
      <Link href={`/projects/${name.replace(/\s+/g, '').toLowerCase()}`}>
        <div className="relative group cursor-pointer">
          <div className="bg-gray-900 h-80 flex items-center justify-center text-white rounded-xl z-0 border-[0.5px] border-gray-400">
            {/* Item */}
          </div>
          <div className="absolute inset-0 bg-black duration-300 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
            <div className="relative">
              <div className="transform scale-0 group-hover:scale-100 transition-transform ease-in-out text-center">
                <span className="text-white text-2xl sm:text-3xl font-Apparel">View Post</span>
              </div>
              {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((position) => (
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
        <p className='text-gray-400 mr-0 mt-0 mb-4 md:mr-10 md:mt-3'>{description}</p>
        <Link href={`/projects/${name.replace(/\s+/g, '').toLowerCase()}`}>
          <span className="text-lg relative inline-flex items-center before:content-[''] before:absolute before:-bottom-1 before:left-0 before:h-[2px] before:w-full before:scale-x-0 before:origin-right before:bg-gray-400 before:transition-transform before:duration-300 hover:before:scale-x-100 hover:before:origin-left">
            Continue Reading
          </span>
          <svg className='inline ml-1' stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 15 15" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor"></path></svg>
        </Link>
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
          transform: translate(-${xoffset}%, -${yoffset}%) scale(1);
          transition: ${delays[0]};
        }
        .group:hover .plus-top-right {
          transform: translate(${xoffset}%, -${yoffset}%) scale(1);
          transition: ${delays[1]};
        }
        .group:hover .plus-bottom-left {
          transform: translate(-${xoffset}%, ${yoffset}%) scale(1);
          transition: ${delays[2]};
          }
          .group:hover .plus-bottom-right {
            transform: translate(${xoffset}%, ${yoffset}%) scale(1);
            transition: ${delays[3]};
        }
      `}</style>
    </div>
  );
}
