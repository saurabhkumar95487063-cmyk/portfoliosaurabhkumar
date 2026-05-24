import React, { useState, useEffect, useRef } from 'react';
import { Rocket, Code2, Trophy, Coffee } from 'lucide-react';
import { DEVELOPER_PROFILE } from '../config';

const AnimatedCounter = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const num = parseInt(target);
          const duration = 2000;
          const step = Math.max(1, Math.floor(num / (duration / 30)));
          let current = 0;
          
          const timer = setInterval(() => {
            current += step;
            if (current >= num) {
              current = num;
              clearInterval(timer);
            }
            setCount(current);
          }, 30);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const Stats = () => {
  const statItems = [
    {
      id: 'projects',
      numValue: DEVELOPER_PROFILE.stats.projectsCompleted,
      suffix: '+',
      label: 'Projects Completed',
      icon: <Rocket size={24} />
    },
    {
      id: 'tech',
      numValue: DEVELOPER_PROFILE.stats.technologies,
      suffix: '+',
      label: 'Technologies',
      icon: <Code2 size={24} />
    },
    {
      id: 'certifications',
      numValue: DEVELOPER_PROFILE.stats.certifications,
      suffix: '',
      label: 'Certifications',
      icon: <Trophy size={24} />
    },
    {
      id: 'coding',
      numValue: DEVELOPER_PROFILE.stats.hoursCoding,
      suffix: '+',
      label: 'Hours of Coding',
      icon: <Coffee size={24} />
    }
  ];

  return (
    <div className="container" style={{ position: 'relative', zIndex: 1 }} data-aos="fade-up">
      <div className="stats-grid">
        {statItems.map((item) => (
          <div key={item.id} className="stats-card glass-panel" style={{ height: '100%' }}>
            <div className="stats-icon">
              {item.icon}
            </div>
            <div className="stats-number">
              <AnimatedCounter target={item.numValue} suffix={item.suffix} />
            </div>
            <div className="stats-label">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
