import { User, FileText, Briefcase, Mail, Menu } from "lucide-react";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onMenuClick: () => void;
}

const Navigation = ({ activeSection, onSectionChange, onMenuClick }: NavigationProps) => {
  const navItems = [
    { id: "about", label: "About", icon: User },
    { id: "resume", label: "Resume", icon: FileText },
    { id: "portfolio", label: "Portfolio", icon: Briefcase },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-8 px-8 py-4 bg-card/50 backdrop-blur-xl border-b border-border sticky top-0 z-30">
        <div className="flex items-center gap-8 ml-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`nav-link font-medium ${activeSection === item.id ? 'active' : ''}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 lg:hidden bg-card/95 backdrop-blur-xl border-t border-border z-30">
        <div className="flex items-center justify-around py-2">
          <button
            onClick={onMenuClick}
            className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Menu className="w-5 h-5" />
            <span className="text-xs">Menu</span>
          </button>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`flex flex-col items-center gap-1 p-2 transition-colors ${
                activeSection === item.id ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
