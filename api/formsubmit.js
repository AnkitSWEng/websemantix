export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body; // Vercel parses JSON automatically if sent with Content-Type: application/json

    if (!body?.name || !body?.email) {
      return res.status(400).json({ error: "Missing name or email" });
    }

    console.log("📩 Received form data:", body);

    // TEMP: just echo back to confirm
    res.status(200).json({ message: "Form received", body });
  } catch (err) {
    console.error("❌ Server error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
