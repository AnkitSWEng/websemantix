export default async function handler(req, res) {
  const gistId = process.env.GIST_ID;
  const token = process.env.GITHUB_TOKEN;

  try {
    // 1. Get current count
    const gistRes = await fetch(`https://api.github.com/gists/${gistId}`, {
      headers: { Authorization: `token ${token}` }
    });
    const gistData = await gistRes.json();
    const fileContent = JSON.parse(gistData.files["counter.json"].content);

    // 2. Increment
    fileContent.count++;

    // 3. Update Gist
    await fetch(`https://api.github.com/gists/${gistId}`, {
      method: "PATCH",
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        files: {
          "counter.json": { content: JSON.stringify(fileContent) }
        }
      })
    });

    res.status(200).json({ count: fileContent.count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
