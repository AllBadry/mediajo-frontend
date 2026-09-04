import React from 'react';
import { Zap, ShieldCheck, Globe, Code2, ArrowUpRight } from 'lucide-react';


export default function AboutUs() {
  return (
    <div dir="ltr" className="min-h-screen bg-[#fafbfc] font-sans overflow-hidden">
      
      

      {/* =========================================
          1. Hero Section (Massive Typography)
          ========================================= */}
      <section className="relative w-full pt-32 pb-20 px-6 lg:px-12 flex flex-col justify-center min-h-[70vh]">
        
        {/* خلفية النقاط الدقيقة */}
        <div className="absolute inset-0 z-0 opacity-50 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        
        {/* هالة لونية ناعمة جداً في الخلفية */}
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-gradient-to-bl from-blue-100/60 via-purple-100/40 to-transparent rounded-full blur-[100px] -z-10"></div>

        <div className="max-w-[90rem] mx-auto w-full relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <span className="px-4 py-1.5 bg-gray-900 text-white font-bold text-xs tracking-widest uppercase rounded-full">
              Our Story
            </span>
            <span className="text-gray-500 font-mono text-sm tracking-widest uppercase">
              Est. 2026 // Amman, Jordan
            </span>
          </div>

          <h1 className="text-[14vw] md:text-[11vw] font-medium leading-[0.85] tracking-tighter text-[#1e2022] mb-6">
            We Engineer <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 italic pr-4">
              Growth.
            </span>
          </h1>
        </div>
      </section>

      {/* =========================================
          2. The Manifesto (Split Layout)
          ========================================= */}
      <section className="relative w-full py-24 px-6 lg:px-12 border-t border-gray-200 bg-white">
        <div className="max-w-[85rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-5">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-gray-900 mb-6">
              Beyond traditional services. We build digital infrastructure.
            </h2>
            <div className="w-20 h-1 bg-blue-600"></div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-8 text-xl lg:text-2xl text-gray-500 font-light leading-relaxed">
            <p>
              MediaJo was founded with a singular vision: to revolutionize the SMM and digital services landscape in the region. We don't just deliver followers or accounts; we architect scalable growth engines for brands, influencers, and agencies.
            </p>
            <p>
              By bridging the gap between high-end API automation and local payment solutions like <strong className="font-semibold text-gray-900">CliQ</strong>, we've created an ecosystem where speed meets uncompromised quality.
            </p>
          </div>

        </div>
      </section>

      {/* =========================================
          3. Core Values (Bento Box Design)
          ========================================= */}
      <section className="relative w-full py-24 px-6 lg:px-12 bg-[#fafbfc]">
        <div className="max-w-[85rem] mx-auto">
          
          <div className="mb-16">
            <h2 className="text-5xl md:text-7xl font-medium tracking-tighter text-[#1e2022]">
              The Core <span className="text-gray-400 italic">Matrix</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.05)] transition-all duration-500 group">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Lightning Speed</h3>
              <p className="text-gray-500 font-light leading-relaxed">
                Automated API routing ensures that 99% of our orders start within seconds of payment confirmation.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(34,197,94,0.05)] transition-all duration-500 group">
              <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Premium Quality</h3>
              <p className="text-gray-500 font-light leading-relaxed">
                We filter our networks rigorously. Zero drop-offs, real engagement, and guaranteed premium accounts.
              </p>
            </div>

            {/* Card 3 (Span 2 on tablet, 1 on desktop) */}
            <div className="bg-gray-900 p-10 rounded-[2.5rem] border border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500 group md:col-span-2 lg:col-span-1 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="w-14 h-14 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform relative z-10">
                <Code2 className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight relative z-10">API-First Approach</h3>
              <p className="text-gray-400 font-light leading-relaxed relative z-10">
                Built for developers and resellers. Integrate our entire catalog directly into your own platform with 3 lines of code.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================
          4. Giant Stats Section 
          ========================================= */}
      <section className="relative w-full py-24 px-6 lg:px-12 bg-white border-t border-gray-200">
        <div className="max-w-[85rem] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          
          <div className="flex flex-col items-center justify-center text-center pt-8 md:pt-0">
            <span className="text-[6rem] md:text-[8rem] font-medium tracking-tighter text-[#1e2022] leading-none mb-2">
              1M<span className="text-blue-600">+</span>
            </span>
            <span className="text-sm font-bold tracking-widest uppercase text-gray-400">Orders Processed</span>
          </div>

          <div className="flex flex-col items-center justify-center text-center pt-8 md:pt-0">
            <span className="text-[6rem] md:text-[8rem] font-medium tracking-tighter text-[#1e2022] leading-none mb-2">
              99<span className="text-purple-600">%</span>
            </span>
            <span className="text-sm font-bold tracking-widest uppercase text-gray-400">Uptime SLA</span>
          </div>

          <div className="flex flex-col items-center justify-center text-center pt-8 md:pt-0">
            <span className="text-[6rem] md:text-[8rem] font-medium tracking-tighter text-[#1e2022] leading-none mb-2">
              24<span className="text-green-500">/7</span>
            </span>
            <span className="text-sm font-bold tracking-widest uppercase text-gray-400">Active Support</span>
          </div>

        </div>
      </section>

      {/* =========================================
          5. Call to Action (CTA)
          ========================================= */}
      <section className="relative w-full py-32 px-6 lg:px-12 bg-[#fafbfc] flex items-center justify-center text-center overflow-hidden">
        
        {/* ديكور هندسي للزر */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-gray-200 rounded-full animate-[spin_60s_linear_infinite] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gray-100 rounded-full animate-[spin_40s_linear_infinite_reverse] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center">
          <h2 className="text-5xl md:text-7xl font-medium tracking-tighter text-[#1e2022] mb-8">
            Ready to scale?
          </h2>
          <button className="group relative flex items-center gap-3 bg-[#1e2022] text-white px-10 py-5 rounded-full font-bold text-lg overflow-hidden transition-all duration-300 hover:bg-black hover:shadow-[0_15px_40px_rgba(0,0,0,0.15)] hover:-translate-y-1">
            <span className="relative z-10">Create Free Account</span>
            <ArrowUpRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </section>

     

    </div>
  );
}