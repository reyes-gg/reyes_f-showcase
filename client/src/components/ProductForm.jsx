import { useState } from "react";
import ImageUpload from "./ImageUpload";

const emptyForm = { name: "", price: "", description: "", category: "", image: "" };

const inputClass =
  "w-full border-0 border-b border-line bg-transparent px-0 py-2 outline-none transition placeholder:text-muted/60 focus:border-accent";

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
        {label}
      </span>
      {children}
    </label>
  );
}

function ProductForm({ editingProduct, onSubmit, onCancel }) {
  const [form, setForm] = useState(
    editingProduct ? { ...emptyForm, ...editingProduct } : emptyForm
  );
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (form.name.trim() === "" || form.price === "" || form.image === "") {
      setError("Name, price, and image are required.");
      return;
    }

    setSaving(true);

    try {
      await onSubmit({
        name: form.name.trim(),
        price: Number(form.price),
        description: form.description,
        category: form.category.trim() || "General",
        image: form.image,
      });

      setForm(emptyForm);
      setError("");
    } catch (err) {
      setError("Could not save the product: " + err.message);
    } finally {
      setSaving(false);
    }
  }

  let buttonText = "Add product";
  if (saving) {
    buttonText = "Saving...";
  } else if (editingProduct) {
    buttonText = "Save changes";
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-sm border border-line bg-card p-6 lg:sticky lg:top-28"
    >
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-accent">
          {editingProduct ? "Editing" : "New entry"}
        </p>
        <h2 className="mt-1 font-serif text-2xl">
          {editingProduct ? editingProduct.name : "Add a product"}
        </h2>
      </div>

      <ImageUpload
        image={form.image}
        onChange={(image) => setForm((prev) => ({ ...prev, image: image }))}
        onError={setError}
      />

      <Field label="Name">
        <input
          name="name"
          placeholder="e.g. Canvas tote"
          className={inputClass}
          value={form.name}
          onChange={handleChange}
        />
      </Field>

      <div className="grid grid-cols-2 gap-6">
        <Field label="Price (₱)">
          <input
            name="price"
            type="number"
            min="0"
            placeholder="0"
            className={inputClass + " font-mono"}
            value={form.price}
            onChange={handleChange}
          />
        </Field>
        <Field label="Category">
          <input
            name="category"
            placeholder="Bags"
            className={inputClass}
            value={form.category}
            onChange={handleChange}
          />
        </Field>
      </div>

      <Field label="Description">
        <textarea
          name="description"
          rows="3"
          placeholder="A short description"
          className={inputClass + " resize-none"}
          value={form.description}
          onChange={handleChange}
        />
      </Field>

      {error && (
        <p className="border-l-2 border-accent bg-accent-soft px-3 py-2 text-sm text-accent-dark">
          {error}
        </p>
      )}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={saving}
          className="flex-1 rounded-full bg-ink py-3 text-sm font-medium text-paper transition hover:bg-accent disabled:opacity-50"
        >
          {buttonText}
        </button>

        {/* cancel only shows when editing */}
        {editingProduct && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-line px-6 py-3 text-sm font-medium transition hover:border-ink"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ProductForm;
