"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, ExternalLink, Github, Trophy, 
  CheckCircle2, AlertCircle, ChevronRight, Search
} from "lucide-react";

// --- DATA (Shared with Homepage) ---
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
  },
  {
    id: "basic-digital-clock",
    title: "Neon Digital Clock",
    tagline: "Frontend Experiment",
    category: "UI/UX",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop",
    tags: ["JavaScript", "CSS Animations"],
    liveLink: "#",
    repoLink: "https://github.com/miltonbiswas/Basic-Digital-Clock",
    color: "purple",
    impact: "Smooth 60fps Animation",
    problem: "Testing CSS grid capabilities and JS date manipulation.",
    solution: "A pure CSS/JS clock with neon glow effects."
  },
  {
    id: "tic-tac-toe",
    title: "Minimax Tic-Tac-Toe",
    tagline: "Game Logic Implementation",
    category: "Full Stack",
    image: "https://images.unsplash.com/photo-1611996908543-130c1eeb486c?q=80&w=1974&auto=format&fit=crop",
    tags: ["React", "Algorithms"],
    liveLink: "#",
    repoLink: "https://github.com/miltonbiswas/TIC-TAC-TOE",
    color: "red",
    impact: "Unbeatable AI",
    problem: "Understanding recursive algorithms in game theory.",
    solution: "Implemented the Minimax algorithm to create an AI opponent that never loses."
  }
];

const CATEGORIES = ["All", "SaaS", "E-Commerce", "HealthTech", "Full Stack", "UI/UX"];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = PROJECTS.filter(p => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100">
      
      {/* HEADER SECTION */}
      <section className="pt-32 pb-12 px-6 md:px-20 border-b border-gray-100 bg-gray-50/50">
         <div className="max-w-7xl mx-auto">
             <div className="mb-8">
                <Link href="/" className="text-sm font-bold text-gray-400 hover:text-blue-600 transition flex items-center gap-1 mb-4">
                   <ChevronRight size={14} className="rotate-180"/> Back to Home
                </Link>
                <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">
                   The <span className="text-blue-600">Archive.</span>
                </h1>
                <p className="text-xl text-gray-500 max-w-2xl">
                   A complete collection of my engineering work, from enterprise SaaS platforms to experimental UI components.
                </p>
             </div>

             {/* CONTROLS */}
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-12">
                
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                   {CATEGORIES.map((tag) => (
                      <button 
                        key={tag} 
                        onClick={() => setActiveCategory(tag)}
                        className={`px-4 py-2 rounded-full text-sm font-bold border transition ${activeCategory === tag ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}
                      >
                         {tag}
                      </button>
                   ))}
                </div>

                {/* Search */}
                <div className="relative w-full md:w-64">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                   <input 
                     type="text" 
                     placeholder="Search tech or project..." 
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                   />
                </div>
             </div>
         </div>
      </section>

      {/* PROJECTS GRID */}
      <section className="py-20 px-6 md:px-20">
         <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               <AnimatePresence mode="popLayout">
                 {filteredProjects.length > 0 ? (
                   filteredProjects.map((project) => (
                     <motion.div 
                       key={project.id}
                       layout
                       initial={{ opacity: 0, scale: 0.9 }}
                       animate={{ opacity: 1, scale: 1 }}
                       exit={{ opacity: 0, scale: 0.9 }}
                       transition={{ duration: 0.3 }}
                     >
                       <DetailedProjectCard {...project} />
                     </motion.div>
                   ))
                 ) : (
                   <div className="col-span-full text-center py-20">
                      <p className="text-gray-400 text-lg">No projects found matching your criteria.</p>
                      <button 
                        onClick={() => {setActiveCategory("All"); setSearchQuery("");}}
                        className="mt-4 text-blue-600 font-bold hover:underline"
                      >
                        Clear filters
                      </button>
                   </div>
                 )}
               </AnimatePresence>
            </div>
         </div>
      </section>

    </main>
  );
}

// --- COMPONENTS ---

function DetailedProjectCard({ 
  title, tagline, image, tags, liveLink, repoLink, color, impact, problem, solution 
}: { 
  title: string, tagline: string, image: string, tags: string[], 
  liveLink: string, repoLink: string, color: string, impact: string, problem: string, solution: string 
}) {
  
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="group bg-white border border-gray-200 rounded-3xl overflow-hidden hover:shadow-xl hover:border-blue-200 transition duration-300 flex flex-col h-full">
       
       {/* IMAGE */}
       <div className="relative aspect-video overflow-hidden bg-gray-100">
          <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition duration-700" sizes="(max-width: 768px) 100vw, 33vw" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center gap-2">
             <a href={liveLink} target="_blank" className="bg-white text-gray-900 px-4 py-2 rounded-full font-bold text-xs flex items-center gap-1 hover:bg-blue-50 transition transform hover:-translate-y-1"><ExternalLink size={14} /> Live</a>
             <a href={repoLink} target="_blank" className="bg-gray-900 text-white px-4 py-2 rounded-full font-bold text-xs flex items-center gap-1 hover:bg-black transition transform hover:-translate-y-1"><Github size={14} /> Code</a>
          </div>
       </div>

       {/* CONTENT */}
       <div className="p-6 flex flex-col flex-1">
          <div className="flex flex-wrap gap-2 mb-4">
             {tags.slice(0, 3).map(tag => (
                <span key={tag} className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-[10px] font-bold uppercase tracking-wider border border-gray-100">
                   {tag}
                </span>
             ))}
             {tags.length > 3 && <span className="px-2 py-1 text-gray-400 text-[10px] font-bold">+{tags.length - 3}</span>}
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-1">{title}</h3>
          <p className={`text-sm font-medium mb-4 text-${color}-600`}>{tagline}</p>

          <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-100 rounded-lg mb-6">
             <Trophy size={16} className="text-green-600 shrink-0"/>
             <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Impact</p>
                <p className="font-bold text-gray-900 text-sm leading-tight">{impact}</p>
             </div>
          </div>

          <div className="flex-1"></div>

          <div className="border-t border-gray-100 pt-4 mt-2">
             <button 
               onClick={() => setShowDetails(!showDetails)}
               className="flex items-center justify-between w-full text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-blue-600 transition"
             >
                {showDetails ? "Close Details" : "Deep Dive"} 
                <ArrowRight size={14} className={`transition duration-300 ${showDetails ? '-rotate-90' : ''}`} />
             </button>

             {showDetails && (
               <motion.div 
                 initial={{ opacity: 0, height: 0 }} 
                 animate={{ opacity: 1, height: 'auto' }}
                 className="mt-4 space-y-3"
               >
                  <div className="bg-red-50 p-3 rounded-lg text-xs">
                     <h4 className="font-bold text-red-900 mb-1 flex items-center gap-1"><AlertCircle size={12}/> The Challenge</h4>
                     <p className="text-red-700 leading-relaxed">{problem}</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg text-xs">
                     <h4 className="font-bold text-green-900 mb-1 flex items-center gap-1"><CheckCircle2 size={12}/> The Solution</h4>
                     <p className="text-green-700 leading-relaxed">{solution}</p>
                  </div>
               </motion.div>
             )}
          </div>

       </div>
    </div>
  );
}