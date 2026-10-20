// 1MB in bytes
const MAX_SIZE = 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

function ImageUpload({ image, onChange, onError }) {
  function handleFile(e) {
    const input = e.target;
    const file = input.files[0];

    // user closed the file picker without choosing
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      onError("Please choose a jpg, png, or webp image.");
      input.value = "";
      return;
    }

    if (file.size > MAX_SIZE) {
      onError("Image is too large. Maximum size is 1MB.");
      input.value = "";
      return;
    }

    // turn the file into a base64 string so we can preview it and save it
    const reader = new FileReader();
    reader.onload = function () {
      onChange(reader.result);
    };
    reader.readAsDataURL(file);

    // clear the input so picking the same file again still fires onChange
    input.value = "";
    onError("");
  }

  return (
    <label className="group relative flex aspect-4/3 cursor-pointer items-center justify-center overflow-hidden rounded-sm border border-dashed border-muted/50 bg-paper text-sm text-muted transition hover:border-accent hover:text-accent">
      {image ? (
        <>
          <img src={image} alt="Preview" className="h-full w-full object-cover" />
          <span className="absolute inset-0 flex items-center justify-center bg-ink/55 text-xs font-medium uppercase tracking-widest text-white opacity-0 transition group-hover:opacity-100">
            Replace image
          </span>
        </>
      ) : (
        <span className="text-center">
          <span className="block font-serif text-3xl leading-none">+</span>
          <span className="mt-2 block">Upload image</span>
          <span className="block text-xs opacity-70">JPG, PNG or WebP · max 1MB</span>
        </span>
      )}
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFile}
        hidden
      />
    </label>
  );
}

export default ImageUpload;
