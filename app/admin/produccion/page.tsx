import { productionTickets } from "@/lib/ui-data";
import { AdminPageShell, MetricTile, Panel, StatusBadge } from "@/components/ui";

const printers = [
  ["COCINA-CALIENTE-01", "cocina_caliente", "Cocina caliente Restaurante", "LAN", "Si", "Enabled", "Restricted"],
  ["COCINA-FRIO-01", "cocina_fria", "Cocina frio Restaurante", "LAN", "Si", "Enabled", "Restricted"],
  ["REST-BARRA-01", "barra_caja_restaurante", "Barra Restaurante", "LAN", "Si", "Enabled", "Restricted"],
  ["PUB-COCTEL-01", "cocteleria_pub", "Cocteleria PUB", "WiFi", "Si", "Enabled", "Restricted"],
  ["DISCO-01", "disco", "DISCO / SIKIM 2.0", "WiFi", "No", "Disabled", "Restricted"],
  ["PENDIENTE-01", "pending", "Pendiente zona delante", "unknown", "No", "Disabled", "Restricted"],
];

const areas = [
  ["Cocina fria", "cocina_fria", "kitchen", "COCINA-FRIO-01", "Si"],
  ["Cocina caliente", "cocina_caliente", "kitchen", "COCINA-CALIENTE-01", "Si"],
  ["Cocteleria", "cocteleria", "cocktail", "PUB-COCTEL-01", "Si"],
  ["Caja restaurante", "caja_restaurante", "cashier", "REST-BARRA-01", "Si"],
  ["Foodtruck route", "foodtruck", "foodtruck", "COCINA-CALIENTE-01", "Si"],
  ["DISCO / SIKIM 2.0", "disco_sikim_20", "disabled", "DISCO-01", "No"],
  ["Pendiente / sin definir", "pendiente", "pending", "PENDIENTE-01", "No"],
];

const routes = [
  ["cocina_fria_to_frio", "-", "Cocina fria", "COCINA-FRIO-01", "1", "production", "Si", "Required"],
  ["cocina_caliente_to_caliente", "-", "Cocina caliente", "COCINA-CALIENTE-01", "1", "production", "Si", "Required"],
  ["cocteleria_to_pub", "-", "Cocteleria", "PUB-COCTEL-01", "1", "production", "Si", "Required"],
  ["ticket_cliente_to_barra", "-", "Caja restaurante", "REST-BARRA-01", "1", "customer_ticket", "Si", "Required"],
  ["foodtruck_to_cocina_caliente", "food_truck", "Foodtruck route", "COCINA-CALIENTE-01", "1", "production", "Si", "Required"],
  ["foodtruck_to_caja_restaurante", "food_truck", "Foodtruck route", "REST-BARRA-01", "1", "control", "Si", "Required"],
  ["disco_disabled", "disco", "DISCO / SIKIM 2.0", "DISCO-01", "0", "disabled", "No", "No"],
];

export default function ProduccionPage() {
  return (
    <AdminPageShell
      title="Produccion e impresion"
      description="Configuracion inicial de estaciones, rutas logicas y trabajos de impresion pendientes de implementar."
    >
      <div className="grid gap-2 md:grid-cols-4 xl:grid-cols-7">
        <MetricTile tone="light" label="Impressores" value="6" />
        <MetricTile tone="light" label="Actives" value="4" />
        <MetricTile tone="light" label="Rutes enabled" value="4" />
        <MetricTile tone="light" label="Arees" value="7" />
        <MetricTile tone="light" label="Arees actives" value="5" />
        <MetricTile tone="light" label="Rutes actives" value="6" />
        <MetricTile tone="light" label="Foodtruck" value="2" />
        <MetricTile tone="light" label="Tickets mock" value={`${productionTickets.length}`} />
        <MetricTile tone="light" label="Linies mock" value="2" />
      </div>

      <Panel tone="light">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="admin-section-label">Monitor mock</p>
            <h2 className="text-xl font-black leading-tight">Tickets i linies de produccio</h2>
          </div>
          <StatusBadge value="Comandas OK" />
        </div>
        <div className="mt-3 grid gap-2 xl:grid-cols-5">
          {["Area", "Impressora", "Estat", "Taula", "Reimpressions"].map((label) => (
            <label key={label} className="grid gap-1 text-xs font-black text-[#65717d]">
              {label}
              <input placeholder={label === "Taula" ? "Restaurant · Taula 1" : "Totes"} />
            </label>
          ))}
        </div>
        <div className="admin-table-wrap mt-3 max-h-[270px]">
          <table className="min-w-[1120px]">
            <thead>
              <tr>
                <th>Hora</th>
                <th>Taula</th>
                <th>Zona taula</th>
                <th>Area</th>
                <th>Impressora</th>
                <th>Estat</th>
                <th>Reimpressio</th>
                <th># linies</th>
                <th>Notes</th>
                <th>Accions</th>
              </tr>
            </thead>
            <tbody>
              {productionTickets.slice(0, 4).map((ticket) => (
                <tr key={ticket.id}>
                  <td>12:38</td>
                  <td className="font-black">{ticket.table}</td>
                  <td>restaurant</td>
                  <td>{ticket.station}</td>
                  <td>{ticket.station === "barra" ? "REST-BARRA-01" : "COCINA-CALIENTE-01"}</td>
                  <td>
                    <StatusBadge value={ticket.status} />
                  </td>
                  <td>No</td>
                  <td>{ticket.lines.length}</td>
                  <td>{ticket.notes}</td>
                  <td>
                    <button type="button">Preparat</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      {[
        { label: "Destins logics", title: "Impressores", rows: printers, headers: ["Alias", "Role", "Location", "Connection", "Active", "Routes", "Restricted"] },
        { label: "Produccio", title: "Arees", rows: areas, headers: ["Name", "Code", "Type", "Default printer", "Active"] },
        { label: "Routing", title: "Rutes", rows: routes, headers: ["Code", "Source zone", "Production area", "Printer", "Copies", "Kind", "Active", "Required"] },
      ].map((section) => (
        <Panel key={section.label} tone="light">
          <p className="admin-section-label">{section.label}</p>
          <h2 className="text-xl font-black leading-tight">{section.title}</h2>
          <div className="admin-table-wrap mt-2 max-h-[360px]">
            <table className="min-w-[1120px]">
              <thead>
                <tr>
                  {section.headers.map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.rows.map((row) => (
                  <tr key={row.join("-")}>
                    {row.map((cell, index) => (
                      <td key={`${row[0]}-${index}`}>
                        {["Si", "No", "Enabled", "Disabled", "Required", "Restricted"].includes(cell) ? (
                          <StatusBadge value={cell} />
                        ) : (
                          cell
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      ))}
    </AdminPageShell>
  );
}
