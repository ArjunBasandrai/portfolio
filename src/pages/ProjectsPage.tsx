import FadedSeparator from "@/components/FadedSeparator";
import Footer from "@/components/Footer";
import ProjectsHomeGrid from "@/components/ProjectsGrid/ProjectsGrid";

export default function ProjectsPage() {
    return (
        <div className="mt-[100px]">
            <ProjectsHomeGrid />
            <FadedSeparator />
            <Footer />
        </div>
    );
}