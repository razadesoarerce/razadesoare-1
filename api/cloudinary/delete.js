const cloudinary = require("cloudinary").v2;

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const { public_id } = req.body || {};
  if (!public_id || typeof public_id !== "string") {
    res.status(400).json({ error: "public_id required" });
    return;
  }
  const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
  const api_key = process.env.CLOUDINARY_API_KEY;
  const api_secret = process.env.CLOUDINARY_API_SECRET;
  if (!api_secret || !cloud_name || !api_key) {
    res.status(500).json({ error: "Server Cloudinary config missing" });
    return;
  }
  cloudinary.config({ cloud_name, api_key, api_secret });
  try {
    await cloudinary.uploader.destroy(public_id);
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Cloudinary destroy error:", err);
    res.status(500).json({ error: err.message || "Delete failed" });
  }
};
