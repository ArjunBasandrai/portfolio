"use client";

import { useEffect, useState } from "react";
import FadedSeparator from "@/components/FadedSeparator";
import Footer from "@/components/Footer";

import { gql } from "@apollo/client";
import client from "../lib/apollo-client";
import Post from "../lib/post-interface";
import Parser from "@/lib/post-parser";

function formatDate(dateString: string): string {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
    };

    return date.toLocaleDateString('en-US', options).replace(" ", ", ");
}

export default function ProjectPage({ projectSlug }: {
    projectSlug: string
}) {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [date, setDate] = useState<string>("");

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                await client.cache.reset();

                const { data } = await client.query({
                    query: gql`
                    query ($slug: String!) {
                        publication(id: "6717ca18fd2be89bc676fc81") {
                            post (slug: $slug) {
                                id
                                title
                                publishedAt
                                subtitle
                                seo {
                                    title
                                    description
                                }
                                content {
                                    html
                                }
                                brief
                                slug
                            }
                        }
                    }
                    `,
                    variables: { slug: projectSlug },
                    fetchPolicy: "network-only",
                });

                const post = data.publication.post;

                const postData: Post = {
                    title: post.title,
                    cover: post.subtitle,
                    content: post.content.html,
                    sourceCode: post.seo.title,
                }

                setDate(formatDate(post.publishedAt));
                setPost(postData);
                setLoading(false);
            } catch {
                setError("Failed to load projects");
                setLoading(false);
            }
        };

        fetchProjects();
    }, [projectSlug]);

    if (loading) {
        return (
            <div role="status" className="h-screen w-screen flex items-center justify-center">
                <svg aria-hidden="true" className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-purple-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        );
    }

    if (error) {
        return <div className="text-white">{error}</div>;
    }

    return (
        <div className="mt-[140px] text-white max-w-5xl mx-auto md:px-0 px-2">
            <h2 className="font-Apparel text-5xl px-4 md:px-0">{post?.title}</h2>
            <div className="flex justify-between mt-3">
                <p className="font-NotoSans text-gray-500 px-4 md:px-0 text-xl">{date}</p>
                <a
                    className="font-NotoSans text-gray-500 px-4 md:px-0 text-md underline decoration-purple-500 underline-offset-4"
                    href={post?.sourceCode}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Source Code 
                    <svg className='inline ml-1' stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 15 15" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor"></path></svg>
                </a>
            </div>
            <video
                className="w-full rounded-lg shadow-lg border-[1px] border-semiDarkGray mt-10"
                src={post?.cover ? post?.cover : ""}
                autoPlay
                loop
                muted
                playsInline
                controls
            />
            <Parser rawPostContent={post?.content ? post?.content : ""} />
            <FadedSeparator />
            <Footer />
        </div>
    );
}
