import { productionTickets } from "@/lib/ui-data";
import { AdminPageShell, Panel, StatusBadge } from "@/components/ui";

const stations = [
  { name: "Cocina caliente", route: "Ruta cocina", printer: "Impresora logica cocina" },
  { name: "Barra", route: "Ruta barra", printer: "Impresora logica barra" },
  { name: "Postres", route: "Ruta postres", printer: "Sin impresora real" },
];

export default function ProduccionPage() {
  return (
    <AdminPageShell
      title="Produccion e impresion"
      description="Configuracion inicial de estaciones, rutas logicas y trabajos de impresion pendientes de implementar."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {stations.map((station) => (
          <Panel key={station.name} tone="light" title={station.name}>
            <p className="text-sm font-bold text-slate-700">{station.route}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {station.printer}
            </p>
            <div className="mt-4">
              <StatusBadge value="inicial" />
            </div>
          </Panel>
        ))}
      </div>

      <Panel tone="light" title="Trabajos de produccion">
        <div className="grid gap-3">
          {productionTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="grid gap-3 rounded-md border border-slate-200 bg-white p-4 lg:grid-cols-[120px_1fr_120px_180px]"
            >
              <p className="font-black">{ticket.id}</p>
              <div>
                <p className="font-bold">{ticket.table}</p>
                <p className="mt-1 text-sm text-slate-500">{ticket.printStatus}</p>
              </div>
              <StatusBadge value={ticket.status} />
              <p className="font-bold text-slate-700">{ticket.elapsed}</p>
            </div>
          ))}
        </div>
      </Panel>

      <Panel tone="light" title="Nota de seguridad">
        <p className="text-sm leading-6 text-slate-600">
          Esta pantalla no contiene IPs, credenciales, drivers, colas reales ni
          rutas de impresoras productivas.
        </p>
      </Panel>
    </AdminPageShell>
  );
}
