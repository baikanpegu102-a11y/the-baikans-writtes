
import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function App() {
  return (
    <div className="website">
      <nav className="navbar">
        <h2>BAIKAN<span>.</span></h2>
        <div>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#writings">Writings</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <header className="hero" id="home">
        <p className="tag">WELCOME TO MY CREATIVE WORLD</p>
        <h1>THE BAIKAN'S<br /><span>WRITTES</span></h1>
        <p className="intro">
          A personal space for thoughts, stories, creativity and ideas.
        </p>
        <a className="main-button" href="#about">Explore My World</a>
      </header>

      <section className="section" id="about">
        <p className="tag">DISCOVER MY STORY</p>
        <h2>About <span>Me</span></h2>
        <p>
          Welcome! I am Baikan. This is my personal creative space
          where I share my thoughts, writings, ideas and journey.
        </p>
      </section>

      <section className="section writings" id="writings">
        <p className="tag">MY CREATIVE SPACE</p>
        <h2>My <span>Writings</span></h2>
        <div className="writing-card">
          <h3>Stories & Thoughts</h3>
          <p>Words, ideas and stories from my world.</p>
        </div>
        <div className="writing-card">
          <h3>My Journey</h3>
          <p>Creativity, learning and experiences.</p>
        </div>
      </section>

      <section className="section" id="contact">
        <p className="tag">LET'S CONNECT</p>
        <h2>Stay <span>Connected</span></h2>
        <p>Follow my creative journey on Instagram.</p>
        <a className="main-button"
          href="https://www.instagram.com/"
          target="_blank"
          rel="noreferrer">
          Instagram
        </a>
      </section>

      <footer>
        © 2026 THE BAIKAN'S WRITTES. All rights reserved.
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);

