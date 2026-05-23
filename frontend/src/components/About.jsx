import React from 'react';
import { User, Terminal } from 'lucide-react';
import { DEVELOPER_PROFILE } from '../config';

const About = () => {
  return (
    <section id="about" className="section container">
      <legend className="section-title"><span>About Me</span></legend>
      <hr className="section-divider" />
      
      <div className="about-grid">
        {/* Left Side: Bio Details */}
        <div className="about-details">
          <div className="about-avatar-wrapper">
            <div className="about-avatar-inner">
              <User size={32} />
            </div>
          </div>
          <div className="about-text">
            <h4>BCA Student & Coding Enthusiast</h4>
            <p>{DEVELOPER_PROFILE.about.bio}</p>
            <p>
              My coding journey started with learning C and object-oriented concepts in Java, and I have since expanded my skillset to include modern web technologies such as HTML/CSS, JavaScript, and relational databases like MySQL. I focus on writing clean, efficient, and well-structured code.
            </p>
          </div>
        </div>

        {/* Right Side: Interactive Mock Code Editor */}
        <div className="editor-terminal glass-panel">
          <div className="editor-header">
            <div className="editor-dots">
              <span className="editor-dot dot-red"></span>
              <span className="editor-dot dot-yellow"></span>
              <span className="editor-dot dot-green"></span>
            </div>
            <div className="editor-tab">
              <Terminal size={14} /> developer.js
            </div>
            <div style={{ width: '40px' }}></div>
          </div>
          <div className="editor-body">
            <div className="line-numbers">
              <div>01</div>
              <div>02</div>
              <div>03</div>
              <div>04</div>
              <div>05</div>
              <div>06</div>
              <div>07</div>
            </div>
             <div className="code-content">
              <div><span className="syntax-keyword">const</span> <span className="syntax-variable">developer</span> = <span className="syntax-bracket">&#123;</span></div>
              <div>  <span className="syntax-property">name:</span> <span className="syntax-string">"Saurabh Kumar"</span>,</div>
              <div>  <span className="syntax-property">role:</span> <span className="syntax-string">"BCA Student"</span>,</div>
              <div>  <span className="syntax-property">skills:</span> <span className="syntax-bracket">[</span><span className="syntax-string">"C"</span>, <span className="syntax-string">"Java"</span>, <span className="syntax-string">"Python"</span>, <span className="syntax-string">"Web Dev"</span><span className="syntax-bracket">]</span>,</div>
              <div>  <span className="syntax-property">passion:</span> <span className="syntax-string">"Building solutions & learning"</span>,</div>
              <div>  <span className="syntax-property">goal:</span> <span className="syntax-string">"To become a Full Stack Developer"</span></div>
              <div><span className="syntax-bracket">&#125;</span>;</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

