import GridItem from "./GridItem"

export default function ProjectsHomeGrid() {
  return (
    <div className="container bg-black mx-auto px-4 py-8 -mt-32 md:-mt-48 relative z-10">
      <div className="flex flex-wrap -mx-4">
        <GridItem
          name="Elixir Chess Engine"
          description="A powerful chess engine written in C++ with a rating of around 3500 ELO. Elixir is fully UCI compliant and takes advantage of multithreading for faster and deeper searches."
        />
        <GridItem
          name="Birdly Bird Identifier"
          description="A large-scale bird image classifier trained on over 1,000,000 million images on 1200+ bird species of India. Trained using Google's Cloud TPUs on a custom scraped dataset."
        />
        <GridItem
          name="India eBird Observations: EDA"
          description="This project analyzes 30 million bird sightings across India, focusing on population trends of endangered species like the Pallas' Fish Eagle. Analysis performed using Python with Pandas, Matplotlib and Seaborn."
        />
        <GridItem
          name="MedVise"
          description="A medical image analysis tool that identifies various diseases from MRIs, CT scans, X-rays, and other imaging modalities, providing accurate and efficient diagnostic support."
        />
      </div>
    </div>
  );
}
