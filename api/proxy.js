export const config = {
  runtime: "nodejs"   // ✅ Correct value
};

export default async function handler(req, res) {
  const url = req.query.url;

  if (!url) {
    return res.status(400).send("Missing URL");
  }

  try {
    const response = await fetch(url, {
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Referer": "https://www.fancode.com/"
      }
    });

    res.setHeader("Content-Type", response.headers.get("content-type") || "application/octet-stream");

    const text = await response.text();
    res.send(text);

  } catch (err) {
    res.status(500).send("Proxy Failed");
  }
}
