import IconHandler from "@/lib/icon-handler";
import "../styles/globals.css";

export default function TechStack({ stack }: { stack: string[] }) {
    return (
        <>
            <div className="flex flex-wrap gap-4 justify-center rounded-lg px-0 md:px-2 py-6 sm:gap-6">
                {stack.map((tech, index) => (
                    <IconHandler key={index} name={tech} />
                ))}
            </div>
        </>
    );
}
