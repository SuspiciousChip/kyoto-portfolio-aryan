import { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import KageScene from "@/components/KageScene";

const GITHUB_URL = "https://github.com/SuspiciousChip";
const LINKEDIN_URL = "https://www.linkedin.com/in/sus-aryan/";
const EMAIL = "aryandixit2905@gmail.com";

const IMG_APPROACH =
  "https://media.base44.com/images/public/6ad5a95899251dd9d97b07e0/e8b77543f_generated_6d3151c1.jpg";
const IMG_LANTERN =
  "https://media.base44.com/images/public/6ad5a95899251dd9d97b07e0/bf1611ad8_generated_7c815031.jpg";
const IMG_MOON =
  "https://media.base44.com/images/public/6ad5a95899251dd9d97b07e0/e232cb938_generated_7c4dd6d7.jpg";

/* ───────────── Loading ───────────── */

function LoadingOverlay({ progress }) {
  return (
    <div
      className="fixed inset-0 z-[100] bg-background flex items-center justify-center transition-opacity duration-700"
      style={{ opacity: progress >= 1 ? 0 : 1, pointerEvents: progress >= 1 ? "none" : "auto" }}
    >
      <div className="text-center px-4">
        <div className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground mb-3">影の道</div>
        <div className="text-xs sm:text-sm tracking-[0.2em] uppercase text-foreground/70 mb-10">
          Raising the mountain temple
        </div>
        <div className="text-5xl sm:text-6xl font-light text-primary tabular-nums">
          {Math.round(progress * 100)}%
        </div>
        <div className="mt-6 w-48 h-px bg-border mx-auto overflow-hidden">
          <div
            className="h-full bg-primary origin-left transition-transform duration-300"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      </div>
    </div>
  );
}

/* ───────────── Helpers ───────────── */

const AnimatedElement = ({ children, className, delay = 0 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px 200px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className || ""}`}
    >
      {children}
    </div>
  );
};

function SectionLabel({ num, text, kanji }) {
  return (
    <div className="flex items-center justify-between border-b border-border pb-3 mb-10 sm:mb-14 text-[10px] sm:text-xs tracking-[0.25em] uppercase text-muted-foreground">
      <span>
        <b className="text-primary font-medium">{num}</b> — {text}
      </span>
      <span>{kanji}</span>
    </div>
  );
}

/* ───────────── Hero ───────────── */

function HeroSection() {
  const steps = [
    { n: "01", t: "Python" },
    { n: "02", t: "TypeScript" },
    { n: "03", t: "JavaScript" },
    { n: "04", t: "Open Source" },
  ];
  return (
    <section id="top" className="relative min-h-screen flex flex-col justify-between">
      {/* Top: chapter label */}
      <div className="pt-28 sm:pt-32 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-muted-foreground flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-primary inline-block" /> Chapter 00 — The Introduction
        </div>
      </div>

      {/* Center: Aryan Dixit */}
      <div className="flex-1 flex items-center justify-center px-4 relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span
            className="text-foreground/[0.04] font-bold leading-none whitespace-nowrap"
            style={{ fontSize: "clamp(8rem, 28vw, 22rem)" }}
          >
            影の道
          </span>
        </div>
        <h1
          className="relative text-center font-normal tracking-tight leading-none"
          style={{ fontSize: "clamp(2.5rem, 9vw, 7rem)" }}
        >
          <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent animate-gradient-x">
            Aryan Dixit
          </span>
        </h1>
      </div>

      {/* Bottom: scroll cue + steps + card */}
      <div className="pb-10 sm:pb-12 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Scroll to enter
              <span className="relative w-14 h-px bg-border overflow-hidden">
                <span
                  className="absolute inset-0 bg-primary origin-left"
                  style={{ animation: "cue 2.4s ease-in-out infinite" }}
                />
              </span>
            </div>
            <div className="flex gap-5 sm:gap-10 flex-wrap">
              {steps.map((s) => (
                <div key={s.n} className="group">
                  <span className="text-3xl sm:text-4xl font-light text-foreground group-hover:text-primary transition-colors">
                    {s.n}
                  </span>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
                    {s.t}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group self-start sm:self-auto w-56 border border-border bg-card/60 backdrop-blur-md hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.4)] transition-all duration-500"
          >
            <div className="p-3 flex items-center justify-between text-xs">
              <span className="text-2xl">侍</span>
              <i className="not-italic text-muted-foreground tracking-wider uppercase text-[10px]">
                Open source samurai
              </i>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ───────────── GitHub ───────────── */

function GithubStats() {
  const [stats, setStats] = useState({ repos: "—", contributions: "—", streak: "—", forks: "—" });

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const user = await fetch("https://api.github.com/users/SuspiciousChip").then((r) =>
          r.json()
        );
        const repos = await fetch(
          "https://api.github.com/users/SuspiciousChip/repos?per_page=100"
        ).then((r) => r.json());
        const forks = Array.isArray(repos) ? repos.reduce((a, r) => a + (r.forks_count || 0), 0) : 0;
        let contributions = "—";
        let streak = "—";
        try {
          const c = await fetch(
            "https://github-contributions-api.jogruber.de/v4/SuspiciousChip?y=last"
          ).then((r) => r.json());
          const days = (c.contributions || []).filter((d) => new Date(d.date) <= new Date());
          contributions = String(days.reduce((a, d) => a + d.count, 0));
          let s = 0;
          for (let i = days.length - 1; i >= 0; i--) {
            if (days[i].count > 0) s++;
            else if (i === days.length - 1) continue;
            else break;
          }
          streak = String(s);
        } catch (e) {
          /* ignore */
        }
        if (!cancelled) {
          setStats({
            repos: String(user.public_repos ?? "—"),
            contributions,
            streak,
            forks: String(forks),
          });
        }
      } catch (e) {
        /* ignore */
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const items = [
    { v: stats.repos, l: "Total repos" },
    { v: stats.contributions, l: "Total contributions" },
    { v: stats.streak, l: "Current streak" },
    { v: stats.forks, l: "Total forks" },
  ];
  return (
    <AnimatedElement className="mt-16 sm:mt-24">
      <div className="grid grid-cols-2 lg:grid-cols-4 border border-border bg-card/30 backdrop-blur-sm">
        {items.map((s, i) => (
          <div
            key={s.l}
            className={`p-5 sm:p-6 hover:bg-muted/50 transition-colors duration-300 ${
              i % 2 === 0 ? "border-r" : ""
            } lg:border-r ${i === 3 ? "lg:border-r-0" : ""} ${
              i < 2 ? "border-b lg:border-b-0" : ""
            } border-border`}
          >
            <b className="block text-3xl sm:text-4xl font-light">{s.v}</b>
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              {s.l}
            </span>
          </div>
        ))}
      </div>
    </AnimatedElement>
  );
}

function IntroSection() {
  return (
    <section id="gate" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-background/40" />
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
        <SectionLabel num="01" text="GitHub" kanji="山門" />
        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          <AnimatedElement>
            <h2
              className="uppercase font-normal leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Code, commits,
              <br />
              and one{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">
                open
              </span>{" "}
              door.
            </h2>
          </AnimatedElement>
          <AnimatedElement delay={120}>
            <p className="text-sm sm:text-base text-foreground/90 leading-relaxed mb-5">
              My GitHub profile, SuspiciousChip, is where my journey lives: small experiments, open
              source contributions, hackathon builds and half-finished ideas that taught me more than
              any tutorial. Every repository is a step on the path, every commit a lesson written in
              public.
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-8">
              I keep my work open, learn by contributing, and treat the graph of green squares as a
              quiet practice — show up, write something, ship it, repeat.
            </p>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden inline-flex items-center gap-3 border border-border px-5 py-3 text-[10px] sm:text-xs uppercase tracking-[0.2em] hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 break-all"
            >
              <span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent bg-[length:200%_100%]"
                style={{ animation: "shimmer 3s ease-in-out infinite" }}
              />
              <Github className="w-4 h-4 relative" />
              <span className="relative">github.com/SuspiciousChip</span>
              <ArrowUpRight className="w-4 h-4 relative group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </AnimatedElement>
        </div>
        <GithubStats />
      </div>
    </section>
  );
}

/* ───────────── Projects ───────────── */

function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    base44.entities.Project.list("order", 3).then(setProjects).catch(() => {});
  }, []);

  const staticFallback = [
    {
      title: "Project One",
      kanji: "参道",
      label: "Approach",
      description: "My top project number one.",
      tech: "Open Source",
      url: GITHUB_URL,
      order: 1,
    },
    {
      title: "Project Two",
      kanji: "灯籠",
      label: "Lanterns",
      description: "My top project number two.",
      tech: "Open Source",
      url: GITHUB_URL,
      order: 2,
    },
    {
      title: "Project Three",
      kanji: "月影",
      label: "Moonwater",
      description: "My top project number three.",
      tech: "Open Source",
      url: GITHUB_URL,
      order: 3,
    },
  ];
  const items =
    projects.length > 0
      ? [...projects].sort((a, b) => (a.order || 0) - (b.order || 0))
      : staticFallback;
  const imgs = [IMG_APPROACH, IMG_LANTERN, IMG_MOON];
  const subs = ["The long climb", "Lantern court", "The wet court"];

  const Card = ({ i, className }) => {
    const p = items[i];
    if (!p) return null;
    return (
      <button
        type="button"
        onClick={() => setActive(p)}
        className={`group relative overflow-hidden border border-border text-left bg-card/60 backdrop-blur-md hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.35)] transition-all duration-500 ${className}`}
      >
        <img
          src={imgs[i]}
          alt={p.label}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <div className="flex justify-between items-end">
            <b className="uppercase font-normal text-sm sm:text-base tracking-wider">{p.label}</b>
            <span className="text-muted-foreground text-xs">{p.kanji}</span>
          </div>
          <div className="flex justify-between text-[10px] uppercase tracking-widest text-muted-foreground mt-2">
            <span>{subs[i]}</span>
            <span>
              0{i + 1} / 03
            </span>
          </div>
        </div>
      </button>
    );
  };

  return (
    <section id="pathways" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-background/30" />
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
        <SectionLabel num="02" text="Top Projects" kanji="庭園" />
        <AnimatedElement>
          <div className="grid md:grid-cols-3 gap-3 md:grid-rows-2">
            <Card i={0} className="md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto md:min-h-[560px]" />
            <Card i={1} className="aspect-[16/10]" />
            <Card i={2} className="aspect-[16/10]" />
          </div>
        </AnimatedElement>
        <p className="mt-6 text-xs text-muted-foreground tracking-widest uppercase">
          Tap a card to open the project
        </p>
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="bg-card text-card-foreground border-border">
          {active && (
            <>
              <DialogHeader>
                <DialogTitle className="uppercase font-normal tracking-wider">
                  {active.title} <span className="text-muted-foreground ml-2">{active.kanji}</span>
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">{active.tech}</DialogDescription>
              </DialogHeader>
              <p className="text-sm leading-relaxed">{active.description}</p>
              <a
                href={active.url || GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border px-4 py-3 text-xs uppercase tracking-[0.2em] hover:border-primary transition-colors w-fit"
              >
                <Github className="w-4 h-4" /> Open on GitHub <ArrowUpRight className="w-4 h-4" />
              </a>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

/* ───────────── Life ───────────── */

function LifeSection() {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    base44.entities.LearningTopic.list("order", 10).then(setTopics).catch(() => {});
  }, []);
  const staticFallback = [
    { order: "01", title: "Python", kanji: "蛇", description: "Scripting, automation and problem solving with clean, readable code.", level: "Learning" },
    { order: "02", title: "TypeScript", kanji: "型", description: "Adding types to JavaScript for safer, more scalable applications.", level: "Learning" },
    { order: "03", title: "JavaScript", kanji: "動", description: "The language of the web: async flows, the DOM and modern ES features.", level: "Learning" },
    { order: "04", title: "Git", kanji: "道", description: "Version control, branching and collaborating on open source projects.", level: "Learning" },
    { order: "05", title: "Dart", kanji: "矢", description: "Building fast, beautiful cross-platform apps with Dart and Flutter.", level: "Learning" },
  ];
  const items =
    topics.length > 0
      ? [...topics].sort((a, b) => String(a.order).localeCompare(String(b.order)))
      : staticFallback;

  return (
    <section id="lessons" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-background/40" />
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
        <SectionLabel num="03" text="About My Life" kanji="手業" />
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 mb-14">
          <AnimatedElement>
            <h2
              className="uppercase font-normal leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              I love open source.
              <br />
              I love hackathons.
              <br />
              I love to build.
            </h2>
          </AnimatedElement>
          <AnimatedElement delay={120}>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              My life is a loop of curiosity: contributing to open source, joining hackathons,
              shipping late-night prototypes and learning from people better than me. Here is what I
              am currently learning.
            </p>
          </AnimatedElement>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-6 border border-border">
          {items.map((t, i) => (
            <AnimatedElement
              key={t.title}
              delay={i * 80}
              className={`${i < 2 ? "lg:col-span-3" : "lg:col-span-2"} border-b border-r-0 sm:border-r border-border bg-card/30 backdrop-blur-sm hover:bg-muted/50 group transition-colors duration-300`}
            >
              <div className="p-5 sm:p-6 h-full flex flex-col min-h-[200px]">
                <span className="text-[10px] tracking-[0.3em] text-muted-foreground">{t.order}</span>
                <h3 className="mt-3 text-xl sm:text-2xl font-normal group-hover:text-primary transition-colors">
                  {t.title} <em className="not-italic text-muted-foreground text-base ml-1">{t.kanji}</em>
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {t.description}
                </p>
                <span className="mt-auto pt-6 text-[10px] uppercase tracking-[0.25em] text-primary">
                  {t.level}
                </span>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Thanks ───────────── */

function ThanksSection() {
  return (
    <section id="eternity" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-background/30" />
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
        <AnimatedElement>
          <div className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-muted-foreground mb-8">
            Chapter 04 — Thanks
          </div>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
            <div className="max-w-md">
              <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
                Thank you for walking this path with me. Whether you read a line of code, starred a
                repo, or simply stopped by — it means the world to a student still learning. Keep
                building, keep sharing, and let us connect.
              </p>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden mt-8 inline-flex items-center gap-3 border border-border px-5 py-3 text-[10px] sm:text-xs uppercase tracking-[0.2em] hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
              >
                <span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent bg-[length:200%_100%]"
                  style={{ animation: "shimmer 3s ease-in-out infinite" }}
                />
                <Linkedin className="w-4 h-4 relative" />
                <span className="relative">Connect on LinkedIn</span>
                <ArrowUpRight className="w-4 h-4 relative" />
              </a>
            </div>
            <h2
              className="uppercase font-light leading-none bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x md:[writing-mode:vertical-rl]"
              style={{ fontSize: "clamp(3rem, 12vw, 9rem)" }}
            >
              Thanks
            </h2>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}

/* ───────────── Contact ───────────── */

function ContactSection() {
  const links = [
    { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/sus-aryan", href: LINKEDIN_URL, ext: true },
    { icon: Github, label: "GitHub", value: "github.com/SuspiciousChip", href: GITHUB_URL, ext: true },
    { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, ext: false },
  ];
  return (
    <section id="contact" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 bg-background/50" />
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
        <SectionLabel num="05" text="Contact" kanji="連絡" />
        <AnimatedElement>
          <h2
            className="uppercase font-normal leading-[1.05] tracking-tight mb-12"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Let us{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">
              talk
            </span>
            .
          </h2>
        </AnimatedElement>
        <div className="grid md:grid-cols-3 gap-3">
          {links.map((l, i) => (
            <AnimatedElement key={l.label} delay={i * 80}>
              <a
                href={l.href}
                {...(l.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group block border border-border bg-card/50 backdrop-blur-md p-6 hover:-translate-y-1 hover:border-primary hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.3)] transition-all duration-500"
              >
                <l.icon className="w-6 h-6 text-primary mb-6" />
                <span className="block text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  {l.label}
                </span>
                <span className="mt-2 flex items-center justify-between gap-2 text-sm break-all">
                  {l.value}
                  <ArrowUpRight className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </a>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Page ───────────── */

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <div className="relative">
      <KageScene onProgress={setProgress} onLoaded={() => setLoading(false)} />
      <div className="kage-grain" />
      <div className="kage-vignette" />
      {loading && <LoadingOverlay progress={progress} />}
      <div className="relative" style={{ zIndex: 10 }}>
        <HeroSection />
        <IntroSection />
        <ProjectsSection />
        <LifeSection />
        <ThanksSection />
        <ContactSection />
      </div>
    </div>
  );
}