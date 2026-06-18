import { formatCurrency, orderLines, orderReview } from "@/lib/ui-data";
import { AdminNotice, AdminPageShell, MetricTile, Panel, StatusBadge } from "@/components/ui";

export default function AdminComandasPage() {
  const selected = orderReview[0];

  return (
    <AdminPageShell
      title="Revision de comandas"
      description="Vista administrativa inicial para consultar comandas activas y cerradas."
    >
      <AdminNotice>
        Shared state mock/local: les comandes pagades del frontoffice es guarden com a estructura visual, sense backend.
      </AdminNotice>
      <AdminNotice>
        No genera factura fiscal, no envia dades reals i no substitueix encara els informes finals.
      </AdminNotice>

      <div className="grid gap-2 md:grid-cols-4 xl:grid-cols-7">
        <MetricTile tone="light" label="Paid orders" value="0" />
        <MetricTile tone="light" label="Net total" value={formatCurrency(0)} />
        <MetricTile tone="light" label="Payment methods" value="-" />
        <MetricTile tone="light" label="Last paid order" value="-" />
      </div>

      <Panel tone="light">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="admin-section-label">Filtres</p>
            <h2 className="text-xl font-black leading-tight">Comandes compartides</h2>
          </div>
          <StatusBadge value="Preparat" />
        </div>
        <div className="mt-3 grid gap-2 md:grid-cols-[220px_220px_1fr]">
          <label className="grid gap-1 text-xs font-black text-[#65717d]">
            Business date
            <input value="18/06/2026" readOnly />
          </label>
          <label className="grid gap-1 text-xs font-black text-[#65717d]">
            Estat
            <select defaultValue="Tots">
              <option>Tots</option>
            </select>
          </label>
          <label className="grid gap-1 text-xs font-black text-[#65717d]">
            Taula o zona
            <input placeholder="Restaurant, Taula 12..." />
          </label>
        </div>
      </Panel>

      <Panel tone="light">
        <p className="admin-section-label">Orders</p>
        <h2 className="text-xl font-black leading-tight">{orderReview.length} comandes</h2>
        <div className="admin-table-wrap mt-2 max-h-[260px]">
          <table className="min-w-[960px]">
            <thead>
              <tr>
                <th>Hora</th>
                <th>Taula</th>
                <th>Origen</th>
                <th>Estat</th>
                <th>Pagament</th>
                <th>Net</th>
                <th>Cash session</th>
                <th>Fiscal</th>
              </tr>
            </thead>
            <tbody>
              {orderReview.map((order) => (
                <tr key={order.id}>
                  <td>12:36</td>
                  <td className="font-black">{order.table}</td>
                  <td>{order.id}</td>
                  <td>
                    <StatusBadge value={order.status} />
                  </td>
                  <td>{order.payment}</td>
                  <td className="font-black">{formatCurrency(order.total)}</td>
                  <td>mock/local</td>
                  <td>none</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <div className="grid gap-3 xl:grid-cols-[1fr_360px]">
        <div className="grid gap-3">
          <Panel tone="light">
            <p className="admin-section-label">Linies</p>
            <h2 className="text-xl font-black leading-tight">Selecciona una comanda</h2>
            <div className="admin-table-wrap mt-2 max-h-[260px]">
              <table className="min-w-[940px]">
                <thead>
                  <tr>
                    <th>Producte</th>
                    <th>Qty</th>
                    <th>Unitari</th>
                    <th>Net</th>
                    <th>Estat</th>
                    <th>Production area</th>
                    <th>Cheffing ids</th>
                  </tr>
                </thead>
                <tbody>
                  {orderLines.map((line) => (
                    <tr key={line.id}>
                      <td className="font-black">{line.name}</td>
                      <td>{line.qty}</td>
                      <td>{formatCurrency(line.price)}</td>
                      <td>{formatCurrency(line.price * line.qty)}</td>
                      <td>
                        <StatusBadge value={line.status} />
                      </td>
                      <td>{line.station}</td>
                      <td>{line.id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>

          <Panel tone="light">
            <p className="admin-section-label">Payments</p>
            <h2 className="text-xl font-black leading-tight">Pagaments</h2>
            <div className="admin-table-wrap mt-2 max-h-[220px]">
              <table className="min-w-[860px]">
                <thead>
                  <tr>
                    <th>Hora</th>
                    <th>Metode</th>
                    <th>Import</th>
                    <th>Movement</th>
                    <th>Cash session</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Sense pagaments.</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>mock/local</td>
                    <td>pendent backend</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Panel>
        </div>

        <Panel tone="light">
          <p className="admin-section-label">Detalle seleccionado</p>
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-xl font-black leading-tight">{selected.id}</h2>
            <StatusBadge value={selected.status} />
          </div>
          <div className="mt-3 grid gap-2 rounded-lg border border-[#d7dde3] bg-[#f9fafb] p-3">
            {[
              ["table", selected.table],
              ["payment", selected.payment],
              ["total", formatCurrency(selected.total)],
              ["business_date", "18/06/2026"],
              ["source", "frontoffice mock/local"],
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
