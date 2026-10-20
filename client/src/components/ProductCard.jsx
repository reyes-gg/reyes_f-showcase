function ProductCard({ product, onSelect, index = 0 }) {
  return (
    <article
      onClick={() => onSelect && onSelect(product)}
      style={{ animationDelay: Math.min(index, 12) * 40 + "ms" }}
      className="animate-rise group mb-8 break-inside-avoid cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-sm bg-line">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="block w-full object-cover transition duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 flex items-end justify-between bg-linear-to-t from-ink/60 via-transparent to-transparent p-4 opacity-0 transition duration-300 group-hover:opacity-100">
          <span className="text-xs font-medium uppercase tracking-widest text-white">
            View details
          </span>
          <span className="text-white">→</span>
        </div>
      </div>

      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
            {product.category || "General"}
          </p>
          <h3 className="mt-1 truncate font-serif text-lg leading-snug">{product.name}</h3>
        </div>
        <p className="shrink-0 pt-4 font-mono text-sm text-muted">
          ₱{Number(product.price).toLocaleString()}
        </p>
      </div>
    </article>
  );
}

export default ProductCard;
