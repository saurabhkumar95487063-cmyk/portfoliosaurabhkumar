import React from 'react';
import { Github, Linkedin, Instagram, Mail } from 'lucide-react';
import { DEVELOPER_PROFILE } from '../config';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-logo">
          {DEVELOPER_PROFILE.name}
        </div>
        <div className="footer-socials">
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
        <div className="footer-text">
          &copy; {currentYear} {DEVELOPER_PROFILE.name}. All rights reserved. Made with ❤️ and 💻.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
