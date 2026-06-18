import { AdminNotice, AdminPageShell, MetricTile, Panel, StatusBadge } from "@/components/ui";

const connectorWarnings = [
  "SIKIM_POS no gestiona stock real.",
  "SIKIM APP sera la font de stock/inventari quan es dissenyi el contracte.",
  "Aquesta fase nomes mostra events mock/local.",
  "No hi ha connexio externa, credencials ni API real.",
];

const connectorActions = [
  "Queue event",
  "Mark event sent",
  "Mark event error",
  "Build batch",
  "Queue batch",
  "Mark batch sent",
  "Mark batch error",
];

const consumptionEvents = [
  ["production_line_created", "session", "pending", "Bravas Sikim", "1"],
  ["production_line_created", "session", "pending", "Menu mediodia", "1"],
  ["batch_created", "cash_session", "queued", "Cena 18/06", "1"],
];

export default function SikimAppPage() {
  return (
    <AdminPageShell
      title="SIKIM APP"
      description="Conector mock/local para visualizar futuros eventos POS -> SIKIM APP sin gestionar stock real ni llamar APIs externas."
    >
      <div className="grid gap-2">
        {connectorWarnings.map((warning) => (
          <AdminNotice key={warning}>{warning}</AdminNotice>
        ))}
      </div>

      <div className="grid gap-2 md:grid-cols-4 xl:grid-cols-7">
        <MetricTile tone="light" label="Events" value="2" detail="generated/session" />
        <MetricTile tone="light" label="Pending" value="2" detail="mock" />
        <MetricTile tone="light" label="Queued" value="0" detail="sin backend" />
        <MetricTile tone="light" label="Batches" value="1" detail="mock/local" />
        <MetricTile tone="light" label="Target" value="sikim_app" detail="futuro" />
      </div>

      <div className="grid gap-3 xl:grid-cols-[360px_1fr]">
        <Panel tone="light">
          <p className="admin-section-label">Accions connector</p>
          <h2 className="text-xl font-black leading-tight">Event queue mock</h2>
          <div className="mt-3 grid gap-2">
            {connectorActions.map((action, index) => (
              <button
                key={action}
                type="button"
                className={index === 0 ? "admin-button-primary" : ""}
              >
                {action} <span className="text-blue-700">mock</span>
              </button>
            ))}
          </div>
        </Panel>

        <Panel tone="light">
          <p className="admin-section-label">Events POS a SIKIM APP</p>
          <h2 className="text-xl font-black leading-tight">Consum de productes</h2>
          <div className="admin-table-wrap mt-2 max-h-[440px]">
            <table className="min-w-[920px]">
              <thead>
                <tr>
                  <th>event</th>
                  <th>source</th>
                  <th>status</th>
                  <th>producte</th>
                  <th>qty</th>
                  <th>payload summary</th>
                </tr>
              </thead>
              <tbody>
                {consumptionEvents.map(([event, source, status, product, qty]) => (
                  <tr key={`${event}-${product}`}>
                    <td className="font-black">{event}</td>
                    <td>{source}</td>
                    <td>
                      <StatusBadge value={status} />
                    </td>
                    <td>{product}</td>
                    <td>{qty}</td>
                    <td>mock/local · no API externa</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </AdminPageShell>
  );
}
