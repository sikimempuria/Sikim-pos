import { AdminNotice, AdminPageShell, MetricTile, Panel, StatusBadge } from "@/components/ui";

const fiscalWarnings = [
  "El TPV no emet factura fiscal final.",
  "L'agent de factures es un pont futur/mock.",
  "Odoo / agent fiscal es el responsable futur de l'emissio.",
  "VERI*FACTU es nomes estat mock en aquesta fase.",
  "No hi ha emissio real ni connexio fiscal real en aquesta fase.",
  "No hi ha connexio AEAT ni Odoo real.",
];

const fiscalActions = [
  "Crear invoice request mock",
  "Marcar requested",
  "Marcar issued mock",
  "Marcar error",
  "Queue export Odoo mock",
  "Mark sent Odoo mock",
  "Mark error Odoo mock",
  "Queue fiscal_agent mock",
  "Queue Agent mock",
  "Mark Agent issued mock",
  "Mark Agent error mock",
];

const invoiceRows = [
  ["order", "order-demo-none", "simplified", "none", "-", "-", ""],
  ["order", "order-demo-1024", "full", "requested", "11/6/26 14:10", "-", ""],
  ["cash_session", "cash-session-previous", "full", "issued", "11/6/26 1:02", "11/6/26 1:06", ""],
  ["daily_report", "cash-session-error-demo", "unknown", "error", "11/6/26 2:15", "-", "Error mock connector extern."],
  ["order", "order-browser-mock", "full", "requested", "18/6/26 22:03", "-", ""],
  ["order", "order-issued-mock", "full", "issued", "18/6/26 22:03", "18/6/26 22:03", ""],
  ["order", "order-error-mock", "full", "error", "18/6/26 22:03", "-", "Error mock factura browser"],
];

const exportRows = [
  ["odoo", "invoice_request", "invoice-request-requested", "queued", "", ""],
  ["odoo", "invoice_request", "invoice-request-issued", "sent", "ODOO-MOCK-2026-0001", ""],
  ["fiscal_agent", "daily_summary", "cash-session-error-demo", "error", "", "Error mock del pont fiscal."],
  ["odoo", "invoice_request", "invoice-request-00001", "error", "ODOO-MOCK-BROWSER", "Error mock browser controlat"],
  ["fiscal_agent", "invoice_request", "invoice-request-00001", "queued", "", ""],
];

export default function FiscalPage() {
  return (
    <AdminPageShell
      title="Fiscal / Odoo"
      description="Puente fiscal mock/local para que la ruta legacy sea visible sin activar factura real, AEAT, VeriFactu, Odoo ni contabilidad."
    >
      <div className="grid gap-2">
        {fiscalWarnings.map((warning) => (
          <AdminNotice key={warning}>{warning}</AdminNotice>
        ))}
      </div>

      <div className="grid gap-2 md:grid-cols-4 xl:grid-cols-7">
        <MetricTile tone="light" label="Invoices none" value="1" />
        <MetricTile tone="light" label="Invoices requested" value="2" />
        <MetricTile tone="light" label="Invoices issued" value="2" />
        <MetricTile tone="light" label="Invoices error" value="2" />
        <MetricTile tone="light" label="Exports queued" value="2" />
        <MetricTile tone="light" label="Odoo sent" value="2" />
        <MetricTile tone="light" label="VERI*FACTU mock" value="3 pending" />
      </div>

      <Panel tone="light">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="admin-section-label">Mock/local</p>
            <h2 className="text-xl font-black leading-tight">Accions Fiscal / Odoo</h2>
          </div>
          <StatusBadge value="Preparat" />
        </div>
        <div className="mt-3 grid gap-2 xl:grid-cols-6">
          {[
            ["Usuari", "Admin SIKIM"],
            ["Source type", "order"],
            ["Source id", "order-demo-new"],
            ["Invoice type", "simplified"],
            ["Customer name", "Client mock"],
            ["External reference", "ODOO-MOCK-MANUAL-0001"],
          ].map(([label, value]) => (
            <label key={label} className="grid gap-1 text-xs font-black text-[#65717d]">
              {label}
              <input value={value} readOnly />
            </label>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2 text-xs font-black text-[#65717d]">
          {["Veure fiscal", "Sol.licitar factura", "Marcar issued", "Exportar"].map((permission) => (
            <span key={permission} className="inline-flex items-center gap-2">
              {permission}
              <StatusBadge value="permes" />
            </span>
          ))}
        </div>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {fiscalActions.map((action, index) => (
            <button
              key={action}
              type="button"
              className={index === 0 ? "admin-button-primary" : ""}
            >
              {action}
            </button>
          ))}
        </div>
      </Panel>

      <Panel tone="light">
        <p className="admin-section-label">Factura mock</p>
        <h2 className="text-xl font-black leading-tight">7 invoice requests</h2>
        <div className="admin-table-wrap mt-2 max-h-[340px]">
          <table className="min-w-[1120px]">
            <thead>
              <tr>
                <th>source_type</th>
                <th>source_id</th>
                <th>invoice_type</th>
                <th>status</th>
                <th>requested_at</th>
                <th>issued_at</th>
                <th>error_message</th>
              </tr>
            </thead>
            <tbody>
              {invoiceRows.map(([sourceType, sourceId, invoiceType, status, requestedAt, issuedAt, error]) => (
                <tr key={sourceId}>
                  <td>{sourceType}</td>
                  <td>{sourceId}</td>
                  <td>{invoiceType}</td>
                  <td>
                    <StatusBadge value={status} />
                  </td>
                  <td>{requestedAt}</td>
                  <td>{issuedAt}</td>
                  <td>{error || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <div className="grid gap-3 xl:grid-cols-2">
        <Panel tone="light">
          <p className="admin-section-label">Pont</p>
          <h2 className="text-xl font-black leading-tight">5 exports</h2>
          <div className="admin-table-wrap mt-2 max-h-[320px]">
            <table className="min-w-[940px]">
              <thead>
                <tr>
                  <th>target</th>
                  <th>payload_kind</th>
                  <th>source_id</th>
                  <th>status</th>
                  <th>external_reference</th>
                  <th>error_message</th>
                </tr>
              </thead>
              <tbody>
                {exportRows.map(([target, kind, source, status, external, error]) => (
                  <tr key={`${target}-${source}`}>
                    <td>{target}</td>
                    <td>{kind}</td>
                    <td>{source}</td>
                    <td>
                      <StatusBadge value={status} />
                    </td>
                    <td>{external || "-"}</td>
                    <td>{error || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel tone="light">
          <p className="admin-section-label">VERI*FACTU mock</p>
          <h2 className="text-xl font-black leading-tight">Estat informatiu</h2>
          <div className="admin-table-wrap mt-2 max-h-[220px]">
            <table className="min-w-[760px]">
              <thead>
                <tr>
                  <th>mode</th>
                  <th>status</th>
                  <th>external_reference</th>
                  <th>qr_expected</th>
                  <th>notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>not_applicable</td>
                  <td>
                    <StatusBadge value="none" />
                  </td>
                  <td>-</td>
                  <td>false</td>
                  <td>Ticket simplificat mock sense estat VERI*FACTU.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </AdminPageShell>
  );
}
