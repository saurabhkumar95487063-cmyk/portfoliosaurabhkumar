import React, { useState, useEffect } from 'react';
import { Download, Home, User, Briefcase, Code, Mail } from 'lucide-react';
import { DEVELOPER_PROFILE } from '../config';

const Navbar = ({ activeSection, setActiveSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  const mobileNavItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'projects', label: 'Work', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  const handleLinkClick = (id) => {
    setMobileMenuOpen(false);
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <a href="#home" className="logo neon-flicker" onClick={(e) => { e.preventDefault(); handleLinkClick('home'); }}>
            {DEVELOPER_PROFILE.name}
          </a>

          {/* Desktop/Mobile Navigation Drawer */}
          <nav>
            <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(item.id);
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              {mobileMenuOpen && (
                <li>
                  <button className="btn-cv" onClick={() => window.open(DEVELOPER_PROFILE.cvLink, '_blank')}>
                    <Download size={16} /> Download CV
                  </button>
                </li>
              )}
            </ul>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="btn-cv" style={{ display: mobileMenuOpen ? 'none' : 'flex' }} onClick={() => window.open(DEVELOPER_PROFILE.cvLink, '_blank')}>
              <Download size={16} /> Download CV
            </button>
            
            <div className={`menu-btn ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="mobile-bottom-nav">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          const isWork = item.id === 'projects';
          
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`mobile-nav-item ${isActive ? 'active' : ''} ${isWork ? 'work-item' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(item.id);
              }}
            >
              {isWork ? (
                <div className="work-icon-wrapper">
                  <Icon size={20} style={{ transform: 'translateY(-1px)' }} />
                  <span className="mobile-nav-label">{item.label}</span>
                </div>
              ) : (
                <>
                  <Icon size={22} />
                  <span className="mobile-nav-label">{item.label}</span>
                </>
              )}
            </a>
          );
        })}
      </nav>
    </>
  );
};

export default Navbar;
