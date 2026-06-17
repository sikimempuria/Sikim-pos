import { AdminPageShell, Panel, StatusBadge } from "@/components/ui";

const reportCards = [
  "Ventas por producto",
  "Ventas por categoria",
  "Ventas por metodo de pago",
  "Top productos",
];

export default function InformesPage() {
  return (
    <AdminPageShell
      title="Informes"
      description="Shell para futuros informes comerciales y operativos cuando existan datos reales."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {reportCards.map((report) => (
          <Panel key={report} tone="light" title={report}>
            <div className="flex min-h-44 flex-col justify-between">
              <p className="text-sm leading-6 text-slate-600">
                Estado vacio preparado para graficas y tablas futuras.
              </p>
              <StatusBadge value="plan" />
            </div>
          </Panel>
        ))}
      </div>

      <Panel tone="light" title="Estado">
        <p className="text-sm leading-6 text-slate-600">
          No hay BI, consultas, agregaciones ni exportaciones reales en esta
          fase. Los informes dependen de definir primero el modelo de datos POS.
        </p>
      </Panel>
    </AdminPageShell>
  );
}
