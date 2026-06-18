import { formatCurrency, legacyParityCounts, products } from "@/lib/ui-data";
import { AdminPageShell, MetricTile, Panel, StatusBadge } from "@/components/ui";

const filters = [
  "Tots",
  "Pending config",
  "Visible",
  "Hidden",
  "Archived",
  "Cartes",
  "Menus",
  "Sense zona produccio",
  "Sense nom curt",
];

export default function CatalogoPage() {
  const selected = products[0];

  return (
    <AdminPageShell
      title="Cataleg POS"
      description="Overlay previsto para decidir que productos de Cheffing aparecen en el TPV, con estacion y precio de referencia."
    >
      <div className="grid gap-2 md:grid-cols-4 xl:grid-cols-7">
        <MetricTile tone="light" label="Total" value={`${legacyParityCounts.products}`} />
        <MetricTile tone="light" label="Pending" value={`${legacyParityCounts.products}`} />
        <MetricTile tone="light" label="Visible" value="0" />
        <MetricTile tone="light" label="Hidden" value="0" />
        <MetricTile tone="light" label="Archived" value="0" />
        <MetricTile tone="light" label="Sense zona" value={`${legacyParityCounts.products}`} />
        <MetricTile tone="light" label="Sense nom curt" value={`${legacyParityCounts.products}`} />
      </div>

      <div className="grid gap-3 xl:grid-cols-[220px_minmax(0,1fr)_340px]">
        <Panel tone="light">
          <p className="admin-section-label">Filtres</p>
          <h2 className="text-xl font-black leading-tight">Vista</h2>
          <div className="mt-3 grid gap-1.5">
            {filters.map((filter, index) => (
              <button
                key={filter}
                type="button"
                className={index === 0 ? "admin-button-primary" : ""}
              >
                {filter}
              </button>
            ))}
          </div>
          <label className="mt-3 grid gap-1 text-xs font-black text-[#65717d]">
            Zona produccio
            <select>
              <option>Per zona produccio: totes</option>
            </select>
          </label>
          <label className="mt-3 grid gap-1 text-xs font-black text-[#65717d]">
            Familia Cheffing
            <select>
              <option>Per familia Cheffing: totes</option>
            </select>
          </label>
          <label className="mt-3 grid gap-1 text-xs font-black text-[#65717d]">
            Cerca
            <input placeholder="Nom TPV, Cheffing o UI" />
          </label>
        </Panel>

        <Panel tone="light">
          <div className="mb-2 flex items-start justify-between gap-3">
            <div>
              <p className="admin-section-label">Items visibles contextuals</p>
              <h2 className="text-xl font-black leading-tight">
                {legacyParityCounts.products} productes POS
              </h2>
            </div>
            <button type="button" className="admin-button-primary">
              Desar local
            </button>
          </div>
          <div className="admin-table-wrap">
            <table className="min-w-[980px]">
              <thead>
                <tr>
                  <th>Estat</th>
                  <th>Visible</th>
                  <th>Nom TPV</th>
                  <th>Nom Cheffing</th>
                  <th>Tipus</th>
                  <th>Carta/menu origen</th>
                  <th>Seccio</th>
                  <th>Preu</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <StatusBadge value="Pending config" />
                    </td>
                    <td>No</td>
                    <td className="font-black">-</td>
                    <td className="font-bold">{product.name}</td>
                    <td>{product.category === "Menus" ? "Menu" : "Carta"}</td>
                    <td>{product.category}</td>
                    <td>{product.station}</td>
                    <td className="font-black">{formatCurrency(product.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel tone="light">
          <p className="admin-section-label">Carta</p>
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-xl font-black leading-tight">{selected.name}</h2>
            <StatusBadge value="Pending config" />
          </div>

          <div className="mt-3 rounded-lg border border-[#d7dde3] bg-[#f9fafb] p-3">
            <h3 className="font-black">Dades Cheffing</h3>
            <div className="mt-3 grid gap-2">
              {[
                ["Nom oficial", selected.name],
                ["Preu", formatCurrency(selected.price)],
                ["Familia", selected.category],
                ["Carta/Menu origen", selected.category],
                ["Seccio menu", selected.station],
                ["source_is_active", "true"],
                ["last_synced_at", "15/6/26 22:46"],
              ].map(([label, value]) => (
                <div key={label} className="admin-detail-row">
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 rounded-lg border border-[#d7dde3] bg-white p-3">
            <h3 className="font-black">Configuracio TPV</h3>
            <label className="mt-3 grid gap-1 text-xs font-black text-[#65717d]">
              Nom curt TPV
              <input />
            </label>
            <label className="mt-3 grid gap-1 text-xs font-black text-[#65717d]">
              Color
              <input value="#0f766e" readOnly />
            </label>
            <label className="mt-3 grid gap-1 text-xs font-black text-[#65717d]">
              Ordre
              <input value="3" readOnly />
            </label>
            <label className="mt-3 flex items-center gap-2 text-xs font-black text-[#65717d]">
              <input className="!min-h-5 !w-5" type="checkbox" />
              Visible a tablet
            </label>
            <label className="mt-3 grid gap-1 text-xs font-black text-[#65717d]">
              Estat
              <select defaultValue="Pending config">
                <option>Pending config</option>
              </select>
            </label>
            <label className="mt-3 grid gap-1 text-xs font-black text-[#65717d]">
              Notes internes
              <textarea />
            </label>
          </div>
        </Panel>
      </div>
    </AdminPageShell>
  );
}
