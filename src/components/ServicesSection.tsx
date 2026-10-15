import { ShieldCheck, Zap, Globe } from 'lucide-react';

export default function ServicesSection() {
  const cards = [
    {
      id: "card-1",
      icon: ShieldCheck,
      title: "Secure Transactions",
      desc: "Escrow-based protection for every deal.",
      details: ["Verified sellers only", "100% money-back guarantee", "24/7 transaction monitoring"],
      status: "Active Phase",
      tag: "Urgent",
      tagColor: "bg-[#3A1D1D] text-[#FF8A8A]"
    },
    {
      id: "card-2",
      icon: Zap,
      title: "Instant Delivery",
      desc: "Automated delivery systems for panels.",
      details: ["Delivery in < 30 seconds", "No manual intervention", "API-driven fulfillment"],
      status: "In Progress",
      tag: "Normal",
      tagColor: "bg-[#1D3A24] text-[#8AFFB1]"
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Column: Copy */}
          <div className="w-full lg:w-5/12 z-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white mb-6">
              Features built for <br/>
              <span className="font-serif italic text-white/90">trust and speed.</span>
            </h2>
            <p className="text-neutral-400 max-w-sm leading-relaxed font-light">
              Experience the next generation of account marketplaces. Secure, automated.
            </p>
          </div>

          {/* Right Column: Two 3D-styled, slanted, staggered cards */}
          <div className="w-full lg:w-7/12 flex justify-center perspective-[1500px] mt-12 lg:mt-0">
            <div className="relative w-full max-w-[400px] flex flex-col gap-8 lg:gap-12" style={{ transform: 'rotateY(-15deg) rotateX(10deg) rotateZ(2deg)' }}>
              {cards.slice(0, 2).map((card, index) => (
                <div
                  key={card.id}
                  className={`w-full aspect-[5/6] rounded-3xl bg-[#0e0e0e] border border-white/10 p-8 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] flex flex-col gap-6 relative transition-transform duration-500 hover:scale-[1.02] ${
                    index === 1 ? 'lg:-ml-20' : ''
                  }`}
                  style={{ 
                    boxShadow: '0 20px 50px -10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
                    transform: index === 0 ? 'rotateZ(-5deg)' : 'rotateZ(5deg)'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className={`px-4 py-1.5 rounded-full ${card.tagColor} text-[11px] font-semibold tracking-wider uppercase bg-opacity-20`}>
                      {card.tag}
                    </div>
                    <div className="text-neutral-500">
                      <card.icon width={28} height={28} />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <h3 className="text-3xl text-white font-medium tracking-tight">{card.title}</h3>
                    <p className="text-neutral-400 font-light leading-relaxed">
                      {card.desc}
                    </p>
                    <ul className="flex flex-col gap-2 mt-2">
                      {card.details.map((detail, i) => (
                        <li key={i} className="text-sm text-neutral-500 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-700"></span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
