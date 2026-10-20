import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";

function ManagePage({ products, editingProduct, onSave, onCancel, onEdit, onDelete }) {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <header className="mb-10 animate-rise">
        <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-accent">
          Studio
        </p>
        <h2 className="mt-2 font-serif text-4xl tracking-tight md:text-5xl">
          Manage products
        </h2>
      </header>

      <div className="grid items-start gap-10 lg:grid-cols-[380px_1fr]">
        {/* the key resets the form every time we switch to a different product */}
        <ProductForm
          key={editingProduct ? editingProduct._id : "new"}
          editingProduct={editingProduct}
          onSubmit={onSave}
          onCancel={onCancel}
        />

        <section>
          <div className="mb-3 flex items-baseline justify-between">
            <h3 className="font-serif text-xl">All products</h3>
            <span className="font-mono text-sm text-muted">{products.length} total</span>
          </div>
          <ProductList
            products={products}
            editingId={editingProduct ? editingProduct._id : null}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </section>
      </div>
    </main>
  );
}

export default ManagePage;
