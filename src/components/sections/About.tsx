import { Code, Brain, Shield, Cloud } from "lucide-react";

const About = () => {
  const services = [
    {
      icon: Code,
      title: "Full Stack Development",
      description: "Building scalable web applications with modern technologies like React, Node.js, and MongoDB.",
    },
    {
      icon: Brain,
      title: "AI & Machine Learning",
      description: "Developing intelligent solutions using Python, TensorFlow, and cutting-edge ML algorithms.",
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description: "Implementing robust security measures and conducting vulnerability assessments.",
    },
    {
      icon: Cloud,
      title: "Cloud & DevOps",
      description: "Deploying and managing applications on AWS, Docker, and Kubernetes infrastructure.",
    },
  ];

  return (
    <section id="about" className="py-12 animate-fade-up">
      <h2 className="text-3xl font-semibold mb-2">
        About <span className="gradient-text">Me</span>
      </h2>
      <div className="w-12 h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-8" />

      <p className="text-muted-foreground leading-relaxed mb-12 text-balance">
        I'm a passionate Full Stack Developer with expertise in building innovative web applications 
        and exploring cutting-edge technologies. With a strong foundation in computer science and 
        hands-on experience in AI/ML, cybersecurity, and cloud technologies, I strive to create 
        solutions that make a meaningful impact. I believe in continuous learning and pushing the 
        boundaries of what's possible with technology.
      </p>

      <h3 className="text-xl font-medium mb-6">What I Do</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="service-card"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">{service.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
