import { useState } from "react";
import ProductGrid from "../components/ProductGrid";
import ProductModal from "../components/ProductModal";

function GalleryPage({ products, loading }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("none");
  const [selected, setSelected] = useState(null);

  const categories = ["All", ...new Set(products.map((p) => p.category || "General"))];

  const shown = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || (p.category || "General") === category;
    return matchSearch && matchCategory;
  });

  if (sort === "low") {
    shown.sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    shown.sort((a, b) => b.price - a.price);
  }

  return (
    <main className="mx-auto max-w-7xl px-6">
      {/* editorial header */}
      <section className="animate-rise grid gap-6 border-b border-line py-16 md:grid-cols-[1fr_auto] md:items-end md:py-24">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-accent">
            The collection
          </p>
          <h2 className="mt-4 max-w-3xl font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl">
            Things worth <em className="text-accent">looking at.</em>
          </h2>
        </div>
        <div className="font-mono text-sm text-muted md:text-right">
          <p className="text-4xl text-ink">{String(products.length).padStart(2, "0")}</p>
          <p>pieces on display</p>
        </div>
      </section>

      {/* toolbar */}
      <div className="sticky top-[73px] z-10 -mx-6 flex flex-col gap-4 border-b border-line bg-paper/90 px-6 py-4 backdrop-blur md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={
                "text-sm transition " +
                (category === c
                  ? "font-semibold text-ink underline decoration-accent decoration-2 underline-offset-8"
                  : "text-muted hover:text-ink")
              }
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search…"
            className="w-full min-w-0 border-0 border-b border-line bg-transparent py-1.5 text-sm outline-none transition placeholder:text-muted/60 focus:border-accent md:w-52"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="cursor-pointer border-0 border-b border-line bg-transparent py-1.5 text-sm outline-none focus:border-accent"
          >
            <option value="none">Sort</option>
            <option value="low">Price ↑</option>
            <option value="high">Price ↓</option>
          </select>
        </div>
      </div>

      <div className="py-10">
        {loading ? (
          <div className="columns-1 gap-8 sm:columns-2 lg:columns-3 xl:columns-4">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div
                key={i}
                style={{ height: i % 3 === 0 ? 320 : i % 3 === 1 ? 240 : 280 }}
                className="mb-8 animate-pulse break-inside-avoid rounded-sm bg-line"
              />
            ))}
          </div>
        ) : (
          <ProductGrid products={shown} onSelect={setSelected} />
        )}
      </div>

      {/* details popup */}
      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
    </main>
  );
}

export default GalleryPage;
