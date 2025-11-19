export default async function handler(req, res) {
  const url = req.query.url;

  if (!url) {
    return res.status(400).send("Missing URL");
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const contentType = response.headers.get("content-type") || "application/octet-stream";
    res.setHeader("Content-Type", contentType);

    const data = await response.text();
    res.send(data);

  } catch (error) {
    res.status(500).send("Proxy Error");
  }
}
