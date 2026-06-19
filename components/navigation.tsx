"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminLinks } from "@/lib/ui-data";

function isActive(pathname: string, href: string) {
  return pathname === href;
}

const adminRouteMeta: Record<string, { title: string; status: string }> = {
  "/admin": { title: "Inici", status: "Mock/local · Contractes auditats" },
  "/admin/catalogo": {
    title: "Cataleg Cheffing -> TPV",
    status: "csv · ultima sync 15/6/26 22:46",
  },
  "/admin/mesas": {
    title: "Zones i taules",
    status: "6 zones · 61 taules",
  },
  "/admin/reservas": {
    title: "Reserves",
    status: "Shared reservation lifecycle mock",
  },
  "/admin/comandas": {
    title: "Comandes",
    status: "0 paid · 0,00 €",
  },
  "/admin/produccion": {
    title: "Produccio, comandes i impressores",
    status: "backoffice_production_routing_mock · contracte OK",
  },
  "/admin/informes": {
    title: "Informes",
    status: "Reporting mock",
  },
  "/admin/sikim-app": {
    title: "SIKIM APP",
    status: "connector mock/local",
  },
  "/admin/supabase": {
    title: "Supabase",
    status: "diagnostic config · no data queries",
  },
  "/admin/caja": {
    title: "Caixa i informe diari",
    status: "backoffice_cash_register_mock · open",
  },
  "/admin/fiscal": {
    title: "Fiscal / Odoo",
    status: "backoffice_fiscal_bridge_mock · 7 requests",
  },
  "/admin/usuarios": {
    title: "Usuaris i permisos",
    status: "Permisos mock/local",
  },
  "/admin/help": {
    title: "Ajuda",
    status: "Help Chatbot v0.4 mock",
  },
};

export function AppNavigation() {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");
  const meta = adminRouteMeta[pathname] ?? adminRouteMeta["/admin"];

  if (!isAdminRoute) {
    return null;
  }

  return (
    <header className="bg-[#f3f5f7] px-3 pt-3 text-[#20262d] lg:px-4">
      <div className="mx-auto grid max-w-[1780px] gap-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-black uppercase text-[#65717d]">
              Backoffice Sikim POS
            </p>
            <h1 className="text-[28px] font-black leading-none tracking-normal">
              {meta.title}
            </h1>
          </div>
          <span className="max-w-full rounded-full border border-[#d7dde3] bg-white px-3 py-2 text-right text-xs font-black text-[#65717d] shadow-[0_1px_0_rgba(15,23,42,0.03)]">
            {meta.status}
          </span>
        </div>

        <nav
          aria-label="Navegacion backoffice"
          className="flex flex-wrap items-center gap-2 rounded-lg border border-[#d7dde3] bg-white p-3"
        >
          <Link href="/admin" className="grid min-w-[170px] flex-1 gap-0.5 sm:flex-none">
            <strong className="text-sm font-black leading-tight">
              Backoffice SIKIM_POS
            </strong>
            <span className="text-xs font-black text-[#65717d]">
              Mock/local · Contractes auditats
            </span>
          </Link>

          <div className="order-3 flex min-w-0 basis-full flex-wrap gap-1.5 pb-0.5 xl:order-none xl:basis-auto xl:flex-1">
            {adminLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(pathname, link.href) ? "page" : undefined}
                className={`inline-flex min-h-[34px] items-center rounded-md border px-2.5 py-1.5 text-xs font-black transition ${
                  isActive(pathname, link.href)
                    ? "border-[#0f766e] bg-[#0f766e] text-white"
                    : "border-[#d7dde3] bg-[#f9fafb] text-[#65717d] hover:border-[#0f766e] hover:text-[#20262d]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="ml-auto flex flex-wrap justify-end gap-1.5">
            <Link
              href="/ayuda"
              className="inline-flex min-h-[34px] items-center rounded-md border border-[#d7dde3] bg-[#f9fafb] px-2.5 py-1.5 text-xs font-black text-[#65717d] transition hover:border-[#0f766e]"
            >
              Ajuda
            </Link>
            <Link
              href="/pos"
              className="inline-flex min-h-[34px] items-center rounded-md border border-[#0f766e] bg-[#ecfdf5] px-3 py-1.5 text-xs font-black text-[#0f766e] transition hover:bg-[#0f766e] hover:text-white"
            >
              Frontoffice
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
