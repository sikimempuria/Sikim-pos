"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  formatCurrency,
  staffContext,
  tables,
  zones,
  type Table,
  type TableStatus,
} from "@/lib/ui-data";
import { Panel, StatusBadge } from "@/components/ui";

const tableTone: Record<TableStatus, string> = {
  libre: "border-emerald-400/50 bg-emerald-400/10",
  reservada: "border-sky-400/50 bg-sky-400/10",
  ocupada: "border-amber-400/50 bg-amber-400/10",
  enviada: "border-violet-400/50 bg-violet-400/10",
  cobro: "border-cyan-400/50 bg-cyan-400/10",
  incidencia: "border-rose-400/50 bg-rose-400/10",
};

function TableTile({
  table,
  selected,
  onSelect,
}: {
  table: Table;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`min-h-36 rounded-md border p-4 text-left transition hover:-translate-y-0.5 hover:border-white/40 ${
        selected ? "ring-2 ring-emerald-300" : ""
      } ${tableTone[table.status]}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xl font-black text-white">{table.name}</p>
          <p className="mt-1 text-sm text-slate-400">{table.seats} pax</p>
        </div>
        <StatusBadge value={table.status} />
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-slate-500">Tiempo</p>
          <p className="font-bold text-slate-100">{table.elapsed}</p>
        </div>
        <div>
          <p className="text-slate-500">Total</p>
          <p className="font-bold text-slate-100">
            {table.total ? formatCurrency(table.total) : "Sin cuenta"}
          </p>
        </div>
      </div>
      {table.reservation ? (
        <p className="mt-4 rounded-md bg-slate-950/60 px-3 py-2 text-xs font-semibold text-sky-100">
          {table.reservation}
        </p>
      ) : null}
    </button>
  );
}

export function PosFloorShell() {
  const [selectedZone, setSelectedZone] = useState(zones[0]);
  const [selectedTableId, setSelectedTableId] = useState(tables[0].id);

  const visibleTables = useMemo(
    () => tables.filter((table) => table.zone === selectedZone),
    [selectedZone],
  );
  const selectedTable =
    tables.find((table) => table.id === selectedTableId) ?? visibleTables[0];

  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
      <section className="grid gap-4">
        <Panel>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-emerald-300">
                {staffContext.service} - {staffContext.turn}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Usuario: {staffContext.user}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {["10 mesas", "5 ocupadas", "1 incidencia"].map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-slate-700 px-3 py-2 text-xs font-bold text-slate-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Panel>

        <Panel title="Zonas" description="Mapa operativo por zona de sala.">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {zones.map((zone) => (
              <button
                key={zone}
                type="button"
                onClick={() => {
                  setSelectedZone(zone);
                  setSelectedTableId(
                    tables.find((table) => table.zone === zone)?.id ??
                      selectedTableId,
                  );
                }}
                className={`min-h-12 shrink-0 rounded-md px-5 py-3 text-sm font-black transition ${
                  selectedZone === zone
                    ? "bg-emerald-300 text-slate-950"
                    : "bg-slate-950 text-slate-300 hover:bg-slate-800"
                }`}
              >
                {zone}
              </button>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {visibleTables.map((table) => (
              <TableTile
                key={table.id}
                table={table}
                selected={selectedTable.id === table.id}
                onSelect={() => setSelectedTableId(table.id)}
              />
            ))}
          </div>
        </Panel>

        <Panel title="Leyenda de estados">
          <div className="flex flex-wrap gap-2">
            {[
              "libre",
              "reservada",
              "ocupada",
              "enviada",
              "cobro",
              "incidencia",
            ].map((status) => (
              <StatusBadge key={status} value={status} />
            ))}
          </div>
        </Panel>
      </section>

      <aside className="grid gap-4">
        <Panel
          title="Sesion seleccionada"
          description="Resumen visual. No escribe en backend."
        >
          <div className="rounded-md border border-slate-800 bg-slate-950 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-3xl font-black text-white">
                  {selectedTable.name}
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  {selectedTable.zone} - {selectedTable.covers || 0} comensales
                </p>
              </div>
              <StatusBadge value={selectedTable.status} />
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-slate-500">Tiempo</dt>
                <dd className="font-bold text-slate-100">
                  {selectedTable.elapsed}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">Cuenta</dt>
                <dd className="font-bold text-slate-100">
                  {formatCurrency(selectedTable.total)}
                </dd>
              </div>
            </dl>
          </div>
          <div className="mt-4 grid gap-2">
            <Link
              href="/pos/comanda"
              className="min-h-12 rounded-md bg-emerald-300 px-4 py-3 text-center text-sm font-black text-slate-950"
            >
              Ver comanda
            </Link>
            <div className="grid grid-cols-2 gap-2">
              <button className="min-h-12 rounded-md border border-slate-700 px-3 py-3 text-sm font-bold text-slate-200">
                Abrir mesa
              </button>
              <button className="min-h-12 rounded-md border border-slate-700 px-3 py-3 text-sm font-bold text-slate-200">
                Enviar cocina
              </button>
            </div>
            <Link
              href="/pos/cobro"
              className="min-h-12 rounded-md border border-cyan-300 bg-cyan-300/10 px-4 py-3 text-center text-sm font-black text-cyan-100"
            >
              Cobrar
            </Link>
          </div>
        </Panel>

        <Panel title="Acciones rapidas">
          <div className="grid gap-2">
            {[
              "Buscar reserva",
              "Mover mesa",
              "Marcar incidencia",
              "Revisar ticket",
            ].map((action) => (
              <button
                key={action}
                className="min-h-11 rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-left text-sm font-bold text-slate-200"
              >
                {action}
              </button>
            ))}
          </div>
        </Panel>
      </aside>
    </div>
  );
}
