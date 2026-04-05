// ProductGrid.jsx
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Renault Captur (DC4)",
    description: "Calculateur pour Renault Captur 1.5 Diesel et 1.2 Essence.",
    longDescription: "Calculateur pour Renault Captur 1.5 Diesel et 1.2 Essence. Boîte de vitesses automatique à double embrayage DC4 Getrag 6DCT250 Continental. Pièce Renault d'origine avec plusieurs références disponibles.",
    image: "/images/calculateurs.webp",
  },
  {
    id: 2,
    name: "Renault Clio (DC4)",
    description: "Calculateur Renault pour Clio 1.5 Diesel ou Clio 1.2 Essence et 1.6.",
    longDescription: "Calculateur pour Renault Clio 1.5 diesel et 1.2 essence, boîte de vitesses automatique à double embrayage DC4 Getrag 6DCT250 Continental. Pièce Renault d'origine avec plusieurs références disponibles. Compatible avec Clio, Clio RS et Clio GT de 2010 à 2018.",
    
    image: "/images/calculateurs.webp",
  },
  {
    id: 3,
    name: "Renault Megane (DC4)",
    description: "Calculateur Renault pour Mégane 1.5 Diesel entre 2008 et 2013.",
    longDescription: "Calculateur Renault pour Mégane 1.5 Diesel entre 2008 et 2013. Boîte de vitesses à double embrayage DC4. Pièce Renault d'origine compatible avec plusieurs références.",
    image: "/images/calculateurs.webp",
  },
  {
    id: 4,
    name: "Renault Scénic (DC4)",
    description: "Calculateur Renault pour Scenic 1.5 Diesel entre 2008 et 2013.",
    longDescription: "Calculateur Renault pour Scenic 1.5 Diesel entre 2008 et 2013. Boîte de vitesses automatique à double embrayage DC4. Pièce de remplacement Renault d'origine.",
    image: "/images/calculateurs.webp",
  },
  {
    id: 5,
    name: "DSG7 (DQ200)",
    description: "Calculateur pour DSG7 (DQ200) monté sur Volkswagen.",
    longDescription: "Calculateur pour DSG7 (DQ200) monté sur les véhicules Volkswagen, Audi, Seat et Skoda. Boîte de vitesses automatique à double embrayage sec à 7 rapports.",
    image: "/images/dsg7dq200.webp",
  },
  {
    id: 6,
    name: "Mercedes Classe A/B (722.8)",
    description: "Calculateur ou unité de contrôle pour Mercedes Classe A et B (CVT).",
    longDescription: "Calculateur ou unité de contrôle pour Mercedes Classe A et B avec la boîte de vitesses automatique CVT 722.8. Compatible avec plusieurs années de modèles.",
    image: "/images/marcedesAB1.webp",
  },
  {
    id: 7,
    name: "DW5 (7DCT300)",
    description: "Calculateur 7DCT300 (DW5) monté sur les véhicules Renault.",
    longDescription: "Calculateur 7DCT300 (DW5) monté sur les véhicules Renault dont le Kadjar. Boîte de vitesses automatique à double embrayage humide à 7 rapports.",
    image: "/images/kadjar.webp",
  },
];

function Modal({ product, onClose }) {
  if (!product) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-lg mx-4 p-7 relative overflow-y-auto max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-gray-400 hover:text-gray-700 text-xl leading-none bg-transparent border-none cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-gray-900 mb-5">{product.name}</h2>

        <div className="bg-gray-50 rounded-xl flex items-center justify-center p-4 mb-5" style={{ minHeight: 200 }}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-contain"
          />
        </div>

        <p className="text-sm text-gray-500 leading-relaxed text-center mb-6">
          {product.longDescription}
          {product.link && (
            <> <a href={product.link} className="text-blue-500 hover:underline">{product.link}</a> .</>
          )}
        </p>

        <div className="flex justify-center">
          <a 
            href="/contact"
            className="px-8 py-2.5 rounded-xl border border-gray-300 text-blue-500 text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer">
            Nous contacter
          </a>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, onOpen }) {
  return (
    <div
      className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col transition-shadow duration-200 hover:shadow-md cursor-pointer"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      onClick={onOpen}
    >
      <div className="bg-gray-50 flex items-center justify-center p-4" style={{ minHeight: "200px" }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-contain"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        <div className="hidden w-full h-48 items-center justify-center rounded-lg border-2 border-dashed border-gray-200">
          <span className="text-xs text-gray-400 text-center px-4">{product.image}</span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-base mb-2">{product.name}</h3>
        <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-5">{product.description}</p>
        <div>
          <button
            onClick={onOpen}
            className="inline-flex items-center justify-center px-5 py-2 rounded-lg border border-blue-500 text-blue-500 text-sm font-medium hover:bg-blue-50 transition-colors duration-150 cursor-pointer"
          >
            Commander
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Calculateurs() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <nav className="flex items-center gap-2 text-sm mb-8">
          <a href="/" className="text-gray-500 hover:text-gray-700 transition-colors">Accueil</a>
          <span className="text-gray-400">›</span>
          <a href="/pieces" className="text-gray-500 hover:text-gray-700 transition-colors">PIÈCES</a>
          <span className="text-gray-400">›</span>
          <span className="text-blue-600 font-semibold tracking-wide uppercase text-xs">Calculateurs</span>
        </nav>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpen={() => setSelected(product)}
            />
          ))}
        </div>
      </div>

      <Modal product={selected} onClose={() => setSelected(null)} />
    </div>
  );
}