import ProjectPage from "@/pages/PostPage";
import "../../../styles/globals.css";

import { gql } from "@apollo/client";
import client from "@/lib/apollo-client";

import { Metadata } from "next";

export const generateMetadata = async ({ params }: {
    params: {
        projectsSlug: string
    }
}): Promise<Metadata> => {
    const { projectsSlug } = params;

    const { data } = await client.query({
        query: gql`
            query ($slug: String!) {
                publication(id: "6717ca18fd2be89bc676fc81") {
                    post(slug: $slug) {
                        id
                        title
                        seo {
                            description
                        }
                        brief
                    }
                }
            }
        `,
        variables: { slug: projectsSlug },
        fetchPolicy: "network-only",
    });

    const post = data.publication.post;

    return {
        title: `Arjun Basandrai | ${post.title}`,
        description: post.seo.description,
    };
};

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