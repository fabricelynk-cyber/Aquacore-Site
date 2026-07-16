import {
  Activity,
  ArrowRight,
  BarChart3,
  Building2,
  CalendarRange,
  CheckCircle2,
  Droplets,
  Gauge,
  Layers3,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { useEffect, useState, type CSSProperties, type FormEvent, type MouseEvent } from "react";
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
  "Visualiser les coûts, les charges et les équilibres réels de l'établissement.",
  "Comprendre le fonctionnement quotidien du site à partir de données enfin reliées.",
  "Arbitrer avec une vision plus nette des impacts sur l'exploitation, les équipes et le budget.",
  "Renforcer la capacité de la direction à proposer, expliquer et piloter.",
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

function revealStyle(order: number) {
  return { "--reveal-order": order } as CSSProperties;
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

export default function App() {
  const [contactError, setContactError] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const contactSuccess =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("contact") === "success";
  const contactPageUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${window.location.pathname}`
      : "https://aquacore-site.vercel.app/";
  const contactSuccessUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${window.location.pathname}?contact=success#contact`
      : "https://aquacore-site.vercel.app/?contact=success#contact";
  const contactFieldDescription = contactError
    ? "contact-channel-hint contact-channel-error"
    : "contact-channel-hint";

  const handleContactFormChange = (event: FormEvent<HTMLFormElement>) => {
    if (!contactError) {
      return;
    }

    if (hasContactChannel(event.currentTarget)) {
      setContactError("");
    }
  };

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (!hasContactChannel(event.currentTarget)) {
      event.preventDefault();
      setContactError("Renseignez au moins une adresse email ou un numéro de téléphone.");
      return;
    }

    setContactError("");
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const syncScrollState = () => {
      setIsScrolled(window.scrollY > 18);
    };

    syncScrollState();
    window.addEventListener("scroll", syncScrollState, { passive: true });

    return () => {
      window.removeEventListener("scroll", syncScrollState);
    };
  }, []);

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

      <header className={`topbar${isScrolled ? " topbar-scrolled" : ""}`}>
        <a className="brand" href="#hero" aria-label="AquaCore">
          <img className="brand-mark" src={aquaCoreSymbol} alt="Logo AquaCore" />
          <span className="brand-wordmark" aria-hidden="true">
            AquaCore
          </span>
        </a>

        <nav className="nav">
          <a href="#solution">Solution</a>
          <a href="#modules">Modules</a>
          <a href="#impact">Impact</a>
          <a href="#mise-en-oeuvre">Mise en oeuvre</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="button button-ghost button-shimmer" href="#contact">
          Contact
        </a>
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
              Dans un centre aquatique, la direction jongle souvent avec des données séparées entre
              exploitation, RH, budget, recettes et occupation. AquaCore les rassemble dans une
              application métier claire pour relier activité, coûts et décisions.
            </p>

            <div className="hero-actions">
              <a className="button button-primary button-shimmer" href="#modules">
                Explorer les modules
                <ArrowRight size={18} />
              </a>
              <a className="button button-secondary button-shimmer" href="#mise-en-oeuvre">
                Voir la mise en oeuvre
              </a>
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
                  <strong>Décider avec des données enfin reliées</strong>
                  <p>
                    Une lecture unifiée des bassins, des publics, des charges et du rendement.
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
                  <strong>+18%</strong>
                  <span>Tendance lisible site par site</span>
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

        <section className="section section-reveal" id="solution" data-reveal style={revealStyle(1)}>
          <div className="section-heading">
            <span className="section-kicker">Pourquoi AquaCore</span>
            <h2>Transformer des données dispersées en pilotage lisible.</h2>
            <p>
              AquaCore rapproche activité, budget, RH, recettes et occupation dans un même cadre
              de lecture.
            </p>
          </div>

          <div className="origin-panel">
            <div className="origin-panel-copy">
              <p className="metric-label">Une origine métier</p>
              <strong>AquaCore est né d'un besoin simple : piloter un équipement avec une lecture plus directe et plus fiable.</strong>
              <p>
                Le point de départ n'était pas d'ajouter un outil de reporting de plus, mais de
                sortir des fichiers parallèles, des exports multiples et des lectures partielles
                pour retrouver une vision exploitable au quotidien.
              </p>
            </div>

            <div className="origin-panel-points">
              <div
                className="origin-point interactive-surface"
                onMouseMove={setInteractivePointer}
                onMouseLeave={clearInteractivePointer}
              >
                <CheckCircle2 size={18} />
                <span>Né des usages réels des directions de centres aquatiques.</span>
              </div>
              <div
                className="origin-point interactive-surface"
                onMouseMove={setInteractivePointer}
                onMouseLeave={clearInteractivePointer}
              >
                <CheckCircle2 size={18} />
                <span>Pensé pour objectiver les choix plutôt que produire du reporting de plus.</span>
              </div>
              <div
                className="origin-point interactive-surface"
                onMouseMove={setInteractivePointer}
                onMouseLeave={clearInteractivePointer}
              >
                <CheckCircle2 size={18} />
                <span>Construit pour rester lisible, même quand les sources de données se multiplient.</span>
              </div>
            </div>
          </div>

          <div className="cards-grid three-cols">
            {highlights.map(({ icon: Icon, title, text }) => (
              <article
                className="feature-card interactive-surface"
                key={title}
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

        <section className="section section-reveal" id="modules" data-reveal style={revealStyle(2)}>
          <div className="section-heading">
            <span className="section-kicker">Modules</span>
            <h2>Les briques qui structurent le pilotage d'un équipement aquatique.</h2>
            <p>
              Chaque module répond à un usage d'exploitation concret, du suivi quotidien aux
              revues mensuelles et aux arbitrages de gestion.
            </p>
          </div>

          <div className="cards-grid two-cols">
            {modules.map(({ icon: Icon, title, text }) => (
              <article
                className="module-card interactive-surface"
                key={title}
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

        <section className="section section-reveal" id="fonctionnalites" data-reveal style={revealStyle(3)}>
          <div className="section-heading">
            <span className="section-kicker">Fonctionnalités Clés</span>
            <h2>Des fonctions pour fiabiliser la donnée et gagner du temps au quotidien.</h2>
            <p>
              L'application structure la saisie, reprend les données de logiciels tiers, conserve
              l'historique et facilite les restitutions dans un cadre unique.
            </p>
          </div>

          <div className="cards-grid two-cols">
            {capabilities.map((capability) => (
              <article
                className="capability-card interactive-surface"
                key={capability.title}
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

        <section className="section split-section section-reveal" id="impact" data-reveal style={revealStyle(4)}>
          <div className="section-heading compact">
            <span className="section-kicker">Impact</span>
            <h2>Ce que vous gagnez avec une lecture unifiée de l'équipement.</h2>
            <p>
              La donnée devient plus exploitable dans les revues d'exploitation, les arbitrages et
              le dialogue avec les équipes.
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
                Les revues d'exploitation, les échanges avec les équipes et les arbitrages
                budgétaires s'appuient enfin sur une base commune.
              </p>
            </div>
          </div>
        </section>

        <section className="section section-reveal" id="mise-en-oeuvre" data-reveal style={revealStyle(5)}>
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
            <a className="button button-primary button-shimmer" href="#hero">
              Revenir au hero
              <Activity size={18} />
            </a>
          </div>
        </section>

        <section className="section section-reveal" id="contact" data-reveal style={revealStyle(6)}>
          <div className="section-heading">
            <span className="section-kicker">Contact</span>
            <h2>Parlons de votre équipement, de vos sites et de vos besoins de pilotage.</h2>
            <p>
              Laissez un message et nous reviendrons vers vous pour échanger sur vos enjeux de
              fréquentation, de fluides, de recettes, de RH ou d'occupation.
            </p>
          </div>

          <div className="contact-grid">
            <aside
              className="contact-card contact-card-info interactive-surface"
              onMouseMove={setInteractivePointer}
              onMouseLeave={clearInteractivePointer}
            >
              <p className="metric-label">AquaCore</p>
              <strong>Un point de contact clair pour vos demandes, démonstrations et questions.</strong>
              <p>
                Vous pouvez utiliser le formulaire ci-contre ou écrire directement à l'adresse
                suivante.
              </p>
              <a className="contact-email" href="mailto:aquacorecontrol@gmail.com">
                aquacorecontrol@gmail.com
              </a>
              <div className="contact-note">
                <CheckCircle2 size={18} />
                <span>Réponse par email avec reprise du contexte de votre demande.</span>
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
                action="https://formsubmit.co/aquacorecontrol@gmail.com"
                method="POST"
                onInput={handleContactFormChange}
                onSubmit={handleContactSubmit}
              >
                <input type="hidden" name="_subject" value="Nouveau message depuis le site AquaCore" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_next" value={contactSuccessUrl} />
                <input type="hidden" name="_url" value={contactPageUrl} />
                <input type="text" name="_honey" className="contact-honey" tabIndex={-1} autoComplete="off" />

                <div className="contact-form-grid">
                  <label className="contact-field">
                    <span>Nom</span>
                    <input type="text" name="nom" placeholder="Votre nom" required />
                  </label>

                  <label className="contact-field">
                    <span>Structure</span>
                    <input type="text" name="structure" placeholder="Ville, régie, délégataire..." />
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
                  <input type="text" name="objet" placeholder="Motif de votre message" required />
                </label>

                <label className="contact-field">
                  <span>Message</span>
                  <textarea
                    name="message"
                    placeholder="Décrivez votre contexte, vos sites ou votre besoin."
                    rows={6}
                    required
                  />
                </label>

                <button className="button button-primary contact-submit" type="submit">
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>AquaCore, application métier de pilotage pour équipements aquatiques.</p>
        <p>
          Contact : <a href="mailto:aquacorecontrol@gmail.com">aquacorecontrol@gmail.com</a>
        </p>
      </footer>
    </div>
  );
}
