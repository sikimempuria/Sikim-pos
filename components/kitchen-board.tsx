"use client";

import { useMemo, useState } from "react";
import { productionTickets } from "@/lib/ui-data";
import { Panel, StatusBadge } from "@/components/ui";

const stations = ["cocina", "barra", "postres"] as const;

export function KitchenBoard() {
  const [station, setStation] = useState<(typeof stations)[number]>("cocina");
  const visibleTickets = useMemo(
    () => productionTickets.filter((ticket) => ticket.station === station),
    [station],
  );

  return (
    <div className="grid gap-4">
      <Panel>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-emerald-300">
              Pantalla de produccion
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Estados previstos: enviada, preparando, lista, servida.
            </p>
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {stations.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setStation(item)}
                className={`min-h-12 rounded-md px-5 py-3 text-sm font-black ${
                  station === item
                    ? "bg-emerald-300 text-slate-950"
                    : "border border-slate-800 bg-slate-950 text-slate-200"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </Panel>

      <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
        {visibleTickets.map((ticket) => (
          <Panel key={ticket.id} className="min-h-80">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-slate-500">{ticket.id}</p>
                <h2 className="mt-1 text-3xl font-black text-white">
                  {ticket.table}
                </h2>
              </div>
              <StatusBadge value={ticket.status} />
            </div>
            <div className="mt-5 rounded-md bg-slate-950 p-3">
              <p className="text-sm text-slate-500">Tiempo abierto</p>
              <p className="text-2xl font-black text-amber-300">
                {ticket.elapsed}
              </p>
            </div>
            <div className="mt-5 grid gap-2">
              {ticket.lines.map((line) => (
                <div
                  key={line}
                  className="rounded-md border border-slate-800 bg-slate-950 px-3 py-3 text-lg font-black text-slate-100"
                >
                  {line}
                </div>
              ))}
            </div>
            <div className="mt-5 grid gap-3 text-sm">
              <p className="rounded-md border border-amber-300/30 bg-amber-300/10 p-3 text-amber-100">
                Notas/alergenos: {ticket.notes}
              </p>
              <p className="rounded-md border border-slate-800 bg-slate-950 p-3 text-slate-400">
                Print job: {ticket.printStatus}
              </p>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {["Preparar", "Lista", "Servida"].map((action) => (
                <button
                  key={action}
                  className="min-h-12 rounded-md border border-slate-700 px-2 py-2 text-sm font-bold text-slate-200"
                >
                  {action}
                </button>
              ))}
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}
