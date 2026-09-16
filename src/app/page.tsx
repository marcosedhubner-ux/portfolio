import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SideProjectsSection } from "@/components/SideProjectsSection";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <Hero />
      <ProjectsSection />
      <SideProjectsSection />
      <AboutSection />
      <Footer />
    </>
  );
}
