"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { 
  Home, Briefcase, FileText, User, Github, Linkedin, Mail, 
  LayoutDashboard, Phone, Youtube, Twitter, Ghost, Facebook, 
  Instagram, Menu, X, LogOut 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "next-auth/react"; // Assuming next-auth/react is installed

// Define types for props
interface NavbarUIProps {
  user: { name?: string | null; email?: string | null } | undefined;
}

export default function NavbarUI({ user }: NavbarUIProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/", icon: <Home size={18} /> },
    { name: "Projects", href: "/projects", icon: <Briefcase size={18} /> },
    { name: "Blog", href: "/blog", icon: <FileText size={18} /> },
  ];

  return (
    <>
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-full px-6 py-3 shadow-2xl flex items-center justify-between md:justify-start gap-6 md:gap-8 text-slate-300 w-full max-w-5xl relative z-50"
        >
          
          {/* LEFT: Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-white hover:text-blue-400 transition shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-mono text-xs shadow-lg shadow-blue-900/50">
              MB
            </div>
            <span className="hidden md:block tracking-tight text-lg">MBD.HQ</span>
          </Link>

          {/* CENTER: Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 bg-slate-800/50 rounded-full p-1 border border-slate-700/50">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.name}
                  href={item.href}
                  className={`
                    relative px-5 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all duration-300
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
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* RIGHT: Desktop Socials & Actions */}
          <div className="hidden md:flex items-center gap-4 border-l border-slate-700 pl-6 ml-auto">
             <div className="flex gap-2">
                <SocialLink href="https://github.com/miltonbiswas" icon={<Github size={18} />} label="GitHub" />
                <SocialLink href="https://linkedin.com/in/xmiltonbiswasx" icon={<Linkedin size={18} />} label="LinkedIn" />
                <SocialLink href="mailto:miltonbiswasx@gmail.com" icon={<Mail size={18} />} label="Email" />
             </div>
             
             {user ? (
                <div className="flex items-center gap-3">
                   <Link href="/login" className="text-sm font-bold text-white hover:text-blue-400 transition">
                      Login
                   </Link> 
                   <button 
                      onClick={() => signOut()} // Triggers NextAuth signout
                      className="bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white p-2 rounded-full transition"
                      title="Log Out"
                   >
                      <LogOut size={16} />
                   </button>
                </div>
             ) : (
                <Link 
                  href="/login" 
                  className="bg-white text-slate-900 hover:bg-blue-50 px-5 py-2 rounded-full text-sm font-bold transition flex items-center gap-2 shadow-lg shadow-white/10"
                >
                  <LayoutDashboard size={16} />
                  Login
                </Link>
             )}
          </div>

          {/* MOBILE TOGGLE BUTTON */}
          <button 
             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
             className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-full transition"
          >
             {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </motion.nav>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
             initial={{ opacity: 0, y: -20, scale: 0.95 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             exit={{ opacity: 0, y: -20, scale: 0.95 }}
             transition={{ duration: 0.2 }}
             className="fixed top-24 left-4 right-4 z-40 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-2xl md:hidden overflow-y-auto max-h-[80vh]"
          >
             {/* Mobile Nav Links */}
             <div className="flex flex-col gap-2 mb-8">
                {navItems.map((item) => (
                   <Link 
                      key={item.name} 
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 text-slate-200 hover:bg-slate-800 hover:text-white transition font-medium text-lg"
                   >
                      <div className="p-2 bg-slate-700 rounded-lg text-blue-400">{item.icon}</div>
                      {item.name}
                   </Link>
                ))}
             </div>

             {/* Mobile Social Groups */}
             <div className="space-y-6">
                
                {/* Connect (Professional) */}
                <div>
                   <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Connect</h4>
                   <div className="flex flex-wrap gap-3">
                      <SocialLink href="https://linkedin.com/in/xmiltonbiswasx" icon={<Linkedin size={20} />} label="LinkedIn" mobile />
                      <SocialLink href="https://github.com/miltonbiswas" icon={<Github size={20} />} label="GitHub" mobile />
                      <SocialLink href="mailto:miltonbiswasx@gmail.com" icon={<Mail size={20} />} label="Email" mobile />
                      <SocialLink href="https://wa.me/919xxxxxxxxx" icon={<Phone size={20} />} label="WhatsApp" mobile />
                   </div>
                </div>

                {/* Socials (Media) */}
                <div>
                   <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Socials</h4>
                   <div className="flex flex-wrap gap-3">
                      <SocialLink href="https://twitter.com/miltonbiswas" icon={<Twitter size={20} />} label="Twitter" mobile />
                      <SocialLink href="https://instagram.com/miltonbiswas" icon={<Instagram size={20} />} label="Instagram" mobile />
                      <SocialLink href="https://facebook.com/miltonbiswas" icon={<Facebook size={20} />} label="Facebook" mobile />
                      <SocialLink href="https://youtube.com/@miltonbiswas" icon={<Youtube size={20} />} label="YouTube" mobile />
                      <SocialLink href="https://snapchat.com/add/miltonbiswas" icon={<Ghost size={20} />} label="Snapchat" mobile />
                   </div>
                </div>

                {/* Mobile Auth Action */}
                <div className="pt-6 border-t border-slate-800">
                   {user ? (
                      <div className="flex flex-col gap-3">
                         <div className="flex items-center gap-3 px-2">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                               {user.name?.[0] || "U"}
                            </div>
                            <div>
                               <p className="text-white font-bold">{user.name}</p>
                               <p className="text-xs text-slate-400">{user.email}</p>
                            </div>
                         </div>
                         <div className="grid grid-cols-2 gap-3 mt-2">
                             <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="bg-slate-800 text-white py-3 rounded-xl font-bold text-center">Login</Link>
                             <button onClick={() => signOut()} className="bg-red-500/10 text-red-400 py-3 rounded-xl font-bold text-center">Log Out</button>
                         </div>
                      </div>
                   ) : (
                      <Link 
                        href="/login" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-full bg-white text-slate-900 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-blue-50 transition"
                      >
                        <LayoutDashboard size={20} /> Admin Login
                      </Link>
                   )}
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function SocialLink({ href, icon, label, mobile = false }: { href: string, icon: React.ReactNode, label: string, mobile?: boolean }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`
         flex items-center justify-center text-slate-400 hover:text-white transition-all transform hover:scale-110 
         ${mobile ? "w-12 h-12 bg-slate-800 rounded-xl hover:bg-slate-700" : ""}
      `}
      aria-label={label}
      title={label}
    >
      {icon}
    </a>
  );
}