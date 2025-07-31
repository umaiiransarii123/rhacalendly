export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, eventType } = req.body;

  const token = process.env.CALENDLY_API_KEY;
  if (!token) return res.status(500).json({ error: "Missing API Key" });

  try {
    const response = await fetch("https://api.calendly.com/scheduled_events", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        invitee: { name, email },
        event_type: eventType
      })
    });

    const data = await response.json();
    return res.status(200).json({ booking_url: data.resource?.uri || null });
  } catch (err) {
    return res.status(500).json({ error: "Calendly error", details: err.message });
  }
}
