import React, { useEffect, useRef } from 'react';

/**
 * Premium, highly optimized HTML5 Canvas 3D Star / Constellation Background.
 * Uses zero external libraries, operates on a requestAnimationFrame loop,
 * and features auto-pause when tab is hidden, retina scaling, responsive particle counts,
 * and fluid mouse interactive lines.
 */
const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    const mouse = { x: null, y: null };
    let width = 0;
    let height = 0;
    let dpr = 1;
    let isTabVisible = true;

    // Helper to convert hex colors to RGBA easily
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : { r: 255, g: 255, b: 255 };
    };

    const cyanRgb = hexToRgb('#00f0ff');
    const purpleRgb = hexToRgb('#bd00ff');

    // Resize handler with performance-optimized logic
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2 to avoid rendering bottleneck

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      // Adjust particle count based on screen width
      const particleCount = width < 768 ? 25 : 65;
      initParticles(particleCount);
    };

    // Initialize particles
    const initParticles = (count) => {
      particles = [];
      for (let i = 0; i < count; i++) {
        const baseRadius = 0.8 + Math.random() * 1.5;
        const colorType = i % 2 === 0 ? 'cyan' : 'purple';
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35, // Slow, elegant drifting velocity
          vy: (Math.random() - 0.5) * 0.35,
          radius: baseRadius,
          baseRadius: baseRadius,
          colorType: colorType,
          colorRgb: colorType === 'cyan' ? cyanRgb : purpleRgb,
          alpha: 0.15 + Math.random() * 0.45,
        });
      }
    };

    // Core drawing and updating logic
    const draw = () => {
      if (!isTabVisible) return;

      ctx.clearRect(0, 0, width, height);

      const maxDistance = 115; // Constellation line threshold
      const mouseMaxDistance = 135; // Mouse line threshold

      // Update positions & Draw particles
      particles.forEach((p) => {
        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around screen edges smoothly
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Interaction with mouse cursor
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseMaxDistance) {
            // Draw connection to mouse
            const alpha = (1 - dist / mouseMaxDistance) * 0.18;
            ctx.strokeStyle = `rgba(${p.colorRgb.r}, ${p.colorRgb.g}, ${p.colorRgb.b}, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();

            // Gently increase particle size when mouse is nearby
            p.radius = p.baseRadius * (1 + (1 - dist / mouseMaxDistance) * 0.6);
          } else {
            p.radius = p.baseRadius;
          }
        } else {
          p.radius = p.baseRadius;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.colorRgb.r}, ${p.colorRgb.g}, ${p.colorRgb.b}, ${p.alpha})`;
        ctx.fill();
      });

      // Draw constellation connections between particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.11;
            // Mix colors or use cyan-based stroke for elegant blending
            ctx.strokeStyle = `rgba(${p1.colorRgb.r}, ${p1.colorRgb.g}, ${p1.colorRgb.b}, ${alpha})`;
            ctx.lineWidth = 0.45;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    // Track mouse coordinates
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    // Auto-pause loop when page is hidden (saves CPU, RAM, & battery)
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        // Resume animation
        draw();
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    };

    // Event listeners registration
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Initial setup
    handleResize();
    draw();

    // Cleanup logic
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: -1,
        background: 'transparent',
      }}
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;
