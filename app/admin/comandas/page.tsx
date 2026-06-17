import { formatCurrency, orderReview } from "@/lib/ui-data";
import { AdminPageShell, Panel, StatusBadge } from "@/components/ui";

export default function AdminComandasPage() {
  return (
    <AdminPageShell
      title="Revision de comandas"
      description="Vista administrativa inicial para consultar comandas activas y cerradas."
    >
      <div className="grid gap-4 xl:grid-cols-[1fr_380px]">
        <Panel tone="light" title="Comandas">
          <div className="grid gap-3">
            {orderReview.map((order) => (
              <div
                key={order.id}
                className="grid gap-3 rounded-md border border-slate-200 bg-white p-4 md:grid-cols-[140px_1fr_120px_140px_140px]"
              >
                <p className="font-black">{order.id}</p>
                <p className="font-bold">{order.table}</p>
                <StatusBadge value={order.status} />
                <p className="font-black">{formatCurrency(order.total)}</p>
                <p className="text-sm font-bold text-slate-600">{order.payment}</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel tone="light" title="Detalle seleccionado">
          <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Comanda</p>
            <p className="mt-1 text-2xl font-black">CMD-1004</p>
          </div>
          <div className="mt-3 grid gap-2 text-sm text-slate-700">
            <p>Estado: en cocina</p>
            <p>Mesa: Mesa 3</p>
            <p>Pago: pendiente</p>
            <p>Detalle: placeholder para lineas, incidencias y auditoria.</p>
          </div>
        </Panel>
      </div>
    </AdminPageShell>
  );
}
