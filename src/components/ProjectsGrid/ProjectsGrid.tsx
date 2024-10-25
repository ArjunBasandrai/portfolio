"use client";

import GridItem from "./GridItem"

export default function ProjectsHomeGrid( {params}: {
  params: {
    projects: {
      name: string;
      description: string;
      image: string;
    }[];
  }
  
} ) {
  return (
    <>
      <div className="w-full h-0 gradient-bg"></div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          {/* use list params */}
          {params.projects.map((project, index) => (
            <GridItem
              key={index}
              name={project.name}
              description={project.description}
              // image={project.image}
            />
          ))}
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
