import { KitchenBoard } from "@/components/kitchen-board";
import { ActionLink, DarkPageShell } from "@/components/ui";

export default function CocinaPage() {
  return (
    <DarkPageShell
      eyebrow="Produccion"
      title="Cocina y barra"
      description="Tablero inicial para seguir lineas enviadas, tiempos, notas, alergenos y estado previsto de impresion."
      actions={
        <>
          <ActionLink href="/pos">POS sala</ActionLink>
          <ActionLink href="/admin/produccion" variant="primary">
            Configuracion
          </ActionLink>
        </>
      }
    >
      <KitchenBoard />
    </DarkPageShell>
  );
}
