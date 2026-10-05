import React, { useEffect, useRef } from "react";

const LINK_DIST = 130;
const MOUSE_DIST = 180;

const readColor = (name, fallback) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;

// Particle constellation: drifting nodes linked by fading lines that reach toward the cursor.
const HeroCanvas = () => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };
    let w = 0;
    let h = 0;
    let points = [];
    let frame = 0;
    let tick = 0;
    let visible = true;
    let colors = [];

    const refreshColors = () => {
      const blue = readColor("--accent", "#3b82f6");
      const soft = readColor("--accent-soft", "#60a5fa");
      colors = [blue, soft, blue];
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(60, (w * h) / 20000));
      points = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
        c: Math.floor(Math.random() * 3),
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        if (!reduce) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        }

        for (let j = i + 1; j < points.length; j++) {
          const q = points[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < LINK_DIST) {
            ctx.globalAlpha = (1 - d / LINK_DIST) * 0.18;
            ctx.strokeStyle = colors[p.c];
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }

        const md = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (md < MOUSE_DIST) {
          ctx.globalAlpha = (1 - md / MOUSE_DIST) * 0.45;
          ctx.strokeStyle = colors[p.c];
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
          // gentle pull toward the cursor
          p.x += (mouse.x - p.x) * 0.004;
          p.y += (mouse.y - p.y) * 0.004;
        }

        ctx.globalAlpha = 0.55;
        ctx.fillStyle = colors[p.c];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      // Theme can flip at any time; re-read the tokens every ~second.
      if (tick++ % 60 === 0) refreshColors();
      if (visible) draw();
      frame = requestAnimationFrame(loop);
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    refreshColors();
    resize();
    if (reduce) {
      draw();
    } else {
      loop();
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
    }
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="hero__canvas" aria-hidden="true" />;
};

export default HeroCanvas;
