import Image from 'next/image';
import { StaticImageData } from 'next/image';
import React from 'react';

type AboutSectionProps = {
  params: {
    ref: React.RefObject<HTMLDivElement>;
    color: string;
    image: StaticImageData;
    headingColor: string;
    title: string;
    text: string;
    altText: string;
  };
};

export default function AboutSection({ params }: AboutSectionProps) {
  return (
    <div
      className="w-screen h-screen mx-0 flex items-center"
      style={{ backgroundColor: params.color }}
      ref={params.ref}
    >
      <div className="w-full h-full max-w-7xl mx-0 md:mx-[10%]">
        <div className="w-full h-full flex flex-col md:flex-row">
          <div className="w-full h-full md:w-5/12 text-white p-4 flex flex-col justify-center">
            <h2 className="text-sm font-light uppercase mb-0 pb-0">The</h2>
            <h1 className={`text-4xl font-bold mb-4 ${params.headingColor} mt-0 pt-0`}>
              {params.title}
            </h1>
            <p className="text-base">
              {params.text}
            </p>
          </div>

          <div className="hidden w-full md:w-7/12 p-4 md:flex items-center">
            <Image
              src={params.image}
              alt={params.altText}
              className="w-full h-auto object-contain sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] max-h-[400px] mx-auto"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
