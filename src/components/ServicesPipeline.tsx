import React from 'react';
import { 
  User, Inbox, Bot, Cpu, Send, GitBranch, 
  CheckCircle2, ArrowRight, ShieldCheck, Zap, Sparkles 
} from 'lucide-react';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  theme: {
    accent: string;
    border: string;
    bg: string;
    text: string;
    glow: string;
    dotGlow: string;
  };
  badge: string;
  status: string;
  metric: string;
  highlights: string[];
  stats: { label: string; value: string };
}

const services: ServiceItem[] = [
  { 
    id: '1', 
    title: 'Free Fire IDs', 
    description: 'Instant transfer of verified, high-tier Free Fire accounts with full ownership verification and escrow protection.', 
    category: 'Premium Asset', 
    icon: User, 
    theme: {
      accent: 'cyan',
      border: 'border-cyan-500/30',
      bg: 'bg-cyan-500/10',
      text: 'text-cyan-400',
      glow: 'bg-cyan-500/15',
      dotGlow: 'bg-cyan-400 shadow-[0_0_12px_#22d3ee]'
    },
    badge: '100% Verified',
    status: 'Instant Transfer',
    metric: 'Lv. 70 - 85 S+ Tier',
    highlights: ['Ownership Verification', 'Escrow Protected', 'Instant UID Handover'],
    stats: { label: 'IDs Handed Over', value: '4,200+' }
  },
  { 
    id: '2', 
    title: 'Custom Management Panels', 
    description: 'Streamlined web & mobile control dashboards with real-time telemetry, automated key distribution, and API hooks.', 
    category: 'Infrastructure', 
    icon: Inbox, 
    theme: {
      accent: 'emerald',
      border: 'border-emerald-500/30',
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      glow: 'bg-emerald-500/15',
      dotGlow: 'bg-emerald-400 shadow-[0_0_12px_#34d399]'
    },
    badge: 'Sub-20ms Ping',
    status: 'Real-Time Sync',
    metric: 'REST API & Webhooks',
    highlights: ['Multi-Tenant Access', 'Auto-Token Gen', 'Sub-30ms Dispatch'],
    stats: { label: 'Active Panels', value: '850+' }
  },
  { 
    id: '3', 
    title: 'AI Like Automation', 
    description: 'Boost profile visibility and in-game like counts with intelligent, anti-drop natural rate-pacing algorithms.', 
    category: 'Social Growth', 
    icon: Bot, 
    theme: {
      accent: 'amber',
      border: 'border-amber-500/30',
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
      glow: 'bg-amber-500/15',
      dotGlow: 'bg-amber-400 shadow-[0_0_12px_#f59e0b]'
    },
    badge: 'Safe Pacing',
    status: 'Smart Bot Network',
    metric: 'Anti-Detection Protocol',
    highlights: ['Organic Rate Limits', 'Zero Ban Risk', 'Automated Queue'],
    stats: { label: 'Likes Delivered', value: '1.2M+' }
  },
  { 
    id: '4', 
    title: 'Guild Glory Bot', 
    description: 'Autonomous cloud daemon dedicated to guild tournament farming, glory milestones, and clan rewards.', 
    category: 'Automation', 
    icon: Cpu, 
    theme: {
      accent: 'purple',
      border: 'border-purple-500/30',
      bg: 'bg-purple-500/10',
      text: 'text-purple-400',
      glow: 'bg-purple-500/15',
      dotGlow: 'bg-purple-400 shadow-[0_0_12px_#c084fc]'
    },
    badge: '24/7 Autopilot',
    status: 'Active Daemon Pool',
    metric: 'Tournaments Automation',
    highlights: ['Anti-AFK Protection', 'Smart Rotation', 'Custom Schedule'],
    stats: { label: 'Weekly Glory Farmed', value: '850K+' }
  },
  { 
    id: '5', 
    title: 'Instagram Followers', 
    description: 'Real, high-retention social growth engineered for esports orgs, tournament creators, and streaming setups.', 
    category: 'Social Growth', 
    icon: Send, 
    theme: {
      accent: 'rose',
      border: 'border-rose-500/30',
      bg: 'bg-rose-500/10',
      text: 'text-rose-400',
      glow: 'bg-rose-500/15',
      dotGlow: 'bg-rose-400 shadow-[0_0_12px_#fb7185]'
    },
    badge: 'Refill Guarantee',
    status: 'Instant Queue',
    metric: 'High-Retention Accounts',
    highlights: ['No Password Required', '30-Day Auto Refill', 'Rapid Dispatch'],
    stats: { label: 'Orders Fulfilled', value: '18,500+' }
  },
  { 
    id: '6', 
    title: 'Proxy Servers', 
    description: 'High-bandwidth, low-jitter residential and datacenter proxies optimized for ultra-low latency routing.', 
    category: 'Infrastructure', 
    icon: GitBranch, 
    theme: {
      accent: 'cyan',
      border: 'border-cyan-500/30',
      bg: 'bg-cyan-500/10',
      text: 'text-cyan-400',
      glow: 'bg-cyan-500/15',
      dotGlow: 'bg-cyan-400 shadow-[0_0_12px_#22d3ee]'
    },
    badge: 'Low Ping Routing',
    status: 'Ping < 15ms',
    metric: 'IPv4 / IPv6 Dual Stack',
    highlights: ['Zero Log Guarantee', 'Global Edge Nodes', 'Unlimited Bandwidth'],
    stats: { label: 'Avg Latency', value: '14ms' }
  },
];

export default function ServicesPipeline() {
  return (
    <section className="max-w-[1240px] mx-auto px-6 py-16 relative z-10">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-4">
          <Sparkles size={13} className="text-cyan-400" />
          Autonomous Ecosystem
        </div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
          How our platform<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
            powers your growth
          </span>
        </h2>
        <p className="mt-4 text-neutral-400 text-base max-w-xl mx-auto font-normal">
          Enterprise gaming infrastructure, verified digital assets, and high-frequency automation tools built for speed and reliability.
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Center Rail */}
        <div className="absolute left-1/2 -translate-x-1/2 top-8 bottom-8 w-[2px] bg-gradient-to-b from-cyan-500/40 via-emerald-500/40 to-transparent hidden md:block"></div>

        <div className="space-y-12 md:space-y-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isEven = index % 2 === 0;
            
            return (
              <div 
                key={service.id} 
                className={`relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-10 group ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Text Side */}
                <div className={`w-full md:w-1/2 ${isEven ? 'md:text-right' : 'md:text-left'} text-center`}>
                  <div className={`inline-flex items-center gap-2 rounded-full border ${service.theme.border} ${service.theme.bg} px-3 py-1 text-[11px] font-medium ${service.theme.text} tracking-wider uppercase mb-3`}>
                    {service.category}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm md:text-base text-neutral-400 font-normal mt-2.5 leading-relaxed max-w-md mx-auto md:mx-0 inline-block">
                    {service.description}
                  </p>
                </div>

                {/* Center Dot */}
                <div className="relative flex items-center justify-center shrink-0 z-20">
                  <div className="w-6 h-6 rounded-full border border-white/20 bg-neutral-900 flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform duration-300">
                    <div className={`w-2.5 h-2.5 rounded-full ${service.theme.dotGlow}`}></div>
                  </div>
                </div>

                {/* Card Side */}
                <div className="w-full md:w-1/2">
                  <div className="relative group/card bg-gradient-to-b from-[#131318]/95 to-[#0b0b0e]/95 backdrop-blur-2xl p-6 rounded-2xl border border-white/10 hover:border-white/25 transition-all duration-300 shadow-[0_12px_36px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_48px_rgba(0,0,0,0.7)] overflow-hidden">
                    {/* Ambient Glow */}
                    <div className={`absolute -top-12 -right-12 w-36 h-36 ${service.theme.glow} rounded-full blur-3xl pointer-events-none group-hover/card:scale-125 transition-transform duration-500`} />

                    {/* Card Top Row */}
                    <div className="flex items-center justify-between mb-4 relative z-10">
                      <div className="flex items-center gap-3.5">
                        <div className={`w-12 h-12 rounded-xl ${service.theme.bg} border ${service.theme.border} flex items-center justify-center ${service.theme.text} shadow-inner group-hover/card:scale-105 transition-transform duration-300`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                            {service.status}
                          </div>
                          <div className="text-sm font-semibold text-white tracking-tight">
                            {service.metric}
                          </div>
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-medium border ${service.theme.border} ${service.theme.bg} ${service.theme.text}`}>
                        {service.badge}
                      </span>
                    </div>

                    {/* Feature Highlights Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-5 relative z-10">
                      {service.highlights.map(hl => (
                        <span 
                          key={hl} 
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[11px] text-neutral-300 font-sans"
                        >
                          <CheckCircle2 size={12} className={service.theme.text} />
                          {hl}
                        </span>
                      ))}
                    </div>

                    {/* Card Footer Metric + Link */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10 relative z-10">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium">
                          {service.stats.label}
                        </div>
                        <div className="text-base font-bold text-white font-mono">
                          {service.stats.value}
                        </div>
                      </div>
                      <div className={`inline-flex items-center gap-1 text-xs font-semibold ${service.theme.text} group-hover/card:translate-x-0.5 transition-all`}>
                        <span>Live Pipeline</span>
                        <ArrowRight size={13} className="group-hover/card:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
