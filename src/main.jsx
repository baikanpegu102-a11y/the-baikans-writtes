import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { db } from "./firebase";
import {
  collection,
  getDocs
} from "firebase/firestore";
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

// SAMPLE ARTICLES
// Add your own articles here later.

const articles = [
  {
    id: 1,
    title: "The Beginning of a New Journey",
    category: "My Journey",
    date: "November 27, 2026",
    excerpt: "Every great journey begins with a small step.",
    content: `Every great journey begins with a small step.

Starting something new can be exciting. Sometimes we have big dreams, but we do not know where to begin.

The important thing is to keep learning, stay curious and take one step at a time.

This is the beginning of a new creative journey. Through this website, I want to share my thoughts, ideas, knowledge and experiences.

Think. Create. Learn. Share.`,
  },
  {
    id: 2,
    title: "Why Learning Never Stops",
    category: "Thoughts",
    date: "November 27, 2026",
    excerpt: "Learning helps us discover new ideas and possibilities.",
    content: `Learning is not limited to classrooms or textbooks.

Every day gives us an opportunity to discover something new. We can learn from books, technology, nature, people and our own experiences.

Curiosity helps us ask questions, explore ideas and understand the world around us.

Never stop asking questions. Never stop learning.`,
  },
  {
    id: 3,
    title: "The World of Technology and AI",
    category: "Technology",
    date: "November 27, 2026",
    excerpt: "Discover how technology and artificial intelligence are changing our world.",
    content: `Technology is an important part of modern life.

Artificial intelligence, often called AI, is a field of technology that helps computers perform tasks that normally require human intelligence.

AI can help people learn, organize information, translate languages and explore creative ideas.

Technology is always developing. Understanding it can help us prepare for the future.`,
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
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedArticle, setSelectedArticle] = useState(null);

  const categories = [
    "All",
    ...new Set(articles.map((article) => article.category)),
  ];

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || article.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="website">
      <nav className="navbar">
        <a className="brand" href="#home">
          BAIKAN<span>.</span>
        </a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#writings">Blog</a>
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

        <a className="main-button" href="#writings">
          Explore My Writings ↗
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

      {/* BLOG SECTION */}

      <section className="section writings" id="writings">
        <SectionHeading
          label="MY CREATIVE SPACE"
          title="My"
          highlight="Blog"
          description="Explore stories, thoughts, ideas and creative expressions."
        />

        {selectedArticle ? (
          <article className="article-detail">
            <button
              className="back-button"
              onClick={() => setSelectedArticle(null)}
            >
              ← Back to Articles
            </button>

            <p className="card-label">
              {selectedArticle.category}
            </p>

            <h2>{selectedArticle.title}</h2>

            <p className="article-date">
              Published: {selectedArticle.date}
            </p>

            <div className="article-content">
              {selectedArticle.content
                .split("\n")
                .map((paragraph, index) =>
                  paragraph.trim() ? (
                    <p key={index}>{paragraph}</p>
                  ) : null
                )}
            </div>
          </article>
        ) : (
          <>
            <div className="blog-controls">
              <input
                type="search"
                placeholder="Search articles..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search articles"
              />

              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                aria-label="Filter articles by category"
              >
                {categories.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="card-grid">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article) => (
                  <article className="content-card" key={article.id}>
                    <p className="card-label">
                      {article.category}
                    </p>

                    <h3>{article.title}</h3>

                    <p>{article.excerpt}</p>

                    <p className="article-date">
                      {article.date}
                    </p>

                    <button
                      className="text-link"
                      onClick={() => setSelectedArticle(article)}
                    >
                      Read Article ↗
                    </button>
                  </article>
                ))
              ) : (
                <p className="no-articles">
                  No articles found. Try another search.
                </p>
              )}
            </div>
          </>
        )}
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
