import FadedSeparator from "@/components/FadedSeparator";

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

        if (h3Indices.length === 0) {
            result.push({
                title: sectionTitle,
                content: contentWithoutH2,
                subsections: [],
            });
        } else {
            const subsections: SubSection[] = [];

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

            result.push({
                title: sectionTitle,
                content: '',
                subsections: subsections,
            });
        }
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

export default function Parser({ rawPostContent }: { rawPostContent: string }) {
    const sectionsArray = separateSections(rawPostContent);
    const structuredSections = separateSubSections(sectionsArray);

    let projectStats = '';
    let remainingSections = structuredSections;

    if (structuredSections.length > 0 && structuredSections[0].title === 'Stats') {
        const statsSection = structuredSections[0];
        projectStats = `<h2>${statsSection.title}</h2>${statsSection.content}`;
        remainingSections = structuredSections.slice(1);
    }

    return (
        <div>
            {remainingSections.map((section, sectionIndex) => (
                <div className="text-white" key={sectionIndex}>
                    <div
                        dangerouslySetInnerHTML={{ __html: `<h2>${section.title}</h2>` }}
                    />
                    <FadedSeparator />
                    {section.content && (
                        <div
                            dangerouslySetInnerHTML={{ __html: section.content }}
                        />
                    )}
                    {section.subsections.map((subsection, subsectionIndex) => (
                        <div key={subsectionIndex}>
                            <div
                                dangerouslySetInnerHTML={{ __html: `<h3>${subsection.title}</h3>` }}
                            />
                            <div
                                dangerouslySetInnerHTML={{ __html: subsection.content }}
                            />
                            <br />
                            <br />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
