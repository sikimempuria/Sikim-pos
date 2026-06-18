import { reservations, statusLabel } from "@/lib/ui-data";
import { AdminNotice, AdminPageShell, MetricTile, Panel, StatusBadge } from "@/components/ui";

const reservationActions = [
  "Acceptar / Aceptar",
  "Rebutjar / Rechazar",
  "Veure reserva / Ver reserva",
  "Assignar taula / Asignar mesa",
  "Cancel.lar assignacio",
  "Asseure client / Sentar cliente",
  "Obrir taula / Abrir mesa",
  "Tancar reserva 0,00 €",
];

export default function ReservasPage() {
  const selected = reservations[0];

  return (
    <AdminPageShell
      title="Reservas y sesiones"
      description="Relacion inicial entre reservas, walk-ins y sesiones de mesa del POS."
    >
      <AdminNotice>
        No modifica el motor extern de reserves. La relacio reserva a sessio POS queda visible com a mock/local.
      </AdminNotice>

      <div className="grid gap-2 md:grid-cols-4 xl:grid-cols-7">
        <MetricTile tone="light" label="Total" value={`${reservations.length}`} />
        <MetricTile tone="light" label="Requested" value={`${reservations.filter((item) => item.status === "requested").length}`} />
        <MetricTile tone="light" label="Confirmed" value={`${reservations.filter((item) => item.status === "confirmed").length}`} />
        <MetricTile tone="light" label="Assigned" value={`${reservations.filter((item) => item.status === "assigned").length}`} />
        <MetricTile tone="light" label="Seated" value={`${reservations.filter((item) => item.status === "seated").length}`} />
        <MetricTile tone="light" label="Completed" value={`${reservations.filter((item) => item.status === "completed").length}`} />
        <MetricTile tone="light" label="No-show" value={`${reservations.filter((item) => item.status === "no-show").length}`} />
      </div>

      <div className="grid gap-3 xl:grid-cols-[240px_minmax(0,1fr)_340px]">
        <Panel tone="light">
          <p className="admin-section-label">Filtres</p>
          <h2 className="text-xl font-black leading-tight">Reserves</h2>
          <div className="mt-3 grid gap-2">
            {["Totes", "Solicitades", "Confirmades", "Assignades", "Sentades", "Completades", "Incidencies"].map((filter, index) => (
              <button key={filter} type="button" className={index === 0 ? "admin-button-primary" : ""}>
                {filter}
              </button>
            ))}
          </div>
          <label className="mt-3 grid gap-1 text-xs font-black text-[#65717d]">
            Data
            <input value="18/06/2026" readOnly />
          </label>
          <label className="mt-3 grid gap-1 text-xs font-black text-[#65717d]">
            Zona
            <select defaultValue="Totes">
              <option>Totes</option>
            </select>
          </label>
        </Panel>

        <Panel tone="light">
          <div className="mb-2">
            <p className="admin-section-label">Reserves confirmades</p>
            <h2 className="text-xl font-black leading-tight">{reservations.length} reserves</h2>
          </div>
          <div className="admin-table-wrap">
            <table className="min-w-[980px]">
              <thead>
                <tr>
                  <th>Hora</th>
                  <th>Client</th>
                  <th>Pax</th>
                  <th>Estat</th>
                  <th>Taula</th>
                  <th>Zona</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation) => (
                  <tr key={reservation.id}>
                    <td className="font-black">{reservation.time}</td>
                    <td className="font-bold">{reservation.guest}</td>
                    <td>{reservation.partySize}</td>
                    <td>
                      <StatusBadge value={reservation.status} />
                    </td>
                    <td>{reservation.assignedTable ?? "Sense taula"}</td>
                    <td>{reservation.zone ?? "Zona pendent"}</td>
                    <td>{reservation.notes ?? statusLabel(reservation.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel tone="light">
          <p className="admin-section-label">Detall reserva</p>
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-xl font-black leading-tight">{selected.guest}</h2>
            <StatusBadge value={selected.status} />
          </div>
          <div className="mt-3 grid gap-2 rounded-lg border border-[#d7dde3] bg-[#f9fafb] p-3">
            {[
              ["time", selected.time],
              ["party_size", `${selected.partySize}`],
              ["assigned_table", selected.assignedTable ?? "-"],
              ["zone", selected.zone ?? "-"],
              ["status", statusLabel(selected.status)],
              ["notes", selected.notes ?? "Accions locals de referencia"],
            ].map(([label, value]) => (
              <div key={label} className="admin-detail-row">
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <div className="mt-3 grid gap-2">
            {reservationActions.map((action) => (
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
