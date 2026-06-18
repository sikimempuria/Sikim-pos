import { cashSession, formatCurrency } from "@/lib/ui-data";
import { AdminNotice, AdminPageShell, MetricTile, Panel, StatusBadge } from "@/components/ui";

const actionLabels = [
  "Obrir caixa",
  "Tancar caixa",
  "Afegir deposit",
  "Retirar efectiu",
  "Afegir despesa",
  "Generar resum",
  "Marcar enviat SIKIM OS mock",
  "Marcar enviat Odoo mock",
];

const sessionRows = [
  ["business_date", cashSession.businessDate],
  ["status", "open"],
  ["opened_at", "18/6/26 12:37"],
  ["opened_by", cashSession.user],
  ["opening_cash_amount", formatCurrency(cashSession.openingCash)],
  ["expected_cash_amount", formatCurrency(cashSession.expectedCash)],
  ["counted_cash_amount", "-"],
  ["cash_difference", "-"],
  ["sikim_os_status", "not_sent"],
  ["odoo_status", "none"],
];

const salesRows = [
  ["gross_sales", formatCurrency(0)],
  ["net_sales", formatCurrency(0)],
  ["cash_sales", formatCurrency(0)],
  ["card_sales", formatCurrency(0)],
  ["external_card_sales", formatCurrency(0)],
  ["sumup_mock_sales", formatCurrency(0)],
  ["discounts_total", formatCurrency(0)],
  ["invitations_total", formatCurrency(0)],
  ["voids_total", formatCurrency(0)],
  ["refunds_total", formatCurrency(0)],
  ["order_count", "0"],
  ["average_ticket", formatCurrency(0)],
];

export default function CajaPage() {
  return (
    <AdminPageShell
      title="Caja y cobros"
      description="Vista administrativa inicial de pagos, movimientos y cierres de turno."
    >
      <div className="grid gap-2 md:grid-cols-4 xl:grid-cols-7">
        <MetricTile tone="light" label="Status" value="open" />
        <MetricTile tone="light" label="Business date" value={cashSession.businessDate} />
        <MetricTile tone="light" label="Expected cash" value={formatCurrency(300)} />
        <MetricTile tone="light" label="Counted cash" value="-" />
        <MetricTile tone="light" label="Difference" value="-" />
        <MetricTile tone="light" label="Net sales" value={formatCurrency(0)} />
        <MetricTile tone="light" label="Orders" value="0" />
      </div>

      <Panel tone="light">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="admin-section-label">Usuari mock</p>
            <h2 className="text-xl font-black leading-tight">Permisos i accions</h2>
          </div>
          <StatusBadge value="Preparat" />
        </div>
        <div className="mt-3 grid gap-2 xl:grid-cols-[210px_210px_1fr_1fr_1fr]">
          <label className="grid gap-1 text-xs font-black text-[#65717d]">
            Usuari
            <select defaultValue="Manager torn">
              <option>Manager torn</option>
            </select>
          </label>
          <label className="grid gap-1 text-xs font-black text-[#65717d]">
            Business date
            <input value="18/06/2026" readOnly />
          </label>
          <label className="grid gap-1 text-xs font-black text-[#65717d]">
            Fons inicial
            <input value="300" readOnly />
          </label>
          <label className="grid gap-1 text-xs font-black text-[#65717d]">
            Efectiu comptat
            <input placeholder="-" />
          </label>
          <label className="grid gap-1 text-xs font-black text-[#65717d]">
            Motiu
            <input value="Operativa mock" readOnly />
          </label>
        </div>
        <div className="mt-3 flex flex-wrap gap-2 text-xs font-black text-[#65717d]">
          {["Obrir caixa", "Tancar caixa", "Veure informe", "Ajustar caixa"].map((permission) => (
            <span key={permission} className="inline-flex items-center gap-2">
              {permission}
              <StatusBadge value="permes" />
            </span>
          ))}
        </div>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {actionLabels.map((action, index) => (
            <button
              key={action}
              type="button"
              className={index === 0 ? "admin-button-primary" : ""}
            >
              {action}
            </button>
          ))}
        </div>
        <div className="mt-3 grid gap-2">
          <AdminNotice>Caixa oberta.</AdminNotice>
          <AdminNotice>Informe no enviat a SIKIM OS mock.</AdminNotice>
        </div>
      </Panel>

      <Panel tone="light">
        <p className="admin-section-label">Estat</p>
        <h2 className="text-xl font-black leading-tight">Sessio de caixa</h2>
        <div className="mt-2 rounded-lg border border-[#d7dde3] bg-[#f9fafb] p-3">
          <div className="grid gap-2">
            {sessionRows.map(([label, value]) => (
              <div key={label} className="admin-detail-row">
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </Panel>

      <Panel tone="light">
        <p className="admin-section-label">Informe operatiu</p>
        <h2 className="text-xl font-black leading-tight">Resum vendes</h2>
        <div className="mt-2 rounded-lg border border-[#d7dde3] bg-[#f9fafb] p-3">
          <div className="grid gap-2">
            {salesRows.map(([label, value]) => (
              <div key={label} className="admin-detail-row">
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </Panel>

      <div className="grid gap-3 xl:grid-cols-3">
        {[
          {
            label: "Moviments",
            title: "1 movements",
            headers: ["Hora", "Tipus", "Metode", "Import", "Usuari", "Motiu"],
            row: ["12:37", "opening_float", "cash", formatCurrency(300), "Manager torn", "Fons inicial"],
          },
          {
            label: "Ajustos",
            title: "0 ajustos",
            headers: ["Hora", "Tipus", "Import", "Autoritzat per", "Motiu", "Notes"],
            row: ["Sense ajustos per aquesta sessio.", "-", "-", "-", "-", "-"],
          },
          {
            label: "Exports mock",
            title: "SIKIM OS / Odoo / PDF / CSV",
            headers: ["Target", "Status", "Generat", "Enviat", "Error", "Payload"],
            row: ["Genera un resum per crear exports mock.", "-", "-", "-", "-", "-"],
          },
        ].map((table) => (
          <Panel key={table.label} tone="light">
            <p className="admin-section-label">{table.label}</p>
            <h2 className="text-xl font-black leading-tight">{table.title}</h2>
            <div className="admin-table-wrap mt-2 max-h-[220px]">
              <table className="min-w-[680px]">
                <thead>
                  <tr>
                    {table.headers.map((header) => (
                      <th key={header}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {table.row.map((cell) => (
                      <td key={cell}>{cell}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </Panel>
        ))}
      </div>
    </AdminPageShell>
  );
}
