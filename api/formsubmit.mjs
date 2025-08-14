import { Octokit } from "@octokit/rest";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, country, subscribe } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Missing name or email" });
  }

  try {
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN, // stored in Vercel
    });

    const bodyContent = `
**Name:** ${name}  
**Email:** ${email}  
**Country:** ${country || "Not provided"}  
**Subscribed:** ${subscribe ? "Yes" : "No"}  
`;

    await octokit.issues.create({
      owner: "ankitsweng",
      repo: "websemantix",
      title: `📩 New Form Submission - ${name}`,
      body: bodyContent,
      labels: ["form-pending-review"],
    });

    res.status(200).json({ message: "Form submitted for review" });
  } catch (error) {
    console.error("GitHub API error:", error);
    res.status(500).json({ error: "Failed to create form submission" });
  }
}
