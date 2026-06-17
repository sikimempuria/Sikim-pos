import { DarkPageShell, Panel, StatusBadge } from "@/components/ui";

const helpCards = [
  {
    title: "Abrir una mesa",
    body: "Desde POS sala, selecciona zona y mesa. La accion real se conectara cuando exista backend.",
  },
  {
    title: "Enviar a cocina",
    body: "La comanda separa borrador de lineas enviadas para evitar duplicados en fases futuras.",
  },
  {
    title: "Cobrar",
    body: "Cobro muestra metodo, efectivo y cambio, pero no procesa pagos ni imprime tickets.",
  },
  {
    title: "Cerrar turno",
    body: "Turno prepara arqueo, diferencias y notas sin generar contabilidad.",
  },
];

export default function AyudaPage() {
  return (
    <DarkPageShell
      eyebrow="Ayuda interna"
      title="Guia de operador"
      description="Punto inicial para resolver dudas de sala, cocina, caja y administracion mientras el producto avanza."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {helpCards.map((card) => (
          <Panel key={card.title} title={card.title}>
            <p className="text-sm leading-6 text-slate-400">{card.body}</p>
          </Panel>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Preguntas comunes">
          <div className="grid gap-3">
            {[
              "Que diferencia hay entre mesa y reserva",
              "Cuando una linea deja de ser borrador",
              "Que significa sin backend conectado",
              "Por que el ticket no es factura fiscal",
            ].map((question) => (
              <div
                key={question}
                className="rounded-md border border-slate-800 bg-slate-950 p-4"
              >
                <p className="font-black text-white">{question}</p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Respuesta operativa pendiente de completar con el equipo.
                </p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Documentacion">
          <div className="grid gap-3">
            <a
              href="https://github.com/sikim-empuriabrava/Sikim-pos/blob/main/docs/architecture/pos-v1.md"
              className="rounded-md border border-slate-800 bg-slate-950 p-4 text-sm font-bold text-slate-200"
            >
              Arquitectura POS V1
            </a>
            <a
              href="https://github.com/sikim-empuriabrava/Sikim-pos/blob/main/docs/deployment/vercel.md"
              className="rounded-md border border-slate-800 bg-slate-950 p-4 text-sm font-bold text-slate-200"
            >
              Despliegue Vercel
            </a>
            <div className="rounded-md border border-slate-800 bg-slate-950 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-black text-white">Soporte futuro</p>
                <StatusBadge value="plan" />
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Placeholder para chatbot o base de conocimiento interna. No hay
                chatbot implementado.
              </p>
            </div>
          </div>
        </Panel>
      </div>
    </DarkPageShell>
  );
}
