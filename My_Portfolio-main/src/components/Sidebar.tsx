import { useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Github, Download, ChevronDown, X } from "lucide-react";
import avatar from "@/assets/avatar.png";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const [showContacts, setShowContacts] = useState(false);

  const contacts = [
    { icon: Mail, label: "Email", value: "adityasanjaychougale27@gmail.com", href: "mailto:adityasanjaychougale27@gmail.com" },
    { icon: Phone, label: "Phone", value: "+91 7353167822", href: "tel:+917353167822" },
    { icon: MapPin, label: "Location", value: "Hubli, Karnataka", href: "#" },
  ];

  const socials = [
    { icon: Linkedin, href: "https://linkedin.com/in/aditya-chougale-953330259", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/aditya-27bytes", label: "GitHub" },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`
        fixed lg:sticky top-0 left-0 z-50 h-screen w-80 
        bg-card border-r border-border
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        overflow-y-auto
      `}>
        {/* Close button for mobile */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground lg:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 flex flex-col items-center">
          {/* Avatar */}
          <div className="relative mb-6 animate-fade-up">
            <div className="w-36 h-36 rounded-2xl overflow-hidden gradient-border glow-primary">
              <img 
                src={avatar} 
                alt="Aditya Sanjay Chougale - Full Stack Developer" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-card" />
          </div>

          {/* Name & Title */}
          <h1 className="text-xl font-semibold text-foreground mb-1 animate-fade-up animation-delay-200 text-center">
            Aditya Sanjay Chougale
          </h1>
          <p className="text-sm text-primary font-medium mb-6 animate-fade-up animation-delay-400">
            Full Stack Developer
          </p>

          {/* Contact Toggle */}
          <button
            onClick={() => setShowContacts(!showContacts)}
            className="w-full flex items-center justify-between px-4 py-3 bg-secondary rounded-lg mb-4 transition-colors hover:bg-secondary/80"
          >
            <span className="text-sm font-medium">Show Contacts</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showContacts ? 'rotate-180' : ''}`} />
          </button>

          {/* Contact Info */}
          <div className={`w-full space-y-4 overflow-hidden transition-all duration-300 ${showContacts ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            {contacts.map((contact, index) => (
              <a
                key={index}
                href={contact.href}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors group"
              >
                <div className="p-2.5 rounded-lg bg-secondary group-hover:bg-primary/10 transition-colors">
                  <contact.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">{contact.label}</p>
                  <p className="text-sm text-foreground truncate">{contact.value}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-border my-6" />

          {/* Resume Download */}
          <a
            href="/AdityaChougale_Resume.pdf"
            download
            className="btn-primary w-full justify-center mb-6"
          >
            <Download className="w-4 h-4" />
            Download Resume
          </a>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-3 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
