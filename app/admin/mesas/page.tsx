import { tables, tableZones } from "@/lib/ui-data";
import { AdminNotice, AdminPageShell, MetricTile, Panel, StatusBadge } from "@/components/ui";

export default function MesasPage() {
  const selectedTable = tables[0];

  return (
    <AdminPageShell
      title="Mesas y zonas"
      description="Shell para configurar zonas, mesas fisicas, capacidad y agrupaciones futuras."
    >
      <div className="grid gap-2 md:grid-cols-4 xl:grid-cols-7">
        <MetricTile tone="light" label="Zones" value={`${tableZones.length}`} />
        <MetricTile tone="light" label="Taules" value={`${tables.length}`} />
        <MetricTile tone="light" label="Restaurant" value={`${tables.filter((table) => table.zoneId === "restaurant").length}`} />
        <MetricTile tone="light" label="Terrassa" value={`${tables.filter((table) => table.zoneId === "terraza").length}`} />
        <MetricTile tone="light" label="Foodtruck" value={`${tables.filter((table) => table.zoneId === "food-truck").length}`} />
        <MetricTile tone="light" label="Agrupacions" value="mock" />
        <MetricTile tone="light" label="Layout" value="v0.4" />
      </div>

      <AdminNotice>
        Layout visual mock/local: no persisteix coordenades, agrupacions ni capacitat real.
      </AdminNotice>

      <div className="grid gap-3 xl:grid-cols-[230px_minmax(0,1fr)_320px]">
        <Panel tone="light">
          <p className="admin-section-label">Zones</p>
          <h2 className="text-xl font-black leading-tight">6 zones operatives</h2>
          <div className="mt-3 grid gap-2">
            {tableZones.map((zone, index) => (
              <button
                key={zone.id}
                type="button"
                className={index === 0 ? "admin-button-primary text-left" : "text-left"}
              >
                <span className="block font-black">{zone.name}</span>
                <span className="block text-xs text-[#65717d]">
                  {tables.filter((table) => table.zoneId === zone.id).length} taules
                </span>
              </button>
            ))}
          </div>
        </Panel>

        <Panel tone="light">
          <div className="mb-2">
            <p className="admin-section-label">Taules fisiques</p>
            <h2 className="text-xl font-black leading-tight">
              {tables.length} taules exportades
            </h2>
          </div>
          <div className="admin-table-wrap">
            <table className="min-w-[920px]">
              <thead>
                <tr>
                  <th>Taula</th>
                  <th>Zona</th>
                  <th>Coberts</th>
                  <th>Estat</th>
                  <th>Reserva</th>
                  <th>Total</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {tables.map((table) => (
                  <tr key={table.id}>
                    <td className="font-black">{table.name}</td>
                    <td>{table.zone}</td>
                    <td>{table.seats}</td>
                    <td>
                      <StatusBadge value={table.status} />
                    </td>
                    <td>{table.reservation ?? "-"}</td>
                    <td>{table.total ? `${table.total.toFixed(2)} €` : "-"}</td>
                    <td>{table.note ?? "mock/local"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel tone="light">
          <p className="admin-section-label">Detall taula</p>
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-xl font-black leading-tight">{selectedTable.name}</h2>
            <StatusBadge value={selectedTable.status} />
          </div>
          <div className="mt-3 grid gap-2 rounded-lg border border-[#d7dde3] bg-[#f9fafb] p-3">
            {[
              ["zone_id", selectedTable.zoneId],
              ["zone_name", selectedTable.zone],
              ["seats", `${selectedTable.seats}`],
              ["status", selectedTable.status],
              ["reservation", selectedTable.reservation ?? "-"],
              ["elapsed", selectedTable.elapsed],
            ].map(([label, value]) => (
              <div key={label} className="admin-detail-row">
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <div className="mt-3 grid gap-2">
            {["Guardar layout", "Unir mesas", "Separar grupo", "Restaurar layout"].map((action) => (
              <button key={action} type="button">
                {action} <span className="text-blue-700">mock</span>
              </button>
            ))}
          </div>
        </Panel>
      </div>
    </AdminPageShell>
  );
}
