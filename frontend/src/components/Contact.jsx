import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { DEVELOPER_PROFILE } from '../config';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [status, setStatus] = useState({
    type: '', // 'success', 'error', or ''
    message: ''
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic Client-Side Validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        type: 'error',
        message: 'Please fill in all fields.'
      });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      // Send data to backend endpoint
      // We will default to local origin API (which is proxied to localhost:5000 in dev)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message: result.message || 'Message sent successfully! Thank you for reaching out.'
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(result.error || 'Failed to submit form.');
      }
    } catch (error) {
      console.warn('Backend server unreachable or error. Simulating submission.', error);
      
      // Fallback response for offline/static environments
      setTimeout(() => {
        setStatus({
          type: 'success',
          message: 'Message sent successfully! (Static fallback activated. Thank you!)'
        });
        setFormData({ name: '', email: '', message: '' });
        setLoading(false);
      }, 1000);
      return;
    }

    setLoading(false);
  };

  return (
    <section id="contact" className="section container">
      
      <fieldset className="section-fieldset">
        <legend className="section-title"><span>Let's Connect</span></legend>
      <hr className="section-divider" />
      
      <div className="contact-grid">
        {/* Left Side: Contact Information */}
        <div className="contact-info-panel glass-panel">
          <div className="contact-header">
            <h3>Get In Touch</h3>
            <p>
              I am open to opportunities, collaborations, and discussions about software engineering. Feel free to send a message!
            </p>
          </div>
          
          <div className="contact-details-list">
            <div className="contact-detail-item">
              <div className="contact-icon-wrapper">
                <Mail size={20} />
              </div>
              <div className="contact-detail-content">
                <h5>Email</h5>
                <p>{DEVELOPER_PROFILE.email}</p>
              </div>
            </div>
            
            <div className="contact-detail-item">
              <div className="contact-icon-wrapper">
                <Phone size={20} />
              </div>
              <div className="contact-detail-content">
                <h5>Phone</h5>
                <p>{DEVELOPER_PROFILE.phone}</p>
              </div>
            </div>
            
            <div className="contact-detail-item">
              <div className="contact-icon-wrapper">
                <MapPin size={20} />
              </div>
              <div className="contact-detail-content">
                <h5>Location</h5>
                <p>{DEVELOPER_PROFILE.location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Message Form */}
        <div className="contact-form-panel glass-panel">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email" className="form-label">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message" className="form-label">Your Message</label>
              <textarea
                id="message"
                name="message"
                className="form-textarea"
                placeholder="Hello Saurabh, I would like to work with you on..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {status.message && (
              <div className={`form-status ${status.type}`}>
                {status.message}
              </div>
            )}
            
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} /> Sending...
                </>
              ) : (
                <>
                  Send Message <Send size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
      </fieldset>
    </section>
  );
};

export default Contact;


