import React, { useState } from "react";

const colors = [
  { name: "Fundo principal", className: "bg-zinc-950" },
  { name: "Surface/Cards", className: "bg-zinc-900" },
  { name: "Destaque/Primária", className: "bg-green-600" },
  { name: "Destaque/Primária (claro)", className: "bg-green-500" },
  { name: "Alerta de Peso", className: "bg-red-500" },
  { name: "Texto principal", className: "text-zinc-100 bg-zinc-950" },
  { name: "Texto secundário", className: "text-zinc-400 bg-zinc-950" },
  { name: "Texto alerta", className: "text-red-500 bg-zinc-950" },
];

export const DesignSystemDemo: React.FC = () => {
  const [peso, setPeso] = useState(70);
  const [modo, setModo] = useState<"Gi" | "No-Gi">("Gi");

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 flex flex-col gap-8 max-w-xl mx-auto">
      {/* Paleta de Cores */}
      <section>
        <h2 className="text-xl font-bold mb-4">Paleta de Cores</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {colors.map((color) => (
            <div key={color.name} className="flex flex-col items-center gap-2">
              <div
                className={`w-14 h-14 rounded-lg border border-zinc-800 ${color.className} flex items-center justify-center`}
              ></div>
              <span className="text-xs text-zinc-400 text-center">
                {color.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Tipografia */}
      <section className="bg-zinc-900 rounded-xl p-4">
        <h2 className="text-xl font-bold mb-4">Tipografia</h2>
        <h1 className="text-2xl font-bold mb-2">
          Título H1 - text-2xl font-bold
        </h1>
        <h2 className="text-xl font-bold mb-2">
          Título H2 - text-xl font-bold
        </h2>
        <h3 className="text-lg font-medium mb-2">
          Título H3 - text-lg font-medium
        </h3>
        <p className="text-base mb-1">Parágrafo padrão - text-base</p>
        <p className="text-sm text-zinc-400">
          Texto secundário - text-sm text-zinc-400
        </p>
      </section>

      {/* Botões */}
      <section>
        <h2 className="text-xl font-bold mb-4">Botões</h2>
        <div className="flex flex-col gap-4">
          <button className="bg-green-600 text-white rounded-lg p-4 w-full font-bold active:scale-95 transition">
            Primário
          </button>
          <button className="border border-green-600 text-green-600 rounded-lg p-4 w-full font-bold bg-transparent active:scale-95 transition">
            Secundário
          </button>
          <div className="flex gap-4 justify-center mt-2">
            <button className="w-16 h-16 bg-green-600 text-white text-3xl rounded-full flex items-center justify-center active:scale-95 transition">
              +
            </button>
            <button className="w-16 h-16 bg-zinc-900 text-green-600 text-3xl rounded-full border border-green-600 flex items-center justify-center active:scale-95 transition">
              -
            </button>
          </div>
        </div>
      </section>

      {/* Inputs e Controles */}
      <section>
        <h2 className="text-xl font-bold mb-4">Inputs e Controles</h2>
        <div className="flex flex-col gap-4">
          <input
            type="number"
            value={peso}
            onChange={(e) => setPeso(Number(e.target.value))}
            className="bg-zinc-800 text-white rounded-lg p-4 w-full outline-none focus:ring-2 focus:ring-green-600 transition"
            placeholder="Peso (kg)"
          />
          <div className="flex items-center gap-4">
            <span className="text-zinc-400">Modo:</span>
            <button
              className={`px-4 py-2 rounded-full font-bold transition ${modo === "Gi" ? "bg-green-600 text-white" : "bg-zinc-800 text-zinc-400 border border-zinc-700"}`}
              onClick={() => setModo("Gi")}
            >
              Gi
            </button>
            <button
              className={`px-4 py-2 rounded-full font-bold transition ${modo === "No-Gi" ? "bg-green-600 text-white" : "bg-zinc-800 text-zinc-400 border border-zinc-700"}`}
              onClick={() => setModo("No-Gi")}
            >
              No-Gi
            </button>
          </div>
        </div>
      </section>

      {/* Card Exemplo */}
      <section>
        <h2 className="text-xl font-bold mb-4">Componente Card</h2>
        <div className="bg-zinc-900 rounded-2xl p-6 flex flex-col items-center gap-2 shadow-lg w-full max-w-xs mx-auto">
          <span className="text-zinc-400 text-sm">Resumo do Mês</span>
          <span className="text-5xl font-bold text-green-500">15</span>
          <span className="text-zinc-100 font-medium">Treinos</span>
        </div>
      </section>
    </div>
  );
};

export default DesignSystemDemo;
