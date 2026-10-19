import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 text-foreground ${
        scrolled ? "bg-background/95 backdrop-blur-md border-b border-border/40" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4 group">
          <div className="relative overflow-hidden flex items-center justify-center w-8 h-8 rounded-full border border-border/50 bg-card group-hover:border-primary transition-colors">
            <span className="text-primary font-bold text-xs">AD</span>
          </div>
          <span className="flex flex-col leading-none">
            <b className="text-[11px] tracking-[0.2em] font-medium uppercase">Aryan Dixit</b>
            <i className="not-italic text-[8px] tracking-[0.3em] text-muted-foreground uppercase mt-1">Samurai of Code</i>
          </span>
        </Link>

        <nav className="hidden sm:flex items-center gap-10">
          {[
            { name: "GitHub", href: "#gate" },
            { name: "Projects", href: "#pathways" },
            { name: "Life", href: "#lessons" },
            { name: "Thanks", href: "#eternity" },
            { name: "Contact", href: "#contact" },
          ].map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors py-2 group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left transition-transform duration-500 ease-out" />
            </a>
          ))}
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="sm:hidden">
            <button type="button" aria-label="Open menu" className="p-2 text-foreground hover:text-primary transition-colors">
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-background/95 backdrop-blur-xl text-foreground border-border/40 w-full sm:w-[400px]">
            <nav className="flex flex-col gap-8 mt-16 text-sm uppercase tracking-[0.25em]">
              <a href="#gate" onClick={() => setOpen(false)} className="hover:text-primary transition-colors">GitHub</a>
              <a href="#pathways" onClick={() => setOpen(false)} className="hover:text-primary transition-colors">Projects</a>
              <a href="#lessons" onClick={() => setOpen(false)} className="hover:text-primary transition-colors">Life</a>
              <a href="#eternity" onClick={() => setOpen(false)} className="hover:text-primary transition-colors">Thanks</a>
              <a href="#contact" onClick={() => setOpen(false)} className="hover:text-primary transition-colors">Contact</a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}