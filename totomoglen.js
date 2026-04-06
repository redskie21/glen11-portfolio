document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const heroCopy = document.querySelector(".hero-copy");
  const portraitCard = document.querySelector(".portrait-card");
  const projectCards = document.querySelectorAll(".project-card, .featured-project, .mini-card");
  const revealTargets = document.querySelectorAll(
    ".hero-copy, .portrait-card, .about-panel, .featured-project, .project-card, .contact-panel"
  );

  body.classList.add("totomoglen-loaded");

  const style = document.createElement("style");
  style.textContent = `
    body.totomoglen-loaded .hero-copy,
    body.totomoglen-loaded .portrait-card,
    body.totomoglen-loaded .about-panel,
    body.totomoglen-loaded .featured-project,
    body.totomoglen-loaded .project-card,
    body.totomoglen-loaded .contact-panel {
      transition: transform 220ms ease, box-shadow 220ms ease, opacity 500ms ease, filter 500ms ease;
    }

    .attitude-pill {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 18px;
      padding: 10px 16px;
      border: 1px solid rgba(36, 24, 18, 0.14);
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.6);
      color: #241812;
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      backdrop-filter: blur(10px);
    }

    .attitude-pill::before {
      content: "";
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: linear-gradient(135deg, #241812, #b86a2f);
      box-shadow: 0 0 0 6px rgba(184, 106, 47, 0.14);
    }

    .confidence-line {
      display: block;
      margin-top: 14px;
      color: #241812;
      font-weight: 700;
      letter-spacing: 0.02em;
    }

    .totomoglen-hidden {
      opacity: 0;
      transform: translateY(30px);
      filter: blur(8px);
    }

    .totomoglen-visible {
      opacity: 1;
      transform: translateY(0);
      filter: blur(0);
    }
  `;
  document.head.appendChild(style);

  if (heroCopy) {
    const pill = document.createElement("div");
    pill.className = "attitude-pill";
    pill.textContent = "Quietly arrogant";
    heroCopy.prepend(pill);
  }

  const heroText = document.querySelector(".hero-text");
  if (heroText) {
    const confidenceLine = document.createElement("span");
    confidenceLine.className = "confidence-line";
    heroText.appendChild(confidenceLine);

    const lines = [
      "I do not chase ordinary layouts.",
      "Premium beats plain every time.",
      "Built to look expensive before it even loads."
    ];

    let lineIndex = 0;
    confidenceLine.textContent = lines[lineIndex];

    window.setInterval(() => {
      lineIndex = (lineIndex + 1) % lines.length;
      confidenceLine.textContent = lines[lineIndex];
    }, 2400);
  }

  const applyTilt = (element, strength = 14) => {
    if (!element) {
      return;
    }

    element.style.transformStyle = "preserve-3d";

    element.addEventListener("pointermove", (event) => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * strength;
      const rotateX = (0.5 - y) * strength;

      element.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      element.style.boxShadow = "0 38px 90px rgba(40, 24, 14, 0.18)";
    });

    element.addEventListener("pointerleave", () => {
      element.style.transform = "";
      element.style.boxShadow = "";
    });
  };

  applyTilt(portraitCard, 10);
  projectCards.forEach((card) => applyTilt(card, 8));

  revealTargets.forEach((element) => {
    element.classList.add("totomoglen-hidden");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("totomoglen-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2
    }
  );

  revealTargets.forEach((element, index) => {
    element.style.transitionDelay = `${index * 70}ms`;
    observer.observe(element);
  });
});
