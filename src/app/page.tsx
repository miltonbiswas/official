"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion"; 
import { useState } from "react";
import { 
  ArrowRight, Code, Layout, Globe, Database, 
  Github, Linkedin, Twitter, Youtube, Mail, Download, 
  Terminal, ScrollText, Flag, GraduationCap, Briefcase, 
  Lightbulb, Coffee, MapPin, Brain, Layers, Cloud, Cpu, 
  BookOpen, Trophy, School, Laptop, Stethoscope, 
  ExternalLink, CheckCircle2, AlertCircle, PlayCircle,
  Wand2, FileText, ShoppingCart, BarChart3, GraduationCap as GradIcon,
  Server, GitBranch, Rocket, DatabaseZap, Wind, Palette, Mountain, 
  Paintbrush, Code2, Binary, Braces, Smartphone, Monitor, ChevronDown, Zap,
  Award, BadgeCheck, Calendar, Clock, ArrowUpRight, Building2, User
} from "lucide-react";

// --- DATA: REAL PROJECTS ---
const PROJECTS = [
  {
    id: "medical-erp",
    title: "MedicalERP",
    tagline: "Enterprise Healthcare Management System",
    category: "SaaS",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop",
    tags: ["React", "TypeScript", "Vite", "Django", "PostgreSQL"],
    liveLink: "#", 
    repoLink: "https://github.com/miltonbiswas/MedicalERP",
    color: "emerald",
    impact: "Unified Clinical & Admin Workflows",
    problem: "Hospitals struggle with fragmented software where billing, patient records, and pharmacy inventory don't talk to each other.",
    solution: "A monolithic ERP solution featuring a type-safe React frontend (Vite) for lightning-fast staff interactions and a robust Django/PostgreSQL backend."
  },
  {
    id: "srmgs",
    title: "Shri Ram Medical Store",
    tagline: "Digital Transformation of a 24/7 Retail Pharmacy",
    category: "E-Commerce",
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=2079&auto=format&fit=crop",
    tags: ["Next.js", "PostgreSQL", "Real-time API", "Inventory Logic"],
    liveLink: "https://shrirammedical.com",
    repoLink: "https://github.com/miltonbiswas/SRMGS",
    color: "blue",
    impact: "40% Revenue Increase in Q1",
    problem: "Manual pen-and-paper tracking led to stockouts, expired medicine losses, and lost sales during peak night shifts.",
    solution: "Built a custom inventory engine that syncs physical stock with a digital dashboard using WebSockets, including expiration alerts."
  },
  {
    id: "mbd-dashboard",
    title: "MBD Internal Dashboard",
    tagline: "Agency Management SaaS Ecosystem",
    category: "SaaS",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    tags: ["Django", "React", "Docker", "RBAC", "PostgreSQL"],
    liveLink: "#",
    repoLink: "https://github.com/miltonbiswas/modernize-admin-dashboard",
    color: "indigo",
    impact: "Reduced Admin Time by 60%",
    problem: "Managing 5+ concurrent client projects via email, WhatsApp, and Excel sheets was causing delivery delays and missed invoices.",
    solution: "Developed a centralized Kanban-style dashboard with automated email triggers, client portals, and PDF invoice generation."
  },
  {
    id: "osig",
    title: "OSIG Invoice Generator",
    tagline: "Open Source Financial Tool",
    category: "Full Stack",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop",
    tags: ["React", "Node.js", "PDF generation", "Open Source"],
    liveLink: "#",
    repoLink: "https://github.com/miltonbiswas/OSIG-Open-Source-Invoice-Generator",
    color: "emerald",
    impact: "500+ Downloads / Clones",
    problem: "Freelancers needed a free, privacy-focused way to generate compliant invoices without signing up for expensive SaaS tools.",
    solution: "Created a client-side invoice engine that generates PDFs instantly in the browser without storing user financial data."
  },
  {
    id: "resume-builder",
    title: "Quick Resume Builder",
    tagline: "ATS-Friendly CV Creator",
    category: "UI/UX",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop",
    tags: ["React", "Tailwind CSS", "Local Storage", "Print API"],
    liveLink: "#",
    repoLink: "https://github.com/miltonbiswas/Quick-Resume-Builder",
    color: "orange",
    impact: "Helped 50+ Juniors Get Hired",
    problem: "Students struggled with formatting complex Word documents to pass Applicant Tracking Systems (ATS).",
    solution: "A drag-and-drop builder that exports clean, semantic HTML-to-PDF resumes optimized for machine reading."
  },
  {
    id: "medm",
    title: "MedM System",
    tagline: "Medical Management & Analytics",
    category: "HealthTech",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
    tags: ["Python", "Data Analysis", "Health API"],
    liveLink: "#",
    repoLink: "https://github.com/miltonbiswas/MedM",
    color: "teal",
    impact: "Optimized Patient Data Flow",
    problem: "Small clinics lacked affordable software to manage patient history and appointment scheduling efficiently.",
    solution: "A lightweight, secure patient management system built with Python, focused on data privacy and speed."
  }
];

// --- DATA: EXPERIENCE (STYLED CARDS) ---
const EXPERIENCE = [
  {
    id: 1,
    role: "Owner & Pharmacist",
    company: "Shri Ram Medical & General Store",
    date: "2025 - Current",
    type: "Business",
    color: "emerald",
    icon: <Stethoscope size={20} />,
    desc: "Managing operations for a 24/7 retail and wholesale pharmacy business while integrating digital systems for efficiency.",
    achievements: "Achieved a 0% error rate in inventory dispensing through digital tracking.",
    tech: ["MedicalERP", "Inventory Management", "Operations"],
  },
  {
    id: 2,
    role: "Full Stack WordPress Dev",
    company: "India Dream Vacations Tours",
    date: "2024 - 2025",
    type: "Contract",
    color: "blue",
    icon: <Globe size={20} />,
    desc: "Developed and launched a dynamic WordPress website with custom themes and plugins to enhance functionality and user experience.",
    achievements: "Boosted organic search traffic by 150% and reduced booking drop-off rates.",
    tech: ["WordPress", "PHP", "MySQL", "SEO"],
  },
  {
    id: 3,
    role: "Junior Web Developer",
    company: "BatchBits Technologies Pvt Ltd",
    date: "2017 - 2021",
    type: "Full Time",
    color: "indigo",
    icon: <Building2 size={20} />,
    desc: "Assisted in developing and maintaining web applications using HTML, CSS, JavaScript, and PHP.",
    achievements: "Reduced average page load time by 40% across client portfolio.",
    tech: ["HTML5", "CSS3", "JavaScript", "CodeIgniter"],
  },
  {
    id: 4,
    role: "Freelance Web Developer",
    company: "Self Employed",
    date: "2013 - 2017",
    type: "Freelance",
    color: "orange",
    icon: <User size={20} />,
    desc: "Developed and designed custom websites for clients using HTML, CSS, JavaScript, PHP, and WordPress.",
    achievements: "Successfully delivered 15+ custom projects with a 98% client satisfaction rate.",
    tech: ["HTML", "CSS", "jQuery", "Laravel"],
  }
];

// --- DATA: CERTIFICATIONS ---
const CERTIFICATIONS = [
  { title: "Google Analytics for Beginners", issuer: "Google Analytics Academy", date: "June, 2023" },
  { title: "Javascript Algorithms & Data Structures", issuer: "freeCodeCamp", date: "Nov, 2024" },
  { title: "SQL Certificate", issuer: "HackerRank", date: "27 Mar, 2025" },
  { title: "JavaScript Certificate", issuer: "HackerRank", date: "24 Mar, 2025" },
  { title: "Responsive Web Design", issuer: "freeCodeCamp", date: "Apr, 2022" },
  { title: "Python Fundamentals", issuer: "The Great Learning", date: "Apr, 2022" },
  { title: "User Experience(UX)/User Interface (UI)", issuer: "The Great Learning", date: "Apr, 2022" },
  { title: "Microsoft Power BI", issuer: "Office Masters", date: "Nov, 2024" },
  { title: "Pharmacy Hackathon", issuer: "Madhav University", date: "2023" } 
];

// --- DATA: BLOGS (MOCK) ---
const ARTICLES = [
  {
    title: "Optimizing Next.js 14 for High-Traffic Retail",
    excerpt: "How I reduced First Contentful Paint (FCP) by 40% using server components and aggressive caching strategies for an e-commerce giant.",
    category: "Engineering",
    date: "Dec 02, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    slug: "optimizing-nextjs"
  },
  {
    title: "The Dual Life: Pharmacist by Day, Coder by Night",
    excerpt: "Lessons learned from managing a 24/7 medical store while architecting SaaS products. Why discipline is the ultimate framework.",
    category: "Career",
    date: "Nov 28, 2025",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=2069&auto=format&fit=crop",
    slug: "dual-life-pharmacist-coder"
  },
  {
    title: "Why I Chose Django over Node.js for MedM",
    excerpt: "A deep dive into backend architecture decisions. When to choose strict structure (Python) over flexibility (JS) in healthcare tech.",
    category: "Backend",
    date: "Nov 15, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2069&auto=format&fit=crop",
    slug: "django-vs-node"
  }
];

const CATEGORIES = ["All", "Full Stack", "E-Commerce", "SaaS", "HealthTech", "UI/UX"];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredProjects = activeCategory === "All" ? PROJECTS : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100">
      
      {/* BACKGROUND GRID */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      {/* === SECTION 1: HERO === */}
      <section className="relative min-h-[95vh] flex flex-col justify-center px-6 md:px-20 overflow-hidden z-10">
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-blue-100 rounded-full blur-[120px] pointer-events-none opacity-60 animate-pulse" />
        <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-indigo-100 rounded-full blur-[100px] pointer-events-none opacity-60 animate-pulse" />

        <div className="max-w-7xl mx-auto w-full z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            {/* LEFT: TEXT CONTENT */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8 }}
            >
                <div className="flex items-center gap-3 mb-6">
                   <span className="h-px w-12 bg-blue-600"></span>
                   <span className="text-blue-700 font-mono tracking-widest uppercase text-xs font-bold">Architecting the Future</span>
                </div>
                <h1 className="text-6xl md:text-[6.5rem] font-black leading-[0.9] mb-8 tracking-tighter text-gray-900">
                  DIGITAL <br /> 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    EMPIRES.
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-lg">
                  I am <strong className="text-gray-900">Milton Biswas</strong>. A Full Stack Architect blending pharmaceutical precision with engineering logic to build scalable web systems.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/start-project" className="bg-gray-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition flex items-center gap-2 group shadow-lg hover:shadow-xl hover:-translate-y-1">
                    Start a Project <ArrowRight className="group-hover:translate-x-1 transition" />
                  </Link>
                  <Link href="/blog" className="px-8 py-4 border border-gray-300 text-gray-700 hover:border-gray-900 rounded-full transition font-bold text-lg">
                    Read The Blog
                  </Link>
                </div>
            </motion.div>

            {/* RIGHT: DYNAMIC TECH CORE ANIMATION */}
            <div className="hidden md:flex justify-center items-center relative h-[500px]">
               <motion.div 
                  animate={{ y: [0, -20, 0] }} 
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10"
               >
                  {/* Central Core */}
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl shadow-2xl flex items-center justify-center relative z-20 border-4 border-white">
                     <Cpu size={64} className="text-white" />
                     {/* Pulsing Effect */}
                     <div className="absolute inset-0 bg-blue-400 rounded-3xl blur-xl opacity-40 animate-pulse"></div>
                  </div>

                  {/* Orbiting Elements */}
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-blue-200/50 rounded-full z-10"
                  >
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 bg-white p-3 rounded-full shadow-lg">
                        <Database size={24} className="text-emerald-500" />
                     </div>
                     <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 bg-white p-3 rounded-full shadow-lg">
                        <Cloud size={24} className="text-blue-500" />
                     </div>
                  </motion.div>

                  <motion.div 
                    animate={{ rotate: -360 }} 
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border border-indigo-100/50 rounded-full z-0"
                  >
                     <div className="absolute left-0 top-1/2 -translate-x-4 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg">
                        <Layout size={24} className="text-purple-500" />
                     </div>
                     <div className="absolute right-0 top-1/2 translate-x-4 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg">
                        <Globe size={24} className="text-orange-500" />
                     </div>
                  </motion.div>

                  {/* Floating Code Card */}
                  <motion.div 
                    animate={{ x: [0, 10, 0], y: [0, 5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -right-16 top-0 bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-xl border border-white/50 z-30 w-48"
                  >
                     <div className="flex items-center gap-2 mb-2 border-b border-gray-100 pb-2">
                        <div className="w-2 h-2 rounded-full bg-red-400"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                     </div>
                     <div className="space-y-1">
                        <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-2 bg-blue-100 rounded w-5/6"></div>
                     </div>
                     <div className="mt-3 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-gray-400">STATUS</span>
                        <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">DEPLOYED</span>
                     </div>
                  </motion.div>

               </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* === SECTION 2: CORE IDENTITY === */}
      <section className="relative py-32 px-6 md:px-20 z-10 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 items-center">
             
             {/* Left: Photo */}
             <div className="md:col-span-5 relative">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden relative shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition duration-500">
                  <Image src="/profile.jpg" alt="Milton Biswas" fill className="object-cover hover:scale-105 transition duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur border border-gray-100 p-4 rounded-xl shadow-lg">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-full text-blue-600"><Terminal size={20} /></div>
                        <div><p className="text-xs font-bold uppercase text-gray-500">Current Mission</p><p className="text-sm font-bold text-gray-900">Building MBD® Ecosystem</p></div>
                     </div>
                  </div>
                </div>
             </div>

             {/* Right: Info */}
             <div className="md:col-span-7 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-6">
                   <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                   <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Available for Hire</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Hi, I'm Milton. <br/> <span className="text-gray-500">The Full Stack Architect.</span>
                </h2>

                {/* ⭐ PHARMACIST BADGE ⭐ */}
                <div className="inline-flex flex-wrap items-center gap-2 mb-6 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-lg">
                    <div className="p-1 bg-emerald-100 rounded text-emerald-700"><ScrollText size={16} /></div>
                    <div>
                        <span className="block text-xs font-bold text-emerald-800 uppercase tracking-wide">Registered Pharmacist</span>
                        <span className="block text-xs font-medium text-emerald-600">Verified by Rajasthan Pharmacy Council</span>
                    </div>
                </div>

                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  I don't just write code; I orchestrate systems. Specializing in <strong>Next.js</strong> and <strong>Django</strong>, I help businesses scale from simple ideas to complex, revenue-generating ecosystems.
                </p>

                {/* ⭐ COMPLETE TECH STACK BADGES ⭐ */}
                <div className="flex flex-wrap gap-2.5 mb-10">
                   {/* Languages */}
                   <TechBadge icon={<Code size={14} />} label="JavaScript" />
                   <TechBadge icon={<Braces size={14} />} label="TypeScript" />
                   <TechBadge icon={<Binary size={14} />} label="Python" />
                   <TechBadge icon={<Code2 size={14} />} label="PHP" />
                   {/* Frontend */}
                   <TechBadge icon={<Code size={14} />} label="React" />
                   <TechBadge icon={<Terminal size={14} />} label="Next.js 14" />
                   <TechBadge icon={<Mountain size={14} />} label="Vue.js" />
                   <TechBadge icon={<Palette size={14} />} label="HTML5" />
                   <TechBadge icon={<Paintbrush size={14} />} label="CSS3 (SASS)" />
                   <TechBadge icon={<Layers size={14} />} label="Bootstrap" />
                   <TechBadge icon={<Wind size={14} />} label="Tailwind" />
                   {/* Backend */}
                   <TechBadge icon={<Server size={14} />} label="Node.js" />
                   <TechBadge icon={<Database size={14} />} label="Django" />
                   {/* DB */}
                   <TechBadge icon={<Database size={14} />} label="MongoDB" />
                   <TechBadge icon={<Database size={14} />} label="MySQL" />
                   <TechBadge icon={<Globe size={14} />} label="PostgreSQL" />
                   <TechBadge icon={<DatabaseZap size={14} />} label="Firebase" />
                   {/* Cloud */}
                   <TechBadge icon={<Cloud size={14} />} label="GCP" />
                   <TechBadge icon={<Cloud size={14} />} label="AWS" />
                   <TechBadge icon={<Rocket size={14} />} label="Vercel" />
                   {/* Tools */}
                   <TechBadge icon={<BookOpen size={14} />} label="WordPress" />
                   <TechBadge icon={<GitBranch size={14} />} label="Git/GitHub" />
                   <TechBadge icon={<BarChart3 size={14} />} label="Power BI" />
                </div>

                <div className="flex gap-6">
                   <SocialLink icon={<Github size={20} />} href="https://github.com" />
                   <SocialLink icon={<Linkedin size={20} />} href="https://linkedin.com" />
                   <SocialLink icon={<Twitter size={20} />} href="https://twitter.com" />
                   <a href="/resume.pdf" target="_blank" className="flex items-center gap-2 text-blue-600 font-bold hover:underline underline-offset-4">
                     <Download size={18} /> Download CV
                   </a>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* === SECTION 3: SKILLS & TECH STACK (CLUSTERED BADGES) === */}
      <section className="py-24 px-6 md:px-20 bg-white">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Technical Arsenal</h2>
               <p className="text-gray-500 max-w-2xl mx-auto">A detailed breakdown of my production-grade capabilities and proficiency.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
               <TechCategory title="Frontend Engineering" icon={<Layout size={20} />}>
                  <TechBadge icon={<Code size={16} />} label="React" />
                  <TechBadge icon={<Terminal size={16} />} label="Next.js 14" />
                  <TechBadge icon={<Mountain size={16} />} label="Vue.js" />
                  <TechBadge icon={<Braces size={16} />} label="TypeScript" />
                  <TechBadge icon={<Wind size={16} />} label="Tailwind CSS" />
                  <TechBadge icon={<Palette size={16} />} label="HTML5/SCSS" />
               </TechCategory>

               <TechCategory title="Backend & Core" icon={<Server size={20} />}>
                  <TechBadge icon={<Server size={16} />} label="Node.js" />
                  <TechBadge icon={<Database size={16} />} label="Django" />
                  <TechBadge icon={<Code2 size={16} />} label="PHP" />
                  <TechBadge icon={<Code size={16} />} label="JavaScript" />
                  <TechBadge icon={<Binary size={16} />} label="Python" />
               </TechCategory>

               <TechCategory title="Data Architecture" icon={<Database size={20} />}>
                  <TechBadge icon={<Globe size={16} />} label="PostgreSQL" />
                  <TechBadge icon={<Database size={16} />} label="MongoDB" />
                  <TechBadge icon={<Database size={16} />} label="MySQL" />
                  <TechBadge icon={<Database size={16} />} label="SQLite" />
                  <TechBadge icon={<DatabaseZap size={16} />} label="Firebase" />
               </TechCategory>

               <TechCategory title="DevOps, Cloud & Tools" icon={<Cloud size={20} />}>
                  <TechBadge icon={<Cloud size={16} />} label="AWS" />
                  <TechBadge icon={<Rocket size={16} />} label="Vercel" />
                  <TechBadge icon={<GitBranch size={16} />} label="Git / GitHub" />
                  <TechBadge icon={<Layers size={16} />} label="Docker" />
                  <TechBadge icon={<BookOpen size={16} />} label="WordPress" />
                  <TechBadge icon={<BarChart3 size={16} />} label="Power BI" />
               </TechCategory>
            </div>
         </div>
      </section>

      {/* === SECTION 4: SERVICES === */}
      <section className="py-32 px-6 md:px-20 z-10 relative bg-gray-50 border-t border-gray-100">
         <div className="max-w-7xl mx-auto">
            <div className="mb-20">
               <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">What I Do</h2>
               <p className="text-xl text-gray-600 max-w-2xl mx-auto">As the founder of <span className="text-blue-600 font-bold">MBD®</span>, I deliver end-to-end digital solutions.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
               <ServiceCard icon={<Layout size={32}/>} title="Frontend Engineering" desc="Pixel-perfect, cinematic interfaces using React, Next.js, and Framer Motion." />
               <ServiceCard icon={<Database size={32}/>} title="Backend Architecture" desc="Secure, scalable APIs built on Django and Node.js. Designed for high-volume data." />
               <ServiceCard icon={<Globe size={32}/>} title="SEO & Growth" desc="Technical SEO strategies that rank your business #1 on Google and drive real traffic." />
            </div>
         </div>
      </section>

      {/* === SECTION 5: AUTHENTIC IDENTITY & JOURNEY === */}
      <section className="py-24 px-6 md:px-20 bg-white border-y border-gray-100">
         <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-16 mb-20 border-b border-gray-200 pb-20">
               <div className="lg:col-span-6 space-y-10">
                  <div>
                    <h4 className="text-blue-600 font-mono text-sm uppercase tracking-widest mb-4">About The Founder</h4>
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">The Pharmacist Who Codes.</h2>
                    <div className="prose text-gray-600 text-lg leading-relaxed space-y-4">
                       <p>My journey is unconventional. I run a 24x7 Medical & General Store in Reodar, Rajasthan, while simultaneously architecting enterprise-level software.</p>
                       <p>This "Dual Life" defines my work ethic. In pharmacy, a small error can impact a life. In coding, I apply that same <strong>zero-tolerance for error</strong> to your database architecture and security.</p>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                     <h3 className="font-bold flex items-center gap-2 mb-4 text-gray-900"><Lightbulb className="text-yellow-500" size={20}/> What I Actually Solve</h3>
                     <ul className="space-y-3">
                        <ListItem text="Bridging the gap between complex Business Logic (ERP) and User Interface." />
                        <ListItem text="Transforming manual, paper-based workflows into automated SaaS." />
                        <ListItem text="Fixing slow, un-optimized legacy systems (Core Web Vitals)." />
                     </ul>
                  </div>
               </div>
               <div className="lg:col-span-6 space-y-8">
                  <div className="group relative rounded-2xl overflow-hidden aspect-video shadow-md border border-gray-200">
                     {/* IMAGE WITH LOCAL ASSET */}
                     <Image src="/image.avif" alt="MBD Workspace" fill className="object-cover hover:scale-105 transition duration-700" />
                     <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                        <p className="font-bold flex items-center gap-2 text-sm"><MapPin size={14} className="text-blue-400"/> MBD HQ, Reodar</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-xl border border-yellow-100 text-yellow-800 text-sm">
                     <Coffee size={24} className="shrink-0" />
                     <p><strong>Fun Fact:</strong> I am a total Night Owl. Most of my best code is written between 11 PM and 3 AM, after the pharmacy closes.</p>
                  </div>
               </div>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
               {/* EDUCATION (Timeline) */}
               <div>
                  <h3 className="font-bold text-gray-900 mb-8 flex items-center gap-2 text-xl border-b border-gray-200 pb-3"><School size={22} className="text-blue-600" /> Academic Background</h3>
                  <div className="space-y-8 border-l-2 border-gray-200 pl-6 ml-3">
                     <DetailedMilestone year="2024 - Present" title="M.Pharm in Pharmaceutics" org="Madhav University, Pindwara" icon={<GraduationCap size={16}/>} current />
                     <DetailedMilestone year="2020 - 2024" title="Bachelor of Pharmacy (B.Pharm)" org="Madhav University, Pindwara" icon={<BookOpen size={16}/>}>
                        <div className="mt-3 space-y-2">
                           <p className="text-xs text-gray-500"><strong className="text-gray-700">Special Interest:</strong> Medicinal Chemistry, Pharmacology</p>
                           <p className="text-xs text-gray-500"><strong className="text-gray-700">Project:</strong> Marketing Strategy of Pharma Industry</p>
                           <p className="text-xs text-gray-500 flex items-start gap-1"><Trophy size={12} className="text-yellow-500 shrink-0 mt-0.5"/> <strong className="text-gray-700">Awards:</strong> Academic Excellence, Chess, Football</p>
                        </div>
                     </DetailedMilestone>
                     <DetailedMilestone year="2018 - 2020" title="HSE in Biology (Major)" org="Adarsh Govt. Sen. Sec. School, Reodar" icon={<School size={16}/>} />
                     <DetailedMilestone year="2015 - 2017" title="HSE in Commerce" org="Adarsh Govt. Sen. Sec. School, Reodar" icon={<School size={16}/>} />
                  </div>
               </div>
               
               {/* 🔥 PROFESSIONAL CAREER (STYLED CARDS) 🔥 */}
               <div>
                  <h3 className="font-bold text-gray-900 mb-8 flex items-center gap-2 text-xl border-b border-gray-200 pb-3"><Briefcase size={22} className="text-blue-600" /> Professional Career</h3>
                  <div className="space-y-6">
                     {EXPERIENCE.map((job) => (
                        <StyledCareerCard key={job.id} data={job} />
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 🔥=== SECTION: CERTIFICATIONS ===🔥 */}
      <section className="py-24 px-6 md:px-20 bg-gray-50 border-t border-gray-200">
         <div className="max-w-7xl mx-auto">
            <h3 className="font-bold text-gray-900 mb-10 flex items-center gap-2 text-xl border-b border-gray-200 pb-3">
               <Award size={22} className="text-blue-600" /> Certifications & Achievements
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               {CERTIFICATIONS.map((cert, index) => (
                  <CertificationCard key={index} data={cert} />
               ))}
            </div>
         </div>
      </section>

      {/* === SECTION 7: PROJECT SHOWCASE (GRID LAYOUT) === */}
      <section className="py-32 px-6 md:px-20 z-10 relative bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
           <div className="flex justify-between items-end mb-16">
              <div>
                <h4 className="text-blue-600 font-mono text-sm uppercase tracking-widest mb-2">Portfolio</h4>
                <h2 className="text-4xl md:text-6xl font-bold text-gray-900">Featured Case Studies</h2>
              </div>
              {/* 🔥 VIEW ALL PROJECTS LINK 🔥 */}
              <Link href="/projects" className="hidden md:flex items-center gap-2 text-blue-600 font-bold hover:gap-4 transition">
                View All Projects <ArrowRight size={20} />
              </Link>
           </div>
           
           <div className="flex flex-wrap gap-2 mb-8">
               {CATEGORIES.map((tag) => (
                  <button key={tag} onClick={() => setActiveCategory(tag)} className={`px-4 py-2 rounded-full text-sm font-bold border transition ${activeCategory === tag ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}>{tag}</button>
               ))}
           </div>

           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               <AnimatePresence mode="popLayout">
                 {filteredProjects.map((project) => (
                   <motion.div key={project.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }}>
                     <CaseStudyCard {...project} />
                   </motion.div>
                 ))}
               </AnimatePresence>
           </div>
        </div>
      </section>

      {/* 🔥=== SECTION: BLOG / INSIGHTS ===🔥 */}
      <section className="py-32 px-6 md:px-20 bg-gray-50 border-t border-gray-200">
         <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
               <div>
                  <h4 className="text-blue-600 font-mono text-sm uppercase tracking-widest mb-2">Thoughts</h4>
                  <h2 className="text-4xl font-bold text-gray-900">Latest from the Lab</h2>
               </div>
               <Link href="/blog" className="hidden md:flex items-center gap-2 text-gray-600 font-bold hover:text-blue-600 transition">
                  View All Articles <ArrowRight size={18}/>
               </Link>
            </div>
            
            <div className="bg-gray-900 rounded-3xl p-8 md:p-12 relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
               <div className="absolute top-0 right-0 p-32 bg-blue-600 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
               <div className="relative z-10 max-w-xl">
                  <h3 className="text-3xl font-bold text-white mb-4">Join the MBD® Blueprint</h3>
                  <p className="text-gray-400">Get monthly insights on Full Stack Architecture, Pharmacy Tech, and Entrepreneurship. No spam, just value.</p>
               </div>
               <div className="relative z-10 w-full md:w-auto flex flex-col sm:flex-row gap-3">
                  <input type="email" placeholder="Enter your email" className="px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64" />
                  <button className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold transition shadow-lg shadow-blue-900/50">Subscribe</button>
               </div>
            </div>
         </div>
      </section>

    </main>
  );
}

// --- COMPONENTS ---

function StyledCareerCard({ data }: { data: any }) {
  return (
    <div className={`group relative bg-white border border-gray-100 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:border-${data.color}-200 overflow-hidden`}>
       {/* Accent Top Border */}
       <div className={`absolute top-0 left-0 w-full h-1 bg-${data.color}-500`}></div>
       
       <div className="flex justify-between items-start mb-4">
          <div>
             <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition">{data.role}</h4>
             <p className="text-sm text-gray-500 font-medium">{data.company}</p>
          </div>
          <div className={`p-2 bg-${data.color}-50 text-${data.color}-600 rounded-lg`}>
             {data.icon}
          </div>
       </div>

       <div className="flex items-center gap-3 mb-4 text-xs font-medium">
          <span className="bg-gray-50 text-gray-600 px-2 py-1 rounded border border-gray-100">{data.date}</span>
          <span className={`bg-${data.color}-50 text-${data.color}-700 px-2 py-1 rounded border border-${data.color}-100`}>{data.type}</span>
       </div>

       <p className="text-sm text-gray-600 leading-relaxed mb-4 border-b border-gray-50 pb-4">
          {data.desc}
       </p>

       <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 mb-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 flex items-center gap-1">
             <Award size={12} className="text-yellow-500"/> Key Win
          </p>
          <p className="text-xs font-semibold text-gray-800">{data.achievements}</p>
       </div>

       <div className="flex flex-wrap gap-1.5">
          {data.tech.map((t: string) => (
             <span key={t} className="px-2 py-0.5 bg-white border border-gray-200 rounded text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                {t}
             </span>
          ))}
       </div>
    </div>
  )
}


function TechCategory({ title, icon, children }: { title: string, icon: any, children: React.ReactNode }) {
  return (
    <div className="border border-gray-100 rounded-xl p-6 bg-white hover:border-blue-200 transition duration-300">
      <div className="flex items-center gap-3 mb-4 text-gray-900 font-bold text-sm">
        <span className="text-blue-600">{icon}</span>
        {title}
      </div>
      <div className="flex flex-wrap gap-2">
        {children}
      </div>
    </div>
  )
}

function TechBadge({ icon, label }: { icon: any, label: string }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm font-semibold text-gray-600 hover:bg-white hover:text-blue-600 hover:border-blue-200 transition cursor-default shadow-sm">
      {icon}
      <span>{label}</span>
    </div>
  );
}

function SocialLink({ icon, href }: { icon: any, href: string }) {
  return <a href={href} target="_blank" className="p-3 bg-gray-100 text-gray-600 border border-gray-200 rounded-full hover:bg-blue-600 hover:text-white hover:-translate-y-1 transition">{icon}</a>;
}

function ServiceCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return <div className="p-8 rounded-3xl border border-gray-200 bg-white hover:border-blue-300 hover:shadow-xl transition duration-500 group relative overflow-hidden"><div className="relative z-10"><div className="text-blue-600 mb-6 p-3 bg-blue-50 rounded-xl w-fit border border-blue-100 group-hover:border-blue-200 transition">{icon}</div><h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3><p className="text-gray-600 leading-relaxed">{desc}</p></div></div>;
}

function ListItem({ text }: { text: string }) {
  return <li className="flex items-start gap-2 text-gray-600 text-sm"><span className="text-green-500 mt-1">✔</span> {text}</li>;
}

function DetailedMilestone({ year, title, org, icon, current, children }: { year: string, title: string, org: string, icon: any, current?: boolean, children?: React.ReactNode }) {
  return (
    <div className="relative group">
       <div className={`absolute -left-[31px] top-1 h-4 w-4 flex items-center justify-center z-10`}>
            {current && <span className="absolute h-full w-full rounded-full bg-blue-400 opacity-75 animate-ping"></span>}
            <div className={`h-4 w-4 rounded-full border-2 bg-white ${current ? 'border-blue-600 bg-blue-100' : 'border-gray-300 group-hover:border-blue-400'} transition`}></div>
       </div>
       <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1">
          <h4 className={`text-base font-bold ${current ? 'text-gray-900' : 'text-gray-700'}`}>{title}</h4>
          <span className={`text-xs font-mono px-2 py-0.5 rounded w-fit ${current ? 'bg-blue-100 text-blue-700 font-bold' : 'bg-gray-100 text-gray-500'}`}>{year}</span>
       </div>
       <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <span className="text-gray-400">{icon}</span>
          <span>{org}</span>
       </div>
       {children && <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-sm">{children}</div>}
    </div>
  );
}

function CertificationCard({ data }: { data: any }) {
  return (
    <div className="flex items-start gap-4 p-5 bg-white border border-gray-100 rounded-xl hover:shadow-md hover:border-blue-100 transition duration-300">
       <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg shrink-0">
          <BadgeCheck size={20} />
       </div>
       <div>
          <h4 className="font-bold text-gray-900 text-sm leading-snug mb-1">{data.title}</h4>
          <p className="text-xs text-gray-500 mb-2">{data.issuer}</p>
          <span className="text-[10px] font-mono font-medium text-gray-400 bg-gray-50 px-2 py-0.5 rounded">{data.date}</span>
       </div>
    </div>
  );
}

function CaseStudyCard({ title, tagline, image, tags, liveLink, repoLink, color, impact, problem, solution }: { title: string, tagline: string, image: string, tags: string[], liveLink: string, repoLink: string, color: string, impact: string, problem: string, solution: string }) {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div className="group bg-white border border-gray-200 rounded-3xl overflow-hidden hover:shadow-xl hover:border-blue-200 transition duration-300 flex flex-col h-full">
       <div className="relative aspect-video overflow-hidden">
          <Link href="/projects">
             <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition duration-700" sizes="(max-width: 768px) 100vw, 33vw" />
          </Link>
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center gap-2">
             <a href={liveLink} className="bg-white text-gray-900 px-4 py-2 rounded-full font-bold text-xs flex items-center gap-1 hover:bg-blue-50 transition transform hover:-translate-y-1"><ExternalLink size={14} /> Live</a>
             <a href={repoLink} className="bg-gray-900 text-white px-4 py-2 rounded-full font-bold text-xs flex items-center gap-1 hover:bg-black transition transform hover:-translate-y-1"><Github size={14} /> Code</a>
          </div>
       </div>
       <div className="p-6 flex flex-col flex-1">
          <div className="flex flex-wrap gap-2 mb-4">{tags.map(tag => (<span key={tag} className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-[10px] font-bold uppercase tracking-wider border border-gray-100">{tag}</span>))}</div>
          
          <Link href="/projects">
            <h3 className="text-2xl font-bold text-gray-900 mb-1 hover:text-blue-600 transition">{title}</h3>
          </Link>
          
          <p className={`text-sm font-medium mb-4 text-${color}-600`}>{tagline}</p>
          <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-100 rounded-lg mb-6"><Trophy size={16} className="text-green-600"/><div><p className="text-[10px] font-bold text-gray-400 uppercase">Impact</p><p className="font-bold text-gray-900 text-sm">{impact}</p></div></div>
          <div className="flex-1"></div>
          <div className="border-t border-gray-100 pt-4 mt-2">
             <button onClick={() => setShowDetails(!showDetails)} className="flex items-center justify-between w-full text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-blue-600 transition">{showDetails ? "Close Details" : "Challenge & Solution"} <ArrowRight size={14} className={`transition duration-300 ${showDetails ? '-rotate-90' : ''}`} /></button>
             {showDetails && (
               <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 space-y-3">
                  <div className="bg-red-50 p-3 rounded-lg text-xs"><h4 className="font-bold text-red-900 mb-1 flex items-center gap-1"><AlertCircle size={12}/> Problem</h4><p className="text-red-700 leading-relaxed">{problem}</p></div>
                  <div className="bg-green-50 p-3 rounded-lg text-xs"><h4 className="font-bold text-green-900 mb-1 flex items-center gap-1"><CheckCircle2 size={12}/> Solution</h4><p className="text-green-700 leading-relaxed">{solution}</p></div>
               </motion.div>
             )}
          </div>
       </div>
    </div>
  );
}