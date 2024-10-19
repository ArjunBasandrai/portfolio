"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function About() {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const pin = gsap.fromTo(sectionRef.current, {
            translateX: "0",
        }, {
            translateX: "-66.666666%",
            ease: "none",
            duration: 1,
            scrollTrigger: {
                trigger: triggerRef.current,
                start: "top top",
                end: "1000 top",
                scrub: true,
                pin: true
            }
        });

        return () => {
            pin.kill();
        }
    }, []);

    return (
        <div className="mt-[100vh] w-full h-screen bg-blue-500 flex items-center overflow-hidden" ref={triggerRef}>
            <div className="flex w-[300%]" ref={sectionRef}>
                <div className="w-screen h-screen bg-green-500 mx-0 flex items-center">
                    <div className="max-w-3xl mx-0 md:mx-[10%] text-white">
                        Hello
                    </div>
                </div>
                <div className="w-screen h-screen bg-gray-500 mx-0 flex items-center">
                    <div className="max-w-3xl mx-0 md:mx-[10%] text-white">
                        Hello
                    </div>
                </div>
                <div className="w-screen h-screen bg-blue-100 mx-0 flex items-center">
                    <div className="max-w-3xl mx-0 md:mx-[10%] text-white">
                        Hello
                    </div>
                </div>
            </div>
        </div>
    );
}
