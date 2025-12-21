import { GraduationCap, Award } from "lucide-react";

const Resume = () => {
  const education = [
    {
      title: "Bachelor of Engineering in Computer Science",
      institution: "KLE Institute of Technology",
      period: "Oct 2022 — Present",
      description: "CGPA: 8.0 — Focused on software development, algorithms, and machine learning applications.",
    },
  ];

  const certifications = [
    {
      title: "Cybersecurity Master Program",
      issuer: "Vijesha IT",
      period: "2024",
      description: "Advanced penetration testing and security operations.",
    },
    {
      title: "Google Cybersecurity Professional",
      issuer: "Google",
      period: "2024",
      description: "Security operations and threat analysis.",
    },
    {
      title: "Tata Cybersecurity Analyst",
      issuer: "Tata",
      period: "2024",
      description: "Enterprise security and vulnerability assessment.",
    },
    {
      title: "AWS APAC Solutions Architecture",
      issuer: "Amazon Web Services",
      period: "2024",
      description: "Cloud architecture and deployment strategies.",
    },
  ];

  const skills = [
    { name: "Python / C++ / Rust / TypeScript", percentage: 92 },
    { name: "React / Node.js / Next.js (MERN)", percentage: 95 },
    { name: "TensorFlow / PyTorch / OpenCV", percentage: 88 },
    { name: "MongoDB / PostgreSQL / Firebase", percentage: 90 },
    { name: "AWS / Docker / Kubernetes", percentage: 85 },
    { name: "Penetration Testing / Kali Linux", percentage: 82 },
  ];

  return (
    <section id="resume" className="py-12 animate-fade-up">
      <h2 className="text-3xl font-semibold mb-2">
        My <span className="gradient-text">Resume</span>
      </h2>
      <div className="w-12 h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Education */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10">
              <GraduationCap className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-medium">Education</h3>
          </div>
          <div className="space-y-0">
            {education.map((item, index) => (
              <div key={index} className="timeline-item">
                <h4 className="font-medium text-foreground">{item.title}</h4>
                <p className="text-sm text-primary mb-1">{item.institution}</p>
                <p className="text-xs text-muted-foreground mb-2">{item.period}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Labs & Achievements */}
          <div className="mt-8 p-4 rounded-xl bg-secondary/50 border border-border">
            <h4 className="font-medium text-foreground mb-2">Labs & Leadership</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 50+ penetration testing labs on Hack The Box & TryHackMe</li>
              <li>• Privilege escalation, OWASP Top 10, CTFs</li>
              <li>• Media Team Head at KLE Institute</li>
            </ul>
          </div>
        </div>

        {/* Certifications */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10">
              <Award className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-medium">Certifications</h3>
          </div>
          <div className="space-y-0">
            {certifications.map((item, index) => (
              <div key={index} className="timeline-item">
                <h4 className="font-medium text-foreground">{item.title}</h4>
                <p className="text-sm text-primary mb-1">{item.issuer}</p>
                <p className="text-xs text-muted-foreground mb-2">{item.period}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skills */}
      <h3 className="text-xl font-medium mb-6">Technical Skills</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skill, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-foreground">{skill.name}</span>
              <span className="text-sm text-primary">{skill.percentage}%</span>
            </div>
            <div className="skill-bar">
              <div 
                className="skill-bar-fill"
                style={{ 
                  width: `${skill.percentage}%`,
                  animationDelay: `${index * 100}ms`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Resume;
