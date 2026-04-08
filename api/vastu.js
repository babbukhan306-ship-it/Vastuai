export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { room, direction } = req.body;

  const prompt = `Give short and practical vastu tips for a ${room} facing ${direction} in Indian homes.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from AI";

    res.status(200).json({ result: text });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
