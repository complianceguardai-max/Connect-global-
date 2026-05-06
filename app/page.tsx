"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  ShieldCheck, 
  ShoppingBag, 
  Users, 
  ArrowUpRight, 
  Zap,
  LayoutGrid
} from 'lucide-react';

// --- Abstracted Components for Visual Identity ---

// Top Navigation Item (e.g., Global Commerce @Multilingual)
const NavItem = ({ title, sub }: { title: string, sub: string }) => (
  <div className="flex flex-col cursor-pointer group">
    <span className="text-[10px] text-gray-500 font-bold tracking-[0.2em] group-hover:text-[#16b5ec] transition-colors uppercase">{title}</span>
    <span className="text-[11px] text-gray-300 font-medium tracking-tight">@{sub}</span>
  </div>
);

// Features Bento Grid Card (matching the image aesthetic)
interface FeatureCardProps {
    title: string;
    desc: string;
    icon: React.ElementType;
    color: string; // Tailwind gradient classes e.g., "from-[#16b5ec] to-[#3478f2]"
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, desc, icon: Icon, color }) => (
  <motion.div 
    whileHover={{ y: -10, transition: { duration: 0.3 } }}
    className="relative p-8 rounded-[2.5rem] bg-[#1a1c22]/40 backdrop-blur-2xl border border-white/5 overflow-hidden group flex flex-col justify-between aspect-[3/4]"
  >
    {/* Decorative Top Gradient Line */}
    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${color} opacity-60 group-hover:opacity-100 transition-opacity`} />
    
    <div className="relative z-10">
      <h3 className="text-xl font-extrabold leading-tight text-white/90 uppercase tracking-tighter w-4/5 mb-2">{title}</h3>
      <p className="text-xs text-gray-400 font-medium leading-relaxed mb-6">{desc}</p>
    </div>

    {/* Schematic Diagram Representation (like the image) */}
    <div className="relative z-10 w-full aspect-square rounded-2xl bg-black/50 border border-white/5 flex items-center justify-center overflow-hidden mb-6">
        <Icon size={70} className="text-white/10 group-hover:text-white/25 transition-all duration-700 group-hover:scale-110" />
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5 group-hover:opacity-10 transition-opacity`} />
        {/* Simulating schematic lines */}
        <div className="absolute inset-x-4 top-1/2 h-px bg-white/5"></div>
        <div className="absolute inset-y-4 left-1/2 w-px bg-white/5"></div>
    </div>

    <button className="relative z-10 flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-white/80 bg-white/5 w-fit px-5 py-2.5 rounded-full hover:bg-white/10 transition-all uppercase">
        Run More <ArrowUpRight size={14} />
    </button>
  </motion.div>
);

// --- Main ConnectGlobal Page Component ---

export default function ConnectGlobalPage() {
  return (
    <main className="min-h-screen bg-[#030406] text-white selection:bg-[#16b5ec]/30 overflow-x-hidden font-sans">
      
      {/* 1. Fixed Header (Navbar) - Matching Image Layout */}
      <nav className="fixed top-0 w-full z-50 p-6">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between bg-black/50 backdrop-blur-2xl border border-white/10 p-3 px-8 rounded-full shadow-2xl">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-[#16b5ec] rounded-full flex items-center justify-center animate-pulse shadow-[0_0_15px_rgba(22,181,236,0.5)]">
              <Globe size={18} className="text-black" />
            </div>
            <span className="text-xl font-black tracking-tighter">ConnectGlobal</span>
          </div>

          {/* All English Nav - Arabic removed */}
          <div className="hidden xl:flex gap-12">
            <NavItem title="Global Commerce" sub="Multilingual" />
            <NavItem title="Decentralized Finance" sub="Hints" />
            <NavItem title="International Talent" sub="Secondary" />
            <NavItem title="Knowledge Sharing" sub="Hint" />
          </div>

          <div className="flex items-center gap-8">
            <span className="text-[11px] font-bold tracking-[0.2em] text-gray-400 cursor-pointer hover:text-white transition-colors uppercase">Resources</span>
            <button className="bg-gradient-to-r from-[#76fbd3] to-[#71ccff] text-black text-[10px] font-black px-7 py-3.5 rounded-full hover:shadow-[0_0_20px_rgba(118,251,211,0.5)] transition-all uppercase tracking-tight">
              Start Global Journey
            </button>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section - Simulated Mesh Globe and Text */}
      <section className="relative pt-36 pb-20 px-6 min-h-screen flex flex-col items-center justify-center">
        {/* Background Mesh/Globe Simulation - This is the central visual */}
        <div className="absolute inset-0 z-0 opacity-40">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] h-[90vh] bg-[radial-gradient(circle_at_center,_#16b5ec15_0%,_transparent_65%)]" />
           {/* Replace URL below with actual map SVG/Image if available */}
           <div className="w-full h-full bg-[url('[https://www.transparenttextures.com/patterns/carbon-fibre.png](https://www.transparenttextures.com/patterns/carbon-fibre.png)')] opacity-15" />
           {/* Simulating glowing nodes */}
           <div className="absolute top-[40%] left-[30%] w-2 h-2 bg-[#76fbd3] rounded-full animate-ping"></div>
           <div className="absolute top-[60%] left-[70%] w-2 h-2 bg-[#16b5ec] rounded-full animate-ping delay-700"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative z-10 text-center max-w-5xl"
        >
          <h1 className="text-6xl md:text-[6rem] font-black tracking-tighter leading-[0.88] mb-8 uppercase">
            Global Access.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#76fbd3] to-[#71ccff]">One Interface.</span>
          </h1>
          <p className="text-sm md:text-base text-gray-400 font-medium max-w-xl mx-auto mb-12 leading-relaxed">
            Unified cross-border services, resources, and commerce for everyone, everywhere. Intuitively connecting you with a world of opportunities.
          </p>
          <button className="bg-gradient-to-r from-[#76fbd3] to-[#71ccff] text-black font-black px-14 py-5 rounded-full hover:scale-105 transition-transform text-sm uppercase tracking-tight shadow-[0_10px_30px_rgba(118,251,211,0.3)]">
            Connect Now
          </button>
        </motion.div>

        {/* Floating Language/Service Status simulated (Arabic removed from list) */}
        <div className="absolute right-12 top-48 bg-[#1a1c22]/70 p-5 rounded-3xl border border-white/5 hidden xl:block backdrop-blur-lg shadow-xl">
            <div className="flex flex-col gap-3.5">
                {[
                  {lang: 'English', status: 'Active'}, 
                  {lang: 'Spanish', status: 'Active'}, 
                  {lang: 'Chinese', status: 'Syncing'}, 
                  {lang: 'French', status: 'Active'}, 
                  {lang: 'German', status: 'Standby'}
                ].map((item, i) => (
                    <div key={item.lang} className="flex items-center justify-between gap-6 text-[10px] font-bold">
                        <span className="text-gray-300">{item.lang}</span> 
                        <span className={`px-2 py-0.5 rounded-sm ${item.status === 'Active' ? 'bg-[#76fbd3]/10 text-[#76fbd3]' : 'bg-gray-700 text-gray-400'}`}>{item.status}</span>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* 3. Features Bento Grid - Matching the 4 Cards in Image */}
      <section className="relative z-10 px-6 pb-28 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          <FeatureCard 
            title="Unified Global Network" 
            desc="Centralized hub connecting storage nodes, active services, and data flows." 
            icon={Globe} 
            color="from-[#16b5ec] to-[#3478f2]" 
          />
          <FeatureCard 
            title="Secure Payments & Finance" 
            desc="Instant cross-border transactions, multi-currency support, and stablecoin hints." 
            icon={ShieldCheck} 
            color="from-[#76fbd3] to-[#16b5ec]" 
          />
          <FeatureCard 
            title="Access International Markets" 
            desc="Market terminal for global commerce, multilingual product listings, and digital trade." 
            icon={ShoppingBag} 
            color="from-[#3478f2] to-[#71ccff]" 
          />
          <FeatureCard 
            title="Real-time Collaboration" 
            desc="Synchronized team workspaces, project boards, and knowledge sharing hints." 
            icon={Users} 
            color="from-[#16b5ec] to-[#76fbd3]" 
          />
        </div>
      </section>

      {/* 4. Stats Footer Bar - Highlighting Metrics */}
      <footer className="bg-[#111216]/80 backdrop-blur-lg border-t border-white/5 py-12 px-6">
        <div className="max-w-[1440px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 text-center lg:text-left">
            {[
                {label: 'Users in', value: '195+', unit: 'Countries'},
                {label: 'Transactions', value: '34k', unit: 'Flowing Daily'},
                {label: 'Active Nodes', value: '2000+', unit: 'Partners'},
                {label: 'Support', value: '24/7', unit: 'Live Assistance'}
            ].map(stat => (
                <div key={stat.label} className="flex flex-col items-center lg:items-start">
                    <span className="text-[10px] font-black text-gray-500 tracking-[0.3em] uppercase mb-2.5">{stat.label}</span>
                    <span className="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">{stat.value}</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{stat.unit}</span>
                </div>
            ))}
        </div>
      </footer>
    </main>
  );
}
