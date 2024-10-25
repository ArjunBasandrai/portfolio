import FadedSeparator from "@/components/FadedSeparator";
import Footer from "@/components/Footer";
import Hero from "@/components/hero";
import ProjectsHomeGrid from "@/components/ProjectsGrid/ProjectsGrid";

export default function HomePage() {
    const projects = { "projects" : [
        {
            name: "Elixir Chess Engine",
            description: "A powerful chess engine written in C++ with a rating of around 3500 ELO. Elixir is fully UCI compliant and takes advantage of multithreading for faster and deeper searches.",
            image: "https://images.unsplash.com/photo-1612830461340-3b1e8b7a1b1b"
        },
        {
            name: "Birdly Bird Identifier",
            description: "A large-scale bird image classifier trained on over 1,000,000 million images on 1200+ bird species of India. Trained using Google's Cloud TPUs on a custom scraped dataset.",
            image: "https://images.unsplash.com/photo-1612830461340-3b1e8b7a1b1b"
        },
        {
            name: "India eBird Observations: EDA",
            description: "This project analyzes 30 million bird sightings across India, focusing on population trends of endangered species like the Pallas' Fish Eagle. Analysis performed using Python with Pandas, Matplotlib and Seaborn.",
            image: "https://images.unsplash.com/photo-1612830461340-3b1e8b7a1b1b"
        },
        {
            name: "MedVise",
            description: "A medical image analysis tool that identifies various diseases from MRIs, CT scans, X-rays, and other imaging modalities, providing accurate and efficient diagnostic support.",
            image: "https://images.unsplash.com/photo-1612830461340-3b1e8b7a1b1b"
        }
    ]};
    return (
        <>
            <Hero />
            <div className="mt-projects-card bg-black relative z-10">
                <ProjectsHomeGrid params={projects} />
                <FadedSeparator />
                <Footer />
            </div>
        </>
    );
}