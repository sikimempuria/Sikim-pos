import { adminModules, legacyParityCounts, tableCount, tableZones } from "@/lib/ui-data";
import { AdminPageShell, MetricTile, Panel, StatusBadge } from "@/components/ui";

export default function AdminPage() {
  return (
    <AdminPageShell
      title="Inici"
      description="Backoffice SIKIM_POS mock/local para revisar configuracion, estado operativo y modulos pendientes de conectar."
    >
      <div className="grid gap-2 md:grid-cols-4 xl:grid-cols-7">
        <MetricTile tone="light" label="Cataleg" value={`${legacyParityCounts.products}`} detail="Total TPV/Cheffing" />
        <MetricTile tone="light" label="Zones" value={`${tableZones.length}`} detail="operatives" />
        <MetricTile tone="light" label="Taules" value={`${tableCount}`} detail="mock/local" />
        <MetricTile tone="light" label="Impressores" value={`${legacyParityCounts.printerProfiles}`} detail="perfils logics" />
        <MetricTile tone="light" label="Rutes" value={`${legacyParityCounts.productionRoutes}`} detail="produccio mock" />
        <MetricTile tone="light" label="Rols" value="5" detail="conceptual" />
        <MetricTile tone="light" label="Permisos" value={`${legacyParityCounts.permissionCells}`} detail="matriu conceptual" />
        <MetricTile tone="light" label="Caixa" value="Mock" detail="cash/session local" />
        <MetricTile tone="light" label="Fiscal" value="Mock" detail="pont fiscal" />
        <MetricTile tone="light" label="Informes" value="Mock" detail="reporting" />
        <MetricTile tone="light" label="SIKIM APP" value="Mock" detail="connector" />
        <MetricTile tone="light" label="Ajuda" value="v0.3" detail="KB representativa" />
      </div>

      <Panel tone="light">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {adminModules.map((module) => (
            <a
              key={module.href}
              href={module.href}
              className="grid min-h-[150px] gap-2 rounded-lg border border-[#d7dde3] bg-white p-4 text-[#20262d] transition hover:border-[#0f766e] hover:bg-[#f7faf9]"
            >
              <span className="admin-section-label">{module.title}</span>
              <strong className="text-xl font-black leading-tight">
                {module.description.split(".")[0]}
              </strong>
              <p className="text-sm font-extrabold leading-5 text-[#65717d]">
                {module.description}
              </p>
              <div className="self-end">
                <StatusBadge value={module.status} />
              </div>
            </a>
          ))}
        </div>
      </Panel>

      <Panel
        tone="light"
        title="Alcance de esta fase"
        description="La UI prepara la estructura de producto sin activar integraciones sensibles."
      >
        <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Sin Supabase",
            "Sin auth real",
            "Sin pagos reales",
            "Sin impresoras reales",
            "Fiscal / Odoo solo mock",
            "SIKIM APP solo mock",
            `${legacyParityCounts.permissionCells} celdas de permisos como matriz conceptual`,
            "No persiste cambios ni usa datos reales",
          ].map((item) => (
            <div
              key={item}
              className="rounded-md border border-[#d7dde3] bg-[#f9fafb] p-3"
            >
              <p className="font-black">{item}</p>
              <p className="mt-1 text-sm font-semibold leading-5 text-[#65717d]">
                Se conectara en una fase posterior con contratos revisados.
              </p>
            </div>
          ))}
        </div>
      </Panel>
    </AdminPageShell>
  );
}
