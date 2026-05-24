import React from 'react';

/**
 * Lightweight CSS-only particle background.
 * Replaces the heavy react-tsparticles library that was
 * causing high CPU/GPU usage and device heating.
 * Uses simple CSS animations on small divs instead of canvas rendering.
 */
const ParticleBackground = () => {
  // Only 12 particles — enough for ambiance, light on resources
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: 2 + Math.random() * 3,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: 15 + Math.random() * 25,
    delay: Math.random() * -20,
    opacity: 0.15 + Math.random() * 0.2,
    color: i % 2 === 0 ? 'var(--color-cyan)' : 'var(--color-purple)',
  }));

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1,
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            borderRadius: '50%',
            backgroundColor: p.color,
            opacity: p.opacity,
            animation: `cssParticleDrift ${p.duration}s ease-in-out ${p.delay}s infinite`,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  );
};

export default ParticleBackground;
