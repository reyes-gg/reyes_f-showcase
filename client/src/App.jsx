import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import GalleryPage from "./pages/GalleryPage";
import ManagePage from "./pages/ManagePage";
import { getProducts, createProduct, updateProduct, deleteProduct } from "./api";

function App() {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState("gallery");
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // load the products from the database when the page opens
  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch(() => setError("Could not load products. Refresh in 1 minute."))
      .finally(() => setLoading(false));
  }, []);

  // used by the form for both add and update
  async function saveProduct(data) {
    if (editingProduct) {
      const updated = await updateProduct(editingProduct._id, data);
      setProducts((prev) =>
        prev.map((p) => (p._id === updated._id ? updated : p))
      );
      setEditingProduct(null);
    } else {
      const created = await createProduct(data);
      setProducts((prev) => [created, ...prev]);
    }
  }

  async function removeProduct(id) {
    if (!confirm("Delete this product?")) return;

    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));

      // if we were editing the deleted one, close the form
      if (editingProduct && editingProduct._id === id) {
        setEditingProduct(null);
      }
    } catch {
      setError("Could not delete the product.");
    }
  }

  function startEdit(product) {
    setEditingProduct(product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navbar view={view} onChangeView={setView} />

      {error && (
        <div className="mx-auto mt-6 max-w-7xl px-6">
          <p className="border-l-2 border-accent bg-accent-soft px-4 py-3 text-accent-dark">{error}</p>
        </div>
      )}

      {view === "gallery" ? (
        <GalleryPage products={products} loading={loading} />
      ) : (
        <ManagePage
          products={products}
          editingProduct={editingProduct}
          onSave={saveProduct}
          onCancel={() => setEditingProduct(null)}
          onEdit={startEdit}
          onDelete={removeProduct}
        />
      )}

      <footer className="mt-10 border-t border-line py-8 text-center text-xs uppercase tracking-[0.2em] text-muted">
        Made by Frances Reyes · INF238
      </footer>
    </div>
  );
}

export default App;