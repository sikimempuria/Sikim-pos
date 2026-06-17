import { ComandaShell } from "@/components/comanda-shell";
import { ActionLink, DarkPageShell } from "@/components/ui";

export default function ComandaPage() {
  return (
    <DarkPageShell
      title="Comanda"
      description="Composicion inicial de pedido con categorias, productos, notas, modificadores y ticket de mesa."
      actions={
        <>
          <ActionLink href="/pos">Volver a sala</ActionLink>
          <ActionLink href="/pos/cobro" variant="primary">
            Ir a cobro
          </ActionLink>
        </>
      }
    >
      <ComandaShell />
    </DarkPageShell>
  );
}
