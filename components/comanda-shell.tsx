"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  formatCurrency,
  orderLines,
  orderTotal,
  products,
  type OrderLine,
  type Product,
} from "@/lib/ui-data";
import { Panel, StatusBadge } from "@/components/ui";

const categories = Array.from(new Set(products.map((product) => product.category)));

function lineFromProduct(product: Product): OrderLine {
  return {
    id: `draft-${product.id}`,
    name: product.name,
    qty: 1,
    price: product.price,
    station: product.station,
    status: "borrador",
  };
}

export function ComandaShell() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [lines, setLines] = useState<OrderLine[]>(orderLines);

  const visibleProducts = useMemo(
    () => products.filter((product) => product.category === selectedCategory),
    [selectedCategory],
  );

  function addProduct(product: Product) {
    setLines((currentLines) => {
      const existing = currentLines.find((line) => line.id === `draft-${product.id}`);

      if (!existing) {
        return [...currentLines, lineFromProduct(product)];
      }

      return currentLines.map((line) =>
        line.id === existing.id ? { ...line, qty: line.qty + 1 } : line,
      );
    });
  }

  function clearDraft() {
    setLines((currentLines) =>
      currentLines.filter((line) => line.status !== "borrador"),
    );
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[170px_1fr_380px]">
      <Panel title="Categorias">
        <div className="grid gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`min-h-14 rounded-md px-3 py-3 text-left text-sm font-black ${
                selectedCategory === category
                  ? "bg-emerald-300 text-slate-950"
                  : "bg-slate-950 text-slate-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </Panel>

      <Panel
        title="Productos visibles en TPV"
        description="Catalogo de ejemplo inspirado en Cheffing, sin conexion real todavia."
      >
        <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-3">
          {visibleProducts.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => addProduct(product)}
              className="min-h-36 rounded-md border border-slate-800 bg-slate-950 p-4 text-left transition hover:border-emerald-300/60"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-black text-white">{product.name}</h2>
                <span className="rounded-md bg-slate-800 px-2 py-1 text-xs font-bold text-slate-300">
                  {product.station}
                </span>
              </div>
              <p className="mt-5 text-2xl font-black text-emerald-300">
                {formatCurrency(product.price)}
              </p>
              <p className="mt-2 text-xs font-semibold text-slate-500">
                Fuente prevista {product.source}. Datos de ejemplo.
              </p>
            </button>
          ))}
        </div>
      </Panel>

      <aside className="grid gap-4">
        <Panel
          title="Comanda Mesa 3"
          description="Borrador operativo inicial. No genera produccion real todavia."
        >
          <div className="grid gap-3">
            {lines.map((line) => (
              <div
                key={line.id}
                className="rounded-md border border-slate-800 bg-slate-950 p-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-black text-white">
                      {line.qty} x {line.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">{line.station}</p>
                  </div>
                  <StatusBadge value={line.status} />
                </div>
                {line.note ? (
                  <p className="mt-2 rounded-md bg-amber-300/10 px-2 py-1 text-xs text-amber-100">
                    Nota: {line.note}
                  </p>
                ) : null}
                <p className="mt-3 text-right text-sm font-bold text-slate-200">
                  {formatCurrency(line.price * line.qty)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-md border border-slate-700 bg-slate-950 p-4">
            <p className="text-sm font-semibold text-slate-400">
              Notas y modificadores
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Placeholder para alergias, punto de carne, curso y comentarios de
              cocina.
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-4">
            <span className="text-sm font-semibold text-slate-400">Total</span>
            <span className="text-3xl font-black text-white">
              {formatCurrency(orderTotal(lines))}
            </span>
          </div>
          <div className="mt-4 grid gap-2">
            <button className="min-h-12 rounded-md bg-emerald-300 px-4 py-3 text-sm font-black text-slate-950">
              Enviar a cocina/barra
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={clearDraft}
                className="min-h-12 rounded-md border border-slate-700 px-3 py-3 text-sm font-bold text-slate-200"
              >
                Limpiar borrador
              </button>
              <Link
                href="/pos/cobro"
                className="min-h-12 rounded-md border border-cyan-300 bg-cyan-300/10 px-3 py-3 text-center text-sm font-black text-cyan-100"
              >
                Cobrar
              </Link>
            </div>
          </div>
        </Panel>
      </aside>
    </div>
  );
}
