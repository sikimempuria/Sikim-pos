import { PaymentShell } from "@/components/payment-shell";
import { ActionLink, DarkPageShell } from "@/components/ui";

export default function CobroPage() {
  return (
    <DarkPageShell
      title="Cobro"
      description="Pantalla inicial para revisar ticket, metodo de pago, efectivo recibido, cambio y cobro dividido."
      actions={
        <>
          <ActionLink href="/pos/comanda">Volver a comanda</ActionLink>
          <ActionLink href="/ticket" variant="primary">
            Ver ticket
          </ActionLink>
        </>
      }
    >
      <PaymentShell />
    </DarkPageShell>
  );
}
