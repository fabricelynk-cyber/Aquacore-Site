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
import aquaCoreSymbol from "./assets/aquacore-symbol-web.png";

const keyFigures = [
  { value: "1 cockpit", label: "pour relier vos données d'exploitation et vos décisions." },
  { value: "5 modules", label: "fluides, fréquentation, recettes, RH et occupation." },
  { value: "Multi-sites", label: "pour comparer les équipements d'un même territoire." },
];

const highlights = [
  {
    icon: Gauge,
    title: "Pilotage lisible",
    text: "Une lecture claire des indicateurs utiles, sans multiplier les exports manuels ni les fichiers dispersés.",
  },
  {
    icon: Building2,
    title: "Vision territoire",
    text: "Comparez plusieurs établissements, harmonisez les pratiques et consolidez vos décisions à l'échelle du réseau.",
  },
  {
    icon: ShieldCheck,
    title: "Cadre métier robuste",
    text: "Imports cadrés, indicateurs cohérents et règles métiers pensées pour la réalité des équipements aquatiques.",
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

const benefits = [
  "Réduire le temps passé à consolider des tableurs hétérogènes.",
  "Partager une lecture commune entre direction, exploitation et technique.",
  "Mieux arbitrer les budgets, les horaires et les efforts d'optimisation.",
  "Faire émerger les écarts entre fréquentation, ressources mobilisées et recettes.",
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

export default function App() {
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

  return (
    <div className="site-shell">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />

      <header className="topbar">
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

        <a className="button button-ghost" href="#contact">
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
              Pilotez fréquentation, fluides, recettes et occupation depuis une seule vue.
            </h1>

            <p className="hero-text">
              AquaCore aide les réseaux de piscines et centres aquatiques à transformer leurs
              données dispersées en décisions exploitables, avec une approche pensée pour le
              terrain, les tableaux de bord et les arbitrages de gestion.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#modules">
                Explorer les modules
                <ArrowRight size={18} />
              </a>
              <a className="button button-secondary" href="#mise-en-oeuvre">
                Voir la mise en oeuvre
              </a>
            </div>

            <ul className="hero-points" aria-label="Atouts AquaCore">
              <li>Multi-établissements et vision consolidée.</li>
              <li>Lecture métier claire pour direction, exploitation et technique.</li>
              <li>Conçu pour structurer le suivi, l'exploitation et les arbitrages de gestion.</li>
            </ul>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="hero-panel hero-panel-main">
              <div className="panel-topline">
                <span className="panel-chip">Vue consolidée</span>
                <span className="panel-dot" />
              </div>

              <div className="panel-grid">
                <article className="metric-card metric-card-wide">
                  <div className="metric-label">Cockpit AquaCore</div>
                  <strong>Décider avec des données enfin reliées</strong>
                  <p>
                    Une lecture unifiée des bassins, des publics, des charges et du rendement.
                  </p>
                </article>

                <article className="metric-card metric-accent">
                  <div className="metric-label">Fréquentation</div>
                  <strong>+18%</strong>
                  <span>Tendance lisible site par site</span>
                </article>

                <article className="metric-card">
                  <div className="metric-label">Fluides</div>
                  <strong>3 postes</strong>
                  <span>Eau, électricité, chaleur</span>
                </article>

                <article className="metric-card">
                  <div className="metric-label">Planning</div>
                  <strong>5 min</strong>
                  <span>Lecture fine de l'occupation</span>
                </article>
              </div>
            </div>

            <div className="hero-panel hero-panel-side">
              <img src={aquaCoreSymbol} alt="" />
              <div>
                <p className="metric-label">AquaCore est pensé pour</p>
                <strong>Piscines, centres aquatiques et réseaux territoriaux</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="section" aria-label="Chiffres clés">
          <div className="stats-row">
            {keyFigures.map((item) => (
              <article className="stat-card" key={item.value}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="solution">
          <div className="section-heading">
            <span className="section-kicker">Pourquoi AquaCore</span>
            <h2>Une application pensée pour les équipements aquatiques, pas un logiciel générique.</h2>
            <p>
              Le discours s'appuie ici sur le référentiel du produit existant : gestion
              multi-sites, suivi de fréquentation, cohérence des recettes, pilotage des fluides
              et lecture de l'occupation des espaces.
            </p>
          </div>

          <div className="cards-grid three-cols">
            {highlights.map(({ icon: Icon, title, text }) => (
              <article className="feature-card" key={title}>
                <div className="feature-icon">
                  <Icon size={22} />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="modules">
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
              <article className="module-card" key={title}>
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

        <section className="section split-section" id="impact">
          <div className="section-heading compact">
            <span className="section-kicker">Impact</span>
            <h2>Ce que vos équipes gagnent quand les indicateurs cessent de vivre chacun de leur côté.</h2>
            <p>
              AquaCore met l'accent sur les résultats concrets attendus, pas sur un simple
              inventaire fonctionnel.
            </p>
          </div>

          <div className="impact-panel">
            <div className="impact-list">
              {benefits.map((item) => (
                <div className="impact-item" key={item}>
                  <CheckCircle2 size={18} />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="quote-card">
              <Layers3 size={30} />
              <p>
                AquaCore devient le point de rencontre entre exploitation, direction et lecture
                budgétaire. On ne regarde plus seulement des chiffres, on comprend enfin leurs
                liens.
              </p>
            </div>
          </div>
        </section>

        <section className="section" id="mise-en-oeuvre">
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
              <article className="rollout-card" key={item.step}>
                <span className="rollout-step">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>

          <div className="deploy-banner">
            <div>
              <p className="metric-label">Cap sur l'exploitation</p>
              <strong>Une application pour suivre, comparer et décider plus vite</strong>
            </div>
            <a className="button button-primary" href="#hero">
              Revenir au hero
              <Activity size={18} />
            </a>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="section-heading">
            <span className="section-kicker">Contact</span>
            <h2>Parlons de votre équipement, de vos sites et de vos besoins de pilotage.</h2>
            <p>
              Laissez un message et nous reviendrons vers vous pour échanger sur vos enjeux de
              fréquentation, de fluides, de recettes, de RH ou d'occupation.
            </p>
          </div>

          <div className="contact-grid">
            <aside className="contact-card contact-card-info">
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

            <div className="contact-card">
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
                    <input type="email" name="email" placeholder="vous@exemple.fr" required />
                  </label>

                  <label className="contact-field">
                    <span>Téléphone</span>
                    <input type="tel" name="telephone" placeholder="Optionnel" />
                  </label>
                </div>

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
        <p>AquaCore, application de pilotage pour équipements aquatiques.</p>
        <p>
          Pensé pour la fréquentation, les fluides, les recettes, les RH et l'occupation.
          Contact : <a href="mailto:aquacorecontrol@gmail.com">aquacorecontrol@gmail.com</a>
        </p>
      </footer>
    </div>
  );
}
