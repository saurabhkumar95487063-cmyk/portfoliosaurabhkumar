import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import Loader from './components/Loader';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [loading, setLoading] = useState(true);

  // Initialize AOS and handle loading screen
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 50,
    });

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  // Flashlight Mouse Tracker — throttled & desktop-only
  useEffect(() => {
    // Skip on touch/mobile devices — no mouse cursor
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return;

    let rafId = null;
    const handleMouseMove = (e) => {
      if (rafId) return; // throttle to 1 update per animation frame
      rafId = requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
        rafId = null;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Track active section on scroll using IntersectionObserver for better performance
  useEffect(() => {
    if (loading) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    const sections = ['home', 'skills', 'projects', 'about', 'contact'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [loading]);

  const handleScrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
          <ParticleBackground />
          <div className="page-fade-in">
            <div className="flashlight"></div>
            <main>
              <Hero 
                onViewWorkClick={() => handleScrollToSection('projects')} 
                onConnectClick={() => handleScrollToSection('contact')} 
              />
              <Skills />
              <Projects />
              <About />
              <Contact />
              <hr className="section-divider" />
              <Stats />
            </main>
            <Footer />
          </div>
        </>
      )}
    </>
  );
}

export default App;
