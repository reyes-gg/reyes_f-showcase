import { useEffect } from "react";

function ProductModal({ product, onClose }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    // stop the page behind from scrolling
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="animate-fade fixed inset-0 z-30 flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm"
    >
      {/* stopPropagation so clicking inside the box does not close it */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-pop relative grid max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-sm bg-card shadow-2xl md:grid-cols-[1.2fr_1fr]"
      >
        <div className="flex items-center justify-center bg-line">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[50vh] w-full object-cover md:max-h-[90vh] md:h-full"
          />
        </div>

        <div className="flex flex-col overflow-y-auto p-8">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-paper/90 text-lg transition hover:bg-ink hover:text-paper"
          >
            ×
          </button>

          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-accent">
            {product.category || "General"}
          </p>
          <h3 className="mt-3 font-serif text-3xl leading-tight">{product.name}</h3>
          <p className="mt-4 font-mono text-xl">₱{Number(product.price).toLocaleString()}</p>

          <div className="my-6 h-px bg-line" />

          <p className="leading-relaxed text-muted">
            {product.description || "No description provided."}
          </p>

          <button
            onClick={onClose}
            className="mt-auto pt-8 text-left text-sm font-medium underline-offset-4 hover:text-accent hover:underline"
          >
            ← Back to gallery
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
