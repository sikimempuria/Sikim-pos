import { legacyParityCounts } from "@/lib/ui-data";
import { AdminNotice, AdminPageShell, MetricTile, Panel, StatusBadge } from "@/components/ui";

const knowledgeEntries = [
  {
    module: "Caixa · caixa",
    title: "Obrir caixa",
    body: "Per obrir caixa, prem Obrir caixa a la barra superior, introdueix l'import inicial i confirma l'obertura del torn.",
    tags: "caixa, torn, obertura, efectiu",
  },
  {
    module: "Caixa · caixa",
    title: "Tancar caixa",
    body: "Per tancar caixa, revisa els cobraments del torn i fes el tancament des del panell de caixa.",
    tags: "caixa, torn, tancament",
  },
  {
    module: "Reserves",
    title: "Assignar taula",
    body: "Assignar taula vincula una reserva demo amb una sessio operativa sense escriure al motor extern de reserves.",
    tags: "reserves, taules, assignacio",
  },
  {
    module: "Produccio",
    title: "Enviar cuina",
    body: "Enviar cuina bloqueja visualment linies enviades i mostra produccio mock, pero no crea print jobs reals.",
    tags: "comanda, cuina, impressio",
  },
];

const unansweredQuestions = [
  ["Com puc recuperar una comanda tancada per error?", "Comanda", "16/06 12:24"],
  ["Que faig si una reserva no apareix al mapa?", "Reserves", "16/06 13:02"],
  ["Com reassig no una impressora de cuina?", "Configuracio", "16/06 13:48"],
];

export default function AdminHelpPage() {
  return (
    <AdminPageShell
      title="Ajuda"
      description="Backoffice de ayuda mock/local para revisar base de conocimiento, preguntas sin respuesta y propuestas sin persistencia."
    >
      <div className="grid gap-2">
        <AdminNotice>
          Aquesta pantalla no escriu cap fitxer real, no fa servir backend i no persisteix dades.
        </AdminNotice>
        <AdminNotice>
          Les propostes es guarden nomes com estat visual mentre la pagina esta oberta.
        </AdminNotice>
      </div>

      <div className="grid gap-2 md:grid-cols-3">
        <MetricTile tone="light" label="Base de coneixement" value={`${legacyParityCounts.helpEntries}`} detail="entrades representatives" />
        <MetricTile tone="light" label="Preguntes sense resposta" value="3" detail="mock" />
        <MetricTile tone="light" label="Propostes pendents" value="0" detail="en memoria" />
      </div>

      <div className="grid gap-3 xl:grid-cols-[1.2fr_0.9fr_390px]">
        <Panel tone="light">
          <p className="admin-section-label">Base de coneixement actual</p>
          <h2 className="text-xl font-black leading-tight">
            {legacyParityCounts.helpEntries} entrades
          </h2>
          <div className="mt-3 grid gap-2 md:grid-cols-[140px_140px_1fr]">
            {["Modul", "Context", "Cerca"].map((label) => (
              <label key={label} className="grid gap-1 text-xs font-black text-[#65717d]">
                {label}
                <input placeholder={label === "Cerca" ? "Titol, pregunta, tag..." : "Tots"} />
              </label>
            ))}
          </div>
          <div className="mt-3 grid max-h-[calc(100vh-300px)] gap-2 overflow-auto pr-1">
            {knowledgeEntries.map((entry) => (
              <article key={entry.title} className="rounded-lg border border-[#d7dde3] bg-white p-3">
                <span className="rounded-full bg-[#eef6ff] px-2 py-1 text-[11px] font-black uppercase text-[#17507c]">
                  {entry.module}
                </span>
                <h3 className="mt-2 text-lg font-black leading-tight">{entry.title}</h3>
                <p className="mt-2 text-sm font-extrabold leading-5 text-[#20262d]">
                  {entry.body}
                </p>
                <p className="mt-2 text-xs font-black text-[#65717d]">Tags: {entry.tags}</p>
              </article>
            ))}
          </div>
        </Panel>

        <Panel tone="light">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="admin-section-label">Preguntes sense resposta</p>
              <h2 className="text-xl font-black leading-tight">3 preguntes</h2>
            </div>
            <StatusBadge value="Fallback visual" />
          </div>
          <div className="mt-3 grid gap-2">
            {unansweredQuestions.map(([question, module, date]) => (
              <article key={question} className="grid gap-3 rounded-lg border border-[#d7dde3] bg-white p-3 md:grid-cols-[1fr_auto]">
                <div>
                  <span className="rounded-full bg-[#eef6ff] px-2 py-1 text-[11px] font-black uppercase text-[#17507c]">
                    {module}
                  </span>
                  <h3 className="mt-2 font-black leading-tight">{question}</h3>
                  <p className="mt-1 text-xs font-black text-[#65717d]">{date}</p>
                </div>
                <button type="button">Preparar resposta</button>
              </article>
            ))}
          </div>
        </Panel>

        <Panel tone="light">
          <p className="admin-section-label">Proposta de nova resposta</p>
          <h2 className="text-xl font-black leading-tight">Preparar entrada mock</h2>
          <div className="mt-3 grid gap-3">
            <label className="grid gap-1 text-xs font-black text-[#65717d]">
              Pregunta original
              <input placeholder="Selecciona una pregunta sense resposta" />
            </label>
            <label className="grid gap-1 text-xs font-black text-[#65717d]">
              Context detectat
              <select defaultValue="taules">
                <option>taules</option>
              </select>
            </label>
            <label className="grid gap-1 text-xs font-black text-[#65717d]">
              Resposta mock
              <textarea placeholder="Escriu una resposta operativa curta..." />
            </label>
            <label className="grid gap-1 text-xs font-black text-[#65717d]">
              Keywords / aliases
              <input placeholder="Separades per comes" />
            </label>
            <button type="button" className="admin-button-primary">
              Afegir com a proposta mock
            </button>
          </div>
          <div className="mt-4 border-t border-[#d7dde3] pt-3">
            <p className="admin-section-label">Propostes pendents</p>
            <h3 className="text-xl font-black">0 en memoria</h3>
            <div className="mt-16 text-center text-base font-black text-[#65717d]">
              Encara no hi ha propostes pendents.
            </div>
          </div>
        </Panel>
      </div>
    </AdminPageShell>
  );
}
