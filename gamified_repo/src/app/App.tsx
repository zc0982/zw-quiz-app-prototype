import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Book, Star, Lock, Calendar, Check, Clock, Cloud, Feather } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Data Models ---
type LevelStatus = 'completed' | 'current' | 'locked';

interface Level {
  id: string;
  index: number;
  status: LevelStatus;
  date: string;
  title: string;
  stars?: number;
}

const LEVEL_DATA: Level[] = [
  { id: 'l1', index: 0, status: 'completed', date: '4.1', title: '启程', stars: 3 },
  { id: 'l2', index: 1, status: 'completed', date: '4.2', title: '基础', stars: 2 },
  { id: 'l3', index: 2, status: 'completed', date: '4.3', title: '初见', stars: 3 },
  { id: 'l4', index: 3, status: 'completed', date: '4.4', title: '挑战', stars: 1 },
  { id: 'l5', index: 4, status: 'current', date: '今日', title: '进阶', stars: 0 },
  { id: 'l6', index: 5, status: 'locked', date: '4.6', title: '飞跃', stars: 0 },
  { id: 'l7', index: 6, status: 'locked', date: '4.7', title: '难关', stars: 0 },
  { id: 'l8', index: 7, status: 'locked', date: '4.8', title: '迷宫', stars: 0 },
  { id: 'l9', index: 8, status: 'locked', date: '4.9', title: '破晓', stars: 0 },
  { id: 'l10', index: 9, status: 'locked', date: '4.10', title: '巅峰', stars: 0 },
];

// --- Components ---

const Background = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#7dd3fc] via-[#bae6fd] to-[#e0f2fe]" />
      
      {/* Animated Clouds */}
      <motion.div 
        className="absolute top-[10%] left-[-20%] text-white/60"
        animate={{ x: ['0vw', '120vw'] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        <Cloud size={80} fill="currentColor" />
      </motion.div>
      <motion.div 
        className="absolute top-[30%] left-[-20%] text-white/50"
        animate={{ x: ['0vw', '120vw'] }}
        transition={{ duration: 55, repeat: Infinity, ease: 'linear', delay: 10 }}
      >
        <Cloud size={120} fill="currentColor" />
      </motion.div>
      <motion.div 
        className="absolute top-[70%] left-[-20%] text-white/40"
        animate={{ x: ['0vw', '120vw'] }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear', delay: 5 }}
      >
        <Cloud size={60} fill="currentColor" />
      </motion.div>
      
      {/* Birds */}
      <motion.div
        className="absolute top-[20%] left-[-10%] text-gray-700/30"
        animate={{ 
          x: ['0vw', '120vw'],
          y: [0, -20, 10, -10, 0]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        <div className="flex gap-2">
           <Feather size={16} className="-rotate-45" />
           <Feather size={12} className="-rotate-45 mt-2" />
        </div>
      </motion.div>
    </div>
  );
};

const Header = () => {
  return (
    <header className="fixed top-0 inset-x-0 z-30 pt-10 pb-4 px-6 flex justify-center pointer-events-none">
      <div className="relative w-full max-w-[340px] pointer-events-auto">
        {/* Calendar Tag hanging off the top left */}
        <div className="absolute -top-4 -left-2 z-10 bg-rose-500 text-white rounded-lg px-3 py-1.5 shadow-[0_4px_0_#be123c] flex flex-col items-center justify-center transform -rotate-6">
          <span className="text-[10px] font-bold uppercase tracking-wider mb-0.5">APR</span>
          <span className="text-sm font-black leading-none">05</span>
        </div>
        
        {/* Main Glass Card */}
        <div className="bg-white/70 backdrop-blur-xl border-2 border-white/80 rounded-[32px] p-4 shadow-[0_8px_32px_rgba(0,0,0,0.08)] flex items-center justify-between pl-12">
          <div>
            <h1 className="text-xl font-black text-gray-800 tracking-tight">2026行测每日刷题</h1>
            <p className="text-xs text-gray-600 font-medium mt-0.5 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              今日打卡任务已就绪
            </p>
          </div>
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center shadow-sm z-10" style={{ zIndex: 10 - i }}>
                <Star size={14} className="text-white fill-white" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

const FooterCTA = () => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-30 pb-8 pt-12 px-6 flex justify-center pointer-events-none bg-gradient-to-t from-white/90 via-white/40 to-transparent">
      <button className="
        pointer-events-auto
        group relative w-[80%] max-w-[320px] 
        bg-gradient-to-b from-[#3b82f6] to-[#2563eb]
        text-white font-black text-xl tracking-widest
        py-4 rounded-full
        border-b-[6px] border-[#1d4ed8]
        shadow-[0_10px_20px_rgba(37,99,235,0.4)]
        active:border-b-0 active:translate-y-[6px]
        active:shadow-[0_4px_10px_rgba(37,99,235,0.4)]
        transition-all duration-150
        overflow-hidden
      ">
        <div className="absolute inset-0 bg-white/20 scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-300 rounded-full pointer-events-none" />
        <span className="relative z-10 flex items-center justify-center gap-2">
          开始 <Check size={24} className="stroke-[3]" />
        </span>
      </button>
    </div>
  );
};

// --- Map Generator ---

const LevelNode = ({ level, x, y }: { level: Level, x: number, y: number }) => {
  const isCurrent = level.status === 'current';
  const isLocked = level.status === 'locked';
  const isCompleted = level.status === 'completed';
  
  // Colors
  const coverColor = isLocked ? "#9ca3af" : (isCurrent ? "#2563eb" : "#3b82f6");
  const coverHighlight = isLocked ? "#d1d5db" : (isCurrent ? "#3b82f6" : "#60a5fa");
  const spineColor = isLocked ? "#6b7280" : (isCurrent ? "#1d4ed8" : "#1e3a8a");
  const starColor = isLocked ? "#e5e7eb" : "#fef08a";
  
  const baseBody = isLocked ? "#e5e7eb" : (isCompleted ? "#fde68a" : "#bfdbfe");
  const baseTop = isLocked ? "#f9fafb" : (isCompleted ? "#fffbeb" : "#eff6ff");
  const baseInner = isLocked ? "#f3f4f6" : (isCompleted ? "#fef3c7" : "#dbeafe");
  
  const textColor = isLocked ? "text-gray-400" : (isCompleted ? "text-amber-700/80" : "text-blue-700/80");
  const textLabelColor = isLocked ? "text-gray-400" : (isCompleted ? "text-amber-700/60" : "text-blue-700/60");

  return (
    <div 
      className="absolute flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${x}%`, top: `${y}px`, zIndex: isCurrent ? 20 : 10 }}
    >
      <motion.div
        whileHover={!isLocked ? { scale: 1.05 } : {}}
        whileTap={!isLocked ? { scale: 0.95 } : {}}
        className="relative cursor-pointer flex flex-col items-center"
      >
        {/* Current Level Ping */}
        {isCurrent && (
          <div className="absolute top-4 w-16 h-16 bg-blue-400/30 rounded-full animate-ping z-0" />
        )}
        
        {/* Floating Book */}
        <motion.div
          animate={isCurrent ? { y: [0, -6, 0] } : {}}
          transition={isCurrent ? { repeat: Infinity, duration: 2, ease: "easeInOut" } : {}}
          className="relative z-20 -mb-6"
        >
          <svg viewBox="0 0 60 50" className="w-16 h-14 drop-shadow-md">
             {/* Pages Right face */}
             <path d="M 30 24 L 50 14 L 50 24 L 30 34 Z" fill="#f8fafc" />
             <line x1="30" y1="26" x2="50" y2="16" stroke="#e2e8f0" strokeWidth="1" />
             <line x1="30" y1="29" x2="50" y2="19" stroke="#cbd5e1" strokeWidth="1" />
             <line x1="30" y1="32" x2="50" y2="22" stroke="#94a3b8" strokeWidth="1" />
             
             {/* Spine Left face */}
             <path d="M 10 14 L 30 24 L 30 34 L 10 24 Z" fill={spineColor} />
             <line x1="12" y1="16" x2="28" y2="24" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
             
             {/* Cover Top face */}
             <path d="M 30 4 L 50 14 L 30 24 L 10 14 Z" fill={coverColor} />
             {/* Cover highlight */}
             <path d="M 30 5.5 L 48.5 14 L 30 22.5 L 11.5 14 Z" fill={coverHighlight} />
             
             {/* Star on Cover */}
             <g transform="translate(30, 14) scale(0.8, 0.48)">
                <polygon points="0,-8 2.5,-2.5 8,-2.5 3.5,1 5,7 0,4 -5,7 -3.5,1 -8,-2.5 -2.5,-2.5" fill={starColor} />
             </g>
          </svg>
        </motion.div>

        {/* Base Cylinder */}
        <div className="relative z-10">
          <svg viewBox="0 0 80 60" className="w-16 h-12 drop-shadow-lg">
             <defs>
               <linearGradient id={`cylinderShade-${level.id}`} x1="0" y1="0" x2="1" y2="0">
                 <stop offset="0%" stopColor="rgba(0,0,0,0.15)"/>
                 <stop offset="20%" stopColor="rgba(255,255,255,0.4)"/>
                 <stop offset="80%" stopColor="rgba(0,0,0,0.02)"/>
                 <stop offset="100%" stopColor="rgba(0,0,0,0.25)"/>
               </linearGradient>
             </defs>
             
             {/* Bottom Oval */}
             <ellipse cx="40" cy="44" rx="40" ry="16" fill={baseBody}/>
             <ellipse cx="40" cy="44" rx="40" ry="16" fill={`url(#cylinderShade-${level.id})`}/>
             
             {/* Body Rectangle */}
             <rect x="0" y="20" width="80" height="24" fill={baseBody}/>
             <rect x="0" y="20" width="80" height="24" fill={`url(#cylinderShade-${level.id})`}/>
             
             {/* Top Oval */}
             <ellipse cx="40" cy="20" rx="40" ry="16" fill={baseTop}/>
             <ellipse cx="40" cy="20" rx="32" ry="12" fill={baseInner}/>
          </svg>
          
          {/* Text overlay on base */}
          <div className="absolute top-[26px] left-0 right-0 text-center flex flex-col items-center justify-center z-20 pointer-events-none">
            <span className={cn("text-[11px] font-black leading-tight tracking-wider", textColor)}>
              {level.date}
            </span>
            <span className={cn("text-[9px] font-bold leading-none mt-[1px]", textLabelColor)}>
              打卡
            </span>
          </div>
        </div>
        
        {/* Floating Bubble for Current Level */}
        {isCurrent && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-blue-600 px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg border border-blue-100 z-30 flex items-center gap-1"
          >
            <span>开始学习!</span>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-r border-b border-blue-100" />
          </motion.div>
        )}
        
        {/* Cartoon Share Bubble for a specific completed level */}
        {level.index === 2 && (
          <motion.div 
            initial={{ opacity: 0.8, y: 0 }}
            animate={{ opacity: 1, y: -4 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            className="absolute -top-8 left-14 whitespace-nowrap bg-[#fffbeb] text-amber-600 px-3 py-1.5 rounded-2xl text-[10px] font-black shadow-md border-2 border-amber-200 z-30 flex items-center gap-1"
          >
            <span role="img" aria-label="party">🎉</span> 完美过关!
            <div className="absolute -bottom-1.5 left-4 w-2.5 h-2.5 bg-[#fffbeb] rotate-45 border-r-2 border-b-2 border-amber-200" />
          </motion.div>
        )}
      </motion.div>

      {/* Title Label below node */}
      {/* <div className="mt-2 text-[10px] font-bold text-gray-600/80 uppercase tracking-widest bg-white/60 px-2.5 py-0.5 rounded-full backdrop-blur-sm border border-white shadow-sm z-0">
        {level.title}
      </div> */}
    </div>
  );
};

// Decorations

const Tree = ({ x, y, scale = 1 }: { x: number, y: number, scale?: number }) => (
  <div 
    className="absolute pointer-events-none"
    style={{ left: `${x}%`, top: `${y}px`, transform: `scale(${scale})` }}
  >
    {/* Simple SVG/CSS 2.5D Tree */}
    <div className="relative w-12 h-16 flex flex-col items-center justify-end drop-shadow-md">
       <div className="absolute top-0 w-12 h-12 bg-[#22c55e] rounded-full border-[3px] border-[#166534] shadow-[inset_-4px_-4px_0_rgba(0,0,0,0.15)] z-10" />
       <div className="w-3 h-6 bg-[#92400e] border-2 border-[#713f12] rounded-sm relative z-0" />
    </div>
  </div>
);

const Island = ({ x, y, scale = 1, flip = false }: { x: number, y: number, scale?: number, flip?: boolean }) => (
  <motion.div 
    className="absolute pointer-events-none"
    style={{ left: `${x}%`, top: `${y}px`, transform: `scale(${scale}) ${flip ? 'scaleX(-1)' : ''}` }}
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
  >
    {/* 2.5D Island structure */}
    <div className="relative w-24 h-12">
       {/* Grass top */}
       <div className="absolute inset-0 bg-[#84cc16] rounded-[50%] border-4 border-[#4d7c0f] z-10" />
       {/* Dirt bottom */}
       <div className="absolute inset-0 top-3 bg-[#a16207] rounded-[50%] border-4 border-transparent border-b-[#713f12] shadow-xl" />
       {/* Small tree */}
       <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
          <div className="w-6 h-8 bg-green-500 rounded-full border-2 border-green-700 shadow-sm" />
          <div className="w-2 h-4 bg-amber-800 mx-auto -mt-1 rounded-sm" />
       </div>
    </div>
  </motion.div>
);

const FloatingClock = ({ x, y }: { x: number, y: number }) => (
  <motion.div
    className="absolute text-indigo-400 drop-shadow-md pointer-events-none"
    style={{ left: `${x}%`, top: `${y}px` }}
    animate={{ y: [0, 15, 0], rotate: [0, 10, -10, 0] }}
    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
  >
    <Clock size={32} strokeWidth={2.5} className="fill-white" />
  </motion.div>
);


const JourneyMap = () => {
  const NODE_SPACING_Y = 140; // Vertical distance between nodes
  const START_OFFSET_Y = 180; // Padding at the top
  const END_OFFSET_Y = 240; // Padding at the bottom for CTA
  
  // Generate coordinates for nodes to create an S-curve
  const nodes = useMemo(() => {
    return LEVEL_DATA.map((level, i) => {
      const phase = i * Math.PI / 2;
      const xOffset = Math.sin(phase) * 35; // 35% of width
      const x = 50 + xOffset;
      const y = START_OFFSET_Y + i * NODE_SPACING_Y;
      return { ...level, x, y };
    });
  }, []);

  const totalHeight = START_OFFSET_Y + (LEVEL_DATA.length - 1) * NODE_SPACING_Y + END_OFFSET_Y;

  // Generate the SVG Path connecting the nodes
  const pathD = useMemo(() => {
    if (nodes.length === 0) return '';
    let d = `M ${nodes[0].x} ${nodes[0].y}`;
    for (let i = 1; i < nodes.length; i++) {
      const prev = nodes[i - 1];
      const curr = nodes[i];
      // Use cubic bezier for a smooth curve
      const cp1y = prev.y + (curr.y - prev.y) / 2;
      const cp2y = curr.y - (curr.y - prev.y) / 2;
      d += ` C ${prev.x} ${cp1y}, ${curr.x} ${cp2y}, ${curr.x} ${curr.y}`;
    }
    return d;
  }, [nodes]);

  return (
    <div 
      className="relative w-full max-w-[428px] mx-auto min-h-screen" 
      style={{ height: `${totalHeight}px` }}
    >
      {/* SVG Path Background */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-lg"
        viewBox={`0 0 100 ${totalHeight}`}
        preserveAspectRatio="none"
      >
        {/* Path shadow / border */}
        <path 
          d={pathD}
          fill="none"
          stroke="#cbd5e1" // Gray border for locked path
          strokeWidth="24"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        {/* Inner locked path */}
        <path 
          d={pathD}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        
        {/* Draw completed portion of the path over the locked portion */}
        {(() => {
          const currentIdx = nodes.findIndex(n => n.status === 'current' || n.status === 'locked');
          const lastColoredIdx = currentIdx === -1 ? nodes.length - 1 : currentIdx;
          
          if (lastColoredIdx > 0) {
            let activeD = `M ${nodes[0].x} ${nodes[0].y}`;
            for (let i = 1; i <= lastColoredIdx; i++) {
              const prev = nodes[i - 1];
              const curr = nodes[i];
              const cp1y = prev.y + (curr.y - prev.y) / 2;
              const cp2y = curr.y - (curr.y - prev.y) / 2;
              activeD += ` C ${prev.x} ${cp1y}, ${curr.x} ${cp2y}, ${curr.x} ${curr.y}`;
            }
            return (
              <>
                 <path 
                  d={activeD}
                  fill="none"
                  stroke="#fbbf24" // Amber border for active
                  strokeWidth="24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
                <path 
                  d={activeD}
                  fill="none"
                  stroke="#fde68a" // Yellow inner for active
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              </>
            );
          }
          return null;
        })()}
        
        {/* Dashed line effect on top of the road to make it look like a map */}
        <path 
          d={pathD}
          fill="none"
          stroke="rgba(0,0,0,0.05)"
          strokeWidth="2"
          strokeDasharray="4 8"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Render Decorations */}
      <Island x={20} y={300} scale={0.8} />
      <Island x={80} y={600} scale={1.2} flip />
      <Island x={15} y={900} scale={0.9} />
      <Island x={85} y={1200} scale={1} flip />
      
      <Tree x={75} y={150} scale={0.8} />
      <Tree x={15} y={450} scale={1.2} />
      <Tree x={85} y={850} scale={0.9} />
      <Tree x={20} y={1150} scale={0.7} />
      <Tree x={70} y={1350} scale={1.1} />
      
      <FloatingClock x={75} y={450} />
      <FloatingClock x={25} y={1050} />

      {/* Render Nodes */}
      {nodes.map(node => (
        <LevelNode key={node.id} level={node as Level} x={node.x} y={node.y} />
      ))}
    </div>
  );
};


// --- Main App ---

export default function App() {
  return (
    <div className="bg-gray-900 min-h-screen flex justify-center overflow-hidden font-sans">
      {/* Mobile Device Simulator Container */}
      <div className="relative w-full max-w-[428px] h-full min-h-screen bg-white overflow-y-auto overflow-x-hidden shadow-2xl hide-scrollbar">
        <Background />
        
        <Header />
        
        <JourneyMap />
        
        <FooterCTA />
      </div>
      
      {/* Global styles for hiding scrollbar nicely */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
