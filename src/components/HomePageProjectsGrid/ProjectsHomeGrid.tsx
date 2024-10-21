import GridItem from "./GridItem"

export default function ProjectsHomeGrid() {
  return (
    <div className="container bg-black mx-auto px-4 py-8 -mt-48 relative z-10">
      <div className="flex flex-wrap -mx-4">
        <GridItem />        
        <GridItem />        
        <GridItem />        
        <GridItem />        
      </div>
    </div>
  );
}
