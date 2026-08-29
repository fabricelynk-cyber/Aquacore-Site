import {
  ArrowRight,
  BarChart3,
  Building2,
  CalendarRange,
  CheckCircle2,
  Droplets,
  Gauge,
  Layers3,
  LogIn,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type MouseEvent } from "react";
import aquaCoreSymbol from "./assets/aquacore-symbol-web.png";

const highlights = [
  {
    icon: Gauge,
    title: "Lecture budgétaire",
    text: "Reliez activité, charges et ratios pour suivre les écarts quand ils comptent vraiment.",
  },
  {
    icon: Building2,
    title: "Vision territoriale",
    text: "Comparez plusieurs établissements, harmonisez les pratiques et consolidez vos décisions à l'échelle du réseau.",
  },
  {
    icon: ShieldCheck,
    title: "Cadre personnalisable",
    text: "Référentiels, postes de suivi et routines s'adaptent à votre organisation sans perdre la logique métier.",
  },
];

const premiumBand = [
  {
    label: "Historique continu",
    text: "Suivez les saisons, les évolutions et les choix passés sans perdre le fil.",
  },
  {
    label: "Paramétrage métier",
    text: "Adaptez postes de suivi, fluides et référentiels à votre organisation.",
  },
  {
    label: "Échelle adaptée",
    text: "Utilisez le même outil pour un site, une régie, un délégataire ou un réseau.",
  },
];

const modules = [
  {
    icon: Droplets,
    title: "Fluides & coûts",
    text: "Suivez l'eau, l'électricité, la chaleur et les ratios unitaires pour comprendre les dérives dès qu'elles apparaissent.",
  },
  {
    icon: Users,
    title: "Fréquentation & publics",
    text: "Croisez les volumes, les types d'usagers et les tendances pour piloter l'activité avec plus de finesse.",
  },
  {
    icon: BarChart3,
    title: "Recettes & cohérence",
    text: "Reliez montants, quantités, typologies tarifaires et indicateurs de performance sans perdre le contexte métier.",
  },
  {
    icon: CalendarRange,
    title: "Planning & occupation",
    text: "Visualisez l'occupation des bassins, les heures attribuées et les équilibres entre surfaces disponibles et usages réels.",
  },
];

const capabilities = [
  {
    title: "Saisie & historique",
    items: [
      "Saisie simplifiée et ordonnée des données pour sécuriser le suivi au quotidien.",
      "Sauvegarde mensuelle automatique pour fiabiliser la continuité d'exploitation.",
      "Consultation des historiques sans limite de période pour garder une mémoire complète de l'établissement.",
    ],
  },
  {
    title: "Import & centralisation",
    items: [
      "Import et export via Excel pour centraliser simplement des données venues de plusieurs sources.",
      "Reprise facilitée d'informations issues de logiciels tiers comme Elisath ou Horanet.",
      "Corrélation de ces données avec les coûts globaux de l'équipement pour une lecture enfin unifiée.",
    ],
  },
  {
    title: "Dashboards & rapports",
    items: [
      "Import et export des dashboards pour partager ou répliquer les vues de pilotage.",
      "Import et export des rapports pour diffuser plus facilement les analyses et les restitutions.",
    ],
  },
  {
    title: "Plan d'occupation terrain",
    items: [
      "Plan d'occupation ergonomique et adapté aux usages terrain des centres aquatiques.",
      "Quantification automatique des heures et des surfaces attribuées pour objectiver l'occupation réelle.",
    ],
  },
];

const benefits = [
  "Préparer plusieurs scénarios avant d'attribuer ou de modifier un créneau.",
  "Documenter les arbitrages tarifaires, budgétaires ou d'occupation.",
  "Suivre les effets d'une décision dans le temps, avec les mêmes repères à chaque revue.",
  "Partager une base de discussion concrète avec les équipes, les services et les élus.",
];

const webAdvantages = [
  "Accessible depuis un navigateur, sans installation individuelle sur les postes de la collectivité.",
  "Une version unique et partagée pour les directions, les services concernés et les réseaux multisites.",
  "Des évolutions déployées de façon centralisée, sans intervention technique sur chaque ordinateur.",
  "Une interface pensée pour l'usage quotidien sur ordinateur comme sur tablette.",
];

const audiences = [
  {
    label: "Pour les directions",
    title: "Préparer les revues d'exploitation et porter des propositions étayées.",
    text: "La direction dispose d'un cadre de suivi quotidien pour passer des constats de terrain à des priorités opérationnelles.",
    points: [
      "Repérer les évolutions qui demandent une action.",
      "Préparer les données nécessaires aux échanges avec la collectivité.",
      "Suivre les engagements décidés d'une revue à l'autre.",
    ],
  },
  {
    label: "Pour les élus et services",
    title: "Arbitrer avec des repères clairs sur les usages de l'équipement.",
    text: "Les élus et services accèdent à une synthèse lisible pour situer les priorités et apprécier les conséquences d'une orientation.",
    points: [
      "Mettre en perspective activité, service rendu et moyens mobilisés.",
      "Éclairer les choix budgétaires, tarifaires et d'investissement.",
      "Communiquer des éléments cohérents au sein de la collectivité.",
    ],
  },
];

const proofPoints = [
  {
    number: "01",
    title: "Une continuité de suivi",
    text: "Saisie organisée, sauvegarde mensuelle et historique sans limite de période pour conserver la mémoire de l'équipement.",
  },
  {
    number: "02",
    title: "Des imports maîtrisés",
    text: "Imports et exports Excel, avec reprise possible de données de logiciels tiers comme Elisath ou Horanet.",
  },
  {
    number: "03",
    title: "Un planning quantifié",
    text: "Le plan d'occupation comptabilise automatiquement les heures et les surfaces attribuées.",
  },
];

const rolloutSteps = [
  {
    step: "01",
    title: "Cadrer le pilotage",
    text: "On aligne les indicateurs utiles pour vos sites, vos équipes et votre rythme de suivi.",
  },
  {
    step: "02",
    title: "Reprendre les données utiles",
    text: "Imports, référentiels et habitudes de suivi sont repris dans un cadre plus lisible et plus fiable.",
  },
  {
    step: "03",
    title: "Installer les routines",
    text: "Les tableaux de bord deviennent actionnables pour les revues mensuelles, le budget et l'exploitation.",
  },
];

function hasContactChannel(form: HTMLFormElement) {
  const formData = new FormData(form);
  const email = String(formData.get("email") ?? "").trim();
  const telephone = String(formData.get("telephone") ?? "").trim();

  return email.length > 0 || telephone.length > 0;
}

function demoRequestEndpoint() {
  const configuredBaseUrl = import.meta.env.VITE_AQUACORE_API_URL?.trim();
  const apiBaseUrl = configuredBaseUrl
    ? configuredBaseUrl
    : import.meta.env.DEV
      ? "http://127.0.0.1:3000"
      : "https://app.aquacorecontrol.fr";
  return new URL("/api/v1/public/demo-requests", apiBaseUrl).toString();
}

async function responseError(response: Response) {
  try {
    const payload = (await response.json()) as { error?: unknown };
    return typeof payload.error === "string" ? payload.error : "L’envoi n’a pas abouti.";
  } catch {
    return "L’envoi n’a pas abouti. Réessayez dans quelques instants.";
  }
}

function revealStyle(order: number) {
  return { "--reveal-order": order } as CSSProperties;
}

function indexedCardStyle(index: number) {
  return { "--card-index": `"${String(index + 1).padStart(2, "0")}"` } as CSSProperties;
}

function setInteractivePointer(event: MouseEvent<HTMLElement>) {
  const bounds = event.currentTarget.getBoundingClientRect();
  const x = ((event.clientX - bounds.left) / bounds.width) * 100;
  const y = ((event.clientY - bounds.top) / bounds.height) * 100;

  event.currentTarget.style.setProperty("--pointer-x", `${x}%`);
  event.currentTarget.style.setProperty("--pointer-y", `${y}%`);
}

function clearInteractivePointer(event: MouseEvent<HTMLElement>) {
  event.currentTarget.style.removeProperty("--pointer-x");
  event.currentTarget.style.removeProperty("--pointer-y");
}

type BrandCube = {
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  size: number;
  sprite: HTMLCanvasElement;
  drift: number;
};

function BrandCubeReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    let animationFrame = 0;
    let isActive = true;
    const image = new Image();
    image.src = aquaCoreSymbol;

    const start = () => {
      if (!isActive) {
        return;
      }

      const bounds = canvas.getBoundingClientRect();
      const width = Math.max(1, Math.round(bounds.width));
      const height = Math.max(1, Math.round(bounds.height));
      const isCompactViewport = window.matchMedia("(max-width: 720px)").matches;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;

      const context = canvas.getContext("2d");
      if (!context) {
        return;
      }

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      const drawHalo = () => {
        const glow = context.createRadialGradient(width / 2, height / 2, 8, width / 2, height / 2, width * 0.52);
        glow.addColorStop(0, "rgba(72, 198, 255, 0.14)");
        glow.addColorStop(1, "rgba(72, 198, 255, 0)");
        context.fillStyle = glow;
        context.beginPath();
        context.ellipse(width / 2, height / 2, width * 0.49, height * 0.39, 0, 0, Math.PI * 2);
        context.fill();
        context.strokeStyle = "rgba(116, 214, 255, 0.24)";
        context.lineWidth = 1;
        context.beginPath();
        context.ellipse(width / 2, height / 2, width * 0.46, height * 0.33, 0, 0, Math.PI * 2);
        context.stroke();
      };
      const source = document.createElement("canvas");
      source.width = width;
      source.height = height;
      const sourceContext = source.getContext("2d", { willReadFrequently: true });
      if (!sourceContext) {
        return;
      }

      const contentScale = isCompactViewport ? 0.68 : 1;
      const markSize = Math.min(height * 0.9, 88) * contentScale;
      const textSize = Math.min(height * 0.48, 46) * contentScale;
      sourceContext.font = `400 ${textSize}px Questrial, sans-serif`;
      sourceContext.lineWidth = Math.max(1.5, textSize * 0.04);
      sourceContext.strokeStyle = "#2aa8ff";
      const gap = Math.max(8, width * 0.025) * contentScale;
      const wordWidth = sourceContext.measureText("AquaCore").width;
      const markInset = isCompactViewport
        ? Math.max(2, (width - markSize - gap - wordWidth) / 2)
        : Math.max(4, height * 0.05);
      sourceContext.drawImage(image, markInset, (height - markSize) / 2, markSize, markSize);
      sourceContext.strokeText("AquaCore", markInset + markSize + gap, height / 2 + textSize * 0.34);

      const data = sourceContext.getImageData(0, 0, width, height).data;
      const candidates: Array<{ x: number; y: number; r: number; g: number; b: number }> = [];
      for (let y = 1; y < height - 1; y += 1) {
        for (let x = 1; x < width - 1; x += 1) {
          const offset = (y * width + x) * 4;
          if (data[offset + 3] > 70) {
            candidates.push({ x, y, r: data[offset], g: data[offset + 1], b: data[offset + 2] });
          }
        }
      }

      const cubes: BrandCube[] = [];
      const sprites = new Map<string, HTMLCanvasElement>();
      const getSprite = (target: { r: number; g: number; b: number }) => {
        const red = Math.round(target.r / 32) * 32;
        const green = Math.round(target.g / 32) * 32;
        const blue = Math.round(target.b / 32) * 32;
        const key = `${red}-${green}-${blue}`;
        const existingSprite = sprites.get(key);
        if (existingSprite) {
          return existingSprite;
        }

        const sprite = document.createElement("canvas");
        sprite.width = 14;
        sprite.height = 14;
        const spriteContext = sprite.getContext("2d");
        if (!spriteContext) {
          return sprite;
        }

        spriteContext.fillStyle = `rgb(${red}, ${green}, ${blue})`;
        spriteContext.fillRect(2, 4, 7, 7);
        spriteContext.fillStyle = "rgba(230, 250, 255, 0.82)";
        spriteContext.beginPath();
        spriteContext.moveTo(2, 4); spriteContext.lineTo(9, 4); spriteContext.lineTo(11, 2); spriteContext.lineTo(4, 2);
        spriteContext.fill();
        spriteContext.fillStyle = "rgba(4, 83, 132, 0.58)";
        spriteContext.beginPath();
        spriteContext.moveTo(9, 4); spriteContext.lineTo(9, 11); spriteContext.lineTo(11, 9); spriteContext.lineTo(11, 2);
        spriteContext.fill();
        sprites.set(key, sprite);
        return sprite;
      };

      const count = Math.min(4200, candidates.length);
      for (let index = 0; index < count; index += 1) {
        const candidateIndex = Math.floor(Math.random() * candidates.length);
        const target = candidates.splice(candidateIndex, 1)[0];
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.max(width, height) * (
          isCompactViewport ? 0.06 + Math.random() * 0.18 : 0.18 + Math.random() * 0.42
        );
        cubes.push({
          targetX: target.x,
          targetY: target.y,
          startX: width / 2 + Math.cos(angle) * distance,
          startY: height / 2 + Math.sin(angle) * distance * 0.52,
          size: 0.8 + Math.random() * 1.15,
          sprite: getSprite(target),
          drift: (Math.random() - 0.5) * 18,
        });
      }

      const delay = 260;
      const duration = 3400;
      const startedAt = performance.now();

      const draw = (now: number) => {
        const rawProgress = Math.min(1, Math.max(0, (now - startedAt - delay) / duration));
        const progress = 1 - (1 - rawProgress) ** 4;
        const particleOpacity = rawProgress < 0.86 ? 1 : 1 - (rawProgress - 0.86) / 0.14;
        const logoOpacity = rawProgress < 0.78 ? 0 : Math.min(1, (rawProgress - 0.78) / 0.22);
        context.clearRect(0, 0, width, height);
        drawHalo();

        if (now - startedAt > delay) {
          context.globalAlpha = particleOpacity;
          cubes.forEach((cube) => {
            const x = cube.startX + (cube.targetX - cube.startX) * progress;
            const y = cube.startY + (cube.targetY - cube.startY) * progress + Math.sin(progress * Math.PI) * cube.drift;
            const cubeSize = cube.size * 2.15;
            context.drawImage(cube.sprite, x - cubeSize / 2, y - cubeSize / 2, cubeSize, cubeSize);
          });
          context.globalAlpha = logoOpacity;
          context.drawImage(source, 0, 0);
          context.globalAlpha = 1;
        }

        if (rawProgress < 1 && isActive) {
          animationFrame = requestAnimationFrame(draw);
        }
      };

      animationFrame = requestAnimationFrame(draw);
    };

    const startWhenReady = () => {
      const fontReady = document.fonts?.ready ?? Promise.resolve();
      void fontReady.then(() => window.setTimeout(start, 420));
    };

    if (image.complete && image.naturalWidth > 0) {
      startWhenReady();
    } else {
      image.addEventListener("load", startWhenReady, { once: true });
    }

    return () => {
      isActive = false;
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas ref={canvasRef} className="brand-cube-reveal" aria-hidden="true" />;
}

export default function App() {
  const [contactError, setContactError] = useState("");
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const contactFieldDescription = contactError
    ? "contact-channel-hint contact-channel-error"
    : "contact-channel-hint";

  const handleContactFormChange = (event: FormEvent<HTMLFormElement>) => {
    if (contactSuccess) setContactSuccess(false);
    if (!contactError) {
      return;
    }

    if (hasContactChannel(event.currentTarget)) {
      setContactError("");
    }
  };

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!hasContactChannel(form)) {
      setContactError("Renseignez au moins une adresse email ou un numéro de téléphone.");
      return;
    }

    setContactError("");
    setContactSuccess(false);
    setContactSubmitting(true);
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());
    try {
      const response = await fetch(demoRequestEndpoint(), {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "omit",
      });
      if (!response.ok) {
        setContactError(await responseError(response));
        return;
      }
      form.reset();
      setContactSuccess(true);
    } catch {
      setContactError("Le formulaire est momentanément indisponible. Réessayez dans quelques instants.");
    } finally {
      setContactSubmitting(false);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="site-shell">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />

      <header className="topbar">
        <a
          className="brand brand-hero-signature"
          href="#hero"
          aria-label="AquaCore"
          onMouseMove={setInteractivePointer}
          onMouseLeave={clearInteractivePointer}
        >
          <BrandCubeReveal />
          <span className="brand-capsule" aria-hidden="true">
            <span className="brand-mark-shell">
              <span className="brand-mark-aura" />
              <img className="brand-mark" src={aquaCoreSymbol} alt="Logo AquaCore" />
            </span>
            <span className="brand-wordmark-stack">
              <span className="brand-wordmark brand-wordmark-back">AquaCore</span>
              <span className="brand-wordmark brand-wordmark-front">AquaCore</span>
            </span>
          </span>
        </a>

        <nav className="nav">
          <a href="#solution">Solution</a>
          <a href="#pour-vous">Pour vous</a>
          <a href="#modules">Modules</a>
          <a href="#impact">Impact</a>
          <a href="#mise-en-oeuvre">Mise en oeuvre</a>
          <a href="#contact">Démo</a>
        </nav>

        <div className="topbar-actions">
          <a className="button button-account button-shimmer" href="https://app.aquacorecontrol.fr">
            <LogIn size={17} />
            Mon compte
          </a>
          <a className="button button-ghost button-shimmer" href="#contact">
            Demander une démo
          </a>
        </div>
      </header>

      <main>
        <section className="hero section" id="hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <Sparkles size={16} />
              AquaCore, le cockpit métier des équipements aquatiques
            </div>

            <h1>
              <span>
                Pilotez fréquentation, fluides, recettes, ressources humaines, budget et
                occupation
              </span>
              <span className="hero-title-accent">depuis une seule application métier.</span>
            </h1>

            <p className="hero-text">
              AquaCore réunit les données d'exploitation, de budget, de ressources humaines, de
              fréquentation et d'occupation pour mesurer le coût réel des usages et éclairer les
              décisions de la collectivité.
            </p>

            <div className="hero-actions">
              <a className="button button-primary button-shimmer" href="#contact">
                Demander une démonstration
                <ArrowRight size={18} />
              </a>
              <a className="button button-account button-shimmer" href="https://app.aquacorecontrol.fr">
                <LogIn size={18} />
                Accéder à mon compte
              </a>
              <a className="button button-secondary button-shimmer" href="#pour-vous">
                Découvrir les usages
              </a>
            </div>

            <div className="hero-signature">
              <span className="hero-signature-label">Signature AquaCore</span>
              <p>
                Pensé comme un cockpit de direction, et non comme un tableau de bord de plus.
              </p>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="hero-orbit hero-orbit-a" />
            <div className="hero-orbit hero-orbit-b" />

            <div
              className="hero-panel hero-panel-main interactive-surface hero-surface"
              onMouseMove={setInteractivePointer}
              onMouseLeave={clearInteractivePointer}
            >
              <div className="panel-topline">
                <span className="panel-chip">Vue consolidée</span>
                <span className="panel-dot" />
              </div>

              <div className="panel-grid">
                <article
                  className="metric-card metric-card-wide interactive-surface"
                  onMouseMove={setInteractivePointer}
                  onMouseLeave={clearInteractivePointer}
                >
                  <div className="metric-label">Cockpit AquaCore</div>
                  <strong>Un suivi global, lisible au fil des mois</strong>
                  <p>
                    Bassins, publics, charges et activité réunis dans le même environnement.
                  </p>
                  <div className="metric-signal-row" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                </article>

                <article
                  className="metric-card metric-accent interactive-surface"
                  onMouseMove={setInteractivePointer}
                  onMouseLeave={clearInteractivePointer}
                >
                  <div className="metric-label">Fréquentation</div>
                  <strong>Tendances suivies</strong>
                  <span>Volumes et publics comparables période après période</span>
                </article>

                <article
                  className="metric-card interactive-surface"
                  onMouseMove={setInteractivePointer}
                  onMouseLeave={clearInteractivePointer}
                >
                  <div className="metric-label">Fluides</div>
                  <strong>Gestion multiple</strong>
                  <span>Postes fluides standards et personnalisés</span>
                </article>

                <article
                  className="metric-card interactive-surface"
                  onMouseMove={setInteractivePointer}
                  onMouseLeave={clearInteractivePointer}
                >
                  <div className="metric-label">Planning</div>
                  <strong>Plan d'occupation complet</strong>
                  <span>Heures et surfaces attribuées quantifiées automatiquement</span>
                </article>
              </div>
            </div>

            <div
              className="hero-panel hero-panel-side interactive-surface hero-surface"
              onMouseMove={setInteractivePointer}
              onMouseLeave={clearInteractivePointer}
            >
              <img src={aquaCoreSymbol} alt="" />
              <div>
                <p className="metric-label">Déploiement souple</p>
                <strong>Site unique, régie, délégataire ou réseau multisite</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="premium-band section-reveal" data-reveal style={revealStyle(1)}>
          {premiumBand.map((item, index) => (
            <article
              className="premium-band-card interactive-surface"
              key={item.label}
              style={indexedCardStyle(index)}
              onMouseMove={setInteractivePointer}
              onMouseLeave={clearInteractivePointer}
            >
              <span className="premium-band-label">{item.label}</span>
              <p>{item.text}</p>
            </article>
          ))}
        </section>

        <section className="section section-frame section-reveal" id="solution" data-reveal style={revealStyle(2)}>
          <div className="section-heading">
            <span className="section-kicker">Pourquoi AquaCore</span>
            <h2>Quantifier l'usage réel pour mieux piloter l'équipement public.</h2>
            <p>
              AquaCore rapproche l'activité des moyens mobilisés : espaces, créneaux, publics,
              charges, recettes, ressources humaines et budget.
            </p>
          </div>

          <div className="origin-panel">
            <div className="origin-panel-copy">
              <p className="metric-label">Une origine métier</p>
              <strong>Un outil conçu par et pour les directions de centres aquatiques.</strong>
              <p>
                Né de problématiques de terrain, AquaCore rassemble les informations aujourd'hui
                éparpillées entre l'exploitation, les services supports et les outils tiers.
              </p>
            </div>

            <div className="origin-panel-points">
              <div
                className="origin-point interactive-surface"
                onMouseMove={setInteractivePointer}
                onMouseLeave={clearInteractivePointer}
              >
                <CheckCircle2 size={18} />
                <span>Une lecture par bassin, espace, créneau et catégorie d'utilisateur.</span>
              </div>
              <div
                className="origin-point interactive-surface"
                onMouseMove={setInteractivePointer}
                onMouseLeave={clearInteractivePointer}
              >
                <CheckCircle2 size={18} />
                <span>Un cadre personnalisable selon les pratiques de chaque collectivité.</span>
              </div>
              <div
                className="origin-point interactive-surface"
                onMouseMove={setInteractivePointer}
                onMouseLeave={clearInteractivePointer}
              >
                <CheckCircle2 size={18} />
                <span>Un dialogue facilité entre terrain, direction et décision publique.</span>
              </div>
            </div>
          </div>

          <div className="cards-grid three-cols">
            {highlights.map(({ icon: Icon, title, text }, index) => (
              <article
                className="feature-card interactive-surface"
                key={title}
                style={indexedCardStyle(index)}
                onMouseMove={setInteractivePointer}
                onMouseLeave={clearInteractivePointer}
              >
                <div className="feature-icon">
                  <Icon size={22} />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-frame section-reveal" id="pour-vous" data-reveal style={revealStyle(3)}>
          <div className="section-heading">
            <span className="section-kicker">Pour vous</span>
            <h2>Des informations adaptées à chaque niveau de décision.</h2>
            <p>
              Les mêmes informations servent des usages différents : organiser l'exploitation,
              préparer les instances et éclairer les choix de la collectivité.
            </p>
          </div>

          <div className="audience-grid">
            {audiences.map((audience, index) => (
              <article
                className="audience-card interactive-surface"
                key={audience.label}
                style={indexedCardStyle(index)}
                onMouseMove={setInteractivePointer}
                onMouseLeave={clearInteractivePointer}
              >
                <span className="audience-label">{audience.label}</span>
                <h3>{audience.title}</h3>
                <p>{audience.text}</p>
                <ul className="capability-list audience-list">
                  {audience.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-frame section-reveal" id="modules" data-reveal style={revealStyle(4)}>
          <div className="section-heading">
            <span className="section-kicker">Modules</span>
            <h2>Les briques qui structurent le pilotage d'un équipement aquatique.</h2>
            <p>
              Chaque module répond à un usage d'exploitation concret, du suivi quotidien aux
              revues mensuelles et aux arbitrages de gestion.
            </p>
          </div>

          <div className="cards-grid two-cols">
            {modules.map(({ icon: Icon, title, text }, index) => (
              <article
                className="module-card interactive-surface"
                key={title}
                style={indexedCardStyle(index)}
                onMouseMove={setInteractivePointer}
                onMouseLeave={clearInteractivePointer}
              >
                <div className="module-head">
                  <div className="feature-icon">
                    <Icon size={22} />
                  </div>
                  <h3>{title}</h3>
                </div>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-frame section-reveal" id="fonctionnalites" data-reveal style={revealStyle(5)}>
          <div className="section-heading">
            <span className="section-kicker">Fonctionnalités Clés</span>
            <h2>Des fonctions qui simplifient le suivi au quotidien.</h2>
            <p>
              De la saisie au partage des rapports, l'application sécurise les routines de suivi
              et évite les ressaisies inutiles.
            </p>
          </div>

          <div className="cards-grid two-cols">
            {capabilities.map((capability, index) => (
              <article
                className="capability-card interactive-surface"
                key={capability.title}
                style={indexedCardStyle(index)}
                onMouseMove={setInteractivePointer}
                onMouseLeave={clearInteractivePointer}
              >
                <h3>{capability.title}</h3>
                <ul className="capability-list">
                  {capability.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-frame split-section section-reveal" id="application-web" data-reveal style={revealStyle(6)}>
          <div className="section-heading compact">
            <span className="section-kicker">Application web</span>
            <h2>Un outil métier simple à déployer, facile à partager.</h2>
            <p>
              AquaCore fonctionne dans le navigateur : la collectivité dispose d'un environnement
              commun, disponible sans alourdir les postes de travail ni multiplier les versions.
            </p>
          </div>

          <div className="web-app-panel">
            <p className="metric-label">Les avantages du web</p>
            <strong>Un environnement commun, disponible sans installation sur chaque poste.</strong>
            <div className="impact-list">
              {webAdvantages.map((item) => (
                <div
                  className="impact-item interactive-surface"
                  key={item}
                  onMouseMove={setInteractivePointer}
                  onMouseLeave={clearInteractivePointer}
                >
                  <CheckCircle2 size={18} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-frame section-reveal" id="preuves" data-reveal style={revealStyle(7)}>
          <div className="section-heading">
            <span className="section-kicker">Repères concrets</span>
            <h2>Ce qui rend le suivi fiable au fil du temps.</h2>
            <p>
              Les fonctions suivantes assurent la continuité, la reprise et la comparabilité des
              informations utilisées par l'équipement.
            </p>
          </div>

          <div className="proof-grid">
            {proofPoints.map((proof) => (
              <article
                className="proof-card interactive-surface"
                key={proof.number}
                onMouseMove={setInteractivePointer}
                onMouseLeave={clearInteractivePointer}
              >
                <span className="proof-number">{proof.number}</span>
                <h3>{proof.title}</h3>
                <p>{proof.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-frame split-section section-reveal" id="impact" data-reveal style={revealStyle(8)}>
          <div className="section-heading compact">
            <span className="section-kicker">Impact</span>
            <h2>Passer du constat à l'action, dans les instances comme sur le terrain.</h2>
            <p>
              AquaCore aide à structurer les échanges avant une décision, puis à en suivre les
              effets dans la durée.
            </p>
          </div>

          <div className="impact-panel">
            <div className="impact-list">
              {benefits.map((item) => (
                <div
                  className="impact-item interactive-surface"
                  key={item}
                  onMouseMove={setInteractivePointer}
                  onMouseLeave={clearInteractivePointer}
                >
                  <CheckCircle2 size={18} />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div
              className="quote-card interactive-surface"
              onMouseMove={setInteractivePointer}
              onMouseLeave={clearInteractivePointer}
            >
              <Layers3 size={30} />
              <p>
                Une décision mieux préparée est aussi plus simple à partager et à suivre.
              </p>
            </div>
          </div>
        </section>

        <section className="section section-frame section-reveal" id="mise-en-oeuvre" data-reveal style={revealStyle(9)}>
          <div className="section-heading">
            <span className="section-kicker">Mise en oeuvre</span>
            <h2>Une mise en oeuvre progressive, centrée sur les usages terrain.</h2>
            <p>
              AquaCore s'installe comme un cadre de pilotage partagé : on structure les
              indicateurs, on reprend les données utiles et on met les équipes au même niveau de
              lecture.
            </p>
          </div>

          <div className="rollout-grid">
            {rolloutSteps.map((item) => (
              <article
                className="rollout-card interactive-surface"
                key={item.step}
                onMouseMove={setInteractivePointer}
                onMouseLeave={clearInteractivePointer}
              >
                <span className="rollout-step">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>

          <div
            className="deploy-banner interactive-surface"
            onMouseMove={setInteractivePointer}
            onMouseLeave={clearInteractivePointer}
          >
            <div>
              <p className="metric-label">Cap sur l'exploitation</p>
              <strong>Un cadre de pilotage prêt à s'installer dans vos routines mensuelles</strong>
            </div>
            <a className="button button-primary button-shimmer" href="#contact">
              Demander une démonstration
              <ArrowRight size={18} />
            </a>
          </div>
        </section>

        <section className="section section-frame section-reveal" id="contact" data-reveal style={revealStyle(10)}>
          <div className="section-heading">
            <span className="section-kicker">Démonstration AquaCore</span>
            <h2>Voyons ensemble ce qu'AquaCore peut révéler sur votre équipement.</h2>
            <p>
              Présentez votre contexte et vos enjeux. Nous reviendrons vers vous pour organiser
              une démonstration adaptée à vos sites, à votre organisation et à vos usages.
            </p>
          </div>

          <div className="contact-grid">
            <aside
              className="contact-card contact-card-info interactive-surface"
              onMouseMove={setInteractivePointer}
              onMouseLeave={clearInteractivePointer}
            >
              <p className="metric-label">AquaCore</p>
              <strong>Demandez une démonstration adaptée à votre équipement et à vos enjeux de collectivité.</strong>
              <p>
                Décrivez votre contexte : la demande est traitée par l’équipe AquaCore via notre
                messagerie professionnelle.
              </p>
              <div className="contact-note">
                <CheckCircle2 size={18} />
                <span>Vos informations servent uniquement à répondre à votre demande de démonstration.</span>
              </div>
            </aside>

            <div
              className="contact-card interactive-surface"
              onMouseMove={setInteractivePointer}
              onMouseLeave={clearInteractivePointer}
            >
              {contactSuccess ? (
                <div className="contact-success" role="status">
                  <CheckCircle2 size={18} />
                  <span>Merci, votre message a bien été envoyé.</span>
                </div>
              ) : null}

              <form
                className="contact-form"
                onInput={handleContactFormChange}
                onSubmit={handleContactSubmit}
              >
                <input type="text" name="website" className="contact-honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />

                <div className="contact-form-grid">
                  <label className="contact-field">
                    <span>Nom</span>
                    <input type="text" name="name" placeholder="Votre nom" required maxLength={120} />
                  </label>

                  <label className="contact-field">
                    <span>Structure</span>
                    <input type="text" name="organisation" placeholder="Ville, régie, délégataire..." maxLength={160} />
                  </label>

                  <label className="contact-field">
                    <span>Email</span>
                    <input
                      type="email"
                      name="email"
                      placeholder="vous@exemple.fr"
                      aria-describedby={contactFieldDescription}
                      aria-invalid={contactError ? "true" : undefined}
                      className={contactError ? "contact-input-error" : undefined}
                    />
                  </label>

                  <label className="contact-field">
                    <span>Téléphone</span>
                    <input
                      type="tel"
                      name="telephone"
                      placeholder="Optionnel"
                      aria-describedby={contactFieldDescription}
                      aria-invalid={contactError ? "true" : undefined}
                      className={contactError ? "contact-input-error" : undefined}
                    />
                  </label>
                </div>

                <p className="contact-hint" id="contact-channel-hint">
                  Au moins un moyen de contact est requis : email ou téléphone.
                </p>

                {contactError ? (
                  <p className="contact-error" id="contact-channel-error" role="alert">
                    {contactError}
                  </p>
                ) : null}

                <label className="contact-field">
                  <span>Objet</span>
                  <input type="text" name="subject" placeholder="Demande de démonstration AquaCore" required maxLength={160} />
                </label>

                <label className="contact-field">
                  <span>Message</span>
                  <textarea
                    name="message"
                    placeholder="Décrivez votre contexte, vos sites ou votre besoin."
                    rows={6}
                    required
                    maxLength={4000}
                  />
                </label>

                <button className="button button-primary contact-submit" type="submit" disabled={contactSubmitting}>
                  {contactSubmitting ? "Envoi en cours…" : "Envoyer le message"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>AquaCore, application métier de pilotage pour équipements aquatiques.</p>
        <p>Contact : utilisez le formulaire de démonstration ci-dessus.</p>
      </footer>
    </div>
  );
}
