import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Moon,
  Sun,
  ExternalLink,
  Filter,
  FolderKanban,
  Sparkles,
  Workflow,
  BrainCircuit,
  Code2,
  ChevronRight,
  Copy,
  Check,
  Database,
  Server,
  LayoutTemplate,
  BriefcaseBusiness,
  BarChart3,
  Blocks,
} from 'lucide-react';

const profile = {
  name: 'Florian Rexhaj',
  title: 'Developer focused on modern products, clean interfaces and practical software',
  subtitle:
    'Ich baue Software mit Fokus auf sauberes Frontend, strukturierte Logik und Projekte, die nach echten Produkten aussehen statt nach reinen Schul-Demos.',
  location: 'Baden / Zürich, Schweiz',
  email: 'Florexhaj@hotmail.com',
  github: 'https://github.com/Floari100',
  linkedin: 'https://www.linkedin.com/in/florian-rexhaj-60a2b9363/',
  resume: `${import.meta.env.BASE_URL}CV_Florian_Rexhaj.pdf`,
};

const highlights = [
  { label: 'Fokus', value: 'Product UI · AI Ideen · Praktische Software' },
  { label: 'Aktuell', value: 'Swyte, Portfolio, Börsenspiel-IDPA, neue Produktideen' },
  { label: 'Arbeitsweise', value: 'Clean, strukturiert, modern und projektorientiert' },
];

const stackGroups = [
  {
    title: 'Frontend',
    icon: LayoutTemplate,
    items: ['React & TypeScript', 'HTML/CSS', 'Responsive UI'],
  },
  {
    title: 'Backend',
    icon: Server,
    items: ['C# /.NET', 'einfache REST-APIs'],
  },
  {
    title: 'Daten',
    icon: Database,
    items: ['SQL (MySQL/MariaDB)', 'Entity Framework Core', 'grundlegendes Datenmodellieren'],
  },
  {
    title: 'Tools & Team',
    icon: BriefcaseBusiness,
    items: ['Git / GitLab', 'Visual Studio / VS Code', 'Basis-Tests mit MSTest', 'Scrum-Abläufe'],
  },
];

const projects = [
  {
    name: 'Swyte',
    category: 'Featured',
    status: 'In Progress',
    year: '2026',
    icon: Sparkles,
    description:
      'Eine moderne Produktivitätsplattform rund um Mail, Kalender, AI-Unterstützung und klare Produktlogik mit starkem Fokus auf UI, Struktur und Nutzbarkeit.',
    details: [
      'Outlook-inspirierte Oberfläche neu gedacht mit klareren Flows und modernerem Interface',
      'Fokus auf Mail, Kalender, Automationen und saubere Produkt-UX statt nur visueller Effekte',
      'Langfristig als echte Plattform mit AI-Funktionen, Organisation und Gruppenlogik gedacht',
    ],
    tags: ['React', 'TypeScript', 'Product Design', 'AI UX'],
    links: [{ label: 'GitHub', href: 'https://github.com/Floari100' }],
  },
  {
    name: 'Börsenspiel mit Echtzeitdaten',
    category: 'Data & Finance',
    status: 'IDPA Concept / Build',
    year: '2026',
    icon: BarChart3,
    description:
      'Ein Börsenspiel-Projekt mit Marktlogik, Echtzeitdaten, Performance-Auswertung und einem Fokus auf Finanzdaten, Analyse und interaktive Darstellung.',
    details: [
      'Gedacht als IDPA-Projekt mit echter Datenanbindung statt rein statischer Beispieldaten',
      'Verknüpft Finanzinteresse, UI-Aufbereitung und technische Datenverarbeitung',
      'Starker Fokus auf Übersicht, Entwicklung von Portfolios und verständliche Visualisierung',
    ],
    tags: ['Finance', 'Realtime Data', 'Dashboard', 'Analysis'],
    links: [],
  },
  {
    name: 'EventPlaner Pro',
    category: 'Web App',
    status: 'Completed',
    year: '2025',
    icon: FolderKanban,
    description:
      'Eine Event-Management-Anwendung mit strukturierter Datenhaltung, klaren Benutzerflüssen und Fokus auf Verwaltung, Übersicht und saubere CRUD-Prozesse.',
    details: [
      'Veranstaltungen erfassen, bearbeiten, anzeigen und verwalten',
      'Frontend mit klarer Oberfläche und sinnvoller Informationsstruktur',
      'Praxisnahes Projekt für App-Logik, State-Verhalten und Benutzerführung',
    ],
    tags: ['React', 'CRUD', 'JSON', 'UI'],
    links: [],
  },
  {
    name: 'IMDB Machine Learning Project',
    category: 'Data & AI',
    status: 'Completed',
    year: '2025',
    icon: BrainCircuit,
    description:
      'ML-Projekt auf Basis eines IMDB-Datasets mit Datenvorbereitung, Modelltraining, Evaluation und Dokumentation im Rahmen eines Machine-Learning-Moduls.',
    details: [
      'Daten analysiert, vorbereitet und für Modelltraining aufbereitet',
      'ML-Workflow mit Evaluation und nachvollziehbarer Dokumentation umgesetzt',
      'Praktischer Einstieg in Data Science und angewandtes Machine Learning',
    ],
    tags: ['Python', 'Pandas', 'Machine Learning', 'Evaluation'],
    links: [],
  },
  {
    name: 'WhatsApp AI Bot mit n8n',
    category: 'AI & Automation',
    status: 'In Planning',
    year: '2025',
    icon: Workflow,
    description:
      'Konzept und technische Planung für einen WhatsApp-Chatbot mit n8n, OpenAI und gruppentauglichen Automationen für reale Kommunikationsabläufe.',
    details: [
      'Workflows für Antworten, Trigger und AI-gestützte Verarbeitung definiert',
      'Praktischer Einsatz in Gruppen und für reale Nutzungsszenarien mitgedacht',
      'Wichtiger Schritt Richtung AI-Service- und Automationsideen',
    ],
    tags: ['n8n', 'OpenAI', 'Automation', 'Workflow'],
    links: [],
  },



];

const filters = [
  'All',
  'Featured',
  'AI & Automation',
  'Web App',
  'Data & AI',
  'Data & Finance',
];

const strengths = [
  'Ich arbeite gern an Projekten, die wie echte Produkte wirken und nicht nur wie reine Schulabgaben.',
  'Mich interessieren moderne Interfaces, gute Struktur und Software, die man wirklich benutzen könnte.',
  'Ich verbinde technisches Umsetzen mit einem starken Auge für Design, Klarheit und Produktwirkung.',
  'Ich eigne mir neue Tools schnell an und arbeite mich auch selbstständig in neue Themen ein.',
];

const timeline = [
  {
    year: '2022 — 2026',
    title: 'IMS / EFZ Applikationsentwicklung',
    text: 'Ausbildung mit Fokus auf Webentwicklung, Datenbanken, Testing, Software-Logik und praxisnahe Projektarbeit.',
  },
  {
    year: '2025',
    title: 'Mehr Richtung Produkt und AI',
    text: 'Projekte mit stärkerem Fokus auf Frontend-Qualität, Machine Learning, Automationen und moderne Produktideen.',
  },
  {
    year: '2026',
    title: 'Aktuelle Entwicklung',
    text: 'Swyte, Börsenspiel mit Echtzeitdaten, Portfolio-Redesigns und der Aufbau einer stärkeren technischen Identität.',
  },
];

function Pill({ children }) {
  return <span className="pill">{children}</span>;
}

function SectionHeader({ eyebrow, title, text, right }) {
  return (
    <div className="section-header">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h2>{title}</h2>
        {text ? <p>{text}</p> : null}
      </div>
      {right ? <div className="section-right">{right}</div> : null}
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'dark');
  const [activeFilter, setActiveFilter] = useState('All');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('portfolio-theme', theme);
    document.title = 'Florian Rexhaj — Portfolio';
  }, [theme]);

  const visibleProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand-mark">
          <div className="brand-dot" />
          <span>{profile.name}</span>
        </div>

        <nav className="topnav">
          <a href="#projects">Projects</a>
          <a href="#stack">Stack</a>
          <a href="#about">About</a>
          <a href="#timeline">Path</a>
          <a href="#contact">Contact</a>
        </nav>

        <button
          className="icon-button"
          onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </header>

      <main>
        <section className="hero-grid">
          <div className="hero-copy surface surface-strong">
            <div className="eyebrow">Portfolio 2026</div>
            <h1>Built around projects, product thinking and clean execution.</h1>
            <p className="hero-text">
              Dieses Portfolio zeigt meine aktuellen Projekte, meine technische Richtung und die
              Art von Software, die ich bauen will: modern, klar, funktional und näher an echten
              Produkten als an klassischen Demo-Seiten.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                Projekte ansehen <ArrowUpRight size={16} />
              </a>
              <a
              className="button button-secondary"
              href={profile.resume}
              download="FlorianRexhaj-Lebenslauf.pdf"
            >
              Lebenslauf herunterladen <ExternalLink size={16} />
            </a>
            </div>

            <div className="hero-meta">
              <div>
                <MapPin size={16} />
                <span>{profile.location}</span>
              </div>
              <div>
                <Mail size={16} />
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </div>
            </div>
          </div>

          <div className="hero-side">
            <div className="surface stat-card">
              <div className="eyebrow">Direction</div>
              <h3>{profile.title}</h3>
              <p>{profile.subtitle}</p>
            </div>

            <div className="surface stat-list">
              {highlights.map((item) => (
                <div key={item.label} className="stat-row">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="content-section">
          <SectionHeader
            eyebrow="Projects"
            title="Selected work and current builds"
            text="Projektfokus, echte Themen und aktuelle Richtung. Die Auswahl ist bewusst kompakter, sauberer und stärker auf relevante Arbeiten ausgerichtet."
            right={
              <div className="filter-box">
                <Filter size={16} />
                <div className="filter-scroll">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      className={filter === activeFilter ? 'filter-chip active' : 'filter-chip'}
                      onClick={() => setActiveFilter(filter)}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            }
          />

          <div className="projects-grid">
            {visibleProjects.map((project) => {
              const Icon = project.icon;
              return (
                <article key={project.name} className="surface project-card">
                  <div className="project-topline">
                    <div className="project-icon">
                      <Icon size={18} />
                    </div>
                    <div className="project-meta-inline">
                      <span>{project.category}</span>
                      <span>{project.year}</span>
                    </div>
                  </div>

                  <div className="project-heading-row">
                    <h3>{project.name}</h3>
                    <span className="status-badge">{project.status}</span>
                  </div>

                  <p className="project-description">{project.description}</p>

                  <div className="detail-list">
                    {project.details.map((detail) => (
                      <div key={detail} className="detail-item">
                        <ChevronRight size={14} />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>

                  <div className="tag-row">
                    {project.tags.map((tag) => (
                      <Pill key={tag}>{tag}</Pill>
                    ))}
                  </div>

                  <div className="project-footer">
                    {project.links.length ? (
                      project.links.map((link) => (
                        <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="inline-link">
                          {link.label} <ArrowUpRight size={14} />
                        </a>
                      ))
                    ) : (
                      <span className="muted-note">Weitere Details oder Repos können später ergänzt werden.</span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="stack" className="content-section">
          <SectionHeader
            eyebrow="Stack"
            title="Technologies and workflow I currently work with"
            text="Die Skills sind bewusst klar gruppiert, damit sofort sichtbar ist, womit ich heute arbeite und in welchem Bereich ich Projekte umsetze."
          />

          <div className="stack-grid">
            {stackGroups.map((group) => {
              const Icon = group.icon;
              return (
                <div key={group.title} className="surface stack-card">
                  <div className="stack-head">
                    <div className="project-icon">
                      <Icon size={18} />
                    </div>
                    <h3>{group.title}</h3>
                  </div>
                  <div className="stack-list">
                    {group.items.map((item) => (
                      <div key={item} className="detail-item">
                        <ChevronRight size={14} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section id="about" className="content-section two-column-layout">
          <div className="surface">
            <SectionHeader
              eyebrow="About"
              title="A portfolio built around direction, not decoration"
              text="Ich wollte diese Seite bewusst neu denken: klarer, stärker, projektfokussierter und näher an dem, was ich wirklich entwickle und langfristig aufbauen will."
            />

            <div className="strength-list">
              {strengths.map((item) => (
                <div key={item} className="strength-row">
                  <div className="strength-dot" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="surface quick-panel">
            <div className="eyebrow">Core links</div>
            <div className="quick-links">
              <a href={profile.github} target="_blank" rel="noreferrer" className="quick-link-card">
                <Github size={18} />
                <div>
                  <strong>GitHub</strong>
                  <span>Repositories und aktuelle Builds</span>
                </div>
                <ArrowUpRight size={16} />
              </a>

              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="quick-link-card">
                <Linkedin size={18} />
                <div>
                  <strong>LinkedIn</strong>
                  <span>Profil und beruflicher Auftritt</span>
                </div>
                <ArrowUpRight size={16} />
              </a>

              <button className="quick-link-card button-reset" onClick={copyEmail}>
                {copied ? <Check size={18} /> : <Copy size={18} />}
                <div>
                  <strong>{copied ? 'E-Mail kopiert' : 'E-Mail kopieren'}</strong>
                  <span>{profile.email}</span>
                </div>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </section>

        <section id="timeline" className="content-section">
          <SectionHeader
            eyebrow="Path"
            title="Where I am and where this is going"
            text="Die Seite zeigt nicht nur Vergangenes, sondern auch die Richtung: mehr Produktdenken, stärkere Frontends, mehr Datenbezug und langfristig mehr AI- und Business-Fokus."
          />

          <div className="timeline-list">
            {timeline.map((item) => (
              <div key={item.year + item.title} className="surface timeline-card">
                <span className="timeline-year">{item.year}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="content-section contact-section">
          <div className="surface contact-card">
            <div>
              <div className="eyebrow">Contact</div>
              <h2>Open for strong projects, practical builds and ambitious ideas.</h2>
              <p>
                Diese Version ist bewusst erwachsener, klarer und stärker auf deine echten Projekte
                ausgerichtet — also genau so, dass sie als richtiges Portfolio funktioniert.
              </p>
            </div>

            <div className="contact-actions">
              <a className="button button-primary" href={`mailto:${profile.email}`}>
                Mail schreiben <Mail size={16} />
              </a>
              <a className="button button-secondary" href={profile.github} target="_blank" rel="noreferrer">
                GitHub öffnen <Github size={16} />
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
