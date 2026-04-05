// TransmissionsPage.jsx
import { useState } from "react";

const transmissions = [
  {
    id: 1,
    name: "TF60",
    description: "Boîte de vitesses à convertisseur de couple de marque Aisin.",
    longDescription: "La TF60 est une boîte de vitesses automatique à convertisseur de couple de marque Aisin. Elle équipe de nombreux véhicules européens et offre une fiabilité reconnue sur le marché.",
    price: 2500,
    inStock: false,
    image: "/images/TF60.webp",
  },
  {
    id: 2,
    name: "5L40E",
    description: "Boîte de vitesses à convertisseur de couple de marque General Motors.",
    longDescription: "La 5L40E est une boîte de vitesses automatique à convertisseur de couple de marque General Motors. Elle est montée sur plusieurs véhicules du groupe GM, BMW et autres constructeurs partenaires.",
    price: 2500,
    inStock: false,
    image: "/images/5L40E.png",
  },
  {
    id: 3,
    name: "6DCT450",
    description: "Boîte de vitesses à double embrayage de marque GETRAG.",
    longDescription: "La 6DCT450 est une boîte de vitesses à double embrayage de marque GETRAG. Elle offre des passages de vitesses rapides et une efficacité énergétique améliorée, montée sur plusieurs véhicules Ford et Volvo.",
    price: 3500,
    inStock: false,
    image: "/images/6DCT450.webp",
  },
  {
    id: 4,
    name: "6HP26",
    description: "Boîte de vitesses à convertisseur de couple de marque ZF.",
    longDescription: "La 6HP26 est une boîte de vitesses automatique à convertisseur de couple de marque ZF à 6 rapports. Elle équipe de nombreux véhicules BMW, Audi, Land Rover et Rolls-Royce.",
    price: 2900,
    inStock: false,
    image: "/images/6HP26.webp",
  },
  {
    id: 5,
    name: "8HP70",
    description: "Boîte de vitesses à convertisseur de couple de marque ZF.",
    longDescription: "La 8HP70 est une boîte de vitesses automatique à convertisseur de couple de marque ZF à 8 rapports. Elle équipe des véhicules haut de gamme de BMW, Audi, Chrysler et Jeep.",
    price: 3900,
    inStock: false,
    image: "/images/8HP70.webp",
  },
  {
    id: 6,
    name: "722.8",
    description: "Transmission à variation continue (Mercedes).",
    longDescription: "La 722.8 est une transmission à variation continue (CVT) développée par Mercedes-Benz. Elle équipe les classes A et B et offre une conduite fluide et économe en carburant.",
    price: 3200,
    inStock: false,
    image: "/images/722.webp",
  },
  {
    id: 7,
    name: "AW-55-50",
    description: "Boîte de vitesses à convertisseur de couple de marque Aisin.",
    longDescription: "L'AW-55-50 est une boîte de vitesses automatique à convertisseur de couple de marque Aisin à 5 rapports. Elle équipe des véhicules Volvo, Renault, Opel et Saab.",
    price: 2800,
    inStock: false,
    image: "/images/AW-55-50.webp",
  },
  {
    id: 8,
    name: "0AW (Multitronic)",
    description: "Transmission à variation continue (Audi).",
    longDescription: "La 0AW Multitronic est une transmission à variation continue développée pour les véhicules Audi à traction avant. Elle offre une progressivité optimale et une large plage de rapports.",
    price: 3700,
    inStock: false,
    image: "/images/0AWMultitronic.webp",
  },
  {
    id: 9,
    name: "0B5 (DL501)",
    description: "Transmission à double embrayage (Audi).",
    longDescription: "La 0B5 (DL501) est une transmission à double embrayage développée pour les véhicules Audi à transmission intégrale Quattro. Elle combine l'agrément d'une boîte automatique avec les performances d'une boîte manuelle.",
    price: 3800,
    inStock: false,
    image: "/images/0B5DL501.webp",
  },
  {
    id: 10,
    name: "01J",
    description: "Transmission à variation continue (Audi).",
    longDescription: "La 01J est une transmission à variation continue Multitronic montée sur les véhicules Audi. Elle assure une conduite souple et des transitions fluides sans à-coups.",
    price: 3200,
    inStock: false,
    image: "/images/01j.webp",
  },
  {
    id: 11,
    name: "JF010E",
    description: "Transmission à variation continue (Jatco).",
    longDescription: "La JF010E est une transmission à variation continue de marque Jatco. Elle équipe plusieurs véhicules Nissan, Renault et Infiniti de gamme supérieure.",
    price: 3200,
    inStock: false,
    image: "/images/JF010E.webp",
  },
  {
    id: 12,
    name: "RE5R05A",
    description: "Boîte de vitesses à convertisseur de couple (Jatco).",
    longDescription: "La RE5R05A est une boîte de vitesses automatique à convertisseur de couple de marque Jatco à 5 rapports. Elle équipe des véhicules Nissan et Infiniti à motorisation puissante.",
    price: 3200,
    inStock: false,
    image: "/images/RE5R05A.webp",
  },
  {
    id: 13,
    name: "TF80",
    description: "Boîte de vitesses à convertisseur de couple de marque Aisin.",
    longDescription: "La TF80 est une boîte de vitesses automatique à convertisseur de couple de marque Aisin à 6 rapports. Elle équipe des véhicules Volvo, Peugeot, Citroën et Opel.",
    price: 2500,
    inStock: true,
    image: "/images/TF80.webp",
  },
];

function StockBadge({ inStock }) {
  return inStock ? (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600">
      <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
      En stock
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-red-400">
      <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />
      Rupture de stock
    </span>
  );
}

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

        <h2 className="text-xl font-semibold text-gray-900 mb-1">{product.name}</h2>
        <div className="mb-4">
          <StockBadge inStock={product.inStock} />
        </div>

        <div className="bg-gray-50 rounded-xl flex items-center justify-center p-4 mb-5" style={{ minHeight: 200 }}>
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

        <p className="text-sm text-gray-500 leading-relaxed text-center mb-4">
          {product.longDescription}
        </p>

        <p className="text-center text-lg font-semibold text-gray-900 mb-6">
          {product.price.toLocaleString("fr-FR")} €
        </p>
        
        <div className="flex justify-center">
          <a
            href="/contact"
            className="px-8 py-2.5 rounded-xl border border-gray-300 text-blue-500 text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Nous contacter
          </a>
        </div>
      </div>
    </div>
  );
}

function TransmissionCard({ product, onOpen }) {
  return (
    <div
      className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col transition-shadow duration-200 hover:shadow-md cursor-pointer"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      onClick={onOpen}
    >
      <div className="bg-gray-50 flex items-center justify-center p-4" style={{ minHeight: "180px" }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-contain"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        <div className="hidden w-full h-40 items-center justify-center rounded-lg border-2 border-dashed border-gray-200">
          <span className="text-xs text-gray-400 text-center px-4">{product.image}</span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-gray-900 text-base">{product.name}</h3>
          <StockBadge inStock={product.inStock} />
        </div>
        <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-3">{product.description}</p>
        <p className="text-base font-semibold text-gray-900 mb-4">
          {product.price.toLocaleString("fr-FR")} €
        </p>
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

export default function TransmissionsAutomatiques() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <nav className="flex items-center gap-2 text-sm mb-8">
          <a href="/" className="text-gray-500 hover:text-gray-700 transition-colors">Accueil</a>
          <span className="text-gray-400">›</span>
          <a href="/pieces" className="text-gray-500 hover:text-gray-700 transition-colors">PIÈCES</a>
          <span className="text-gray-400">›</span>
          <span className="text-blue-600 font-semibold tracking-wide uppercase text-xs">Transmissions Automatiques</span>
        </nav>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {transmissions.map((product) => (
            <TransmissionCard
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