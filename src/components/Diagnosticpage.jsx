// DiagnosticPage.jsx — Bap Paris
// Requires: framer-motion  (`npm install framer-motion`)
// Font: add to index.html <head>
// <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@400;500;600;700;800&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet">

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";

// ─── Animation helpers ────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

function InView({ children, variants = fadeUp, custom = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={custom}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Section label pill ───────────────────────────────────────────────────────
function Tag({ children }) {
  return (
    <span
      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-5"
      style={{ background: "rgba(219,0,0,0.12)", color: "#db0000" }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block" />
      {children}
    </span>
  );
}

// ─── Red accent divider ───────────────────────────────────────────────────────
function Divider() {
  return (
    <InView className="flex items-center gap-4 my-20">
      <div className="flex-1 h-px bg-black/8" />
      <div className="flex gap-1.5">
        <span className="w-2 h-2 rounded-full bg-red-600" />
        <span className="w-2 h-2 rounded-full bg-red-600/40" />
        <span className="w-2 h-2 rounded-full bg-red-600/20" />
      </div>
      <div className="flex-1 h-px bg-black/8" />
    </InView>
  );
}

// ─── Step card ────────────────────────────────────────────────────────────────
function StepCard({ number, title, desc, delay }) {
  return (
    <InView custom={delay}>
      <div
        className="relative p-6 rounded-2xl border border-black/8 group hover:border-red-600/40 transition-colors duration-300"
        style={{ background: "rgba(0,0,0,0.02)" }}
      >
        <div
          className="text-5xl font-black mb-4 leading-none select-none"
          style={{
            fontFamily: "'DM Serif Display', serif",
            color: "rgba(219,0,0,0.15)",
          }}
        >
          {number}
        </div>
        <h3
          className="text-black font-bold text-base mb-2"
          style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}
        >
          {title}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{
            color: "rgba(0,0,0,0.5)",
            fontFamily: "'Bai Jamjuree', sans-serif",
          }}
        >
          {desc}
        </p>
        <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </InView>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function DiagnosticPage() {
  // Parallax for hero accent
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], [0, 120]);

  return (
    <main
      style={{
        background: "#ffffff",
        fontFamily: "'Bai Jamjuree', sans-serif",
        color: "#1a1a1a",
      }}
    >
      {/* ═══════════════════════════════════════════════════════════
          HERO BANNER
      ═══════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{ minHeight: "44vh" }}
      >
        {/* Background grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Red glow blob */}
        <motion.div
          style={{ y: heroY }}
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(circle, rgba(219,0,0,0.18) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32 flex flex-col lg:flex-row items-center gap-12">
          {/* Left text */}
          <div className="flex-1">
            {/* Breadcrumb */}
            {/* <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 text-xs mb-8"
              style={{ color: "rgba(0,0,0,0.35)" }}
            >
              <a href="/" className="hover:text-red-500 transition-colors">Accueil</a>
              <span>/</span>
              <a href="/prestations" className="hover:text-red-500 transition-colors">Prestations</a>
              <span>/</span>
              <span style={{ color: "#db0000" }}>Diagnostic</span>
            </motion.div> */}

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Tag>Prestation Bap Paris</Tag>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-black leading-[1.05] mb-6"
              style={{
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                fontFamily: "'DM Serif Display', serif",
                color: "#1a1a1a",
              }}
            >
              Diagnostic<br />
              <em className="not-italic" style={{ color: "#db0000" }}>Boîte Automatique</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-base leading-relaxed max-w-xl mb-10"
              style={{ color: "rgba(0,0,0,0.55)" }}
            >
              Une analyse complète et méthodique de votre transmission automatique — lecture des codes défaut, contrôle du niveau d'huile, inspection du bloc mécatronique et vérification de la pression hydraulique.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-3 font-bold text-xs uppercase tracking-wider text-white rounded-full px-8 h-[50px] transition-all duration-300 hover:scale-[1.03]"
                style={{ background: "#db0000" }}
              >
                Prendre Rendez-vous
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="#diagnostic"
                className="inline-flex items-center gap-2 font-semibold text-xs uppercase tracking-wider h-[50px] px-8 rounded-full border border-black/15 text-black/70 hover:text-black hover:border-black/40 transition-all duration-300"
              >
                En savoir plus
              </a>
            </motion.div>
          </div>

          {/* Right — stats cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-shrink-0 grid grid-cols-2 gap-3 w-full lg:w-auto"
          >
            {[
              { value: "90€", label: "Diagnostic complet", sub: "Déduit sur réparation" },
              { value: "24h", label: "Délai de réponse", sub: "Devis rapide" },
              { value: "100%", label: "Toutes marques", sub: "BMW, Renault, Audi…" },
              { value: "3", label: "Ateliers Paris", sub: "Roissy · Brétigny" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                className="rounded-2xl p-5 border border-black/8"
                style={{ background: "rgba(0,0,0,0.03)", minWidth: "150px" }}
              >
                <div
                  className="text-3xl font-black leading-none mb-1"
                  style={{ fontFamily: "'DM Serif Display', serif", color: "#db0000" }}
                >
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-black mb-0.5">{stat.label}</div>
                <div className="text-xs" style={{ color: "rgba(0,0,0,0.4)" }}>{stat.sub}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #ffffff)" }}
        />
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1 — DIAGNOSTIC MÉCANIQUE
      ═══════════════════════════════════════════════════════════ */}
      <section id="diagnostic" className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <InView>
              <Tag>Notre Méthode</Tag>
            </InView>
            <InView>
              <h2
                className="font-black leading-tight mb-6"
                style={{
                  fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                  fontFamily: "'DM Serif Display', serif",
                  color: "#1a1a1a",
                }}
              >
                Diagnostic mécanique{" "}
                <span style={{ color: "#db0000" }}>complet</span>
              </h2>
            </InView>
            <InView>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(0,0,0,0.55)" }}>
                Le diagnostic d'une boîte automatique ne se résume pas à la lecture des codes défaut. Chez Bap Paris, nous effectuons un contrôle complet incluant le{" "}
                <strong className="text-black">niveau et la qualité de l'huile</strong>, la présence éventuelle de limaille métallique, ainsi que la vérification de la pression du{" "}
                <strong className="text-black">bloc mécatronique</strong> (bloc de contrôle hydraulique).
              </p>
            </InView>
            <InView>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(0,0,0,0.55)" }}>
                Si les premiers tests ne suffisent pas à identifier la panne, nous procédons à une inspection approfondie pouvant inclure le démontage du carter. Cette rigueur nous permet d'établir un devis précis et honnête avant toute intervention.
              </p>
            </InView>
            <InView>
              <a
                href="/contact"
                className="inline-flex items-center gap-3 font-bold text-xs uppercase tracking-wider text-white rounded-full px-8 h-[48px] transition-all duration-300 hover:scale-[1.03]"
                style={{ background: "#db0000" }}
              >
                Contactez-nous
              </a>
            </InView>
          </div>

          {/* Image panel */}
          <InView variants={fadeRight} className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src="/images/diag1.webp"
                alt="Diagnostic boîte automatique Bap Paris"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              {/* Placeholder shown if image missing */}
              <div
                className="absolute inset-0 items-center justify-center hidden"
                style={{ background: "rgba(219,0,0,0.08)", border: "1px dashed rgba(219,0,0,0.3)" }}
              >
                <p className="text-xs text-red-500/60 text-center px-8">
                  /images/diagnostic-mechanique.jpg
                </p>
              </div>
              {/* Red corner accent */}
              <div
                className="absolute top-0 left-0 w-20 h-20"
                style={{
                  background: "linear-gradient(135deg, rgba(219,0,0,0.6) 0%, transparent 60%)",
                }}
              />
            </div>
            {/* Floating badge */}
            <div
              className="absolute -bottom-5 -left-5 rounded-2xl px-5 py-4 border border-red-900/40"
              style={{ background: "#ffffff", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(219,0,0,0.15)" }}
                >
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                    <path d="M9 12l2 2 4-4" stroke="#db0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="9" stroke="#db0000" strokeWidth="1.5" />
                  </svg>
                </div>
                <div>
                  <p className="text-black text-xs font-bold">Diagnostic à 90€</p>
                  <p className="text-xs" style={{ color: "rgba(0,0,0,0.4)" }}>Déduit sur réparation</p>
                </div>
              </div>
            </div>
          </InView>
        </div>
      </section>

      {/* ─── Steps strip ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { number: "01", title: "Lecture valise", desc: "Lecture des codes défaut avec valise professionnelle Autel, Launch ou Flex." },
            { number: "02", title: "Contrôle huile", desc: "Vérification du niveau, de la qualité et de la présence de limaille dans l'huile ATF." },
            { number: "03", title: "Mécatronique", desc: "Inspection du bloc de contrôle hydraulique et vérification de la pression des solénoïdes." },
            { number: "04", title: "Devis précis", desc: "Remise d'un devis détaillé avant toute intervention mécanique ou électronique." },
          ].map((s, i) => (
            <StepCard key={i} {...s} delay={i} />
          ))}
        </div>
      </section>

      <Divider />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2 — LA VALISE DIAGNOSTIQUE
      ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-10 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <InView variants={fadeLeft} className="relative order-last lg:order-first">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src="/images/diag2.png"
                alt="Valise diagnostique boîte automatique"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div
                className="absolute inset-0 items-center justify-center hidden"
                style={{ background: "rgba(219,0,0,0.08)", border: "1px dashed rgba(219,0,0,0.3)" }}
              >
                <p className="text-xs text-red-500/60 text-center px-8">/images/valise-diagnostic.jpg</p>
              </div>
              {/* Bottom gradient */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1/3"
                style={{ background: "linear-gradient(to top, rgba(255,255,255,0.8), transparent)" }}
              />
            </div>

            {/* Tool logos strip */}
            <div
              className="absolute bottom-4 left-4 right-4 rounded-xl px-4 py-3 flex items-center gap-3 border border-black/8"
              style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)" }}
            >
              <span className="text-xs font-semibold" style={{ color: "rgba(0,0,0,0.4)" }}>Compatible :</span>
              {["Autel", "Launch", "Flex", "Delphi"].map((tool) => (
                <span
                  key={tool}
                  className="text-xs font-bold px-2.5 py-1 rounded-md"
                  style={{ background: "rgba(219,0,0,0.12)", color: "#db0000" }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </InView>

          {/* Text */}
          <div>
            <InView>
              <Tag>Outils Professionnels</Tag>
            </InView>
            <InView>
              <h2
                className="font-black leading-tight mb-6"
                style={{
                  fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                  fontFamily: "'DM Serif Display', serif",
                  color: "#1a1a1a",
                }}
              >
                La valise{" "}
                <span style={{ color: "#db0000" }}>diagnostique</span>
              </h2>
            </InView>
            <InView>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(0,0,0,0.55)" }}>
                Les codes défaut renvoyés par la valise ne sont qu'un point de départ. Leur interprétation requiert une connaissance approfondie de chaque modèle de boîte et une véritable expertise terrain. Les outils varient selon les marques —{" "}
                <strong className="text-black">Autel, Launch, Flex, Delphi</strong> — chacun avec ses spécificités.
              </p>
            </InView>
            <InView>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(0,0,0,0.55)" }}>
                Chez Bap Paris, nos techniciens maîtrisent les "petits secrets" de chaque système pour distinguer une fausse alerte d'une défaillance réelle. Retrouvez notre récapitulatif des codes défaut dans notre{" "}
                <a href="/ressources/aide-en-ligne" className="font-semibold underline underline-offset-2 hover:text-red-400 transition-colors" style={{ color: "#db0000" }}>
                  base de ressources en ligne
                </a>.
              </p>
            </InView>

            {/* Feature list */}
            <div className="space-y-3">
              {[
                "Lecture multi-marques toutes transmissions automatiques",
                "Interprétation experte des codes P, U, C et B",
                "Croisement avec l'historique d'entretien du véhicule",
              ].map((feat, i) => (
                <InView key={i} custom={i}>
                  <div className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: "rgba(219,0,0,0.15)" }}
                    >
                      <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                        <path d="M2 6l3 3 5-5" stroke="#db0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <p className="text-sm" style={{ color: "rgba(0,0,0,0.6)" }}>{feat}</p>
                  </div>
                </InView>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3 — VOYANT TABLEAU DE BORD
      ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-10 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <InView>
              <Tag>Alerte Transmission</Tag>
            </InView>
            <InView>
              <h2
                className="font-black leading-tight mb-6"
                style={{
                  fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                  fontFamily: "'DM Serif Display', serif",
                  color: "#1a1a1a",
                }}
              >
                Voyant tableau{" "}
                <span style={{ color: "#db0000" }}>de bord</span>
              </h2>
            </InView>
            <InView>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(0,0,0,0.55)" }}>
                <strong className="text-black">"Boîte de vitesse à contrôler"</strong>,{" "}
                <strong className="text-black">"Défaut transmission — aller à l'atelier"</strong> ou encore{" "}
                <strong className="text-black">"Surchauffe boîte de vitesse"</strong> — ces alertes apparaissent sur BMW, Audi, Volkswagen, Mercedes, Peugeot, Renault, Toyota et de nombreuses autres marques.
              </p>
            </InView>
            <InView>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(0,0,0,0.55)" }}>
                Elles signalent presque toujours un problème de transmission automatique — mais dans environ 10% des cas, l'origine peut être moteur, ABS ou autre. Il est donc impératif de ne jamais ignorer ces alertes et d'effectuer un diagnostic rapide chez un spécialiste.
              </p>
            </InView>

            {/* Warning messages cards */}
            <div className="space-y-2">
              {[
                "Boîte de vitesse à contrôler",
                "Défaut boîte de vitesse — aller à l'atelier",
                "Surchauffe boîte de vitesse",
              ].map((msg, i) => (
                <InView key={i} custom={i}>
                  <div
                    className="flex items-center gap-3 rounded-xl px-4 py-3 border"
                    style={{
                      background: "rgba(219,0,0,0.06)",
                      borderColor: "rgba(219,0,0,0.2)",
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 shrink-0" style={{ color: "#db0000" }}>
                      <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-xs font-semibold text-black/70 italic">"{msg}"</span>
                  </div>
                </InView>
              ))}
            </div>
          </div>

          {/* Image */}
          <InView variants={fadeRight} className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src="/images/diag3.png"
                alt="Voyant tableau de bord transmission automatique"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div
                className="absolute inset-0 items-center justify-center hidden"
                style={{ background: "rgba(219,0,0,0.08)", border: "1px dashed rgba(219,0,0,0.3)" }}
              >
                <p className="text-xs text-red-500/60 text-center px-8">/images/voyant-tableau-bord.jpg</p>
              </div>
            </div>
            {/* Pulse dot */}
            <div className="absolute top-5 right-5">
              <span className="relative flex h-4 w-4">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                  style={{ background: "#db0000" }}
                />
                <span
                  className="relative inline-flex rounded-full h-4 w-4"
                  style={{ background: "#db0000" }}
                />
              </span>
            </div>
          </InView>
        </div>
      </section>

      <Divider />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4 — EN CONCLUSION (dark card)
      ═══════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-28">
        <InView>
          <div
            className="relative rounded-3xl overflow-hidden p-10 lg:p-16 border border-black/8"
            style={{ background: "rgba(219,0,0,0.03)", border: "1px solid rgba(219,0,0,0.12)" }}
          >
            {/* Background decoration */}
            <div
              className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(219,0,0,0.08) 0%, transparent 65%)",
                transform: "translate(30%, -30%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            <div className="relative z-10 max-w-3xl">
              <Tag>Conclusion</Tag>
              <h2
                className="font-black leading-tight mb-6"
                style={{
                  fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                  fontFamily: "'DM Serif Display', serif",
                  color: "#1a1a1a",
                }}
              >
                Un diagnostic{" "}
                <span style={{ color: "#db0000" }}>rigoureux</span>{" "}
                pour une réparation durable
              </h2>

              <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(0,0,0,0.55)" }}>
                La boîte automatique est un ensemble complexe mêlant mécanique, hydraulique et électronique : convertisseur de couple, disques de friction, bagues en bronze, joints de carter, embrayages simple ou double, bloc mécatronique, solénoïdes de pression, synchros… Chaque composant joue un rôle précis dans le fonctionnement de la transmission.
              </p>
              <p className="text-sm leading-relaxed mb-10" style={{ color: "rgba(0,0,0,0.55)" }}>
                Chez Bap Paris, deux actions sont au cœur de chaque diagnostic : d'abord maîtriser en détail le modèle de boîte concerné (
                <a href="/ressources/type-de-bva" className="underline underline-offset-2 hover:text-red-400 transition-colors" style={{ color: "#db0000" }}>
                  voir notre guide Type de BVA
                </a>
                ), puis effectuer un diagnostic électronique et mécanique complet — niveaux d'huile, crépine, supports moteur et boîte — pour garantir que la panne identifiée est bien la source réelle du problème.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-3 font-bold text-xs uppercase tracking-wider text-white rounded-full px-8 h-[50px] transition-all duration-300 hover:scale-[1.03]"
                  style={{ background: "#db0000" }}
                >
                  Prendre Rendez-vous
                  <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a
                  href="/tarif"
                  className="inline-flex items-center gap-2 font-semibold text-xs uppercase tracking-wider h-[50px] px-8 rounded-full border border-black/15 text-black/70 hover:text-black hover:border-black/40 transition-all duration-300"
                >
                  Voir les Tarifs
                </a>
              </div>
            </div>
          </div>
        </InView>
      </section>
    </main>
  );
}