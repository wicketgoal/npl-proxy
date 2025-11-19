export default async function handler(req, res) {
  try {
    const target = req.query.url;
    if (!target) {
      return res.status(400).json({ error: "Missing URL parameter" });
    }

    const response = await fetch(target, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Referer": "https://www.fancode.com/",
        "Origin": "https://www.fancode.com/"
      }
    });

    const contentType = response.headers.get("content-type") || "application/octet-stream";
    res.setHeader("content-type", contentType);

    const buffer = await response.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch (err) {
    res.status(500).json({ error: "Proxy error", details: err.message });
  }
}
