import { tables, zones } from "@/lib/ui-data";
import { AdminPageShell, Panel, StatusBadge } from "@/components/ui";

export default function MesasPage() {
  return (
    <AdminPageShell
      title="Mesas y zonas"
      description="Shell para configurar zonas, mesas fisicas, capacidad y agrupaciones futuras."
    >
      <div className="grid gap-4 xl:grid-cols-[320px_1fr]">
        <Panel tone="light" title="Zonas">
          <div className="grid gap-3">
            {zones.map((zone) => (
              <div
                key={zone}
                className="rounded-md border border-slate-200 bg-white p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-black">{zone}</p>
                  <StatusBadge value="activa" />
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  {tables.filter((table) => table.zone === zone).length} mesas
                </p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          tone="light"
          title="Mesas fisicas"
          description="Capacidad, estado operativo y vista de mapa inicial."
        >
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {tables.map((table) => (
              <div
                key={table.id}
                className="min-h-36 rounded-md border border-slate-200 bg-white p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-black">{table.name}</p>
                    <p className="mt-1 text-sm text-slate-500">{table.zone}</p>
                  </div>
                  <StatusBadge value={table.status} />
                </div>
                <p className="mt-6 text-sm font-bold text-slate-700">
                  Capacidad: {table.seats} pax
                </p>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel tone="light" title="Agrupacion de mesas">
        <div className="grid gap-4 lg:grid-cols-3">
          {["Unir mesas", "Separar grupo", "Conflictos con reserva"].map((item) => (
            <div key={item} className="rounded-md border border-slate-200 bg-slate-50 p-4">
              <h2 className="font-black">{item}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Placeholder para reglas operativas futuras sin persistencia ni
                cambios de base de datos en esta fase.
              </p>
            </div>
          ))}
        </div>
      </Panel>
    </AdminPageShell>
  );
}
