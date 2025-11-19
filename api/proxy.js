export const config = {
  runtime: "nodejs20.x"
};

export default async function handler(req, res) {
  const url = req.query.url;
  if (!url) return res.status(400).send("Missing URL");

  try {
    const response = await fetch(url, {
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Referer": "https://www.fancode.com/"
      }
    });

    res.setHeader("Content-Type", response.headers.get("content-type") || "application/octet-stream");
    
    const data = await response.text();
    res.send(data);
  } catch (err) {
    res.status(500).send("Proxy Failed");
  }
}
