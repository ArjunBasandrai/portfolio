import ProjectPage from "@/pages/PostPage";
import "../../../styles/globals.css";

export default function Project({ params }: {
    params: {
        projectsSlug: string
    }
}) {
    return (
        <>
            return (
            <>
                <h1 className="text-white">Project: {params.projectsSlug}</h1>
                <ProjectPage projectSlug={params.projectsSlug} />
            </>
            );
        </>
    );
}