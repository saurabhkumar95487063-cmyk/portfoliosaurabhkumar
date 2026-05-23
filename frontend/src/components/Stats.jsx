import React from 'react';
import { Rocket, Code2, Trophy, Coffee } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import { DEVELOPER_PROFILE } from '../config';

const Stats = () => {
  const statItems = [
    {
      id: 'projects',
      value: `${DEVELOPER_PROFILE.stats.projectsCompleted}+`,
      label: 'Projects Completed',
      icon: <Rocket size={24} />
    },
    {
      id: 'tech',
      value: `${DEVELOPER_PROFILE.stats.technologies}+`,
      label: 'Technologies',
      icon: <Code2 size={24} />
    },
    {
      id: 'certifications',
      value: `${DEVELOPER_PROFILE.stats.certifications}`,
      label: 'Certifications',
      icon: <Trophy size={24} />
    },
    {
      id: 'coding',
      value: `${DEVELOPER_PROFILE.stats.hoursCoding}+`,
      label: 'Hours of Coding',
      icon: <Coffee size={24} />
    }
  ];

  return (
    <div className="container" style={{ position: 'relative', zIndex: 1 }} data-aos="fade-up">
      <div className="stats-grid">
        {statItems.map((item) => (
          <Tilt key={item.id} tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable={true} glareMaxOpacity={0.15} glareColor="#00f0ff" glarePosition="all" scale={1.05} transitionSpeed={400} tiltReverse={true}>
            <div className="stats-card glass-panel" style={{ height: '100%' }}>
              <div className="stats-icon">
                {item.icon}
              </div>
              <div className="stats-number">{item.value}</div>
              <div className="stats-label">{item.label}</div>
            </div>
          </Tilt>
        ))}
      </div>
    </div>
  );
};

export default Stats;

