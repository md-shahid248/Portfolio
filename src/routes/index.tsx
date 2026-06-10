import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  X,
} from "lucide-react";
import portrait from "@/assets/portrait.jpg";
import projectFind from "@/assets/project-finditcampus.jpg";
import projectMarine from "@/assets/project-marine.jpg";
import { ThemeToggle } from "@/components/theme-toggle";
import { Typewriter } from "@/components/typewriter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mohammed Shahid R — Software Engineer & Full-Stack Developer" },
      {
        name: "description",
        content:
          "Portfolio of Mohammed Shahid R — final-year ISE student, full-stack developer, cloud enthusiast and aspiring software engineer based in Bengaluru.",
      },
      { property: "og:title", content: "Mohammed Shahid R — Portfolio" },
      {
        property: "og:description",
        content:
          "Full-stack developer, cloud enthusiast and aspiring software engineer building intelligent, scalable applications.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Portfolio,
});

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function useClock() {
  const [now, setNow] = useState<string>("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setNow(
        d.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Asia/Kolkata",
        }),
      );
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);
  return now;
}

function Section({
  id,
  eyebrow,
  title,
  side,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  side?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-border px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{eyebrow}</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
          {side && <p className="mt-3 text-sm text-muted-foreground">{side}</p>}
        </div>
        <div className="md:col-span-8">{children}</div>
      </div>
    </section>
  );
}

function Portfolio() {
  const clock = useClock();
  const [open, setOpen] = useState(false);

  const skills = useMemo(
    () => [
      {
        category: "Programming",
        items: [
          { name: "Python", level: 90 },
          { name: "Java", level: 82 },
        ],
      },
      {
        category: "Web Development",
        items: [
          { name: "React.js", level: 90 },
          { name: "Node.js / Express", level: 85 },
          { name: "MongoDB", level: 80 },
          { name: "REST APIs", level: 88 },
        ],
      },
      {
        category: "Cloud",
        items: [
          { name: "Cloud Computing", level: 78 },
          { name: "Cloud Deployment", level: 80 },
        ],
      },
    ],
    [],
  );

  const softSkills = [
    "Communication",
    "Leadership",
    "Teamwork",
    "Problem-Solving",
    "Critical Thinking",
    "Adaptability",
    "Time Management",
    "Active Listening",
    "Analytical Thinking",
    "Creativity",
    "Decision-Making",
    "Presentation",
    "Project Management",
    "Continuous Learning",
    "Attention to Detail",
  ];

  const projects = [
    {
      title: "FindItCampus — Lost & Found Portal",
      tag: "MERN · Production",
      year: "2026",
      image: projectFind,
      description:
        "Production-ready MERN stack platform with JWT auth, role-based access, item management, advanced search, image uploads and admin dashboard. Deployed on Render with MongoDB Atlas and Cloudinary.",
      stack: ["React.js", "Node.js", "Express", "MongoDB", "JWT", "Tailwind", "Cloudinary"],
      highlights: ["JWT Auth", "RBAC", "15+ REST APIs", "Cloudinary", "Admin Dashboard"],
      links: { github: "https://github.com/md-shahid248" },
    },
    {
      title: "Marine Pollution Detection",
      tag: "AI / Computer Vision",
      year: "2025",
      image: projectMarine,
      description:
        "AI-powered marine pollution detection that identifies ocean plastic waste with 85%+ accuracy using YOLOv8, dataset augmentation and hyperparameter tuning, served via Flask REST APIs.",
      stack: ["Python", "YOLOv8", "Flask", "REST APIs", "JavaScript"],
      highlights: ["85%+ Accuracy", "YOLOv8", "Flask APIs", "Realtime"],
      links: { github: "https://github.com/md-shahid248" },
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
          <a href="#home" className="text-sm font-semibold tracking-tight">
            Mohammed Shahid R<sup className="ml-0.5 text-primary">®</sup>
          </a>
          <div className="hidden items-center gap-2 text-xs text-muted-foreground md:flex">
            <span>Bengaluru (IST)</span>
            <span className="tabular-nums text-foreground">{clock}</span>
          </div>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </nav>
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="border-t border-border md:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col px-6 py-3">
              {NAV.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  {n.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="px-6 pb-20 pt-16 md:px-12 md:pb-28 md:pt-24">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12">
          <div className="reveal md:order-2 md:col-span-7">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Introduction
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              Hi, I'm Shahid —{" "}
              <span className="text-muted-foreground">
                a{" "}
                <Typewriter
                  className="text-primary"
                  words={[
                    "Full-Stack Developer",
                    "Cloud Enthusiast",
                    "AI & ML Learner",
                    "Software Engineer",
                  ]}
                />
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
              Passionate about building intelligent applications, scalable web solutions and
              cloud-powered systems that solve real-world problems.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                View Projects <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/resume.pdf"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium hover:bg-accent"
              >
                Download Resume <Download className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-2 py-2 text-sm text-muted-foreground hover:text-foreground"
              >
                Contact me <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="md:order-1 md:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-card">
              <img
                src={portrait}
                alt="Mohammed Shahid R"
                width={1024}
                height={1024}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/80 to-transparent p-5">
                <div className="flex items-center justify-between text-xs text-foreground/90">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                    Available for opportunities
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> Bengaluru, IN
                  </span>
                </div>
              </div>
            </div>
            <ul className="mt-6 space-y-1.5 text-sm text-muted-foreground">
              <li className="text-foreground">→ Introduction</li>
              <li>Curiosity</li>
              <li>Craft</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about" eyebrow="About" title="About me" side="A bit of context.">
        <p className="text-lg leading-relaxed text-foreground md:text-xl">
          I'm a final-year Information Science and Engineering student passionate about Artificial
          Intelligence, Machine Learning, Full-Stack Development and Cybersecurity. A published
          researcher with hands-on experience building AI-powered solutions, scalable web
          applications and cloud-based systems — focused on shipping work that's both useful and
          well-crafted.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[
            "Aspiring Software Engineer",
            "Published Researcher",
            "Full-Stack Developer",
            "Cloud Enthusiast",
            "Strong Communicator",
            "Lifelong Learner",
          ].map((h) => (
            <div
              key={h}
              className="rounded-xl border border-border bg-card px-4 py-3 text-sm text-card-foreground"
            >
              {h}
            </div>
          ))}
        </div>
      </Section>

      {/* EDUCATION */}
      <Section id="education" eyebrow="Education" title="Academic path">
        <div className="relative rounded-2xl border border-border bg-card p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                2023 — 2027
              </p>
              <h3 className="mt-2 text-xl font-semibold md:text-2xl">
                Bachelor of Engineering — Information Science & Engineering
              </h3>
              <p className="mt-2 text-muted-foreground">
                East Point College of Engineering and Technology
              </p>
              <p className="text-sm text-muted-foreground">
                Visvesvaraya Technological University (VTU)
              </p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" /> Bengaluru, Karnataka
            </span>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { k: "Degree", v: "B.E. ISE" },
              { k: "Graduating", v: "2027" },
              { k: "Focus", v: "AI · Full-Stack · Cloud" },
            ].map((x) => (
              <div key={x.k} className="rounded-xl border border-border bg-background/40 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{x.k}</p>
                <p className="mt-1 font-medium">{x.v}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" eyebrow="Skills" title="Skills">
        <div className="grid gap-6 md:grid-cols-3">
          {skills.map((cat) => (
            <div
              key={cat.category}
              className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
            >
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {cat.category}
              </h3>
              <ul className="mt-5 space-y-3">
                {cat.items.map((s) => (
                  <li key={s.name} className="text-sm text-foreground">
                    {s.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-card p-6">
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Soft skills
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {softSkills.map((s) => (
              <span
                key={s}
                className="rounded-full border border-border bg-background/40 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* SERVICES */}
      <Section id="services" eyebrow="Services" title="What I offer">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              title: "Full-Stack Web Development",
              desc:
                "Designing and developing scalable, responsive and secure web applications using modern technologies and industry best practices.",
            },
            {
              title: "Cloud Computing Solutions",
              desc:
                "Deploying and managing cloud-based applications with scalable infrastructure and modern cloud technologies.",
            },
          ].map((s, i) => (
            <div
              key={s.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-primary/40"
            >
              <p className="text-xs tabular-nums text-muted-foreground">0{i + 1}</p>
              <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
              <ArrowUpRight className="absolute right-6 top-6 h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
            </div>
          ))}
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" eyebrow="Projects" title="Featured work" side="Selected case studies.">
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((p) => (
            <a
              key={p.title}
              href={p.links.github}
              target="_blank"
              rel="noreferrer"
              className="group block"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-card">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    {p.tag}
                  </p>
                  <h3 className="mt-1.5 text-lg font-semibold">{p.title}</h3>
                </div>
                <span className="text-xs tabular-nums text-muted-foreground">{p.year}</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{p.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.stack.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border px-2.5 py-0.5 text-[11px] text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" eyebrow="Contact" title="Let's connect" side="Open to roles, collabs and conversations.">
        <div className="grid gap-8 md:grid-cols-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              const subject = encodeURIComponent(`Portfolio · ${data.get("name") || "Hello"}`);
              const body = encodeURIComponent(
                `${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`,
              );
              window.location.href = `mailto:mohammedshahid2408@gmail.com?subject=${subject}&body=${body}`;
            }}
            className="space-y-4 rounded-2xl border border-border bg-card p-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="text-muted-foreground">Name</span>
                <input
                  required
                  name="name"
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </label>
              <label className="block text-sm">
                <span className="text-muted-foreground">Email</span>
                <input
                  required
                  type="email"
                  name="email"
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </label>
            </div>
            <label className="block text-sm">
              <span className="text-muted-foreground">Message</span>
              <textarea
                required
                name="message"
                rows={5}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </label>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
            >
              Send message <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="space-y-3">
            <a
              href="mailto:mohammedshahid2408@gmail.com"
              className="flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 transition-colors hover:border-primary/40"
            >
              <span className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-primary" /> mohammedshahid2408@gmail.com
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </a>
            <a
              href="https://www.linkedin.com/in/mdshahid-r/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 transition-colors hover:border-primary/40"
            >
              <span className="flex items-center gap-3 text-sm">
                <Linkedin className="h-4 w-4 text-primary" /> linkedin.com/in/mdshahid-r
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </a>
            <a
              href="https://github.com/md-shahid248"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 transition-colors hover:border-primary/40"
            >
              <span className="flex items-center gap-3 text-sm">
                <Github className="h-4 w-4 text-primary" /> github.com/md-shahid248
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </a>
            <div className="flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4">
              <span className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-primary" /> Bengaluru, Karnataka, India
              </span>
            </div>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-card/40 px-6 py-12 md:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <a href="#home" className="text-sm text-muted-foreground hover:text-foreground">
              ↑ Back to top
            </a>
            <p className="mt-6 max-w-sm text-sm text-muted-foreground">
              Building impactful technology solutions through innovation, learning and
              collaboration.
            </p>
          </div>
          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Pages</p>
            <ul className="mt-3 space-y-1.5 text-sm">
              {NAV.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="text-muted-foreground hover:text-foreground">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Online</p>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li>
                <a
                  href="https://www.linkedin.com/in/mdshahid-r/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/md-shahid248"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="mailto:mohammedshahid2408@gmail.com"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-7xl flex-col items-start justify-between gap-4 border-t border-border pt-8 md:flex-row md:items-end">
          <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
            Mohammed Shahid R<sup className="text-primary">®</sup>
          </h2>
          <p className="text-xs text-muted-foreground">
            © 2026 Mohammed Shahid R. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
