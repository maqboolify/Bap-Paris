import { useState } from "react";

const mechatronics = [
  {
    id: 1,
    name: "DSG7 (DQ200)",
    description: "DSG7 mechatronics (DQ200) for Audi, Volkswagen, Skoda.",
    longDescription:
      "The DSG7 (DQ200) is a 7-speed dual-clutch mechatronics unit used in Audi, Volkswagen, and Skoda vehicles. It manages clutch actuation and gear selection electronically for smooth, rapid shifts.",
    
    inStock: true,
    image: "/images/dqg6Meca.webp",
  },
  {
    id: 2,
    name: "DSG7 (DQ381)",
    description: "Complete DSG 7 mechatronics (DQ381) recent vehicle.",
    longDescription:
      "The DSG7 (DQ381) is the latest-generation 7-speed dual-clutch mechatronics unit for recent VAG group vehicles. It offers improved thermal management and enhanced shift precision.",
    
    inStock: true,
    image: "/images/dq381.webp",
  },
  {
    id: 3,
    name: "6HP",
    description: "Complete mechatronics unit for ZF 8HP45 and 8HP70 gearboxes.",
    longDescription:
      "The 6HP mechatronics unit is compatible with ZF 8HP45 and 8HP70 automatic gearboxes. It controls hydraulic and electronic functions for precise gear management across a wide range of vehicles.",
    
    inStock: true,
    image: "/images/6hp.webp",
  },
  {
    id: 4,
    name: "8HP",
    description: "Complete mechatronics unit for ZF 8HP45/70 gearbox.",
    longDescription:
      "The 8HP mechatronics unit is designed for the ZF 8HP45/70 8-speed automatic gearbox platform, found in BMW, Audi, Chrysler, Jeep and more. Ensures reliable hydraulic and electronic control.",
    
    inStock: true,
    image: "/images/8hp.webp",
  },
];

function StockBadge({ inStock }) {
  return inStock ? (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
      In stock
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-red-400">
      <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />
      Out of stock
    </span>
  );
}

function Modal({ product, onClose }) {
  if (!product) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-lg mx-4 p-8 relative overflow-y-auto max-h-[90vh] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-gray-400 hover:text-gray-700 text-xl leading-none bg-transparent border-none cursor-pointer transition-colors"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-gray-900 mb-1">{product.name}</h2>
        <div className="mb-4">
          <StockBadge inStock={product.inStock} />
        </div>

        <div
          className="bg-gray-50 rounded-xl flex items-center justify-center p-6 mb-5 border border-gray-100"
          style={{ minHeight: 200 }}
        >
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
            <span className="text-xs text-gray-400 text-center px-4">
              {product.image}
            </span>
          </div>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed text-center mb-5">
          {product.longDescription}
        </p>

        <p className="text-center text-2xl font-bold text-blue-600 mb-6">
          {/* € {product.price.toLocaleString("fr-FR")} */}
        </p>

        <div className="flex justify-center">
          <a
            href="/contact"
            className="px-8 py-2.5 rounded-xl border border-gray-300 text-blue-500 text-sm font-medium hover:bg-blue-50 transition-colors cursor-pointer"
          >
            Contact us
          </a>
        </div>
      </div>
    </div>
  );
}

function MechatronicsCard({ product, onOpen }) {
  return (
    <div
      className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer group"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      onClick={onOpen}
    >
      <div
        className="bg-gray-50 flex items-center justify-center p-5 overflow-hidden"
        style={{ minHeight: "200px" }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-44 object-contain transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        <div className="hidden w-full h-44 items-center justify-center rounded-lg border-2 border-dashed border-gray-200">
          <span className="text-xs text-gray-400 text-center px-4">
            {product.image}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-gray-900 text-base leading-snug">
            {product.name}
          </h3>
          <StockBadge inStock={product.inStock} />
        </div>

        <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-3">
          {product.description}
        </p>

        <p className="text-base font-bold text-blue-600 mb-4">
          {/* Price: € {product.price.toLocaleString("fr-FR")} */}
        </p>

        <div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
            className="inline-flex items-center justify-center px-5 py-2 rounded-lg border border-blue-500 text-blue-500 text-sm font-medium hover:bg-blue-50 transition-colors duration-150 cursor-pointer"
          >
            Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MechatronicsPage() {
  const [selected, setSelected] = useState(null);

  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8">
          <a
            href="/"
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            Home
          </a>
          <span className="text-gray-400">›</span>
          <a
            href="/pieces"
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            PIECES
          </a>
          <span className="text-gray-400">›</span>
          <span className="text-blue-600 font-semibold tracking-wide uppercase text-xs">
            Mechatronics
          </span>
        </nav>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {mechatronics.map((product) => (
            <MechatronicsCard
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