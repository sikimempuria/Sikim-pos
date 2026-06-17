import { adminModules } from "@/lib/ui-data";
import {
  ActionLink,
  DarkPageShell,
  MetricTile,
  Panel,
  StatusBadge,
} from "@/components/ui";

export default function Home() {
  return (
    <DarkPageShell
      eyebrow="Sikim POS"
      title="TPV interno para operar el servicio"
      description="Entrada inicial para sala, cocina, caja y administracion. La interfaz esta preparada para evolucionar hacia operativa real cuando conectemos datos y permisos."
      actions={
        <>
          <ActionLink href="/pos" variant="primary">
            Abrir POS sala
          </ActionLink>
          <ActionLink href="/admin">Administracion</ActionLink>
        </>
      }
    >
      <div className="grid gap-4 lg:grid-cols-4">
        <MetricTile label="Estado app" value="UI shell" detail="Next.js activo" />
        <MetricTile label="Backend" value="No conectado" detail="Sin Supabase" />
        <MetricTile label="Pagos" value="Pendiente" detail="Sin terminal real" />
        <MetricTile label="Impresion" value="Placeholder" detail="Sin rutas reales" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Panel
          title="Accesos de servicio"
          description="Rutas principales para el personal durante un turno."
        >
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {[
              { href: "/pos", title: "POS sala", body: "Mapa de mesas y sesiones." },
              {
                href: "/pos/comanda",
                title: "Comanda",
                body: "Productos, lineas y total visual.",
              },
              {
                href: "/cocina",
                title: "Cocina/barra",
                body: "Tablero de produccion inicial.",
              },
              { href: "/pos/cobro", title: "Cobro", body: "Pantalla de pago inicial." },
              { href: "/turno", title: "Turno", body: "Caja y cierre visual." },
              { href: "/ayuda", title: "Ayuda", body: "Guia interna del operador." },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-md border border-slate-800 bg-slate-950 p-4 transition hover:border-emerald-300/60"
              >
                <h2 className="text-xl font-black text-white">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">{item.body}</p>
              </a>
            ))}
          </div>
        </Panel>

        <Panel title="Estado de alcance">
          <div className="grid gap-3">
            {[
              "Sin auth real",
              "Sin migraciones POS",
              "Sin pagos reales",
              "Sin impresion real",
              "No emite factura fiscal",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between gap-3 rounded-md border border-slate-800 bg-slate-950 p-3"
              >
                <span className="text-sm font-bold text-slate-200">{item}</span>
                <StatusBadge value="inicial" />
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel
        title="Administracion inicial"
        description="Modulos consultivos para configurar y revisar la futura operativa POS."
      >
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {adminModules.map((module) => (
            <a
              key={module.href}
              href={module.href}
              className="rounded-md border border-slate-800 bg-slate-950 p-4 transition hover:border-sky-300/60"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-black text-white">{module.title}</h2>
                <StatusBadge value={module.status} />
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {module.description}
              </p>
            </a>
          ))}
        </div>
      </Panel>
    </DarkPageShell>
  );
}
