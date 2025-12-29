"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, CheckCircle2, ArrowRight, Layout, 
  Code, Smartphone, Database, Sparkles, MessageSquare, 
  Mail, Phone, Clock, DollarSign, Calendar
} from "lucide-react";

// --- CONFIGURATION ---
const PROJECT_TYPES = [
  { id: "web-dev", label: "Custom Website", icon: <Layout size={24} /> },
  { id: "webapp", label: "Web App / SaaS", icon: <Code size={24} /> },
  { id: "ecommerce", label: "E-Commerce", icon: <Smartphone size={24} /> },
  { id: "backend", label: "Backend / API", icon: <Database size={24} /> },
  { id: "consulting", label: "Consulting", icon: <MessageSquare size={24} /> },
  { id: "other", label: "Other", icon: <Sparkles size={24} /> },
];

const BUDGET_RANGES = [
  "Under ₹50k", 
  "₹50k - ₹1 Lakh", 
  "₹1 Lakh - ₹5 Lakh", 
  "₹5 Lakh+", 
  "Not sure yet"
];

const TIMELINES = [
  "Urgent (ASAP)",
  "1 - 2 Months",
  "3 - 6 Months",
  "Flexible"
];

export default function StartProjectPage() {
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    projectType: "",
    budget: "",
    timeline: "",
    description: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Selection Chips
  const handleSelect = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  // Handle Submit (Mock)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API Call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    console.log("Form Submitted:", formData); // Replace with actual server action later
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  // Success View
  if (isSuccess) {
    return <SuccessView onReset={() => setIsSuccess(false)} />;
  }

  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100 pt-32 pb-20">
      
      {/* Background Grid */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* PAGE HEADER */}
        <div className="max-w-3xl mb-16">
           <motion.div 
             initial={{ opacity: 0, y: 20 }} 
             animate={{ opacity: 1, y: 0 }} 
             transition={{ duration: 0.5 }}
           >
             <h4 className="text-blue-600 font-mono text-sm uppercase tracking-widest mb-4">Work With MBD®</h4>
             <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">Let’s Build Something <br/> Extraordinary.</h1>
             <p className="text-xl text-gray-500 leading-relaxed">
                Tell me about your vision. Whether it's a complex SaaS platform or a high-performance marketing site, I'll help you architect a solution that scales.
             </p>
           </motion.div>
        </div>

        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* LEFT: THE FORM */}
          <div className="lg:col-span-7">
             <form onSubmit={handleSubmit} className="space-y-12">
                
                {/* 1. CLIENT DETAILS */}
                <Section title="01. The Basics">
                   <div className="grid md:grid-cols-2 gap-6">
                      <InputGroup label="Your Name" name="name" placeholder="John Doe" required onChange={handleChange} />
                      <InputGroup label="Email Address" name="email" type="email" placeholder="john@company.com" required onChange={handleChange} />
                      <InputGroup label="Company / Organization" name="company" placeholder="Acme Inc. (Optional)" onChange={handleChange} />
                      <InputGroup label="Phone Number" name="phone" placeholder="+91 98765 43210" onChange={handleChange} />
                   </div>
                </Section>

                {/* 2. PROJECT TYPE */}
                <Section title="02. What are we building?">
                   <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {PROJECT_TYPES.map((type) => (
                        <div 
                          key={type.id}
                          onClick={() => handleSelect("projectType", type.id)}
                          className={`cursor-pointer p-6 rounded-2xl border transition-all duration-200 flex flex-col items-center justify-center gap-4 text-center hover:shadow-lg
                            ${formData.projectType === type.id 
                              ? 'bg-gray-900 border-gray-900 text-white shadow-xl scale-[1.02]' 
                              : 'bg-white border-gray-200 text-gray-500 hover:border-blue-400 hover:text-blue-600'
                            }`}
                        >
                           {type.icon}
                           <span className="text-sm font-bold">{type.label}</span>
                        </div>
                      ))}
                   </div>
                   {/* Hidden input for validation if needed */}
                   <input type="hidden" name="projectType" value={formData.projectType} required />
                </Section>

                {/* 3. DETAILS */}
                <Section title="03. The Nitty Gritty">
                   <div className="space-y-8">
                      
                      {/* Budget & Timeline Grid */}
                      <div className="grid md:grid-cols-2 gap-8">
                         <div>
                            <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                               <DollarSign size={16} className="text-blue-600"/> Budget Estimation
                            </label>
                            <select 
                                name="budget"
                                onChange={handleChange}
                                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition outline-none appearance-none cursor-pointer text-gray-700"
                                required
                            >
                               <option value="" disabled selected>Select a range...</option>
                               {BUDGET_RANGES.map(range => <option key={range} value={range}>{range}</option>)}
                            </select>
                         </div>

                         <div>
                            <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                               <Calendar size={16} className="text-blue-600"/> Desired Timeline
                            </label>
                            <select 
                                name="timeline"
                                onChange={handleChange}
                                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition outline-none appearance-none cursor-pointer text-gray-700"
                                required
                            >
                               <option value="" disabled selected>Select timeline...</option>
                               {TIMELINES.map(time => <option key={time} value={time}>{time}</option>)}
                            </select>
                         </div>
                      </div>

                      {/* Description */}
                      <div>
                         <label className="block text-sm font-bold text-gray-900 mb-3">Project Description & Goals</label>
                         <textarea 
                           name="description"
                           rows={6} 
                           onChange={handleChange}
                           className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition outline-none resize-none text-gray-700 placeholder-gray-400"
                           placeholder="Tell me about the problem you're solving, your target audience, and any specific features you need..."
                           required
                         ></textarea>
                      </div>
                   </div>
                </Section>

                {/* SUBMIT AREA */}
                <div className="pt-4 border-t border-gray-100">
                   <button 
                     type="submit" 
                     disabled={isSubmitting}
                     className="w-full md:w-auto bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-3 hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl hover:-translate-y-1"
                   >
                      {isSubmitting ? (
                        <>Processing...</>
                      ) : (
                        <>Send Proposal Request <ArrowRight size={20}/></>
                      )}
                   </button>
                   <p className="text-xs text-gray-400 mt-4">
                      By submitting this form, you agree to share this information for project estimation purposes.
                   </p>
                </div>

             </form>
          </div>

          {/* RIGHT: SIDEBAR INFO */}
          <div className="lg:col-span-5 space-y-10">
             
             {/* Process Card */}
             <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200">
                <h3 className="font-bold text-xl mb-6 text-gray-900">What happens next?</h3>
                <ul className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:h-[80%] before:w-0.5 before:bg-gray-200">
                   <ProcessItem number="1" title="Review & Discovery" desc="I'll analyze your requirements to see if we're a good technical match." />
                   <ProcessItem number="2" title="Consultation Call" desc="We'll discuss the scope, timeline, and budget in a quick 30-min Google Meet." />
                   <ProcessItem number="3" title="Kickoff" desc="Once approved, I start architecting your solution immediately." />
                </ul>
             </div>

             {/* Contact Card */}
             <div className="bg-gray-900 text-white p-8 rounded-3xl shadow-xl">
                <h3 className="font-bold text-xl mb-4">Prefer to email directly?</h3>
                <p className="text-gray-400 mb-6 text-sm">Sometimes a simple email is easier. Feel free to reach out.</p>
                <a 
                  href="mailto:contact@miltonbiswas.com" 
                  className="flex items-center gap-3 text-lg font-bold hover:text-blue-400 transition"
                >
                   <div className="p-2 bg-white/10 rounded-lg"><Mail size={20}/></div>
                   contact@miltonbiswas.com
                </a>
             </div>

             {/* Trust Badge */}
             <div className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                   <CheckCircle2 size={24} />
                </div>
                <div>
                   <p className="font-bold text-gray-900">100% Commitment</p>
                   <p className="text-xs text-gray-500">I only take on projects where I can deliver exceptional value.</p>
                </div>
             </div>

          </div>

        </div>
      </div>
    </main>
  );
}

// --- SUB-COMPONENTS ---

function InputGroup({ label, name, type = "text", placeholder, required = false, onChange }: { label: string, name: string, type?: string, placeholder: string, required?: boolean, onChange: (e: any) => void }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-bold text-gray-700">
        {label} {required && <span className="text-blue-600">*</span>}
      </label>
      <input 
        name={name}
        type={type}
        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition outline-none placeholder-gray-400 text-gray-900"
        placeholder={placeholder}
        required={required}
        onChange={onChange}
      />
    </div>
  )
}

function Section({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-6 border-b border-gray-100 pb-2">{title}</h3>
      {children}
    </div>
  )
}

function ProcessItem({ number, title, desc }: { number: string, title: string, desc: string }) {
  return (
    <li className="relative pl-12">
       <div className="absolute left-0 top-0 h-10 w-10 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center font-bold text-blue-600 z-10 shadow-sm">
          {number}
       </div>
       <h4 className="font-bold text-gray-900 mb-1">{title}</h4>
       <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </li>
  )
}

function SuccessView({ onReset }: { onReset: () => void }) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
       <motion.div 
         initial={{ scale: 0.9, opacity: 0 }}
         animate={{ scale: 1, opacity: 1 }}
         className="bg-white p-12 rounded-3xl shadow-2xl max-w-lg text-center border border-gray-100"
       >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
             <Send size={40} />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4">Message Sent!</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
             Thank you for sharing your project details. I have received your inquiry and will get back to you within 24 hours to schedule our discovery call.
          </p>
          <button 
            onClick={onReset}
            className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-blue-600 transition"
          >
             Back to Site
          </button>
       </motion.div>
    </main>
  )
}