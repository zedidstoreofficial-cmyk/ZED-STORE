import React from 'react';
import { ShieldCheck, Zap, Globe, Lock, AlertTriangle, Cpu, Command, Target, Flower2, Ban } from 'lucide-react';

export default function TrustAnimation() {
  return (
    <section className="animate-entry delay-200 [animation:animationIn_0.8s_ease-out_0.1s_both] animate-on-scroll animate lg:mx-auto bg-gradient-to-br from-white/10 via-white/0 to-white/10 max-w-7xl rounded-3xl mt-24 mr-auto mb-24 ml-auto pt-10 pr-10 pb-10 pl-10 relative border border-white/5" style={{ position: 'relative', '--border-radius-before': '24px' } as React.CSSProperties}>
      <div className="flex flex-col rounded-none mt-0 mb-0 pt-0 pr-0 pb-0 pl-0 relative">
        <div className="flex flex-col gap-10 w-full gap-x-10 gap-y-10">
          <div className="flex items-center gap-6">
            <span className="text-xs font-mono text-blue-400 tracking-widest font-sans">
              02
            </span>
            <div className="h-px flex-1 bg-white/10"></div>
            <span className="uppercase text-xs tracking-widest text-gray-500 font-sans">
              Our Approach
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            <div className="max-w-3xl flex flex-col gap-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-white font-sans font-bold tracking-tighter">
                AI powered Platform
                <span className="block text-gray-400 font-serif italic font-light">
                  To Monitor scams
                </span>
              </h2>

              <p className="text-lg text-gray-400 font-light max-w-xl leading-relaxed font-sans">
                Our platform utilizes advanced AI algorithms to monitor every transaction in real-time. This eliminates the possibility of scams, protects your assets, and ensures a seamless experience with zero risk.
              </p>
            </div>

            <button className="group flex items-center gap-2 px-6 py-3 border border-white/15 text-white text-sm font-medium rounded-full hover:bg-white/5 transition font-sans whitespace-nowrap">
              <span>Explore Features</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition-transform group-hover:translate-x-1">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="min-h-[560px] flex md:mt-0 w-full max-w-6xl mt-16 mr-auto ml-auto pr-4 pl-4 relative items-center justify-center">
        <svg className="absolute inset-0 hidden h-full w-full pointer-events-none md:block" viewBox="0 0 1000 560" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="wire" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.00"></stop>
              <stop offset="25%" stopColor="#ffffff" stopOpacity="0.15"></stop>
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.25"></stop>
              <stop offset="75%" stopColor="#ffffff" stopOpacity="0.15"></stop>
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.00"></stop>
            </linearGradient>

            <linearGradient id="noodleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0"></stop>
              <stop offset="50%" stopColor="#a5b4fc" stopOpacity="1"></stop>
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0"></stop>
            </linearGradient>

            <filter id="wireGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2" result="blur"></feGaussianBlur>
              <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.3 0" result="glow">
              </feColorMatrix>
              <feMerge>
                <feMergeNode in="glow"></feMergeNode>
                <feMergeNode in="SourceGraphic"></feMergeNode>
              </feMerge>
            </filter>

            <filter id="dotGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.5" result="blur"></feGaussianBlur>
              <feMerge>
                <feMergeNode in="blur"></feMergeNode>
                <feMergeNode in="SourceGraphic"></feMergeNode>
              </feMerge>
            </filter>
          </defs>

          <path d="M 165 130 L 290 130 Q 360 130 360 200 V 255 Q 360 280 390 280 L 440 280" stroke="url(#wire)" strokeWidth="1.5" fill="none" filter="url(#wireGlow)" opacity="0.5"></path>
          <path d="M 165 430 L 290 430 Q 360 430 360 360 V 305 Q 360 280 390 280 L 440 280" stroke="url(#wire)" strokeWidth="1.5" fill="none" filter="url(#wireGlow)" opacity="0.5"></path>
          <path d="M 229 280 L 440 280" stroke="url(#wire)" strokeWidth="1.5" fill="none" filter="url(#wireGlow)" opacity="0.5"></path>
          <path d="M 440 280 L 560 280" stroke="url(#wire)" strokeWidth="1.5" fill="none" filter="url(#wireGlow)" opacity="0.3"></path>
          <path d="M 560 280 L 771 280" stroke="url(#wire)" strokeWidth="1.5" fill="none" filter="url(#wireGlow)" opacity="0.5"></path>
          <path d="M 835 130 L 710 130 Q 640 130 640 200 V 255 Q 640 280 610 280 L 560 280" stroke="url(#wire)" strokeWidth="1.5" fill="none" filter="url(#wireGlow)" opacity="0.5"></path>
          <path d="M 835 430 L 710 430 Q 640 430 640 360 V 305 Q 640 280 610 280 L 560 280" stroke="url(#wire)" strokeWidth="1.5" fill="none" filter="url(#wireGlow)" opacity="0.5"></path>

          <path d="M 165 130 L 290 130 Q 360 130 360 200 V 255 Q 360 280 390 280 L 440 280" stroke="url(#noodleGradient)" strokeWidth="2" fill="none" filter="url(#wireGlow)" className="animate-noodle">
          </path>
          <path d="M 165 430 L 290 430 Q 360 430 360 360 V 305 Q 360 280 390 280 L 440 280" stroke="url(#noodleGradient)" strokeWidth="2" fill="none" filter="url(#wireGlow)" className="animate-noodle">
          </path>
          <path d="M 229 280 L 440 280" stroke="url(#noodleGradient)" strokeWidth="2" fill="none" filter="url(#wireGlow)" className="animate-noodle-delayed"></path>

          <path d="M 835 130 L 710 130 Q 640 130 640 200 V 255 Q 640 280 610 280 L 560 280" stroke="url(#noodleGradient)" strokeWidth="2" fill="none" filter="url(#wireGlow)" className="animate-noodle">
          </path>
          <path d="M 835 430 L 710 430 Q 640 430 640 360 V 305 Q 640 280 610 280 L 560 280" stroke="url(#noodleGradient)" strokeWidth="2" fill="none" filter="url(#wireGlow)" className="animate-noodle">
          </path>

          <path d="M 440 280 L 560 280" stroke="url(#noodleGradient)" strokeWidth="2" fill="none" filter="url(#wireGlow)" className="animate-noodle-delayed"></path>
          <path d="M 560 280 L 771 280" stroke="url(#noodleGradient)" strokeWidth="2" fill="none" filter="url(#wireGlow)" className="animate-noodle-delayed"></path>

          <circle cx="440" cy="280" r="3" fill="#818cf8" filter="url(#dotGlow)" className="animate-pulse"></circle>
          <circle cx="560" cy="280" r="3" fill="#818cf8" filter="url(#dotGlow)" className="animate-pulse"></circle>
        </svg>

        <div className="relative z-10 grid h-full w-full grid-cols-1 gap-14 md:grid-cols-3 md:gap-0">
          <div className="flex h-full flex-row items-center justify-center gap-6 px-4 md:flex-col md:gap-14 md:px-12">
            <div className="group relative">
              <div className="absolute inset-0 rounded-full blur-2xl opacity-0 transition-opacity group-hover:opacity-100 bg-[radial-gradient(circle,_rgba(249,115,22,0.25),_transparent_60%)]">
              </div>
              <div className="relative flex h-[76px] w-[76px] items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-transform duration-300 group-hover:scale-[1.06] md:h-[92px] md:w-[92px]">
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%)]">
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400 drop-shadow-[0_0_12px_rgba(249,115,22,0.4)]">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="m4.9 4.9 14.2 14.2"></path>
                </svg>
              </div>
            </div>

            <div className="group relative md:translate-x-16">
              <div className="absolute inset-0 rounded-full blur-2xl opacity-0 transition-opacity group-hover:opacity-100 bg-[radial-gradient(circle,_rgba(234,88,12,0.25),_transparent_60%)]">
              </div>
              <div className="relative flex h-[76px] w-[76px] items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-transform duration-300 group-hover:scale-[1.06] md:h-[92px] md:w-[92px]">
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%)]">
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500 drop-shadow-[0_0_12px_rgba(234,88,12,0.4)]">
                  <path d="M12 6v12"></path>
                  <path d="M17.196 9 6.804 15"></path>
                  <path d="m6.804 9 10.392 6"></path>
                </svg>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 rounded-full blur-2xl opacity-0 transition-opacity group-hover:opacity-100 bg-[radial-gradient(circle,_rgba(59,130,246,0.25),_transparent_60%)]">
              </div>
              <div className="relative flex h-[76px] w-[76px] items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-transform duration-300 group-hover:scale-[1.06] md:h-[92px] md:w-[92px]">
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%)]">
                </div>
                <div className="grid grid-cols-2 gap-1.5 rotate-45">
                  <div className="h-2.5 w-2.5 rounded-[1px] bg-blue-500"></div>
                  <div className="h-2.5 w-2.5 rounded-[1px] bg-blue-500/50"></div>
                  <div className="h-2.5 w-2.5 rounded-[1px] bg-blue-500/50"></div>
                  <div className="h-2.5 w-2.5 rounded-[1px] bg-blue-500"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center py-10 md:py-0">
            <div className="relative">
              <div className="absolute -inset-10 rounded-full blur-3xl bg-[radial-gradient(circle,_rgba(99,102,241,0.3),_transparent_65%)]">
              </div>

              <div className="absolute -inset-[20%] rounded-full opacity-40 animate-beam-spin pointer-events-none" style={{ background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 240deg, rgba(129, 140, 248, 0.4) 360deg)', maskImage: 'radial-gradient(transparent 55%, black 60%)', WebkitMaskImage: 'radial-gradient(transparent 55%, black 60%)' }}>
              </div>

              <div className="absolute -inset-[15%] rounded-full opacity-20 animate-beam-spin pointer-events-none" style={{ background: 'conic-gradient(from 180deg at 50% 50%, transparent 0deg, transparent 240deg, rgba(99, 102, 241, 0.6) 360deg)', animationDirection: 'reverse', animationDuration: '12s', maskImage: 'radial-gradient(transparent 55%, black 60%)', WebkitMaskImage: 'radial-gradient(transparent 55%, black 60%)' }}>
              </div>

              <div className="relative flex h-[110px] w-[110px] items-center justify-center rounded-full border border-white/[0.10] bg-white/[0.04] backdrop-blur-2xl shadow-[0_40px_100px_-40px_rgba(99,102,241,0.7)] md:h-[132px] md:w-[132px]">
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_55%)]">
                </div>
                <div className="absolute inset-[10px] rounded-full border border-white/[0.10]"></div>
                <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400 drop-shadow-[0_0_24px_rgba(129,140,248,0.6)]">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
              </div>
            </div>
          </div>

          <div className="flex h-full flex-row items-center justify-center gap-6 px-4 md:flex-col md:gap-14 md:px-12">
            <div className="group relative">
              <div className="absolute inset-0 rounded-full blur-2xl opacity-0 transition-opacity group-hover:opacity-100 bg-[radial-gradient(circle,_rgba(52,211,153,0.25),_transparent_60%)]">
              </div>
              <div className="relative flex h-[76px] w-[76px] items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-transform duration-300 group-hover:scale-[1.06] md:h-[92px] md:w-[92px]">
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%)]">
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.4)]">
                  <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"></path>
                </svg>
              </div>
            </div>

            <div className="group relative md:-translate-x-16">
              <div className="absolute inset-0 rounded-full blur-2xl opacity-0 transition-opacity group-hover:opacity-100 bg-[radial-gradient(circle,_rgba(236,72,153,0.25),_transparent_60%)]">
              </div>
              <div className="relative flex h-[76px] w-[76px] items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-transform duration-300 group-hover:scale-[1.06] md:h-[92px] md:w-[92px]">
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%)]">
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-pink-400 drop-shadow-[0_0_12px_rgba(236,72,153,0.4)]">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="6"></circle>
                  <circle cx="12" cy="12" r="2" className="fill-current"></circle>
                </svg>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 rounded-full blur-2xl opacity-0 transition-opacity group-hover:opacity-100 bg-[radial-gradient(circle,_rgba(168,85,247,0.25),_transparent_60%)]">
              </div>
              <div className="relative flex h-[76px] w-[76px] items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-transform duration-300 group-hover:scale-[1.06] md:h-[92px] md:w-[92px]">
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%)]">
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400 drop-shadow-[0_0_12px_rgba(168,85,247,0.4)]">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5z">
                  </path>
                  <path d="M12 7.5V9"></path>
                  <path d="M7.5 12H9"></path>
                  <path d="M16.5 12H15"></path>
                  <path d="M12 16.5V15"></path>
                  <path d="m8 8 1.88 1.88"></path>
                  <path d="M14.12 9.88 16 8"></path>
                  <path d="m8 16 1.88-1.88"></path>
                  <path d="M14.12 14.12 16 16"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
