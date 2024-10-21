import Hero from '@/components/hero';
import ProjectsHomeGrid from '@/components/HomePageProjectsGrid/ProjectsHomeGrid';
import '../styles/globals.css';

export default function Home() {
  return (
    <>
      <div className='bg-black'>
        <Hero />
        <ProjectsHomeGrid />
      </div>
    </>
  );
}
