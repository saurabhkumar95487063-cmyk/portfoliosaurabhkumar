import React from 'react';
import { Github, ExternalLink, Code } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import { DEVELOPER_PROFILE } from '../config';

const Projects = () => {
  // Custom mock illustration SVGs for project covers to fit the aesthetic perfectly
  const renderProjectCover = (category) => {
    switch (category) {
      case 'Java':
        return (
          <div className="project-placeholder-img" style={{ background: 'linear-gradient(135deg, #110826 0%, #060211 100%)' }}>
            <Code size={40} style={{ color: '#EA2D2E', filter: 'drop-shadow(0 0 10px rgba(234, 45, 46, 0.4))' }} />
            <span style={{ color: '#EA2D2E', borderColor: 'rgba(234, 45, 46, 0.3)' }}>Swing / JDBC / SQL</span>
            <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>Student database CRUD application</div>
          </div>
        );
      case 'HTML/CSS':
        return (
          <div className="project-placeholder-img" style={{ background: 'linear-gradient(135deg, #092015 0%, #030a06 100%)' }}>
            <svg viewBox="0 0 100 100" width="45" height="45" fill="none" stroke="#22c55e" strokeWidth="2">
              <path d="M50 20 L80 40 L80 70 L50 90 L20 70 L20 40 Z" />
              <path d="M50 20 L50 90" />
              <circle cx="50" cy="50" r="15" fill="#030a06" />
              <path d="M45 50 C 45 42, 55 42, 55 50 C 55 58, 45 58, 45 50" />
            </svg>
            <span style={{ color: '#22c55e', borderColor: 'rgba(34, 197, 150, 0.3)' }}>HTML5 / CSS3 Grid / Flex</span>
            <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>Responsive eCommerce Nursery Store</div>
          </div>
        );
      case 'JavaScript':
      default:
        return (
          <div className="project-placeholder-img" style={{ background: 'linear-gradient(135deg, #1f1b04 0%, #090801 100%)' }}>
            <svg viewBox="0 0 100 100" width="45" height="45" fill="none" stroke="#f7df1e" strokeWidth="2">
              <rect x="25" y="20" width="50" height="60" rx="5" />
              <line x1="35" y1="35" x2="65" y2="35" />
              <line x1="35" y1="50" x2="65" y2="50" />
              <line x1="35" y1="65" x2="55" y2="65" />
              <circle cx="65" cy="65" r="5" fill="#f7df1e" />
            </svg>
            <span style={{ color: '#f7df1e', borderColor: 'rgba(247, 223, 30, 0.3)' }}>Vanilla ES6 / DOM / LocalStorage</span>
            <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>Interactive Task Organizer Web App</div>
          </div>
        );
    }
  };

  return (
    <section id="projects" className="section container">
      
      <fieldset className="section-fieldset">
        <legend className="section-title"><span>My Projects</span></legend>
      <hr className="section-divider" />
      
      <div className="projects-grid">
        {DEVELOPER_PROFILE.projects.map((project) => (
          <Tilt key={project.id} tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable={true} glareMaxOpacity={0.15} glareColor="#00f0ff" glarePosition="all" scale={1.02} transitionSpeed={400} tiltReverse={true}>
            <div className="project-card glass-panel" style={{ height: '100%' }}>
              <div className="project-img-container">
                {project.image.includes('.') ? (
                  <img src={project.image} alt={project.title} className="project-image-real" />
                ) : (
                  renderProjectCover(project.category)
                )}
                <span className="project-category">{project.category}</span>
              </div>
              
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                
                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                    <Github size={16} /> Code
                  </a>
                  {project.demo !== '#' && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link">
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Tilt>
        ))}
      </div>
      </fieldset>
    </section>
  );
};

export default Projects;


