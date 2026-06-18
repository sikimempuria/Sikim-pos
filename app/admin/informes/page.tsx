import { formatCurrency } from "@/lib/ui-data";
import { AdminNotice, AdminPageShell, MetricTile, Panel, StatusBadge } from "@/components/ui";

const reportRows = [
  ["Ventas por producto", "pendent model dades", formatCurrency(0), "plan"],
  ["Ventas por categoria", "pendent model dades", formatCurrency(0), "plan"],
  ["Ventas por metodo de pago", "pendent caixa real", formatCurrency(0), "plan"],
  ["Top productos", "pendent POS real", formatCurrency(0), "plan"],
];

export default function InformesPage() {
  return (
    <AdminPageShell
      title="Informes"
      description="Shell para futuros informes comerciales y operativos cuando existan datos reales."
    >
      <AdminNotice>
        Reporting mock/local: no hi ha BI, consultes, agregacions ni exportacions reals en aquesta fase.
      </AdminNotice>

      <div className="grid gap-2 md:grid-cols-4 xl:grid-cols-7">
        <MetricTile tone="light" label="Gross sales" value={formatCurrency(0)} />
        <MetricTile tone="light" label="Net sales" value={formatCurrency(0)} />
        <MetricTile tone="light" label="Orders" value="0" />
        <MetricTile tone="light" label="Average ticket" value={formatCurrency(0)} />
        <MetricTile tone="light" label="Cash" value={formatCurrency(0)} />
        <MetricTile tone="light" label="Card" value={formatCurrency(0)} />
        <MetricTile tone="light" label="Exports" value="Mock" />
      </div>

      <div className="grid gap-3 xl:grid-cols-[1fr_360px]">
        <Panel tone="light">
          <p className="admin-section-label">Informes</p>
          <h2 className="text-xl font-black leading-tight">Vendes i Cheffing</h2>
          <div className="admin-table-wrap mt-2 max-h-[360px]">
            <table className="min-w-[820px]">
              <thead>
                <tr>
                  <th>Informe</th>
                  <th>Font</th>
                  <th>Total</th>
                  <th>Estat</th>
                  <th>Accio</th>
                </tr>
              </thead>
              <tbody>
                {reportRows.map(([report, source, total, status]) => (
                  <tr key={report}>
                    <td className="font-black">{report}</td>
                    <td>{source}</td>
                    <td>{total}</td>
                    <td>
                      <StatusBadge value={status} />
                    </td>
                    <td>
                      <button type="button">Preparar mock</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel tone="light">
          <p className="admin-section-label">Estat</p>
          <h2 className="text-xl font-black leading-tight">Dependencia dades POS</h2>
          <div className="mt-3 grid gap-2 rounded-lg border border-[#d7dde3] bg-[#f9fafb] p-3">
            {[
              ["orders_source", "pendent schema POS"],
              ["payments_source", "pendent caixa real"],
              ["cheffing_source", "mock/local"],
              ["export_csv", "no real"],
              ["dashboard", "placeholder"],
            ].map(([label, value]) => (
              <div key={label} className="admin-detail-row">
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </AdminPageShell>
  );
}
