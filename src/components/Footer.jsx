import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary/70 backdrop-blur-md text-secondary-foreground border-t border-border relative" style={{ zIndex: 10 }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-14 pb-8">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <p className="md:col-span-1 text-sm text-muted-foreground leading-relaxed">
            A five-chapter walk through the journey of Aryan Dixit — student at Newton School of Technology, Bangalore,
            learning open source and exploring himself.
          </p>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Chapters</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#top" className="hover:text-primary transition-colors">The Introduction</a></li>
              <li><a href="#gate" className="hover:text-primary transition-colors">GitHub</a></li>
              <li><a href="#pathways" className="hover:text-primary transition-colors">Top Projects</a></li>
              <li><a href="#lessons" className="hover:text-primary transition-colors">About My Life</a></li>
              <li><a href="#eternity" className="hover:text-primary transition-colors">Thanks</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Learning</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#lessons" className="hover:text-primary transition-colors">Python</a></li>
              <li><a href="#lessons" className="hover:text-primary transition-colors">TypeScript</a></li>
              <li><a href="#lessons" className="hover:text-primary transition-colors">JavaScript</a></li>
              <li><a href="#lessons" className="hover:text-primary transition-colors">Git</a></li>
              <li><a href="#lessons" className="hover:text-primary transition-colors">Dart</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Elsewhere</h4>
            <ul className="space-y-3 text-xs">
              <li><a href="https://github.com/SuspiciousChip" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors"><Github className="w-4 h-4" /> GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/sus-aryan/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors"><Linkedin className="w-4 h-4" /> LinkedIn</a></li>
              <li><a href="mailto:aryandixit2905@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors break-all"><Mail className="w-4 h-4 shrink-0" /> aryandixit2905@gmail.com</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row gap-3 justify-between text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <span>© 2026 Aryan Dixit</span>
          <span>静けさは一つの技である</span>
          <span>Open Source · Onest · Bangalore</span>
        </div>
      </div>
    </footer>
  );
}