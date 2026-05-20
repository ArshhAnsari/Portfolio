# [mohdarsh.dev](https://mohdarsh.dev)

I spend most of my days thinking about backend architecture and writing APIs. But when it came to building my own portfolio, I didn't want to design another heavy system. I didn't want to spin up a massive Next.js boilerplate, manage hundreds of node modules, or hide my code behind complex framework abstractions.

The idea for this website was simple: build something light, fast, and completely intentional. This is the source code for my portfolio. Zero frameworks. No React, no Tailwind, no complex build steps. Just semantic HTML, modern CSS, and vanilla JavaScript orchestrated exactly how I want it.

The goal was to see how much premium polish—glassmorphism, bento grids, fluid typography, and complex physics-based animations—I could achieve with just the native web platform.

---

## The "Anti-Stack"
* **Structure:** Semantic HTML5
* **Styling:** Vanilla CSS (Custom properties, CSS Grid, `color-mix()`, `clamp()`)
* **Logic:** Vanilla JavaScript (ES6, IntersectionObserver, custom touch/drag handlers)
* **Hosting:** Vercel (Static Edge deployment)

---

## Design & Engineering Highlights

### 1. The Photo Stack Engine (`about.js`)
Instead of using a bulky carousel library, I built a custom depth-sorting card stack for the About page.
* Uses an `order[]` array to track rendering depth without DOM manipulation.
* Implements drag-and-drop and touch-swipe with specific hysteresis thresholds (4px dead zone for clicks, 60px threshold to cycle).
* Animations are GPU-accelerated (`translateZ(0)`) and use custom `cubic-bezier` curves for a playful, physical bounce.

### 2. Dynamic Bento Grid (`index.css`)
The "Selected Work" section uses an asymmetric CSS grid (1fr / 1.65fr ratio). Instead of writing custom classes for every project card, I pass a single CSS variable (`--eyebrow-color`) inline. The CSS uses `color-mix()` to automatically generate perfectly tinted backgrounds, borders, and hover states based on that one hex code.

### 3. Fluid Typography & Layouts
No massive media query breakpoints. Typography scales continuously from mobile to desktop using `clamp()` functions (e.g., `clamp(44px, 6vw, 68px)` for the hero).

### 4. Theming & Performance
* **Dark Mode:** A lightweight, 16-token CSS variable system toggled via JavaScript and persisted in `localStorage`.
* **Reveal Animations:** Driven by an `IntersectionObserver` that adds staggered delays to elements as they enter the viewport, keeping the main thread quiet.
* **Glassmorphism:** The navigation bar uses `backdrop-filter: blur(12px)` with an 85% opacity fallback `color-mix` for older browsers.

---

## Running Locally
Because there is no build step or node dependencies, running this is as simple as it gets:

1. Clone the repository.
2. Open `index.html` in your browser.
3. That's it.

---

## License & Usage
This repository is completely open-source. If you’re building your own vanilla portfolio and want to lift the photo stack logic, the dynamic bento tokens, or the custom typewriter script—go for it. Just switch out the text and make it your own.

**Live at:** [mohdarsh.dev](https://mohdarsh.dev)