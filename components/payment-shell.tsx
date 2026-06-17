"use client";

import { useState } from "react";
import { formatCurrency, orderLines, orderTotal } from "@/lib/ui-data";
import { Panel } from "@/components/ui";

const methods = ["efectivo", "tarjeta", "otro/manual"] as const;

export function PaymentShell() {
  const [method, setMethod] = useState<(typeof methods)[number]>("efectivo");
  const [received, setReceived] = useState("80");
  const total = orderTotal(orderLines);
  const receivedNumber = Number(received) || 0;
  const change = Math.max(receivedNumber - total, 0);

  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_420px]">
      <Panel
        title="Ticket a cobrar"
        description="Vista inicial de lineas y estado de pago. No procesa cobros reales todavia."
      >
        <div className="grid gap-3">
          {orderLines.map((line) => (
            <div
              key={line.id}
              className="grid grid-cols-[1fr_auto] gap-3 rounded-md border border-slate-800 bg-slate-950 p-4"
            >
              <div>
                <p className="font-black text-white">
                  {line.qty} x {line.name}
                </p>
                <p className="mt-1 text-sm text-slate-500">{line.station}</p>
              </div>
              <p className="text-lg font-black text-slate-100">
                {formatCurrency(line.price * line.qty)}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 grid gap-3 rounded-md border border-slate-800 bg-slate-950 p-4 sm:grid-cols-3">
          <div>
            <p className="text-sm text-slate-500">Subtotal</p>
            <p className="text-xl font-black">{formatCurrency(total / 1.1)}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">IVA visual</p>
            <p className="text-xl font-black">{formatCurrency(total - total / 1.1)}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Total</p>
            <p className="text-2xl font-black text-emerald-300">
              {formatCurrency(total)}
            </p>
          </div>
        </div>
      </Panel>

      <aside className="grid gap-4">
        <Panel title="Metodo de pago" description="Controles solo visuales.">
          <div className="grid grid-cols-3 gap-2">
            {methods.map((paymentMethod) => (
              <button
                key={paymentMethod}
                type="button"
                onClick={() => setMethod(paymentMethod)}
                className={`min-h-12 rounded-md px-3 py-2 text-sm font-black ${
                  method === paymentMethod
                    ? "bg-emerald-300 text-slate-950"
                    : "border border-slate-800 bg-slate-950 text-slate-200"
                }`}
              >
                {paymentMethod}
              </button>
            ))}
          </div>

          {method === "efectivo" ? (
            <div className="mt-5 grid gap-3">
              <label className="grid gap-2 text-sm font-bold text-slate-200">
                Entregado
                <input
                  value={received}
                  onChange={(event) => setReceived(event.target.value)}
                  inputMode="decimal"
                  className="min-h-12 rounded-md border border-slate-700 bg-slate-950 px-3 text-xl font-black text-white outline-none focus:border-emerald-300"
                />
              </label>
              <div className="rounded-md border border-emerald-300/30 bg-emerald-300/10 p-4">
                <p className="text-sm text-emerald-100">Cambio visual</p>
                <p className="mt-1 text-3xl font-black text-emerald-300">
                  {formatCurrency(change)}
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-5 rounded-md border border-slate-800 bg-slate-950 p-4">
              <p className="text-sm font-bold text-slate-200">
                {method === "tarjeta"
                  ? "Terminal no conectado"
                  : "Metodo manual pendiente de definir"}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Esta pantalla no integra pasarela, datafono ni confirmacion
                bancaria.
              </p>
            </div>
          )}
        </Panel>

        <Panel title="Pago dividido">
          <div className="grid gap-2">
            {["Por persona", "Por lineas", "Importe libre"].map((label) => (
              <button
                key={label}
                className="min-h-12 rounded-md border border-slate-800 bg-slate-950 px-3 py-3 text-left text-sm font-bold text-slate-200"
              >
                {label}
              </button>
            ))}
          </div>
        </Panel>

        <Panel title="Cierre de cobro">
          <button
            type="button"
            disabled
            className="min-h-14 w-full cursor-not-allowed rounded-md border border-slate-700 bg-slate-800 px-4 py-3 text-sm font-black text-slate-400"
          >
            Finalizar cobro pendiente de backend.
          </button>
          <p className="mt-3 text-sm leading-6 text-amber-100">
            No registra pagos, no imprime ticket y no genera factura fiscal.
          </p>
        </Panel>
      </aside>
    </div>
  );
}
