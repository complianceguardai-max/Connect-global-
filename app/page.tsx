"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useAnimation, useReducedMotion } from 'framer-motion';
import { 
  ArrowRight, 
  Settings, 
  MapPin, 
  DollarSign, 
  Target, 
  ShieldCheck, 
  PlaneTakeoff, 
  Zap, 
  Server, 
  Database,
  BarChart3,
  Scale
} from 'lucide-react';

/**
 * A professional frontend engineer always abstracts complex components. 
 * Due to the format, I am inlining them all in one file, but this would be a project
 * structure with component files in app/components/.
 */

// -- COMPONENT 1: HEADER --
// Replicates the top menu from the image, but adds user-specified links.
const Header: React.FC = () => {
  const reducedMotion = useReducedMotion();

  // Universal hover variants for navigation elements
  const navItemVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { type: 'spring', stiffness: 400, damping: 10 }
    }
  };

  const menuLinks = [
    { name: "HOME", href: "/" },
    { name: "PLATFORM", href: "/platform" },
    { name: "SOLUTIONS", href: "/solutions" },
    { name: "RESOURCES", href: "/resources" },
    { name: "ABOUT US", href: "/about-us" },
    { name: "CONTACT", href: "/contact" }
  ];

  return (
    <motion.header 
      className="fixed top-0 left-0 w-full z-50 bg-[#06070a]/90 backdrop-blur-sm border-b border-gray-800"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between p-6 px-12">
        {/* Brand Logo - Giving it a glowing text effect as seen in other elements */}
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div 
            className="w-10 h-10 bg-gradient-to-tr from-[#16b5ec] to-[#3478f2] rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(22,181,236,0.3)]"
            whileHover={!reducedMotion ? { rotate: [0, 10, -10, 0], scale: 1.1 } : {}}
          >
            <ShieldCheck size={24} className="text-white" />
          </motion.div>
          <span className="font-extrabold text-2xl tracking-tighter text-white group-hover:text-[#16b5ec] transition-colors">
            Compliance<span className="text-gray-400 font-medium">Guard</span><span className="text-[#3478f2]">AI</span>
          </span>
        </Link>
        
        {/* User-specified Top Menu */}
        <nav className="hidden md:flex gap-8 text-sm font-semibold tracking-wider text-gray-400">
          {menuLinks.map(link => (
            <motion.div 
              key={link.name} 
              variants={navItemVariants} 
              whileHover="hover" 
              className="relative p-2"
            >
              <Link href={link.href} className="hover:text-white transition-colors">{link.name}</Link>
              {/* Neon border glow effect on hover */}
              <motion.div 
                className="absolute inset-0 border border-transparent rounded-lg shadow-[0_0_10px_rgba(22,181,236,0)]"
                whileHover={!reducedMotion ? {
                  borderColor: '#16b5ec',
                  boxShadow: '0 0 15px 4px rgba(22,181,236,0.5)',
                  transition: { duration: 0.2 }
                } : {}}
              />
            </motion.div>
          ))}
        </nav>

        {/* Primary CTA button with universal hover glow and icon jiggle */}
        <motion.button 
          className="group relative px-8 py-3 bg-gradient-to-tr from-[#16b5ec] to-[#3478f2] text-white rounded-full text-sm font-bold flex items-center gap-2"
          whileHover={!reducedMotion ? { 
            scale: 1.05, 
            boxShadow: '0 0 20px 8px rgba(52,120,242,0.6)',
          } : { scale: 1.05 }}
        >
          <span>Get Started</span>
          <motion.div whileHover={!reducedMotion ? { rotate: [0, 15, -15, 0], scale: 1.1 } : {}}>
             <Settings size={18} className="text-white" />
          </motion.div>
        </motion.button>
      </div>
    </motion.header>
  );
}

// -- COMPONENT 2: INTERACTIVE GLOBE BACKGROUND --
// Replicates the global network, making dots "ping" brighter based on mouse proximity.
const GlobeBackground: React.FC = () => {
  const globeRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // Defines a grid of points over the globe image to make them interactive.
  const numDots = 100;
  const dots = Array.from({ length: numDots }).map((_, index) => ({
    x: (index % 10) * 10 + 5, // grid coords 0-100
    y: Math.floor(index / 10) * 10 + 5,
    size: 4 + (Math.random() * 4), // varied base sizes
  }));

  const controls = useAnimation();

  useEffect(() => {
    const globeDiv = globeRef.current;
    if (!globeDiv || reducedMotion) return;

    // Standard Framer Motion animate function is difficult to coordinate across so many components
    // for a high-performance interactive effect. We use direct DOM manipulation for maximum speed
    // and smoothness for a professional engineering touch.
    const dotsDivs = Array.from(globeDiv.children) as HTMLDivElement[];

    const handleMouseMove = (event: MouseEvent) => {
      const rect = globeDiv.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      dotsDivs.forEach((dot, index) => {
        const dotData = dots[index];
        const dotX = (rect.width * dotData.x / 100);
        const dotY = (rect.height * dotData.y / 100);

        const dx = mouseX - dotX;
        const dy = mouseY - dotY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Calculate a brightness/scale effect based on proximity to mouse
        const proximity = Math.max(0, 150 - dist) / 150; // max effect within 150px
        const scaleEffect = 1 + (proximity * 2); // max 3x base size
        const glowOpacity = 0.2 + (proximity * 0.8); // max fully opaque glow

        dot.style.transform = `scale(${scaleEffect})`;
        dot.style.boxShadow = `0 0 15px ${10 * proximity}px rgba(22,181,236,${glowOpacity})`;
        dot.style.opacity = `${glowOpacity}`;
      });
    };

    const handleMouseLeave = () => {
        dotsDivs.forEach((dot, index) => {
            const dotData = dots[index];
            dot.style.transform = `scale(1)`;
            dot.style.boxShadow = `0 0 5px rgba(22,181,236,0.3)`;
            dot.style.opacity = `0.3`;
          });
    };

    globeDiv.addEventListener('mousemove', handleMouseMove);
    globeDiv.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
        globeDiv.removeEventListener('mousemove', handleMouseMove);
        globeDiv.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [dots, reducedMotion]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center -z-10 bg-[#06070a]">
        {/* Globe image as seen in the image - represent it with a base and overlay nodes */}
        <div className="relative w-[120%] h-[120%] -translate-y-[10%] p-[10%]">
            <Image 
                src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000" // A suitable dark tech globe background
                alt="Global Network"
                fill
                className="object-cover opacity-5"
            />
            
            {/* Superimposed interactive nodes/dots */}
            <div ref={globeRef} className="relative w-full h-full">
                {dots.map((dot, index) => (
                    <div 
                        key={index}
                        className="absolute bg-[#16b5ec] rounded-full opacity-30 shadow-[0_0_10px_rgba(22,181,236,0.3)] transition-all duration-100 ease-linear"
                        style={{
                            left: `${dot.x}%`,
                            top: `${dot.y}%`,
                            width: `${dot.size}px`,
                            height: `${dot.size}px`,
                        }}
                    />
                ))}
            </div>
            
            {/* Background elements like the airplane and pin from image */}
            <div className="absolute top-[30%] left-[20%] text-gray-500 opacity-20">
                <PlaneTakeoff size={48} />
            </div>
            <div className="absolute top-[70%] left-[60%] text-gray-500 opacity-20">
                <MapPin size={64} />
            </div>
        </div>
    </div>
  );
}

// -- COMPONENT 3: FEATURE CARD (Bento Grid Item) --
// Dynamic component that handles visual replication and specific hover jiggles.
interface FeatureCardProps {
    title: string;
    diagram: React.ReactNode;
    content?: React.ReactNode;
    href: string;
    iconHoverAnimation?: 'shake' | 'rotate' | 'jiggle';
    gridArea?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, diagram, content, href, iconHoverAnimation = 'rotate', gridArea }) => {
    const reducedMotion = useReducedMotion();

    const hoverVariants = {
        shake: { rotate: [0, 10, -10, 0], transition: { duration: 0.3 } },
        rotate: { rotate: [0, 45, -45, 0], transition: { duration: 0.3 } },
        jiggle: { scale: [1, 1.1, 0.9, 1], transition: { duration: 0.3 } },
    };

    return (
        <motion.div 
            className="group relative p-8 rounded-[3rem] bg-[#111216]/50 backdrop-blur-xl border border-gray-800 shadow-[inset_0_2px_4px_rgba(255,255,255,0.02)] overflow-hidden"
            style={{ gridArea }}
            whileHover={!reducedMotion ? { scale: 1.03, } : {}}
        >
            {/* Glowing neon border overlay, visible on hover */}
            <motion.div 
                className="absolute inset-0 border-2 border-transparent rounded-[3rem] shadow-[0_0_20px_4px_rgba(22,181,236,0)] z-10"
                whileHover={!reducedMotion ? {
                    borderColor: '#16b5ec',
                    boxShadow: '0 0 25px 8px rgba(22,181,236,0.6)',
                    transition: { duration: 0.2 }
                } : { borderColor: '#16b5ec' }}
            />

            <Link href={href} className="absolute inset-0 z-20"></Link>

            {/* Title and Icon shake logic */}
            <div className="relative z-30 flex items-center justify-between gap-4 mb-6">
                <h3 className="font-extrabold text-2xl tracking-tighter text-white group-hover:text-[#16b5ec] transition-colors">{title}</h3>
                <motion.div 
                    className="p-3 bg-gray-800/60 rounded-full text-[#3478f2]"
                    whileHover={!reducedMotion && iconHoverAnimation ? hoverVariants[iconHoverAnimation] : {}}
                >
                    {/* Placeholder for specific icon - defined in HomePage */}
                    <Zap size={20} />
                </motion.div>
            </div>

            {/* Replicated diagram content */}
            <div className="relative z-30 space-y-4 text-sm text-gray-400 font-medium leading-relaxed">
                <div className="w-full aspect-[2/1] rounded-2xl bg-[#0a0b0d] p-4 flex items-center justify-center border border-gray-800/50">
                    {diagram}
                </div>
                {content}
            </div>
            
            {/* Card corner link arrows from image */}
            <div className="absolute bottom-8 right-8 z-30 text-gray-700 opacity-50 group-hover:text-[#3478f2] group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                <ArrowRight size={24} />
            </div>
        </motion.div>
    );
};


// -- PAGE: HOMEPAGE (`app/page.tsx`) --
export default function HomePage() {
  const reducedMotion = useReducedMotion();

  const pageTransitionVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { 
        opacity: 1, 
        y: 0, 
        transition: { delay: 0.4, staggerChildren: 0.1, delayChildren: 0.6 } 
    }
  };

  // Content for features based on user input
  const features = [
    {
      title: "Unified Global Network",
      href: "/platform/network",
      icon: Target,
      iconHoverAnimation: 'shake',
      gridArea: 'network',
      diagram: (
          // Simplified replication of network diagram
          <div className="w-full h-full flex flex-col items-center justify-center text-[#16b5ec]/70 gap-3">
              <Zap size={32}/>
              <ArrowRight size={24}/>
              <Globe size={48} className="text-[#3478f2]"/>
              <div className="text-gray-600 text-xs text-center font-bold tracking-wider">SECURE DATA FLOWS</div>
          </div>
      )
    },
    {
      title: "Secure Payments",
      href: "/platform/payments",
      icon: DollarSign,
      iconHoverAnimation: 'jiggle',
      gridArea: 'payments',
      diagram: (
           // Money diagram replication
           <div className="w-full h-full flex items-center justify-center text-[#16b5ec] gap-4">
              <div className="w-16 h-16 rounded-full bg-[#16b5ec]/10 border border-[#16b5ec]/30 flex items-center justify-center">
                <DollarSign size={36}/>
              </div>
              <ArrowRight size={24} className="text-gray-700"/>
              <div className="w-16 h-16 rounded-full bg-[#3478f2]/10 border border-[#3478f2]/30 flex items-center justify-center text-[#3478f2]">
                <ShieldCheck size={36}/>
              </div>
          </div>
      )
    },
    {
      title: "Automated Compliance",
      href: "/platform/automated-compliance",
      icon: ShieldCheck,
      gridArea: 'compliance', // Card is column tall
      diagram: (
          // Compliance list diagram as seen in the image text
          <div className="w-full h-full flex flex-col items-center justify-center text-[#16b5ec] gap-3">
              <Server size={40}/>
              <div className="text-gray-600 text-xs font-bold tracking-wider">AI ACT AUDIT LOG</div>
              <div className="flex gap-2">
                <Database size={24}/>```tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useAnimation, useReducedMotion } from 'framer-motion';
import { 
  ArrowRight, 
  Settings, 
  MapPin, 
  DollarSign, 
  Target, 
  ShieldCheck, 
  PlaneTakeoff, 
  Zap, 
  Server, 
  Database,
  BarChart3,
  Scale,
  Globe
} from 'lucide-react';

/**
 * A professional frontend engineer always abstracts complex components. 
 * Due to the format, I am inlining them all in one file, but this would be a project
 * structure with component files in app/components/.
 */

// -- COMPONENT 1: HEADER --
// Replicates the top menu from the image, but adds user-specified links.
const Header: React.FC = () => {
  const reducedMotion = useReducedMotion();

  // Universal hover variants for navigation elements
  const navItemVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { type: 'spring', stiffness: 400, damping: 10 }
    }
  };

  const menuLinks = [
    { name: "HOME", href: "/" },
    { name: "PLATFORM", href: "/platform" },
    { name: "SOLUTIONS", href: "/solutions" },
    { name: "RESOURCES", href: "/resources" },
    { name: "ABOUT US", href: "/about-us" },
    { name: "CONTACT", href: "/contact" }
  ];

  return (
    <motion.header 
      className="fixed top-0 left-0 w-full z-50 bg-[#06070a]/90 backdrop-blur-sm border-b border-gray-800"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between p-6 px-12">
        {/* Brand Logo - Giving it a glowing text effect as seen in other elements */}
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div 
            className="w-10 h-10 bg-gradient-to-tr from-[#16b5ec] to-[#3478f2] rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(22,181,236,0.3)]"
            whileHover={!reducedMotion ? { rotate: [0, 10, -10, 0], scale: 1.1 } : {}}
          >
            <ShieldCheck size={24} className="text-white" />
          </motion.div>
          <span className="font-extrabold text-2xl tracking-tighter text-white group-hover:text-[#16b5ec] transition-colors">
            Compliance<span className="text-gray-400 font-medium">Guard</span><span className="text-[#3478f2]">AI</span>
          </span>
        </Link>
        
        {/* User-specified Top Menu */}
        <nav className="hidden md:flex gap-8 text-sm font-semibold tracking-wider text-gray-400">
          {menuLinks.map(link => (
            <motion.div 
              key={link.name} 
              variants={navItemVariants} 
              whileHover="hover" 
              className="relative p-2"
            >
              <Link href={link.href} className="hover:text-white transition-colors">{link.name}</Link>
              {/* Neon border glow effect on hover */}
              <motion.div 
                className="absolute inset-0 border border-transparent rounded-lg shadow-[0_0_10px_rgba(22,181,236,0)]"
                whileHover={!reducedMotion ? {
                  borderColor: '#16b5ec',
                  boxShadow: '0 0 15px 4px rgba(22,181,236,0.5)',
                  transition: { duration: 0.2 }
                } : {}}
              />
            </motion.div>
          ))}
        </nav>

        {/* Primary CTA button with universal hover glow and icon jiggle */}
        <motion.button 
          className="group relative px-8 py-3 bg-gradient-to-tr from-[#16b5ec] to-[#3478f2] text-white rounded-full text-sm font-bold flex items-center gap-2"
          whileHover={!reducedMotion ? { 
            scale: 1.05, 
            boxShadow: '0 0 20px 8px rgba(52,120,242,0.6)',
          } : { scale: 1.05 }}
        >
          <span>Get Started</span>
          <motion.div whileHover={!reducedMotion ? { rotate: [0, 15, -15, 0], scale: 1.1 } : {}}>
             <Settings size={18} className="text-white" />
          </motion.div>
        </motion.button>
      </div>
    </motion.header>
  );
}

// -- COMPONENT 2: INTERACTIVE GLOBE BACKGROUND --
// Replicates the global network, making dots "ping" brighter based on mouse proximity.
const GlobeBackground: React.FC = () => {
  const globeRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // Defines a grid of points over the globe image to make them interactive.
  const numDots = 100;
  const dots = Array.from({ length: numDots }).map((_, index) => ({
    x: (index % 10) * 10 + 5, // grid coords 0-100
    y: Math.floor(index / 10) * 10 + 5,
    size: 4 + (Math.random() * 4), // varied base sizes
  }));

  const controls = useAnimation();

  useEffect(() => {
    const globeDiv = globeRef.current;
    if (!globeDiv || reducedMotion) return;

    // Standard Framer Motion animate function is difficult to coordinate across so many components
    // for a high-performance interactive effect. We use direct DOM manipulation for maximum speed
    // and smoothness for a professional engineering touch.
    const dotsDivs = Array.from(globeDiv.children) as HTMLDivElement[];

    const handleMouseMove = (event: MouseEvent) => {
      const rect = globeDiv.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      dotsDivs.forEach((dot, index) => {
        const dotData = dots[index];
        const dotX = (rect.width * dotData.x / 100);
        const dotY = (rect.height * dotData.y / 100);

        const dx = mouseX - dotX;
        const dy = mouseY - dotY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Calculate a brightness/scale effect based on proximity to mouse
        const proximity = Math.max(0, 150 - dist) / 150; // max effect within 150px
        const scaleEffect = 1 + (proximity * 2); // max 3x base size
        const glowOpacity = 0.2 + (proximity * 0.8); // max fully opaque glow

        dot.style.transform = `scale(${scaleEffect})`;
        dot.style.boxShadow = `0 0 15px ${10 * proximity}px rgba(22,181,236,${glowOpacity})`;
        dot.style.opacity = `${glowOpacity}`;
      });
    };

    const handleMouseLeave = () => {
        dotsDivs.forEach((dot, index) => {
            const dotData = dots[index];
            dot.style.transform = `scale(1)`;
            dot.style.boxShadow = `0 0 5px rgba(22,181,236,0.3)`;
            dot.style.opacity = `0.3`;
          });
    };

    globeDiv.addEventListener('mousemove', handleMouseMove);
    globeDiv.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
        globeDiv.removeEventListener('mousemove', handleMouseMove);
        globeDiv.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [dots, reducedMotion]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center -z-10 bg-[#06070a]">
        {/* Globe image as seen in the image - represent it with a base and overlay nodes */}
        <div className="relative w-[120%] h-[120%] -translate-y-[10%] p-[10%]">
            <Image 
                src="[https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000](https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000)" // A suitable dark tech globe background
                alt="Global Network"
                fill
                className="object-cover opacity-5"
            />
            
            {/* Superimposed interactive nodes/dots */}
            <div ref={globeRef} className="relative w-full h-full">
                {dots.map((dot, index) => (
                    <div 
                        key={index}
                        className="absolute bg-[#16b5ec] rounded-full opacity-30 shadow-[0_0_10px_rgba(22,181,236,0.3)] transition-all duration-100 ease-linear"
                        style={{
                            left: `${dot.x}%`,
                            top: `${dot.y}%`,
                            width: `${dot.size}px`,
                            height: `${dot.size}px`,
                        }}
                    />
                ))}
            </div>
            
            {/* Background elements like the airplane and pin from image */}
            <div className="absolute top-[30%] left-[20%] text-gray-500 opacity-20">
                <PlaneTakeoff size={48} />
            </div>
            <div className="absolute top-[70%] left-[60%] text-gray-500 opacity-20">
                <MapPin size={64} />
            </div>
        </div>
    </div>
  );
}

// -- COMPONENT 3: FEATURE CARD (Bento Grid Item) --
// Dynamic component that handles visual replication and specific hover jiggles.
interface FeatureCardProps {
    title: string;
    diagram: React.ReactNode;
    content?: React.ReactNode;
    href: string;
    iconHoverAnimation?: 'shake' | 'rotate' | 'jiggle';
    gridArea?: string;
    Icon: React.ElementType; // Icon passed as component
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, diagram, content, href, Icon, iconHoverAnimation = 'rotate', gridArea }) => {
    const reducedMotion = useReducedMotion();

    const hoverVariants = {
        shake: { rotate: [0, 10, -10, 0], transition: { duration: 0.3 } },
        rotate: { rotate: [0, 45, -45, 0], transition: { duration: 0.3 } },
        jiggle: { scale: [1, 1.1, 0.9, 1], transition: { duration: 0.3 } },
    };

    return (
        <motion.div 
            className="group relative p-8 rounded-[3rem] bg-[#111216]/50 backdrop-blur-xl border border-gray-800 shadow-[inset_0_2px_4px_rgba(255,255,255,0.02)] overflow-hidden"
            style={{ gridArea }}
            whileHover={!reducedMotion ? { scale: 1.03, } : {}}
        >
            {/* Glowing neon border overlay, visible on hover */}
            <motion.div 
                className="absolute inset-0 border-2 border-transparent rounded-[3rem] shadow-[0_0_20px_4px_rgba(22,181,236,0)] z-10"
                whileHover={!reducedMotion ? {
                    borderColor: '#16b5ec',
                    boxShadow: '0 0 25px 8px rgba(22,181,236,0.6)',
                    transition: { duration: 0.2 }
                } : { borderColor: '#16b5ec' }}
            />

            <Link href={href} className="absolute inset-0 z-20"></Link>

            {/* Title and Icon shake logic */}
            <div className="relative z-30 flex items-center justify-between gap-4 mb-6">
                <h3 className="font-extrabold text-2xl tracking-tighter text-white group-hover:text-[#16b5ec] transition-colors">{title}</h3>
                <motion.div 
                    className="p-3 bg-gray-800/60 rounded-full text-[#3478f2]"
                    whileHover={!reducedMotion && iconHoverAnimation ? hoverVariants[iconHoverAnimation] : {}}
                >
                    <Icon size={20} />
                </motion.div>
            </div>

            {/* Replicated diagram content */}
            <div className="relative z-30 space-y-4 text-sm text-gray-400 font-medium leading-relaxed">
                <div className="w-full aspect-[2/1] rounded-2xl bg-[#0a0b0d] p-4 flex items-center justify-center border border-gray-800/50">
                    {diagram}
                </div>
                {content}
            </div>
            
            {/* Card corner link arrows from image */}
            <div className="absolute bottom-8 right-8 z-30 text-gray-700 opacity-50 group-hover:text-[#3478f2] group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                <ArrowRight size={24} />
            </div>
        </motion.div>
    );
};


// -- PAGE: HOMEPAGE (`app/page.tsx`) --
export default function HomePage() {
  const reducedMotion = useReducedMotion();

  const pageTransitionVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { 
        opacity: 1, 
        y: 0, 
        transition: { delay: 0.4, staggerChildren: 0.1, delayChildren: 0.6 } 
    }
  };

  // Content for features based on user input
  const features = [
    {
      title: "Unified Global Network",
      href: "/platform/network",
      Icon: Target,
      iconHoverAnimation: 'shake' as const,
      gridArea: 'network',
      diagram: (
          // Simplified replication of network diagram
          <div className="w-full h-full flex flex-col items-center justify-center text-[#16b5ec]/70 gap-3">
              <Zap size={32}/>
              <ArrowRight size={24}/>
              <Globe size={48} className="text-[#3478f2]"/>
              <div className="text-gray-600 text-xs text-center font-bold tracking-wider">SECURE DATA FLOWS</div>
          </div>
      )
    },
    {
      title: "Secure Payments",
      href: "/platform/payments",
      Icon: DollarSign,
      iconHoverAnimation: 'jiggle' as const,
      gridArea: 'payments',
      diagram: (
           // Money diagram replication
           <div className="w-full h-full flex items-center justify-center text-[#16b5ec] gap-4">
              <div className="w-16 h-16 rounded-full bg-[#16b5ec]/10 border border-[#16b5ec]/30 flex items-center justify-center">
                <DollarSign size={36}/>
              </div>
              <ArrowRight size={24} className="text-gray-700"/>
              <div className="w-16 h-16 rounded-full bg-[#3478f2]/10 border border-[#3478f2]/30 flex items-center justify-center text-[#3478f2]">
                <ShieldCheck size={36}/>
              </div>
          </div>
      )
    },
    {
      title: "Automated Compliance",
      href: "/platform/automated-compliance",
      Icon: ShieldCheck,
      iconHoverAnimation: 'rotate' as const,
      gridArea: 'compliance', // Card is column tall
      diagram: (
          // Compliance list diagram as seen in the image text
          <div className="w-full h-full flex flex-col items-center justify-center text-[#16b5ec] gap-3">
              <Server size={40}/>
              <div className="text-gray-600 text-xs font-bold tracking-wider">AI ACT AUDIT LOG</div>
              <div className="flex gap-2">
                <Database size={24}/>```tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useAnimation, useReducedMotion } from 'framer-motion';
import { 
  ArrowRight, 
  Settings, 
  MapPin, 
  DollarSign, 
  Target, 
  ShieldCheck, 
  PlaneTakeoff, 
  Zap, 
  Server, 
  Database,
  BarChart3,
  Scale,
  Globe
} from 'lucide-react';

/**
 * A professional frontend engineer always abstracts complex components. 
 * Due to the format, I am inlining them all in one file, but this would be a project
 * structure with component files in app/components/.
 */

// -- COMPONENT 1: HEADER --
// Replicates the top menu from the image, but adds user-specified links.
const Header: React.FC = () => {
  const reducedMotion = useReducedMotion();

  // Universal hover variants for navigation elements
  const navItemVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { type: 'spring', stiffness: 400, damping: 10 }
    }
  };

  const menuLinks = [
    { name: "HOME", href: "/" },
    { name: "PLATFORM", href: "/platform" },
    { name: "SOLUTIONS", href: "/solutions" },
    { name: "RESOURCES", href: "/resources" },
    { name: "ABOUT US", href: "/about-us" },
    { name: "CONTACT", href: "/contact" }
  ];

  return (
    <motion.header 
      className="fixed top-0 left-0 w-full z-50 bg-[#06070a]/90 backdrop-blur-sm border-b border-gray-800"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between p-6 px-12">
        {/* Brand Logo - Giving it a glowing text effect as seen in other elements */}
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div 
            className="w-10 h-10 bg-gradient-to-tr from-[#16b5ec] to-[#3478f2] rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(22,181,236,0.3)]"
            whileHover={!reducedMotion ? { rotate: [0, 10, -10, 0], scale: 1.1 } : {}}
          >
            <ShieldCheck size={24} className="text-white" />
          </motion.div>
          <span className="font-extrabold text-2xl tracking-tighter text-white group-hover:text-[#16b5ec] transition-colors">
            Compliance<span className="text-gray-400 font-medium">Guard</span><span className="text-[#3478f2]">AI</span>
          </span>
        </Link>
        
        {/* User-specified Top Menu */}
        <nav className="hidden md:flex gap-8 text-sm font-semibold tracking-wider text-gray-400">
          {menuLinks.map(link => (
            <motion.div 
              key={link.name} 
              variants={navItemVariants} 
              whileHover="hover" 
              className="relative p-2"
            >
              <Link href={link.href} className="hover:text-white transition-colors">{link.name}</Link>
              {/* Neon border glow effect on hover */}
              <motion.div 
                className="absolute inset-0 border border-transparent rounded-lg shadow-[0_0_10px_rgba(22,181,236,0)]"
                whileHover={!reducedMotion ? {
                  borderColor: '#16b5ec',
                  boxShadow: '0 0 15px 4px rgba(22,181,236,0.5)',
                  transition: { duration: 0.2 }
                } : {}}
              />
            </motion.div>
          ))}
        </nav>

        {/* Primary CTA button with universal hover glow and icon jiggle */}
        <motion.button 
          className="group relative px-8 py-3 bg-gradient-to-tr from-[#16b5ec] to-[#3478f2] text-white rounded-full text-sm font-bold flex items-center gap-2"
          whileHover={!reducedMotion ? { 
            scale: 1.05, 
            boxShadow: '0 0 20px 8px rgba(52,120,242,0.6)',
          } : { scale: 1.05 }}
        >
          <span>Get Started</span>
          <motion.div whileHover={!reducedMotion ? { rotate: [0, 15, -15, 0], scale: 1.1 } : {}}>
             <Settings size={18} className="text-white" />
          </motion.div>
        </motion.button>
      </div>
    </motion.header>
  );
}

// -- COMPONENT 2: INTERACTIVE GLOBE BACKGROUND --
// Replicates the global network, making dots "ping" brighter based on mouse proximity.
const GlobeBackground: React.FC = () => {
  const globeRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // Defines a grid of points over the globe image to make them interactive.
  const numDots = 100;
  const dots = Array.from({ length: numDots }).map((_, index) => ({
    x: (index % 10) * 10 + 5, // grid coords 0-100
    y: Math.floor(index / 10) * 10 + 5,
    size: 4 + (Math.random() * 4), // varied base sizes
  }));

  const controls = useAnimation();

  useEffect(() => {
    const globeDiv = globeRef.current;
    if (!globeDiv || reducedMotion) return;

    // Standard Framer Motion animate function is difficult to coordinate across so many components
    // for a high-performance interactive effect. We use direct DOM manipulation for maximum speed
    // and smoothness for a professional engineering touch.
    const dotsDivs = Array.from(globeDiv.children) as HTMLDivElement[];

    const handleMouseMove = (event: MouseEvent) => {
      const rect = globeDiv.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      dotsDivs.forEach((dot, index) => {
        const dotData = dots[index];
        const dotX = (rect.width * dotData.x / 100);
        const dotY = (rect.height * dotData.y / 100);

        const dx = mouseX - dotX;
        const dy = mouseY - dotY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Calculate a brightness/scale effect based on proximity to mouse
        const proximity = Math.max(0, 150 - dist) / 150; // max effect within 150px
        const scaleEffect = 1 + (proximity * 2); // max 3x base size
        const glowOpacity = 0.2 + (proximity * 0.8); // max fully opaque glow

        dot.style.transform = `scale(${scaleEffect})`;
        dot.style.boxShadow = `0 0 15px ${10 * proximity}px rgba(22,181,236,${glowOpacity})`;
        dot.style.opacity = `${glowOpacity}`;
      });
    };

    const handleMouseLeave = () => {
        dotsDivs.forEach((dot, index) => {
            const dotData = dots[index];
            dot.style.transform = `scale(1)`;
            dot.style.boxShadow = `0 0 5px rgba(22,181,236,0.3)`;
            dot.style.opacity = `0.3`;
          });
    };

    globeDiv.addEventListener('mousemove', handleMouseMove);
    globeDiv.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
        globeDiv.removeEventListener('mousemove', handleMouseMove);
        globeDiv.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [dots, reducedMotion]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center -z-10 bg-[#06070a]">
        {/* Globe image as seen in the image - represent it with a base and overlay nodes */}
        <div className="relative w-[120%] h-[120%] -translate-y-[10%] p-[10%]">
            <Image 
                src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000" // A suitable dark tech globe background
                alt="Global Network"
                fill
                className="object-cover opacity-5"
            />
            
            {/* Superimposed interactive nodes/dots */}
            <div ref={globeRef} className="relative w-full h-full">
                {dots.map((dot, index) => (
                    <div 
                        key={index}
                        className="absolute bg-[#16b5ec] rounded-full opacity-30 shadow-[0_0_10px_rgba(22,181,236,0.3)] transition-all duration-100 ease-linear"
                        style={{
                            left: `${dot.x}%`,
                            top: `${dot.y}%`,
                            width: `${dot.size}px`,
                            height: `${dot.size}px`,
                        }}
                    />
                ))}
            </div>
            
            {/* Background elements like the airplane and pin from image */}
            <div className="absolute top-[30%] left-[20%] text-gray-500 opacity-20">
                <PlaneTakeoff size={48} />
            </div>
            <div className="absolute top-[70%] left-[60%] text-gray-500 opacity-20">
                <MapPin size={64} />
            </div>
        </div>
    </div>
  );
}

// -- COMPONENT 3: FEATURE CARD (Bento Grid Item) --
// Dynamic component that handles visual replication and specific hover jiggles.
interface FeatureCardProps {
    title: string;
    diagram: React.ReactNode;
    content?: React.ReactNode;
    href: string;
    iconHoverAnimation?: 'shake' | 'rotate' | 'jiggle';
    gridArea?: string;
    Icon: React.ElementType; // Icon passed as component
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, diagram, content, href, Icon, iconHoverAnimation = 'rotate', gridArea }) => {
    const reducedMotion = useReducedMotion();

    const hoverVariants = {
        shake: { rotate: [0, 10, -10, 0], transition: { duration: 0.3 } },
        rotate: { rotate: [0, 45, -45, 0], transition: { duration: 0.3 } },
        jiggle: { scale: [1, 1.1, 0.9, 1], transition: { duration: 0.3 } },
    };

    return (
        <motion.div 
            className="group relative p-8 rounded-[3rem] bg-[#111216]/50 backdrop-blur-xl border border-gray-800 shadow-[inset_0_2px_4px_rgba(255,255,255,0.02)] overflow-hidden"
            style={{ gridArea }}
            whileHover={!reducedMotion ? { scale: 1.03, } : {}}
        >
            {/* Glowing neon border overlay, visible on hover */}
            <motion.div 
                className="absolute inset-0 border-2 border-transparent rounded-[3rem] shadow-[0_0_20px_4px_rgba(22,181,236,0)] z-10"
                whileHover={!reducedMotion ? {
                    borderColor: '#16b5ec',
                    boxShadow: '0 0 25px 8px rgba(22,181,236,0.6)',
                    transition: { duration: 0.2 }
                } : { borderColor: '#16b5ec' }}
            />

            <Link href={href} className="absolute inset-0 z-20"></Link>

            {/* Title and Icon shake logic */}
            <div className="relative z-30 flex items-center justify-between gap-4 mb-6">
                <h3 className="font-extrabold text-2xl tracking-tighter text-white group-hover:text-[#16b5ec] transition-colors">{title}</h3>
                <motion.div 
                    className="p-3 bg-gray-800/60 rounded-full text-[#3478f2]"
                    whileHover={!reducedMotion && iconHoverAnimation ? hoverVariants[iconHoverAnimation] : {}}
                >
                    <Icon size={20} />
                </motion.div>
            </div>

            {/* Replicated diagram content */}
            <div className="relative z-30 space-y-4 text-sm text-gray-400 font-medium leading-relaxed">
                <div className="w-full aspect-[2/1] rounded-2xl bg-[#0a0b0d] p-4 flex items-center justify-center border border-gray-800/50">
                    {diagram}
                </div>
                {content}
            </div>
            
            {/* Card corner link arrows from image */}
            <div className="absolute bottom-8 right-8 z-30 text-gray-700 opacity-50 group-hover:text-[#3478f2] group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                <ArrowRight size={24} />
            </div>
        </motion.div>
    );
};


// -- PAGE: HOMEPAGE (`app/page.tsx`) --
export default function HomePage() {
  const reducedMotion = useReducedMotion();

  const pageTransitionVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { 
        opacity: 1, 
        y: 0, 
        transition: { delay: 0.4, staggerChildren: 0.1, delayChildren: 0.6 } 
    }
  };

  // Content for features based on user input
  const features = [
    {
      title: "Unified Global Network",
      href: "/platform/network",
      Icon: Target,
      iconHoverAnimation: 'shake' as const,
      gridArea: 'network',
      diagram: (
          // Simplified replication of network diagram
          <div className="w-full h-full flex flex-col items-center justify-center text-[#16b5ec]/70 gap-3">
              <Zap size={32}/>
              <ArrowRight size={24}/>
              <Globe size={48} className="text-[#3478f2]"/>
              <div className="text-gray-600 text-xs text-center font-bold tracking-wider">SECURE DATA FLOWS</div>
          </div>
      )
    },
    {
      title: "Secure Payments",
      href: "/platform/payments",
      Icon: DollarSign,
      iconHoverAnimation: 'jiggle' as const,
      gridArea: 'payments',
      diagram: (
           // Money diagram replication
           <div className="w-full h-full flex items-center justify-center text-[#16b5ec] gap-4">
              <div className="w-16 h-16 rounded-full bg-[#16b5ec]/10 border border-[#16b5ec]/30 flex items-center justify-center">
                <DollarSign size={36}/>
              </div>
              <ArrowRight size={24} className="text-gray-700"/>
              <div className="w-16 h-16 rounded-full bg-[#3478f2]/10 border border-[#3478f2]/30 flex items-center justify-center text-[#3478f2]">
                <ShieldCheck size={36}/>
              </div>
          </div>
      )
    },
    {
      title: "Automated Compliance",
      href: "/platform/automated-compliance",
      Icon: ShieldCheck,
      iconHoverAnimation: 'rotate' as const,
      gridArea: 'compliance', // Card is column tall
      diagram: (
          // Compliance list diagram as seen in the image text
          <div className="w-full h-full flex flex-col items-center justify-center text-[#16b5ec] gap-3">
              <Server size={40}/>
              <div className="text-gray-600 text-xs font-bold tracking-wider">AI ACT AUDIT LOG</div>
              <div className="flex gap-2">
                <Database size={24}/>```tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useAnimation, useReducedMotion } from 'framer-motion';
import { 
  ArrowRight, 
  Settings, 
  MapPin, 
  DollarSign, 
  Target, 
  ShieldCheck, 
  PlaneTakeoff, 
  Zap, 
  Server, 
  Database,
  BarChart3,
  Scale,
  Globe
} from 'lucide-react';

/**
 * A professional frontend engineer always abstracts complex components. 
 * Due to the format, I am inlining them all in one file, but this would be a project
 * structure with component files in app/components/.
 */

// -- COMPONENT 1: HEADER --
// Replicates the top menu from the image, but adds user-specified links.
const Header: React.FC = () => {
  const reducedMotion = useReducedMotion();

  // Universal hover variants for navigation elements
  const navItemVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { type: 'spring', stiffness: 400, damping: 10 }
    }
  };

  const menuLinks = [
    { name: "HOME", href: "/" },
    { name: "PLATFORM", href: "/platform" },
    { name: "SOLUTIONS", href: "/solutions" },
    { name: "RESOURCES", href: "/resources" },
    { name: "ABOUT US", href: "/about-us" },
    { name: "CONTACT", href: "/contact" }
  ];

  return (
    <motion.header 
      className="fixed top-0 left-0 w-full z-50 bg-[#06070a]/90 backdrop-blur-sm border-b border-gray-800"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between p-6 px-12">
        {/* Brand Logo - Giving it a glowing text effect as seen in other elements */}
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div 
            className="w-10 h-10 bg-gradient-to-tr from-[#16b5ec] to-[#3478f2] rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(22,181,236,0.3)]"
            whileHover={!reducedMotion ? { rotate: [0, 10, -10, 0], scale: 1.1 } : {}}
          >
            <ShieldCheck size={24} className="text-white" />
          </motion.div>
          <span className="font-extrabold text-2xl tracking-tighter text-white group-hover:text-[#16b5ec] transition-colors">
            Compliance<span className="text-gray-400 font-medium">Guard</span><span className="text-[#3478f2]">AI</span>
          </span>
        </Link>
        
        {/* User-specified Top Menu */}
        <nav className="hidden md:flex gap-8 text-sm font-semibold tracking-wider text-gray-400">
          {menuLinks.map(link => (
            <motion.div 
              key={link.name} 
              variants={navItemVariants} 
              whileHover="hover" 
              className="relative p-2"
            >
              <Link href={link.href} className="hover:text-white transition-colors">{link.name}</Link>
              {/* Neon border glow effect on hover */}
              <motion.div 
                className="absolute inset-0 border border-transparent rounded-lg shadow-[0_0_10px_rgba(22,181,236,0)]"
                whileHover={!reducedMotion ? {
                  borderColor: '#16b5ec',
                  boxShadow: '0 0 15px 4px rgba(22,181,236,0.5)',
                  transition: { duration: 0.2 }
                } : {}}
              />
            </motion.div>
          ))}
        </nav>

        {/* Primary CTA button with universal hover glow and icon jiggle */}
        <motion.button 
          className="group relative px-8 py-3 bg-gradient-to-tr from-[#16b5ec] to-[#3478f2] text-white rounded-full text-sm font-bold flex items-center gap-2"
          whileHover={!reducedMotion ? { 
            scale: 1.05, 
            boxShadow: '0 0 20px 8px rgba(52,120,242,0.6)',
          } : { scale: 1.05 }}
        >
          <span>Get Started</span>
          <motion.div whileHover={!reducedMotion ? { rotate: [0, 15, -15, 0], scale: 1.1 } : {}}>
             <Settings size={18} className="text-white" />
          </motion.div>
        </motion.button>
      </div>
    </motion.header>
  );
}

// -- COMPONENT 2: INTERACTIVE GLOBE BACKGROUND --
// Replicates the global network, making dots "ping" brighter based on mouse proximity.
const GlobeBackground: React.FC = () => {
  const globeRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // Defines a grid of points over the globe image to make them interactive.
  const numDots = 100;
  const dots = Array.from({ length: numDots }).map((_, index) => ({
    x: (index % 10) * 10 + 5, // grid coords 0-100
    y: Math.floor(index / 10) * 10 + 5,
    size: 4 + (Math.random() * 4), // varied base sizes
  }));

  const controls = useAnimation();

  useEffect(() => {
    const globeDiv = globeRef.current;
    if (!globeDiv || reducedMotion) return;

    // Standard Framer Motion animate function is difficult to coordinate across so many components
    // for a high-performance interactive effect. We use direct DOM manipulation for maximum speed
    // and smoothness for a professional engineering touch.
    const dotsDivs = Array.from(globeDiv.children) as HTMLDivElement[];

    const handleMouseMove = (event: MouseEvent) => {
      const rect = globeDiv.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      dotsDivs.forEach((dot, index) => {
        const dotData = dots[index];
        const dotX = (rect.width * dotData.x / 100);
        const dotY = (rect.height * dotData.y / 100);

        const dx = mouseX - dotX;
        const dy = mouseY - dotY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Calculate a brightness/scale effect based on proximity to mouse
        const proximity = Math.max(0, 150 - dist) / 150; // max effect within 150px
        const scaleEffect = 1 + (proximity * 2); // max 3x base size
        const glowOpacity = 0.2 + (proximity * 0.8); // max fully opaque glow

        dot.style.transform = `scale(${scaleEffect})`;
        dot.style.boxShadow = `0 0 15px ${10 * proximity}px rgba(22,181,236,${glowOpacity})`;
        dot.style.opacity = `${glowOpacity}`;
      });
    };

    const handleMouseLeave = () => {
        dotsDivs.forEach((dot, index) => {
            const dotData = dots[index];
            dot.style.transform = `scale(1)`;
            dot.style.boxShadow = `0 0 5px rgba(22,181,236,0.3)`;
            dot.style.opacity = `0.3`;
          });
    };

    globeDiv.addEventListener('mousemove', handleMouseMove);
    globeDiv.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
        globeDiv.removeEventListener('mousemove', handleMouseMove);
        globeDiv.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [dots, reducedMotion]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center -z-10 bg-[#06070a]">
        {/* Globe image as seen in the image - represent it with a base and overlay nodes */}
        <div className="relative w-[120%] h-[120%] -translate-y-[10%] p-[10%]">
            <Image 
                src="[https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000](https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000)" // A suitable dark tech globe background
                alt="Global Network"
                fill
                className="object-cover opacity-5"
            />
            
            {/* Superimposed interactive nodes/dots */}
            <div ref={globeRef} className="relative w-full h-full">
                {dots.map((dot, index) => (
                    <div 
                        key={index}
                        className="absolute bg-[#16b5ec] rounded-full opacity-30 shadow-[0_0_10px_rgba(22,181,236,0.3)] transition-all duration-100 ease-linear"
                        style={{
                            left: `${dot.x}%`,
                            top: `${dot.y}%`,
                            width: `${dot.size}px`,
                            height: `${dot.size}px`,
                        }}
                    />
                ))}
            </div>
            
            {/* Background elements like the airplane and pin from image */}
            <div className="absolute top-[30%] left-[20%] text-gray-500 opacity-20">
                <PlaneTakeoff size={48} />
            </div>
            <div className="absolute top-[70%] left-[60%] text-gray-500 opacity-20">
                <MapPin size={64} />
            </div>
        </div>
    </div>
  );
}

// -- COMPONENT 3: FEATURE CARD (Bento Grid Item) --
// Dynamic component that handles visual replication and specific hover jiggles.
interface FeatureCardProps {
    title: string;
    diagram: React.ReactNode;
    content?: React.ReactNode;
    href: string;
    iconHoverAnimation?: 'shake' | 'rotate' | 'jiggle';
    gridArea?: string;
    Icon: React.ElementType; // Icon passed as component
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, diagram, content, href, Icon, iconHoverAnimation = 'rotate', gridArea }) => {
    const reducedMotion = useReducedMotion();

    const hoverVariants = {
        shake: { rotate: [0, 10, -10, 0], transition: { duration: 0.3 } },
        rotate: { rotate: [0, 45, -45, 0], transition: { duration: 0.3 } },
        jiggle: { scale: [1, 1.1, 0.9, 1], transition: { duration: 0.3 } },
    };

    return (
        <motion.div 
            className="group relative p-8 rounded-[3rem] bg-[#111216]/50 backdrop-blur-xl border border-gray-800 shadow-[inset_0_2px_4px_rgba(255,255,255,0.02)] overflow-hidden"
            style={{ gridArea }}
            whileHover={!reducedMotion ? { scale: 1.03, } : {}}
        >
            {/* Glowing neon border overlay, visible on hover */}
            <motion.div 
                className="absolute inset-0 border-2 border-transparent rounded-[3rem] shadow-[0_0_20px_4px_rgba(22,181,236,0)] z-10"
                whileHover={!reducedMotion ? {
                    borderColor: '#16b5ec',
                    boxShadow: '0 0 25px 8px rgba(22,181,236,0.6)',
                    transition: { duration: 0.2 }
                } : { borderColor: '#16b5ec' }}
            />

            <Link href={href} className="absolute inset-0 z-20"></Link>

            {/* Title and Icon shake logic */}
            <div className="relative z-30 flex items-center justify-between gap-4 mb-6">
                <h3 className="font-extrabold text-2xl tracking-tighter text-white group-hover:text-[#16b5ec] transition-colors">{title}</h3>
                <motion.div 
                    className="p-3 bg-gray-800/60 rounded-full text-[#3478f2]"
                    whileHover={!reducedMotion && iconHoverAnimation ? hoverVariants[iconHoverAnimation] : {}}
                >
                    <Icon size={20} />
                </motion.div>
            </div>

            {/* Replicated diagram content */}
            <div className="relative z-30 space-y-4 text-sm text-gray-400 font-medium leading-relaxed">
                <div className="w-full aspect-[2/1] rounded-2xl bg-[#0a0b0d] p-4 flex items-center justify-center border border-gray-800/50">
                    {diagram}
                </div>
                {content}
            </div>
            
            {/* Card corner link arrows from image */}
            <div className="absolute bottom-8 right-8 z-30 text-gray-700 opacity-50 group-hover:text-[#3478f2] group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                <ArrowRight size={24} />
            </div>
        </motion.div>
    );
};


// -- PAGE: HOMEPAGE (`app/page.tsx`) --
export default function HomePage() {
  const reducedMotion = useReducedMotion();

  const pageTransitionVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { 
        opacity: 1, 
        y: 0, 
        transition: { delay: 0.4, staggerChildren: 0.1, delayChildren: 0.6 } 
    }
  };

  // Content for features based on user input
  const features = [
    {
      title: "Unified Global Network",
      href: "/platform/network",
      Icon: Target,
      iconHoverAnimation: 'shake' as const,
      gridArea: 'network',
      diagram: (
          // Simplified replication of network diagram
          <div className="w-full h-full flex flex-col items-center justify-center text-[#16b5ec]/70 gap-3">
              <Zap size={32}/>
              <ArrowRight size={24}/>
              <Globe size={48} className="text-[#3478f2]"/>
              <div className="text-gray-600 text-xs text-center font-bold tracking-wider">SECURE DATA FLOWS</div>
          </div>
      )
    },
    {
      title: "Secure Payments",
      href: "/platform/payments",
      Icon: DollarSign,
      iconHoverAnimation: 'jiggle' as const,
      gridArea: 'payments',
      diagram: (
           // Money diagram replication
           <div className="w-full h-full flex items-center justify-center text-[#16b5ec] gap-4">
              <div className="w-16 h-16 rounded-full bg-[#16b5ec]/10 border border-[#16b5ec]/30 flex items-center justify-center">
                <DollarSign size={36}/>
              </div>
              <ArrowRight size={24} className="text-gray-700"/>
              <div className="w-16 h-16 rounded-full bg-[#3478f2]/10 border border-[#3478f2]/30 flex items-center justify-center text-[#3478f2]">
                <ShieldCheck size={36}/>
              </div>
          </div>
      )
    },
    {
      title: "Automated Compliance",
      href: "/platform/automated-compliance",
      Icon: ShieldCheck,
      iconHoverAnimation: 'rotate' as const,
      gridArea: 'compliance', // Card is column tall
      diagram: (
          // Compliance list diagram as seen in the image text
          <div className="w-full h-full flex flex-col items-center justify-center text-[#16b5ec] gap-3">
              <Server size={40}/>
              <div className="text-gray-600 text-xs font-bold tracking-wider">AI ACT AUDIT LOG</div>
              <div className="flex gap-2">
                <Database size={24}/>
