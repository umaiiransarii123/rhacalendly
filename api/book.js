import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, slot } = req.body;

  if (!name || !email || !slot) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Replace with your actual Calendly API access token
    const CALENDLY_ACCESS_TOKEN = process.env.CALENDLY_ACCESS_TOKEN;

    // Replace with your Calendly event type URI
    const EVENT_TYPE_URI = "https://api.calendly.com/event_types/57f4b5b4-cb5a-4634-a60c-6a6765a9f29f";

    // Create scheduling invitee request body
    const body = {
      event_type: EVENT_TYPE_URI,
      invitee: {
        email,
        name,
      },
      start_time: slot,
    };

    // Call Calendly API to create invitee (schedule event)
    const calendlyRes = await fetch("https://api.calendly.com/scheduled_events", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CALENDLY_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!calendlyRes.ok) {
      const errorResponse = await calendlyRes.json();
      return res.status(400).json({ message: "Calendly API error", details: errorResponse });
    }

    const calendlyData = await calendlyRes.json();

    // Send back the booking URL or confirmation link from Calendly response
    return res.status(200).json({ booking_url: calendlyData.resource?.uri || null });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}
