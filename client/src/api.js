const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

if (!API_URL) {
  console.error("VITE_API_URL is missing. Check .env or Vercel settings.");
}

// one function that all the other api calls use
async function request(path, options = {}) {
  let res;
  try {
    res = await fetch(API_URL + "/api/products" + path, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch {
    throw new Error("Cannot reach the API at " + (API_URL || "(VITE_API_URL not set)"));
  }

  if (!res.ok) {
    let msg = "Request failed: " + res.status;
    try {
      const body = await res.json();
      if (body.message) msg = body.message;
    } catch {
      // response was not JSON (for example a 413 from a proxy)
      if (res.status === 413) msg = "Image is too large for the server.";
    }
    throw new Error(msg);
  }

  return res.json();
}

export function getProducts() {
  return request("");
}

export function createProduct(data) {
  return request("", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateProduct(id, data) {
  return request("/" + id, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteProduct(id) {
  return request("/" + id, { method: "DELETE" });
}