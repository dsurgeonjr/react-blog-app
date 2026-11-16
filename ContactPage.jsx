import { useState } from "react";
import { Mail, Send } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setSubmitted(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <main className="main-content">
      <div className="content-wrap contact-wrap">
        <div className="intro-label"><span /> LET'S CONNECT</div>
        <section className="contact-intro">
          <span className="contact-icon"><Mail size={22} /></span>
          <h1>Get in touch</h1>
          <p>Have a question, suggestion, or idea for a future post? Send a message below.</p>
        </section>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="contact-name">Name</label>
            <input id="contact-name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Your name" required />
          </div>
          <div className="form-field">
            <label htmlFor="contact-email">Email</label>
            <input id="contact-email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
          </div>
          <div className="form-field">
            <label htmlFor="contact-message">Message</label>
            <textarea id="contact-message" name="message" value={form.message} onChange={handleChange} placeholder="Write your message..." rows="6" required />
          </div>
          <button className="submit-button" type="submit"><Send size={15} /> Send message</button>
          {submitted && <p className="success-message" role="status">Thanks! Your message was recorded for this demonstration. No email was sent.</p>}
        </form>
      </div>
    </main>
  );
}
