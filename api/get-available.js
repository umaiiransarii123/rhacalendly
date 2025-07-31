export default async function handler(req, res) {
  const { eventType, start, end } = req.query;
  try {
    const response = await fetch(`https://api.calendly.com/event_type_available_times?event_type=${encodeURIComponent(eventType)}&start_time=${start}&end_time=${end}`, {
      headers: { Authorization: `Bearer ${process.env.CALENDLY_API_KEY}` }
    });
    const data = await response.json();
    res.status(response.ok ? 200 : response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch availability" });
  }
}
