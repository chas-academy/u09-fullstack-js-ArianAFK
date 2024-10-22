import React from 'react';

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>
        We’d love to hear from you! Whether you’re looking to boost your social media presence, need a new website, or just have questions about our services, feel free to get in touch. Our team is ready to assist you in achieving your digital marketing goals.
      </p>
      <p>
        <strong>Email:</strong> info@bossmedia.com
        <br />
        <strong>Phone:</strong> +123-456-7890
      </p>
      <p>
        You can also fill out the form below, and we’ll get back to you as soon as possible.
      </p>

      <form className="contact-form">
        <label>Name:</label>
        <input type="text" placeholder="Your name" required />

        <label>Email:</label>
        <input type="email" placeholder="Your email" required />

        <label>Message:</label>
        <textarea placeholder="Your message" rows="5" required></textarea>

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default Contact;
