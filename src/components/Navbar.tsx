"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, FileText, User, Github, Linkedin, Mail, LayoutDashboard, Phone, Youtube, Twitter, Ghost, Facebook, Instagram } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: <Home size={16} /> },
    { name: "Projects", href: "/projects", icon: <Briefcase size={16} /> },
    { name: "Blog", href: "/blog", icon: <FileText size={16} /> },
    // You can add an 'About' page or scroll section later
    // { name: "About", href: "/#about", icon: <User size={16} /> }, 
  ];

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-full px-6 py-3 shadow-2xl flex items-center gap-6 md:gap-8 text-slate-300"
      >
        
        {/* LEFT: Logo / Brand */}
        <Link href="/" className="flex items-center gap-2 font-bold text-white hover:text-blue-400 transition">
          <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-mono text-xs">
            MB
          </div>
          <span className="hidden md:block tracking-tight">MBD.HQ</span>
        </Link>

        {/* CENTER: Navigation Links */}
        <div className="flex items-center gap-1 bg-slate-800/50 rounded-full p-1 border border-slate-700/50">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name}
                href={item.href}
                className={`
                  relative px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all duration-300
                  ${isActive ? "text-white" : "text-slate-400 hover:text-white hover:bg-slate-700/50"}
                `}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-slate-700 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="hidden md:block">{item.name}</span>
                <span className="md:hidden">{item.icon}</span>
              </Link>
            );
          })}
        </div>

        {/* RIGHT: Socials & Actions */}
        <div className="flex items-center gap-4 border-l border-slate-700 pl-6">
          <div className="flex gap-3">
            <SocialLink
  href="https://github.com/miltonbiswas"
  icon={<Github size={18} />}
  label="GitHub"
/>
<SocialLink
  href="https://linkedin.com/in/xmiltonbiswasx"
  icon={<Linkedin size={18} />}
  label="LinkedIn"
/>
<SocialLink
  href="mailto:miltonbiswasx@gmail.com"
  icon={<Mail size={18} />}
  label="Email"
/>

{/* NEW LINKS */}

<SocialLink
  href="https://instagram.com/miltonbiswas"
  icon={<Instagram size={18} />}
  label="Instagram"
/>

<SocialLink
  href="https://facebook.com/miltonbiswas"
  icon={<Facebook size={18} />}
  label="Facebook"
/>

<SocialLink
  href="https://snapchat.com/add/miltonbiswas"
  icon={<Ghost size={18} />}
  label="Snapchat"
/>

<SocialLink
  href="https://twitter.com/miltonbiswas"
  icon={<Twitter size={18} />}
  label="Twitter"
/>

<SocialLink
  href="https://youtube.com/@miltonbiswas"
  icon={<Youtube size={18} />}
  label="YouTube"
/>

<SocialLink
  href="https://wa.me/919xxxxxxxxx"
  icon={<Phone size={18} />}
  label="WhatsApp"
/>
            
          </div>
          
          {/* Dashboard Button (Icon only on mobile) */}
          <Link 
            href="/login" 
            className="bg-white text-slate-900 hover:bg-blue-50 px-4 py-2 rounded-full text-sm font-bold transition flex items-center gap-2"
          >
            <LayoutDashboard size={16} />
            <span className="hidden md:block">Login</span>
          </Link> 
        </div>

      </motion.nav>
    </div>
  );
}

function SocialLink({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-slate-400 hover:text-white transition-colors hover:scale-110 transform"
      aria-label={label}
    >
      {icon}
    </a>
  );
}