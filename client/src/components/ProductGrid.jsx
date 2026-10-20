import ProductCard from "./ProductCard";

// masonry layout: images keep their natural height
function ProductGrid({ products, onSelect }) {
  if (products.length === 0) {
    return (
      <div className="border border-dashed border-line py-24 text-center">
        <p className="font-serif text-2xl">Nothing here yet</p>
        <p className="mt-1 text-sm text-muted">Try a different search or category.</p>
      </div>
    );
  }

  return (
    <div className="columns-1 gap-8 sm:columns-2 lg:columns-3 xl:columns-4">
      {products.map((product, i) => (
        <ProductCard key={product._id} product={product} index={i} onSelect={onSelect} />
      ))}
    </div>
  );
}

export default ProductGrid;
