import { formatCurrency } from "@/lib/ui-data";
import { ActionLink, DarkPageShell, MetricTile, Panel, StatusBadge } from "@/components/ui";

const movements = [
  { label: "Fondo inicial", value: 250, type: "entrada" },
  { label: "Retirada caja fuerte", value: -120, type: "salida" },
  { label: "Ajuste pendiente", value: 0, type: "nota" },
];

export default function TurnoPage() {
  const expectedCash = 436.2;
  const countedCash = 430;
  const difference = countedCash - expectedCash;

  return (
    <DarkPageShell
      eyebrow="Turno y caja"
      title="Cierre de turno"
      description="Shell inicial para revisar caja, movimientos y notas de cierre. No genera contabilidad ni fiscalidad."
      actions={
        <>
          <ActionLink href="/pos">POS sala</ActionLink>
          <ActionLink href="/admin/caja" variant="primary">
            Ver caja admin
          </ActionLink>
        </>
      }
    >
      <div className="grid gap-4 lg:grid-cols-4">
        <MetricTile label="Turno" value="Abierto" detail="Cena" />
        <MetricTile
          label="Efectivo esperado"
          value={formatCurrency(expectedCash)}
          detail="Calculado en pantalla"
        />
        <MetricTile
          label="Efectivo contado"
          value={formatCurrency(countedCash)}
          detail="Entrada manual futura"
        />
        <MetricTile
          label="Diferencia"
          value={formatCurrency(difference)}
          detail="Pendiente de validar"
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_420px]">
        <Panel title="Movimientos de caja" description="Listado de ejemplo para el futuro cierre auditable.">
          <div className="grid gap-3">
            {movements.map((movement) => (
              <div
                key={movement.label}
                className="flex items-center justify-between gap-3 rounded-md border border-slate-800 bg-slate-950 p-4"
              >
                <div>
                  <p className="font-black text-white">{movement.label}</p>
                  <p className="mt-1 text-sm text-slate-500">{movement.type}</p>
                </div>
                <p className="text-lg font-black text-slate-100">
                  {formatCurrency(movement.value)}
                </p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Notas de cierre">
          <div className="rounded-md border border-slate-800 bg-slate-950 p-4">
            <p className="text-sm text-slate-400">Actor</p>
            <p className="mt-1 text-lg font-black text-white">Responsable de turno</p>
          </div>
          <div className="mt-3 min-h-40 rounded-md border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-slate-400">
            Espacio previsto para incidencias de caja, arqueo, retiradas y
            observaciones internas.
          </div>
          <div className="mt-3 flex items-center justify-between gap-3 rounded-md border border-amber-300/30 bg-amber-300/10 p-4">
            <span className="text-sm font-bold text-amber-100">
              Cierre final pendiente de backend
            </span>
            <StatusBadge value="inicial" />
          </div>
        </Panel>
      </div>
    </DarkPageShell>
  );
}
