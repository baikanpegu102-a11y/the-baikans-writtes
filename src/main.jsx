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
        <a className="brand" href="#home" style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
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
