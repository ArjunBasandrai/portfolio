"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import Image from 'next/image';
import myImage from '../../images/1.png';

export default function About() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const section1Ref = useRef<HTMLDivElement>(null);
    const section2Ref = useRef<HTMLDivElement>(null);
    const section3Ref = useRef<HTMLDivElement>(null);

    const color1 = "#0A000B";
    const color2 = "#008000";
    const color3 = "#FFFF00";

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: triggerRef.current,
                start: "top top",
                end: "1000 top",
                scrub: true,
                pin: true
            }
        });

        tl.fromTo(sectionRef.current, {
            translateX: "0",
        }, {
            translateX: "-66.666666%",
            ease: "none",
            duration: 1
        });

        ScrollTrigger.create({
            trigger: triggerRef.current,
            start: "top top",
            end: "1000 top",
            scrub: true,
            onUpdate: self => {
                const progress = self.progress;
                let color;

                if (progress <= 0.5) {
                    const p = progress / 0.5;
                    color = gsap.utils.interpolate(color1, color2, p);
                } else {
                    const p = (progress - 0.5) / 0.5;
                    color = gsap.utils.interpolate(color2, color3, p);
                }

                if (section1Ref.current) section1Ref.current.style.backgroundColor = color;
                if (section2Ref.current) section2Ref.current.style.backgroundColor = color;
                if (section3Ref.current) section3Ref.current.style.backgroundColor = color;
            }
        });

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <div
            className="mt-[100vh] w-full h-screen bg-blue-500 flex items-center overflow-hidden"
            ref={triggerRef}
        >
            <div className="flex w-[300%]" ref={sectionRef}>
                <div
                    className="w-screen h-screen mx-0 flex items-center"
                    style={{ backgroundColor: color1 }}
                    ref={section1Ref}
                >
                    <div className="w-full h-full max-w-7xl mx-0 md:mx-[10%]">
                        <div className="w-full h-full flex flex-col md:flex-row">
                            <div className="w-full h-full md:w-5/12 text-white p-4 flex flex-col justify-center">
                                <h2 className="text-sm font-light uppercase mb-2">The</h2>
                                <h1 className="text-4xl font-bold mb-4 text-purple-500">Techie</h1>
                                <p className="text-base">
                                    Lorem ipsum dolor sit amet consectetur. Pulvinar curabitur tortor ac turpis adipiscing sed. Sed nisl enim sit volutpat laoreet morbi. Non posuere malesuada purus gravida quis vel sed malesuada venenatis. Morbi turpis imperdiet aliquet rhoncus arcu. Ullamcorper a id neque at nunc eu fermentum sit viverra. Suscipit sed non volutpat urna vitae odio bibendum. Fusce a laoreet diam mauris elit eu eu. At ac sapien urna donec in diam porta tortor. Mauris diam feugiat in massa eget vitae. Eu rhoncus a vitae amet. Gravida in at nisl duis vitae. Nulla vulputate sed egestas aliquam sed. Sit volutpat leo arcu donec quis.
                                </p>

                            </div>

                            <div className="hidden w-full md:w-7/12 p-4 md:flex items-center">
                                <Image
                                    src={myImage}
                                    alt="Techie Arjun"
                                    className="w-full h-auto object-contain sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] max-h-[400px] mx-auto"
                                    layout="responsive"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    priority
                                
                                />

                            </div>
                        </div>

                    </div>
                </div>
                <div
                    className="w-screen h-screen mx-0 flex items-center"
                    style={{ backgroundColor: color1 }}
                    ref={section2Ref}
                >
                    <div className="max-w-3xl mx-0 md:mx-[10%]">
                        Hello
                    </div>
                </div>
                <div
                    className="w-screen h-screen mx-0 flex items-center"
                    style={{ backgroundColor: color1 }}
                    ref={section3Ref}
                >
                    <div className="max-w-3xl mx-0 md:mx-[10%]">
                        Hello
                    </div>
                </div>
            </div>
        </div>
    );
}
