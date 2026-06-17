export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-50 px-6 py-12 text-stone-950">
      <section className="w-full max-w-3xl border border-stone-200 bg-white p-8 shadow-sm sm:p-10">
        <p className="mb-3 text-sm font-medium uppercase tracking-wide text-emerald-700">
          Sikim POS
        </p>
        <h1 className="text-4xl font-semibold tracking-normal text-stone-950">
          Sikim POS
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-700">
          Workspace inicial del TPV interno.
        </p>

        <div className="mt-10 border-t border-stone-200 pt-6">
          <h2 className="text-base font-semibold text-stone-950">
            Estado inicial
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-700">
            El scaffold de aplicacion ya existe. Los modulos POS, Supabase,
            Vercel, autenticacion, pagos e impresion todavia no estan
            implementados.
          </p>
        </div>
      </section>
    </main>
  );
}
