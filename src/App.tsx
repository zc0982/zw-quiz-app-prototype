/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  ChevronDown, Bot, Search, Menu, PenLine, FileText, Files, BookOpen, FileEdit, ArrowUp,
  Minus, Plus, Pencil, Home, CheckSquare, Headphones, Smile, User, UserCircle,
  MoreHorizontal, CircleDot, ClipboardList, 
  MessageCirclePlus, Calculator, FileSearch, FileCheck, CheckCircle2, Settings, ListFilter,
  LayoutDashboard, Mic, User2, UserCircle2, Star, X, Edit2, MinusCircle,
  ChevronLeft, Pause, Target, Download, Check, RotateCcw, ChevronRight, PlusCircle, Circle, Clock, Lock, Cloud, Feather, ThumbsUp, Calendar, Share, XCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, LineChart, Line } from 'recharts';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const quickActions = [
  { id: 1, title: '每日一练', icon: PenLine, color: 'from-orange-400 to-red-400' },
  { id: 2, title: '最新时政', icon: FileText, color: 'from-green-400 to-emerald-500' },
  { id: 3, title: '历年试卷', icon: Files, color: 'from-blue-400 to-indigo-500' },
  { id: 4, title: '套题练习', icon: BookOpen, color: 'from-purple-400 to-pink-500', badge: '14套' },
  { id: 5, title: '模拟试卷', icon: FileEdit, color: 'from-yellow-400 to-orange-500', badge: '1280套' },
];

type PracticeItemType = {
  id: string;
  title: string;
  count: string;
  children?: PracticeItemType[];
};

const practiceList: PracticeItemType[] = [
  { 
    id: '1', 
    title: '政治理论', 
    count: '32/1400',
    children: [
      {
        id: '1-1',
        title: '新思想',
        count: '31/1051',
        children: [
          {
            id: '1-1-1',
            title: '新思想总论',
            count: '0/37'
          },
          {
            id: '1-1-2',
            title: '五位一体建设',
            count: '29/710',
            children: [
              { id: '1-1-2-1', title: '经济建设', count: '28/352' },
              { id: '1-1-2-2', title: '政治建设', count: '1/88' },
              { id: '1-1-2-3', title: '文化建设', count: '0/62' },
              { id: '1-1-2-4', title: '社会建设', count: '0/149' },
              { id: '1-1-2-5', title: '生态文明建设', count: '0/59' },
            ]
          }
        ]
      }
    ]
  },
  { id: '2', title: '常识判断', count: '0/7244' },
  { id: '3', title: '言语理解与表达', count: '0/10779' },
  { id: '4', title: '数量关系', count: '0/5586' },
  { id: '5', title: '判断推理', count: '0/12177' },
  { id: '6', title: '资料分析', count: '0/6632' },
];

const bottomNav = [
  { id: 1, title: '首页', icon: Home, activeIcon: Home },
  { id: 3, title: '快练', icon: CheckSquare, activeIcon: CheckSquare },
  { id: 4, title: '背诵', icon: Headphones, activeIcon: Headphones },
  { id: 5, title: '我的', icon: Smile, activeIcon: Smile },
];

const selectionTypes = [
  '公务员', '事业单位', '教师招聘',
  '教师资格证', '专升本', '公安联考',
  '医疗招聘', '三支一扶', '选调生'
];

const regionGroups = [
  { label: 'A-G', regions: ['安徽', '北京', '重庆', '福建', '贵州', '甘肃', '广西', '广东'] },
  { label: 'H-N', regions: ['湖南', '河南', '黑龙江', '河北', '湖北', '海南', '江苏', '江西', '吉林', '辽宁', '内蒙古', '宁夏'] },
  { label: 'O-U', regions: ['青海', '山东', '陕西', '上海', '四川', '山西', '天津'] },
  { label: 'W-Z', regions: ['新疆', '西藏', '云南', '浙江'] },
];

const SolarRoundAltArrowUpBold = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
    <path fill="currentColor" fillRule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10m0-12.25a.75.75 0 0 1 .53.22l3 3a.75.75 0 1 1-1.06 1.06L12 11.56l-2.47 2.47a.75.75 0 0 1-1.06-1.06l3-3a.75.75 0 0 1 .53-.22" clipRule="evenodd"/>
  </svg>
);

const SolarRoundAltArrowDownBold = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
    <path fill="currentColor" fillRule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10m3.53-12.03a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06L12 12.44l2.47-2.47a.75.75 0 0 1 1.06 0" clipRule="evenodd"/>
  </svg>
);

const SolarAltArrowRightLinear = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className}>
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m9 5l6 7l-6 7"/>
  </svg>
);

const RadixIconsDotFilled = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" className={className}>
    <path fill="currentColor" d="M7.5 5.125a2.375 2.375 0 1 1 0 4.75a2.375 2.375 0 0 1 0-4.75"/>
  </svg>
);

const PracticeListItem = ({ 
  item, 
  level = 1, 
  expandedItems, 
  toggleItem,
  onStartQuiz
}: { 
  key?: React.Key;
  item: PracticeItemType; 
  level?: number;
  expandedItems: string[];
  toggleItem: (id: string) => void;
  onStartQuiz: (type: 'normal' | 'material') => void;
}) => {
  const isExpanded = expandedItems.includes(item.id);
  const hasChildren = item.children && item.children.length > 0;
  
  const renderIcon = () => {
    if (level === 1) {
      return isExpanded ? (
        <SolarRoundAltArrowUpBold className="w-5 h-5 text-blue-500" />
      ) : (
        <SolarRoundAltArrowDownBold className="w-5 h-5 text-blue-500" />
      );
    } else if (level === 2 || level === 3) {
      if (hasChildren) {
        return isExpanded ? (
          <SolarRoundAltArrowUpBold className="w-5 h-5 text-black/20" />
        ) : (
          <SolarRoundAltArrowDownBold className="w-5 h-5 text-black/20" />
        );
      } else {
        return <MinusCircle className="w-5 h-5 text-black/20" />;
      }
    } else {
      return <RadixIconsDotFilled className="w-3 h-3 text-black/20 ml-1 mr-1" />;
    }
  };

  return (
    <div>
      <div 
        className={`flex items-center justify-between py-4 cursor-pointer ${level === 4 ? 'px-3' : 'px-5'}`} 
        onClick={() => {
          if (hasChildren) toggleItem(item.id);
          else onStartQuiz(item.title === '资料分析' ? 'material' : 'normal');
        }}
      >
        <div className="flex flex-col items-start gap-1">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center transition-all duration-200">
              {renderIcon()}
            </div>
            <span className={`text-black/90 text-[14px] ${level === 1 ? 'font-bold' : ''}`}>{item.title}</span>
          </div>
          <div className="flex items-center pl-8">
            <div className="flex items-center gap-[3px] mr-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-[20px] h-[5px] bg-[#E2EDFF] rounded-[1px] skew-x-[-20deg]"></div>
              ))}
            </div>
            <span className="text-[#9CA3AF] text-[13px] font-medium">{item.count}</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div 
            className="p-2 -mr-2 flex items-center" 
            onClick={(e) => {
              e.stopPropagation();
              onStartQuiz(item.title === '资料分析' ? 'material' : 'normal');
            }}
          >
            {level === 1 && (
              <span className="text-blue-500 text-[12px] mr-1">继续上次</span>
            )}
            <SolarAltArrowRightLinear className="w-3 h-3 text-black/20 hover:text-blue-500 transition-colors" />
          </div>
        </div>
      </div>
      
      {/* Sub-items */}
      {isExpanded && hasChildren && (
        <div className={`flex flex-col ${level === 3 ? "bg-[#eef4fe] mx-4 rounded-lg overflow-hidden" : ""}`}>
          {item.children!.map((child) => (
            <PracticeListItem 
              key={child.id} 
              item={child} 
              level={level + 1} 
              expandedItems={expandedItems} 
              toggleItem={toggleItem}
              onStartQuiz={onStartQuiz}
            />
          ))}
        </div>
      )}
    </div>
  );
};

function HomeTab({ onStartQuiz, onNavigateToPastPapers, onNavigateToFullSetPractice, onNavigateToSearch, onNavigateToCurrentAffairs, onNavigateToDailyPractice }: { onStartQuiz: (type: 'normal' | 'material') => void, onNavigateToPastPapers: () => void, onNavigateToFullSetPractice: () => void, onNavigateToSearch: () => void, onNavigateToCurrentAffairs: () => void, onNavigateToDailyPractice: () => void }) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isTypeSheetOpen, setIsTypeSheetOpen] = useState(false);
  const [isLocationSheetOpen, setIsLocationSheetOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('公务员');
  const [selectedLocation, setSelectedLocation] = useState('湖北');

  const toggleItem = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  return (
    <>
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-[320px] bg-gradient-to-b from-[#d3e5fd] to-[#eef5ff] z-0"></div>

      <div className="relative z-10">
        {/* Header */}
        <header className="px-3 h-11 flex justify-between items-center">
          <div 
            className="flex items-center bg-white rounded-full px-4 py-1.5 cursor-pointer border border-black/5 shadow-sm"
            onClick={() => setIsTypeSheetOpen(true)}
          >
            <div className="flex items-center space-x-1">
              <span className="text-black text-[15px]">{selectedType}</span>
              <ChevronDown className="w-3 h-3 text-black/60" />
            </div>
            <div className="w-[1px] h-3 bg-black/10 mx-3"></div>
            <div 
              className="flex items-center space-x-1"
              onClick={(e) => {
                e.stopPropagation();
                setIsLocationSheetOpen(true);
              }}
            >
              <span className="text-black text-[15px]">{selectedLocation}</span>
              <ChevronDown className="w-3 h-3 text-black/60" />
            </div>
          </div>
          <div className="flex items-center justify-between w-[87px] h-[32px] rounded-full border border-black/10 bg-white/60 px-2.5 backdrop-blur-sm">
            <button className="flex items-center justify-center text-black active:opacity-50 transition-opacity">
              <MoreHorizontal className="w-[18px] h-[18px]" />
            </button>
            <div className="w-[1px] h-[18px] bg-black/10"></div>
            <button className="flex items-center justify-center text-black active:opacity-50 transition-opacity">
              <CircleDot className="w-[18px] h-[18px]" />
            </button>
          </div>
        </header>

        {/* Type Selection Sheet */}
        <AnimatePresence>
          {isTypeSheetOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsTypeSheetOpen(false)}
                className="fixed inset-0 bg-black/40 z-[100] backdrop-blur-sm"
              />
              {/* Sheet */}
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[32px] z-[101] px-6 pt-8 pb-12 shadow-2xl max-h-[80vh] overflow-y-auto"
              >
                <div className="flex items-center mb-8">
                  <div className="w-1.5 h-6 bg-blue-500 rounded-full mr-3"></div>
                  <h2 className="text-[22px] font-bold text-black/90">选择类型</h2>
                </div>

                <div className="grid grid-cols-3 gap-x-4 gap-y-5">
                  {selectionTypes.map((type) => (
                    <div
                      key={type}
                      onClick={() => {
                        setSelectedType(type);
                        setIsTypeSheetOpen(false);
                      }}
                      className={`
                        h-12 flex items-center justify-center rounded-full text-[15px] font-medium transition-all duration-200
                        ${selectedType === type 
                          ? 'bg-blue-50 text-blue-600 border-2 border-blue-500 shadow-[0_4px_12px_rgba(59,130,246,0.15)]' 
                          : 'bg-gray-50 text-black/80 border-2 border-transparent active:scale-95'
                        }
                      `}
                    >
                      {type}
                    </div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Location Selection Full Screen View — portal to body to escape parent stacking context */}
        {createPortal(
          <AnimatePresence>
            {isLocationSheetOpen && (
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed inset-0 bg-white z-[9999] flex flex-col"
              >
                {/* Top Bar */}
                <div className="shrink-0 h-12 px-4 flex items-center justify-between border-b border-gray-50">
                  <button
                    onClick={() => setIsLocationSheetOpen(false)}
                    className="w-8 h-8 flex items-center justify-center -ml-2"
                    aria-label="返回"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-900" />
                  </button>
                  <h1 className="text-[17px] font-semibold text-gray-900">选择报考地区</h1>
                  <div className="w-8" />
                </div>

                {/* Main content area */}
                <div className="flex-1 overflow-y-auto px-5 pt-6 pb-6">
                  {/* Title + Illustration */}
                  <div className="relative mb-8">
                    <h2 className="text-[28px] font-bold text-gray-900 leading-tight pt-16">选择报考地区</h2>
                    <div className="absolute top-0 right-0 w-48 h-48 -mt-4 -mr-4 pointer-events-none">
                      <img
                        src="/location-pin.jpg"
                        alt="地区选择插图"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  {/* 国家 */}
                  <div className="mb-6">
                    <h3 className="text-[17px] font-bold text-gray-900 mb-4">报考地区</h3>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        onClick={() => {
                          setSelectedLocation('国家');
                          setIsLocationSheetOpen(false);
                        }}
                        className={`h-12 flex items-center justify-center rounded-xl text-[15px] font-medium border transition-all ${selectedLocation === '国家' ? 'bg-blue-50 text-blue-600 border-blue-300' : 'bg-white text-gray-800 border-gray-200'}`}
                      >
                        国家
                      </button>
                    </div>
                  </div>

                  {/* Region groups */}
                  {regionGroups.map((group) => (
                    <div key={group.label} className="mb-6">
                      <h4 className="text-[13px] font-medium text-gray-400 mb-3 tracking-wide">{group.label}</h4>
                      <div className="grid grid-cols-3 gap-3">
                        {group.regions.map((region) => (
                          <button
                            key={region}
                            onClick={() => {
                              setSelectedLocation(region);
                              setIsLocationSheetOpen(false);
                            }}
                            className={`h-12 flex items-center justify-center rounded-xl text-[15px] font-medium border transition-all ${selectedLocation === region ? 'bg-blue-50 border-blue-300 text-blue-600' : 'bg-white border-gray-200 text-gray-800'}`}
                          >
                            {region}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Button */}
                <div className="shrink-0 px-5 py-4 bg-white">
                  <button
                    onClick={() => setIsLocationSheetOpen(false)}
                    className="w-full h-14 bg-blue-500 text-white rounded-2xl font-semibold text-[17px] active:scale-[0.98] transition-transform"
                  >
                    完成 进入首页
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
        <div className="bg-white/50 backdrop-blur-md rounded-t-[32px] pt-4 mt-2 min-h-screen">
          {/* Top Tab Bar */}
          <div className="px-5 pb-2 flex justify-between items-center relative z-10">
            <div className="flex items-center space-x-6">
              <div className="relative cursor-pointer">
                <span className="text-[17px] font-bold text-black/90">行测</span>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-gradient-to-r from-blue-500 to-blue-200 rounded-full"></div>
              </div>
              <div className="cursor-pointer">
                <span className="text-[17px] font-medium text-black/30">申论</span>
              </div>
            </div>
            <div className="flex items-center space-x-5">
              <div className="flex items-center space-x-1.5 cursor-pointer" onClick={onNavigateToSearch}>
                <div className="relative flex items-center justify-center w-5 h-5">
                  <div className="absolute bottom-0.5 left-0 w-full h-2 bg-orange-100 rounded-full"></div>
                  <Search className="w-[18px] h-[18px] text-blue-500 relative z-10" strokeWidth={2.5} />
                </div>
                <span className="text-[14px] font-medium text-black/50">搜题</span>
              </div>
              <ListFilter className="w-5 h-5 text-black/90 cursor-pointer" />
            </div>
          </div>

          <main className="px-4 flex flex-col gap-5 pb-28">
          {/* Banner */}
          <section className="mt-2 relative cursor-pointer">
            <div className="w-full h-[110px] rounded-[20px] overflow-hidden shadow-[0_8px_16px_rgba(59,130,246,0.15)] bg-white flex items-center justify-center">
              <img alt="Banner" className="w-full h-full object-cover" src="https://picsum.photos/seed/study/800/400"/>
            </div>
            <div className="absolute bottom-2 right-3 bg-black/30 text-white text-[11px] px-2 py-0.5 rounded-full">1/3</div>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1.5">
              <div className="w-3 h-1.5 bg-yellow-400 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="grid grid-cols-5 gap-2 mt-2">
            {quickActions.map((action) => (
              <div 
                key={action.id} 
                className="flex flex-col items-center gap-2 relative cursor-pointer group" 
                onClick={() => {
                  if (action.title === '历年试卷') {
                    onNavigateToPastPapers();
                  } else if (action.title === '套题练习') {
                    onNavigateToFullSetPractice();
                  } else if (action.title === '最新时政') {
                    onNavigateToCurrentAffairs();
                  } else if (action.title === '每日一练') {
                    onNavigateToDailyPractice();
                  } else {
                    onStartQuiz('normal');
                  }
                }}
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-sm transition-transform group-hover:scale-105`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-black/90 text-[11px] font-medium">{action.title}</span>
                {action.badge && (
                  <div className="absolute -top-1 -right-1 bg-[#FA5151] text-white text-[9px] px-1 py-0.5 rounded-full border border-white z-10 whitespace-nowrap">
                    {action.badge}
                  </div>
                )}
              </div>
            ))}
          </section>

          {/* Practice Section */}
          <section className="mt-2 -mx-4">
            {/* Tabs */}
            <div className="flex w-full items-center justify-between px-5 mb-2">
              <div className="flex items-center">
                <div className="w-1 h-4 bg-blue-500 rounded-full mr-2"></div>
                <h2 className="text-[17px] font-bold text-black/90">专项练习</h2>
              </div>
              <div className="text-black/30 flex items-center space-x-1 cursor-pointer hover:text-black/50 transition-colors">
                <Settings className="w-3.5 h-3.5" />
                <span className="text-[14px]">设置</span>
              </div>
            </div>

            {/* Content List */}
            <div className="w-full py-1">
              {practiceList.map((item) => (
                <PracticeListItem 
                  key={item.id}
                  item={item}
                  expandedItems={expandedItems}
                  toggleItem={toggleItem}
                  onStartQuiz={onStartQuiz}
                />
              ))}
            </div>
          </section>
        </main>
        </div>
      </div>
    </>
  );
}

const GreenClipboard = () => (
  <div className="absolute -top-[17px] left-1/2 -translate-x-1/2 w-[48px] h-[56px] z-10 drop-shadow-sm -rotate-12">
    <svg viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="greenBoard" x1="0" y1="10" x2="0" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor="#bbf7d0" />
          <stop offset="1" stopColor="#86efac" />
        </linearGradient>
        <linearGradient id="greenPaper" x1="0" y1="14" x2="0" y2="47" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f0fdf4" />
          <stop offset="1" stopColor="#dcfce7" />
        </linearGradient>
        <linearGradient id="goldClip" x1="0" y1="8" x2="0" y2="14" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fde047" />
          <stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      {/* Board Bottom (Shadow/Thickness) */}
      <rect x="4" y="14" width="40" height="40" rx="8" fill="#4ade80" opacity="0.4" />
      {/* Board Top */}
      <rect x="4" y="10" width="40" height="42" rx="8" fill="url(#greenBoard)" />
      {/* Paper Bottom (Thickness) */}
      <rect x="8" y="16" width="32" height="32" rx="4" fill="#86efac" opacity="0.5" />
      {/* Paper Top */}
      <rect x="8" y="14" width="32" height="33" rx="4" fill="url(#greenPaper)" />
      {/* Clip Loop */}
      <path d="M20 6 C20 1, 28 1, 28 6 L28 10 L20 10 Z" fill="#fde68a" />
      <path d="M22 6 C22 3, 26 3, 26 6 L26 10 L22 10 Z" fill="#fffbeb" />
      {/* Clip Base */}
      <rect x="15" y="8" width="18" height="6" rx="3" fill="url(#goldClip)" />
      {/* Text */}
      <text x="24" y="36" fill="#166534" fontSize="14" fontWeight="400" textAnchor="middle" style={{fontFamily: 'sans-serif'}}>时政</text>
    </svg>
  </div>
);

const OrangeClipboard = () => (
  <div className="absolute -top-[17px] left-1/2 -translate-x-1/2 w-[48px] h-[56px] z-10 drop-shadow-sm -rotate-12">
    <svg viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="orangeBoard" x1="0" y1="10" x2="0" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fed7aa" />
          <stop offset="1" stopColor="#fdba74" />
        </linearGradient>
        <linearGradient id="orangePaper" x1="0" y1="14" x2="0" y2="47" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff7ed" />
          <stop offset="1" stopColor="#ffedd5" />
        </linearGradient>
        <linearGradient id="goldClip2" x1="0" y1="8" x2="0" y2="14" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fde047" />
          <stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      {/* Board Bottom (Shadow/Thickness) */}
      <rect x="4" y="14" width="40" height="40" rx="8" fill="#fb923c" opacity="0.4" />
      {/* Board Top */}
      <rect x="4" y="10" width="40" height="42" rx="8" fill="url(#orangeBoard)" />
      {/* Paper Bottom (Thickness) */}
      <rect x="8" y="16" width="32" height="32" rx="4" fill="#fdba74" opacity="0.5" />
      {/* Paper Top */}
      <rect x="8" y="14" width="32" height="33" rx="4" fill="url(#orangePaper)" />
      {/* Clip Loop */}
      <path d="M20 6 C20 1, 28 1, 28 6 L28 10 L20 10 Z" fill="#fde68a" />
      <path d="M22 6 C22 3, 26 3, 26 6 L26 10 L22 10 Z" fill="#fffbeb" />
      {/* Clip Base */}
      <rect x="15" y="8" width="18" height="6" rx="3" fill="url(#goldClip2)" />
      {/* Text */}
      <text x="24" y="37" fill="#c2410c" fontSize="16" fontWeight="400" textAnchor="middle" style={{fontFamily: 'sans-serif'}}>周</text>
    </svg>
  </div>
);

function QuickPracticeTab({ onStartQuiz, onNavigateToSpeedCalc, onNavigateToMaterialSpeedCalcAdvanced, onNavigateToIdiomPractice, onNavigateToVocabularyPractice, onNavigateToPublicBasicPoints }: { onStartQuiz: (type: 'normal' | 'material') => void, onNavigateToSpeedCalc: () => void, onNavigateToMaterialSpeedCalcAdvanced: () => void, onNavigateToIdiomPractice: () => void, onNavigateToVocabularyPractice: () => void, onNavigateToPublicBasicPoints: () => void }) {
  return (
    <div className="relative z-10 flex flex-col gap-5 pb-28">
      {/* Header */}
      <div className="flex items-center justify-center relative py-4">
        <span className="text-[17px] font-bold text-black/90">快练</span>
      </div>

      <main className="px-4 flex flex-col gap-6">
        {/* Section 1 */}
        <section className="bg-white rounded-2xl p-5 shadow-sm border border-blue-50">
          <div className="flex items-center mb-6">
            <div className="w-1.5 h-5 bg-blue-500 rounded-full mr-3 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
            <h2 className="text-[17px] font-bold text-black/90 tracking-tight">时政速练</h2>
          </div>
          
          <div className="flex gap-3 mt-4">
            {/* Card 1 */}
            <div 
              className="flex-1 bg-[#eefcf1] rounded-[20px] pt-7 pb-2 px-2 relative cursor-pointer hover:shadow-md transition-all group" 
              onClick={() => onStartQuiz('normal')}
            >
              <GreenClipboard />
              <div className="relative z-20 bg-white rounded-[14px] py-4 px-1 text-center shadow-[0_2px_10px_rgba(0,0,0,0.02)] h-full flex flex-col justify-center">
                <h3 className="font-black text-[rgba(0,0,0,0.9)] text-[16px] mb-1.5 tracking-wide">最新时政</h3>
                <p className="text-[12px] text-[rgba(0,0,0,0.6)] font-medium">收录错题，强化记忆</p>
              </div>
            </div>

            {/* Card 2 */}
            <div 
              className="flex-1 bg-[#fff5ed] rounded-[20px] pt-7 pb-2 px-2 relative cursor-pointer hover:shadow-md transition-all group" 
              onClick={() => onStartQuiz('normal')}
            >
              <OrangeClipboard />
              <div className="relative z-20 bg-white rounded-[14px] py-4 px-1 text-center shadow-[0_2px_10px_rgba(0,0,0,0.02)] h-full flex flex-col justify-center">
                <h3 className="font-black text-[rgba(0,0,0,0.9)] text-[16px] mb-1.5 tracking-wide">每周时政</h3>
                <p className="text-[12px] text-[rgba(0,0,0,0.6)] font-medium">每周热点，深度解析</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="bg-white rounded-2xl p-5 shadow-sm border border-blue-50">
          <div className="flex items-center mb-5">
            <div className="w-1.5 h-5 bg-blue-500 rounded-full mr-3 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
            <h2 className="text-[17px] font-bold text-black/90 tracking-tight">公考快练</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { title: '数资速算', desc: '提升计算速度', icon: MessageCirclePlus, color: 'text-purple-500', bg: 'bg-purple-50', onClick: onNavigateToSpeedCalc },
              { title: '资料速算进阶', desc: '刷题一切都简单', icon: Calculator, color: 'text-blue-500', bg: 'bg-blue-50', onClick: onNavigateToMaterialSpeedCalcAdvanced },
              { title: '资料找数', desc: '数资得分超简单', icon: FileSearch, color: 'text-red-500', bg: 'bg-red-50' },
              { title: '公基考点', desc: '考点背诵全面掌握', icon: FileCheck, color: 'text-cyan-500', bg: 'bg-cyan-50', onClick: onNavigateToPublicBasicPoints },
              { title: '言语高频成语', desc: '常考成语累积', icon: BookOpen, color: 'text-yellow-600', bg: 'bg-yellow-50', onClick: onNavigateToIdiomPractice },
              { title: '言语高频实词', desc: '常考��词累积', icon: ClipboardList, color: 'text-emerald-500', bg: 'bg-emerald-50', onClick: onNavigateToVocabularyPractice },
            ].map((item, i) => (
              <div key={i} className="bg-[#F6F6F6] rounded-2xl p-5 flex flex-col items-center text-center cursor-pointer hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-blue-100 group" onClick={item.onClick}>
                <div className={`w-14 h-14 rounded-full ${item.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-7 h-7 ${item.color}`} />
                </div>
                <h3 className="font-bold text-[rgba(0,0,0,0.9)] text-[16px] mb-1">{item.title}</h3>
                <p className="text-[12px] text-[rgba(0,0,0,0.6)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function RecitationTab() {
  const categories = [
    { id: 1, title: '政治理论', icon: LayoutDashboard, color: 'bg-blue-50', iconColor: 'text-blue-500' },
    { id: 2, title: '法律常识', icon: FileCheck, color: 'bg-orange-50', iconColor: 'text-orange-500' },
    { id: 3, title: '经济常识', icon: Calculator, color: 'bg-green-50', iconColor: 'text-green-500' },
    { id: 4, title: '历史文化', icon: BookOpen, color: 'bg-purple-50', iconColor: 'text-purple-500' },
  ];

  return (
    <div className="relative z-10 flex flex-col gap-5 pb-28">
      {/* Header */}
      <div className="flex items-center justify-center relative h-11 px-3">
        <span className="text-[17px] font-bold text-black/90">背诵</span>
        <div className="absolute right-3 flex items-center justify-between w-[87px] h-[32px] rounded-full border border-black/10 bg-white/60 px-2.5">
          <button className="flex items-center justify-center text-black active:opacity-50 transition-opacity">
            <MoreHorizontal className="w-[18px] h-[18px]" />
          </button>
          <div className="w-[1px] h-[18px] bg-black/10"></div>
          <button className="flex items-center justify-center text-black active:opacity-50 transition-opacity">
            <CircleDot className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>

      <main className="px-4 flex flex-col gap-6">
        {/* Search Bar */}
        <div className="bg-white rounded-2xl p-4 flex items-center space-x-4 shadow-sm border border-blue-50">
          <Search className="w-5 h-5 text-blue-400" />
          <input type="text" placeholder="搜索考点、成语、实词" className="bg-transparent outline-none text-[14px] w-full text-black/90 placeholder:text-black/30" />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 gap-4">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-white rounded-2xl p-5 flex flex-col gap-4 cursor-pointer shadow-sm border border-blue-50 hover:shadow-md transition-all group">
              <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center ${cat.iconColor} group-hover:scale-110 transition-transform`}>
                <cat.icon className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-black/90 text-[14px]">{cat.title}</h3>
                <p className="text-[11px] text-black/30 mt-1">点击进入背诵模式</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Recitation */}
        <section className="bg-white rounded-2xl p-5 shadow-sm border border-blue-50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-1.5 h-5 bg-blue-500 rounded-full mr-3 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
              <h2 className="text-[17px] font-bold text-black/90 tracking-tight">最近背诵</h2>
            </div>
            <span className="text-[14px] text-blue-500 font-bold cursor-pointer hover:underline">查看全部</span>
          </div>

          <div className="flex flex-col gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-transparent hover:border-blue-100 transition-all cursor-pointer group">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                    <Mic className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-black/90">言语高频成语 {i}</h4>
                    <p className="text-[11px] text-black/30 mt-1">已背诵 45/120</p>
                  </div>
                </div>
                <div className="w-12 h-12 relative">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path className="text-gray-200" strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                    <path className="text-blue-500" strokeDasharray="37, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-blue-600">37%</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function LoginPage({ onLogin, onSkip }: { onLogin: () => void, onSkip: () => void }) {
  const [agreed, setAgreed] = useState(false);

  const handleLoginClick = () => {
    if (!agreed) {
      alert('请先阅读并同意用户协议和隐私政策');
      return;
    }
    onLogin();
  };

  return (
    <div className="absolute inset-0 bg-white z-[100] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="h-11 flex items-center justify-between px-3 shrink-0 bg-white sticky top-0 z-10">
        <button onClick={onSkip} className="p-2 -ml-2 text-gray-900">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center justify-between w-[87px] h-[32px] rounded-full border border-black/10 bg-white px-2.5">
          <button className="flex items-center justify-center text-black active:opacity-50 transition-opacity">
            <MoreHorizontal className="w-[18px] h-[18px]" />
          </button>
          <div className="w-[1px] h-[18px] bg-black/10"></div>
          <button className="flex items-center justify-center text-black active:opacity-50 transition-opacity">
            <CircleDot className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center px-6 pt-6 pb-12 overflow-y-auto hide-scrollbar">
        {/* Main Title */}
        <h1 className="text-[32px] font-bold text-[#3b82f6] tracking-wider mb-6">公考刷题</h1>

        {/* Title Section */}
        <div className="flex flex-col items-center gap-2 mb-10">
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-1.5 text-[16px] font-medium text-gray-800">
              <Check className="w-5 h-5 text-blue-600 stroke-[3]" />
              <span>考试成绩</span>
            </div>
            <div className="flex items-center gap-1.5 text-[16px] font-medium text-gray-800">
              <Check className="w-5 h-5 text-blue-600 stroke-[3]" />
              <span>学习排行</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-1.5 text-[16px] font-medium text-gray-800">
              <Check className="w-5 h-5 text-blue-600 stroke-[3]" />
              <span>错题分析</span>
            </div>
          </div>
        </div>

        {/* Illustration */}
        <div className="w-full max-w-[320px] aspect-[4/3] mb-12 relative flex items-center justify-center">
          {/* New SVG Illustration */}
          <svg viewBox="0 0 400 300" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Background elements */}
            {/* Bar chart left */}
            <path d="M70 180 L85 170 L85 200 L70 210 Z" fill="#60a5fa" />
            <path d="M90 160 L105 150 L105 200 L90 210 Z" fill="#3b82f6" />
            <path d="M110 140 L125 130 L125 200 L110 210 Z" fill="#2563eb" />
            
            {/* Bar chart right back */}
            <path d="M250 120 L265 110 L265 150 L250 160 Z" fill="#60a5fa" />
            <path d="M270 100 L285 90 L285 150 L270 160 Z" fill="#3b82f6" />

            {/* Lightbulb left */}
            <path d="M110 120 C110 110, 120 100, 130 100 C140 100, 150 110, 150 120 C150 125, 145 130, 140 135 L140 145 L120 145 L120 135 C115 130, 110 125, 110 120 Z" fill="#fcd34d" />
            <path d="M125 145 L135 145 L130 150 Z" fill="#f59e0b" />
            
            {/* Lightbulb right */}
            <path d="M310 160 C310 150, 320 140, 330 140 C340 140, 350 150, 350 160 C350 165, 345 170, 340 175 L340 185 L320 185 L320 175 C315 170, 310 165, 310 160 Z" fill="#fcd34d" />
            <path d="M325 185 L335 185 L330 190 Z" fill="#f59e0b" />

            {/* Graduation Cap */}
            <path d="M280 80 L340 60 L400 80 L340 100 Z" fill="#1e3a8a" />
            <path d="M300 90 L300 110 C300 120, 380 120, 380 110 L380 90 Z" fill="#1e40af" />
            <path d="M380 80 L380 120" stroke="#fcd34d" strokeWidth="3" />
            <circle cx="380" cy="125" r="5" fill="#fcd34d" />

            {/* Book left */}
            <path d="M50 100 L100 80 L140 100 L90 120 Z" fill="#e0f2fe" />
            <path d="M50 100 L50 120 L90 140 L90 120 Z" fill="#bae6fd" />
            <path d="M90 140 L140 120 L140 100 L90 120 Z" fill="#7dd3fc" />
            <path d="M60 105 L90 90 M65 110 L95 95 M70 115 L100 100" stroke="#38bdf8" strokeWidth="2" />

            {/* Phone Base Isometric */}
            <path d="M150 250 L350 150 L300 110 L100 210 Z" fill="#1e3a8a" stroke="#1e3a8a" strokeWidth="2" strokeLinejoin="round" />
            <path d="M150 250 L150 265 L350 165 L350 150 Z" fill="#1e40af" stroke="#1e40af" strokeWidth="2" strokeLinejoin="round" />
            <path d="M100 210 L100 225 L150 265 L150 250 Z" fill="#2563eb" stroke="#2563eb" strokeWidth="2" strokeLinejoin="round" />
            
            {/* Phone Screen */}
            <path d="M155 240 L340 148 L295 115 L110 205 Z" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="2" strokeLinejoin="round" />
            
            {/* Screen Elements */}
            {/* Open Book on Screen */}
            <path d="M180 190 L240 160 L280 180 L220 210 Z" fill="#ffffff" />
            <path d="M240 160 L280 180 L280 190 L240 170 Z" fill="#e2e8f0" />
            <path d="M180 190 L220 210 L220 220 L180 200 Z" fill="#cbd5e1" />
            <path d="M220 210 L240 160" stroke="#94a3b8" strokeWidth="2" />
            <path d="M190 190 L215 175 M195 195 L215 185 M245 170 L270 185 M240 175 L265 190" stroke="#cbd5e1" strokeWidth="2" />

            {/* UI Blocks on Screen */}
            <path d="M130 190 L160 175 L175 185 L145 200 Z" fill="#bfdbfe" />
            <path d="M140 210 L190 185 L205 195 L155 220 Z" fill="#93c5fd" />
            <path d="M260 140 L280 130 L295 140 L275 150 Z" fill="#60a5fa" />
            <path d="M285 125 L305 115 L320 125 L300 135 Z" fill="#3b82f6" />
            
            {/* Magnifying Glass */}
            <circle cx="260" cy="240" r="20" fill="none" stroke="#2563eb" strokeWidth="6" />
            <circle cx="260" cy="240" r="15" fill="#bfdbfe" opacity="0.5" />
            <path d="M245 255 L220 270" stroke="#2563eb" strokeWidth="8" strokeLinecap="round" />
          </svg>
        </div>

        {/* Login Button */}
        <button 
          onClick={handleLoginClick}
          className="w-full py-3.5 bg-[#3b82f6] text-white text-[17px] font-medium rounded-full active:bg-blue-600 transition-colors mb-6"
        >
          手机号一键登录
        </button>

        {/* Agreement */}
        <div className="flex items-center justify-center gap-2">
          <button 
            onClick={() => setAgreed(!agreed)}
            className={`w-4 h-4 rounded-[4px] flex items-center justify-center border transition-colors ${agreed ? 'bg-blue-600 border-blue-600' : 'border-gray-400 bg-white'}`}
          >
            {agreed && <Check className="w-3 h-3 text-white stroke-[3]" />}
          </button>
          <span className="text-[13px] text-gray-500">
            我已阅读并同意 <span className="text-gray-500">用户协议和隐私政策</span>
          </span>
        </div>

        {/* Skip Login */}
        <div className="mt-auto pt-8">
          <button 
            onClick={onSkip}
            className="text-[15px] text-blue-600 font-medium active:opacity-70 transition-opacity"
          >
            先逛逛
          </button>
        </div>
      </div>
    </div>
  );
}

function PersonalInfoPage({ onBack, onLogout }: { onBack: () => void, onLogout: () => void }) {
  return (
    <div className="absolute inset-0 bg-[#F7F8FA] z-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="h-11 flex items-center justify-between px-3 shrink-0 bg-white sticky top-0 z-10 border-b border-gray-100">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-900">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-[17px] font-bold text-gray-900">个人信息</h1>
        <div className="flex items-center justify-between w-[87px] h-[32px] rounded-full border border-black/10 bg-white px-2.5">
          <button className="flex items-center justify-center text-black active:opacity-50 transition-opacity">
            <MoreHorizontal className="w-[18px] h-[18px]" />
          </button>
          <div className="w-[1px] h-[18px] bg-black/10"></div>
          <button className="flex items-center justify-center text-black active:opacity-50 transition-opacity">
            <CircleDot className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="bg-white px-4">
          {/* Avatar */}
          <div className="flex items-center justify-between py-4 border-b border-gray-50 active:bg-gray-50 cursor-pointer transition-colors">
            <span className="text-[16px] text-gray-900 font-medium">头像</span>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
                <img src="https://picsum.photos/seed/avatar/200" alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300" />
            </div>
          </div>

          {/* Nickname */}
          <div className="flex items-center justify-between py-4 border-b border-gray-50 active:bg-gray-50 cursor-pointer transition-colors">
            <span className="text-[16px] text-gray-900 font-medium">昵称</span>
            <div className="flex items-center space-x-2">
              <span className="text-[15px] text-gray-600">用户_s73e55itg</span>
              <ChevronRight className="w-4 h-4 text-gray-300" />
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center justify-between py-4 border-b border-gray-50 active:bg-gray-50 cursor-pointer transition-colors">
            <span className="text-[16px] text-gray-900 font-medium">更换手机号</span>
            <div className="flex items-center space-x-2">
              <span className="text-[15px] text-gray-600">180****5971</span>
              <ChevronRight className="w-4 h-4 text-gray-300" />
            </div>
          </div>

          {/* Version */}
          <div className="flex items-center justify-between py-4 active:bg-gray-50 cursor-pointer transition-colors">
            <span className="text-[16px] text-gray-900 font-medium">版本更新</span>
            <div className="flex items-center space-x-2">
              <span className="text-[15px] text-gray-600">1.0.442</span>
              <ChevronRight className="w-4 h-4 text-gray-300" />
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="px-4 mt-8">
          <button 
            onClick={onLogout}
            className="w-full py-3.5 bg-white border border-gray-200 rounded-xl text-[16px] text-gray-800 font-medium active:bg-gray-50 transition-colors"
          >
            退出登录
          </button>
        </div>
      </div>
    </div>
  );
}

function PracticeRecordsPage({ onBack }: { onBack: () => void }) {
  const records = [
    { id: 1, title: '行测自测4.7', time: '2026-04-07 09:43:09', count: '15道', status: '未完成', statusColor: 'text-red-500' },
    { id: 2, title: '专项智能练习-(常识判断)-1', time: '2026-04-03 09:49:49', count: '0分', status: '练习报告', statusColor: 'text-blue-500' },
    { id: 3, title: '行测自测1.1', time: '2026-04-03 07:42:33', count: '8分', status: '练习报告', statusColor: 'text-blue-500' },
    { id: 4, title: '行测自测4.2', time: '2026-04-02 16:32:37', count: '15道', status: '未完成', statusColor: 'text-red-500' },
    { id: 5, title: '2025年《求是》专栏', time: '2026-04-02 16:32:03', count: '95道', status: '未完成', statusColor: 'text-red-500' },
    { id: 6, title: '专项智能练习-(政治理论)-1', time: '2026-04-01 09:14:14', count: '0分', status: '练习报告', statusColor: 'text-blue-500' },
    { id: 7, title: '专项智能练习-(政治理论)-1', time: '2026-04-01 09:10:00', count: '0分', status: '练习报告', statusColor: 'text-blue-500' },
  ];

  return (
    <div className="absolute inset-0 bg-[#F7F8FA] z-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="h-11 flex items-center justify-between px-3 shrink-0 bg-white sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-900">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-[17px] font-bold text-gray-900">练习记录</h1>
        <div className="flex items-center justify-between w-[87px] h-[32px] rounded-full border border-black/10 bg-white px-2.5">
          <button className="flex items-center justify-center text-black active:opacity-50 transition-opacity">
            <MoreHorizontal className="w-[18px] h-[18px]" />
          </button>
          <div className="w-[1px] h-[18px] bg-black/10"></div>
          <button className="flex items-center justify-center text-black active:opacity-50 transition-opacity">
            <CircleDot className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex bg-white h-12 items-center px-4 border-b border-gray-100 shrink-0">
        <div className="flex-1 flex justify-center items-center">
          <span className="text-[14px] text-gray-700 mr-1">类型不限</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
        <div className="flex-1 flex justify-center items-center">
          <span className="text-[14px] text-gray-700 mr-1">时间不限</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto hide-scrollbar p-4 space-y-3">
        {records.map((record) => (
          <div key={record.id} className="bg-white rounded-2xl p-4 shadow-sm active:opacity-70 transition-opacity cursor-pointer">
            <h3 className="text-[16px] font-bold text-gray-900 mb-3">{record.title}</h3>
            <div className="flex justify-between items-center">
              <div className="flex items-center text-[12px] text-gray-400">
                <Clock className="w-3.5 h-3.5 mr-1.5" />
                <span>{record.time}</span>
                <span className="ml-2">{record.count}</span>
              </div>
              <span className={`text-[13px] ${record.statusColor}`}>{record.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LearningReportPage({ onBack }: { onBack: () => void }) {
  const barData = [
    { name: '资料分析', thisWeek: 0, lastWeek: 0 },
    { name: '言语理解\n与表达', thisWeek: 0, lastWeek: 0 },
    { name: '数量关系', thisWeek: 18, lastWeek: 0 },
    { name: '政治理论', thisWeek: 10, lastWeek: 0 },
    { name: '常识判断', thisWeek: 1, lastWeek: 0 },
    { name: '判断推理', thisWeek: 0, lastWeek: 0 },
  ];

  const radarData = [
    { subject: '资料分析', myMastery: 20, avgMastery: 100, fullMark: 100 },
    { subject: '判断推理', myMastery: 20, avgMastery: 100, fullMark: 100 },
    { subject: '常识判断', myMastery: 20, avgMastery: 100, fullMark: 100 },
    { subject: '政治理论', myMastery: 20, avgMastery: 100, fullMark: 100 },
    { subject: '数量关系', myMastery: 50, avgMastery: 100, fullMark: 100 },
    { subject: '言语理解与表...', myMastery: 20, avgMastery: 100, fullMark: 100 },
  ];

  const lineData = [
    { name: '1', myAccuracy: 0, avgAccuracy: 89 },
    { name: '2', myAccuracy: 0, avgAccuracy: 89 },
    { name: '3', myAccuracy: 0, avgAccuracy: 89 },
    { name: '4', myAccuracy: 0, avgAccuracy: 89 },
  ];

  return (
    <div className="absolute inset-0 bg-[#F0F5FA] z-50 flex flex-col overflow-y-auto hide-scrollbar">
      {/* Header */}
      <div className="h-11 flex items-center justify-between px-3 shrink-0 sticky top-0 z-10 bg-[#F0F5FA]/90 backdrop-blur-sm">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-900">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-[17px] font-bold text-gray-900">学习报告</h1>
        <div className="flex items-center justify-between w-[87px] h-[32px] rounded-full border border-black/10 bg-white/60 px-2.5">
          <button className="flex items-center justify-center text-black active:opacity-50 transition-opacity">
            <MoreHorizontal className="w-[18px] h-[18px]" />
          </button>
          <div className="w-[1px] h-[18px] bg-black/10"></div>
          <button className="flex items-center justify-center text-black active:opacity-50 transition-opacity">
            <CircleDot className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>

      <div className="px-4 pb-8 space-y-6">
        {/* Filters */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center bg-white rounded-full px-3 py-1.5 shadow-sm border border-gray-100">
            <span className="text-[14px] text-gray-800 font-medium mr-1">行测</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
          <div className="flex items-center bg-white/60 rounded-full px-3 py-1.5 border border-blue-100">
            <Calendar className="w-4 h-4 text-gray-500 mr-1.5" />
            <span className="text-[13px] text-gray-600">03/08-04/07</span>
          </div>
        </div>

        {/* User Summary Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-white/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full opacity-50"></div>
          <h2 className="text-[20px] font-bold text-gray-900 relative z-10">用户_s73e55itg</h2>
          <p className="text-[12px] text-gray-400 mt-1 relative z-10">你留下的每一个脚印都是勋章，它们将带你走向辉煌</p>
          
          <div className="bg-[#E6F0FA] rounded-xl p-4 mt-4 flex justify-between items-center relative z-10">
            <div className="text-center flex-1">
              <div className="text-[12px] text-gray-500 mb-1">总做题数</div>
              <div className="text-[20px] font-bold text-gray-800">31</div>
            </div>
            <div className="text-center flex-1">
              <div className="text-[12px] text-gray-500 mb-1">错题数</div>
              <div className="text-[20px] font-bold text-gray-800">23</div>
            </div>
            <div className="text-center flex-1">
              <div className="text-[12px] text-gray-500 mb-1">正确率</div>
              <div className="text-[20px] font-bold text-gray-800">26%</div>
            </div>
            <div className="text-center flex-1">
              <div className="text-[12px] text-gray-500 mb-1">平均正确率</div>
              <div className="text-[20px] font-bold text-gray-800">86%</div>
            </div>
          </div>
        </div>

        {/* Learning Comparison */}
        <div className="bg-white rounded-2xl p-5 shadow-sm relative pt-8">
          <div className="absolute -top-3 -left-2 bg-gradient-to-r from-blue-400 to-blue-500 text-white px-4 py-1.5 rounded-br-2xl rounded-tr-md rounded-bl-md rounded-tl-2xl font-bold text-[15px] shadow-md">
            学习对比
          </div>
          
          <p className="text-[12px] text-gray-500 mb-4">你的努力看得见！继续保持，成功就在前方！</p>
          
          <div className="flex justify-end items-center space-x-4 mb-4">
            <div className="flex items-center">
              <div className="w-4 h-2.5 bg-blue-500 rounded-sm mr-1.5"></div>
              <span className="text-[12px] text-gray-600">本周</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-2.5 bg-blue-100 rounded-sm mr-1.5"></div>
              <span className="text-[12px] text-gray-600">上周</span>
            </div>
          </div>

          <div className="h-[200px] w-full -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 5, right: 5, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#999' }} 
                  interval={0}
                  tickFormatter={(value) => value.length > 4 ? value.substring(0, 4) + '\n' + value.substring(4) : value}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#999' }} 
                  ticks={[0, 3, 6, 9, 12, 15, 18]}
                  tickFormatter={(value) => value === 18 ? '18道' : value}
                />
                <Bar dataKey="thisWeek" fill="#3B82F6" radius={[2, 2, 0, 0]} barSize={8} />
                <Bar dataKey="lastWeek" fill="#DBEAFE" radius={[2, 2, 0, 0]} barSize={8} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Knowledge Mastery */}
        <div className="bg-white rounded-2xl p-5 shadow-sm relative pt-8">
          <div className="absolute -top-3 -left-2 bg-gradient-to-r from-blue-400 to-blue-500 text-white px-4 py-1.5 rounded-br-2xl rounded-tr-md rounded-bl-md rounded-tl-2xl font-bold text-[15px] shadow-md">
            知识点掌握情况
          </div>

          <div className="flex justify-end mb-6 mt-2">
            <div className="bg-orange-50 rounded-full p-1 flex">
              <div className="bg-orange-400 text-white text-[12px] px-3 py-1 rounded-full font-medium">综合分析</div>
              <div className="text-orange-400 text-[12px] px-3 py-1 rounded-full font-medium">单次测评分析</div>
            </div>
          </div>

          <div className="flex justify-end items-center space-x-4 mb-2 flex-col items-end gap-2">
            <div className="flex items-center">
              <div className="w-4 h-2.5 bg-blue-500 rounded-sm mr-1.5"></div>
              <span className="text-[12px] text-gray-600">我的掌握度</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-2.5 bg-blue-100 rounded-sm mr-1.5"></div>
              <span className="text-[12px] text-gray-600">平均掌握度</span>
            </div>
          </div>

          <div className="h-[250px] w-full mt-[-20px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 10 }} />
                <Radar name="平均掌握度" dataKey="avgMastery" stroke="#DBEAFE" fill="#DBEAFE" fillOpacity={0.5} />
                <Radar name="我的掌握度" dataKey="myMastery" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.8} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Weak Knowledge Points */}
          <div className="mt-6">
            <div className="flex text-[12px] text-gray-500 mb-3 px-2">
              <div className="flex-1 text-gray-800 font-bold text-[14px]">薄弱知识点</div>
              <div className="w-12 text-center">练习数</div>
              <div className="w-12 text-center">错题数</div>
              <div className="w-12 text-center">正确率</div>
              <div className="w-16 text-center">平均正确率</div>
            </div>
            
            <div className="bg-[#F8FAFC] rounded-xl p-3 flex items-center text-[13px]">
              <div className="flex-1 flex items-center">
                <MinusCircle className="w-4 h-4 text-gray-300 mr-2" />
                <span className="text-gray-800">资料分析</span>
              </div>
              <div className="w-12 text-center text-gray-800">0</div>
              <div className="w-12 text-center text-gray-800">0</div>
              <div className="w-12 text-center text-gray-800">0%</div>
              <div className="w-16 text-center text-gray-800">89%</div>
            </div>
          </div>

          {/* Trend Chart */}
          <div className="mt-8">
            <div className="flex items-center justify-center mb-2">
              <Feather className="w-4 h-4 text-blue-300 mr-2 transform -scale-x-100" />
              <h3 className="text-[14px] font-bold text-gray-800">资料分析正确率变化趋势</h3>
              <Feather className="w-4 h-4 text-blue-300 ml-2" />
            </div>
            <p className="text-[11px] text-gray-400 text-center mb-6">本折线图展示了选中知识点的历次考试的正确率变化情况</p>

            <div className="flex justify-end items-center space-x-4 mb-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full border-2 border-blue-500 bg-white mr-1.5 relative">
                  <div className="absolute inset-[-4px] border-t-2 border-blue-500 top-1/2 -translate-y-1/2 w-5 -left-1 -z-10"></div>
                </div>
                <span className="text-[12px] text-gray-600">我的正确率</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full border-2 border-blue-200 bg-white mr-1.5 relative">
                  <div className="absolute inset-[-4px] border-t-2 border-blue-200 top-1/2 -translate-y-1/2 w-5 -left-1 -z-10"></div>
                </div>
                <span className="text-[12px] text-gray-600">平均正确率</span>
              </div>
            </div>

            <div className="h-[200px] w-full -ml-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" hide />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#999' }} 
                    ticks={[0, 20, 40, 60, 80, 100]}
                    tickFormatter={(value) => value === 100 ? '100%' : value}
                  />
                  <Line type="monotone" dataKey="myAccuracy" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4, fill: 'white', stroke: '#3B82F6', strokeWidth: 2 }} />
                  <Line type="monotone" dataKey="avgAccuracy" stroke="#DBEAFE" strokeWidth={2} dot={{ r: 4, fill: 'white', stroke: '#DBEAFE', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MyCollectionsPage({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<'questions' | 'papers'>('questions');

  return (
    <div className="absolute inset-0 bg-[#F7F7F7] z-50 flex flex-col">
      {/* Header */}
      <div className="h-11 flex items-center justify-between px-3 bg-white border-b border-gray-100">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-900">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-[17px] font-bold text-gray-900">我的收藏</h1>
        <div className="flex items-center space-x-3">
          <MoreHorizontal className="w-6 h-6 text-gray-900" />
          <CircleDot className="w-6 h-6 text-gray-900" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white px-6 py-2 border-b border-gray-100">
        <div 
          className={`flex-1 text-center py-2 cursor-pointer ${activeTab === 'questions' ? 'text-blue-600 font-bold' : 'text-gray-500'}`}
          onClick={() => setActiveTab('questions')}
        >
          我的试题
          {activeTab === 'questions' && <div className="h-1 bg-blue-600 rounded-full w-8 mx-auto mt-1"></div>}
        </div>
        <div 
          className={`flex-1 text-center py-2 cursor-pointer ${activeTab === 'papers' ? 'text-blue-600 font-bold' : 'text-gray-500'}`}
          onClick={() => setActiveTab('papers')}
        >
          我的试卷
          {activeTab === 'papers' && <div className="h-1 bg-blue-600 rounded-full w-8 mx-auto mt-1"></div>}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        <div className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-3">
            <MinusCircle className="w-6 h-6 text-blue-500" />
            <span className="text-[16px] font-medium text-gray-900">其他</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-gray-400 text-[14px]">1</span>
            <Pencil className="w-5 h-5 text-blue-400" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 bg-white border-t border-gray-100">
        <button className="w-full h-12 bg-blue-600 text-white rounded-full font-bold text-[16px]">
          导出试题
        </button>
      </div>
    </div>
  );
}

function MyHomeworkPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="absolute inset-0 bg-[#F7F8FA] z-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="h-11 flex items-center justify-between px-3 shrink-0 bg-white sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-900">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-[17px] font-bold text-gray-900">我的作业</h1>
        <div className="flex items-center justify-between w-[87px] h-[32px] rounded-full border border-black/10 bg-white px-2.5">
          <button className="flex items-center justify-center text-black active:opacity-50 transition-opacity">
            <MoreHorizontal className="w-[18px] h-[18px]" />
          </button>
          <div className="w-[1px] h-[18px] bg-black/10"></div>
          <button className="flex items-center justify-center text-black active:opacity-50 transition-opacity">
            <CircleDot className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white px-4 py-3 flex items-center justify-around shrink-0">
        <button className="flex items-center text-gray-600 text-[14px]">
          <span>类型不限</span>
          <ChevronDown className="w-4 h-4 ml-1 text-gray-300" />
        </button>
        <button className="flex items-center text-gray-600 text-[14px]">
          <span>时间不限</span>
          <ChevronDown className="w-4 h-4 ml-1 text-gray-300" />
        </button>
      </div>

      {/* Empty State Content */}
      <div className="flex-1 flex flex-col items-center justify-center pb-32">
        <div className="w-48 h-48 mb-2 flex items-center justify-center relative">
          {/* Using a composed icon as a placeholder for the illustration */}
          <div className="relative flex items-center justify-center w-32 h-32 bg-blue-50 rounded-full">
            <FileText className="w-16 h-16 text-blue-200" strokeWidth={1.5} />
            <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-sm">
              <Search className="w-8 h-8 text-blue-400" strokeWidth={2} />
            </div>
            {/* Decorative elements */}
            <div className="absolute top-4 left-2 w-3 h-3 bg-yellow-200 rounded-full opacity-60"></div>
            <div className="absolute top-8 right-4 w-4 h-4 bg-teal-200 rounded-full opacity-60"></div>
            <div className="absolute bottom-6 left-4 w-2 h-2 bg-blue-300 rounded-full opacity-60"></div>
          </div>
        </div>
        <p className="text-[15px] text-gray-500 mb-2">暂无作业记录</p>
        <p className="text-[13px] text-gray-400 mb-10">快去开启你的学习之旅吧</p>
        
        <button className="bg-[#3B71E8] text-white text-[15px] font-medium px-14 py-2.5 rounded-lg active:bg-blue-600 transition-colors">
          学习课程
        </button>
      </div>
    </div>
  );
}

function MyMockExamsPage({ onBack }: { onBack: () => void }) {
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  return (
    <div className="absolute inset-0 bg-[#F7F8FA] z-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="h-11 flex items-center justify-between px-3 shrink-0 bg-white sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-900">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-[17px] font-bold text-gray-900">我的模考</h1>
        <div className="flex items-center justify-between w-[87px] h-[32px] rounded-full border border-black/10 bg-white px-2.5">
          <button className="flex items-center justify-center text-black active:opacity-50 transition-opacity">
            <MoreHorizontal className="w-[18px] h-[18px]" />
          </button>
          <div className="w-[1px] h-[18px] bg-black/10"></div>
          <button className="flex items-center justify-center text-black active:opacity-50 transition-opacity">
            <CircleDot className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          {/* Card Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="relative">
              <div className="absolute bottom-0 left-0 w-full h-3 bg-orange-100/80 -z-10"></div>
              <h2 className="text-[17px] font-bold text-gray-900 leading-tight">内蒙古统招专升本第二轮全区模考</h2>
            </div>
            <button className="flex items-center text-blue-500 text-[13px] ml-4 shrink-0 active:opacity-70 transition-opacity">
              <span className="mr-1">分享</span>
              <Share className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Inner Card */}
          <div className="bg-[#F8F9FB] rounded-xl p-4">
            <div className="flex items-center mb-3">
              <div className="w-1 h-3.5 bg-blue-500 rounded-full mr-2 shrink-0"></div>
              <h3 className="text-[15px] font-bold text-gray-900 truncate">内蒙古统招专升本第二轮全区模考大赛</h3>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center text-[12px] text-gray-400">
                <Clock className="w-3.5 h-3.5 mr-1" />
                <span>06-01 00:00:00-00:00:00</span>
              </div>
              <button className="flex items-center text-blue-500 text-[13px] active:opacity-70 transition-opacity">
                <Share className="w-3.5 h-3.5 mr-1" />
                <span>分享</span>
              </button>
            </div>

            <button 
              onClick={() => setShowPasswordModal(true)}
              className="w-full h-11 bg-[#3B82F6] text-white rounded-xl font-medium text-[16px] active:opacity-80 transition-opacity"
            >
              立即开始
            </button>
          </div>
        </div>
      </div>

      {/* Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-8"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-sm p-6 relative"
            >
              <button 
                onClick={() => setShowPasswordModal(false)}
                className="absolute top-4 right-4 p-1 text-gray-400 active:opacity-50 transition-opacity"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="mt-8 mb-6 flex items-center border-b border-gray-100 pb-2">
                <span className="text-[16px] text-gray-900 w-16">口令</span>
                <input 
                  type="text" 
                  placeholder="请填写口令" 
                  className="flex-1 text-[15px] text-gray-900 placeholder:text-gray-300 outline-none bg-transparent"
                />
              </div>

              <button 
                onClick={() => setShowPasswordModal(false)}
                className="w-full h-12 bg-[#3B82F6] text-white rounded-full font-medium text-[16px] active:opacity-80 transition-opacity"
              >
                保存
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function QuickPracticeRecordsPage({ onBack }: { onBack: () => void }) {
  const records = [
    { id: 1, question: '下列式子能被整除吗？\n28184÷8', date: '2026年4月1日 18:09:18', isCorrect: true },
    { id: 2, question: '下列式子能被整除吗？\n95580÷4', date: '2026年4月1日 18:09:17', isCorrect: true },
    { id: 3, question: '下列式子能被整除吗？\n25068÷3', date: '2026年4月1日 18:09:16', isCorrect: false },
    { id: 4, question: '下列式子能被整除吗？\n4617÷8', date: '2026年4月1日 18:09:15', isCorrect: false },
    { id: 5, question: '下列式子能被整除吗？\n331÷8', date: '2026年4月1日 18:09:14', isCorrect: true },
    { id: 6, question: '下列式子能被整除吗？\n72800÷15', date: '2026年4月1日 18:09:13', isCorrect: true },
  ];

  return (
    <div className="absolute inset-0 bg-[#F7F8FA] z-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="h-11 flex items-center justify-between px-3 shrink-0 bg-white sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-900">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-[17px] font-bold text-gray-900">快练记录</h1>
        <div className="flex items-center justify-between w-[87px] h-[32px] rounded-full border border-black/10 bg-white px-2.5">
          <button className="flex items-center justify-center text-black active:opacity-50 transition-opacity">
            <MoreHorizontal className="w-[18px] h-[18px]" />
          </button>
          <div className="w-[1px] h-[18px] bg-black/10"></div>
          <button className="flex items-center justify-center text-black active:opacity-50 transition-opacity">
            <CircleDot className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white px-4 pt-2 pb-0 flex items-center justify-between shrink-0">
        <div className="flex space-x-6">
          <div className="relative pb-2">
            <span className="text-[16px] font-bold text-gray-900">公考快练</span>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-blue-500 rounded-full"></div>
          </div>
          <div className="pb-2">
            <span className="text-[16px] text-gray-500">时政快练</span>
          </div>
        </div>
        <button className="bg-gray-100 text-gray-500 text-[12px] px-3 py-1.5 rounded-full mb-2">
          仅看错题
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white px-4 py-3 flex items-center justify-between shrink-0 border-b border-gray-100">
        <div className="flex space-x-2 overflow-x-auto no-scrollbar">
          <button className="bg-blue-50 text-blue-500 text-[13px] px-4 py-1.5 rounded-full whitespace-nowrap">
            全部
          </button>
          <button className="bg-gray-50 text-gray-600 text-[13px] px-4 py-1.5 rounded-full whitespace-nowrap">
            数资速算
          </button>
          <button className="bg-gray-50 text-gray-600 text-[13px] px-4 py-1.5 rounded-full whitespace-nowrap">
            资料速算进阶版
          </button>
        </div>
        <button className="flex items-center text-blue-500 text-[13px] ml-4 shrink-0">
          <span>日期</span>
          <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {records.map((record) => (
          <div key={record.id} className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="text-[15px] text-gray-900 mb-4 whitespace-pre-wrap leading-relaxed">
              {record.question}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[12px] text-gray-400">{record.date}</span>
              <div className={cn(
                "flex items-center text-[13px]",
                record.isCorrect ? "text-emerald-500" : "text-red-500"
              )}>
                {record.isCorrect ? (
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                ) : (
                  <XCircle className="w-4 h-4 mr-1" />
                )}
                <span>{record.isCorrect ? '答对' : '答错'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MineTab({ onNavigateToWrongQuestions, onNavigateToNoteRecords, onNavigateToMyCollections, onNavigateToLearningReport, onNavigateToPracticeRecords, onNavigateToPersonalInfo, onNavigateToMyHomework, onNavigateToMyMockExams, onNavigateToQuickPracticeRecords }: { onNavigateToWrongQuestions: () => void, onNavigateToNoteRecords: () => void, onNavigateToMyCollections: () => void, onNavigateToLearningReport: () => void, onNavigateToPracticeRecords: () => void, onNavigateToPersonalInfo: () => void, onNavigateToMyHomework: () => void, onNavigateToMyMockExams: () => void, onNavigateToQuickPracticeRecords: () => void }) {
  const gridItems = [
    { icon: FileEdit, title: '我的错题', color: 'text-blue-400', bg: 'bg-blue-50', onClick: onNavigateToWrongQuestions },
    { icon: ClipboardList, title: '我的作业', color: 'text-indigo-400', bg: 'bg-indigo-50', onClick: onNavigateToMyHomework },
    { icon: FileText, title: '我的模考', color: 'text-blue-500', bg: 'bg-blue-50', onClick: onNavigateToMyMockExams },
    { icon: Star, title: '我的收藏', color: 'text-orange-400', bg: 'bg-orange-50', onClick: onNavigateToMyCollections },
    { icon: BookOpen, title: '笔记记录', color: 'text-cyan-400', bg: 'bg-cyan-50', onClick: onNavigateToNoteRecords },
    { icon: Mic, title: '背诵记录', color: 'text-teal-400', bg: 'bg-teal-50' },
    { icon: PenLine, title: '快练记录', color: 'text-blue-400', bg: 'bg-blue-50', onClick: onNavigateToQuickPracticeRecords },
  ];

  const menuItems = [
    { icon: Settings, title: '个人设置', onClick: onNavigateToPersonalInfo },
    { icon: Headphones, title: '在线客服' },
    { icon: FileEdit, title: '问题建议' },
  ];

  return (
    <div className="relative z-10 flex flex-col pb-28">
      {/* Top Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-[240px] bg-gradient-to-b from-[#E0F2FF] via-[#F0F9FF] to-[#F7F7F7] -z-10"></div>

      {/* Header */}
      <div className="flex items-center justify-center relative h-11 px-3">
        <span className="text-[17px] font-bold text-black/90">个人中心</span>
        <div className="absolute right-3 flex items-center justify-between w-[87px] h-[32px] rounded-full border border-black/10 bg-white/60 px-2.5">
          <button className="flex items-center justify-center text-black active:opacity-50 transition-opacity">
            <MoreHorizontal className="w-[18px] h-[18px]" />
          </button>
          <div className="w-[1px] h-[18px] bg-black/10"></div>
          <button className="flex items-center justify-center text-black active:opacity-50 transition-opacity">
            <CircleDot className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>

      <main className="px-4 flex flex-col gap-6">
        {/* Profile Section */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-4">
            <div className="w-[72px] h-[72px] rounded-full bg-white shadow-sm flex items-center justify-center overflow-hidden border-2 border-white">
              <img 
                src="https://picsum.photos/seed/avatar/200" 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-[20px] font-bold text-black/90 tracking-tight">用户_s73e55itg</h2>
              <p className="text-[11px] text-black/30 mt-0.5">学习贵在坚持，付出必有收获~</p>
              <div className="flex items-center mt-1 space-x-1 text-blue-500 cursor-pointer">
                <Files className="w-3 h-3" />
                <span className="text-[11px]">复制用户ID</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex justify-around py-2">
          {[
            { label: '累计练习', value: '43' },
            { label: '今日练习', value: '4' },
            { label: '累计天数', value: '3' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-[24px] font-bold text-black/90 leading-none">{stat.value}</div>
              <div className="text-[11px] text-black/30 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Feature Cards */}
        <div className="flex gap-3">
          <div className="flex-1 bg-[#E8F4FF] rounded-2xl p-4 flex justify-between items-center cursor-pointer active:opacity-80" onClick={onNavigateToLearningReport}>
            <div>
              <h3 className="text-[17px] font-bold text-[#2B5A8C]">学习报告</h3>
              <p className="text-[11px] text-[#2B5A8C]/60 mt-1">阶段练习洞察报告</p>
            </div>
            <div className="w-10 h-10 bg-blue-400/20 rounded-lg flex items-center justify-center">
              <FileSearch className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <div className="flex-1 bg-[#F0EEFF] rounded-2xl p-4 flex justify-between items-center cursor-pointer active:opacity-80" onClick={onNavigateToPracticeRecords}>
            <div>
              <h3 className="text-[17px] font-bold text-[#5A528C]">练习记录</h3>
              <p className="text-[11px] text-[#5A528C]/60 mt-1">练习记录随时查看</p>
            </div>
            <div className="w-10 h-10 bg-purple-400/20 rounded-lg flex items-center justify-center">
              <ClipboardList className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Icon Grid */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-black/5 grid grid-cols-4 gap-y-6">
          {gridItems.map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2 cursor-pointer active:opacity-60" onClick={item.onClick}>
              <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <span className="text-[12px] text-black/90 font-medium">{item.title}</span>
            </div>
          ))}
        </div>

        {/* Menu List */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-black/5">
          {menuItems.map((item, i) => (
            <div key={i} className={`flex items-center justify-between p-4 cursor-pointer active:bg-black/5 transition-colors ${i !== menuItems.length - 1 ? 'border-b border-black/5' : ''}`} onClick={item.onClick}>
              <div className="flex items-center space-x-4">
                <item.icon className="w-5 h-5 text-black/70" />
                <span className="text-[17px] font-medium text-black/90">{item.title}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-black/20" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function QuizPage({ onBack, onSubmit }: { onBack: () => void, onSubmit: () => void }) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isExplanationMode, setIsExplanationMode] = useState(true);
  const [activeTab, setActiveTab] = useState<'ai' | 'note'>('ai');

  const options = [
    { id: 'A', text: '拓宽消费者投诉渠道有助于遏制直播带货中的违法现象' },
    { id: 'B', text: '投诉能促使直播带货平台严格把关上架产品的质量' },
    { id: 'C', text: '从事直播带货经营活动需要承担相应的法律责任' },
    { id: 'D', text: '所有消费者都能准确识别侵权行为' },
  ];

  return (
    <div className="absolute top-12 bottom-0 left-0 w-full bg-[#F7F7F7] flex flex-col z-20">
      {/* Header */}
      <div className="h-11 flex items-center justify-between px-3 border-b border-gray-100 shrink-0 bg-white">
        <div className="flex items-center space-x-3">
          <button onClick={onBack} className="p-2 -ml-2 text-gray-900 active:opacity-50 transition-opacity">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center bg-gray-100 rounded-full px-2.5 py-1">
            <Pause className="w-3.5 h-3.5 text-gray-500 mr-1" fill="currentColor" />
            <span className="text-[13px] font-medium text-gray-600 font-mono tracking-wider">01:58:38</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center text-gray-600">
            <FileText className="w-4 h-4 mr-1" />
            <span className="text-[14px] font-medium">1/5</span>
          </div>
          <div className="flex items-center justify-between w-[87px] h-[32px] rounded-full border border-black/10 bg-white/60 px-2.5">
            <button className="flex items-center justify-center text-black active:opacity-50 transition-opacity">
              <MoreHorizontal className="w-[18px] h-[18px]" />
            </button>
            <div className="w-[1px] h-[18px] bg-black/10"></div>
            <button className="flex items-center justify-center text-black active:opacity-50 transition-opacity">
              <CircleDot className="w-[18px] h-[18px]" />
            </button>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 shrink-0 bg-white">
        <div className="flex items-center">
          <span className="text-[13px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-sm border-l-2 border-blue-600">单选题</span>
        </div>
        <div className="flex items-center space-x-4 text-gray-600">
          <Download className="w-5 h-5" />
          <PenLine className="w-5 h-5" />
          <Star className="w-5 h-5" />
          <MoreHorizontal className="w-5 h-5" />
          <div 
            className="flex flex-col items-center justify-center ml-1 cursor-pointer"
            onClick={() => setIsExplanationMode(!isExplanationMode)}
          >
            <span className={`text-[10px] leading-tight ${isExplanationMode ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>解析</span>
            <span className={`text-[10px] leading-tight ${isExplanationMode ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>模式</span>
          </div>
          <div className="flex flex-col items-center justify-center ml-1 cursor-pointer" onClick={onSubmit}>
            <Check className="w-5 h-5 text-gray-800" />
            <span className="text-[10px] leading-tight text-gray-800">交卷</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="bg-white pb-6">
          <div className="px-5 py-4">
            <p className="text-[17px] text-gray-900 leading-loose tracking-wide font-medium">
              1、过去，直播带货中虚假宣传、销售假冒伪劣产品等违法现象层出不穷。最近，针对直播“乱象”，相关部门拓宽了消费者的投诉渠道，因此，直播带货中违法现象将有所减少。<br/>
              要使上述推理成立，需要补充的前提条件是（ ）
            </p>
          </div>

          <div className="px-5 space-y-6 mt-2">
            {options.map((opt) => {
              const isSelected = selectedOption === opt.id;
              const isCorrect = opt.id === 'A'; // Assuming A is correct for this demo
              const showResult = isExplanationMode && selectedOption !== null;
              
              let circleClass = 'border-gray-300 text-gray-500 group-hover:bg-gray-50';
              if (showResult) {
                if (isSelected && isCorrect) {
                  circleClass = 'border-[#4CAF50] bg-[#4CAF50] text-white font-bold';
                } else if (isSelected && !isCorrect) {
                  circleClass = 'border-[#F44336] bg-[#F44336] text-white font-bold';
                } else if (isCorrect) {
                  circleClass = 'border-[#4CAF50] text-[#4CAF50] font-bold';
                }
              } else if (isSelected) {
                circleClass = 'border-blue-500 bg-blue-50 text-blue-600 font-bold';
              }

              return (
                <div 
                  key={opt.id}
                  onClick={() => setSelectedOption(opt.id)}
                  className="flex items-start cursor-pointer group"
                >
                  <div className={`w-10 h-10 rounded-full border flex items-center justify-center text-[17px] shrink-0 mr-4 transition-colors ${circleClass}`}>
                    {opt.id}
                  </div>
                  <div className="pt-1.5">
                    <span className="text-[16px] leading-relaxed text-gray-800">
                      {opt.text}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Explanation Section */}
        {isExplanationMode && selectedOption !== null && (
          <div className="space-y-2 mt-2 pb-20">
            {/* 参考答案 */}
            <div className="bg-white px-5 py-4">
              <div className="flex items-center mb-3">
                <div className="w-1 h-4 bg-blue-600 rounded-full mr-2"></div>
                <h3 className="text-[16px] font-bold text-gray-900">参考答案</h3>
              </div>
              <div className="flex items-center space-x-6 text-[15px]">
                <div>
                  <span className="text-gray-600 mr-2">正确答案</span>
                  <span className="text-[#4CAF50] font-bold">A</span>
                </div>
                <div>
                  <span className="text-gray-600 mr-2">你的答案</span>
                  <span className={`font-bold ${selectedOption === 'A' ? 'text-[#4CAF50]' : 'text-[#F44336]'}`}>{selectedOption}</span>
                </div>
              </div>
            </div>

            {/* 题目来源及考点 */}
            <div className="bg-white px-5 py-4">
              <div className="flex items-center mb-3">
                <div className="w-1 h-4 bg-blue-600 rounded-full mr-2"></div>
                <h3 className="text-[16px] font-bold text-gray-900">题目来源及考点</h3>
              </div>
              <div className="flex items-start mb-3">
                <div className="mt-1 mr-1 text-blue-400 shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                </div>
                <span className="text-[15px] text-gray-800 leading-relaxed">《2024年广东省公务员录用考试《行测》题（网友回忆版）》</span>
              </div>
              <div className="inline-block bg-[#F0F5FF] text-blue-600 text-[13px] px-3 py-1.5 rounded-full">
                逻辑判断-搭桥
              </div>
            </div>

            {/* 视频解析 */}
            <div className="bg-white px-5 py-4">
              <div className="flex items-center mb-3">
                <div className="w-1 h-4 bg-blue-600 rounded-full mr-2"></div>
                <h3 className="text-[16px] font-bold text-gray-900">视频解析</h3>
              </div>
              <div className="relative w-full h-[200px] bg-black rounded-lg overflow-hidden">
                <img src="https://picsum.photos/seed/video1/800/400" alt="Video thumbnail" className="w-full h-full object-cover opacity-80" />
                <div className="absolute top-2 right-2 flex space-x-1">
                  <span className="bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded border border-white/30">1.0X</span>
                  <span className="bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded border border-white/30">标清</span>
                </div>
                <div className="absolute bottom-2 right-2 text-white text-[12px] font-mono bg-black/50 px-1.5 py-0.5 rounded">
                  01:27
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* 文字解析 */}
            <div className="bg-white px-5 py-4">
              <div className="flex items-center mb-3">
                <div className="w-1 h-4 bg-blue-600 rounded-full mr-2"></div>
                <h3 className="text-[16px] font-bold text-gray-900">文字解析</h3>
              </div>
              <div className="text-[15px] text-gray-800 leading-loose space-y-4">
                <p>加强论证。论点：直播带货中违法现象将有所减少。论据：针对直播“乱象”，相关部门拓宽了消费者的投诉渠道。</p>
                <p>A项，拓宽消费者投诉渠道有助于遏制直播带货中的违法现象，说明这个方法可以减少直播带货中的违法现象，建立论点和论据的联系，可以作为前提，搭桥项，当选；</p>
                <p>B项，说明投诉政策可以对商品质量起到约束作用，有助于减少违法现象，可以起到加强作用，但不是论点成立的前提，排除；</p>
                <p>C项，讨论经营者是否会承担法律责任，但并未说明投诉能不能减少违法现象，论题不一致，排除；</p>
                <p>D项，���论所有消费者是否都能准确识别侵权行为，但并未说明投诉能不能减少违法现象，论题不一致，排除。</p>
                <p>故正确答案为A。</p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="text-[13px] text-gray-500">您对解析和视频是否满意？</span>
                <div className="flex space-x-4 text-gray-400">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path></svg>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                </div>
              </div>
            </div>

            {/* 强化训练 */}
            <div className="bg-white px-5 py-4 flex items-center justify-between">
              <div>
                <div className="flex items-center mb-1">
                  <div className="w-1 h-4 bg-blue-600 rounded-full mr-2"></div>
                  <h3 className="text-[16px] font-bold text-gray-900">强化训练</h3>
                </div>
                <p className="text-[13px] text-gray-500 ml-3">精准发力，同考点强化提升</p>
              </div>
              <button className="text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full text-[14px] font-medium border border-blue-100">
                开始练习
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Side Tab */}
      <div className="fixed right-0 top-2/3 -translate-y-1/2 bg-[#FF8A00] text-white rounded-l-lg py-3 px-1.5 shadow-md z-50 flex flex-col items-center space-y-0.5 cursor-pointer">
        <span className="text-[11px] font-medium leading-none">问</span>
        <span className="text-[11px] font-medium leading-none">题</span>
        <span className="text-[11px] font-medium leading-none">·</span>
        <span className="text-[11px] font-medium leading-none">建</span>
        <span className="text-[11px] font-medium leading-none">议</span>
      </div>
    </div>
  );
}

function MaterialQuizPage({ onBack, onSubmit }: { onBack: () => void, onSubmit: () => void }) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [sheetHeight, setSheetHeight] = useState(420);
  const [maxHeight, setMaxHeight] = useState(700);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      // Calculate max height based on actual content height + drag handle height (38px)
      const contentHeight = contentRef.current.scrollHeight + 38;
      // Get the container height to ensure it doesn't cover the entire screen
      const containerHeight = contentRef.current.closest('.absolute')?.clientHeight || window.innerHeight;
      // Set max height to content height, but cap it at container height minus a small top margin
      setMaxHeight(Math.min(contentHeight, containerHeight - 20));
    }
  }, []);

  const options = [
    { id: 'A', text: '2023年全国共完成计算机软件著作权登记2495213件' },
    { id: 'B', text: '2023年全国作品著作权登记总量同比增量超过200万件' },
    { id: 'C', text: '2023年计算机软件著作权质权登记在著作权质权登记总量中的占比...' },
    { id: 'D', text: '2023年全国美术作品登记量占作品登记总量的比例高于50%' },
  ];

  return (
    <div className="absolute top-12 bottom-0 left-0 w-full bg-white flex flex-col z-20">
      {/* Header */}
      <div className="h-11 flex items-center justify-between px-3 border-b border-gray-100 shrink-0 bg-white relative z-10">
        <div className="flex items-center space-x-3">
          <button onClick={onBack} className="p-2 -ml-2 text-gray-900 active:opacity-50 transition-opacity">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center bg-gray-100 rounded-full px-2.5 py-1">
            <Pause className="w-3.5 h-3.5 text-gray-500 mr-1" fill="currentColor" />
            <span className="text-[13px] font-medium text-gray-600 font-mono tracking-wider">01:59:50</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center text-gray-600">
            <FileText className="w-4 h-4 mr-1" />
            <span className="text-[14px] font-medium">1/5</span>
          </div>
          <span className="text-[14px] font-medium text-blue-500 cursor-pointer" onClick={onSubmit}>交卷</span>
          <div className="flex items-center justify-between w-[87px] h-[32px] rounded-full border border-black/10 bg-white/60 px-2.5">
            <button className="flex items-center justify-center text-black active:opacity-50 transition-opacity">
              <MoreHorizontal className="w-[18px] h-[18px]" />
            </button>
            <div className="w-[1px] h-[18px] bg-black/10"></div>
            <button className="flex items-center justify-center text-black active:opacity-50 transition-opacity">
              <CircleDot className="w-[18px] h-[18px]" />
            </button>
          </div>
        </div>
      </div>

      {/* Material Content */}
      <div 
        className="flex-1 overflow-y-auto bg-white hide-scrollbar"
        style={{ paddingBottom: `${sheetHeight}px` }}
      >
        <div className="px-5 py-5">
          <div className="mb-3">
            <span className="text-[12px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-sm">材料</span>
          </div>
          <p className="text-[16px] text-gray-800 leading-loose tracking-wide indent-8 text-justify">
            2023年全国著作权（包括作品著作权、计算机软件著作权、著作权质权）登记总量达8923901件，同比增长40.46%，增速比上年同期增加39个百分点。根据各省、自治区、直辖市版权局和中国版权保护中心作品登记信息统计，2023年全国共完成作品著作权登记6428277件，同比增长42.30%，登记量前五位的分别是：北京市1101072件，同比增加53802件；山东省873826件，同比增加619459件；福建省710648件，同比增加424814件；中国版权保护中心493070件，同比增加1476件；上海市412660件，同比增加30660件。从作品类型来看，登记量最多的是美术作品3296437件...
          </p>
        </div>
      </div>

      {/* Bottom Sheet for Question */}
      <div 
        className="absolute bottom-0 left-0 w-full bg-white rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-30 flex flex-col"
        style={{ height: `${sheetHeight}px` }}
      >
        {/* Drag Handle */}
        <motion.div 
          className="w-full flex justify-center pt-4 pb-4 shrink-0 cursor-grab active:cursor-grabbing touch-none"
          onPan={(e, info) => {
            setSheetHeight(prev => Math.max(130, Math.min(maxHeight, prev - info.delta.y)));
          }}
        >
          <div className="w-10 h-1.5 bg-gray-200 rounded-full"></div>
        </motion.div>

        <div className="flex-1 overflow-y-auto px-5 pb-8 hide-scrollbar" ref={contentRef}>
          <div className="flex items-center mb-3">
            <span className="text-[12px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-sm border-l-2 border-blue-600">单选题</span>
          </div>
          <p className="text-[16px] text-gray-900 font-medium mb-5">
            不能从上述资料中推出��是：
          </p>

          <div className="space-y-5">
            {options.map((opt) => (
              <div 
                key={opt.id}
                onClick={() => setSelectedOption(opt.id)}
                className="flex items-start cursor-pointer group"
              >
                <div className={`
                  w-9 h-9 rounded-full border flex items-center justify-center text-[15px] shrink-0 mr-3 transition-colors mt-0.5
                  ${selectedOption === opt.id 
                    ? 'border-blue-500 bg-blue-50 text-blue-600 font-bold' 
                    : 'border-gray-300 text-gray-500 group-hover:bg-gray-50'
                  }
                `}>
                  {opt.id}
                </div>
                <div className="pt-1.5">
                  <span className={`text-[15px] leading-relaxed ${selectedOption === opt.id ? 'text-blue-600 font-medium' : 'text-gray-800'}`}>
                    {opt.text}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

type ExamStatNode = {
  id: string;
  title: string;
  total: number;
  correct: number;
  rate: string;
  time: string;
  children?: ExamStatNode[];
};

const examStatsData: ExamStatNode[] = [
  {
    id: '1',
    title: '常识判断',
    total: 20,
    correct: 0,
    rate: '0%',
    time: '2秒'
  },
  {
    id: '2',
    title: '言语理解与表达',
    total: 35,
    correct: 0,
    rate: '0%',
    time: '0秒',
    children: [
      {
        id: '2-1',
        title: '语句表达',
        total: 3,
        correct: 0,
        rate: '0%',
        time: '0秒',
        children: [
          {
            id: '2-1-1',
            title: '语句排序',
            total: 1,
            correct: 0,
            rate: '0%',
            time: '0秒'
          },
          {
            id: '2-1-2',
            title: '下文推断',
            total: 2,
            correct: 0,
            rate: '0%',
            time: '0秒'
          }
        ]
      }
    ]
  },
  {
    id: '3',
    title: '数量关系',
    total: 15,
    correct: 0,
    rate: '0%',
    time: '0秒'
  },
  {
    id: '4',
    title: '判断推理',
    total: 35,
    correct: 0,
    rate: '0%',
    time: '0秒'
  },
  {
    id: '5',
    title: '资料分析',
    total: 20,
    correct: 0,
    rate: '0%',
    time: '0秒'
  }
];

function ExamStatItem({ node, level = 0 }: { node: ExamStatNode, level?: number, key?: React.Key }) {
  const [expanded, setExpanded] = useState(level === 0 && node.id === '2');
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="flex flex-col">
      <div 
        className={`flex items-start py-3 ${level === 0 && expanded ? 'bg-[#F2F6FF] -mx-4 px-4' : ''} ${hasChildren ? 'cursor-pointer' : ''}`}
        style={{ paddingLeft: level > 0 ? `${level * 2}rem` : undefined }}
        onClick={() => hasChildren && setExpanded(!expanded)}
      >
        <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center shrink-0 mt-0.5 mr-3">
          {hasChildren && !expanded ? (
            <Plus className="w-3 h-3 text-white" strokeWidth={3} />
          ) : (
            <Minus className="w-3 h-3 text-white" strokeWidth={3} />
          )}
        </div>
        
        <div className="flex-1">
          <div className="text-[15px] font-medium text-gray-900">{node.title}</div>
          <div className="text-[12px] text-gray-400 mt-1">
            共{node.total}道，答对{node.correct}道，正确率{node.rate}，用时{node.time}
          </div>
        </div>
      </div>
      
      {expanded && hasChildren && (
        <div className="flex flex-col">
          {node.children!.map(child => (
            <ExamStatItem key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

const LaurelLeft = () => (
  <svg 
    width="40" 
    height="60" 
    viewBox="0 0 40 60" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{
      WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,1))',
      maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,1))'
    }}
  >
    <path d="M35 55 Q 10 45 10 20" stroke="#bfdbfe" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M10 20 Q 5 10 15 5 Q 15 15 10 20" fill="#93c5fd"/>
    <path d="M12 30 Q 5 20 15 15 Q 18 25 12 30" fill="#93c5fd"/>
    <path d="M15 40 Q 8 30 18 25 Q 22 35 15 40" fill="#93c5fd"/>
    <path d="M20 48 Q 12 40 22 35 Q 27 45 20 48" fill="#93c5fd"/>
    <path d="M28 53 Q 20 48 30 42 Q 35 50 28 53" fill="#93c5fd"/>
  </svg>
);

function QuizReportPage({ onBack, onHome, onRestart }: { onBack: () => void, onHome: () => void, onRestart: () => void }) {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-[#F5F7FA] flex flex-col z-30 overflow-hidden">
      {/* Header Background */}
      <div 
        className="absolute top-0 left-0 w-full h-56 bg-gradient-to-b from-[#3B82F6] to-[#60A5FA] z-0"
        style={{ borderBottomLeftRadius: '50% 24px', borderBottomRightRadius: '50% 24px' }}
      ></div>

      {/* Header */}
      <div className="relative z-10 h-11 flex items-center justify-between px-3 text-white shrink-0">
        <div className="flex items-center bg-black/10 rounded-full px-3 py-1.5 backdrop-blur-sm">
          <ChevronLeft className="w-5 h-5 cursor-pointer" onClick={onBack} />
          <div className="w-[1px] h-4 bg-white/30 mx-2"></div>
          <Home className="w-4 h-4 cursor-pointer" onClick={onHome} />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2">
          <span className="text-[17px] font-medium">练习报告</span>
        </div>
        <div className="flex items-center justify-between w-[87px] h-[32px] rounded-full border border-white/20 bg-black/10 px-2.5 backdrop-blur-sm">
          <button className="flex items-center justify-center text-white active:opacity-50 transition-opacity">
            <MoreHorizontal className="w-[18px] h-[18px]" />
          </button>
          <div className="w-[1px] h-[18px] bg-white/20"></div>
          <button className="flex items-center justify-center text-white active:opacity-50 transition-opacity">
            <CircleDot className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="relative z-10 flex-1 overflow-y-auto px-4 pb-24 hide-scrollbar">
        {/* Score Card */}
        <div className="bg-white rounded-2xl p-6 mt-4 shadow-sm relative">
          {/* Top Section: Score */}
          <div className="flex flex-col items-center justify-center mt-2">
            <div className="flex items-center justify-center gap-6">
              <LaurelLeft />
              <div className="flex flex-col items-center">
                <span className="text-[56px] font-bold text-blue-500 leading-none">0</span>
                <span className="text-[13px] text-gray-500 mt-2">答对题数</span>
              </div>
              <div className="transform scale-x-[-1]">
                <LaurelLeft />
              </div>
            </div>
          </div>

          {/* Middle Section: Stats */}
          <div className="flex justify-between items-center mt-8 mb-8 px-2">
            <div className="flex flex-col items-center">
              <span className="text-[12px] text-gray-400 mb-1">总题数</span>
              <span className="text-[20px] font-bold text-gray-800">125</span>
            </div>
            <div className="w-[1px] h-8 bg-gray-100"></div>
            <div className="flex flex-col items-center">
              <span className="text-[12px] text-gray-400 mb-1">总用时</span>
              <span className="text-[20px] font-bold text-gray-800">00:00:06</span>
            </div>
            <div className="w-[1px] h-8 bg-gray-100"></div>
            <div className="flex flex-col items-center">
              <span className="text-[12px] text-gray-400 mb-1">正确率</span>
              <span className="text-[20px] font-bold text-blue-500">0%</span>
            </div>
          </div>

          {/* Bottom Section: Info */}
          <div className="text-[12px] text-gray-400 space-y-2 mb-4">
            <p>试卷名称：2025年湖北公务员《行测》试题（考生回忆版）</p>
            <p>交卷时间：2025-03-31 19:01:00</p>
          </div>

          <button className="flex items-center gap-1.5 text-gray-500 active:opacity-70 transition-opacity">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center shadow-sm shadow-blue-200">
              <RotateCcw className="w-3 h-3 text-white" />
            </div>
            <span className="text-[13px] font-medium">重新作答</span>
          </button>
        </div>

        {/* Exam Situation */}
        <div className="mt-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="text-[16px] font-bold text-gray-900 mb-4 px-1">考试情况</h3>
            <div className="flex justify-between text-center pb-4 border-b border-gray-50">
              <div>
                <div className="text-[12px] text-gray-500">一共</div>
                <div className="text-[14px] font-bold text-gray-900 mt-1">125题</div>
              </div>
              <div>
                <div className="text-[12px] text-gray-500">答对</div>
                <div className="text-[14px] font-bold text-green-500 mt-1">0题</div>
              </div>
              <div>
                <div className="text-[12px] text-gray-500">答错</div>
                <div className="text-[14px] font-bold text-red-500 mt-1">0题</div>
              </div>
              <div>
                <div className="text-[12px] text-gray-500">未答</div>
                <div className="text-[14px] font-bold text-blue-500 mt-1">125题</div>
              </div>
            </div>

            <div className="pt-2">
              {examStatsData.map((item) => (
                <ExamStatItem key={item.id} node={item} />
              ))}
            </div>
          </div>
        </div>

        {/* Answer Sheet */}
        <div className="mt-6 pb-24">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="text-[16px] font-bold text-gray-900 mb-4 px-1">答题卡</h3>
            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-[12px] text-gray-500">
              <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-gray-100 mr-1.5"></div>未答</div>
              <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></div>正确</div>
              <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-red-500 mr-1.5"></div>错误</div>
            </div>

            {/* Sections */}
            {[
              { title: '常识判断', start: 1, end: 20 },
              { title: '言语理解与表达', start: 21, end: 55 },
              { title: '数量关系', start: 56, end: 70 },
              { title: '判断推理', start: 71, end: 105 },
              { title: '资料分析', start: 106, end: 125 },
            ].map((section, idx) => (
              <div key={idx} className="mb-6 last:mb-0">
                <div className="text-[13px] text-gray-500 mb-3">{section.title}</div>
                <div className="grid grid-cols-5 gap-3">
                  {Array.from({ length: section.end - section.start + 1 }).map((_, i) => (
                    <div key={i} className="aspect-square rounded-full bg-gray-50 text-gray-600 flex items-center justify-center text-[14px] font-medium">
                      {section.start + i}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      <div 
        className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 flex gap-3 z-50"
        style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
      >
        <button className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-[15px] font-medium bg-white active:bg-gray-50 transition-colors">
          全部解析
        </button>
        <button className="flex-1 py-2.5 rounded-xl bg-[#3B71E8] text-white text-[15px] font-medium shadow-sm shadow-blue-200/50 active:scale-[0.98] transition-transform">
          错题解析
        </button>
      </div>
    </div>
  );
}

const pastPapersData = [
  { id: 1, region: '国家', count: 39 },
  { id: 2, region: '湖北', count: 19 },
  { id: 3, region: '安徽', count: 18 },
  { id: 4, region: '北京', count: 18 },
  { id: 5, region: '重庆', count: 27 },
  { id: 6, region: '福建', count: 22 },
  { id: 7, region: '甘肃', count: 14 },
  { id: 8, region: '广西', count: 18 },
];

const regionPastPapersData = [
  { id: 1, title: '2025年安徽省公务员录用考试《行测》题（网友回忆版）', date: '2025-03-16 16:30:48', count: 125, status: '未完成' },
  { id: 2, title: '2024年安徽省公务员录用考试《行测》题（网友回忆版）', date: '2024-03-17 14:12:18', count: 110, status: '未完成' },
  { id: 3, title: '2023年安徽省公务员录用考试《行测》题（网友回忆版）', date: '2023-11-03 14:22:18', count: 110, status: '未完成' },
  { id: 4, title: '2022年安徽省公务员录用考试《行测》题（网友回忆版）', date: '2023-11-03 14:22:18', count: 110, status: '未完成' },
  { id: 5, title: '2021年安徽省公务员录用考试《行测》题（网友回忆版）', date: '2022-07-25 09:29:46', count: 110, status: '未完成' },
  { id: 6, title: '2020年安徽省公务员录用考试《行测》试题（网友回忆版）', date: '', count: 0, status: '' },
];

function RegionPastPapersPage({ region, onBack }: { region: string, onBack: () => void }) {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-[#F7F7F7] flex flex-col z-30 overflow-hidden">
      {/* Header */}
      <div className="relative z-10 h-11 flex items-center justify-between px-3 bg-white shrink-0">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-900 active:opacity-50 transition-opacity">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="absolute left-1/2 -translate-x-1/2">
          <h1 className="text-[17px] font-medium text-black">{region}</h1>
        </div>
        <div className="flex items-center justify-between w-[87px] h-[32px] rounded-full border border-black/10 bg-white/60 px-2.5">
          <button className="flex items-center justify-center text-black active:opacity-50 transition-opacity">
            <MoreHorizontal className="w-[18px] h-[18px]" />
          </button>
          <div className="w-[1px] h-[18px] bg-black/10"></div>
          <button className="flex items-center justify-center text-black active:opacity-50 transition-opacity">
            <CircleDot className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-8">
        {regionPastPapersData.map((item) => (
          <div key={item.id} className="bg-white rounded-[16px] p-5 shadow-sm cursor-pointer active:scale-[0.98] transition-transform">
            <h3 className="text-[16px] font-medium text-gray-900 leading-snug mb-4">{item.title}</h3>
            {item.date && (
              <div className="flex items-center justify-between text-[13px]">
                <div className="flex items-center text-gray-400">
                  <div className="w-3.5 h-3.5 rounded-full border border-gray-400 flex items-center justify-center mr-1.5">
                    <div className="w-1.5 h-1.5 border-t border-l border-gray-400 transform -rotate-45 -mt-0.5 ml-0.5"></div>
                  </div>
                  <span>{item.date}</span>
                  <span className="ml-3">{item.count}道</span>
                </div>
                <span className="text-[#FF5722]">{item.status}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function PastPapersPage({ onBack, onSelectRegion }: { onBack: () => void, onSelectRegion: (region: string) => void }) {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-[#F7F7F7] flex flex-col z-30 overflow-hidden">
      {/* Header */}
      <div className="relative z-10 h-11 flex items-center justify-between px-3 bg-white shrink-0">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-900 active:opacity-50 transition-opacity">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="absolute left-1/2 -translate-x-1/2">
          <h1 className="text-[17px] font-medium text-black">历年试卷</h1>
        </div>
        <div className="flex items-center justify-between w-[87px] h-[32px] rounded-full border border-black/10 bg-white/60 px-2.5">
          <button className="flex items-center justify-center text-black active:opacity-50 transition-opacity">
            <MoreHorizontal className="w-[18px] h-[18px]" />
          </button>
          <div className="w-[1px] h-[18px] bg-black/10"></div>
          <button className="flex items-center justify-center text-black active:opacity-50 transition-opacity">
            <CircleDot className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-8">
        {pastPapersData.map((item) => (
          <div 
            key={item.id} 
            className="bg-white rounded-[16px] p-5 flex items-center justify-between shadow-sm cursor-pointer active:scale-[0.98] transition-transform"
            onClick={() => onSelectRegion(item.region)}
          >
            <span className="text-[16px] font-medium text-gray-900">{item.region}</span>
            <div className="flex items-center text-gray-400">
              <span className="text-[13px] mr-1">共{item.count}套</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SpeedCalculationPage({ onBack, onStartPractice }: { onBack: () => void, onStartPractice: () => void }) {
  const categories = [
    {
      title: '数字特征',
      items: ['倍数特性', '奇偶判定']
    },
    {
      title: '加减计算',
      items: ['尾数计算']
    },
    {
      title: '截位直除',
      items: ['首位计算', '次位计算', '较精确计算']
    },
    {
      title: '分数比较',
      items: ['简单分数比较', '进阶分数比较', '多个分数比较']
    },
    {
      title: '百化分',
      items: ['基础积累', '进阶提升']
    }
  ];

  return (
    <div className="flex flex-col h-full bg-[#F7F7FA]">
      {/* Header */}
      <div className="relative z-10 h-11 flex items-center justify-between px-3 bg-white shrink-0">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-900 active:opacity-50 transition-opacity">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="absolute left-1/2 -translate-x-1/2">
          <h1 className="text-[17px] font-medium text-black">数资速算</h1>
        </div>
        <div className="flex items-center justify-between w-[87px] h-[32px] rounded-full border border-black/10 bg-white/60 px-2.5">
          <button className="flex items-center justify-center text-black active:opacity-50 transition-opacity">
            <MoreHorizontal className="w-[18px] h-[18px]" />
          </button>
          <div className="w-[1px] h-[18px] bg-black/10"></div>
          <button className="flex items-center justify-center text-black active:opacity-50 transition-opacity">
            <CircleDot className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6 pb-12">
        <div className="space-y-8">
          {categories.map((category, idx) => (
            <div key={idx}>
              <h3 className="text-[16px] font-bold text-gray-800 mb-4 pl-1">{category.title}</h3>
              <div className="grid grid-cols-2 gap-3">
                {category.items.map((item, itemIdx) => (
                  <button 
                    key={itemIdx}
                    onClick={onStartPractice}
                    className="bg-white py-4 px-4 rounded-xl text-[15px] text-gray-700 font-medium shadow-sm active:scale-95 transition-transform"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MaterialSpeedCalcAdvancedPage({ onBack }: { onBack: () => void }) {
  const [selectedQuantity, setSelectedQuantity] = useState(20);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['混合增长率']);

  const quantities = [5, 10, 15, 20];
  const types = [
    '基础量计算', '现期量计算', '增长率计算',
    '增长量计算', '多个数相加减', '平均值',
    '间隔增长率', '分数比较-简单分数比较',
    '分数比较-进阶分数比较',
    '分数比较-多个分数比较', '百化分-基础积累',
    '百化分-进阶提升', '平均增长率', '基期和差',
    '两期比重差', '比值增长率', '混合增长率',
    '基期比重'
  ];

  const handleTypeToggle = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleSelectAll = () => {
    if (selectedTypes.length === types.length) {
      setSelectedTypes([]);
    } else {
      setSelectedTypes([...types]);
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-3 h-11 bg-white sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-900 active:opacity-50 transition-opacity">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="absolute left-1/2 -translate-x-1/2">
          <span className="text-[17px] font-medium text-black">资料速算</span>
        </div>
        <div className="flex items-center justify-between w-[87px] h-[32px] rounded-full border border-black/10 bg-white/60 px-2.5">
          <button className="flex items-center justify-center text-black active:opacity-50 transition-opacity">
            <MoreHorizontal className="w-[18px] h-[18px]" />
          </button>
          <div className="w-[1px] h-[18px] bg-black/10"></div>
          <button className="flex items-center justify-center text-black active:opacity-50 transition-opacity">
            <CircleDot className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6 pb-24">
        {/* Quantity Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 bg-blue-500 rounded flex flex-col items-center justify-center gap-[3px]">
              <div className="w-3 h-[2px] bg-white rounded-full"></div>
              <div className="w-3 h-[2px] bg-white rounded-full"></div>
              <div className="w-3 h-[2px] bg-white rounded-full"></div>
            </div>
            <h3 className="text-[16px] font-bold text-gray-900">题量</h3>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {quantities.map(q => (
              <button
                key={q}
                onClick={() => setSelectedQuantity(q)}
                className={`py-2 rounded-xl text-[15px] font-medium transition-colors border ${
                  selectedQuantity === q
                    ? 'border-blue-500 text-blue-500 bg-blue-50/30'
                    : 'border-gray-200 text-gray-700 bg-white'
                }`}
              >
                {q}题
              </button>
            ))}
          </div>
        </div>

        {/* Types Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-blue-500 rounded flex flex-col items-center justify-center gap-[3px]">
                <div className="w-3 h-[2px] bg-white rounded-full"></div>
                <div className="w-3 h-[2px] bg-white/50 rounded-full"></div>
                <div className="w-3 h-[2px] bg-white/50 rounded-full"></div>
              </div>
              <h3 className="text-[16px] font-bold text-gray-900">题型</h3>
            </div>
            <button onClick={handleSelectAll} className="text-[14px] text-blue-500 font-medium">
              全选
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            {types.map(type => (
              <button
                key={type}
                onClick={() => handleTypeToggle(type)}
                className={`px-4 py-2 rounded-xl text-[14px] transition-colors border ${
                  selectedTypes.includes(type)
                    ? 'border-blue-500 text-blue-500 bg-blue-50/30'
                    : 'border-gray-200 text-gray-700 bg-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="absolute bottom-0 left-0 right-0 p-5 bg-white border-t border-gray-50" style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}>
        <button className="w-full bg-blue-500 text-white font-bold text-[16px] py-3.5 rounded-full active:scale-[0.98] transition-transform">
          开始答题
        </button>
      </div>
    </div>
  );
}

function FullSetPracticePage({ onBack, onNavigateToDetail }: { onBack: () => void, onNavigateToDetail: () => void }) {
  const fullSets = [
    { title: '联考图推考前冲刺', count: '3348', coverTitle: '联考图推\n考前冲刺' },
    { title: '2026年3.14多省联考考前全真演练卷', count: '2.0w', coverTitle: '2026年3.14多省联考\n考前全真演练卷' },
    { title: '2026省考选调生上岸计划——资料分析', count: '2.7w', coverTitle: '2026省考/选调生\n上岸计划—资料分析' },
    { title: '2026省考/选调生上岸计划—数量关系', count: '1.1w', coverTitle: '2026省考/选调生\n上岸计划—数量关系' },
    { title: '2026省考/选调生上岸计划—判断推理', count: '5.7w', coverTitle: '2026省考/选调生\n上岸计划—判断推理' },
    { title: '2026省考/选调生上岸计划——言语理解与表达', count: '3.7w', coverTitle: '2026省考/选调生\n上岸计划—言语理解与表达' },
  ];

  return (
    <div className="absolute inset-0 bg-[#F7F7F7] z-50 flex flex-col font-sans">
      {/* Header */}
      <div className="flex items-center justify-center relative h-11 px-3 bg-white flex-shrink-0">
        <button onClick={onBack} className="absolute left-3 p-1 active:opacity-50 transition-opacity">
          <ChevronLeft className="w-6 h-6 text-black" />
        </button>
        <span className="text-[17px] font-bold text-black/90">套题练习</span>
        <div className="absolute right-3 flex items-center justify-between w-[87px] h-[32px] rounded-full border border-black/10 bg-white/60 px-2.5">
          <button className="flex items-center justify-center text-black active:opacity-50 transition-opacity">
            <MoreHorizontal className="w-[18px] h-[18px]" />
          </button>
          <div className="w-[1px] h-[18px] bg-black/10"></div>
          <button className="flex items-center justify-center text-black active:opacity-50 transition-opacity">
            <CircleDot className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-safe">
        {fullSets.map((item, index) => (
          <div key={index} className="bg-white rounded-2xl p-4 flex gap-4 items-center shadow-sm">
            {/* Cover */}
            <div className="w-[80px] h-[106px] rounded-lg bg-gradient-to-b from-[#3b82f6] to-[#2563eb] relative overflow-hidden flex-shrink-0 shadow-inner">
              <div className="absolute top-1.5 left-1.5 text-[8px] text-white/80 font-medium scale-75 origin-top-left">X 公考刷题</div>
              <div className="absolute top-5 left-0 w-full px-1.5 text-center">
                <div className="text-[11px] font-bold text-white leading-tight whitespace-pre-wrap">{item.coverTitle}</div>
              </div>
              {/* Decorative element at bottom */}
              <div className="absolute bottom-0 left-0 w-full h-8 bg-white/20 backdrop-blur-sm rounded-t-full translate-y-4"></div>
              <div className="absolute bottom-1 right-1">
                <BookOpen className="w-6 h-6 text-white/80" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 h-[106px] flex flex-col justify-between py-1">
              <h3 className="text-[16px] font-bold text-black/90 leading-snug line-clamp-2">{item.title}</h3>
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-black/40">练习{item.count}次</span>
                <button 
                  onClick={onNavigateToDetail}
                  className="w-[72px] h-[28px] rounded-full bg-blue-50 text-blue-500 text-[13px] font-medium flex items-center justify-center active:opacity-70 transition-opacity"
                >
                  去练习
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FullSetDetailPage({ onBack, onStartQuiz }: { onBack: () => void, onStartQuiz: (type: 'normal' | 'material') => void }) {
  const papers = [
    {
      title: '全真演练卷一',
      color: 'bg-rose-400',
      subjects: ['政治理论', '常识判断', '言语理解与表达', '数量关系', '判断推理', '资料分析']
    },
    {
      title: '全真演练卷二',
      color: 'bg-rose-400',
      subjects: ['政治理论', '常识判断', '言语理解与表达', '数量关系', '判断推理', '资料分析']
    },
    {
      title: '全真演练卷三',
      color: 'bg-emerald-400',
      subjects: ['政治理论', '常识判断', '言语理解与表达', '数量关系', '判断推理', '资料分析']
    }
  ];

  return (
    <div className="absolute inset-0 bg-white z-50 flex flex-col font-sans">
      {/* Header */}
      <div className="flex items-center justify-center relative h-11 px-3 bg-white flex-shrink-0">
        <button onClick={onBack} className="absolute left-3 p-1 active:opacity-50 transition-opacity">
          <ChevronLeft className="w-6 h-6 text-black" />
        </button>
        <span className="text-[17px] font-bold text-black/90 truncate max-w-[200px]">2026年3.14多省联考...</span>
        <div className="absolute right-3 flex items-center justify-between w-[87px] h-[32px] rounded-full border border-black/10 bg-white/60 px-2.5">
          <button className="flex items-center justify-center text-black active:opacity-50 transition-opacity">
            <MoreHorizontal className="w-[18px] h-[18px]" />
          </button>
          <div className="w-[1px] h-[18px] bg-black/10"></div>
          <button className="flex items-center justify-center text-black active:opacity-50 transition-opacity">
            <CircleDot className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6 pb-safe">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[7.5px] top-2 bottom-2 w-[1px] border-l border-dashed border-gray-300"></div>
          
          <div className="flex flex-col gap-8">
            {papers.map((paper, pIdx) => (
              <div key={pIdx} className="relative">
                {/* Section Header */}
                <div className="flex items-center mb-5 relative z-10 bg-white py-1 w-max pr-2">
                  <div className={`w-4 h-4 rounded-full ${paper.color} border-[3px] border-white mr-3`}></div>
                  <h2 className="text-[18px] font-bold text-gray-900">{paper.title}</h2>
                </div>
                
                {/* Subjects */}
                <div className="flex flex-col gap-6 pl-8">
                  {paper.subjects.map((subject, sIdx) => (
                    <div key={sIdx} className="flex items-center justify-between">
                      <span className="text-[15px] text-gray-700">{subject}</span>
                      <button 
                        onClick={() => onStartQuiz(subject === '资料分析' ? 'material' : 'normal')}
                        className="px-5 py-1.5 rounded-full border border-blue-500 text-blue-500 text-[14px] active:bg-blue-50 transition-colors"
                      >
                        去答题
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="absolute top-12 bottom-0 left-0 w-full bg-[#F7F7F7] flex flex-col z-20 font-sans">
      <div className="bg-white pb-3">
        {/* Header */}
        <div className="flex items-center justify-center relative h-11 px-3 flex-shrink-0">
          <button onClick={onBack} className="absolute left-3 p-1 active:opacity-50 transition-opacity">
            <ChevronLeft className="w-6 h-6 text-black" />
          </button>
          <span className="text-[17px] font-bold text-black/90">搜索</span>
          <div className="absolute right-3 flex items-center justify-between w-[87px] h-[32px] rounded-full border border-black/10 bg-white/60 px-2.5">
            <button className="flex items-center justify-center text-black active:opacity-50 transition-opacity">
              <MoreHorizontal className="w-[18px] h-[18px]" />
            </button>
            <div className="w-[1px] h-[18px] bg-black/10"></div>
            <button className="flex items-center justify-center text-black active:opacity-50 transition-opacity">
              <CircleDot className="w-[18px] h-[18px]" />
            </button>
          </div>
        </div>

        {/* Search Input Area */}
        <div className="px-4 py-1 flex items-center gap-3">
          <div className="flex items-center gap-1 text-[14px] text-black/80 flex-shrink-0">
            公务员
            <ChevronDown className="w-3.5 h-3.5 text-black/40" />
          </div>
          <div className="flex-1 bg-[#F5F5F5] rounded-full flex items-center px-3 py-1.5">
            <Search className="w-4 h-4 text-black/30 mr-1.5" />
            <input 
              type="text" 
              placeholder="输入题目关键词" 
              className="bg-transparent border-none outline-none text-[14px] w-full text-black placeholder:text-black/30"
            />
          </div>
          <button className="text-blue-600 text-[15px] font-medium flex-shrink-0">
            确定
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center pb-32">
        <div className="relative w-32 h-32 mb-2 flex items-center justify-center">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <clipPath id="camera-clip">
                <path d="M 45 38 A 4 4 0 0 1 49 34 L 71 34 A 4 4 0 0 1 75 38 L 75 45 L 82 45 A 8 8 0 0 1 90 53 L 90 82 A 8 8 0 0 1 82 90 L 38 90 A 8 8 0 0 1 30 82 L 30 53 A 8 8 0 0 1 38 45 L 45 45 Z" />
              </clipPath>
              <clipPath id="grid-clip">
                <circle cx="60" cy="65" r="16" />
              </clipPath>
            </defs>
            
            {/* Camera Body */}
            <rect x="30" y="34" width="60" height="56" fill="#7B9CFF" clipPath="url(#camera-clip)" />
            <rect x="48" y="34" width="42" height="56" fill="#C4D6FF" clipPath="url(#camera-clip)" />
            
            {/* Camera Flash */}
            <circle cx="80" cy="45" r="3" fill="#FFFFFF" />
            
            {/* Lightning Bolt */}
            <path d="M 80 22 L 88 22 L 84 30 L 90 30 L 78 42 L 81 33 L 75 33 Z" fill="#4B74FF" />
            
            {/* Big Magnifying Glass Handle */}
            <line x1="72" y1="77" x2="84" y2="89" stroke="#4B74FF" strokeWidth="8" strokeLinecap="round" />
            
            {/* Big Magnifying Glass Interior */}
            <circle cx="60" cy="65" r="16" fill="#A8C1FF" />
            
            {/* Grid Lines */}
            <g stroke="#FFFFFF" strokeWidth="1" opacity="0.6" clipPath="url(#grid-clip)">
              <line x1="40" y1="53" x2="80" y2="53" />
              <line x1="40" y1="57" x2="80" y2="57" />
              <line x1="40" y1="61" x2="80" y2="61" />
              <line x1="40" y1="65" x2="80" y2="65" />
              <line x1="40" y1="69" x2="80" y2="69" />
              <line x1="40" y1="73" x2="80" y2="73" />
              <line x1="40" y1="77" x2="80" y2="77" />
              
              <line x1="48" y1="45" x2="48" y2="85" />
              <line x1="52" y1="45" x2="52" y2="85" />
              <line x1="56" y1="45" x2="56" y2="85" />
              <line x1="60" y1="45" x2="60" y2="85" />
              <line x1="64" y1="45" x2="64" y2="85" />
              <line x1="68" y1="45" x2="68" y2="85" />
              <line x1="72" y1="45" x2="72" y2="85" />
            </g>
            
            {/* Big Magnifying Glass Outer Ring */}
            <circle cx="60" cy="65" r="16" stroke="#4B74FF" strokeWidth="4" fill="none" />
            
            {/* Small Magnifying Glass */}
            <circle cx="59" cy="64" r="4" stroke="#FFFFFF" strokeWidth="2" fill="none" />
            <line x1="62" y1="67" x2="66" y2="71" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <span className="text-blue-600 text-[18px] font-bold tracking-wide">切换拍照搜题</span>
      </div>
    </div>
  );
}

function IdiomPracticePage({ onBack, onHome }: { onBack: () => void, onHome: () => void }) {
  return (
    <div className="relative z-10 flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-12 flex-shrink-0 mt-2">
        <div className="flex items-center gap-3 bg-gray-50 rounded-full px-3 py-1.5 border border-gray-100">
          <button onClick={onBack} className="active:opacity-50">
            <ChevronLeft className="w-5 h-5 text-black/80" />
          </button>
          <div className="w-[1px] h-4 bg-black/10"></div>
          <button onClick={onHome} className="active:opacity-50">
            <Home className="w-[18px] h-[18px] text-black/80" />
          </button>
        </div>
        
        <div className="text-[17px] font-bold tracking-wide">
          <span className="text-blue-500">1</span><span className="text-black/80">/5</span>
        </div>
        
        <div className="flex items-center gap-3 bg-gray-50 rounded-full px-3 py-1.5 border border-gray-100">
          <button className="active:opacity-50">
            <MoreHorizontal className="w-5 h-5 text-black/80" />
          </button>
          <div className="w-[1px] h-4 bg-black/10"></div>
          <button className="active:opacity-50">
            <Circle className="w-[18px] h-[18px] text-black/80" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-12 mt-8 flex-shrink-0">
        <div className="relative flex items-center justify-between">
          {/* Line */}
          <div className="absolute left-6 right-6 h-[2px] bg-gray-100 -z-10 top-3"></div>
          
          {/* Left Node */}
          <div className="flex flex-col items-center gap-2 bg-white px-2">
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shadow-sm">
              <Check className="w-4 h-4 text-white" strokeWidth={3} />
            </div>
            <span className="text-[13px] text-black/70 font-medium">例句应用</span>
          </div>
          
          {/* Right Node */}
          <div className="flex flex-col items-center gap-2 bg-white px-2">
            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
              <BookOpen className="w-3 h-3 text-black/30" />
            </div>
            <span className="text-[13px] text-black/50 font-medium">词义掌握</span>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="px-6 mt-12 flex-1 overflow-y-auto">
        <p className="text-[17px] leading-[1.8] text-black/90 font-medium tracking-wide">
          “历尽天华成此景，人间万事出艰辛”。每一项成就都不是从天上��下来的，而是紧锣密鼓干出来的、<span className="inline-block w-16 border-b border-black mx-1"></span>拼出来的，是快马加鞭冲出来的、奋楫争先抢出来的。
        </p>

        {/* Options */}
        <div className="mt-16 flex flex-col gap-5">
          <button className="w-full py-4 rounded-full border border-gray-200 text-center text-black/80 text-[16px] font-medium active:bg-gray-50 transition-colors">
            夙兴夜寐
          </button>
          <button className="w-full py-4 rounded-full border border-gray-200 text-center text-black/80 text-[16px] font-medium active:bg-gray-50 transition-colors">
            焚膏继晷
          </button>
        </div>
      </div>
    </div>
  );
}

function VocabularyPracticePage({ onBack, onHome }: { onBack: () => void, onHome: () => void }) {
  return (
    <div className="relative z-10 flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-12 flex-shrink-0 mt-2">
        <div className="flex items-center gap-3 bg-gray-50 rounded-full px-3 py-1.5 border border-gray-100">
          <button onClick={onBack} className="active:opacity-50">
            <ChevronLeft className="w-5 h-5 text-black/80" />
          </button>
          <div className="w-[1px] h-4 bg-black/10"></div>
          <button onClick={onHome} className="active:opacity-50">
            <Home className="w-[18px] h-[18px] text-black/80" />
          </button>
        </div>
        
        <div className="text-[17px] font-bold tracking-wide">
          <span className="text-blue-500">1</span><span className="text-black/80">/5</span>
        </div>
        
        <div className="flex items-center gap-3 bg-gray-50 rounded-full px-3 py-1.5 border border-gray-100">
          <button className="active:opacity-50">
            <MoreHorizontal className="w-5 h-5 text-black/80" />
          </button>
          <div className="w-[1px] h-4 bg-black/10"></div>
          <button className="active:opacity-50">
            <Circle className="w-[18px] h-[18px] text-black/80" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-12 mt-8 flex-shrink-0">
        <div className="relative flex items-center justify-between">
          {/* Line */}
          <div className="absolute left-6 right-6 h-[2px] bg-gray-100 -z-10 top-3"></div>
          
          {/* Left Node */}
          <div className="flex flex-col items-center gap-2 bg-white px-2">
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shadow-sm">
              <Check className="w-4 h-4 text-white" strokeWidth={3} />
            </div>
            <span className="text-[13px] text-black/70 font-medium">例句应用</span>
          </div>
          
          {/* Right Node */}
          <div className="flex flex-col items-center gap-2 bg-white px-2">
            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
              <BookOpen className="w-3 h-3 text-black/30" />
            </div>
            <span className="text-[13px] text-black/50 font-medium">词义掌握</span>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="px-6 mt-12 flex-1 overflow-y-auto">
        <p className="text-[17px] leading-[1.8] text-black/90 font-medium tracking-wide">
          经全国人民代表大会审议后，《新治安法》将于近日内正式<span className="inline-block w-16 border-b border-black mx-1"></span>。
        </p>

        {/* Options */}
        <div className="mt-16 flex flex-col gap-5">
          <button className="w-full py-4 rounded-full border border-gray-200 text-center text-black/80 text-[16px] font-medium active:bg-gray-50 transition-colors">
            实行
          </button>
          <button className="w-full py-4 rounded-full border border-gray-200 text-center text-black/80 text-[16px] font-medium active:bg-gray-50 transition-colors">
            施行
          </button>
        </div>
      </div>
    </div>
  );
}

function PublicBasicPointsPage({ onBack, onHome }: { onBack: () => void, onHome: () => void }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = [
    { id: 'politics', title: '政治', total: 246 },
    { 
      id: 'law', 
      title: '法律', 
      total: 263,
      subcategories: [
        { title: '法理学', progress: 0, total: 46 },
        { title: '宪法', progress: 0, total: 30 },
        { title: '刑法', progress: 0, total: 36 },
        { title: '民法', progress: 0, total: 60 },
        { title: '行政法', progress: 0, total: 17 },
        { title: '国家赔偿法', progress: 0, total: 46 },
        { title: '程序法', progress: 0, total: 28 },
      ]
    },
    { id: 'science', title: '科技', total: 284 },
    { id: 'history', title: '人文历史', total: 462, badge: '上次学到' },
    { id: 'economics', title: '经济', total: 85 },
    { id: 'documents', title: '公文', total: 81 },
    { id: 'management', title: '管理', total: 85 },
  ];

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <div className="relative z-10 flex flex-col h-full bg-[#f5f6f8]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-12 flex-shrink-0 mt-2 bg-white">
        <div className="flex items-center gap-3 bg-gray-50 rounded-full px-3 py-1.5 border border-gray-100">
          <button onClick={onBack} className="active:opacity-50">
            <ChevronLeft className="w-5 h-5 text-black/80" />
          </button>
          <div className="w-[1px] h-4 bg-black/10"></div>
          <button onClick={onHome} className="active:opacity-50">
            <Home className="w-[18px] h-[18px] text-black/80" />
          </button>
        </div>
        
        <div className="text-[17px] font-bold tracking-wide">
          公基
        </div>
        
        <div className="flex items-center gap-3 bg-gray-50 rounded-full px-3 py-1.5 border border-gray-100">
          <button className="active:opacity-50">
            <MoreHorizontal className="w-5 h-5 text-black/80" />
          </button>
          <div className="w-[1px] h-4 bg-black/10"></div>
          <button className="active:opacity-50">
            <Circle className="w-[18px] h-[18px] text-black/80" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 pb-12">
        <div className="flex flex-col gap-3">
          {categories.map(category => {
            const isExpanded = expandedId === category.id;
            const hasSubcategories = category.subcategories && category.subcategories.length > 0;

            return (
              <div key={category.id} className="bg-white rounded-[20px] overflow-hidden shadow-sm relative">
                <div 
                  className="p-5 pb-8 flex items-center justify-between cursor-pointer"
                  onClick={() => hasSubcategories && toggleExpand(category.id)}
                >
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[17px] font-bold text-black/90">{category.title}</h3>
                      {category.badge && (
                        <span className="bg-[#ff6b4a] text-white text-[10px] px-1.5 py-0.5 rounded-sm font-medium">
                          {category.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[13px] text-black/50">
                      共<span className="text-blue-500">{category.total}</span>个高频考点
                    </p>
                  </div>
                  <div className="w-7 h-7 rounded-full border border-gray-100 flex items-center justify-center">
                    <Check className="w-4 h-4 text-gray-200" />
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && hasSubcategories && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-8 pt-0 flex flex-col">
                        {category.subcategories.map((sub, idx) => (
                          <div key={idx} className="flex flex-col py-3 border-b border-gray-50 last:border-0">
                            <h4 className="text-[15px] text-black/80 mb-1">{sub.title}</h4>
                            <p className="text-[12px] text-black/40">{sub.progress}/{sub.total}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Chevron indicator */}
                {hasSubcategories && (
                  <div 
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 cursor-pointer p-1"
                    onClick={() => toggleExpand(category.id)}
                  >
                    <ChevronDown className={`w-4 h-4 text-gray-300 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SpeedCalculationPracticePage({ onBack, onHome, onFinish }: { onBack: () => void, onHome: () => void, onFinish: () => void }) {
  return (
    <div className="relative z-10 flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-12 flex-shrink-0 mt-2">
        <div className="flex items-center gap-3 bg-gray-50 rounded-full px-3 py-1.5 border border-gray-100">
          <button onClick={onBack} className="active:opacity-50">
            <ChevronLeft className="w-5 h-5 text-black/80" />
          </button>
          <div className="w-[1px] h-4 bg-black/10"></div>
          <button onClick={onHome} className="active:opacity-50">
            <Home className="w-[18px] h-[18px] text-black/80" />
          </button>
        </div>
        
        <div className="text-[17px] font-bold tracking-wide text-black/90">
          速算练习
        </div>
        
        <div className="flex items-center gap-3 bg-gray-50 rounded-full px-3 py-1.5 border border-gray-100">
          <button className="active:opacity-50">
            <MoreHorizontal className="w-5 h-5 text-black/80" />
          </button>
          <div className="w-[1px] h-4 bg-black/10"></div>
          <button className="active:opacity-50">
            <Circle className="w-[18px] h-[18px] text-black/80" />
          </button>
        </div>
      </div>

      {/* Timer and Progress */}
      <div className="px-6 mt-6 flex items-center justify-between flex-shrink-0">
        {/* Left: Progress Pill */}
        <div className="relative flex items-end h-8">
          <div className="absolute bottom-0 w-full h-5 bg-[#E6F3FF] rounded-full -z-10"></div>
          <div className="flex items-baseline gap-[2px] px-3">
            <span className="text-[26px] font-bold text-[#1A73E8] leading-none translate-y-[2px]">1</span>
            <span className="text-[14px] font-medium text-gray-500 leading-none">/10</span>
          </div>
        </div>
        
        {/* Right: Timer Circle */}
        <div className="relative w-11 h-11 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-gray-100"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-[#1A73E8]"
              strokeWidth="3.5"
              strokeDasharray="80, 100"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <span className="absolute text-[16px] font-bold text-[#1A73E8]">10</span>
        </div>
      </div>

      {/* Question Content */}
      <div className="px-6 mt-10 flex-1 overflow-y-auto">
        <div className="flex flex-col items-center justify-center py-10">
          <p className="text-[32px] font-bold text-black/90 tracking-wider">
            345 × 11 = ?
          </p>
        </div>

        {/* Options */}
        <div className="mt-8 flex flex-col gap-5">
          <button onClick={onFinish} className="w-full py-4 rounded-full border border-gray-200 text-center text-black/80 text-[16px] font-medium active:bg-gray-50 transition-colors">
            3795
          </button>
          <button onClick={onFinish} className="w-full py-4 rounded-full border border-gray-200 text-center text-black/80 text-[16px] font-medium active:bg-gray-50 transition-colors">
            3805
          </button>
          <button onClick={onFinish} className="w-full py-4 rounded-full border border-gray-200 text-center text-black/80 text-[16px] font-medium active:bg-gray-50 transition-colors">
            3785
          </button>
          <button onClick={onFinish} className="w-full py-4 rounded-full border border-gray-200 text-center text-black/80 text-[16px] font-medium active:bg-gray-50 transition-colors">
            3815
          </button>
        </div>
      </div>
    </div>
  );
}

function SpeedCalculationReportPage({ onBack, onHome, onRestart }: { onBack: () => void, onHome: () => void, onRestart: () => void }) {
  return (
    <div className="relative z-10 flex flex-col h-full bg-[#E6F3FF]">
      {/* Top Blue Gradient Background */}
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-[#1A73E8] to-[#4285F4] -z-10 rounded-b-[40px]"></div>

      {/* Header */}
      <div className="flex items-center justify-between px-4 h-12 flex-shrink-0 mt-2">
        <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/20">
          <button onClick={onBack} className="active:opacity-50">
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <div className="w-[1px] h-4 bg-white/30"></div>
          <button onClick={onHome} className="active:opacity-50">
            <Home className="w-[18px] h-[18px] text-white" />
          </button>
        </div>
        
        <div className="text-[17px] font-bold tracking-wide text-white">
          倍数特性
        </div>
        
        <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/20">
          <button className="active:opacity-50">
            <MoreHorizontal className="w-5 h-5 text-white" />
          </button>
          <div className="w-[1px] h-4 bg-white/30"></div>
          <button className="active:opacity-50">
            <Circle className="w-[18px] h-[18px] text-white" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-8 hide-scrollbar">
        {/* Illustration Area */}
        <div className="relative h-[160px] mt-4 flex justify-center items-end">
          {/* Linear Glowing Rays */}
          <div className="absolute inset-0 flex justify-center items-end overflow-hidden pointer-events-none">
            <div className="absolute bottom-[-10px] w-full flex justify-center items-end">
              <div className="absolute bottom-0 w-[120px] h-[220px] bg-gradient-to-t from-white/30 to-transparent origin-bottom -rotate-[70deg]" style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }}></div>
              <div className="absolute bottom-0 w-[140px] h-[260px] bg-gradient-to-t from-white/20 to-transparent origin-bottom -rotate-[45deg]" style={{ clipPath: 'polygon(50% 100%, 15% 0, 85% 0)' }}></div>
              <div className="absolute bottom-0 w-[100px] h-[280px] bg-gradient-to-t from-white/10 to-transparent origin-bottom -rotate-[15deg]" style={{ clipPath: 'polygon(50% 100%, 25% 0, 75% 0)' }}></div>
              <div className="absolute bottom-0 w-[110px] h-[290px] bg-gradient-to-t from-white/15 to-transparent origin-bottom rotate-[15deg]" style={{ clipPath: 'polygon(50% 100%, 20% 0, 80% 0)' }}></div>
              <div className="absolute bottom-0 w-[130px] h-[270px] bg-gradient-to-t from-white/20 to-transparent origin-bottom rotate-[45deg]" style={{ clipPath: 'polygon(50% 100%, 15% 0, 85% 0)' }}></div>
              <div className="absolute bottom-0 w-[120px] h-[230px] bg-gradient-to-t from-white/30 to-transparent origin-bottom rotate-[70deg]" style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }}></div>
            </div>
            
            {/* Floating particles to match the reference vibe */}
            {/* Left yellow confetti */}
            <div className="absolute left-[20%] top-[40%] w-2.5 h-4 bg-[#FFCA28] rounded-sm rotate-[40deg] opacity-90"></div>
            {/* Left yellow coin */}
            <div className="absolute left-[28%] bottom-[30%] w-4 h-4 bg-[#FFCA28] rounded-full rotate-[60deg] opacity-90 border-b-2 border-[#F57F17]"></div>
            {/* Right blue confetti */}
            <div className="absolute right-[22%] top-[35%] w-3 h-4 bg-[#80D8FF] rounded-sm -rotate-[30deg] opacity-80" style={{ clipPath: 'polygon(10% 0, 100% 10%, 90% 100%, 0 90%)' }}></div>
          </div>
          
          {/* Clipboard Illustration (3D CSS approximation) */}
          <div className="relative z-10 w-[140px] h-[120px] bg-[#FFCA28] rounded-t-2xl flex flex-col items-center pt-3 shadow-2xl border-b-[8px] border-r-[4px] border-[#F57F17] translate-y-[8px]">
            {/* Clip */}
            <div className="w-[60px] h-[18px] bg-[#4CAF50] rounded-full -mt-6 shadow-md z-20 border-b-[4px] border-[#388E3C]"></div>
            {/* Paper */}
            <div className="w-[104px] h-full bg-[#FFF8E1] rounded-t-lg mt-2 p-3 flex flex-col gap-2.5 border-b-[4px] border-r-[2px] border-[#FFE082]">
              <div className="w-full h-2 bg-[#FFE082] rounded-full"></div>
              <div className="w-3/4 h-2 bg-[#FFE082] rounded-full"></div>
              <div className="w-full h-2 bg-[#FFE082] rounded-full"></div>
            </div>
            {/* Pencil */}
            <div className="absolute -right-8 bottom-6 w-[80px] h-[22px] bg-[#4CAF50] rounded-l-full rounded-r-sm rotate-[-20deg] shadow-lg flex items-center justify-end pr-1 border-b-[4px] border-[#388E3C]">
              <div className="w-[15px] h-[14px] bg-[#FFCC80] rounded-r-sm border-b-[2px] border-[#FFA726]"></div>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-[24px] shadow-sm relative z-20 pt-10 pb-6 px-5 flex flex-col items-center">
          {/* Top Yellow Border */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-[#FFCA28] rounded-t-[24px]"></div>
          <div className="absolute top-0 left-[-8px] right-[-8px] h-3 bg-[#FFCA28] rounded-full opacity-50 -z-10"></div>

          {/* Stars */}
          <div className="flex items-center gap-2 mb-6">
            <Star className="w-10 h-10 text-[#FFCA28] fill-[#FFCA28] -rotate-12 drop-shadow-md" />
            <Star className="w-14 h-14 text-[#FFCA28] fill-[#FFCA28] -translate-y-2 drop-shadow-md" />
            <Star className="w-10 h-10 text-gray-200 fill-gray-200 rotate-12" />
          </div>

          {/* Title */}
          <h2 className="text-[22px] font-bold text-black/90 mb-8">再接再厉</h2>

          {/* Divider */}
          <div className="w-full relative h-[1px] mb-6">
            <div className="absolute inset-0 border-t border-dashed border-gray-200"></div>
            <div className="absolute -left-7 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#E6F3FF]"></div>
            <div className="absolute -right-7 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#E6F3FF]"></div>
          </div>

          {/* Stats */}
          <div className="flex gap-3 w-full mb-8">
            <div className="flex-1 bg-[#F8F9FA] rounded-2xl p-4 flex flex-col gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded bg-blue-100 flex items-center justify-center">
                  <Star className="w-3 h-3 text-blue-500 fill-blue-500" />
                </div>
                <span className="text-[13px] text-gray-500">正确率</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-[28px] font-bold text-black/90">70</span>
                <span className="text-[14px] font-bold text-black/90">%</span>
              </div>
            </div>
            
            <div className="flex-1 bg-[#F8F9FA] rounded-2xl p-4 flex flex-col gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded bg-teal-100 flex items-center justify-center">
                  <Clock className="w-3 h-3 text-teal-500" />
                </div>
                <span className="text-[13px] text-gray-500">完成时间</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-[28px] font-bold text-black/90">10</span>
                <span className="text-[14px] font-bold text-black/90">秒</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 w-full">
            <button className="flex-1 py-3.5 rounded-full bg-[#FFBC42] text-white font-bold text-[16px] shadow-sm active:scale-95 transition-transform">
              分享
            </button>
            <button 
              onClick={onRestart}
              className="flex-1 py-3.5 rounded-full bg-[#1A73E8] text-white font-bold text-[16px] shadow-sm active:scale-95 transition-transform"
            >
              再做一组
            </button>
          </div>
        </div>

        {/* Featured Materials */}
        <div className="mt-4 bg-white rounded-[20px] p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
            <h3 className="text-[16px] font-bold text-black/90">精选资料</h3>
          </div>
          
          <div className="flex gap-3 items-center">
            <div className="w-[70px] h-[90px] bg-blue-500 rounded-lg flex-shrink-0 flex flex-col items-center justify-center p-2 shadow-sm">
              <span className="text-[10px] text-white/80 font-medium mb-1">数资速算技巧</span>
              <span className="text-[12px] text-white font-bold text-center leading-tight">数资速算技巧<br/>【图文版】</span>
            </div>
            <div className="flex flex-col justify-between h-[80px]">
              <h4 className="text-[15px] font-bold text-black/90">数资速算技巧【图文版】</h4>
              <button className="self-start px-4 py-1.5 rounded-full border border-blue-500 text-blue-500 text-[13px] font-medium active:bg-blue-50 transition-colors">
                去查看
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CurrentAffairsPage({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<'weekly' | 'collection'>('weekly');

  const mockWeeklyData = [
    { id: 1, title: '时政模拟题【3.23-3.29】', time: '2026-03-30 16:25:52', count: 15, status: '未完成' },
    { id: 2, title: '时政模拟题【3.15-3.22】', time: '2026-03-23 11:53:28', count: 15, status: '未完成' },
    { id: 3, title: '时政模拟题【3.9-3.15】', time: '2026-03-16 13:40:47', count: 10, status: '未完成' },
    { id: 4, title: '时政模拟题【3.2-3.8】', time: '2026-03-09 10:22:27', count: 15, status: '未完成' },
    { id: 5, title: '时政模拟题【2.23-3.1】', time: '2026-03-02 14:17:23', count: 11, status: '未完成' },
    { id: 6, title: '时政模拟题【2.16-2.22】', time: '2026-02-27 14:54:07', count: 9, status: '未完成' },
    { id: 7, title: '时政模拟题【2.9-2.15】', time: '2026-02-20 10:15:00', count: 10, status: '未完成' },
  ];

  const mockCollectionData = [
    { id: 1, title: '《求是》专项练习', count: 1 },
    { id: 2, title: '月时政', count: 27 },
    { id: 3, title: '考前冲刺', count: 3 },
    { id: 4, title: '联考考前政治理论', count: 1 },
    { id: 5, title: '两会模拟题', count: 1 },
    { id: 6, title: '公安专题', count: 1 },
    { id: 7, title: '【中央一号文件】', count: 3 },
  ];

  return (
    <div className="flex flex-col h-full bg-[#F7F8FA]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white sticky top-0 z-10">
        <button onClick={onBack} className="p-1 -ml-1">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-[17px] font-medium text-gray-900">最新时政</h1>
        <div className="flex items-center gap-3">
          <MoreHorizontal className="w-5 h-5 text-gray-800" />
          <CircleDot className="w-5 h-5 text-gray-800" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white px-4 border-b border-gray-100">
        <div 
          className="flex-1 flex flex-col items-center justify-center pt-3 pb-2 cursor-pointer"
          onClick={() => setActiveTab('weekly')}
        >
          <span className={`text-[15px] ${activeTab === 'weekly' ? 'font-medium text-gray-900' : 'text-gray-500'}`}>周时政</span>
          {activeTab === 'weekly' && (
            <div className="w-8 h-1 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full mt-2"></div>
          )}
        </div>
        <div 
          className="flex-1 flex flex-col items-center justify-center pt-3 pb-2 cursor-pointer"
          onClick={() => setActiveTab('collection')}
        >
          <span className={`text-[15px] ${activeTab === 'collection' ? 'font-medium text-gray-900' : 'text-gray-500'}`}>合集</span>
          {activeTab === 'collection' && (
            <div className="w-8 h-1 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full mt-2"></div>
          )}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 hide-scrollbar">
        {activeTab === 'weekly' ? (
          mockWeeklyData.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-3">
              <h3 className="text-[16px] font-bold text-gray-900 tracking-wide">{item.title}</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-400 text-[13px] gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{item.time}</span>
                  <span className="ml-1">{item.count}道</span>
                </div>
                <span className="text-[#FF6B6B] text-[13px]">{item.status}</span>
              </div>
            </div>
          ))
        ) : (
          mockCollectionData.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between active:scale-[0.98] transition-transform cursor-pointer">
              <h3 className="text-[16px] font-bold text-gray-900 tracking-wide">{item.title}</h3>
              <div className="flex items-center text-gray-400 text-[13px] gap-1">
                <span>共{item.count}套</span>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
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
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-b-[40px]">
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
    </div>
  );
};

const Header = ({ onBack }: { onBack: () => void }) => {
  return (
    <header className="absolute top-0 inset-x-0 z-30 pt-12 pb-2 px-6 flex justify-center pointer-events-none">
      {/* Back Button */}
      <button 
        onClick={onBack} 
        className="absolute top-4 left-4 p-2 bg-white/40 backdrop-blur-md text-gray-800 hover:bg-white/60 rounded-full transition-colors z-40 pointer-events-auto shadow-sm"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <div className="relative w-full max-w-[340px] pointer-events-auto">
        {/* Calendar Tag hanging off the top left */}
        <div className="absolute -top-5 -left-2 z-20 transform -rotate-12">
          <div className="relative bg-gradient-to-b from-sky-300 to-sky-500 text-white rounded-xl w-12 h-14 shadow-[0_4px_12px_rgba(56,189,248,0.5),inset_0_2px_0_rgba(255,255,255,0.5)] border border-sky-200 flex flex-col items-center justify-center pt-1.5">
            {/* Calendar rings */}
            <div className="absolute -top-1.5 left-2 w-1.5 h-3 bg-white/90 rounded-full shadow-sm border border-sky-100" />
            <div className="absolute -top-1.5 right-2 w-1.5 h-3 bg-white/90 rounded-full shadow-sm border border-sky-100" />
            <span className="text-[10px] font-bold tracking-widest mb-0.5 drop-shadow-sm">今日</span>
            <span className="text-[10px] font-bold tracking-widest leading-none drop-shadow-sm">打卡</span>
          </div>
        </div>
        
        {/* Main Glass Card (Capsule) */}
        <div className="relative bg-gradient-to-b from-sky-50/80 to-sky-100/70 backdrop-blur-xl border-[3px] border-white/90 rounded-[32px] py-2.5 px-5 shadow-[0_8px_32px_rgba(14,165,233,0.15),inset_0_2px_4px_rgba(255,255,255,0.8)] flex flex-col">
          
          {/* Hanging Nails */}
          <div className="absolute -top-1.5 left-16 w-3 h-3 rounded-full bg-white shadow-sm border border-sky-200 z-20 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-sky-300" />
          </div>
          <div className="absolute -top-1.5 right-16 w-3 h-3 rounded-full bg-white shadow-sm border border-sky-200 z-20 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-sky-300" />
          </div>

          <div className="flex flex-row justify-between items-start w-full pl-6 pr-2 mt-1 gap-2">
            {/* Item 1 */}
            <div className="flex flex-col items-center gap-1.5 flex-1">
              <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 shadow-[0_3px_8px_rgba(249,115,22,0.4),inset_0_2px_0_rgba(255,255,255,0.4)] flex items-center justify-center border border-orange-300 z-10">
                <span className="text-white text-[13px] font-bold drop-shadow-sm">打卡</span>
              </div>
              <h1 className="text-[11px] font-black text-slate-700 tracking-tight text-center leading-tight">2026行测<br/>每日刷题</h1>
            </div>

            {/* Item 2 */}
            <div className="flex flex-col items-center gap-1.5 flex-1">
              <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 shadow-[0_3px_8px_rgba(249,115,22,0.4),inset_0_2px_0_rgba(255,255,255,0.4)] flex items-center justify-center border border-orange-300 z-10">
                <span className="text-white text-[13px] font-bold drop-shadow-sm">打卡</span>
              </div>
              <h1 className="text-[11px] font-black text-slate-700 tracking-tight text-center leading-tight">2026常识<br/>每日刷题</h1>
            </div>

            {/* Item 3 */}
            <div className="flex flex-col items-center gap-1.5 flex-1">
              <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 shadow-[0_3px_8px_rgba(249,115,22,0.4),inset_0_2px_0_rgba(255,255,255,0.4)] flex items-center justify-center border border-orange-300 z-10">
                <span className="text-white text-[13px] font-bold drop-shadow-sm">打卡</span>
              </div>
              <h1 className="text-[11px] font-black text-slate-700 tracking-tight text-center leading-tight">2026市政<br/>每日刷题</h1>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const FooterCTA = () => {
  return (
    <div className="absolute bottom-0 inset-x-0 z-30 pb-8 pt-12 px-6 flex justify-center pointer-events-none bg-gradient-to-t from-white/90 via-white/40 to-transparent rounded-b-[40px]">
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

const LevelNode = ({ level, x, y, angle }: { key?: React.Key; level: any, x: number, y: number, angle: number }) => {
  const isCurrent = level.status === 'current';
  const isCompletedDemo = level.date === '1.1';
  
  return (
    <div 
      className="absolute flex flex-col items-center justify-center"
      style={{ 
        left: `${x}px`, 
        top: `${y}px`, 
        zIndex: isCurrent ? 20 : 10,
        transform: `translate(-50%, -75%)`
      }}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative cursor-pointer flex flex-col items-center"
      >
        {isCompletedDemo ? (
          /* Completed State Demo (Flag) */
          <div className="relative z-20 -mb-1 flex flex-col items-center justify-center w-10 h-8">
            <svg viewBox="0 0 60 50" className="absolute inset-0 w-full h-full drop-shadow-md">
              {/* Flag Pole */}
              <rect x="12" y="5" width="4" height="45" fill="#cbd5e1" rx="2" />
              <circle cx="14" cy="5" r="4" fill="#fcd34d" />
              {/* Flag Cloth (Blue) */}
              <path d="M 16 10 C 30 5, 40 15, 55 10 L 50 30 C 35 35, 25 25, 16 30 Z" fill="#3b82f6" />
              <path d="M 16 10 C 30 5, 40 15, 55 10 L 50 15 C 35 20, 25 10, 16 15 Z" fill="#60a5fa" />
            </svg>
            <ThumbsUp className="absolute text-white w-3.5 h-3.5" style={{ left: '24px', top: '13px' }} strokeWidth={3} />
            
            {/* Date Badge */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap border border-white/20 shadow-sm">
              {level.date}
            </div>
          </div>
        ) : (
          /* Default State (Book) */
          <div className="relative z-20 -mb-1">
            <svg viewBox="0 0 60 50" className="w-10 h-8 drop-shadow-md">
               {/* Pages Right face */}
               <path d="M 30 24 L 50 14 L 50 24 L 30 34 Z" fill="#f8fafc" />
               <line x1="30" y1="26" x2="50" y2="16" stroke="#e2e8f0" strokeWidth="1" />
               <line x1="30" y1="29" x2="50" y2="19" stroke="#cbd5e1" strokeWidth="1" />
               <line x1="30" y1="32" x2="50" y2="22" stroke="#94a3b8" strokeWidth="1" />
               
               {/* Spine Left face */}
               <path d="M 10 14 L 30 24 L 30 34 L 10 24 Z" fill="#1d4ed8" />
               <line x1="12" y1="16" x2="28" y2="24" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
               
               {/* Cover Top face */}
               <path d="M 10 14 L 30 4 L 50 14 L 30 24 Z" fill="#3b82f6" />
               <path d="M 12 14 L 30 5 L 48 14 L 30 23 Z" fill="#60a5fa" />
               
               {/* Star */}
               <path d="M 30 10 L 32 14 L 36 14 L 33 17 L 34 21 L 30 19 L 26 21 L 27 17 L 24 14 L 28 14 Z" fill="#fef08a" />
            </svg>
            
            {/* Date Badge */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap border border-white/20 shadow-sm">
              {level.date}
            </div>
          </div>
        )}
        
        {/* Base (Circular) */}
        <div className="relative w-9 h-9 mt-2">
          {/* Bottom shadow/thickness */}
          <div className={`absolute inset-0 rounded-full translate-y-1 ${isCompletedDemo ? 'bg-[#b91c1c]' : 'bg-[#0891b2]'}`} />
          {/* Top surface */}
          <div className={`absolute inset-0 rounded-full border-[2px] flex items-center justify-center ${isCompletedDemo ? 'bg-[#ef4444] border-[#dc2626]' : 'bg-[#22d3ee] border-[#06b6d4]'}`}>
            <span className="text-white text-[9px] font-bold drop-shadow-sm">{isCompletedDemo ? '完成' : '打卡'}</span>
          </div>
        </div>
        
      </motion.div>
    </div>
  );
};

// Decorations

const Tree = ({ x, y, scale = 1 }: { key?: React.Key; x: number, y: number, scale?: number }) => (
  <div 
    className="absolute pointer-events-none"
    style={{ left: `${x}px`, top: `${y}px`, transform: `scale(${scale})` }}
  >
    {/* Simple SVG/CSS 2.5D Tree */}
    <div className="relative w-12 h-16 flex flex-col items-center justify-end drop-shadow-md">
       <div className="absolute top-0 w-12 h-12 bg-[#22c55e] rounded-full border-[3px] border-[#166534] shadow-[inset_-4px_-4px_0_rgba(0,0,0,0.15)] z-10" />
       <div className="w-3 h-6 bg-[#92400e] border-2 border-[#713f12] rounded-sm relative z-0" />
    </div>
  </div>
);

const Island = ({ x, y, scale = 1, flip = false }: { key?: React.Key; x: number, y: number, scale?: number, flip?: boolean }) => (
  <motion.div 
    className="absolute pointer-events-none"
    style={{ left: `${x}px`, top: `${y}px`, transform: `scale(${scale}) ${flip ? 'scaleX(-1)' : ''}` }}
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

const FloatingClock = ({ x, y, scale = 1 }: { key?: React.Key; x: number, y: number, scale?: number }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: `${x}px`, top: `${y}px`, transform: `scale(${scale})` }}
    animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: Math.random() }}
  >
    <div className="relative w-14 h-14">
      {/* Top bells */}
      <div className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-blue-300 border-b-2 border-blue-400" />
      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-blue-300 border-b-2 border-blue-400" />
      
      {/* 3D Clock Body */}
      <div className="absolute inset-0 rounded-full bg-blue-100 border-b-4 border-blue-300 shadow-[0_8px_16px_rgba(59,130,246,0.3)] flex items-center justify-center">
        <div className="absolute inset-1 rounded-full bg-white border-2 border-blue-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] flex items-center justify-center">
          {/* Clock hands */}
          <div className="absolute w-1.5 h-1.5 bg-blue-500 rounded-full z-10" />
          <div className="absolute w-1 h-3 bg-blue-600 rounded-full origin-bottom -translate-y-1.5 rotate-45" />
          <div className="absolute w-0.5 h-4 bg-red-400 rounded-full origin-bottom -translate-y-2 -rotate-12" />
          {/* Ticks */}
          <div className="absolute top-1 w-0.5 h-1.5 bg-blue-200 rounded-full" />
          <div className="absolute bottom-1 w-0.5 h-1.5 bg-blue-200 rounded-full" />
          <div className="absolute left-1 w-1.5 h-0.5 bg-blue-200 rounded-full" />
          <div className="absolute right-1 w-1.5 h-0.5 bg-blue-200 rounded-full" />
        </div>
      </div>
    </div>
  </motion.div>
);


const PineTree = ({ x, y, scale = 1, zIndex = 10, hasSnow = true }: { x: number, y: number, scale?: number, zIndex?: number, hasSnow?: boolean }) => (
  <div className="absolute drop-shadow-md" style={{ left: `${x}px`, top: `${y}px`, transform: `scale(${scale})`, zIndex }}>
    <svg width="80" height="100" viewBox="0 0 80 100">
      {/* Trunk */}
      <rect x="34" y="75" width="12" height="25" fill="#92400e" rx="2" />
      
      {/* Bottom Layer */}
      <path d="M 10 80 C 10 80, 40 90, 70 80 C 75 78, 75 72, 70 68 L 50 40 C 45 35, 35 35, 30 40 L 10 68 C 5 72, 5 78, 10 80 Z" fill="#22c55e" />
      
      {/* Middle Layer */}
      <path d="M 15 55 C 15 55, 40 65, 65 55 C 70 53, 70 47, 65 43 L 48 20 C 44 15, 36 15, 32 20 L 15 43 C 10 47, 10 53, 15 55 Z" fill="#4ade80" />
      
      {/* Top Layer */}
      <path d="M 22 32 C 22 32, 40 40, 58 32 C 62 30, 62 25, 58 21 L 45 5 C 42 1, 38 1, 35 5 L 22 21 C 18 25, 18 30, 22 32 Z" fill={hasSnow ? "#ffffff" : "#86efac"} />
      
      {/* Snow drips */}
      {hasSnow && (
        <>
          <circle cx="28" cy="33" r="3.5" fill="#ffffff" />
          <circle cx="40" cy="37" r="4.5" fill="#ffffff" />
          <circle cx="52" cy="33" r="3.5" fill="#ffffff" />
        </>
      )}
    </svg>
  </div>
);

const SchoolBuilding = ({ y }: { y: number }) => (
  <div className="absolute drop-shadow-2xl pointer-events-none" style={{ right: 0, top: `${y}px`, transform: 'translateX(45%)', zIndex: 15 }}>
    <img src="/building.png" alt="School Building" className="w-[160px] h-[180px] object-contain" />
  </div>
);

const ForestStart = ({ y }: { y: number }) => (
  <div className="absolute left-0 pointer-events-none" style={{ top: `${y - 130}px`, zIndex: 0, transform: 'scale(0.65)', transformOrigin: 'left center' }}>
    {/* Green Hill Base */}
    <div className="absolute w-[180px] h-[260px] bg-[#4ade80] rounded-r-full shadow-[inset_-8px_-8px_16px_rgba(22,163,74,0.3)]" style={{ top: 0, left: -100 }} />
    
    {/* Trees */}
    <PineTree x={-40} y={-10} scale={1.2} zIndex={2} hasSnow={true} />
    <PineTree x={10} y={50} scale={0.9} zIndex={3} hasSnow={false} />
    <PineTree x={-60} y={90} scale={1.1} zIndex={4} hasSnow={true} />
  </div>
);

const JourneyMap = () => {
  const START_DATE = new Date('2026-01-01T00:00:00Z');
  const END_DATE = new Date('2026-04-07T00:00:00Z');
  const TOTAL_DAYS = Math.floor((END_DATE.getTime() - START_DATE.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  const D = 100; // Distance between nodes
  const W = 200; // Width of straight segment
  const R = 200 / Math.PI; // Radius of arc
  const L_cycle = 2 * W + 2 * Math.PI * R;
  const startX = 95;
  const startY = 220;
  const END_OFFSET_Y = 240;

  const getPathPoint = React.useCallback((d: number) => {
    const cycleIndex = Math.floor(d / L_cycle);
    const rem = d % L_cycle;
    const baseY = startY + cycleIndex * 4 * R;

    if (rem <= W) {
      return { x: startX + rem, y: baseY, angle: 0 };
    } else if (rem <= W + Math.PI * R) {
      const arcDist = rem - W;
      const theta = arcDist / R;
      return {
        x: startX + W + R * Math.sin(theta),
        y: baseY + R - R * Math.cos(theta),
        angle: theta
      };
    } else if (rem <= 2 * W + Math.PI * R) {
      const straightDist = rem - (W + Math.PI * R);
      return {
        x: startX + W - straightDist,
        y: baseY + 2 * R,
        angle: Math.PI
      };
    } else {
      const arcDist = rem - (2 * W + Math.PI * R);
      const theta = arcDist / R;
      return {
        x: startX - R * Math.sin(theta),
        y: baseY + 3 * R - R * Math.cos(theta),
        angle: Math.PI - theta
      };
    }
  }, [L_cycle, R]);

  const nodes = React.useMemo(() => {
    return Array.from({ length: TOTAL_DAYS }).map((_, i) => {
      const d = new Date(END_DATE.getTime() - i * 24 * 60 * 60 * 1000);
      const pt = getPathPoint(i * D);
      return {
        id: `day-${i}`,
        date: `${d.getMonth() + 1}.${d.getDate()}`,
        status: i === 0 ? 'current' : 'completed',
        index: i,
        x: pt.x,
        y: pt.y,
        angle: pt.angle
      };
    });
  }, [getPathPoint]);

  const decorations = React.useMemo(() => {
    const decs = [];
    const numCycles = Math.ceil((TOTAL_DAYS * D) / L_cycle);
    for (let i = 0; i < numCycles; i++) {
      // Place decorations at the peak of the left arc, where the right side is empty
      const y = startY + i * 4 * R + 3 * R;
      const type = i % 3; // 0: Tree, 1: Island, 2: Clock
      decs.push({ id: i, y, type });
    }
    return decs;
  }, [startY, R, L_cycle, TOTAL_DAYS, D]);

  const totalHeight = nodes.length > 0 ? nodes[nodes.length - 1].y + END_OFFSET_Y : 1000;

  const pathD = React.useMemo(() => {
    const totalLength = (TOTAL_DAYS - 1) * D;
    if (totalLength <= 0) return '';
    
    let d = `M ${startX} ${startY}`;
    let currentD = 0;
    let cycleIndex = 0;

    while (currentD < totalLength) {
      const baseY = startY + cycleIndex * 4 * R;
      
      // Straight Right
      const remLength = totalLength - currentD;
      if (remLength <= W) {
        d += ` L ${startX + remLength} ${baseY}`;
        break;
      }
      d += ` L ${startX + W} ${baseY}`;
      currentD += W;

      // Arc Right
      const remLength2 = totalLength - currentD;
      if (remLength2 <= Math.PI * R) {
        const pt = getPathPoint(totalLength);
        d += ` A ${R} ${R} 0 0 1 ${pt.x} ${pt.y}`;
        break;
      }
      d += ` A ${R} ${R} 0 0 1 ${startX + W} ${baseY + 2 * R}`;
      currentD += Math.PI * R;

      // Straight Left
      const remLength3 = totalLength - currentD;
      if (remLength3 <= W) {
        d += ` L ${startX + W - remLength3} ${baseY + 2 * R}`;
        break;
      }
      d += ` L ${startX} ${baseY + 2 * R}`;
      currentD += W;

      // Arc Left
      const remLength4 = totalLength - currentD;
      if (remLength4 <= Math.PI * R) {
        const pt = getPathPoint(totalLength);
        d += ` A ${R} ${R} 0 0 0 ${pt.x} ${pt.y}`;
        break;
      }
      d += ` A ${R} ${R} 0 0 0 ${startX} ${baseY + 4 * R}`;
      currentD += Math.PI * R;

      cycleIndex++;
    }
    return d;
  }, [getPathPoint]);

  return (
    <div 
      className="relative w-full max-w-[428px] mx-auto min-h-screen" 
      style={{ height: `${totalHeight}px` }}
    >
      <ForestStart y={280} />
      
      {/* SVG Path Background */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-lg"
        style={{ minHeight: `${totalHeight}px` }}
      >
        {/* Path shadow / border */}
        <path 
          d={pathD}
          fill="none"
          stroke="#fde68a" // amber-200
          strokeWidth="32"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Inner locked path */}
        <path 
          d={pathD}
          fill="none"
          stroke="#fef3c7" // amber-50
          strokeWidth="24"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Dashed line effect on top of the road to make it look like a map */}
        <path 
          d={pathD}
          fill="none"
          stroke="#fcd34d" // amber-300
          strokeWidth="2"
          strokeDasharray="8 8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* School Building at the bottom right (50% visible via transform) */}
      {nodes.length > 0 && (
        <SchoolBuilding 
          y={nodes[nodes.length - 1].y - 140} 
        />
      )}

      {/* Render Decorations (Trees on left, others on right) */}
      {(() => {
        const lastClockId = Math.max(...decorations.filter(d => d.type === 2).map(d => d.id));
        const lastTreeId = Math.max(...decorations.filter(d => d.type === 0).map(d => d.id));
        return decorations.map(dec => {
          if (dec.type === 0) {
            if (dec.id === 0) return null; // Skip the first tree on the left
            if (dec.id === lastTreeId) return null; // Skip the bottom-most tree
            return <Tree key={`dec-${dec.id}`} x={20} y={dec.y - 160} scale={0.9} />;
          }
          if (dec.type === 1) return <Island key={`dec-${dec.id}`} x={310} y={dec.y - 20} scale={0.8} flip />;
          
          if (dec.type === 2 && dec.id === lastClockId) return null; // Skip the bottom-most clock
          
          return <FloatingClock key={`dec-${dec.id}`} x={340} y={dec.y - 30} scale={0.45} />;
        });
      })()}

      {/* Render Nodes */}
      {nodes.map(node => (
        <LevelNode key={node.id} level={node} x={node.x} y={node.y} angle={node.angle} />
      ))}
    </div>
  );
};

const TeamUpIcon = () => {
  return (
    <div 
      className="absolute bottom-[12%] right-0 z-50 flex items-end"
      style={{ transform: 'scale(0.5)', transformOrigin: 'bottom right' }}
    >
      {/* Main Content */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-col items-center relative"
      >
        {/* Characters & Flag Container */}
        <div className="relative h-[55px] w-[140px] flex justify-center items-end -mb-[2px] z-10 pointer-events-none">
          
          {/* Light Blue Background Shape */}
          <div className="absolute left-[5%] bottom-0 w-[60%] h-[110%] bg-[#b3e5fc] rounded-t-[30px] border-[2.5px] border-[#1e293b] z-0">
            {/* White highlight on the glass */}
            <div className="absolute top-2 left-2 w-2 h-6 bg-white/60 rounded-full rotate-12"></div>
            <div className="absolute top-9 left-1.5 w-2 h-2 bg-white/60 rounded-full"></div>
          </div>

          {/* Yellow Spark behind Girl */}
          <svg width="30" height="30" viewBox="0 0 100 100" className="absolute left-[-2%] bottom-[30%] z-10">
            <path d="M 50 50 L 10 20 L 40 45 L 5 60 L 40 65 L 20 95 L 55 70 Z" fill="#ffeb3b" stroke="#1e293b" strokeWidth="4" strokeLinejoin="round" />
          </svg>

          {/* Girl */}
          <svg width="50" height="55" viewBox="0 0 100 100" className="absolute left-[8%] bottom-0 overflow-visible z-20">
            {/* Hair Back */}
            <path d="M 20 50 Q 15 80 20 90 L 80 90 Q 85 80 80 50 Z" fill="#111" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" />
            {/* Body */}
            <path d="M 30 100 L 30 85 Q 50 75 70 85 L 70 100 Z" fill="#ff8a80" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" />
            {/* Head */}
            <path d="M 25 50 Q 25 20 50 20 Q 75 20 75 50 Q 75 75 50 75 Q 25 75 25 50 Z" fill="#ffe0b2" stroke="#1e293b" strokeWidth="3" />
            {/* Hair Front */}
            <path d="M 25 50 Q 25 15 50 15 Q 75 15 75 50 Q 65 25 45 25 Q 35 25 25 50 Z" fill="#111" />
            {/* Hair Highlight */}
            <path d="M 32 25 Q 38 22 42 25" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            {/* Face */}
            <circle cx="40" cy="55" r="3" fill="#1e293b" />
            <circle cx="60" cy="55" r="3" fill="#1e293b" />
            <path d="M 46 62 Q 50 66 54 62" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
            <circle cx="32" cy="60" r="4" fill="#ff5252" opacity="0.4" />
            <circle cx="68" cy="60" r="4" fill="#ff5252" opacity="0.4" />
          </svg>

          {/* Boy */}
          <svg width="50" height="55" viewBox="0 0 100 100" className="absolute left-[40%] bottom-0 overflow-visible z-10">
            {/* Headband Ties Outline */}
            <g stroke="#1e293b" strokeWidth="6" strokeLinecap="round">
              <line x1="75" y1="38" x2="95" y2="25" />
              <line x1="75" y1="38" x2="90" y2="48" />
            </g>
            {/* Headband Ties Fill */}
            <g stroke="#ea580c" strokeWidth="3" strokeLinecap="round">
              <line x1="75" y1="38" x2="95" y2="25" />
              <line x1="75" y1="38" x2="90" y2="48" />
            </g>
            {/* Body */}
            <path d="M 30 100 L 30 85 Q 50 75 70 85 L 70 100 Z" fill="#3f51b5" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" />
            {/* Head */}
            <path d="M 25 50 Q 25 20 50 20 Q 75 20 75 50 Q 75 75 50 75 Q 25 75 25 50 Z" fill="#ffe0b2" stroke="#1e293b" strokeWidth="3" />
            {/* Hair */}
            <path d="M 20 45 Q 20 10 50 10 Q 80 10 80 45 Q 65 15 45 25 Q 30 25 20 45 Z" fill="#111" />
            {/* Headband */}
            <path d="M 23 40 Q 50 30 77 40" fill="none" stroke="#ea580c" strokeWidth="5" />
            {/* Face */}
            <circle cx="40" cy="55" r="3" fill="#1e293b" />
            <circle cx="60" cy="55" r="3" fill="#1e293b" />
            <path d="M 46 62 Q 50 66 54 62" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
            <circle cx="32" cy="60" r="4" fill="#ff5252" opacity="0.4" />
            <circle cx="68" cy="60" r="4" fill="#ff5252" opacity="0.4" />
          </svg>

          {/* Flag */}
          <svg width="35" height="50" viewBox="0 0 50 100" className="absolute right-[2%] bottom-0 overflow-visible z-0">
            {/* Pole */}
            <line x1="10" y1="20" x2="10" y2="100" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
            <line x1="10" y1="20" x2="10" y2="100" stroke="#795548" strokeWidth="2" strokeLinecap="round" />
            {/* Flag Cloth */}
            <path d="M 10 20 L 45 35 L 10 50 Z" fill="#ef4444" stroke="#1e293b" strokeWidth="2" strokeLinejoin="round" />
            {/* Star */}
            <path d="M 20 28 L 22 33 L 27 33 L 23 36 L 24 41 L 20 38 L 16 41 L 17 36 L 13 33 L 18 33 Z" fill="#fde047" />
          </svg>
        </div>

        {/* Button Base */}
        <div className="relative rounded-[16px] border-[2.5px] border-[#1e293b] bg-[#ea580c] pb-[5px] w-[150px]">
          {/* Left Hand */}
          <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-6 bg-[#ffe0b2] border-[2.5px] border-[#1e293b] rounded-l-full z-20"></div>
          {/* Right Hand */}
          <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-6 bg-[#ffe0b2] border-[2.5px] border-[#1e293b] rounded-r-full z-20"></div>
          
          {/* Inner Button */}
          <div className="bg-[#fbbf24] rounded-[13px] px-2 py-2 flex items-center justify-center gap-1 border-b-[2px] border-transparent relative overflow-hidden">
            
            {/* Text Accents */}
            <div className="absolute top-1.5 left-[32px] w-3 h-1.5 bg-[#fef08a] rounded-full rotate-[-15deg]"></div>
            <div className="absolute top-1.5 right-[52px] w-2.5 h-2.5 bg-[#86efac] border-[1.5px] border-[#1e293b] rounded-full"></div>

            <span 
              className="text-white font-black text-[18px] tracking-widest relative z-10" 
              style={{ 
                WebkitTextStroke: '2px #ea580c', 
                textShadow: '0 2px 0 #ea580c' 
              }}
            >
              <span className="relative z-20" style={{ WebkitTextStroke: '0px', textShadow: 'none' }}>打卡分享</span>
              <span className="absolute left-0 top-0 -z-10" style={{ WebkitTextStroke: '4px #ea580c' }}>打卡分享</span>
            </span>
            
            {/* Arrow Icon */}
            <div className="w-[20px] h-[20px] bg-white border-[2.5px] border-[#1e293b] rounded-full flex items-center justify-center shrink-0 ml-1 z-10">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </motion.button>
    </div>
  );
};

function NoteRecordsPage({ onBack }: { onBack: () => void }) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    'l1': true,
    'l2': true,
    'l3': true,
    'l4': true,
  });

  const toggleExpand = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="absolute top-0 bottom-0 left-0 w-full bg-[#F7F7F7] flex flex-col z-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white px-4 h-12 flex items-center justify-between sticky top-0 z-10">
        <ChevronLeft className="w-6 h-6 text-black/90 cursor-pointer" onClick={onBack} />
        <span className="text-[17px] font-bold text-black/90">笔记记录</span>
        <div className="flex items-center justify-between w-[87px] h-[32px] rounded-full border border-black/10 bg-white px-2.5">
          <button className="flex items-center justify-center text-black active:opacity-50 transition-opacity">
            <MoreHorizontal className="w-[18px] h-[18px]" />
          </button>
          <div className="w-[1px] h-[18px] bg-black/10"></div>
          <button className="flex items-center justify-center text-black active:opacity-50 transition-opacity">
            <CircleDot className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>

      {/* Sub-header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-black/5">
        <div className="relative">
          <span className="text-[16px] font-bold text-black/90">公务员-行测</span>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-1 bg-blue-500 rounded-full"></div>
        </div>
        <div className="border border-blue-500 text-blue-500 text-[13px] px-3 py-1 rounded-full flex items-center gap-1">
          不限 <ChevronRight className="w-3 h-3" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 pb-24">
        <div className="bg-white rounded-2xl p-4">
          {/* Level 1 */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {expanded['l1'] ? (
                <MinusCircle className="w-6 h-6 text-blue-500 fill-blue-500 text-white cursor-pointer" onClick={() => toggleExpand('l1')} />
              ) : (
                <PlusCircle className="w-6 h-6 text-blue-500 fill-blue-500 text-white cursor-pointer" onClick={() => toggleExpand('l1')} />
              )}
              <div>
                <div className="text-[16px] text-black/90">数量关系</div>
                <div className="text-[12px] text-black/40 mt-0.5">共1道题</div>
              </div>
            </div>
            <ChevronRight className={`w-5 h-5 text-black/30 transition-transform ${expanded['l1'] ? 'rotate-90' : ''}`} />
          </div>

          {expanded['l1'] && (
            <>
              {/* Level 2 */}
              <div className="pl-8 mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {expanded['l2'] ? (
                    <MinusCircle className="w-6 h-6 text-blue-500 fill-blue-500 text-white cursor-pointer" onClick={() => toggleExpand('l2')} />
                  ) : (
                    <PlusCircle className="w-6 h-6 text-blue-500 fill-blue-500 text-white cursor-pointer" onClick={() => toggleExpand('l2')} />
                  )}
                  <span className="text-[15px] text-black/90">数学运算</span>
                </div>
                <span className="text-[13px] text-black/40">1题</span>
              </div>

              {expanded['l2'] && (
                <>
                  {/* Level 3 */}
                  <div className="pl-16 mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {expanded['l3'] ? (
                        <MinusCircle className="w-6 h-6 text-blue-500 fill-blue-500 text-white cursor-pointer" onClick={() => toggleExpand('l3')} />
                      ) : (
                        <PlusCircle className="w-6 h-6 text-blue-500 fill-blue-500 text-white cursor-pointer" onClick={() => toggleExpand('l3')} />
                      )}
                      <span className="text-[15px] text-black/90">方法篇</span>
                    </div>
                    <span className="text-[13px] text-black/40">1题</span>
                  </div>

                  {expanded['l3'] && (
                    <>
                      {/* Level 4 */}
                      <div className="pl-24 mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {expanded['l4'] ? (
                            <MinusCircle className="w-6 h-6 text-blue-500 fill-blue-500 text-white cursor-pointer" onClick={() => toggleExpand('l4')} />
                          ) : (
                            <PlusCircle className="w-6 h-6 text-blue-500 fill-blue-500 text-white cursor-pointer" onClick={() => toggleExpand('l4')} />
                          )}
                          <span className="text-[15px] text-black/90">方程法</span>
                        </div>
                        <span className="text-[13px] text-black/40">1题</span>
                      </div>

                      {expanded['l4'] && (
                        /* Level 5 */
                        <div className="pl-32 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <MinusCircle className="w-6 h-6 text-blue-500 fill-blue-500 text-white" />
                            <span className="text-[15px] text-black/90">不定方程</span>
                          </div>
                          <span className="text-[13px] text-black/40">1���</span>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Bottom Action */}
      <div className="absolute bottom-0 w-full bg-[#F7F7F7] px-4 py-4 z-50 flex justify-center" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
        <button className="w-full max-w-[280px] bg-blue-500 text-white text-[16px] font-medium py-3.5 rounded-full active:opacity-80 transition-opacity">
          导出
        </button>
      </div>
    </div>
  );
}
function DailyPracticePage({ onBack }: { onBack: () => void }) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col overflow-hidden bg-[#bae6fd]">
      <Background />
      <Header onBack={onBack} />
      
      <div className="flex-1 overflow-y-auto relative hide-scrollbar">
        <JourneyMap />
        <TeamUpIcon />
      </div>
    </div>
  );
}

function WrongQuestionsPage({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<'knowledge' | 'paper'>('knowledge');
  
  return (
    <div className="absolute top-0 bottom-0 left-0 w-full bg-[#F7F7F7] flex flex-col z-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white px-4 h-12 flex items-center justify-between sticky top-0 z-10">
        <ChevronLeft className="w-6 h-6 text-black/90 cursor-pointer" onClick={onBack} />
        <span className="text-[17px] font-bold text-black/90">线上错题</span>
        <div className="w-6"></div>
      </div>

      {/* Tabs */}
      <div className="bg-white px-4 py-2 flex items-center gap-6">
        <div 
          className={`cursor-pointer text-[16px] transition-all ${activeTab === 'knowledge' ? 'text-black font-bold' : 'text-black/40 font-medium'}`}
          onClick={() => setActiveTab('knowledge')}
        >
          知识点
          <div className={`h-1 rounded-full mt-1 w-6 mx-auto ${activeTab === 'knowledge' ? 'bg-blue-500' : 'bg-transparent'}`}></div>
        </div>
        <div 
          className={`cursor-pointer text-[16px] transition-all ${activeTab === 'paper' ? 'text-black font-bold' : 'text-black/40 font-medium'}`}
          onClick={() => setActiveTab('paper')}
        >
          试卷
          <div className={`h-1 rounded-full mt-1 w-6 mx-auto ${activeTab === 'paper' ? 'bg-blue-500' : 'bg-transparent'}`}></div>
        </div>
        <div className="ml-auto flex gap-4">
          <Download className="w-5 h-5 text-black/60" />
          <Settings className="w-5 h-5 text-black/60" />
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 py-3 flex gap-3">
        <div className="bg-blue-50 text-blue-500 text-[13px] px-3 py-1 rounded-full flex items-center gap-1">
          公务员-行测 <ChevronDown className="w-3 h-3" />
        </div>
        <div className="bg-gray-100 text-black/60 text-[13px] px-3 py-1 rounded-full flex items-center gap-1">
          不限 <ChevronDown className="w-3 h-3" />
        </div>
        <div className="bg-gray-100 text-black/60 text-[13px] px-3 py-1 rounded-full flex items-center gap-1">
          新添加在前 <ChevronDown className="w-3 h-3" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 pb-24">
        {activeTab === 'knowledge' ? (
          <div className="space-y-3">
            {[
              { title: '数量关系', count: 12, icon: 'plus' },
              { title: '政治理论', count: 30, icon: 'minus' },
              { title: '常识判断', count: 3, icon: 'plus' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {item.icon === 'plus' ? <PlusCircle className="w-6 h-6 text-blue-500" /> : <MinusCircle className="w-6 h-6 text-blue-500" />}
                  <span className="font-medium text-black/90">{item.title}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-black/40 text-[14px]">{item.count}</span>
                  <Edit2 className="w-4 h-4 text-blue-500" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {[
              '行测自测1.1',
              '2025年湖北省公务员录用考试《行测》题（网友回忆版）',
              '【抢先版副省级】2026年国家公务员考试《行政职业能力测验》考试试题（考生回忆版）',
              '2026年国家公务员录用考试《行政职业能力测验》副省级（考生回忆版）'
            ].map((title, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl">
                <h3 className="font-medium text-black/90 mb-2 leading-snug">{title}</h3>
                <div className="flex justify-between text-[12px] text-black/30">
                  <span>2026-04-03 07:42:33</span>
                  <span className="text-orange-500">12题</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div 
        className="absolute bottom-0 w-full bg-white border-t border-black/5 px-4 py-2 z-50 flex justify-around items-center"
        style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
      >
        <div className="flex flex-col items-center gap-1 cursor-pointer">
          <BookOpen className="w-6 h-6 text-blue-500" />
          <span className="text-[11px] text-blue-500 font-bold">线上错题</span>
        </div>
        <div className="flex flex-col items-center gap-1 cursor-pointer">
          <FileText className="w-6 h-6 text-black/30" />
          <span className="text-[11px] text-black/30 font-medium">线下错题</span>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [currentTab, setCurrentTab] = useState(1);
  const [currentView, setCurrentView] = useState<'main' | 'quiz' | 'material-quiz' | 'report' | 'past-papers' | 'region-past-papers' | 'speed-calc' | 'speed-calc-practice' | 'speed-calc-report' | 'material-speed-calc-advanced' | 'full-set-practice' | 'full-set-detail' | 'search' | 'idiom-practice' | 'vocabulary-practice' | 'public-basic-points' | 'current-affairs' | 'daily-practice' | 'wrong-questions' | 'note-records' | 'my-collections' | 'learning-report' | 'practice-records' | 'personal-info' | 'my-homework' | 'my-mock-exams' | 'quick-practice-records' | 'login'>('main');
  const [selectedRegion, setSelectedRegion] = useState<string>('');

  const handleStartQuiz = (type: 'normal' | 'material') => {
    setCurrentView(type === 'material' ? 'material-quiz' : 'quiz');
  };

  const handleSubmitQuiz = () => {
    setCurrentView('report');
  };

  return (
    <div className="bg-[#F7F7F7] h-screen flex flex-col font-sans overflow-hidden">
      <div className="relative z-10 flex-1 overflow-y-auto hide-scrollbar">

        {currentView === 'quiz' && <QuizPage onBack={() => setCurrentView('main')} onSubmit={handleSubmitQuiz} />}
        {currentView === 'material-quiz' && <MaterialQuizPage onBack={() => setCurrentView('main')} onSubmit={handleSubmitQuiz} />}
        {currentView === 'report' && <QuizReportPage onBack={() => setCurrentView('main')} onHome={() => setCurrentView('main')} onRestart={() => setCurrentView('quiz')} />}
        {currentView === 'speed-calc' && <SpeedCalculationPage onBack={() => setCurrentView('main')} onStartPractice={() => setCurrentView('speed-calc-practice')} />}
        {currentView === 'speed-calc-practice' && <SpeedCalculationPracticePage onBack={() => setCurrentView('speed-calc')} onHome={() => setCurrentView('main')} onFinish={() => setCurrentView('speed-calc-report')} />}
        {currentView === 'speed-calc-report' && <SpeedCalculationReportPage onBack={() => setCurrentView('speed-calc')} onHome={() => setCurrentView('main')} onRestart={() => setCurrentView('speed-calc-practice')} />}
        {currentView === 'material-speed-calc-advanced' && <MaterialSpeedCalcAdvancedPage onBack={() => setCurrentView('main')} />}
        {currentView === 'full-set-practice' && <FullSetPracticePage onBack={() => setCurrentView('main')} onNavigateToDetail={() => setCurrentView('full-set-detail')} />}
        {currentView === 'full-set-detail' && <FullSetDetailPage onBack={() => setCurrentView('full-set-practice')} onStartQuiz={handleStartQuiz} />}
        {currentView === 'search' && <SearchPage onBack={() => setCurrentView('main')} />}
        {currentView === 'idiom-practice' && <IdiomPracticePage onBack={() => setCurrentView('main')} onHome={() => setCurrentView('main')} />}
        {currentView === 'vocabulary-practice' && <VocabularyPracticePage onBack={() => setCurrentView('main')} onHome={() => setCurrentView('main')} />}
        {currentView === 'public-basic-points' && <PublicBasicPointsPage onBack={() => setCurrentView('main')} onHome={() => setCurrentView('main')} />}
        {currentView === 'current-affairs' && <CurrentAffairsPage onBack={() => setCurrentView('main')} />}
        {currentView === 'daily-practice' && <DailyPracticePage onBack={() => setCurrentView('main')} />}
        {currentView === 'learning-report' && <LearningReportPage onBack={() => setCurrentView('main')} />}
        {currentView === 'practice-records' && <PracticeRecordsPage onBack={() => setCurrentView('main')} />}
        {currentView === 'personal-info' && <PersonalInfoPage onBack={() => setCurrentView('main')} onLogout={() => setCurrentView('login')} />}
        {currentView === 'my-collections' && <MyCollectionsPage onBack={() => setCurrentView('main')} />}
        {currentView === 'my-homework' && <MyHomeworkPage onBack={() => setCurrentView('main')} />}
        {currentView === 'my-mock-exams' && <MyMockExamsPage onBack={() => setCurrentView('main')} />}
        {currentView === 'quick-practice-records' && <QuickPracticeRecordsPage onBack={() => setCurrentView('main')} />}
        {currentView === 'wrong-questions' && <WrongQuestionsPage onBack={() => setCurrentView('main')} />}
        {currentView === 'note-records' && <NoteRecordsPage onBack={() => setCurrentView('main')} />}
        {currentView === 'past-papers' && (
          <PastPapersPage 
            onBack={() => setCurrentView('main')} 
            onSelectRegion={(region) => {
              setSelectedRegion(region);
              setCurrentView('region-past-papers');
            }} 
          />
        )}
        {currentView === 'region-past-papers' && (
          <RegionPastPapersPage 
            region={selectedRegion} 
            onBack={() => setCurrentView('past-papers')} 
          />
        )}
        {currentView === 'login' && (
          <LoginPage 
            onLogin={() => setCurrentView('main')} 
            onSkip={() => setCurrentView('main')} 
          />
        )}
        {currentView === 'main' && (
          <>
            {currentTab === 1 && <HomeTab onStartQuiz={handleStartQuiz} onNavigateToPastPapers={() => setCurrentView('past-papers')} onNavigateToFullSetPractice={() => setCurrentView('full-set-practice')} onNavigateToSearch={() => setCurrentView('search')} onNavigateToCurrentAffairs={() => setCurrentView('current-affairs')} onNavigateToDailyPractice={() => setCurrentView('daily-practice')} />}
            {currentTab === 3 && <QuickPracticeTab onStartQuiz={handleStartQuiz} onNavigateToSpeedCalc={() => setCurrentView('speed-calc')} onNavigateToMaterialSpeedCalcAdvanced={() => setCurrentView('material-speed-calc-advanced')} onNavigateToIdiomPractice={() => setCurrentView('idiom-practice')} onNavigateToVocabularyPractice={() => setCurrentView('vocabulary-practice')} onNavigateToPublicBasicPoints={() => setCurrentView('public-basic-points')} />}
            {currentTab === 4 && <RecitationTab />}
            {currentTab === 5 && <MineTab onNavigateToWrongQuestions={() => setCurrentView('wrong-questions')} onNavigateToNoteRecords={() => setCurrentView('note-records')} onNavigateToMyCollections={() => setCurrentView('my-collections')} onNavigateToLearningReport={() => setCurrentView('learning-report')} onNavigateToPracticeRecords={() => setCurrentView('practice-records')} onNavigateToPersonalInfo={() => setCurrentView('personal-info')} onNavigateToMyHomework={() => setCurrentView('my-homework')} onNavigateToMyMockExams={() => setCurrentView('my-mock-exams')} onNavigateToQuickPracticeRecords={() => setCurrentView('quick-practice-records')} />}
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      {currentView === 'main' && (
        <footer 
          className="w-full bg-white/80 backdrop-blur-lg border-t border-black/5 px-4 py-2 z-50 shrink-0"
          style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
        >
        <div className="flex justify-around items-center">
          {bottomNav.map((nav) => {
            const isActive = currentTab === nav.id;
            const Icon = isActive ? nav.activeIcon : nav.icon;
            return (
              <div 
                key={nav.id} 
                onClick={() => setCurrentTab(nav.id)}
                className="flex flex-col items-center gap-1 cursor-pointer group"
              >
                <div className={`p-2 rounded-xl transition-all duration-300 ${isActive ? 'bg-blue-50 text-blue-500 scale-110' : 'text-black/30 group-hover:text-black/50'}`}>
                  <Icon className="w-[22px] h-[22px]" />
                </div>
                <span className={`text-[11px] transition-all duration-300 ${isActive ? 'text-blue-500 font-bold' : 'text-black/30 font-medium group-hover:text-black/50'}`}>{nav.title}</span>
              </div>
            );
          })}
        </div>
        {/* Home Indicator */}
        <div className="w-1/3 h-1 bg-black/10 rounded-full mx-auto mt-2"></div>
      </footer>
      )}
    </div>
  );
}
