import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";

import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.png";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.png";
import project5 from "@/assets/project-5.png";

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "All" },
    { id: "fullstack", label: "Full Stack" },
    { id: "systems", label: "Systems & Security" },
    { id: "ai", label: "AI & ML" },
  ];

  const projects = [
    {
      id: 1,
      title: "VTUN Note",
      subtitle: "MERN + OpenAI API — Dec 2024",
      category: "fullstack",
      image: project1,
      github: "https://github.com/aditya-27bytes/vtun-note",
      demo: "https://vtun-note.vercel.app",
      description: "AI assistant parsing PDFs for summaries, flashcards, and concept maps. 1000+ concurrent users.",
    },
    {
      id: 2,
      title: "Solar Shield",
      subtitle: "Rust + WebSockets — Nov 2024",
      category: "systems",
      image: project2,
      github: "https://github.com/aditya-27bytes/solar-shield",
      demo: null,
      description: "NASA Space Weather Monitor with sub-100ms latency handling 10,000+ data points/min.",
    },
    {
      id: 3,
      title: "Educational Keylogger",
      subtitle: "Python + Cryptography — Oct 2024",
      category: "systems",
      image: project3,
      github: "https://github.com/aditya-27bytes/educational-keylogger",
      demo: null,
      description: "Cybersecurity tool demonstrating attack vectors and defensive countermeasures.",
    },
    {
      id: 4,
      title: "AI Hand Gesture Recognition",
      subtitle: "TensorFlow + OpenCV — Sep 2024",
      category: "ai",
      image: project4,
      github: "https://github.com/aditya-27bytes/hand-gesture-recognition",
      demo: null,
      description: "Real-time computer vision with 95%+ accuracy at 30 FPS.",
    },
    {
      id: 5,
      title: "Scroll Shame Extension",
      subtitle: "Chrome API — Aug 2024",
      category: "fullstack",
      image: project5,
      github: "https://github.com/aditya-27bytes/scroll-shame",
      demo: null,
      description: "Distraction-free YouTube extension with viewing analytics and autoplay blocking.",
    },
  ];

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="portfolio" className="py-12 animate-fade-up">
      <h2 className="text-3xl font-semibold mb-2">
        My <span className="gradient-text">Portfolio</span>
      </h2>
      <div className="w-12 h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-8" />

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className="project-card group block animate-scale-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 flex flex-col justify-end p-5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
              <p className="text-sm text-primary mb-1">{project.subtitle}</p>
              <p className="text-xs text-muted-foreground mb-3">{project.description}</p>
              <div className="flex items-center gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-foreground hover:text-primary text-sm font-medium transition-colors"
                >
                  <Github className="w-4 h-4" /> Code
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                )}
              </div>
            </div>
            {/* Always visible title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background/80 to-transparent group-hover:opacity-0 transition-opacity duration-300">
              <h3 className="font-medium text-foreground">{project.title}</h3>
              <p className="text-sm text-muted-foreground">{project.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
