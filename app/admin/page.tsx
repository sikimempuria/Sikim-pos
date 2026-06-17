import { adminModules } from "@/lib/ui-data";
import { AdminPageShell, MetricTile, Panel, StatusBadge } from "@/components/ui";

export default function AdminPage() {
  return (
    <AdminPageShell
      title="Administracion POS"
      description="Centro inicial para revisar configuracion, estado operativo y modulos pendientes de conectar."
    >
      <div className="grid gap-4 lg:grid-cols-4">
        <MetricTile tone="light" label="Catalogo" value="Pendiente" detail="Fuente Cheffing futura" />
        <MetricTile tone="light" label="Mesas" value="8 visibles" detail="Datos de ejemplo" />
        <MetricTile tone="light" label="Produccion" value="3 areas" detail="Sin impresoras reales" />
        <MetricTile tone="light" label="Caja" value="Inicial" detail="Sin backend" />
      </div>

      <Panel tone="light" title="Modulos">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {adminModules.map((module) => (
            <a
              key={module.href}
              href={module.href}
              className="rounded-md border border-slate-200 bg-slate-50 p-4 transition hover:border-sky-400"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-black text-slate-950">{module.title}</h2>
                <StatusBadge value={module.status} />
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {module.description}
              </p>
            </a>
          ))}
        </div>
      </Panel>

      <Panel
        tone="light"
        title="Alcance de esta fase"
        description="La UI prepara la estructura de producto sin activar integraciones sensibles."
      >
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {["Sin Supabase", "Sin auth real", "Sin pagos reales", "Sin impresoras reales"].map((item) => (
            <div key={item} className="rounded-md border border-slate-200 bg-white p-4">
              <p className="font-black">{item}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Se conectara en una fase posterior con contratos revisados.
              </p>
            </div>
          ))}
        </div>
      </Panel>
    </AdminPageShell>
  );
}
