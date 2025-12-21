import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Navigation from "@/components/Navigation";
import About from "@/components/sections/About";
import Resume from "@/components/sections/Resume";
import Portfolio from "@/components/sections/Portfolio";
import Contact from "@/components/sections/Contact";
import GridBackground from "@/components/GridBackground";

const Index = () => {
  const [activeSection, setActiveSection] = useState("about");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setSidebarOpen(false);
    
    // Scroll to section smoothly
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "resume", "portfolio", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative">
      {/* Grid Background */}
      <GridBackground />
      
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        <Navigation
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <div className="flex-1 px-6 lg:px-12 xl:px-16 max-w-5xl mx-auto w-full">
          <About />
          <Resume />
          <Portfolio />
          <Contact />
        </div>

        {/* Footer */}
        <footer className="py-6 px-6 text-center text-sm text-foreground bg-secondary/30 backdrop-blur-sm border-t border-border/50 mt-12 mb-16 lg:mb-0 rounded-t-xl">
          <p>
            © {new Date().getFullYear()} Aditya Sanjay Chougale. Built with{" "}
            <span className="text-primary font-medium">passion</span> and{" "}
            <span className="text-primary font-medium">code</span>.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
