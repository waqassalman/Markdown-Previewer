import React, { useState } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import './App.css';

marked.setOptions({
  gfm: true,
  breaks: true, // interpret carriage returns as <br> (bonus)
});

// Default markdown that includes: H1, H2, link, inline code, code block, list, blockquote, image, bold text
const initialMarkdown = `# Welcome to the Markdown Previewer
## Sub-heading (H2) example

**Bold text** is great for emphasis.

This is an inline code example: \`const x = 10;\`

\`\`\`javascript
// Code block example
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

> This is a blockquote. Use it to highlight quotes or notes.

- List item one
- List item two
  - Nested list item

Here is a [link to FreeCodeCamp](https://www.freecodecamp.org).

![Sample image](https://via.placeholder.com/400x120.png?text=Markdown+Previewer)

---

Type additional markdown on the left. Line breaks are interpreted as <br> (configured).
`;

function App() {
  const [markdown, setMarkdown] = useState(initialMarkdown);

  const handleChange = (e) => setMarkdown(e.target.value);

  // Convert markdown to sanitized HTML
  const getMarkdownText = (md) => {
    const rawHtml = marked.parse(md);
    const clean = DOMPurify.sanitize(rawHtml);
    return { __html: clean };
  };

  return (
    <div className="app-container">
      <h1 className="title">Markdown Previewer</h1>
      <div className="panes">
        <section className="pane">
          <div className="pane-header">Editor</div>
          <textarea
            id="editor"
            value={markdown}
            onChange={handleChange}
            className="editor"
            aria-label="Markdown editor"
          />
        </section>

        <section className="pane">
          <div className="pane-header">Preview</div>
          <div
            id="preview"
            className="preview"
            dangerouslySetInnerHTML={getMarkdownText(markdown)}
          />
        </section>
      </div>
      <footer className="footer">
        Built with <span role="img" aria-label="heart">❤️</span> — marked + DOMPurify
      </footer>
    </div>
  );
}

export default App;
