
import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const writingCategories = [
  {
    number: "01",
    title: "Stories & Thoughts",
    description: "Original stories, personal thoughts and creative expressions.",
    label: "CREATIVE WRITING",
  },
  {
    number: "02",
    title: "My Journey",
    description: "Learning experiences, ideas and personal development.",
    label: "PERSONAL JOURNEY",
  },
  {
    number: "03",
    title: "Poetry & Expressions",
    description: "Creative words, poetry and meaningful expressions.",
    label: "POETRY",
  },
];

const knowledgeCategories = [
  {
    number: "01",
    title: "Technology & AI",
    description: "Explore technology, artificial intelligence and digital innovation.",
  },
  {
    number: "02",
    title: "History & Culture",
    description: "Discover history, culture, traditions and interesting knowledge.",
  },
  {
    number: "03",
    title: "Learning Resources",
    description: "Simple educational information and useful learning topics.",
  },
];

const portfolioItems = [
  {
    number: "01",
    title: "Personal Website",
    description: "Building and developing THE BAIKAN'S WRITTES.",
    status: "CURRENT PROJECT",
  },
  {
    number: "02",
    title: "Creative Writing",
    description: "A collection of ideas, stories and original writing.",
    status: "CREATIVE WORK",
  },
  {
    number: "03",
    title: "Learning Projects",
    description: "Exploring new skills, technology and creative ideas.",
    status: "LEARNING",
  },
];

function SectionHeading({ label, title, highlight, description }) {
  return (
    <div className="section-heading">
      <p className="tag">{label}</p>
      <h2>
        {title} <span>{highlight}</span>
      </h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function App() {
  return (
    <div className="website">
      <nav className="navbar">
        <a className="brand" href="#home">
          BAIKAN<span>.</span>
        </a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#writings">Writings</a>
          <a href="#knowledge">Knowledge</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <header className="hero" id="home">
        <p className="tag">WELCOME TO MY CREATIVE WORLD</p>

        <h1>
          THE BAIKAN'S
          <br />
          <span>WRITTES</span>
        </h1>

        <p className="intro">
          A personal space for thoughts, stories, knowledge,
          creativity and ideas.
        </p>

        <a className="main-button" href="#about">
          Explore My World ↗
        </a>

        <p className="hero-note">THINK · CREATE · LEARN · SHARE</p>
      </header>

      <section className="section" id="about">
        <SectionHeading
          label="DISCOVER MY STORY"
          title="About"
          highlight="Me"
          description="A little introduction to the person behind this creative space."
        />

        <div className="about-content">
          <div className="about-mark">B.</div>
          <div>
            <h3>Welcome to my world.</h3>
            <p>
              Welcome! I am Baikan. THE BAIKAN'S WRITTES is my
              personal creative space where I share my thoughts,
              writings, ideas, learning experiences and journey.
            </p>
            <p>
              This website brings together creativity, knowledge
              and personal projects in one place.
            </p>
          </div>
        </div>
      </section>

      <section className="section writings" id="writings">
        <SectionHeading
          label="MY CREATIVE SPACE"
          title="My"
          highlight="Writings"
          description="Stories, thoughts and creative expressions from my world."
        />

        <div className="card-grid">
          {writingCategories.map((item) => (
            <article className="content-card" key={item.number}>
              <span className="card-number">{item.number}</span>
              <p className="card-label">{item.label}</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <a href="#contact" className="text-link">
                Explore more ↗
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section knowledge" id="knowledge">
        <SectionHeading
          label="EXPLORE AND DISCOVER"
          title="Knowledge"
          highlight="Corner"
          description="A place for learning, discovering and sharing useful information."
        />

        <div className="card-grid">
          {knowledgeCategories.map((item) => (
            <article className="content-card" key={item.number}>
              <span className="card-number">{item.number}</span>
              <p className="card-label">KNOWLEDGE</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <a href="#contact" className="text-link">
                Discover more ↗
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section portfolio" id="portfolio">
        <SectionHeading
          label="MY WORK AND PROGRESS"
          title="My"
          highlight="Portfolio"
          description="Projects, creative work and things I am learning and developing."
        />

        <div className="card-grid">
          {portfolioItems.map((item) => (
            <article className="content-card" key={item.number}>
              <span className="card-number">{item.number}</span>
              <p className="card-label">{item.status}</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section contact" id="contact">
        <SectionHeading
          label="LET'S CONNECT"
          title="Stay"
          highlight="Connected"
          description="Thank you for visiting my creative world. Follow my journey and stay connected."
        />

        <a
          className="main-button"
          href="https://www.instagram.com/"
          target="_blank"
          rel="noreferrer"
        >
          Instagram ↗
        </a>
      </section>

      <footer>
        <a className="brand" href="#home">
          BAIKAN<span>.</span>
        </a>
        <p>Think. Create. Learn. Share.</p>
        <p>© 2026 THE BAIKAN'S WRITTES. All rights reserved.</p>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
