import React from "react";
import developerPng from "./images/A.png";

const Contact = () => {
  return (
    <div className="contactUs-main-container">
      {/* Contact Section */}
      <div className="contactUs-content">
        <div className="contactUs-left-para">
          <h3>Let's get in touch</h3>
          <i className="fa fa-envelope"></i>
          <a className="mail-links" href="mailto:adhorarued@gmail.com">
            cupet@gmail.com
          </a>

          <i className="fa fa-linkedin"></i>
          <a className="mail-links" href="https://www.linkedin.com/in/rahnuma-rued/">
            User Name: CuPet
          </a>

          <i className="fa fa-github"></i>
          <a className="mail-links" href="https://github.com/Adhora16">
            CuPet
          </a>

          <i className="fa fa-instagram"></i>
          <a className="mail-links" href="https://www.instagram.com/adhora_rued/">
            @cupet
          </a>

          <i className="fa fa-phone"></i>
          <a className="mail-links" href="tel:+8801531339190">
            +88 015 31339190
          </a>
        </div>

        <div className="contactUs-pic">
          <img src={developerPng} alt="Profile" />
        </div>
      </div>

      {/* Volunteer Section */}
      <div className="volunteer-section">
        <h3>Want to be a Volunteer?</h3>
        <p>If you are interested in joining us as a volunteer, please fill out the form below:</p>
        <a 
          href="https://docs.google.com/forms/d/e/1FAIpQLSc3VLJdz-r0UmzTG5UYxZr9J-soAqTttYVjoy2kvXCOhBzqYw/viewform?usp=header" 
          target="_blank" 
          rel="noopener noreferrer"
          className="volunteer-link"
        >
          Fill out the Volunteer Form
        </a>
      </div>
    </div>
  );
};

export default Contact;
