import FadedSeparator from "@/components/FadedSeparator";
import 'highlight.js/styles/github-dark.css';
import BentoGrid from "./project-stats-parser";
import IconHandler from "./icon-handler";
import TechStack from "@/components/TechStack";

interface SubSection {
    title: string;
    content: string;
}

interface Section {
    title: string;
    content: string;
    subsections: SubSection[];
}

function separateSubSections(sections: string[]): Section[] {
    const result: Section[] = [];

    for (const sectionContent of sections) {
        const h2Match = sectionContent.match(/<h2[^>]*>(.*?)<\/h2>/i);
        const sectionTitle = h2Match ? h2Match[1] : 'Untitled Section';

        const contentWithoutH2 = h2Match
            ? sectionContent.replace(h2Match[0], '').trim()
            : sectionContent;

        const h3Pattern = /<h3[^>]*>.*?<\/h3>/gi;
        const h3Indices: { index: number; length: number; content: string }[] = [];
        let h3Match: RegExpExecArray | null;

        while ((h3Match = h3Pattern.exec(contentWithoutH2)) !== null) {
            h3Indices.push({
                index: h3Match.index,
                length: h3Match[0].length,
                content: h3Match[0],
            });
        }

        let sectionTextContent = "";
        const subsections: SubSection[] = [];

        if (h3Indices.length === 0) {
            sectionTextContent = contentWithoutH2;
        } else {
            sectionTextContent = contentWithoutH2.slice(0, h3Indices[0].index).trim();

            for (let i = 0; i < h3Indices.length; i++) {
                const startIndex = h3Indices[i].index;
                const endIndex =
                    i + 1 < h3Indices.length
                        ? h3Indices[i + 1].index
                        : contentWithoutH2.length;

                const subsectionContent = contentWithoutH2
                    .slice(startIndex, endIndex)
                    .trim();

                const h3TitleMatch = h3Indices[i].content.match(/<h3[^>]*>(.*?)<\/h3>/i);
                const subsectionTitle = h3TitleMatch ? h3TitleMatch[1] : 'Untitled Subsection';

                const contentWithoutH3 = subsectionContent.replace(
                    h3Indices[i].content,
                    ''
                ).trim();

                subsections.push({
                    title: subsectionTitle,
                    content: contentWithoutH3,
                });
            }
        }

        result.push({
            title: sectionTitle,
            content: sectionTextContent,
            subsections: subsections,
        });
    }

    return result;
}

function separateSections(rawPostContent: string): string[] {
    const sections: string[] = [];
    const h2Pattern = /<h2[^>]*id="[^"]*"[^>]*>.*?<\/h2>/gi;
    let match: RegExpExecArray | null;
    const h2Indices: { index: number; length: number }[] = [];

    while ((match = h2Pattern.exec(rawPostContent)) !== null) {
        h2Indices.push({ index: match.index, length: match[0].length });
    }

    for (let i = 0; i < h2Indices.length; i++) {
        const startIndex = h2Indices[i].index;
        const endIndex =
            i + 1 < h2Indices.length ? h2Indices[i + 1].index : rawPostContent.length;
        const sectionContent = rawPostContent.slice(startIndex, endIndex).trim();
        sections.push(sectionContent);
    }

    return sections;
}


function parseHeadings(content: string): string {
    const wrapNonEnglishChars = (text: string) =>
        text.replace(/[^a-zA-Z\s]/g, (char) => `<span class="font-Bodoni">${char}</span>`);

    return content
        .replace(/<h2([^>]*)>(.*?)<\/h2>/gi, (match, attrs, innerText) => {
            const processedText = wrapNonEnglishChars(innerText);
            return `<h2${attrs} class="text-4xl font-Apparel underline decoration-gray-500 decoration-[1px] underline-offset-[5px] mb-6">${processedText}</h2>`;
        })
        .replace(/<h3([^>]*)>(.*?)<\/h3>/gi, (match, attrs, innerText) => {
            const processedText = wrapNonEnglishChars(innerText);
            return `<h3${attrs} class="text-2xl font-Apparel underline decoration-gray-500 decoration-[1px] underline-offset-[5px] mb-6">${processedText}</h3>`;
        })
        .replace(/<h4([^>]*)>(.*?)<\/h4>/gi, (match, attrs, innerText) => {
            const processedText = wrapNonEnglishChars(innerText);
            return `<h4${attrs} class="text-xl font-Apparel underline decoration-gray-500 decoration-[1px] underline-offset-[5px] mb-6 mt-4">${processedText}</h4>`;
        });
}

function textParser(content: string): string {
    const preBlocks: string[] = [];
    content = content.replace(/<pre[\s\S]*?<\/pre>/gi, (match: string): string => {
        preBlocks.push(match);
        return `__PRE_BLOCK_${preBlocks.length - 1}__`;
    });

    content = content.replace(
        /<code([^>]*)>(.*?)<\/code>/gi,
        (match: string, codeAttrs: string, codeContent: string): string => {
            const newCodeAttrs = codeAttrs.replace(/class=["'][^"']*["']/, '');
            const newClasses = 'bg-gradient-to-tr from-violet-500/10 to-violet-900/10 border border-gray-100/10 text-violet-600 px-1 py-1 rounded text-sm font-mono';
            return `<code${newCodeAttrs} class="${newClasses}">${codeContent}</code>`;
        }
    );

    content = content.replace(
        /<p([^>]*)>/gi,
        `<p$1 class="text-md md:text-lg text-gray-300/90 font-NotoSans mb-6">`
    );

    content = content.replace(
        /<a([^>]*)href="(http[s]?:\/\/[^"]+)"([^>]*)>(.*?)<\/a>/gi,
        (match: string, attrs: string, url: string, remainingAttrs: string, linkText: string): string => {
            const svgIcon = `<svg class="inline ml-1" stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 15 15" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor"></path></svg>`;
            return `<a${attrs} href="${url}"${remainingAttrs} class="underline decoration-violet-500">${linkText}</a>${svgIcon}`;
        }
    );

    for (let i = 0; i < preBlocks.length; i++) {
        let preBlock = preBlocks[i];

        preBlock = preBlock.replace(
            /<pre([^>]*)>/i,
            (match: string, preAttrs: string): string => {
                const preClass = preAttrs.includes('class="')
                    ? ''
                    : ' class="bg-darkGray p-4 rounded-md overflow-x-auto mb-6 border border-gray-500/20"';
                return `<pre${preAttrs}${preClass}>`;
            }
        );

        preBlock = preBlock.replace(
            /<code([^>]*)>([\s\S]*?)<\/code>/i,
            (match: string, codeAttrs: string, codeContent: string): string => {
                const newCodeAttrs = codeAttrs.replace(/class=["'][^"']*["']/, '');
                const newClasses = 'text-sm font-mono text-white';
                return `<code${newCodeAttrs} class="${newClasses}">${codeContent}</code>`;
            }
        );

        preBlocks[i] = preBlock;
    }

    content = content.replace(/__PRE_BLOCK_(\d+)__/g, (match: string, index: string): string => {
        return preBlocks[parseInt(index, 10)];
    });

    return content;
}

function extractTechStack(content: string): string[] {
    content = content.replace(/<h2[^>]*>.*?<\/h2>/i, '');
    content = content.replace(/<\/?p>/gi, '').trim();
    return content.split('«').map(item => item.trim());
}

export default function Parser({ rawPostContent }: { rawPostContent: string }) {
    const sectionsArray = separateSections(rawPostContent);
    const structuredSections = separateSubSections(sectionsArray);

    let projectStats = '';
    let techStack: string[] = [];   
    let remainingSections = structuredSections;

    if (structuredSections.length > 0 && structuredSections[0].title === 'Stats') {
        const statsSection = structuredSections[0];
        projectStats = `<h2>${statsSection.title}</h2>${statsSection.content}`;
        remainingSections = structuredSections.slice(1);
    }

    const techStackSection = sectionsArray.find(section => section.includes("Tech Stack"));
    if (techStackSection) {
        techStack = extractTechStack(techStackSection);
        remainingSections = remainingSections.filter(section => section.title !== 'Tech Stack');
    }

    const isLargeScreen = window.innerWidth >= 1024;

    return (
        <>
            <div className="lg:border md:border-semiDarkGray mt-10 py-8 px-0 md:px-8 rounded-lg">
                <BentoGrid input={projectStats} />
                <FadedSeparator />
                <TechStack stack={techStack} />
                {!isLargeScreen && <FadedSeparator />}
            </div>
            <div
                className="text-white rounded-lg shadow-lg lg:border md:border-semiDarkGray md:mt-10 px-4 md:px-[85px] py-0 lg:py-[85px]"
            >
                {remainingSections.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                        {sectionIndex > 0 &&
                            <div className="my-[20px] md:my-[50px]">
                                <FadedSeparator />
                            </div>
                        }
                        <div
                            dangerouslySetInnerHTML={{
                                __html: textParser(parseHeadings(`<h2>${section.title}</h2>`))
                            }}
                        />
                        {section.content && (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: textParser(parseHeadings(section.content))
                                }}
                            />
                        )}
                        {section.subsections.map((subsection, subsectionIndex) => (
                            <div key={subsectionIndex}>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: textParser(parseHeadings(`<h3>${subsection.title}</h3>`))
                                    }}
                                />
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: textParser(parseHeadings(subsection.content))
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
}
