"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useAnimation, useReducedMotion } from 'framer-motion';
import { 
  ArrowRight, Settings, MapPin, DollarSign, Target, 
  ShieldCheck, PlaneTakeoff, Zap, Server, Database,
  Globe, Languages, Users, BarChart3
} from 'lucide-react';

// -- 1. HEADER (ConnectGlobal Branding) --
const Header = () => {
  const reducedMotion = useReducedMotion();
  const menuLinks = [
    { name: "GLOBAL COMMERCE", href: "#" },
    { name: "DECENTRALIZED FINANCE", href: "#" },
    { name: "INTERNATIONAL TALENT", href: "#" },
    { name: "RESOURCES", href: "#" }
  ];

  return (
    <motion.header 
      className="fixed top-0 left-0 w-full z-50 bg-[#06070a]/80 backdrop-blur-md border-b border-white/5"
      initial={{ y: -100 }} animate={{ y: 0 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between p-5 px-10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Globe size={22} className="text-white" />
          </div>
          <span className="font-black text-2xl tracking-tighter text-white uppercase">
            Connect<span className="text-cyan-400">Global</span>
          </span>
        </Link>
        
        <nav className="hidden lg:flex gap-8 text-[10px] font-black tracking-widest text-gray-400">
          {menuLinks.map(link => (
            <Link key={link.name} href={link.href} className="hover:text-cyan-400 transition-colors uppercase">{link.name}</Link>
          ))}
        </nav>

        <button className="px-6 py-2.5 bg-cyan-500 text-black font-black text-[10px] uppercase tracking-widest rounded-full hover:bg-white transition-all">
          Start Global Journey
        </button>
      </div>
    </motion.header>
  );
};

// -- 2. INTERACTIVE GLOBE BACKGROUND --
const GlobeBackground = () => {
  const globeRef = useRef<HTMLDivElement>(null);
  const numDots = 80;
  const dots = Array.from({ length: numDots }).map((_, i) => ({
    x: Math.random() * 100, y: Math.random() * 100, size: Math.random() * 3 + 1
  }));

  useEffect(() => {
    const globeDiv = globeRef.current;
    if (!globeDiv) return;
    const dotsDivs = Array.from(globeDiv.children) as HTMLDivElement[];

    const handleMouseMove = (e: MouseEvent) => {
      const rect = globeDiv.getBoundingClientRect();
      dotsDivs.forEach((dot, i) => {
        const dotX = (rect.width * dots[i].x) / 100;
        const dotY = (rect.height * dots[i].y) / 100;
        const dist = Math.sqrt(Math.pow(e.clientX - rect.left - dotX, 2) + Math.pow(e.clientY - rect.top - dotY, 2));
        const proximity = Math.max(0, 200 - dist) / 200;
        dot.style.transform = `scale(${1 + proximity * 3})`;
        dot.style.opacity = `${0.2 + proximity * 0.8}`;
        dot.style.boxShadow = `0 0 ${15 * proximity}px rgba(34,211,238,${proximity})`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [dots]);

  return (
    <div className="absolute inset-0 overflow-hidden -z-10 bg-[#050608]">
      <div ref={globeRef} className="relative w-full h-full opacity-40">
        {dots.map((dot, i) => (
          <div key={i} className="absolute bg-cyan-400 rounded-full transition-all duration-300"
               style={{ left: `${dot.x}%`, top: `${dot.y}%`, width: dot.size, height: dot.size }} />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050608]/50 to-[#050608]" />
    </div>
  );
};

// -- 3. FEATURE CARD (Bento Grid) --
const FeatureCard = ({ title, desc, icon: Icon, href }: any) => (
  <motion.div 
    whileHover={{ y: -10, scale: 1.02 }}
    className="group relative p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 backdrop-blur-3xl overflow-hidden"
  >
    <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-500/50 rounded-[2.5rem] transition-all" />
    <div className="relative z-10 space-y-6">
      <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-all">
        <Icon size={28} />
      </div>
      <div>
        <h3 className="text-xl font-black uppercase tracking-tight text-white mb-2">{title}</h3>
        <p className="text-gray-500 text-xs font-bold leading-relaxed">{desc}</p>
      </div>
      <Link href={href} className="inline-flex items-center gap-2 text-cyan-400 text-[10px] font-black uppercase tracking-widest group-hover:gap-4 transition-all">
        Learn More <ArrowRight size={14} />
      </Link>
    </div>
  </motion.div>
);

// -- MAIN PAGE --
export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#050608] text-white selection:bg-cyan-500/30">
      <Header />
      <GlobeBackground />

      <main className="relative z-10 pt-44 pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center mb-32">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] mb-10"
          >
            <Languages size={14} /> Unified Global Interface Active
          </motion.div>
          <motion.h1 
            className="text-7xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase mb-8"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          >
            Global Access. <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">One Interface.</span>
          </motion.h1>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg font-light mb-12">
            Unified cross-border services, resources, and commerce for everyone, everywhere. 
            Experience the future of digital sovereignty.
          </p>
          <button className="px-12 py-5 bg-white text-black font-black rounded-2xl text-xs uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-2xl">
            Connect Now
          </button>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <FeatureCard title="Unified Network" desc="A glowing network hub for global connectivity." icon={Globe} href="#" />
          <FeatureCard title="Secure Payments" desc="Institutional-grade encryption for finance." icon={DollarSign} href="#" />
          <FeatureCard title="Access Markets" desc="Open doors to international talent and commerce." icon={Users} href="#" />
          <FeatureCard title="Real-time Stats" desc="Live data synchronization across 195+ countries." icon={BarChart3} href="#" />
        </div>
      </main>

      <footer className="py-10 border-t border-white/5 text-center text-[10px] text-gray-600 font-bold uppercase tracking-[0.4em]">
        ConnectGlobal AI — 2026 Digital Sovereignty Protocol
      </footer>
    </div>
  );
}
