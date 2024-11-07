import "../../styles/globals.css";

import aboutImage from "../../images/about.jpg"
import Image from "next/image";
import FadedSeparator from "@/components/FadedSeparator";
import Footer from "@/components/Footer";

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
    const experience = [["Talent Recruit Pvt. Ltd.", "Machine Learning Intern", "Mar 2024 - Jul 2024"]];
    return (
        <>
            <div className="text-white mt-[100px] md:mt-[175px] container max-w-xl mx-auto">
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

                <div className="mt-12 mb-10 p-4">
                    <h4 className="text-3xl font-Apparel mb-4">Hobbies</h4>
                    <p className="mb-4">Outside of coding, I love exploring diverse passions that keep my creativity and discipline sharp.</p>
                    <p className="mb-4">As an avid <span className="text-violet-500/70">bird watcher and photographer</span>, I enjoy capturing nature&apos;s intricate beauty through my lens—an experience that teaches me patience and precision.</p>
                    <p className="mb-4">Music is another creative outlet, and I play the Electronic Keyboard, holding a <span className="text-violet-500/70">Grade 7 certification from Trinity College London</span>.</p>
                    <p className="mb-4">Additionally, I hold a <span className="text-violet-500/70">Dan-1 black belt in Taekwondo</span>, a discipline that keeps me grounded, resilient, and ready to tackle challenges head-on.</p>

                </div>
            </div>
            <FadedSeparator />
            <Footer />
        </>
    );
}
