'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════
   LIGHTNING LOGIC — 2D Canvas Performance Optimized
  ═══════════════════════════════════════════════════════════ */
function genBolt(x1: number, y1: number, x2: number, y2: number, r = 80, d = 0, max = 9): { x: number, y: number }[] {
  if (d >= max) return [{ x: x1, y: y1 }, { x: x2, y: y2 }];
  const j = r * Math.pow(0.55, d);
  const mx = (x1 + x2) / 2 + (Math.random() - .5) * j;
  const my = (y1 + y2) / 2 + (Math.random() - .5) * j * 0.4;
  return [...genBolt(x1, y1, mx, my, r, d + 1, max), ...genBolt(mx, my, x2, y2, r, d + 1, max).slice(1)];
}

function drawBolt(ctx: CanvasRenderingContext2D, pts: { x: number, y: number }[], al: number, lw: number, col: string, p = 1) {
  const v = pts.slice(0, Math.max(2, Math.floor(pts.length * p)));
  const passes = [
    { blur: 80, a: .1, lw: lw * 12, col: '#77aaff' },
    { blur: 40, a: .2, lw: lw * 6, col: '#99ccff' },
    { blur: 15, a: .5, lw: lw * 3, col: '#ffffff' },
    { blur: 2, a: 1, lw: lw * 1, col: '#ffffff' },
  ];

  for (const pass of passes) {
    ctx.save();
    ctx.globalAlpha = al * pass.a;
    ctx.shadowColor = pass.col;
    ctx.shadowBlur = pass.blur;
    ctx.strokeStyle = pass.col;
    ctx.lineWidth = pass.lw;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(v[0].x, v[0].y);
    for (let i = 1; i < v.length; i++) ctx.lineTo(v[i].x, v[i].y);
    ctx.stroke();
    ctx.restore();
  }
}

function playThunder() {
  try {
    const ac = new (window.AudioContext || (window as any).webkitAudioContext)(), dur = 3.5, sr = ac.sampleRate;
    const buf = ac.createBuffer(1, sr * dur, sr), d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (sr * .8));
    for (let i = 4; i < d.length; i++) d[i] = (d[i] + d[i - 1] * 2 + d[i - 2] * 2 + d[i - 3] + d[i - 4]) / 7;
    const src = ac.createBufferSource(); src.buffer = buf;
    const bpf = ac.createBiquadFilter(); bpf.type = 'bandpass'; bpf.frequency.value = 65; bpf.Q.value = .5;
    const g = ac.createGain(); g.gain.setValueAtTime(0, ac.currentTime);
    g.gain.linearRampToValueAtTime(.78, ac.currentTime + .06);
    src.connect(bpf); bpf.connect(g); g.connect(ac.destination); src.start();
    setTimeout(() => ac.close(), (dur + .5) * 1000);
  } catch (e) { }
}

export default function Hero() {
  const lCanvasRef = useRef<HTMLCanvasElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lCanvas = lCanvasRef.current;
    if (!lCanvas) return;
    const lCtx = lCanvas.getContext('2d')!;

    const resize = () => {
      lCanvas.width = window.innerWidth;
      lCanvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    interface Strike {
      pts: { x: number, y: number }[]; 
      branches: { pts: { x: number, y: number }[]; w: number }[];
      ox: number; oy: number; phase: 'leader' | 'return' | 'fade'; prog: number; col: string;
    }
    let strike: Strike | null = null;
    let lFlash = 0;

    const setFlash = (v: number) => {
      if (flashRef.current) flashRef.current.style.opacity = String(v);
    };

    const newStrike = () => {
      const W = lCanvas.width, H = lCanvas.height;
      const ox = W * .1 + Math.random() * W * .8, oy = H * .05;
      const tx = ox + (Math.random() - .5) * W * .4;
      const ty = H * 0.4 + Math.random() * H * 0.5;

      const pts = genBolt(ox, oy, tx, ty, 74, 0, 8);
      const col = ['#88bfff', '#aad4ff', '#c4e2ff'][Math.floor(Math.random() * 3)];
      const branches: { pts: { x: number, y: number }[]; w: number }[] = [];
      for (let b = 0; b < 1 + Math.floor(Math.random() * 2); b++) {
        const si = Math.floor(pts.length * (.2 + Math.random() * .5));
        const sp = pts[Math.min(si, pts.length - 1)];
        branches.push({ 
          pts: genBolt(sp.x, sp.y, sp.x + (Math.random() - .5) * W * .2, sp.y + Math.random() * (ty - sp.y), 40, 0, 6), 
          w: .4 + Math.random() * .9 
        });
      }
      strike = { pts, branches, ox, oy, phase: 'leader', prog: 0, col };
      setTimeout(playThunder, 400 + Math.random() * 300);
    };

    let timer: any;
    const schedule = () => {
      timer = setTimeout(() => {
        if (!strike) newStrike();
        schedule();
      }, 3000 + Math.random() * 4000);
    };
    schedule();

    const LEADER = 0.05, RETURN = 0.22, FADE = 0.07;
    let raf: number;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      lCtx.clearRect(0, 0, lCanvas.width, lCanvas.height);
      
      if (strike) {
        const s = strike;
        if (s.phase === 'leader') {
          s.prog = Math.min(1, s.prog + LEADER);
          lFlash = s.prog * .08; setFlash(lFlash * .05);
          drawBolt(lCtx, s.pts, s.prog * .26, 1, s.col, s.prog);
          for (const br of s.branches) drawBolt(lCtx, br.pts, s.prog * .16, br.w * .6, s.col, s.prog);
          if (s.prog >= 1) { s.phase = 'return'; s.prog = 0; }
        } else if (s.phase === 'return') {
          s.prog = Math.min(1, s.prog + RETURN);
          lFlash = s.prog < .3 ? s.prog / .3 : 1 - (s.prog - .3) / .7;
          setFlash(lFlash * .42);
          drawBolt(lCtx, s.pts, lFlash, 2.8, s.col);
          for (const br of s.branches) drawBolt(lCtx, br.pts, lFlash * .78, br.w * 1.3, s.col);
          if (s.prog >= 1) { s.phase = 'fade'; s.prog = 0; }
        } else {
          s.prog = Math.min(1, s.prog + FADE);
          lFlash = Math.max(0, lFlash - .06);
          setFlash(lFlash * .10);
          if (lFlash <= 0 && s.prog >= 1) strike = null;
        }
      } else {
        lFlash = Math.max(0, lFlash - .04);
        setFlash(lFlash);
      }
    };
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative h-screen bg-[#060a14] overflow-hidden">
      {/* Background Image Replace Models */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/hero_bg.png" 
          alt="Industrial Infrastructure" 
          fill 
          className="object-cover opacity-60 scale-105"
          priority
        />
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060a14]/90 via-[#060a14]/20 to-[#060a14]" />
        <div className="absolute inset-0 bg-[#060a14]/40 backdrop-blur-[2px]" />
      </div>

      <div className="relative h-full flex items-center justify-center container mx-auto px-6">
        {/* Atmospheric Lightning */}
        <canvas 
          ref={lCanvasRef}
          className="absolute inset-0 z-10 pointer-events-none mix-blend-screen" 
        />

        {/* Explosion Flash Overlay */}
        <div 
          ref={flashRef}
          className="absolute inset-0 z-20 pointer-events-none bg-blue-400/10 opacity-0 transition-opacity duration-75"
        />

        {/* Hero Content */}
        <div className="relative z-30 text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37] text-[10px] font-black uppercase tracking-[0.4em] mb-8">
              Pioneering Industrial Safety
            </span>
            
            <h1 className="text-5xl md:text-7xl font-black text-white font-display leading-[0.85] tracking-tighter uppercase mb-8">
              Reliable <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#d4af37] via-[#f7e1ad] to-[#b8860b]">
                Protection
              </span>
            </h1>
            
            <p className="text-white/60 text-base md:text-lg font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
              Global leaders in advanced earthing systems and lightning protection. 
              Engineering resilience for the world&apos;s most critical industrial infrastructure.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <button className="group relative px-8 py-4 bg-[#d4af37] overflow-hidden transition-all hover:pr-12 transform hover:-translate-y-1">
                <span className="relative z-10 text-[#060a14] font-black uppercase tracking-widest text-[10px]">Explore Solutions</span>
                <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
              </button>
              
              <button className="px-8 py-4 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all backdrop-blur-sm">
                Technical Specs
              </button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Decorative Element */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />
      </div>
    </section>
  );
}
