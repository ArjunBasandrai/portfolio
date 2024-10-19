"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import image1 from '../../images/1.jpg';
import image2 from '../../images/2.jpg';
import AboutSection from './aboutSection';

function ease_p(p: number): number {
    return gsap.parseEase("power2.inOut")(p);
}

export default function About() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const section1Ref = useRef<HTMLDivElement>(null);
    const section2Ref = useRef<HTMLDivElement>(null);
    const section3Ref = useRef<HTMLDivElement>(null);

    const color1 = "rgb(10, 0, 11)";
    const color2 = "rgb(65, 179, 162)";
    const color3 = "rgb(255, 255, 0)";

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        let progress_counter: number = 0;

        gsap.to({}, {
            duration: 1,
            scrollTrigger: {
                trigger: triggerRef.current,
                start: "top bottom",
                end: "top top",
                scrub: true,
                onUpdate: self => {
                    const alpha = 0.5 + 0.5 * self.progress;
                    const rgba = gsap.utils.splitColor(color1);
                    const colorWithOpacity = `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${alpha})`;
                    if (section1Ref.current) section1Ref.current.style.backgroundColor = colorWithOpacity;
                }
            }
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: triggerRef.current,
                start: "top top",
                end: "+=200% top",
                scrub: true,
                pin: true,
                snap: {
                    snapTo: (progress_counter: number) => {
                        if (progress_counter < 0.15) return 0.0;
                        else if (progress_counter < 0.65) return 0.5;
                        return 1.0;
                    },
                    duration: 0.1,
                    delay: 0.1,
                    ease: "power1.in"
                },
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
            end: "+=200% top",
            scrub: true,
            onUpdate: self => {
                progress_counter = self.progress;
                let color;

                if (progress_counter <= 0.5) {
                    const p = progress_counter / 0.5;
                    color = gsap.utils.interpolate(color1, color2, ease_p(p));

                } else {
                    const p = (progress_counter - 0.5) / 0.5;
                    color = gsap.utils.interpolate(color2, color3, ease_p(p));
                }

                if (section1Ref.current) section1Ref.current.style.backgroundColor = color;
                if (section2Ref.current) section2Ref.current.style.backgroundColor = color;
                if (section3Ref.current) section3Ref.current.style.backgroundColor = color;
            }
        });

        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, []);

    return (
        <div
            className="mt-[100vh] w-full h-screen flex items-center overflow-hidden"
            ref={triggerRef}
        >
            <div className="flex w-[300%]" ref={sectionRef}>
                <AboutSection params={{
                    ref: section1Ref,
                    color: color1,
                    image: image1,
                    headingColor: "text-purple-500",
                    title: "Techie",
                    text: "Lorem ipsum dolor sit amet consectetur. Pulvinar curabitur tortor ac turpis adipiscing sed. Sed nisl enim sit volutpat laoreet morbi. Non posuere malesuada purus gravida quis vel sed malesuada venenatis. Morbi turpis imperdiet aliquet rhoncus arcu. Ullamcorper a id neque at nunc eu fermentum sit viverra. Suscipit sed non volutpat urna vitae odio bibendum. Fusce a laoreet diam mauris elit eu eu. At ac sapien urna donec in diam porta tortor. Mauris diam feugiat in massa eget vitae. Eu rhoncus a vitae amet. Gravida in at nisl duis vitae. Nulla vulputate sed egestas aliquam sed. Sit volutpat leo arcu donec quis.",
                    altText: "Techie Arjun"
                }} />
                <AboutSection params={{
                    ref: section2Ref,
                    color: color1,
                    image: image2,
                    headingColor: "text-secondary",
                    title: "Naturalist",
                    text: "Lorem ipsum dolor sit amet consectetur. Pulvinar curabitur tortor ac turpis adipiscing sed. Sed nisl enim sit volutpat laoreet morbi. Non posuere malesuada purus gravida quis vel sed malesuada venenatis. Morbi turpis imperdiet aliquet rhoncus arcu. Ullamcorper a id neque at nunc eu fermentum sit viverra. Suscipit sed non volutpat urna vitae odio bibendum. Fusce a laoreet diam mauris elit eu eu. At ac sapien urna donec in diam porta tortor. Mauris diam feugiat in massa eget vitae. Eu rhoncus a vitae amet. Gravida in at nisl duis vitae. Nulla vulputate sed egestas aliquam sed. Sit volutpat leo arcu donec quis.",
                    altText: "Naturalist Arjun"
                }} />
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
