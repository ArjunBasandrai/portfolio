export default function Footer() {
    return (
        <footer className="bg-black text-white py-8 px-4">
            <div className="container mx-auto space-y-6">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <h2 className="text-4xl font-Apparel">Get In Touch</h2>
                        <a href="mailto:basandraiarjun@gmail.com" className="text-md text-gray-400 mt-0">
                            basandrai.arjun@gmail.com
                        </a>
                    </div>

                    <div className="flex flex-col">
                        <a
                            href="https://www.linkedin.com/in/arjun-basandrai/"
                            target="_blank"
                            className="text-md hover:underline text-right"
                        >
                            LinkedIn
                            <svg className='inline ml-1' stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 15 15" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor"></path></svg>
                        </a>
                        <a
                            href="https://github.com/ArjunBasandrai"
                            target="_blank"
                            className="text-md hover:underline text-right"
                        >
                            GitHub
                            <svg className='inline ml-1' stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 15 15" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor"></path></svg>
                        </a>
                        <a
                            href="https://x.com/ArjunBasandrai/"
                            target="_blank"
                            className="text-md hover:underline text-right"
                        >
                            Twitter
                            <svg className='inline ml-1' stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 15 15" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor"></path></svg>
                        </a>
                    </div>
                </div>
                <div className="h-[10px]"></div>
                <div className="flex justify-between items-center text-gray-300">
                    <div className="text-left flex-1">
                        <p>&copy; 2024 Arjun Basandrai</p>
                    </div>

                    <div className="text-center flex-1">
                        <p>Built with 💜</p>
                    </div>

                    <div className="text-right flex-1">
                        <p>Punjab, India</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

