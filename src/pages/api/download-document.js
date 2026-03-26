export default async function handler(req, res) {
  const { url, filename } = req.query;

  if (!url) {
    return res.status(400).send("Missing URL");
  }

  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();

    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${filename || "document"}"`
    );

    res.send(Buffer.from(buffer));
  } catch (err) {
    console.error("Download error:", err);
    res.status(500).send("Download failed");
  }
}
