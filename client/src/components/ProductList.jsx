import ProductRow from "./ProductRow";

function ProductList({ products, editingId, onEdit, onDelete }) {
  if (products.length === 0) {
    return (
      <div className="border border-dashed border-line py-16 text-center text-muted">
        No products yet. Add your first one.
      </div>
    );
  }

  return (
    <ul className="divide-y divide-line overflow-hidden rounded-sm border border-line bg-card">
      {products.map((p) => (
        <ProductRow
          key={p._id}
          product={p}
          isEditing={editingId === p._id}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default ProductList;
