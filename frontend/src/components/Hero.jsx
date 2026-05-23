import React from 'react';
import { Github, Linkedin, Instagram, Mail, ArrowRight, Code, GraduationCap, Briefcase } from 'lucide-react';
import { DEVELOPER_PROFILE } from '../config';

const Hero = ({ onViewWorkClick, onConnectClick }) => {

  return (
    <section id="home" className="section container">
      <div className="hero-content">
        {/* Left Side: Info & Copy */}
        <div className="hero-text">
          <h3>Hi, I'm</h3>
          <h1 className="animated-gradient-text" style={{ paddingBottom: '5px' }}>{DEVELOPER_PROFILE.name}</h1>
          <h2>
            BCA Student & Aspiring <br />
            <span style={{ color: 'var(--color-cyan)', textShadow: '0 0 10px rgba(0, 240, 255, 0.3)' }}>Software Developer</span>
          </h2>
          <p className="hero-desc">
            {DEVELOPER_PROFILE.tagline}
          </p>
          
          <div className="hero-actions">
            <button className="btn-primary" onClick={onViewWorkClick}>
              View My Work <ArrowRight size={18} />
            </button>
            <button className="btn-secondary" onClick={onConnectClick}>
              Let's Connect <Mail size={18} />
            </button>
          </div>

          <div className="social-links">
            <a href={DEVELOPER_PROFILE.socials.github} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href={DEVELOPER_PROFILE.socials.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href={DEVELOPER_PROFILE.socials.instagram} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href={DEVELOPER_PROFILE.socials.email} className="social-icon" aria-label="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Right Side: Animated Glowing Profile Wrapper */}
        <div className="hero-visual">
          <div className="glowing-circle-container floating-element">
            <div className="glowing-bg"></div>
            <div className="orbit-circle-1"></div>
            <div className="orbit-circle-2"></div>
            
            <div className="profile-wrapper">
              <div className="profile-img-container">
                <img 
                  src={DEVELOPER_PROFILE.profileImage} 
                  alt={DEVELOPER_PROFILE.name} 
                  className="profile-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop";
                  }}
                />
              </div>
            </div>

             {/* Floating Cyber Badges */}
            <div className="float-badge badge-1">
              <Code className="badge-icon" size={15} />
              <div>
                <div style={{ fontSize: '0.65rem', fontWeight: 700 }}>DEVELOPER</div>
                <div style={{ fontSize: '0.55rem', color: 'var(--text-secondary)' }}>BCA Student</div>
              </div>
            </div>

            <div className="float-badge badge-2">
              <GraduationCap className="badge-icon" size={15} />
              <div>
                <div style={{ fontSize: '0.65rem', fontWeight: 700 }}>ACADEMICS</div>
                <div style={{ fontSize: '0.55rem', color: 'var(--text-secondary)' }}>Coding Enthusiast</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

