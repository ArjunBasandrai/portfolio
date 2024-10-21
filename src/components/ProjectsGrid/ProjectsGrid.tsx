"use client";

import GridItem from "./GridItem"

export default function ProjectsHomeGrid() {
  return (
    <>
        <div className="w-full h-0 gradient-bg"></div>
        <div className="container mx-auto px-4 py-8">
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
      <style jsx>{`
          .gradient-bg {
            box-shadow: 0 0 75px 70px black;
          }
      `}</style>
    </>
  );
}
