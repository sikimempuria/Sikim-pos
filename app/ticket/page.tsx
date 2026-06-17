import { formatCurrency, orderLines, orderTotal, staffContext } from "@/lib/ui-data";
import { DarkPageShell, Panel } from "@/components/ui";

export default function TicketPage() {
  const total = orderTotal(orderLines);
  const subtotal = total / 1.1;
  const tax = total - subtotal;

  return (
    <DarkPageShell
      eyebrow="Ticket cliente"
      title="Vista previa de ticket"
      description="Previsualizacion del ticket de cliente. Esta pantalla no emite factura fiscal."
    >
      <div className="mx-auto w-full max-w-xl">
        <Panel className="bg-white text-slate-950" tone="light">
          <div className="border-b border-slate-200 pb-5 text-center">
            <p className="text-3xl font-black">SIKIM</p>
            <p className="mt-2 text-sm text-slate-500">
              Restaurante. Datos fiscales pendientes de integrar.
            </p>
          </div>

          <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-slate-500">Mesa</dt>
              <dd className="font-bold">Mesa 3</dd>
            </div>
            <div>
              <dt className="text-slate-500">Fecha</dt>
              <dd className="font-bold">{staffContext.date}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Sesion</dt>
              <dd className="font-bold">Cena</dd>
            </div>
            <div>
              <dt className="text-slate-500">Pago</dt>
              <dd className="font-bold">Pendiente</dd>
            </div>
          </dl>

          <div className="mt-6 grid gap-3">
            {orderLines.map((line) => (
              <div
                key={line.id}
                className="grid grid-cols-[auto_1fr_auto] gap-3 border-b border-slate-100 pb-3 text-sm"
              >
                <span className="font-bold">{line.qty}</span>
                <span>{line.name}</span>
                <span className="font-bold">
                  {formatCurrency(line.qty * line.price)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>IVA visual</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-3 text-xl font-black">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>

          <div className="mt-6 rounded-md border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            Documento no fiscal. La emision legal, numeracion fiscal y
            cualquier integracion con AEAT, VeriFactu, Odoo o contabilidad
            quedan fuera de esta fase.
          </div>
        </Panel>
      </div>
    </DarkPageShell>
  );
}
