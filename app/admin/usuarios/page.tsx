import { legacyParityCounts, permissions } from "@/lib/ui-data";
import { AdminNotice, AdminPageShell, MetricTile, Panel, StatusBadge } from "@/components/ui";

const roles = ["Responsable", "Sala", "Cocina/barra", "Admin POS", "Auditor"];

export default function UsuariosPage() {
  return (
    <AdminPageShell
      title="Usuarios y permisos"
      description="Capacidades POS propuestas para una futura capa de auth y permisos."
    >
      <AdminNotice>
        No hay autenticacion real ni enforcement de permisos en esta fase. La matriz es conceptual.
      </AdminNotice>

      <div className="grid gap-2 md:grid-cols-4 xl:grid-cols-7">
        <MetricTile tone="light" label="Roles" value={`${roles.length}`} />
        <MetricTile tone="light" label="Permisos" value={`${legacyParityCounts.permissionCells}`} />
        <MetricTile tone="light" label="Auth" value="Pendiente" />
        <MetricTile tone="light" label="POS access" value="mock" />
        <MetricTile tone="light" label="Kitchen" value="mock" />
        <MetricTile tone="light" label="Cashier" value="mock" />
        <MetricTile tone="light" label="Admin" value="mock" />
      </div>

      <div className="grid gap-3 xl:grid-cols-[1fr_360px]">
        <Panel tone="light">
          <p className="admin-section-label">Capacitats</p>
          <h2 className="text-xl font-black leading-tight">Matriu de permisos</h2>
          <div className="admin-table-wrap mt-2 max-h-[520px]">
            <table className="min-w-[980px]">
              <thead>
                <tr>
                  <th>Permis</th>
                  {roles.map((role) => (
                    <th key={role}>{role}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {permissions.map((permission, rowIndex) => (
                  <tr key={permission}>
                    <td className="font-black">{permission}</td>
                    {roles.map((role, colIndex) => (
                      <td key={`${permission}-${role}`}>
                        <StatusBadge value={rowIndex + colIndex < 6 ? "Enabled" : "Plan"} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel tone="light">
          <p className="admin-section-label">Roles previstos</p>
          <h2 className="text-xl font-black leading-tight">Perfils operatius</h2>
          <div className="mt-3 grid gap-2">
            {roles.map((role) => (
              <article key={role} className="rounded-lg border border-[#d7dde3] bg-[#f9fafb] p-3">
                <div className="flex items-center justify-between gap-3">
                  <strong>{role}</strong>
                  <StatusBadge value="plan" />
                </div>
                <p className="mt-1 text-sm font-semibold leading-5 text-[#65717d]">
                  Perfil operativo previsto para definir permisos granulares en backend.
                </p>
              </article>
            ))}
          </div>
        </Panel>
      </div>
    </AdminPageShell>
  );
}
