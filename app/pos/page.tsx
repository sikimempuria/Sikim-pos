import { PosFloorShell } from "@/components/pos-floor-shell";
import { ActionLink, DarkPageShell } from "@/components/ui";

export default function PosPage() {
  return (
    <DarkPageShell
      title="POS sala"
      description="Mapa operativo para abrir mesas, revisar sesiones y saltar rapido a comanda, cocina o cobro."
      actions={
        <>
          <ActionLink href="/pos/comanda" variant="primary">
            Ver comanda
          </ActionLink>
          <ActionLink href="/cocina">Cocina/barra</ActionLink>
        </>
      }
    >
      <PosFloorShell />
    </DarkPageShell>
  );
}
