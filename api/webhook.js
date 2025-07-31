export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const payload = req.body;

    if (payload.event === "invitee.created") {
      const booking = payload.payload;
      console.log("New booking received from Calendly:");
      console.log({
        name: booking.name,
        email: booking.email,
        event_type: booking.event_type,
        start_time: booking.event_start_time
      });
    }

    res.status(200).end(); // Required: respond to Calendly quickly
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).json({ error: "Webhook processing failed" });
  }
}
