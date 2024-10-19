"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function About() {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);
    const section1Ref = useRef(null);
    const section2Ref = useRef(null);
    const section3Ref = useRef(null);

    const color1 = "#0A001B";
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

                section1Ref.current.style.backgroundColor = color;
                section2Ref.current.style.backgroundColor = color;
                section3Ref.current.style.backgroundColor = color;
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
                    <div className="max-w-3xl mx-0 md:mx-[10%]">
                        Hello
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
