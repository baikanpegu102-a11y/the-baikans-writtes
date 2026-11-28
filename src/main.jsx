
import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { auth, db } from "./firebase";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
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

// GRAMMAR BOOK PAGES
const grammarBookPages = [
  "/books/page-1.jpeg",
  "/books/page-2.jpeg",
  "/books/page-3.jpeg",
  "/books/page-4.jpeg",
  "/books/page-5.jpeg",
  "/books/page-6.jpeg",
];

// SAMPLE ARTICLES

const sampleArticles = [
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
  const [articles, setArticles] = useState(sampleArticles);

  useEffect(() => {
    let isMounted = true;

    async function loadArticles() {
      try {
        const snapshot = await getDocs(collection(db, "articles"));

        if (isMounted && !snapshot.empty) {
          const firebaseArticles = snapshot.docs.map((document) => ({
            id: document.id,
            ...document.data(),
          }));

          setArticles(firebaseArticles);
        }
      } catch (error) {
        console.error("Error loading Firebase articles:", error);
      }
    }

    loadArticles();

    return () => {
      isMounted = false;
    };
  }, []);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [authMode, setAuthMode] = useState("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setCurrentUser);
    return unsubscribe;
  }, []);

  async function handleEmailAuth(event) {
    event.preventDefault();
    setAuthError("");
    setAuthMessage("");
    setAuthLoading(true);

    try {
      if (authMode === "signup") {
        await createUserWithEmailAndPassword(auth, authEmail.trim(), authPassword);
        setAuthMessage("Your account has been created successfully.");
      } else {
        await signInWithEmailAndPassword(auth, authEmail.trim(), authPassword);
        setAuthMessage("You are now signed in.");
      }

      setAuthPassword("");
    } catch (error) {
      const messages = {
        "auth/email-already-in-use": "This email already has an account. Please log in.",
        "auth/invalid-email": "Please enter a valid email address.",
        "auth/weak-password": "Choose a password with at least 6 characters.",
        "auth/invalid-credential": "Email or password is incorrect.",
        "auth/too-many-requests": "Too many attempts. Please wait and try again later.",
      };

      setAuthError(messages[error.code] || "We couldn't complete sign-in. Please try again.");
    } finally {
      setAuthLoading(false);
    }
  }

  async function handleGoogleAuth() {
    setAuthError("");
    setAuthMessage("");
    setAuthLoading(true);

    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      setAuthMessage("You are now signed in with Google.");
    } catch (error) {
      const messages = {
        "auth/popup-closed-by-user": "The sign-in window was closed before finishing.",
        "auth/popup-blocked": "Your browser blocked the sign-in popup. Allow popups and try again.",
        "auth/unauthorized-domain": "This website domain is not authorized in Firebase yet.",
      };

      setAuthError(messages[error.code] || "Google sign-in couldn't be completed. Please try again.");
    } finally {
      setAuthLoading(false);
    }
  }

  async function handleLogout() {
    setAuthError("");
    setAuthMessage("");

    try {
      await signOut(auth);
      setAuthMessage("You have signed out.");
    } catch {
      setAuthError("Sign-out failed. Please try again.");
    }
  }

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
        <a
          className="brand"
          href="#home"
          style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}
        >
          <img
            src="/logo.png"
            alt="THE BAIKAN'S WRITTES logo"
            style={{ width: "42px", height: "42px", objectFit: "contain", display: "block" }}
          />
          BAIKAN<span>.</span>
        </a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#writings">Blog</a>
          <a href="#knowledge">Knowledge</a>
          <a href="#books">Books</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#contact">Contact</a>
          <a href="#account">Login</a>
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

        <div
          className="about-content"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
            flexWrap: "wrap"
          }}
        >
          <img
            src="/baikan-profile.jpg"
            alt="Baikan Pegu"
            style={{
              width: "220px",
              height: "260px",
              objectFit: "cover",
              objectPosition: "center",
              borderRadius: "18px",
              display: "block"
            }}
          />

          <div style={{ flex: "1", minWidth: "240px" }}>
            <h3>Welcome to my world.</h3>
            <p>
              Hello! I'm Baikan Pegu, a Class 9 student from Assam, India.
              I'm curious about artificial intelligence and technology,
              and I enjoy exploring new ideas and learning new things.
            </p>
            <p>
              Outside my studies, I enjoy listening to music and playing
              games. This website is my creative space to share my
              thoughts, writings, interests and learning journey.
            </p>
            <p>
              <strong>My interests:</strong> AI, technology, music and gaming.
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

      {/* BOOKS SECTION */}

      <section className="section" id="books">
        <SectionHeading
          label="MY BOOK COLLECTION"
          title="My"
          highlight="Books"
          description="Explore my original books and learning resources."
        />

        <div className="card-grid">
          <article className="content-card">
            <img
              src="/books/grammar-cover.jpeg"
              alt="Complete English Grammar book cover"
              style={{
                width: "100%",
                height: "280px",
                objectFit: "contain",
                borderRadius: "12px",
                marginBottom: "20px"
              }}
            />

            <p className="card-label">ENGLISH GRAMMAR</p>

            <h3>Complete English Grammar – Class 9 & 10</h3>

            <p>
              A handwritten English Grammar book for students
              of Classes 9 and 10.
            </p>

            <a className="text-link" href="#grammar-pages">
              Read Book ↗
            </a>
          </article>
        </div>

        <div id="grammar-pages" style={{ marginTop: "50px" }}>
          <h3 style={{ marginBottom: "25px" }}>
            Complete English Grammar – Book Pages
          </h3>

          <div className="card-grid">
            {grammarBookPages.map((page, index) => (
              <article className="content-card" key={page}>
                <p className="card-label">
                  PAGE {index + 1}
                </p>

                <a href={page} target="_blank" rel="noreferrer">
                  <img
                    src={page}
                    alt={`Grammar book page ${index + 1}`}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "350px",
                      objectFit: "contain",
                      borderRadius: "10px"
                    }}
                  />
                </a>
              </article>
            ))}
          </div>
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

      <section className="section" id="account">
        <SectionHeading
          label="VISITOR ACCOUNT"
          title="Login"
          highlight=" / Sign Up"
          description="Create an account or sign in to your visitor account."
        />

        <div
          className="content-card"
          style={{ maxWidth: "520px", margin: "0 auto", padding: "28px" }}
        >
          {currentUser ? (
            <div>
              <h3>Welcome!</h3>
              <p style={{ margin: "12px 0" }}>
                Signed in as {currentUser.displayName || currentUser.email}.
              </p>
              <button
                className="main-button"
                type="button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginBottom: "20px",
                  flexWrap: "wrap"
                }}
              >
                <button
                  className={authMode === "login" ? "main-button" : "text-link"}
                  type="button"
                  onClick={() => {
                    setAuthMode("login");
                    setAuthError("");
                    setAuthMessage("");
                  }}
                >
                  Login
                </button>

                <button
                  className={authMode === "signup" ? "main-button" : "text-link"}
                  type="button"
                  onClick={() => {
                    setAuthMode("signup");
                    setAuthError("");
                    setAuthMessage("");
                  }}
                >
                  Sign Up
                </button>
              </div>

              <form
                onSubmit={handleEmailAuth}
                style={{ display: "grid", gap: "14px" }}
              >
                <label>
                  Email address
                  <input
                    type="email"
                    value={authEmail}
                    onChange={(event) => setAuthEmail(event.target.value)}
                    placeholder="Enter your email"
                    autoComplete="email"
                    required
                    style={{
                      display: "block",
                      width: "100%",
                      marginTop: "7px"
                    }}
                  />
                </label>

                <label>
                  Password
                  <input
                    type="password"
                    value={authPassword}
                    onChange={(event) => setAuthPassword(event.target.value)}
                    placeholder="At least 6 characters"
                    autoComplete={
                      authMode === "signup" ? "new-password" : "current-password"
                    }
                    minLength={6}
                    required
                    style={{
                      display: "block",
                      width: "100%",
                      marginTop: "7px"
                    }}
                  />
                </label>

                <button
                  className="main-button"
                  type="submit"
                  disabled={authLoading}
                >
                  {authLoading
                    ? "Please wait..."
                    : authMode === "signup"
                    ? "Create Account"
                    : "Login with Email"}
                </button>
              </form>

              <div style={{ textAlign: "center", margin: "18px 0" }}>
                OR
              </div>

              <button
                className="main-button"
                type="button"
                onClick={handleGoogleAuth}
                disabled={authLoading}
                style={{ width: "100%" }}
              >
                Continue with Google
              </button>
            </>
          )}

          {authError && (
            <p
              role="alert"
              style={{ color: "#ff8a8a", marginTop: "16px" }}
            >
              {authError}
            </p>
          )}

          {authMessage && (
            <p
              role="status"
              style={{ color: "#8ee6b0", marginTop: "16px" }}
            >
              {authMessage}
            </p>
          )}

          <p style={{ fontSize: "13px", opacity: 0.75, marginTop: "18px" }}>
            Use an email account you are allowed to use. Never share your password with anyone.
          </p>
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
        <a
          className="brand"
          href="#home"
          style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}
        >
          <img
            src="/logo.png"
            alt="THE BAIKAN'S WRITTES logo"
            style={{ width: "42px", height: "42px", objectFit: "contain", display: "block" }}
          />
          BAIKAN<span>.</span>
        </a>

        <p>Think. Create. Learn. Share.</p>
        <p>© 2026 THE BAIKAN'S WRITTES. All rights reserved.</p>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
