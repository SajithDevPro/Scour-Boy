// ginPath(); ctx.moveTo(px, py + ph / 2); ctx.lineTo(px + pw, py + ph / 2); ctx.stroke();


import React, { useEffect, useRef, useCallback } from 'react';
import { ArrowRight, TrendingUp, Cpu, Shield } from 'lucide-react';

interface LandingViewProps {
  onGetStarted: () => void;
  onViewPricing: () => void;
}

/* ─────────────────────────────────────────────
   RIGHT-SIDE CANVAS  — "Neural Pitch" engine
   Layers (back → front):
   1. Deep-space radial gradient bg
   2. Perspective football pitch wire-grid (subtle)
   3. Pulsing concentric rings around key zones
   4. Fluid Bézier flow-lines (pass trajectories)
   5. Player nodes with halo + ripple rings
   6. Floating stat chips that fade in/out
   7. Horizontal data-beam sweep (not a scan line)
   8. xG ring chart in top-right corner
   9. Edge vignette
───────────────────────────────────────────── */

function RightCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let raf: number;
    let tick = 0;

    /* ── size ── */
    const setSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    setSize();
    const ro = new ResizeObserver(setSize);
    ro.observe(canvas);

    /* ── helpers ── */
    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    /* ── player nodes ── */
    type Node = {
      x: number; y: number;
      vx: number; vy: number;
      r: number; phase: number;
      team: 'gold' | 'cyan';
      label: string;
    };

    const makeNodes = (): Node[] => {
      const gold = ['CM', 'ST', 'LW', 'RW', 'CB', 'GK'];
      const cyan = ['DM', 'SS', 'LB', 'RB', 'CDM'];
      return [
        ...gold.map((label, i) => ({
          x: 0.12 + Math.random() * 0.76,
          y: 0.12 + Math.random() * 0.76,
          vx: (Math.random() - 0.5) * 0.00025,
          vy: (Math.random() - 0.5) * 0.00025,
          r: 5 + Math.random() * 2,
          phase: (i / gold.length) * Math.PI * 2,
          team: 'gold' as const,
          label,
        })),
        ...cyan.map((label, i) => ({
          x: 0.12 + Math.random() * 0.76,
          y: 0.12 + Math.random() * 0.76,
          vx: (Math.random() - 0.5) * 0.00025,
          vy: (Math.random() - 0.5) * 0.00025,
          r: 4 + Math.random() * 2,
          phase: (i / cyan.length) * Math.PI * 2,
          team: 'cyan' as const,
          label,
        })),
      ];
    };

    const nodes = makeNodes();

    /* ── stat chips ── */
    type Chip = {
      label: string; val: string;
      x: number; y: number;
      alpha: number; targetAlpha: number;
      life: number; maxLife: number;
      color: string;
    };

    const chipDefs = [
      { label: 'PASS ACC', val: '94%', color: '#F5A623' },
      { label: 'xG', val: '2.41', color: '#F5A623' },
      { label: 'SPRINT', val: '31.2 km/h', color: '#34D399' },
      { label: 'PRESS', val: '78%', color: '#34D399' },
      { label: 'TOUCHES', val: '47', color: '#F5A623' },
      { label: 'RATING', val: '8.4 / 10', color: '#34D399' },
      { label: 'PPDA', val: '6.8', color: '#F5A623' },
      { label: 'LINE-BREAK', val: '+3', color: '#34D399' },
    ];

    const chips: Chip[] = [];
    let chipTimer = 0;

    const spawnChip = () => {
      const def = chipDefs[Math.floor(Math.random() * chipDefs.length)];
      chips.push({
        ...def,
        x: 0.05 + Math.random() * 0.6,
        y: 0.05 + Math.random() * 0.85,
        alpha: 0,
        targetAlpha: 0.92,
        life: 0,
        maxLife: 180 + Math.random() * 120,
      });
    };

    /* ── xG arc ring data ── */
    const xgSlices = [
      { pct: 0.62, color: '#F5A623' },
      { pct: 0.21, color: '#34D399' },
      { pct: 0.17, color: 'rgba(255,255,255,0.15)' },
    ];

    /* ── flow-line paths ── */
    type FlowPath = {
      pts: [number, number, number, number, number, number];
      progress: number; speed: number; alpha: number;
    };

    const flows: FlowPath[] = Array.from({ length: 8 }, () => ({
      pts: [
        Math.random(), Math.random(),
        Math.random(), Math.random(),
        Math.random(), Math.random(),
      ] as [number, number, number, number, number, number],
      progress: Math.random(),
      speed: 0.0015 + Math.random() * 0.002,
      alpha: 0.06 + Math.random() * 0.1,
    }));

    /* ── data beam ── */
    let beamX = -0.2;

    /* ── draw ── */
    const draw = () => {
      tick++;
      const w = W(), h = H();
      ctx.clearRect(0, 0, w, h);

      /* 1 ── deep-space background */
      const bg = ctx.createRadialGradient(w * 0.5, h * 0.4, 0, w * 0.5, h * 0.5, w * 0.85);
      bg.addColorStop(0, 'rgba(8,6,18,1)');
      bg.addColorStop(0.5, 'rgba(4,4,10,1)');
      bg.addColorStop(1, 'rgba(2,2,6,1)');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      /* 2 ── perspective pitch wire-grid */
      ctx.save();
      ctx.strokeStyle = 'rgba(255,255,255,0.035)';
      ctx.lineWidth = 0.8;
      const px = w * 0.06, py = h * 0.06, pw = w * 0.88, ph = h * 0.88;
      ctx.strokeRect(px, py, pw, ph);
      ctx.beginPath(); ctx.moveTo(px, py + ph / 2); ctx.lineTo(px + pw, py + ph / 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(px + pw / 2, py + ph / 2, Math.min(pw, ph) * 0.11, 0, Math.PI * 2); ctx.stroke();
      // penalty boxes
      ctx.strokeRect(px, py + ph * 0.22, pw * 0.18, ph * 0.56);
      ctx.strokeRect(px + pw * 0.82, py + ph * 0.22, pw * 0.18, ph * 0.56);
      // vertical grid lines (subtle)
      for (let gx = 1; gx < 6; gx++) {
        const xpos = px + (pw / 6) * gx;
        ctx.globalAlpha = 0.35;
        ctx.beginPath(); ctx.moveTo(xpos, py); ctx.lineTo(xpos, py + ph); ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.restore();

      /* 3 ── pulsing zone rings */
      const zones = [
        { nx: 0.25, ny: 0.5, sz: 0.09, c: 'rgba(245,166,35,' },
        { nx: 0.75, ny: 0.5, sz: 0.07, c: 'rgba(52,211,153,' },
        { nx: 0.5,  ny: 0.5, sz: 0.06, c: 'rgba(245,166,35,' },
      ];
      zones.forEach(({ nx, ny, sz, c }, zi) => {
        const baseR = Math.min(w, h) * sz;
        for (let ring = 0; ring < 3; ring++) {
          const ripplePhase = (tick * 0.018 + zi * 1.2 + ring * 0.9) % (Math.PI * 2);
          const rippleR = baseR * (1 + ring * 0.55 + Math.sin(ripplePhase) * 0.15);
          const a = Math.max(0, 0.12 - ring * 0.04) * (0.6 + 0.4 * Math.sin(tick * 0.02 + zi));
          ctx.beginPath();
          ctx.arc(nx * w, ny * h, rippleR, 0, Math.PI * 2);
          ctx.strokeStyle = `${c}${a})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      });

      /* 4 ── fluid Bézier flow-lines */
      flows.forEach((f) => {
        f.progress += f.speed;
        if (f.progress > 1) {
          f.progress = 0;
          f.pts = [
            Math.random(), Math.random(),
            Math.random(), Math.random(),
            Math.random(), Math.random(),
          ] as [number, number, number, number, number, number];
        }
        const t = f.progress;
        const [x0, y0, cx, cy, x1, y1] = f.pts;
        // draw full dim path
        ctx.beginPath();
        ctx.moveTo(x0 * w, y0 * h);
        ctx.quadraticCurveTo(cx * w, cy * h, x1 * w, y1 * h);
        ctx.strokeStyle = `rgba(245,166,35,${f.alpha * 0.35})`;
        ctx.lineWidth = 0.6;
        ctx.setLineDash([3, 7]);
        ctx.stroke();
        ctx.setLineDash([]);

        // draw bright head that travels along path
        const bx = (1 - t) * (1 - t) * x0 * w + 2 * (1 - t) * t * cx * w + t * t * x1 * w;
        const by = (1 - t) * (1 - t) * y0 * h + 2 * (1 - t) * t * cy * h + t * t * y1 * h;
        const headGrad = ctx.createRadialGradient(bx, by, 0, bx, by, 8);
        headGrad.addColorStop(0, `rgba(245,220,100,${f.alpha * 2})`);
        headGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = headGrad;
        ctx.beginPath();
        ctx.arc(bx, by, 8, 0, Math.PI * 2);
        ctx.fill();
      });

      /* 5 ── player nodes */
      nodes.forEach((n) => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0.06 || n.x > 0.94) n.vx *= -1;
        if (n.y < 0.06 || n.y > 0.94) n.vy *= -1;
        n.phase += 0.022;

        const pulse = 0.75 + 0.25 * Math.sin(n.phase);
        const goldC = `rgba(245,166,35,`;
        const cyanC = `rgba(52,211,153,`;
        const C = n.team === 'gold' ? goldC : cyanC;
        const cx = n.x * w, cy = n.y * h;

        // outer halo
        const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, n.r * 9);
        halo.addColorStop(0, `${C}${0.18 * pulse})`);
        halo.addColorStop(1, 'transparent');
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(cx, cy, n.r * 9, 0, Math.PI * 2);
        ctx.fill();

        // ripple ring
        const ripR = n.r * (3 + 2 * ((n.phase * 0.4) % 1));
        ctx.beginPath();
        ctx.arc(cx, cy, ripR, 0, Math.PI * 2);
        ctx.strokeStyle = `${C}${0.22 * (1 - ((n.phase * 0.4) % 1))})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // core circle
        ctx.beginPath();
        ctx.arc(cx, cy, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.team === 'gold' ? '#F5A623' : '#34D399';
        ctx.fill();

        // position label
        ctx.font = `700 ${Math.round(n.r * 1.4)}px "SF Pro Display",system-ui,sans-serif`;
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(n.label.slice(0, 2), cx, cy);
      });

      // connection lines between nearby teammates
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (nodes[i].team !== nodes[j].team) continue;
          const dx = (nodes[i].x - nodes[j].x) * w;
          const dy = (nodes[i].y - nodes[j].y) * h;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const a = (1 - dist / 140) * 0.18;
            const C = nodes[i].team === 'gold' ? `rgba(245,166,35,${a})` : `rgba(52,211,153,${a})`;
            ctx.beginPath();
            ctx.strokeStyle = C;
            ctx.lineWidth = 0.6;
            ctx.moveTo(nodes[i].x * w, nodes[i].y * h);
            ctx.lineTo(nodes[j].x * w, nodes[j].y * h);
            ctx.stroke();
          }
        }
      }

      /* 6 ── stat chips */
      chipTimer++;
      if (chipTimer > 90 && chips.length < 5) { chipTimer = 0; spawnChip(); }

      chips.forEach((chip, ci) => {
        chip.life++;
        if (chip.life < 30) chip.alpha = lerp(chip.alpha, chip.targetAlpha, 0.07);
        if (chip.life > chip.maxLife - 40) chip.alpha = lerp(chip.alpha, 0, 0.06);

        if (chip.alpha < 0.005) { chips.splice(ci, 1); return; }

        const cx2 = chip.x * w, cy2 = chip.y * h;
        const chipW = 110, chipH = 34;
        ctx.save();
        ctx.globalAlpha = chip.alpha;

        // glass card
        ctx.fillStyle = 'rgba(6,4,16,0.82)';
        ctx.beginPath();
        (ctx as any).roundRect(cx2, cy2, chipW, chipH, 6);
        ctx.fill();

        ctx.strokeStyle = chip.color.replace(')', ',0.35)').replace('rgb', 'rgba').replace('#F5A623', 'rgba(245,166,35,0.35)').replace('#34D399', 'rgba(52,211,153,0.35)');
        // simpler stroke approach
        ctx.strokeStyle = chip.color + '55';
        ctx.lineWidth = 0.6;
        ctx.stroke();

        // label
        ctx.fillStyle = chip.color;
        ctx.font = '700 7.5px "SF Pro Display",system-ui,sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.letterSpacing = '1px';
        ctx.fillText(chip.label, cx2 + 8, cy2 + 7);

        // value
        ctx.fillStyle = '#fff';
        ctx.font = '600 13px "SF Pro Display",system-ui,sans-serif';
        ctx.fillText(chip.val, cx2 + 8, cy2 + 17);

        ctx.restore();
      });

      /* 7 ── horizontal data beam (sweeps left → right slowly) */
      beamX += 0.0012;
      if (beamX > 1.2) beamX = -0.2;
      const bx = beamX * w;
      const beam = ctx.createLinearGradient(bx - 80, 0, bx + 80, 0);
      beam.addColorStop(0, 'transparent');
      beam.addColorStop(0.4, 'rgba(245,166,35,0.04)');
      beam.addColorStop(0.5, 'rgba(245,220,80,0.1)');
      beam.addColorStop(0.6, 'rgba(245,166,35,0.04)');
      beam.addColorStop(1, 'transparent');
      ctx.fillStyle = beam;
      ctx.fillRect(bx - 80, 0, 160, h);

      /* 8 ── xG arc ring (top-right) */
      {
        const rx = w - 76, ry = 72, outerR = 52, innerR = 36;
        // background ring
        ctx.beginPath();
        ctx.arc(rx, ry, outerR, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,255,255,0.05)';
        ctx.lineWidth = outerR - innerR;
        ctx.stroke();

        // animated slices
        let startAngle = -Math.PI / 2;
        const animScale = Math.min(1, tick / 120);
        xgSlices.forEach(({ pct, color }) => {
          const sweep = pct * Math.PI * 2 * animScale;
          ctx.beginPath();
          ctx.arc(rx, ry, (outerR + innerR) / 2, startAngle, startAngle + sweep);
          ctx.strokeStyle = color;
          ctx.lineWidth = outerR - innerR;
          ctx.stroke();
          startAngle += sweep;
        });

        // centre label
        ctx.font = '700 14px "SF Pro Display",system-ui,sans-serif';
        ctx.fillStyle = '#F5A623';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('2.41', rx, ry - 4);
        ctx.font = '500 7px "SF Pro Display",system-ui,sans-serif';
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.fillText('xG', rx, ry + 9);
      }

      /* 9 ── bottom mini bar charts */
      {
        const bars = [
          { label: 'PASS', v: 0.94 },
          { label: 'DUEL', v: 0.71 },
          { label: 'PRESS', v: 0.78 },
          { label: 'AIR', v: 0.55 },
        ];
        const bw = 28, bh = 48, gap = 14;
        const startX = w - (bars.length * (bw + gap)) - 14;
        const startY = h - 68;

        bars.forEach(({ label, v }, bi) => {
          const x = startX + bi * (bw + gap);
          const barH = bh * v * Math.min(1, tick / 90);
          // track
          ctx.fillStyle = 'rgba(255,255,255,0.05)';
          ctx.beginPath();
          (ctx as any).roundRect(x, startY, bw, bh, 4);
          ctx.fill();
          // fill
          const fillGrad = ctx.createLinearGradient(x, startY + bh, x, startY + bh - barH);
          fillGrad.addColorStop(0, '#E8830A');
          fillGrad.addColorStop(1, '#F5D06E');
          ctx.fillStyle = fillGrad;
          ctx.beginPath();
          (ctx as any).roundRect(x, startY + bh - barH, bw, barH, 4);
          ctx.fill();
          // label
          ctx.font = '600 7px "SF Pro Display",system-ui,sans-serif';
          ctx.fillStyle = 'rgba(255,255,255,0.35)';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          ctx.fillText(label, x + bw / 2, startY + bh + 5);
          // value
          ctx.font = '700 8px "SF Pro Display",system-ui,sans-serif';
          ctx.fillStyle = '#F5A623';
          ctx.fillText(`${Math.round(v * 100)}%`, x + bw / 2, startY - 13);
        });
      }

      /* 10 ── edge vignette */
      const vig = ctx.createRadialGradient(w / 2, h / 2, h * 0.2, w / 2, h / 2, w * 0.8);
      vig.addColorStop(0, 'transparent');
      vig.addColorStop(1, 'rgba(2,2,6,0.55)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export function LandingView({ onGetStarted, onViewPricing }: LandingViewProps) {
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#06060A',
        fontFamily: '"SF Pro Display","Inter",-apple-system,BlinkMacSystemFont,sans-serif',
        color: '#fff',
        overflowX: 'hidden',
      }}
    >
      <style>{`
        @keyframes pulseDot {
          0%,100%{opacity:1;transform:scale(1);}
          50%{opacity:0.4;transform:scale(0.8);}
        }
        @keyframes fadeUp {
          from{opacity:0;transform:translateY(20px);}
          to{opacity:1;transform:translateY(0);}
        }
        @keyframes scanDown {
          0%{top:0%;}100%{top:100%;}
        }
        @keyframes goldBreathe {
          0%,100%{box-shadow:0 0 0 0 rgba(245,166,35,0);}
          50%{box-shadow:0 0 32px 4px rgba(245,166,35,0.18);}
        }
        @keyframes chipFadeIn {
          from{opacity:0;transform:translateY(6px);}
          to{opacity:1;transform:translateY(0);}
        }
        .nav-link{
          font-size:13px;color:rgba(255,255,255,0.45);text-decoration:none;
          letter-spacing:.01em;transition:color .2s;
        }
        .nav-link:hover{color:#fff;}
        .hero-anim{animation:fadeUp .9s cubic-bezier(.22,1,.36,1) both;}
        .hero-anim-d1{animation-delay:.1s;}
        .hero-anim-d2{animation-delay:.22s;}
        .hero-anim-d3{animation-delay:.36s;}
        .hero-anim-d4{animation-delay:.5s;}
        .step-card:hover{
          border-color:rgba(245,166,35,0.22)!important;
          background:rgba(245,166,35,0.03)!important;
        }
      `}</style>

      {/* ── NAVBAR ── */}
      {/* <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 40px',
          height: 60,
          background: 'rgba(6,6,10,0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.055)',
        }}
      >
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div
            style={{
              width: 30,
              height: 30,
              background: '#F5A623',
              borderRadius: 7,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <polygon points="8,1 10.5,5.8 16,6.6 12,10.4 13,16 8,13.3 3,16 4,10.4 0,6.6 5.5,5.8" fill="#000" />
            </svg>
          </div>
          <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: '-0.03em' }}>
            ELITE<span style={{ color: '#F5A623' }}>SCOUR</span>
          </span>
        </div>

        
        <div style={{ display: 'flex', gap: 32 }} className="hidden-mobile">
          {['Features', 'How it works', 'Pricing', 'Academy'].map((l) => (
            <a key={l} href="#" className="nav-link">{l}</a>
          ))}
        </div>

       
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <a href="#" className="nav-link" style={{ fontSize: 13 }}>Sign in</a>
          <button
            onClick={onGetStarted}
            style={{
              padding: '8px 18px',
              background: '#F5A623',
              color: '#000',
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: '.08em',
              textTransform: 'uppercase',
              border: 'none',
              borderRadius: 7,
              cursor: 'pointer',
              transition: 'background .2s',
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.background = '#FBBF24')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.background = '#F5A623')}
          >
            Get Started
          </button>
        </div>
      </nav> */}

      
      <section
        style={{
          textAlign: 'center',
          padding: '72px 24px 40px',
          position: 'relative',
        }}
      >
        
        <div
          className="hero-anim hero-anim-d1"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            padding: '5px 14px',
            background: 'rgba(245,166,35,0.07)',
            border: '1px solid rgba(245,166,35,0.18)',
            borderRadius: 100,
            marginBottom: 28,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#F5A623',
              animation: 'pulseDot 2s infinite',
            }}
          />
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '.14em',
              color: '#F5A623',
              textTransform: 'uppercase',
            }}
          >
            Elite Scout Engine · Live
          </span>
        </div>

        
        <h1
          className="hero-anim hero-anim-d2"
          style={{
            fontSize: 'clamp(40px, 6.5vw, 82px)',
            fontWeight: 800,
            letterSpacing: '-0.045em',
            lineHeight: 1.04,
            margin: '0 0 22px',
          }}
        >
          Your personal AI
          <br />
          <span
            style={{
              background: 'linear-gradient(100deg,#F5D78E 0%,#F5A623 45%,#E8830A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontStyle: 'italic',
            }}
          >
            football coach.
          </span>
        </h1>

        
        <p
          className="hero-anim hero-anim-d3"
          style={{
            fontSize: 17,
            color: 'rgba(255,255,255,0.42)',
            lineHeight: 1.65,
            maxWidth: 500,
            margin: '0 auto 36px',
          }}
        >
          Upload footage. Get frame-by-frame AI analysis, elite comparisons,
          and a live performance rating that proves you're improving.
        </p>

        
        <div
          className="hero-anim hero-anim-d4"
          style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <button
            onClick={onGetStarted}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '13px 28px',
              background: '#F5A623',
              color: '#000',
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
            }}
          >
            Start Learning <ArrowRight size={14} />
          </button>
          <button
            onClick={onViewPricing}
            style={{
              padding: '13px 28px',
              background: 'transparent',
              color: 'rgba(255,255,255,0.65)',
              fontWeight: 600,
              fontSize: 12,
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8,
              cursor: 'pointer',
              transition: 'border-color .2s',
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.borderColor = 'rgba(245,166,35,0.35)')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)')}
          >
            View Pricing
          </button>
        </div>
      </section>

      {/* ── MAIN SPLIT: VIDEO + CANVAS ── */}
      <section
        style={{
          maxWidth: 1200,
          width: '100%',
          margin: '0 auto',
          padding: '0 24px 88px',
          display: 'flex',
          gap: 24,
          alignItems: 'stretch',
          flexWrap: 'wrap',
        }}
      >

        <div
          style={{
            flex: '0 0 auto',
            width: '100%',
            maxWidth: 290,
            margin: '0 auto',
          }}
        >
          <div style={{ position: 'relative' }}>
            
            <div
              style={{
                position: 'absolute',
                inset: -1,
                borderRadius: 18,
                border: '1.5px solid rgba(245,166,35,0.45)',
                animation: 'goldBreathe 3.5s ease-in-out infinite',
                pointerEvents: 'none',
                zIndex: 2,
              }}
            />
            
            {[
              { top: -1, left: -1, borderTop: '2px solid #F5A623', borderLeft: '2px solid #F5A623', borderRadius: '16px 0 0 0' },
              { top: -1, right: -1, borderTop: '2px solid #F5A623', borderRight: '2px solid #F5A623', borderRadius: '0 16px 0 0' },
              { bottom: -1, left: -1, borderBottom: '2px solid #F5A623', borderLeft: '2px solid #F5A623', borderRadius: '0 0 0 16px' },
              { bottom: -1, right: -1, borderBottom: '2px solid #F5A623', borderRight: '2px solid #F5A623', borderRadius: '0 0 16px 0' },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: 20,
                  height: 20,
                  zIndex: 3,
                  ...s,
                }}
              />
            ))}

            
            <div
              style={{
                position: 'absolute',
                inset: -20,
                background: 'radial-gradient(ellipse at center, rgba(245,166,35,0.12) 0%, transparent 70%)',
                borderRadius: 32,
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />

            
            <div
              style={{
                position: 'relative',
                zIndex: 1,
                borderRadius: 16,
                overflow: 'hidden',
                aspectRatio: '9/16',
                background: '#070708',
              }}
            >
              <video
                src="/video/video-football.mp4"
                autoPlay
                muted
                loop
                playsInline
                controls={false}
                onContextMenu={(e) => e.preventDefault()}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />

              
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                }}
              >
               
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    background: 'linear-gradient(to bottom, rgba(4,4,10,0.8), transparent)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: '50%',
                        background: '#F5A623',
                        animation: 'pulseDot 1.5s infinite',
                      }}
                    />
                    <span
                      style={{
                        fontSize: 8,
                        fontWeight: 700,
                        letterSpacing: '.12em',
                        color: '#F5A623',
                        textTransform: 'uppercase',
                      }}
                    >
                      AI Analysing
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: 8,
                      color: 'rgba(255,255,255,0.4)',
                      fontWeight: 600,
                      letterSpacing: '.05em',
                    }}
                  >
                    LIVE
                  </span>
                </div>

                
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: 'linear-gradient(to right, transparent 0%, rgba(245,166,35,0.7) 50%, transparent 100%)',
                    animation: 'scanDown 2.8s linear infinite',
                  }}
                />

                
                <div
                  style={{
                    position: 'absolute',
                    top: '28%',
                    left: 10,
                    background: 'rgba(4,4,14,0.82)',
                    border: '1px solid rgba(245,166,35,0.3)',
                    borderRadius: 5,
                    padding: '4px 8px',
                    animation: 'chipFadeIn 1s .4s both',
                  }}
                >
                  <div style={{ fontSize: 6.5, fontWeight: 700, color: '#F5A623', letterSpacing: '.1em', textTransform: 'uppercase' }}>Touch Map</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>47 touches</div>
                </div>

                <div
                  style={{
                    position: 'absolute',
                    top: '52%',
                    right: 10,
                    background: 'rgba(4,4,14,0.82)',
                    border: '1px solid rgba(52,211,153,0.3)',
                    borderRadius: 5,
                    padding: '4px 8px',
                    animation: 'chipFadeIn 1s .8s both',
                  }}
                >
                  <div style={{ fontSize: 6.5, fontWeight: 700, color: '#34D399', letterSpacing: '.1em', textTransform: 'uppercase' }}>Pass Acc</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>94%</div>
                </div>

               
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '24px 12px 14px',
                    background: 'linear-gradient(to top, rgba(4,4,10,0.95), transparent)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      marginBottom: 8,
                    }}
                  >
                    {[
                      { label: 'TOUCHES', val: '47' },
                      { label: 'PASSES', val: '94%' },
                      { label: 'RATING', val: '8.4' },
                    ].map(({ label, val }) => (
                      <div key={label} style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 15, fontWeight: 800, color: '#F5A623' }}>{val}</div>
                        <div style={{ fontSize: 6.5, fontWeight: 700, letterSpacing: '.1em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>{label}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div style={{ height: 2, background: 'rgba(255,255,255,0.08)', borderRadius: 1 }}>
                    <div
                      style={{
                        height: '100%',
                        width: '68%',
                        background: 'linear-gradient(to right,#E8830A,#F5A623)',
                        borderRadius: 1,
                      }}
                    />
                  </div>
                </div>

                
                {[
                  { top: 7, left: 7, borderTop: '1.5px solid rgba(245,166,35,0.5)', borderLeft: '1.5px solid rgba(245,166,35,0.5)' },
                  { top: 7, right: 7, borderTop: '1.5px solid rgba(245,166,35,0.5)', borderRight: '1.5px solid rgba(245,166,35,0.5)' },
                  { bottom: 7, left: 7, borderBottom: '1.5px solid rgba(245,166,35,0.5)', borderLeft: '1.5px solid rgba(245,166,35,0.5)' },
                  { bottom: 7, right: 7, borderBottom: '1.5px solid rgba(245,166,35,0.5)', borderRight: '1.5px solid rgba(245,166,35,0.5)' },
                ].map((s, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      width: 14,
                      height: 14,
                      ...s,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        
        <div
          style={{
            flex: 1,
            minWidth: 300,
            minHeight: 500,
            borderRadius: 18,
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.055)',
            position: 'relative',
          }}
        >
          <RightCanvas />

          
          <div
            style={{
              position: 'absolute',
              top: 18,
              left: 20,
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: '.18em',
                color: 'rgba(245,166,35,0.65)',
                textTransform: 'uppercase',
                marginBottom: 3,
              }}
            >
              Neural Pitch Engine
            </div>
            <div
              style={{
                fontSize: 17,
                fontWeight: 700,
                color: 'rgba(255,255,255,0.88)',
                letterSpacing: '-0.02em',
              }}
            >
              Tactical Intelligence Map
            </div>
          </div>

          
          <div
            style={{
              position: 'absolute',
              bottom: 18,
              left: 18,
              display: 'flex',
              gap: 14,
              pointerEvents: 'none',
            }}
          >
            {[
              { color: '#F5A623', label: 'Your team' },
              { color: '#34D399', label: 'Opponents' },
            ].map(({ color, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: color }} />
                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', fontWeight: 600, letterSpacing: '.05em', textTransform: 'uppercase' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>  

  
      <section
        style={{
          borderTop: '1px solid rgba(255,255,255,0.055)',
          padding: '88px 24px',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '.2em',
                color: '#34D399',
                textTransform: 'uppercase',
                marginBottom: 14,
              }}
            >
              The Process
            </div>
            <h2
              style={{
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                margin: 0,
              }}
            >
              Three steps to elite-level clarity.
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))',
              gap: 16,
            }}
          >
            {[
              {
                icon: <Cpu size={18} />,
                step: 'Upload',
                title: 'Feed the Engine',
                desc: 'Drop your match or training footage. Our AI processes every frame, every touch, every decision in minutes.',
              },
              {
                icon: <Shield size={18} />,
                step: 'AI Analysis',
                title: 'Tactical Breakdown',
                desc: 'Get precise timestamps of mistakes with side-by-side comparisons to elite players like De Bruyne or Pedri.',
              },
              {
                icon: <TrendingUp size={18} />,
                step: 'Improve',
                title: 'Growth & Tracking',
                desc: 'Targeted drills, AI coaching conversations, and a live performance rating that proves you are getting better.',
              },
            ].map(({ icon, step, title, desc }, i) => (
              <div
                key={step}
                className="step-card"
                style={{
                  padding: '32px 28px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 16,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color .25s, background .25s',
                  cursor: 'default',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: -12,
                    right: -6,
                    fontSize: 88,
                    fontWeight: 900,
                    color: 'rgba(255,255,255,0.022)',
                    letterSpacing: '-0.06em',
                    lineHeight: 1,
                    userSelect: 'none',
                  }}
                >
                  0{i + 1}
                </div>
                <div style={{ color: '#F5A623', marginBottom: 20 }}>{icon}</div>
                <div
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: '.18em',
                    color: '#F5A623',
                    textTransform: 'uppercase',
                    marginBottom: 7,
                  }}
                >
                  {step}
                </div>
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    letterSpacing: '-0.025em',
                    margin: '0 0 12px',
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: 'rgba(255,255,255,0.42)',
                    lineHeight: 1.68,
                    margin: 0,
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> 

      {/* ── TESTIMONIALS ── */}
      <section
        style={{
          padding: '88px 24px',
          borderTop: '1px solid rgba(255,255,255,0.055)',
          background: 'rgba(255,255,255,0.012)',
        }}
      >
        <div style={{ maxWidth: 880, margin: '0 auto', textAlign: 'center' }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '.2em',
              color: '#34D399',
              textTransform: 'uppercase',
              marginBottom: 14,
            }}
          >
            Proof
          </div>
          <h2
            style={{
              fontSize: 'clamp(24px, 3.5vw, 38px)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              margin: '0 0 48px',
            }}
          >
            Built for players who demand academy-level feedback.
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))',
              gap: 16,
              textAlign: 'left',
            }}
          >
            {[
              {
                quote: 'It spotted a flaw in my half-space receiving that my coach had flagged for months. Seeing the video next to Bernardo Silva fixed it in a week.',
                author: 'U18 Academy Midfielder',
              },
              {
                quote: 'The progress tracking makes me want to upload every match. It\'s real-life FIFA career mode — except I\'m actually getting better.',
                author: 'Semi-Pro Winger',
              },
            ].map(({ quote, author }) => (
              <div
                key={author}
                style={{
                  padding: '28px 24px',
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 14,
                }}
              >
                <p
                  style={{
                    fontSize: 15,
                    color: 'rgba(255,255,255,0.72)',
                    fontStyle: 'italic',
                    lineHeight: 1.7,
                    margin: '0 0 20px',
                  }}
                >
                  "{quote}"
                </p>
                <p
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: '.14em',
                    color: '#F5A623',
                    textTransform: 'uppercase',
                    margin: 0,
                  }}
                >
                  — {author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          padding: '36px 40px',
          borderTop: '1px solid rgba(255,255,255,0.055)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            // style={{
            //   width: 22,
            //   height: 22,
            //   background: '#F5A623',
            //   borderRadius: 5,
            //   display: 'flex',
            //   alignItems: 'center',
            //   justifyContent: 'center',
            // }}
          >
            {/* <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
              <polygon points="8,1 10.5,5.8 16,6.6 12,10.4 13,16 8,13.3 3,16 4,10.4 0,6.6 5.5,5.8" fill="#000" />
            </svg> */}
          </div>
          <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: '-0.02em', color: 'rgb(255, 255, 255)' }}>
            ELITE<span style={{ color: '#F5A623' }}> SCOUT</span>
          </span>
        </div>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.22)', margin: 0 }}>
          © 2026 EliteScout · All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: 22 }}>
          {['Privacy', 'Terms', 'Contact'].map((l) => (
            <a
              key={l}
              href="#"
              style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)', textDecoration: 'none' }}
            >
              {l}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}

