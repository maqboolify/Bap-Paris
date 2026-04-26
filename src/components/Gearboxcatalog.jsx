import { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
// ─── Google Font ──────────────────────────────────────────────────────────────
// Add to your index.html <head>:
// <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@400;600;700;800&display=swap" rel="stylesheet">

const BRANDS = ["Audi", "BMW", "Citroen", "Jaguar", "Peugeot", "Porsche", "Renault", "Seat", "Volkswagen"];
const ITEMS_PER_PAGE = 12;
const CONTACT_URL = "/contact"; // ← change this if your contact route differs

// ─── Sample data ──────────────────────────────────────────────────────────────
const SAMPLE_DATA = {
  Audi: [
    { image: "https://boitesdevitesses.fr/1-home_default/boite-de-vitesses-audi-a3-20-tfsi-dsg7-reference-.jpg", description: "Boite de vitesses Audi A3 2.0 TFSI DSG7 Référence:", price: "2 890,00 €", page: 0 },
    { image: "https://boitesdevitesses.fr/2-home_default/boite-de-vitesses-audi-a4-30-tfsi-reference-.jpg", description: "Boite de vitesses Audi A4 3.0 TFSI Référence:", price: "3 450,00 €", page: 0 },
    { image: "https://boitesdevitesses.fr/3-home_default/boite-de-vitesses-audi-a6-40-tdi-reference-.jpg", description: "Boite de vitesses Audi A6 4.0 TDI Référence:", price: "2 100,00 €", page: 0 },
    { image: "https://boitesdevitesses.fr/4-home_default/boite-de-vitesses-audi-q5-20-tdi-reference-.jpg", description: "Boite de vitesses Audi Q5 2.0 TDI Quattro Référence:", price: "3 150,00 €", page: 0 },
    { image: "https://boitesdevitesses.fr/5-home_default/boite-de-vitesses-audi-tt-18-tfsi-reference-.jpg", description: "Boite de vitesses Audi TT 1.8 TFSI Référence:", price: "1 890,00 €", page: 0 },
    { image: "https://boitesdevitesses.fr/6-home_default/boite-de-vitesses-audi-q7-30-tdi-reference-.jpg", description: "Boite de vitesses Audi Q7 3.0 TDI Référence:", price: "4 200,00 €", page: 0 },
  ],
  BMW: [
    { image: "https://boitesdevitesses.fr/100-home_default/boite-de-vitesses-bmw-serie3-20d-reference-.jpg", description: "Boite de vitesses BMW Série 3 2.0D Référence:", price: "2 450,00 €", page: 0 },
    { image: "https://boitesdevitesses.fr/101-home_default/boite-de-vitesses-bmw-serie5-30d-reference-.jpg", description: "Boite de vitesses BMW Série 5 3.0D Référence:", price: "3 100,00 €", page: 0 },
    { image: "https://boitesdevitesses.fr/102-home_default/boite-de-vitesses-bmw-x5-30d-reference-.jpg", description: "Boite de vitesses BMW X5 3.0D xDrive Référence:", price: "4 500,00 €", page: 0 },
    { image: "https://boitesdevitesses.fr/103-home_default/boite-de-vitesses-bmw-x3-20d-reference-.jpg", description: "Boite de vitesses BMW X3 2.0D Référence:", price: "2 900,00 €", page: 0 },
    { image: "https://boitesdevitesses.fr/104-home_default/boite-de-vitesses-bmw-serie7-30d-reference-.jpg", description: "Boite de vitesses BMW Série 7 3.0D Référence:", price: "5 100,00 €", page: 0 },
  ],
  Citroen: [
    { image: "https://boitesdevitesses.fr/200-home_default/boite-de-vitesses-citroen-c4-16-hdi-reference-.jpg", description: "Boite de vitesses Citroën C4 1.6 HDI Référence:", price: "890,00 €", page: 0 },
    { image: "https://boitesdevitesses.fr/201-home_default/boite-de-vitesses-citroen-c5-20-hdi-reference-.jpg", description: "Boite de vitesses Citroën C5 2.0 HDI Référence:", price: "1 290,00 €", page: 0 },
    { image: "https://boitesdevitesses.fr/202-home_default/boite-de-vitesses-citroen-berlingo-16-hdi-reference-.jpg", description: "Boite de vitesses Citroën Berlingo 1.6 HDI Référence:", price: "750,00 €", page: 0 },
    { image: "https://boitesdevitesses.fr/203-home_default/boite-de-vitesses-citroen-c3-14-hdi-reference-.jpg", description: "Boite de vitesses Citroën C3 1.4 HDI Référence:", price: "650,00 €", page: 0 },
  ],
  Jaguar: [
    { image: "https://boitesdevitesses.fr/2021-home_default/boite-de-vitesses-jaguar-fpace-20d-reference-.jpg", description: "Boite De Vitesses Jaguar FPace 2.0D Référence:", price: "2 309,00 €", page: 0 },
    { image: "https://boitesdevitesses.fr/2022-home_default/boite-de-vitesses-jaguar-s-type-27d-biturbo-reference-.jpg", description: "Boite De Vitesses Jaguar S Type 2.7D BiTurbo Référence:", price: "2 925,00 €", page: 0 },
    { image: "https://boitesdevitesses.fr/2023-home_default/boite-de-vitesses-jaguar-x-type-v6-20i-reference-.jpg", description: "Boite De Vitesses Jaguar X Type V6 2.0i Référence:", price: "1 496,00 €", page: 0 },
    { image: "https://boitesdevitesses.fr/2024-home_default/boite-de-vitesses-jaguar-x-type-v6-21i-reference-.jpg", description: "Boite De Vitesses Jaguar X Type V6 2.1i Référence:", price: "1 935,00 €", page: 0 },
    { image: "https://boitesdevitesses.fr/2025-home_default/boite-de-vitesses-jaguar-x-type-v6-30i-reference-.jpg", description: "Boite De Vitesses Jaguar X Type V6 3.0i Référence:", price: "1 935,00 €", page: 0 },
  ],
  Peugeot: [
    { image: "https://boitesdevitesses.fr/300-home_default/boite-de-vitesses-peugeot-307-16-hdi-reference-.jpg", description: "Boite de vitesses Peugeot 307 1.6 HDI Référence:", price: "890,00 €", page: 0 },
    { image: "https://boitesdevitesses.fr/301-home_default/boite-de-vitesses-peugeot-407-20-hdi-reference-.jpg", description: "Boite de vitesses Peugeot 407 2.0 HDI Référence:", price: "1 190,00 €", page: 0 },
    { image: "https://boitesdevitesses.fr/302-home_default/boite-de-vitesses-peugeot-508-20-bluehdi-reference-.jpg", description: "Boite de vitesses Peugeot 508 2.0 BlueHDI Référence:", price: "1 650,00 €", page: 0 },
    { image: "https://boitesdevitesses.fr/303-home_default/boite-de-vitesses-peugeot-3008-16-thp-reference-.jpg", description: "Boite de vitesses Peugeot 3008 1.6 THP Référence:", price: "1 350,00 €", page: 0 },
    { image: "https://boitesdevitesses.fr/304-home_default/boite-de-vitesses-peugeot-5008-20-hdi-reference-.jpg", description: "Boite de vitesses Peugeot 5008 2.0 HDI Référence:", price: "1 490,00 €", page: 0 },
  ],
  Porsche: [
    { image: "https://boitesdevitesses.fr/400-home_default/boite-de-vitesses-porsche-cayenne-30d-reference-.jpg", description: "Boite de vitesses Porsche Cayenne 3.0D Référence:", price: "5 900,00 €", page: 0 },
    { image: "https://boitesdevitesses.fr/401-home_default/boite-de-vitesses-porsche-panamera-30-tfsi-reference-.jpg", description: "Boite de vitesses Porsche Panamera 3.0 TFSI Référence:", price: "6 200,00 €", page: 0 },
    { image: "https://boitesdevitesses.fr/402-home_default/boite-de-vitesses-porsche-macan-20-tfsi-reference-.jpg", description: "Boite de vitesses Porsche Macan 2.0 TFSI Référence:", price: "4 100,00 €", page: 0 },
    { image: "https://boitesdevitesses.fr/403-home_default/boite-de-vitesses-porsche-911-37-pdk-reference-.jpg", description: "Boite de vitesses Porsche 911 3.7 PDK Référence:", price: "8 500,00 €", page: 0 },
  ],
  Renault: [
    { image: "https://boitesdevitesses.fr/500-home_default/boite-de-vitesses-renault-megane-15-dci-reference-.jpg", description: "Boite de vitesses Renault Mégane 1.5 DCi Référence:", price: "750,00 €", page: 0 },
    { image: "https://boitesdevitesses.fr/501-home_default/boite-de-vitesses-renault-laguna-20-dci-reference-.jpg", description: "Boite de vitesses Renault Laguna 2.0 DCi Référence:", price: "1 050,00 €", page: 0 },
    { image: "https://boitesdevitesses.fr/502-home_default/boite-de-vitesses-renault-koleos-20-dci-reference-.jpg", description: "Boite de vitesses Renault Koleos 2.0 DCi Référence:", price: "1 390,00 €", page: 0 },
    { image: "https://boitesdevitesses.fr/503-home_default/boite-de-vitesses-renault-scenic-15-dci-reference-.jpg", description: "Boite de vitesses Renault Scénic 1.5 DCi Référence:", price: "820,00 €", page: 0 },
    { image: "https://boitesdevitesses.fr/504-home_default/boite-de-vitesses-renault-talisman-20-dci-reference-.jpg", description: "Boite de vitesses Renault Talisman 2.0 DCi Référence:", price: "1 650,00 €", page: 0 },
    { image: "https://boitesdevitesses.fr/505-home_default/boite-de-vitesses-renault-kadjar-15-dci-reference-.jpg", description: "Boite de vitesses Renault Kadjar 1.5 DCi Référence:", price: "1 150,00 €", page: 0 },
  ],
  Seat: [
    { image: "https://boitesdevitesses.fr/600-home_default/boite-de-vitesses-seat-leon-20-tfsi-dsg-reference-.jpg", description: "Boite de vitesses Seat Leon 2.0 TFSI DSG Référence:", price: "1 490,00 €", page: 0 },
    { image: "https://boitesdevitesses.fr/601-home_default/boite-de-vitesses-seat-ateca-20-tdi-reference-.jpg", description: "Boite de vitesses Seat Ateca 2.0 TDI Référence:", price: "1 890,00 €", page: 0 },
    { image: "https://boitesdevitesses.fr/602-home_default/boite-de-vitesses-seat-tarraco-20-tdi-reference-.jpg", description: "Boite de vitesses Seat Tarraco 2.0 TDI Référence:", price: "2 100,00 €", page: 0 },
    { image: "https://boitesdevitesses.fr/603-home_default/boite-de-vitesses-seat-ibiza-10-tsi-reference-.jpg", description: "Boite de vitesses Seat Ibiza 1.0 TSI Référence:", price: "890,00 €", page: 0 },
  ],
  Volkswagen: [
    { image: "https://boitesdevitesses.fr/700-home_default/boite-de-vitesses-vw-golf-20-tdi-dsg-reference-.jpg", description: "Boite de vitesses VW Golf 2.0 TDI DSG Référence:", price: "1 650,00 €", page: 0 },
    { image: "https://boitesdevitesses.fr/701-home_default/boite-de-vitesses-vw-passat-20-tdi-reference-.jpg", description: "Boite de vitesses VW Passat 2.0 TDI Référence:", price: "1 890,00 €", page: 0 },
    { image: "https://boitesdevitesses.fr/702-home_default/boite-de-vitesses-vw-tiguan-20-tdi-reference-.jpg", description: "Boite de vitesses VW Tiguan 2.0 TDI 4Motion Référence:", price: "2 350,00 €", page: 0 },
    { image: "https://boitesdevitesses.fr/703-home_default/boite-de-vitesses-vw-touareg-30-tdi-reference-.jpg", description: "Boite de vitesses VW Touareg 3.0 TDI Référence:", price: "3 900,00 €", page: 0 },
    { image: "https://boitesdevitesses.fr/704-home_default/boite-de-vitesses-vw-sharan-20-tdi-reference-.jpg", description: "Boite de vitesses VW Sharan 2.0 TDI Référence:", price: "1 750,00 €", page: 0 },
    { image: "https://boitesdevitesses.fr/705-home_default/boite-de-vitesses-vw-polo-10-tsi-reference-.jpg", description: "Boite de vitesses VW Polo 1.0 TSI Référence:", price: "990,00 €", page: 0 },
  ],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function parsePrice(str) {
  if (!str) return 0;
  return parseFloat(str.replace(/[^\d,]/g, "").replace(",", ".")) || 0;
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
  </svg>
);
const ArrowIcon = ({ color = "white" }) => (
  <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);
const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);
const EmptyIcon = () => (
  <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.2" strokeLinecap="round">
    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
  </svg>
);
const GearIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);
const PhoneIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
  </svg>
);
const ShieldCheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" />
  </svg>
);
const TruckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <rect x="1" y="3" width="15" height="13" rx="1" /><path d="M16 8h4l3 3v5h-7V8z" />
    <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);
const ClockIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
  </svg>
);

// ─── Product Detail Modal ─────────────────────────────────────────────────────
function ProductModal({ item, onClose }) {
  const [imgError, setImgError] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    document.body.style.overflow = "hidden";
    return () => { clearTimeout(t); document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!item) return null;

  // Clean up model name for the modal title
  const modelName = item.description
    .replace(/Référence:/gi, "")
    .replace(/Boite De Vitesses/gi, "")
    .replace(/Boite de vitesses/gi, "")
    .trim();

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9000,
        background: "rgba(0,0,0,0.70)",
        backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.25s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: 16,
          width: "100%", maxWidth: 800, maxHeight: "92vh",
          overflowY: "auto", position: "relative",
          fontFamily: "'Bai Jamjuree', sans-serif",
          transform: visible ? "translateY(0) scale(1)" : "translateY(28px) scale(0.96)",
          opacity: visible ? 1 : 0,
          transition: "transform 0.32s cubic-bezier(0.34,1.4,0.64,1), opacity 0.25s ease",
          boxShadow: "0 32px 100px rgba(0,0,0,0.35)",
        }}
      >
        {/* ── Dark header ── */}
        <div style={{
          background: "#111", borderRadius: "16px 16px 0 0",
          padding: "16px 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{
              background: "#db0000", color: "#fff",
              fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase",
              padding: "4px 10px", borderRadius: 4,
            }}>
              {item._brand}
            </span>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 600, letterSpacing: "0.06em" }}>
              Boîte automatique
            </span>
          </div>
          <button
            onClick={onClose}
            title="Fermer (Échap)"
            style={{
              width: 34, height: 34, borderRadius: "50%",
              background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)",
              color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#db0000")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
          >
            <CloseIcon />
          </button>
        </div>

        {/* ── Two-column body ── */}
        <div className="modal-body" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>

          {/* Left: image panel */}
          <div style={{
            background: "#f5f5f5", display: "flex",
            flexDirection: "column", alignItems: "center", justifyContent: "center",
            padding: "36px 28px", gap: 20,
            borderRight: "1px solid #ebebeb", minHeight: 300,
          }}>
            {!imgError ? (
              <img
                src={item.image}
                alt={item.description}
                onError={() => setImgError(true)}
                style={{ width: "100%", maxWidth: 260, height: "auto", objectFit: "contain" }}
              />
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, color: "#ccc" }}>
                <GearIcon size={52} />
                <span style={{ fontSize: 12 }}>Image non disponible</span>
              </div>
            )}

            {/* Image caption */}
            <div style={{
              background: "#fff", border: "1px solid #ebebeb", borderRadius: 8,
              padding: "10px 14px", width: "100%", textAlign: "center",
            }}>
              <p style={{ fontSize: 11, color: "#999", margin: 0, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Photo non contractuelle
              </p>
            </div>
          </div>

          {/* Right: info panel */}
          <div style={{ padding: "28px 28px 24px", display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Title */}
            <div>
              <h2 style={{ fontSize: 19, fontWeight: 800, color: "#111", margin: "0 0 6px", lineHeight: 1.3 }}>
                {modelName}
              </h2>
              {/* Separator */}
              <div style={{ width: 36, height: 3, background: "#db0000", borderRadius: 2 }} />
            </div>

            {/* Description */}
            <p style={{ fontSize: 13, color: "#555", lineHeight: 1.7, margin: 0 }}>
              Boîte de vitesses automatique reconditionnée et testée selon nos protocoles qualité.
              Compatible avec les véhicules du groupe <strong style={{ color: "#111" }}>{item._brand}</strong>.
              Fournie avec rapport de contrôle et garantie incluse.
            </p>

            {/* Trust badges */}
            <div style={{
              background: "#f8f8f8", border: "1px solid #ebebeb",
              borderRadius: 10, padding: "14px 16px",
              display: "flex", flexDirection: "column", gap: 10,
            }}>
              {[
                { icon: <ShieldCheckIcon />, label: "Garantie 6 à 12 mois selon prestation" },
                { icon: <TruckIcon />, label: "Livraison disponible en France" },
                { icon: <ClockIcon />, label: "Devis gratuit sous 24h" },
              ].map(({ icon, label }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ color: "#db0000", display: "flex", flexShrink: 0 }}>{icon}</span>
                  <span style={{ fontSize: 12, color: "#444", fontWeight: 600 }}>{label}</span>
                </div>
              ))}
            </div>

            {/* Price */}
            <div style={{ borderTop: "1px solid #ebebeb", paddingTop: 16 }}>
              <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.14em", color: "#aaa", fontWeight: 700, margin: "0 0 4px" }}>
                Prix indicatif TTC
              </p>
              <p style={{ fontSize: 30, fontWeight: 800, color: "#db0000", margin: 0, lineHeight: 1 }}>
                {item.price}
              </p>
              <p style={{ fontSize: 11, color: "#bbb", margin: "5px 0 0" }}>
                Hors pose · Sous réserve de disponibilité
              </p>
            </div>

            {/* CTA buttons */}
            <div style={{ display: "flex", gap: 10 }}>
              <Link
                to={CONTACT_URL}
                style={{
                  flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  background: "#db0000", color: "#fff",
                  fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                  padding: "14px 16px", borderRadius: 8, textDecoration: "none",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#b50000")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#db0000")}
              >
                <PhoneIcon />
                Nous contacter
              </Link>
              <button
                onClick={onClose}
                style={{
                  flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                  background: "#fff", color: "#555",
                  fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                  padding: "14px 16px", borderRadius: 8,
                  border: "1.5px solid #ddd", cursor: "pointer",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#111"; e.currentTarget.style.color = "#111"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#ddd"; e.currentTarget.style.color = "#555"; }}
              >
                Retour
              </button>
            </div>
          </div>
        </div>

        {/* ── Footer trust bar ── */}
        <div style={{
          background: "#111", borderRadius: "0 0 16px 16px",
          padding: "12px 24px",
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 28, flexWrap: "wrap",
        }}>
          {[
            "Diagnostic offert sur devis accepté",
            "Techniciens certifiés",
            "Toutes marques",
          ].map((text) => (
            <span key={text} style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: "#db0000", fontSize: 13 }}>✓</span> {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ item, onOpen }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      style={{
        background: "#fff", border: "1px solid #ebebeb", borderRadius: 10,
        overflow: "hidden", display: "flex", flexDirection: "column",
        transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
        cursor: "pointer", fontFamily: "'Bai Jamjuree', sans-serif",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#db0000";
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 8px 28px rgba(219,0,0,0.10)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#ebebeb";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        style={{ position: "relative", aspectRatio: "4/3", background: "#f5f5f5", overflow: "hidden" }}
        onClick={() => onOpen(item)}
      >
        {!imgError ? (
          <img
            src={item.image}
            alt={item.description}
            loading="lazy"
            onError={() => setImgError(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.35s" }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <GearIcon />
          </div>
        )}
        <div style={{
          position: "absolute", top: 10, left: 10, background: "#db0000", color: "#fff",
          fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
          padding: "3px 8px", borderRadius: 4,
        }}>
          {item._brand}
        </div>
      </div>

      <div style={{ padding: "14px 14px 16px", flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a", lineHeight: 1.45, flex: 1 }}>
          {item.description}
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 17, fontWeight: 800, color: "#db0000" }}>{item.price}</span>
          <button
            onClick={() => onOpen(item)}
            style={{
              display: "flex", alignItems: "center", gap: 5,
              background: "#111", color: "#fff",
              fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
              padding: "7px 13px", borderRadius: 6, border: "none", cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#db0000")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#111")}
          >
            Voir <ArrowIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Skeleton Card ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div style={{ background: "#f5f5f5", borderRadius: 10, overflow: "hidden" }}>
      <div style={{ aspectRatio: "4/3", background: "#ebebeb", animation: "pulse 1.5s ease-in-out infinite" }} />
      <div style={{ padding: 14 }}>
        <div style={{ height: 12, background: "#ebebeb", borderRadius: 4, marginBottom: 8, animation: "pulse 1.5s ease-in-out infinite" }} />
        <div style={{ height: 12, width: "60%", background: "#ebebeb", borderRadius: 4, animation: "pulse 1.5s ease-in-out infinite" }} />
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function GearboxCatalog() {
  const [allData, setAllData] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeBrand, setActiveBrand] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortMode, setSortMode] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);

  // ── Load data ────────────────────────────────────────────────────────────────
  // OPTION A — Sample data (for testing)
//   useEffect(() => {
//     setTimeout(() => {
//       setAllData(
//         Object.fromEntries(
//           Object.entries(SAMPLE_DATA).map(([brand, items]) => [
//             brand,
//             items.map((item, i) => ({ ...item, _brand: brand, _id: `${brand}_${i}` })),
//           ])
//         )
//       );
//       setLoading(false);
//     }, 600);
//   }, []);

  // OPTION B — Fetch from your real JSON files (uncomment + remove OPTION A above)
  useEffect(() => {
    Promise.all(
      BRANDS.map((b) =>
        fetch(`/data/${b.toLowerCase()}.json`)
          .then((r) => r.json())
          .then((items) => [b, items.map((item, i) => ({ ...item, _brand: b, _id: `${b}_${i}` }))])
      )
    ).then((entries) => {
      setAllData(Object.fromEntries(entries));
      setLoading(false);
    });
  }, []);

  // ── Filtering & sorting ──────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let items = activeBrand === "all" ? Object.values(allData).flat() : (allData[activeBrand] || []);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter((i) => i.description.toLowerCase().includes(q));
    }
    if (sortMode === "price-asc") return [...items].sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    if (sortMode === "price-desc") return [...items].sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    if (sortMode === "alpha") return [...items].sort((a, b) => a.description.localeCompare(b.description));
    return items;
  }, [allData, activeBrand, searchQuery, sortMode]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const safePage = Math.min(currentPage, totalPages || 1);
  const pageItems = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);
  const totalItems = Object.values(allData).reduce((s, arr) => s + arr.length, 0);

  const handleBrandChange = (brand) => { setActiveBrand(brand); setCurrentPage(1); };
  const handleSearch = (e) => { setSearchQuery(e.target.value); setCurrentPage(1); };
  const handleSort = (e) => { setSortMode(e.target.value); setCurrentPage(1); };
  const openModal = useCallback((item) => setSelectedItem(item), []);
  const closeModal = useCallback(() => setSelectedItem(null), []);

  function getPageNumbers() {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (totalPages <= 7 || i === 1 || i === totalPages || Math.abs(i - safePage) <= 1) pages.push(i);
      else if (pages[pages.length - 1] !== "...") pages.push("...");
    }
    return pages;
  }

  const sidebarItems = [
    { label: "Toutes les marques", key: "all", count: totalItems },
    ...BRANDS.map((b) => ({ label: b, key: b, count: (allData[b] || []).length })),
  ];

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: "'Bai Jamjuree', sans-serif", background: "#f7f7f7", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@400;600;700;800&display=swap');
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: #ccc; border-radius: 4px; }
        @media (max-width: 768px) {
          .catalog-layout { grid-template-columns: 1fr !important; }
          .sidebar-col { display: none !important; }
          .modal-body { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Modal */}
      {selectedItem && <ProductModal item={selectedItem} onClose={closeModal} />}

      {/* ── Hero bar ── */}
      <div style={{ background: "#111", borderBottom: "3px solid #db0000", padding: "24px 32px" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <h1 style={{ color: "#fff", fontSize: "clamp(18px, 3vw, 24px)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.02em", margin: 0 }}>
            Boîtes de vitesses manuelles
          </h1>
          <p style={{ color: "#db0000", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 4 }}>
            Toutes marques · Diagnostic offert sur devis accepté
          </p>
        </div>
      </div>

      {/* ── Breadcrumb ── */}
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "12px 20px 0" }}>
        <p style={{ fontSize: 12, color: "#888", display: "flex", gap: 6, alignItems: "center" }}>
          <Link href="/" style={{ color: "#888", textDecoration: "none" }}>Accueil</Link>
          <span style={{ opacity: 0.5 }}>›</span>
          <span style={{ color: "#db0000" }}>{activeBrand === "all" ? "Toutes marques" : activeBrand}</span>
        </p>
      </div>

      {/* ── Layout ── */}
      <div
        className="catalog-layout"
        style={{
          maxWidth: 1300, margin: "20px auto", padding: "0 20px 60px",
          display: "grid", gridTemplateColumns: "220px 1fr", gap: 28, alignItems: "start",
        }}
      >
        {/* ── Sidebar ── */}
        <aside
          className="sidebar-col"
          style={{
            background: "#fff", border: "1px solid #ebebeb",
            borderRadius: 12, overflow: "hidden", position: "sticky", top: 20,
          }}
        >
          <div style={{
            padding: "12px 16px", background: "#db0000",
            fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#fff",
          }}>
            Filtrer par marque
          </div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {sidebarItems.map(({ label, key, count }) => {
              const active = activeBrand === key;
              return (
                <li key={key} style={{ borderBottom: "1px solid #f0f0f0" }}>
                  <button
                    onClick={() => handleBrandChange(key)}
                    style={{
                      width: "100%", padding: "10px 16px", display: "flex", alignItems: "center", gap: 10,
                      background: active ? "#db0000" : "transparent", border: "none", cursor: "pointer",
                      fontSize: 13, fontWeight: 600, color: active ? "#fff" : "#222",
                      transition: "background 0.15s, color 0.15s", textAlign: "left",
                    }}
                    onMouseEnter={(e) => { if (!active) { e.currentTarget.style.background = "#fff5f5"; e.currentTarget.style.color = "#db0000"; } }}
                    onMouseLeave={(e) => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#222"; } }}
                  >
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: active ? "#fff" : "#db0000", flexShrink: 0 }} />
                    {label}
                    <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 700, opacity: 0.65 }}>{count}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* ── Main content ── */}
        <div>
          {/* Toolbar */}
          <div style={{
            display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap",
            background: "#fff", border: "1px solid #ebebeb", borderRadius: 10, padding: "10px 16px", marginBottom: 20,
          }}>
            <p style={{ fontSize: 13, color: "#888", flex: 1 }}>
              <strong style={{ color: "#111", fontWeight: 700 }}>{filtered.length}</strong> boîte{filtered.length !== 1 ? "s" : ""} trouvée{filtered.length !== 1 ? "s" : ""}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#f5f5f5", border: "1px solid #ebebeb", borderRadius: 8, padding: "6px 12px" }}>
              <SearchIcon />
              <input
                type="text" value={searchQuery} onChange={handleSearch}
                placeholder="Rechercher un modèle..."
                style={{ background: "none", border: "none", outline: "none", fontSize: 13, color: "#111", width: 180, fontFamily: "'Bai Jamjuree', sans-serif" }}
              />
            </div>
            <select
              value={sortMode} onChange={handleSort}
              style={{ fontSize: 13, border: "1px solid #ebebeb", borderRadius: 8, padding: "7px 10px", background: "#f5f5f5", color: "#111", cursor: "pointer", outline: "none", fontFamily: "'Bai Jamjuree', sans-serif" }}
            >
              <option value="default">Pertinence</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="alpha">Alphabétique</option>
            </select>
          </div>

          {/* Grid */}
          {loading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 18 }}>
              {Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : pageItems.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#999" }}>
              <EmptyIcon />
              <p style={{ marginTop: 16, fontSize: 15 }}>Aucun résultat trouvé</p>
              <p style={{ fontSize: 13, marginTop: 6 }}>Essayez un autre terme ou sélectionnez une autre marque</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 18 }}>
              {pageItems.map((item) => (
                <ProductCard key={item._id} item={item} onOpen={openModal} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 36 }}>
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #ebebeb", borderRadius: 8, background: "#fff", color: "#111", cursor: safePage === 1 ? "default" : "pointer", opacity: safePage === 1 ? 0.4 : 1 }}
                onMouseEnter={(e) => { if (safePage !== 1) e.currentTarget.style.borderColor = "#db0000"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#ebebeb"; }}
              >
                <ChevronLeft />
              </button>
              {getPageNumbers().map((pg, i) =>
                pg === "..." ? (
                  <span key={`dots-${i}`} style={{ width: 36, textAlign: "center", color: "#999", fontSize: 13 }}>…</span>
                ) : (
                  <button
                    key={pg}
                    onClick={() => setCurrentPage(pg)}
                    style={{
                      minWidth: 36, height: 36, padding: "0 8px", display: "flex", alignItems: "center", justifyContent: "center",
                      border: "1px solid", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
                      background: pg === safePage ? "#db0000" : "#fff",
                      borderColor: pg === safePage ? "#db0000" : "#ebebeb",
                      color: pg === safePage ? "#fff" : "#111",
                      fontFamily: "'Bai Jamjuree', sans-serif",
                    }}
                    onMouseEnter={(e) => { if (pg !== safePage) { e.currentTarget.style.borderColor = "#db0000"; e.currentTarget.style.color = "#db0000"; } }}
                    onMouseLeave={(e) => { if (pg !== safePage) { e.currentTarget.style.borderColor = "#ebebeb"; e.currentTarget.style.color = "#111"; } }}
                  >
                    {pg}
                  </button>
                )
              )}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #ebebeb", borderRadius: 8, background: "#fff", color: "#111", cursor: safePage === totalPages ? "default" : "pointer", opacity: safePage === totalPages ? 0.4 : 1 }}
                onMouseEnter={(e) => { if (safePage !== totalPages) e.currentTarget.style.borderColor = "#db0000"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#ebebeb"; }}
              >
                <ChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}