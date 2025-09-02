import "../../styles/globals.css";

import aboutImage from "../../images/about.jpg"
import natureAboutImage from "../../images/nature_about.jpg"
import taekwondoAboutImage from "../../images/taekwondo_about.jpg"

import Image from "next/image";
import FadedSeparator from "@/components/FadedSeparator";
import Footer from "@/components/Footer";
import HobbyAccordion from "@/components/HobbyAccordion";

export const metadata = {
    title: "Arjun Basandrai | About",
    description: "Discover more about Arjun Basandrai - a machine learning enthusiast, software developer, and passionate explorer in bird photography and music.",
};

function ExperienceCard({ experience }: {
    experience: string[];
}) {
    return (
        <div className="px-5 py-7 bg-darkGray rounded-lg my-4 font-NotoSans transition-all duration-100 hover:bg-darkGray/90">
            <div className="flex justify-between text-white">
                <h4 className="text-lg">{experience[0]}</h4>
                <p className="text-md">{experience[2]}</p>
            </div>
            <p className="text-md text-gray-500">{experience[1]}</p>
        </div>
    );
}

export default function AboutPage() {
    const experience = [
        ["Tracelink Inc.", "Software Engineer Intern", "Mar 2025 - Oct 2025"],
        ["Talent Recruit Pvt. Ltd.", "Machine Learning Intern", "Mar 2024 - Jul 2024"]
    ];
    return (
        <div className="">
            <div className="text-white pt-[100px] md:pt-[175px] container max-w-xl mx-auto">
                <div className="flex flex-col md:flex-row justify-center">
                    <div className="w-full md:w-[40%] p-4 flex md:justify-center">
                        <div className="w-[200px] h-[200px] overflow-hidden rounded-full cursor-pointer border-[5px] border-violet-500/60 transition-all duration-100 hover:border-[6px]">
                            <Image src={aboutImage} alt="Arjun" className="object-cover h-full" />
                        </div>
                    </div>
                    <div className="w-full md:w-[60%] py-4 px-6">
                        <p className="font-Apparel text-3xl sm:text-5xl">Hello 👋,</p>
                        <div className="font-NotoSans text-md text-gray-400">
                            <p className="my-5">
                                I&apos;m Arjun, a Software Engineer focused on Machine Learning and Cybersecurity, with a strong appreciation for wildlife and nature.
                            </p>
                            <p className="my-5">
                                I enjoy working with big data, solving challenging problems, and developing meaningful applications. I enjoy building solutions that digitize and automate everyday processes, making life easier and businesses more efficient.
                            </p>
                            <p className="my-5">
                                I&apos;m currently exploring Cybersecurity by studying for <span className="underline decoration-violet-500 underline-offset-4">INE&apos;s eJPTv2 certification</span> while continuing to build Machine Learning projects.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 p-4">
                    <h4 className="font-Apparel text-3xl mb-4">Experience</h4>
                    {experience.map((experience, index) => (
                        <ExperienceCard key={index} experience={experience} />
                    ))}
                </div>

                <div className="mt-12 p-4">
                    <h4 className="text-3xl font-Apparel mb-4">Hobbies</h4>
                    <HobbyAccordion title="Bird Watching and Wildlife Photography">
                        <p>
                            I have a deep passion for <span className="text-violet-500/90">bird watching and photography</span>.
                            Spending time outdoors with my camera allows me to notice the fine details
                            in nature that often go unseen.
                            <br /><br />
                            For me, each outing is a way to slow down, observe, and appreciate the beauty around me.
                            Photographing birds requires quiet focus and patience and these moments outdoors give me both calm and discipline,
                            which carry over into other parts of my life.
                        </p>
                        <Image
                            src={natureAboutImage}
                            alt="Nature"
                            className="w-full h-auto mt-3 rounded"
                        />
                    </HobbyAccordion>

                    <HobbyAccordion title="Electronic Keyboard">
                        <p>
                            Music has always been another creative outlet for me, and I play the Electronic Keyboard.
                            Over the years, I have explored different styles of music and learned how each one brings
                            out a new way of expression. I also hold a <span className="text-violet-500/90">Grade 7 certification from Trinity College London</span>,
                            which reflects the effort and discipline I have put into my training.
                            Playing music provides me balance and a sense of flow
                            that complements my work in other areas of life.
                        </p>
                    </HobbyAccordion>

                    <HobbyAccordion title="Kukkiwon Taekwondo Black Belt Dan-1">
                        <p>
                            I also hold a <span className="text-violet-500/70">Dan-1 black belt in Taekwondo</span>.
                            Practicing Taekwondo helps me stay active and focused. The training help me build strength and sharpens
                            reflexes and challenges me to think quickly and adapt. It is a practice that keeps
                            me alert and steady in both body and mind.
                        </p>
                        <Image
                            src={taekwondoAboutImage}
                            alt="Taekwondo"
                            className="w-full h-auto mt-3 rounded"
                        />
                    </HobbyAccordion>
                </div>

                <div className="mt-12 mb-10 p-4">
                    <h4 className="font-Apparel text-3xl mb-4">Links</h4>
                    <div className="flex flex-wrap gap-4 items-center w-full">
                        <a href="https://linkedin.com/in/arjun-basandrai" target="_blank" rel="noopener noreferrer">
                            <img src="/linkedin.png" alt="LinkedIn" className="h-10 w-10 object-contain" />
                        </a>
                        <a href="https://github.com/ArjunBasandrai" target="_blank" rel="noopener noreferrer">
                            <img src="/github.png" alt="GitHub" className="h-10 w-10 object-contain" />
                        </a>
                        <a href="https://x.com/ArjunBasandrai" target="_blank" rel="noopener noreferrer">
                            <img src="/x.png" alt="X (Twitter)" className="h-10 w-10 object-contain" />
                        </a>
                        <a href="mailto:basandraiarjun@gmail.com">
                            <img src="/mail.png" alt="Email" className="h-10 w-10 object-contain" />
                        </a>
                        <a href="https://instagram.com/birdingwitharjun" target="_blank" rel="noopener noreferrer">
                            <img src="/instagram.png" alt="Instagram" className="h-10 w-10 object-contain" />
                        </a>
                        <a href="https://birdingwitharjun.com/" target="_blank" rel="noopener noreferrer">
                            <img src="/birdingwitharjun.jpg" alt="Custom" className="h-10 w-10 object-contain" />
                        </a>
                        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                            <img src="/resume.png" alt="Resume" className="h-10 w-10 object-contain" />
                        </a>
                    </div>
                </div>
            </div>
            <FadedSeparator />
            <Footer />
        </div>
    );
}
