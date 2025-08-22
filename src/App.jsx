
'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Moon, Sun, Mail, Phone, ArrowUpRight, Rocket, Cpu, Database, Boxes,
  MessageSquare, GraduationCap, BriefcaseBusiness, Trophy, Languages,
  Calendar, MapPin, Code2, Bot, Github, Linkedin, Globe, Download,
  Sparkles, FileText, Command, Keyboard,
} from 'lucide-react';

// ---------- Utilities ----------
function clsx(...classes){ return classes.filter(Boolean).join(' '); }

function useLocalStorage(key, initial){
  const [value, setValue] = useState(() => {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : initial; } catch { return initial; }
  });
  useEffect(()=>{ try { localStorage.setItem(key, JSON.stringify(value)); } catch {} }, [key, value]);
  return [value, setValue];
}

// Typewriter hook
function useTypewriter(words, speed = 70, pause = 1400) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (!words || words.length === 0) return;
    const current = words[index % words.length];
    const timeout = setTimeout(() => {
      setSubIndex((v) => v + (deleting ? -1 : 1));
      if (!deleting && subIndex === current.length) setDeleting(true);
      else if (deleting && subIndex === 0) { setDeleting(false); setIndex((i) => (i + 1) % words.length); }
    }, deleting ? Math.max(30, speed/2) : speed);
    return () => clearTimeout(timeout);
  }, [subIndex, deleting, speed, words, index]);

  useEffect(() => {
    const pauseTimer = setTimeout(() => {
      if (!deleting && subIndex === (words[index % words.length] || '').length) setDeleting(true);
    }, pause);
    return () => clearTimeout(pauseTimer);
  }, [deleting, pause, subIndex, words, index]);

  useEffect(() => { const blinkTimer = setInterval(() => setBlink((b) => !b), 500); return () => clearInterval(blinkTimer); }, []);

  const text = (words[index % words.length] || '').substring(0, Math.max(0, subIndex));
  return text + (blink ? '|' : '');
}

// Smooth scroll
function scrollToId(id){
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ---------- Lightweight UI primitives ----------
function Button({ variant='secondary', className='', asChild=false, children, ...props }){
  const base = 'inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-sm transition border';
  const styles = {
    primary: 'border-transparent bg-neutral-900 text-white dark:bg-white dark:text-black hover:opacity-90',
    secondary: 'border-black/10 bg-white text-black hover:bg-black/5 dark:bg-neutral-800 dark:text-white dark:border-white/10 hover:dark:bg-neutral-700/60',
    outline: 'bg-transparent border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5',
    ghost: 'border-transparent bg-transparent hover:bg-black/5 dark:hover:bg-white/5'
  };
  const cls = clsx(base, styles[variant] || styles.secondary, className);
  if (asChild) return React.cloneElement(children, { className: clsx(children.props.className, cls), ...props });
  return <button className={cls} {...props}>{children}</button>;
}

function Card({ className='', children }){
  return <div className={clsx('border rounded-2xl', 'border-black/10 dark:border-white/10', className)}>{children}</div>;
}
function CardHeader({ children }){ return <div className="px-5 pt-5">{children}</div>; }
function CardTitle({ className='', children }){ return <div className={clsx('text-base font-semibold', className)}>{children}</div>; }
function CardContent({ className='', children }){ return <div className={clsx('px-5 pb-5', className)}>{children}</div>; }

function Input(props){ return <input {...props} className={clsx('w-full px-3 py-2 rounded-xl border bg-white dark:bg-neutral-800 border-black/10 dark:border-white/10 outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10', props.className)} />; }
function Textarea(props){ return <textarea {...props} className={clsx('w-full px-3 py-2 rounded-xl border bg-white dark:bg-neutral-800 border-black/10 dark:border-white/10 outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10', props.className)} />; }

// ---------- Data ----------
const PROFILE = {
  name: 'Florian Rexhaj',
  role: 'Software Engineer (in Ausbildung) · AI & Automation',
  location: 'Zürich–Baden, Schweiz',
  email: 'Florexhaj@hotmail.com', // TODO: ersetzen
  phone: 'tel:+41766105333', // TODO: ersetzen
  website: 'https://example.com', // TODO: ersetzen
  socials: {
    github: 'https://github.com/dashboard',
    linkedin: 'https://www.linkedin.com/in/florian-rexhaj-60a2b9363/',
    globe: 'https://your-portfolio-link',
  },
  summaryDE:
    'Schüler der Informatikmittelschule (EFZ Applikationsentwicklung, BM Wirtschaft – Abschluss 2026). Leidenschaft für KI, Automatisierung und saubere Software. Praxisprojekte: n8n-Workflows & WhatsApp-Bots, React-Apps, Datenbanken und CI/CD.',
  summaryEN:
    'Student at IMS (Swiss vocational baccalaureate, EFZ Application Development – graduating in 2026). Passionate about AI, automation, and clean software. I love practical builds: n8n workflows & WhatsApp bots, React apps, databases, and CI/CD.',
  languages: [
    { label: 'Deutsch', level: 'Muttersprache' },
    { label: 'Englisch', level: 'C1' },
    { label: 'Französisch', level: 'B2' },
    { label: 'Albanisch', level: 'Muttersprache' },
    { label: 'Portugiesisch', level: 'in Arbeit' },
  ],
};

const SKILLS = [
  { name: 'Python', icon: <Cpu className="w-4 h-4"/>, level: 85 },
  { name: 'TypeScript / React', icon: <Code2 className="w-4 h-4"/>, level: 85 },
  { name: 'Node.js', icon: <Bot className="w-4 h-4"/>, level: 75 },
  { name: 'MongoDB / Cassandra', icon: <Database className="w-4 h-4"/>, level: 70 },
  { name: 'Docker', icon: <Boxes className="w-4 h-4"/>, level: 70 },
  { name: 'CI/CD (GitLab)', icon: <Rocket className="w-4 h-4"/>, level: 65 },
  { name: 'BPMN (Camunda)', icon: <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h6v6H4zM14 4h6v6h-6zM9 14h6v6H9z"/><path d="M10 7h4M7 10v4M17 10v4"/></svg>, level: 60 },
  { name: 'AWS Basics', icon: <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 17.5A4.5 4.5 0 0 0 15.5 13H15a7 7 0 1 0 0 14h5a4 4 0 0 0 0-8h-.5z" transform="translate(-3 -7) scale(1.2)"/></svg>, level: 55 },
];

const PROJECTS = [
  { title: 'LigaLight360', period: '2025', tags: ['Web','API','Sports'], description: 'Static website mit La Liga Tabellen & Resultaten, angebunden an eine öffentliche API.', links: [{label:'Demo', href:'#'}] },
  { title: 'EventPlaner Pro (M295)', period: '2025', tags: ['React','JSON Server','CRUD'], description: 'Event-Management-App mit Listen, Detailansichten, Teilnehmern und Filtern.', links: [{label:'Repo', href:'#'}] },
  { title: 'IMDB ML – Sentiment/Score', period: '2025', tags: ['ML','Python','Pandas'], description: 'Modul 259: ML-Pipeline auf IMDB Movies Dataset, Training, Test und Dokumentation.', links: [{label:'Report', href:'#'}] },
  { title: 'WhatsApp Bot · n8n + OpenAI', period: '2025', tags: ['Automation','n8n','OpenAI'], description: 'Gruppenfähiger Chatbot mit Moderation, Commands und Wissenssuche.', links: [{label:'Overview', href:'#'}] },
  { title: 'Mongo + Cassandra Sync', period: '2025', tags: ['Databases','Sync','Node'], description: 'Datensynchronisation & Indizes; Aggregationen und Abfragen optimiert.', links: [] },
  { title: 'BPMN Prozess · Camunda', period: '2025', tags: ['BPMN','Camunda'], description: 'Modellierung Informations-/Materialfluss, Datenobjekte & Ressourcen (M254, M294).', links: [] },
];

const EXPERIENCE = [
  { role:'IMS – EFZ Applikationsentwicklung (mit BM Wirtschaft)', org:'Kantonsschule Baden', start:'2022', end:'2026 (erwartet)', bullets:[
    'Schwerpunkte: Python, TypeScript/React, Datenbanken, DevOps-Grundlagen',
    'Praxisprojekte: n8n-Bot, Event-Management-App, ML-Workflow, BPMN-Modelle',
    'Teamarbeit mit GitLab-Flow & CI/CD, Code-Reviews, Dokumentation',
  ]},
  { role:'Freiwilligenarbeit', org:'Gemeinde/Church', start:'laufend', end:'', bullets:[ '2× pro Woche: Teamarbeit, Verantwortung & Community-Events' ]},
];

const ACHIEVEMENTS = [
  { title: 'Boxen & Fitness – 6×/Woche', note: 'Disziplin, Fokus, Resilienz' },
  { title: 'Mehrsprachig', note: 'DE (C2), EN (C1), FR (B2), AL (native), ES/PT (lernend)' },
  { title: 'Schul-/Praxisprojekte', note: 'Realistische Anwendungen statt nur Theorie' },
];

export default function App(){
  const [dark, setDark] = useLocalStorage('theme-dark', true);
  const [accent, setAccent] = useLocalStorage('accent', 'violet');
  const [density, setDensity] = useLocalStorage('density', 'comfortable');
  const [locale, setLocale] = useLocalStorage('locale', 'de');
  const [anim, setAnim] = useLocalStorage('anim', 'balanced');
  const [radius, setRadius] = useLocalStorage('radius', 'xl');
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key.toLowerCase() === 't') setDark((d) => !d);
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault(); setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setDark]);

  useEffect(() => { document.documentElement.classList.toggle('dark', !!dark); }, [dark]);

  const pad = density === 'compact' ? 'p-3' : density === 'spacious' ? 'p-7' : 'p-5';
  const gap = density === 'compact' ? 'gap-3' : density === 'spacious' ? 'gap-7' : 'gap-5';
  const rdx = radius === 'lg' ? 'rounded-lg' : radius === '2xl' ? 'rounded-2xl' : 'rounded-xl';

  const t = (k) => {
    const dict = {
      de: {
        heroHi: 'Hallo, ich bin', heroRole: PROFILE.role, ctaHire: 'Jetzt kontaktieren', ctaResume: 'Lebenslauf speichern',
        navAbout: 'Über mich', navProjects: 'Projekte', navExperience: 'Erfahrung', navSkills: 'Skills', navContact: 'Kontakt',
        quickActions: 'Schnellaktionen', appearance: 'Erscheinungsbild',
        density: 'Dichte', theme: 'Theme', animations: 'Animationen', radius: 'Rundung', accent: 'Akzentfarbe', language: 'Sprache',
        about: 'Über mich', projects: 'Projekte', experience: 'Erfahrung', skills: 'Skills', achievements: 'Erfolge', contact: 'Kontakt', send: 'Senden', downloadVCard: 'vCard exportieren',
        game: 'Mini‑Game: Florian Runner',
      },
      en: {
        heroHi: 'Hi, I\'m', heroRole: PROFILE.role, ctaHire: 'Contact me', ctaResume: 'Save résumé',
        navAbout: 'About', navProjects: 'Projects', navExperience: 'Experience', navSkills: 'Skills', navContact: 'Contact',
        quickActions: 'Quick actions', appearance: 'Appearance',
        density: 'Density', theme: 'Theme', animations: 'Animations', radius: 'Radius', accent: 'Accent color', language: 'Language',
        about: 'About', projects: 'Projects', experience: 'Experience', skills: 'Skills', achievements: 'Achievements', contact: 'Contact', send: 'Send', downloadVCard: 'Export vCard',
        game: 'Mini‑Game: Florian Runner',
      },
    };
    return dict[locale][k] || k;
  };

  useEffect(() => { document.title = `${PROFILE.name} · Portfolio`; }, []);

  const words = useMemo(() => (locale === 'de'
      ? ['AI & Automation', 'React & TypeScript', 'Python & ML', 'DevOps Basics', 'BPMN & Camunda']
      : ['AI & Automation', 'React & TypeScript', 'Python & ML', 'DevOps basics', 'BPMN & Camunda']), [locale]);
  const tw = useTypewriter(words, 70, 1200);

  const fade = (i = 0) => ({
    initial: { opacity: 0, y: anim === 'off' ? 0 : 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: anim === 'extra' ? 0.7 : anim === 'subtle' ? 0.35 : 0.5, delay: i * 0.05 }
  });

  function downloadResume() {
    const resume = {
      basics: {
        name: PROFILE.name, label: PROFILE.role,
        email: PROFILE.email.replace('mailto:', ''), phone: PROFILE.phone.replace('tel:', ''),
        location: PROFILE.location, profiles: [
          { network: 'GitHub', url: PROFILE.socials.github },
          { network: 'LinkedIn', url: PROFILE.socials.linkedin },
        ],
        summary: locale === 'de' ? PROFILE.summaryDE : PROFILE.summaryEN,
      },
      skills: SKILLS.map(s => ({ name: s.name, level: s.level })),
      projects: PROJECTS, experience: EXPERIENCE, achievements: ACHIEVEMENTS, languages: PROFILE.languages,
    };
    const blob = new Blob([JSON.stringify(resume, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob); const a = document.createElement('a');
    a.href = url; a.download = 'Florian-Rexhaj-Resume.json'; a.click(); URL.revokeObjectURL(url);
  }

  const accentRing = `ring-2 ring-${accent}-400/60`;
  const accentBg = `bg-${accent}-600`;
  const accentBgSoft = `bg-${accent}-500/10`;
  const accentText = `text-${accent}-500`;

  return (
    <div className={clsx('min-h-screen w-full', dark ? 'dark bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-neutral-100' : 'bg-gradient-to-b from-neutral-50 via-neutral-100 to-neutral-50 text-neutral-900')}>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 px-3 py-2 rounded bg-black text-white">Skip to content</a>

      {/* Nav */}
      <header className={clsx('sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/40 dark:supports-[backdrop-filter]:bg-black/30 border-b', dark ? 'border-white/10' : 'border-black/10')}>
        <div className={clsx('mx-auto max-w-6xl flex items-center justify-between', 'p-5')}>
          <div className="flex items-center gap-3">
            <div className={clsx('h-9 w-9 rounded-full flex items-center justify-center border', dark ? 'border-white/15' : 'border-black/10', accentBg)}>
              <Sparkles className="w-5 h-5 text-white"/>
            </div>
            <span className="font-semibold">{PROFILE.name}</span>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {[
              { id: 'about', label: t('navAbout') },
              { id: 'projects', label: t('navProjects') },
              { id: 'experience', label: t('navExperience') },
              { id: 'skills', label: t('navSkills') },
              { id: 'contact', label: t('navContact') },
            ].map((it) => (
              <Button key={it.id} variant="ghost" className="gap-2" onClick={() => scrollToId(it.id)}>{it.label}</Button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="gap-2" onClick={()=>setPaletteOpen(true)} title="⌘/Ctrl + K">
              <Command className="w-4 h-4"/><span className="hidden sm:inline">{t('quickActions')}</span>
            </Button>
            <Button variant="secondary" className="gap-2" onClick={()=>setDark((d)=>!d)}>
              {dark ? <Sun className="w-4 h-4"/> : <Moon className="w-4 h-4"/>}
              <span className="hidden sm:inline">{t('theme')}</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className={clsx('relative overflow-hidden border-b', dark ? 'border-white/10' : 'border-black/10')}>
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className={clsx('absolute -top-24 -right-24 h-64 w-64 blur-3xl opacity-25 rounded-full', accentBg)} />
          <div className={clsx('absolute -bottom-24 -left-24 h-64 w-64 blur-3xl opacity-20 rounded-full', accentBg)} />
        </div>
        <div className={clsx('mx-auto max-w-6xl p-5')}>
          <div className={clsx('grid md:grid-cols-2 items-center', 'gap-5')}>
            <div>
              <motion.h1 {...fade()} className="text-3xl md:text-5xl font-bold tracking-tight">
                {locale === 'de' ? 'Hallo, ich bin' : 'Hi, I\'m'} <span className={clsx('inline-block', accentText)}>{PROFILE.name}</span>
              </motion.h1>
              <motion.p {...fade(1)} className="mt-3 text-lg opacity-90">{t('heroRole')}</motion.p>
              <motion.p {...fade(2)} className="mt-2 text-base opacity-80">{locale === 'de' ? PROFILE.summaryDE : PROFILE.summaryEN}</motion.p>
              <motion.div {...fade(3)} className="mt-5 flex flex-wrap gap-3">
                <Button className={clsx('gap-2 text-white', accentBg)} onClick={() => scrollToId('contact')}>
                  <Mail className="w-4 h-4"/> {t('ctaHire')} <ArrowUpRight className="w-4 h-4"/>
                </Button>

                <Button variant="outline" className="gap-2" asChild>
                <a href={import.meta.env.BASE_URL + 'FlorianRexhaj-Lebenslauf.pdf'} download>
                <Download className="w-4 h-4" /> {locale==='de' ? 'Lebenslauf (PDF)' : 'Résumé (PDF)'}
                </a>
                </Button>

              </motion.div>
              <motion.div {...fade(4)} className="mt-6 text-sm opacity-80"><span className="font-mono">{tw}</span></motion.div>
              <motion.div {...fade(5)} className="mt-6 flex items-center gap-3">
                <a className="inline-flex items-center gap-2 hover:underline" href={PROFILE.socials.github} target="_blank" rel="noreferrer"><Github className="w-4 h-4"/> GitHub</a>
                <a className="inline-flex items-center gap-2 hover:underline" href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer"><Linkedin className="w-4 h-4"/> LinkedIn</a>
                
              </motion.div>
            </div>
            <div className="relative">
              <motion.div {...fade(2)} className={clsx('aspect-square w-full max-w-sm mx-auto rounded-xl border overflow-hidden', dark ? 'border-white/10' : 'border-black/10')}>
                <div className="h-full w-full bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center">
                  <span className={clsx('font-semibold', accentText)}>FR</span>
                </div>
              </motion.div>
              <motion.div {...fade(3)} className="mt-4 grid grid-cols-3 gap-3 max-w-sm mx-auto">
                {['Python', 'TypeScript', 'React', 'MongoDB', 'Docker', 'GitLab CI'].map((k) => (
                  <div key={k} className={clsx('text-xs px-2 py-1 rounded-full border', 'border-black/10 dark:border-white/10', accentBgSoft)}>{k}</div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Preferences & Game */}
      <section className="border-b" id="prefs">
        <div className={clsx('mx-auto max-w-6xl p-5')}>
          <div className={clsx('grid md:grid-cols-5', 'gap-5')}>
            <Card className="md:col-span-2">
              <CardHeader><CardTitle className="flex items-center gap-2"><Keyboard className="w-4 h-4"/>{t('appearance')}</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Theme</span>
                  <div className="flex items-center gap-2">
                    <Button variant={dark ? 'outline' : 'secondary'} onClick={() => setDark(false)}><Sun className="w-4 h-4 mr-2"/>Light</Button>
                    <Button variant={dark ? 'secondary' : 'outline'} onClick={() => setDark(true)}><Moon className="w-4 h-4 mr-2"/>Dark</Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Dichte</span>
                  <div className="flex items-center gap-2">
                    {['compact','comfortable','spacious'].map(d => (<Button key={d} variant={density===d?'secondary':'outline'} onClick={()=>setDensity(d)} className="capitalize">{d}</Button>))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Rundung</span>
                  <div className="flex items-center gap-2">
                    {['lg','xl','2xl'].map(r => (<Button key={r} variant={radius===r?'secondary':'outline'} onClick={()=>setRadius(r)} className="uppercase">{r}</Button>))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Animationen</span>
                  <div className="flex items-center gap-2">
                    {['off','subtle','balanced','extra'].map(a => (<Button key={a} variant={anim===a?'secondary':'outline'} onClick={()=>setAnim(a)} className="capitalize">{a}</Button>))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Akzentfarbe</span>
                  <div className="flex items-center gap-2">
                    {['violet','blue','emerald','rose','amber','teal'].map(c => (
                      <button key={c} onClick={()=>setAccent(c)} className={clsx('h-7 w-7 rounded-full ring-2 ring-transparent', accent===c?accentRing:'', `bg-${c}-500`)} aria-label={c} />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Sprache</span>
                  <div className="flex items-center gap-2">
                    <Button variant={locale==='de'?'secondary':'outline'} onClick={()=>setLocale('de')}>DE</Button>
                    <Button variant={locale==='en'?'secondary':'outline'} onClick={()=>setLocale('en')}>EN</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-3">
              <CardHeader><CardTitle>{t('game')}</CardTitle></CardHeader>
              <CardContent>
                <RunnerGame dark={dark} />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About */}
      <main id="main">
        <section id="about" className="border-b">
          <div className="mx-auto max-w-6xl p-5">
            <motion.div {...fade()} className={clsx('grid md:grid-cols-3 items-start', 'gap-5')}>
              <div className="md:col-span-2 space-y-4">
                <h2 className="text-2xl font-semibold">{locale==='de'?'Über mich':'About'}</h2>
                <p className="opacity-85">{locale === 'de' ? PROFILE.summaryDE : PROFILE.summaryEN}</p>
                <ul className="grid sm:grid-cols-2 gap-3 text-sm">
                  <li className="flex items-center gap-2"><MapPin className="w-4 h-4 opacity-70"/>{PROFILE.location}</li>
                  <li className="flex items-center gap-2"><GraduationCap className="w-4 h-4 opacity-70"/>IMS · EFZ Applikationsentwicklung (BM Wirtschaft)</li>
                  <li className="flex items-center gap-2"><Calendar className="w-4 h-4 opacity-70"/>Abschluss 2026</li>
                  <li className="flex items-center gap-2"><Trophy className="w-4 h-4 opacity-70"/>Disziplin durch Boxen & Fitness (6×/Woche)</li>
                </ul>
                <div className="flex flex-wrap gap-2 mt-2">
                  {ACHIEVEMENTS.map((a) => (<span key={a.title} className={clsx('inline-flex items-center px-2 py-1 text-xs rounded-full border', 'border-black/10 dark:border-white/10', accentBgSoft)}>{a.title}</span>))}
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="font-medium flex items-center gap-2"><Languages className="w-4 h-4"/>Sprachen</h3>
                <ul className="space-y-2 text-sm opacity-90">
                  {PROFILE.languages.map((l)=> (
                    <li key={l.label} className="flex items-center justify-between border rounded-lg px-3 py-2 border-black/10 dark:border-white/10">
                      <span>{l.label}</span><span className="opacity-70">{l.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects */}
               
        <section id="projects" className="border-b">
          <div className="mx-auto max-w-6xl p-5">
            <motion.h2 {...fade()} className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Rocket className="w-5 h-5"/> {locale==='de'?'Projekte':'Projects'}
            </motion.h2>

            <div className={clsx('grid sm:grid-cols-2 lg:grid-cols-3', 'gap-5')}>
              {PROJECTS.map((p, i) => (
                <motion.div key={p.title} {...fade(i)}>
                  <Card className="h-full flex flex-col">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between gap-2">
                        <span>{p.title}</span>
                        <span className={clsx(
                          'text-xs px-2 py-0.5 rounded-full border',
                          'border-black/10 dark:border-white/10',
                          accentBgSoft
                        )}>
                          {p.period}
                        </span>
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="flex-1 flex flex-col">
                      <p className="text-sm opacity-85 mb-3">{p.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {p.tags.map(tag => (
                          <span
                            key={tag}
                            className="text-xs inline-flex items-center px-2 py-1 rounded-full border border-black/10 dark:border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      {/* keine Buttons mehr */}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* Experience */}
        <section id="experience" className="border-b">
          <div className="mx-auto max-w-6xl p-5">
            <motion.h2 {...fade()} className="text-2xl font-semibold mb-4 flex items-center gap-2"><BriefcaseBusiness className="w-5 h-5"/> {locale==='de'?'Erfahrung':'Experience'}</motion.h2>
            <div className="space-y-4">
              {EXPERIENCE.map((e, i) => (
                <motion.div key={e.role} {...fade(i)} className="border rounded-xl border-black/10 dark:border-white/10">
                  <div className={clsx('flex flex-col sm:flex-row sm:items-center sm:justify-between', 'p-5')}>
                    <div>
                      <div className="font-medium">{e.role}</div>
                      <div className="text-sm opacity-80">{e.org}</div>
                    </div>
                    <div className="text-sm opacity-70">{e.start} — {e.end || 'heute'}</div>
                  </div>
                  <ul className={clsx('border-t', 'border-black/10 dark:border-white/10', 'text-sm p-5 pt-0 list-disc list-inside space-y-1 opacity-90')}>
                    {e.bullets.map((b)=> <li key={b}>{b}</li>)}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="border-b">
          <div className="mx-auto max-w-6xl p-5">
            <motion.h2 {...fade()} className="text-2xl font-semibold mb-4 flex items-center gap-2"><Code2 className="w-5 h-5"/> {locale==='de'?'Skills':'Skills'}</motion.h2>
            <div className={clsx('grid sm:grid-cols-2 lg:grid-cols-3', 'gap-5')}>
              {SKILLS.map((s, i) => (
                <motion.div key={s.name} {...fade(i)} className="border rounded-xl border-black/10 dark:border-white/10">
                  <div className="flex items-center justify-between p-5">
                    <div className="flex items-center gap-2 font-medium">{s.icon}{s.name}</div>
                    <span className="text-sm opacity-70">{s.level}%</span>
                  </div>
                  <div className="w-full h-2 rounded-b-xl overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                    <div className={clsx('h-full', accentBg)} style={{ width: `${s.level}%` }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="border-b">
          <div className="mx-auto max-w-6xl p-5">
            <motion.h2 {...fade()} className="text-2xl font-semibold mb-4 flex items-center gap-2"><Trophy className="w-5 h-5"/> {locale==='de'?'Erfolge':'Achievements'}</motion.h2>
            <div className={clsx('grid sm:grid-cols-2 lg:grid-cols-3', 'gap-5')}>
              {ACHIEVEMENTS.map((a, i) => (
                <motion.div key={a.title} {...fade(i)} className="border rounded-xl border-black/10 dark:border-white/10">
                  <div className="p-5">
                    <div className="font-medium mb-1">{a.title}</div>
                    <div className="text-sm opacity-80">{a.note}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="border-b">
          <div className="mx-auto max-w-6xl p-5">
            <motion.h2 {...fade()} className="text-2xl font-semibold mb-4 flex items-center gap-2"><MessageSquare className="w-5 h-5"/> {locale==='de'?'Kontakt':'Contact'}</motion.h2>
          <div className={clsx('grid md:grid-cols-2', 'gap-5')}>
              <div className="border rounded-2xl border-black/10 dark:border-white/10">
                <form className="space-y-3 p-5" onSubmit={(e)=>{e.preventDefault(); window.location.href = PROFILE.email;}}>
                  <Input placeholder="Name" required />
                  <Input placeholder="E-Mail" type="email" required />
                  <Textarea placeholder="Nachricht" rows={5} required />
                  <div className="flex gap-2">
                    <Button className={clsx('gap-2 text-white', accentBg)} type="submit"><Mail className="w-4 h-4"/> {locale==='de'?'Senden':'Send'}</Button>
                    <Button variant="outline" className="gap-2" onClick={() => window.print()}><FileText className="w-4 h-4"/> PDF drucken</Button>
                  </div>
                </form>
              </div>
              <div className="space-y-3">
                <a className="flex items-center gap-3 hover:underline" href={PROFILE.email}><Mail className="w-4 h-4"/>{PROFILE.email.replace('mailto:','')}</a>
                <a className="flex items-center gap-3 hover:underline" href={PROFILE.phone}><Phone className="w-4 h-4"/>{PROFILE.phone.replace('tel:','')}</a>
                <div className="flex items-center gap-3">
                  <a className="inline-flex items-center gap-2 hover:underline" href={PROFILE.socials.github} target="_blank" rel="noreferrer"><Github className="w-4 h-4"/>GitHub</a>
                  <a className="inline-flex items-center gap-2 hover:underline" href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer"><Linkedin className="w-4 h-4"/>LinkedIn</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-10 text-sm opacity-70 text-center">© {new Date().getFullYear()} {PROFILE.name} · Built with React, Tailwind & framer-motion · Press <kbd className="border px-1 rounded">⌘/Ctrl</kbd>+<kbd className="border px-1 rounded">K</kbd></footer>

      {/* Command Palette (no search input) */}
      <AnimatePresence>
        {paletteOpen && (
          <motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/50" onClick={() => setPaletteOpen(false)} />
            <motion.div className={clsx('absolute left-1/2 top-24 -translate-x-1/2 w-[92vw] max-w-xl border shadow-xl rounded-2xl', dark ? 'bg-neutral-900 border-white/10' : 'bg-white border-black/10')} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.15 }}>
              <div className={clsx('px-5 py-4 border-b', dark ? 'border-white/10' : 'border-black/10')}>
                <div className="text-sm opacity-80">{t('quickActions')}</div>
              </div>
              <div className={clsx('grid grid-cols-2 gap-5 p-5')}>
                <Button variant="outline" onClick={()=>{setDark(d=>!d);}} className="justify-between">Toggle Theme <Keyboard className="w-4 h-4"/></Button>
                <Button variant="outline" asChild className="justify-between">
                <a href={import.meta.env.BASE_URL + 'FlorianRexhaj-Lebenslauf.pdf'} download>
                 {locale==='de' ? 'Lebenslauf (PDF)' : 'Résumé (PDF)'} <Download className="w-4 h-4" />
                </a>
                </Button>

                
                <Button variant="outline" onClick={()=>{setLocale(locale==='de'?'en':'de');}} className="justify-between">Switch Language <Languages className="w-4 h-4"/></Button>
                <Button variant="outline" onClick={()=>{scrollToId('about'); setPaletteOpen(false);}} className="justify-between">Go to About <ArrowUpRight className="w-4 h-4"/></Button>
                <Button variant="outline" onClick={()=>{scrollToId('projects'); setPaletteOpen(false);}} className="justify-between">Go to Projects <ArrowUpRight className="w-4 h-4"/></Button>
                <Button variant="outline" onClick={()=>{scrollToId('experience'); setPaletteOpen(false);}} className="justify-between">Go to Experience <ArrowUpRight className="w-4 h-4"/></Button>
                <Button variant="outline" onClick={()=>{scrollToId('skills'); setPaletteOpen(false);}} className="justify-between">Go to Skills <ArrowUpRight className="w-4 h-4"/></Button>
                <Button variant="outline" onClick={()=>{scrollToId('contact'); setPaletteOpen(false);}} className="justify-between">Go to Contact <ArrowUpRight className="w-4 h-4"/></Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Simple Dino-like runner game */
function RunnerGame({ dark }){
  const canvasRef = useRef(null);
  const [running, setRunning] = useState(true);
  const [score, setScore] = useState(0);
  const stateRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const DPR = Math.max(1, Math.floor(window.devicePixelRatio || 1));
    let width = 640, height = 200;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    canvas.width = width * DPR;
    canvas.height = height * DPR;
    ctx.scale(DPR, DPR);

    const groundY = 160;
    const state = {
      t: 0,
      lastTime: performance.now(),
      playing: true,
      speed: 4,
      gravity: 0.5,
      jumpVy: -9.5,
      player: { x: 50, y: groundY-32, w: 26, h: 32, vy: 0, onGround: true },
      obstacles: [],
      clouds: [{x: 100, y: 30},{x: 320,y: 45},{x:520,y:25}],
      lastSpawn: 0,
      spawnEvery: 1200, // ms
      score: 0,
    };
    stateRef.current = state;

    function spawnObstacle(){
      const h = 20 + Math.floor(Math.random()*12); // 20..32
      const w = 26 + Math.floor(Math.random()*10); // 26..36
      state.obstacles.push({ x: width + 20, y: groundY - h, w, h });
    }

    function drawComputer(x, y, w, h){
      // monitor
      ctx.fillStyle = dark ? '#cbd5e1' : '#1f2937';
      ctx.fillRect(x, y, w, h);
      // screen inner
      ctx.fillStyle = dark ? '#0f172a' : '#e5e7eb';
      ctx.fillRect(x+3, y+3, w-6, h-8);
      // stand
      ctx.fillStyle = dark ? '#64748b' : '#6b7280';
      ctx.fillRect(x + w/2 - 4, y + h, 8, 6);
      ctx.fillRect(x + w/2 - 12, y + h + 6, 24, 4);
    }

    function drawPlayer(p){
      // little "Florian" stick figure-ish
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(p.x+6, p.y+8, 12, 18);
      ctx.fillStyle = dark ? '#e2e8f0' : '#111827';
      ctx.beginPath(); ctx.arc(p.x+13, p.y+6, 6, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = dark ? '#94a3b8' : '#374151';
      ctx.fillRect(p.x+6, p.y+26, 6, 6);
      ctx.fillRect(p.x+12, p.y+26, 6, 6);
      ctx.font = '10px system-ui, sans-serif';
      ctx.fillStyle = dark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)';
      ctx.fillText('Florian', p.x-2, p.y-8);
    }

    function drawBackground(){
      ctx.strokeStyle = dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0, groundY); ctx.lineTo(width, groundY); ctx.stroke();
      ctx.strokeStyle = dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)';
      ctx.setLineDash([6, 8]); ctx.beginPath(); ctx.moveTo(0, groundY+12); ctx.lineTo(width, groundY+12); ctx.stroke(); ctx.setLineDash([]);
      state.clouds.forEach(cl => {
        ctx.fillStyle = dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)';
        ctx.beginPath(); ctx.arc(cl.x, cl.y, 12, 0, Math.PI*2); ctx.arc(cl.x+14, cl.y+6, 10, 0, Math.PI*2); ctx.arc(cl.x+28, cl.y, 12, 0, Math.PI*2); ctx.fill();
      });
    }

    function jump(){
      if (!state.playing){
        // restart
        state.playing = true; state.obstacles = []; state.score = 0; state.speed = 4;
        state.player.y = groundY-32; state.player.vy = 0; state.player.onGround = true;
        return;
      }
      if (state.player.onGround){
        state.player.vy = state.jumpVy;
        state.player.onGround = false;
      }
    }

    function onKey(e){
      if (e.code === 'Space' || e.code === 'ArrowUp' ) { e.preventDefault(); jump(); }
      if (e.key.toLowerCase() === 'r'){ state.playing = true; state.obstacles = []; state.score = 0; }
    }
    window.addEventListener('keydown', onKey);
    canvas.addEventListener('pointerdown', jump);

    function loop(now){
      const dt = Math.min(34, now - state.lastTime);
      state.lastTime = now;
      state.t += dt;
      if (state.playing){
        if (state.t - state.lastSpawn > state.spawnEvery){
          state.lastSpawn = state.t;
          spawnObstacle();
          state.spawnEvery = Math.max(800, state.spawnEvery - 5);
        }
        state.clouds.forEach(cl => { cl.x -= 0.3; if (cl.x < -30) cl.x = 640 + Math.random()*120; });
        state.player.vy += state.gravity;
        state.player.y += state.player.vy;
        if (state.player.y >= groundY - state.player.h){
          state.player.y = groundY - state.player.h;
          state.player.vy = 0;
          state.player.onGround = true;
        }
        const spd = state.speed + state.score / 300;
        state.obstacles.forEach(o => o.x -= spd);
        state.obstacles = state.obstacles.filter(o => o.x + o.w > -10);
        for (const o of state.obstacles){
          const p = state.player;
          if (p.x < o.x + o.w && p.x + p.w > o.x && p.y < o.y + o.h && p.y + p.h > o.y){
            state.playing = false; break;
          }
        }
        state.score += dt * 0.03;
        setScore(Math.floor(state.score));
      }
      ctx.clearRect(0,0,640,200);
      drawBackground();
      state.obstacles.forEach(o => drawComputer(o.x, o.y, o.w, o.h));
      drawPlayer(state.player);
      ctx.fillStyle = dark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.75)';
      ctx.font = 'bold 14px system-ui, sans-serif';
      ctx.fillText('Score: ' + Math.floor(state.score), 10, 20);
      if (!state.playing){
        ctx.font = 'bold 18px system-ui, sans-serif';
        ctx.fillText('Game Over — tippen/klicken oder SPACE: Restart', 80, 90);
      } else {
        ctx.font = '12px system-ui, sans-serif';
        ctx.fillText('SPACE/↑ oder Tippen: Springen', 420, 20);
      }
      if (running) requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('keydown', onKey);
      canvas.removeEventListener('pointerdown', jump);
      setRunning(false);
    };
  }, [dark]);

  return (
    <div className="w-full">
      <canvas ref={canvasRef} className="w-full max-w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900" />
      <div className="mt-2 text-xs opacity-70">Hindernisse = kleine Computer. Springe drüber. Viel Erfolg!</div>
    </div>
  );
}
