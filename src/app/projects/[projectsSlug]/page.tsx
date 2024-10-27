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
                <ProjectPage projectSlug={params.projectsSlug} />
            </>
            );
        </>
    );
}