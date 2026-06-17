import { AdminPageShell, Panel, StatusBadge } from "@/components/ui";

const reservations = [
  {
    time: "20:30",
    name: "Reserva ejemplo A",
    pax: 4,
    status: "confirmada",
    table: "Mesa 2",
  },
  {
    time: "21:00",
    name: "Reserva ejemplo B",
    pax: 2,
    status: "pendiente",
    table: "Sin mesa",
  },
  {
    time: "21:30",
    name: "Walk-in previsto",
    pax: 3,
    status: "entrada directa",
    table: "Por asignar",
  },
];

export default function ReservasPage() {
  return (
    <AdminPageShell
      title="Reservas y sesiones"
      description="Relacion inicial entre reservas, walk-ins y sesiones de mesa del POS."
    >
      <Panel
        tone="light"
        title="Reservas confirmadas"
        description="No modifica ni redisenia el motor externo de reservas."
      >
        <div className="grid gap-3">
          {reservations.map((reservation) => (
            <div
              key={`${reservation.time}-${reservation.name}`}
              className="grid gap-3 rounded-md border border-slate-200 bg-white p-4 md:grid-cols-[120px_1fr_120px_160px]"
            >
              <p className="text-xl font-black">{reservation.time}</p>
              <div>
                <p className="font-black">{reservation.name}</p>
                <p className="mt-1 text-sm text-slate-500">{reservation.pax} pax</p>
              </div>
              <StatusBadge value={reservation.status} />
              <p className="font-bold text-slate-700">{reservation.table}</p>
            </div>
          ))}
        </div>
      </Panel>

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel tone="light" title="Asignacion de mesa">
          <p className="text-sm leading-6 text-slate-600">
            Placeholder para sentar reservas y crear sesiones de mesa cuando el
            cliente llega al restaurante.
          </p>
        </Panel>
        <Panel tone="light" title="Reservas externas pendientes">
          <p className="text-sm leading-6 text-slate-600">
            Aviso futuro para reservas que aun no esten sincronizadas con la
            operativa de sala.
          </p>
        </Panel>
        <Panel tone="light" title="Walk-in">
          <p className="text-sm leading-6 text-slate-600">
            Una entrada sin reserva podra crear sesion de mesa sin duplicar una
            reserva.
          </p>
        </Panel>
      </div>
    </AdminPageShell>
  );
}
