import Hero from '@/components/hero';
import ProjectsHomeGrid from '@/components/ProjectsGrid/ProjectsGrid';
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
