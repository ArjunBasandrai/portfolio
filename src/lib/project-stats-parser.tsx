import React from 'react';

type GridItem = {
    heading: string;
    value: string;
    extraInfo: string;
};

type StatsCardProps = {
    heading: string;
    value: string;
    extraInfo: string;
    span: number;
};

type BentoGridProps = {
    input: string;
};

const StatsCard: React.FC<StatsCardProps> = ({ heading, value, extraInfo, span }) => {
    const parseExtraInfo = (htmlContent: string) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');

        const svgIcon = `
            <svg class="inline ml-1" stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 15 15" height="0.8em" width="0.8em" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor"></path>
            </svg>
        `;
        
        doc.querySelectorAll('a').forEach((anchor) => {
            anchor.classList.add('underline', 'decoration-purple-500', 'underline-offset-[5px]', 'decoration-[2px]', 'hover:text-purple-700', 'transition-all', 'duration-200');
            anchor.innerHTML += svgIcon;
        });

        return doc.body.innerHTML;
    };

    const renderValue = (text: string) => {
        return text.split('').map((char, index) => {
            const isEnglishLetter = /^[A-Za-z0-35-9.]$/.test(char);
            return (
                <span key={index} className={isEnglishLetter ? 'font-Apparel' : 'font-Bodoni'}>
                    {char}
                </span>
            );
        });
    };

    return (
        <div
            className="flex flex-col justify-center px-6 py-10 bg-gradient-to-tr transition-all duration-500 from-violet-500/20 to-purple-800/10 rounded-lg hover:bg-violet-900/10 hover:shadow-[0_0_10px_-2px_rgba(139,92,246,1)] mb-4 md:m-0"
            style={{ gridRow: `span ${span}` }}
        >
            <h2 className="text-xl md:text-2xl font-NotoSans text-gray-400">{heading}</h2>
            <p className="text-3xl md:text-4xl font-Apparel">{renderValue(value)}</p>
            <p
                className="text-lg text-gray-400 font-NotoSans"
                dangerouslySetInnerHTML={{ __html: parseExtraInfo(extraInfo) }}
            />
        </div>
    );
};

const parseInputHTMLString = (input: string): GridItem[] => {
    const contentWithoutHeading = input.replace(/<h2>.*?<\/h2>/i, '').trim();
    const paragraphRegex = /<p>(.*?)<\/p>/gi;
    const paragraphs = contentWithoutHeading.match(paragraphRegex);

    if (!paragraphs) return [];

    return paragraphs.map((paragraph) => {
        const innerHTML = paragraph.replace(/<\/?p>/gi, '').trim();
        const [heading = '', value = '', extraInfo = ''] = innerHTML
            .split('«')
            .map((str) => str.trim());

        return { heading, value, extraInfo };
    });
};

const BentoGrid: React.FC<BentoGridProps> = ({ input }) => {
    const items = parseInputHTMLString(input);

    return (
        <div className="md:grid md:gap-4 mt-10">
            {items.length === 3 && (
                <div className="md:grid md:grid-cols-3 md:gap-4">
                    {items.map((item, index) => (
                        <StatsCard
                            key={index}
                            heading={item.heading}
                            value={item.value}
                            extraInfo={item.extraInfo}
                            span={1}
                        />
                    ))}
                </div>
            )}

            {items.length === 4 && (
                <div className="md:grid md:gap-4 h-full" style={{ gridTemplateColumns: '2fr 3fr' }}>
                    <div className="md:grid md:grid-rows-2 md:gap-4">
                        <StatsCard {...items[0]} span={4} />
                        <StatsCard {...items[1]} span={1} />
                    </div>
                    <div className="md:grid md:grid-rows-2 md:gap-4">
                        <StatsCard {...items[2]} span={1}/>
                        <StatsCard {...items[3]} span={4}/>
                    </div>
                </div>
            )}

            {items.length === 5 && (
                <div className="md:grid md:gap-4 h-full" style={{ gridTemplateColumns: '1fr 2fr' }}>
                    <div className="md:grid md:grid-rows-2 md:gap-4">
                        <StatsCard {...items[0]} span={2}/>
                        <StatsCard {...items[1]} span={1}/>
                    </div>
                    <div className="md:grid md:grid-rows-2 md:gap-4">
                        <div className="md:grid md:grid-cols-2 md:gap-4 h-full" style={{ gridRow: 'span 1' }}>
                            <StatsCard {...items[2]} span={1} />
                            <StatsCard {...items[3]} span={1} />
                        </div>
                        <StatsCard {...items[4]} span={2}/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BentoGrid;
