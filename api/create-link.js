export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { email, eventType } = req.body;
  try {
    const calendlyRes = await fetch("https://api.calendly.com/scheduling_links", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CALENDLY_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        owner: eventType,
        max_event_count: 1,
        invitee_email: email
      })
    });
    const calendlyData = await calendlyRes.json();
    return res.status(200).json({ resource: calendlyData.resource });
  } catch (err) {
    return res.status(500).json({ error: "Calendly request failed", details: err.message });
  }
}
