import FadedSeparator from "@/components/FadedSeparator";
import Hero from "@/components/hero";
import ProjectsHomeGrid from "@/components/ProjectsGrid/ProjectsGrid";

export default function HomePage() {
    return (
        <>
            <Hero />
            <div className="mt-projects-card bg-black relative z-10">
                <ProjectsHomeGrid />
                <FadedSeparator />
            </div>
        </>
    );
}