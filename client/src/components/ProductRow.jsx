// one row in the Manage list
function ProductRow({ product, isEditing, onEdit, onDelete }) {
  return (
    <li
      className={
        "flex items-center gap-4 px-4 py-3 transition " +
        (isEditing ? "bg-accent-soft" : "hover:bg-paper")
      }
    >
      <img
        src={product.image}
        alt={product.name}
        className="h-16 w-16 shrink-0 rounded-sm object-cover"
      />

      <div className="min-w-0 flex-1">
        <h3 className="truncate font-serif text-lg leading-tight">{product.name}</h3>
        <p className="mt-0.5 text-xs text-muted">
          <span className="uppercase tracking-widest">{product.category || "General"}</span>
          <span className="mx-2">·</span>
          <span className="font-mono">₱{Number(product.price).toLocaleString()}</span>
        </p>
      </div>

      <div className="flex shrink-0 gap-1">
        <button
          onClick={() => onEdit(product)}
          className="rounded-full px-4 py-1.5 text-sm font-medium transition hover:bg-ink hover:text-paper"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(product._id)}
          className="rounded-full px-4 py-1.5 text-sm font-medium text-accent transition hover:bg-accent hover:text-white"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default ProductRow;
